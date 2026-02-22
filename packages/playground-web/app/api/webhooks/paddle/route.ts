/**
 * Paddle Webhook Handler
 * SPEC-DEPLOY-001 Phase 3: Paddle 결제 웹훅 처리
 *
 * POST /api/webhooks/paddle
 *
 * WHY: Paddle 결제 완료/취소/환불 이벤트를 수신하여 라이선스를 관리
 * IMPACT: 결제 성공 시 라이선스 자동 생성, 취소/환불 시 자동 비활성화
 *
 * 처리 이벤트:
 * - transaction.completed → 라이선스 생성
 * - subscription.activated → 구독 활성화 확인 (로그)
 * - subscription.canceled → 라이선스 비활성화
 * - subscription.past_due → 로그 기록 (알림용)
 * - adjustment.created → 환불 시 라이선스 비활성화
 */

import { NextRequest, NextResponse } from 'next/server';
import { Environment, Paddle, EventName } from '@paddle/paddle-node-sdk';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import {
  rateLimitWebhooks,
  getClientIp,
  createRateLimitErrorResponse,
} from '@/lib/security/rate-limit';
import type { LicenseTier } from '@/lib/db/types';

// Paddle 서버 SDK 초기화
function getPaddleClient(): Paddle | null {
  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) {
    console.error('[Paddle Webhook] PADDLE_API_KEY가 설정되지 않았습니다');
    return null;
  }

  const environment =
    process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production'
      ? Environment.production
      : Environment.sandbox;

  return new Paddle(apiKey, { environment });
}

