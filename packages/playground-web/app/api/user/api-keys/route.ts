/**
 * API Key CRUD Endpoints (GET, POST)
 * SPEC-DEPLOY-001 Phase 2.2-2.4: API Key 생성/조회 + Rate Limiting
 *
 * [SECURITY-S2] bcrypt 해싱 + 암호학적으로 안전한 랜덤 생성
 * [SECURITY-S3] Rate Limiting: 분당 10회
 * [SECURITY-S5] 입력 검증: name 길이 제한 (1-100자)
 *
 * WHY: MCP 서버 인증을 위한 API Key 발급 및 관리
 * IMPACT: 사용자가 API Key를 생성하고 목록을 조회할 수 있음
 */

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createApiKey,
  getApiKeysByUserId,
  generateApiKey,
} from '@/lib/db/api-keys';
import type { ApiKeyWithPlaintext, ApiKeyListItem } from '@/lib/db/types';
import {
  rateLimitApiKeys,
  createRateLimitErrorResponse,
  createRateLimitHeaders,
} from '@/lib/security/rate-limit';

/**
 * API Key 생성 요청 스키마
 */
const CreateApiKeySchema = z.object({
  name: z.string().min(1, 'name is required').max(100, 'name is too long'),
});

/**
 * 에러 응답 타입
 */
interface ErrorResponse {
  error: string;
  message: string;
  details?: unknown;
}

/**
 * GET /api/user/api-keys
 *
 * 현재 사용자의 API Key 목록을 조회합니다.
 * ⚠️ 평문 키는 반환하지 않음 (key_prefix만 반환)
 *
 * @returns API Key 목록 (평문 제외)
 *
 * @example
 * GET /api/user/api-keys
 *
 * Response:
 * [
 *   {
 *     "id": "uuid",
 *     "keyPrefix": "tk_live_a1b2",
 *     "name": "My Claude Desktop",
 *     "lastUsedAt": "2026-02-06T10:00:00Z",
 *     "createdAt": "2026-02-01T08:00:00Z"
 *   }
 * ]
 */
export async function GET() {
  try {
    // 1. Supabase 클라이언트 생성
    const supabase = await createClient();

    // 2. 현재 인증된 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'unauthorized',
          message: 'Authentication required',
          details: authError?.message,
        },
        { status: 401 }
      );
    }

    // 3. Rate Limiting (User ID 기반, 분당 10회)
    // SECURITY-S3: API Key 관리 엔드포인트 Rate Limiting
    const rateLimitResult = await rateLimitApiKeys(user.id);

    if (!rateLimitResult.success) {
      console.warn('[API Keys GET] Rate limit exceeded:', {
        userId: user.id,
        remaining: rateLimitResult.remaining,
      });

      return createRateLimitErrorResponse(rateLimitResult);
    }

    // 4. 사용자의 API Key 목록 조회
    const apiKeys = await getApiKeysByUserId(user.id);

    // 5. 응답 형식 변환 (camelCase)
    const response: ApiKeyListItem[] = apiKeys.map((key) => ({
      id: key.id,
      key_prefix: key.key_prefix, // ⚠️ 평문 키 제외
      name: key.name,
      last_used_at: key.last_used_at,
      created_at: key.created_at,
    }));

    return NextResponse.json(response, {
      status: 200,
      headers: createRateLimitHeaders(rateLimitResult),
    });
  } catch (error) {
    console.error('[API Keys GET] Unexpected error:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'internal_server_error',
        message: 'Failed to retrieve API keys',
        details: error instanceof Error ? { message: error.message } : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/api-keys
 *
 * 새로운 API Key를 생성합니다.
 * ⚠️ 평문 키는 이 응답에서만 반환됩니다 (다시 조회 불가)
 *
 * @param request Next.js 요청 객체
 * @returns 생성된 API Key (평문 포함)
 *
 * @example
 * POST /api/user/api-keys
 * {
 *   "name": "My Claude Desktop"
 * }
 *
 * Response:
 * {
 *   "id": "uuid",
 *   "key": "tk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6", // ⚠️ 평문 (이번만 반환)
 *   "name": "My Claude Desktop",
 *   "createdAt": "2026-02-06T10:00:00Z"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Supabase 클라이언트 생성
    const supabase = await createClient();

    // 2. 현재 인증된 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'unauthorized',
          message: 'Authentication required',
          details: authError?.message,
        },
        { status: 401 }
      );
    }

    // 3. Rate Limiting (User ID 기반, 분당 10회)
    // SECURITY-S3: API Key 생성은 더 엄격하게 제한
    const rateLimitResult = await rateLimitApiKeys(user.id);

    if (!rateLimitResult.success) {
      console.warn('[API Keys POST] Rate limit exceeded:', {
        userId: user.id,
        remaining: rateLimitResult.remaining,
      });

      return createRateLimitErrorResponse(rateLimitResult);
    }

    // 4. Request body 파싱 및 검증
    const body = await request.json();
    const validationResult = CreateApiKeySchema.safeParse(body);

    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json<ErrorResponse>(
        {
          error: 'validation_error',
          message: 'Invalid request body',
          details: errorDetails,
        },
        { status: 400 }
      );
    }

    const { name } = validationResult.data;

    // 4. API Key 생성 (평문 + bcrypt 해시)
    const { key, hash, prefix } = await generateApiKey();

    console.log('[API Keys POST] Generating new API key:', {
      user_id: user.id,
      name,
      prefix,
    });

    // 5. 데이터베이스에 해시 저장
    const apiKey = await createApiKey({
      user_id: user.id,
      name,
      key_hash: hash,
      key_prefix: prefix,
    });

    if (!apiKey) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'creation_failed',
          message: 'Failed to create API key',
        },
        { status: 500 }
      );
    }

    // 6. 성공 응답 (평문 키 포함 - 이번만 반환)
    const response: ApiKeyWithPlaintext = {
      id: apiKey.id,
      key, // ⚠️ 평문 키 - 이 응답에서만 반환
      name: apiKey.name,
      created_at: apiKey.created_at,
    };

    console.log('[API Keys POST] API key created successfully:', {
      id: apiKey.id,
      user_id: user.id,
      prefix,
    });

    return NextResponse.json(response, {
      status: 201,
      headers: createRateLimitHeaders(rateLimitResult),
    });
  } catch (error) {
    console.error('[API Keys POST] Unexpected error:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'internal_server_error',
        message: 'Failed to create API key',
        details: error instanceof Error ? { message: error.message } : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/user/api-keys
 *
 * CORS preflight 요청 처리
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24시간
    },
  });
}