// Service Role Supabase 클라이언트 (RLS 우회)
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Supabase 환경변수가 설정되지 않았습니다');
  }

  return createSupabaseAdmin(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Price ID를 기반으로 라이선스 티어 결정
 */
function resolveTier(priceId: string): LicenseTier {
  const priceSingle = process.env.NEXT_PUBLIC_PADDLE_PRICE_SINGLE;
  const priceDouble = process.env.NEXT_PUBLIC_PADDLE_PRICE_DOUBLE;
  const priceCreator = process.env.NEXT_PUBLIC_PADDLE_PRICE_CREATOR;

  if (priceId === priceSingle) {
    return 'single';
  }
  if (priceId === priceDouble) {
    return 'double';
  }
  if (priceId === priceCreator) {
    return 'creator';
  }

  console.warn(`[Paddle Webhook] 알 수 없는 Price ID: ${priceId}, 기본값 'single' 사용`);
  return 'single';
}

/**
 * custom_data에서 사용자 정보 추출
 */
interface PaddleCustomData {
  user_id: string;
  theme_id?: string;
  tier?: string;
}

function parseCustomData(customData: unknown): PaddleCustomData | null {
  if (!customData || typeof customData !== 'object') {
    return null;
  }

  const data = customData as Record<string, unknown>;
  const userId = data.user_id;
  if (typeof userId !== 'string' || !userId) {
    return null;
  }

  return {
    user_id: userId,
    theme_id: typeof data.theme_id === 'string' ? data.theme_id : undefined,
    tier: typeof data.tier === 'string' ? data.tier : undefined,
  };
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientIp = getClientIp(request);
  const rateLimitResult = await rateLimitWebhooks(clientIp);
  if (!rateLimitResult.success) {
    return createRateLimitErrorResponse(rateLimitResult);
  }

  // Paddle 클라이언트 확인
  const paddle = getPaddleClient();
  if (!paddle) {
    return NextResponse.json({ error: 'server_configuration_error' }, { status: 500 });
  }

  // 웹훅 서명 검증
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Paddle Webhook] PADDLE_WEBHOOK_SECRET이 설정되지 않았습니다');
    return NextResponse.json({ error: 'server_configuration_error' }, { status: 500 });
  }

  const signature = request.headers.get('paddle-signature');
  if (!signature) {
    return NextResponse.json({ error: 'missing_signature' }, { status: 401 });
  }

  const rawBody = await request.text();

  let event;
  try {
    event = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
  } catch (err) {
    console.error('[Paddle Webhook] 서명 검증 실패:', err);
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  }

  if (!event) {
    return NextResponse.json({ error: 'invalid_event' }, { status: 400 });
  }

  console.log(`[Paddle Webhook] 이벤트 수신: ${event.eventType}`);

  try {
    const adminClient = getAdminClient();

    switch (event.eventType) {
      // 결제 완료 → 라이선스 생성
      case EventName.TransactionCompleted: {
        const transaction = event.data;
        const customData = parseCustomData(transaction.customData);

        if (!customData) {
          console.error('[Paddle Webhook] custom_data에 user_id가 없습니다');
          return NextResponse.json({ error: 'missing_user_id' }, { status: 400 });
        }

        // 첫 번째 아이템의 Price ID로 티어 결정
        const firstItem = transaction.items?.[0];
        const priceId = firstItem?.price?.id;
        if (!priceId) {
          console.error('[Paddle Webhook] Price ID를 찾을 수 없습니다');
          return NextResponse.json({ error: 'missing_price_id' }, { status: 400 });
        }

        const tier = resolveTier(priceId);
        const themeId = customData.theme_id || 'default';

        // Idempotency: paddle_subscription_id로 중복 확인
        const transactionId = transaction.id;

        const { data: existingRows } = await adminClient
          .from('user_licenses')
          .select('id')
          .eq('user_id', customData.user_id)
          .eq('paddle_subscription_id', transactionId)
          .limit(1);

        if (existingRows && existingRows.length > 0) {
          console.log(`[Paddle Webhook] 이미 처리된 트랜잭션: ${transactionId}`);
          return NextResponse.json({ status: 'already_processed' });
        }

        // Double 패키지: 쉼표 구분 themeId → 각각 라이선스 생성
        if (tier === 'double' && themeId.includes(',')) {
          const themeIds = themeId
            .split(',')
            .map((id) => id.trim())
            .filter(Boolean);

          const licenseRecords = themeIds.map((tId) => ({
            user_id: customData.user_id,
            theme_id: tId,
            tier,
            paddle_subscription_id: transactionId,
            is_active: true,
          }));

          const { error: insertError } = await adminClient
            .from('user_licenses')
            .insert(licenseRecords);

          if (insertError) {
            console.error('[Paddle Webhook] Double 라이선스 생성 실패:', insertError);
            return NextResponse.json({ error: 'license_creation_failed' }, { status: 500 });
          }

          console.log(
            `[Paddle Webhook] Double 라이선스 생성 완료: user=${customData.user_id}, themes=${themeIds.join(',')}`
          );
        } else {
          // Single / Creator / themeId가 단일인 경우
          const { error: insertError } = await adminClient.from('user_licenses').insert({
            user_id: customData.user_id,
            theme_id: themeId,
            tier,
            paddle_subscription_id: transactionId,
            is_active: true,
          });

          if (insertError) {
            console.error('[Paddle Webhook] 라이선스 생성 실패:', insertError);
            return NextResponse.json({ error: 'license_creation_failed' }, { status: 500 });
          }

          console.log(
            `[Paddle Webhook] 라이선스 생성 완료: user=${customData.user_id}, tier=${tier}`
          );
        }
        break;
      }

      // 구독 활성화
      case EventName.SubscriptionActivated: {
        const subscription = event.data;
        const customData = parseCustomData(subscription.customData);

        if (customData) {
          console.log(
            `[Paddle Webhook] 구독 활성화: user=${customData.user_id}, sub=${subscription.id}`
          );
        }
        break;
      }

      // 구독 취소 → 라이선스 비활성화
      case EventName.SubscriptionCanceled: {
        const subscription = event.data;
        const subscriptionId = subscription.id;

        const { error: updateError } = await adminClient
          .from('user_licenses')
          .update({ is_active: false })
          .eq('paddle_subscription_id', subscriptionId);

        if (updateError) {
          console.error('[Paddle Webhook] 라이선스 비활성화 실패:', updateError);
          return NextResponse.json({ error: 'license_update_failed' }, { status: 500 });
        }

        console.log(`[Paddle Webhook] 구독 취소 처리 완료: sub=${subscriptionId}`);
        break;
      }

      // 결제 연체
      case EventName.SubscriptionPastDue: {
        const subscription = event.data;
        console.warn(`[Paddle Webhook] 구독 연체: sub=${subscription.id}`);
        break;
      }

      // 환불 (Paddle v3에서는 Adjustment로 환불 처리)
      case EventName.AdjustmentCreated: {
        const adjustment = event.data;
        const action = adjustment.action;

        // 환불(refund) 또는 크레딧(credit)인 경우만 처리
        if (action === 'refund' || action === 'credit') {
          const transactionId = adjustment.transactionId;

          if (transactionId) {
            const { error: updateError } = await adminClient
              .from('user_licenses')
              .update({ is_active: false })
              .eq('paddle_subscription_id', transactionId);

            if (updateError) {
              console.error('[Paddle Webhook] 환불 처리 실패:', updateError);
              return NextResponse.json({ error: 'refund_processing_failed' }, { status: 500 });
            }

            console.log(`[Paddle Webhook] 환불 처리 완료: txn=${transactionId}, action=${action}`);
          }
        }
        break;
      }

      default:
        console.log(`[Paddle Webhook] 미처리 이벤트: ${event.eventType}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[Paddle Webhook] 처리 중 오류:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
