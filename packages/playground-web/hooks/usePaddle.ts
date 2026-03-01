/**
 * usePaddle Hook
 * SPEC-DEPLOY-001 Phase 3: Paddle Checkout 초기화 및 열기
 *
 * WHY: @paddle/paddle-js 공식 패턴으로 Paddle.js를 초기화하고 checkout overlay 제공
 * IMPACT: PricingCard에서 Buy Now 클릭 시 Paddle Checkout Overlay 표시
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { initializePaddle, type Paddle } from '@paddle/paddle-js';
import { PADDLE_CONFIG, isPaymentsEnabled } from '@/lib/paddle/config';

export interface OpenCheckoutParams {
  priceId: string;
  userId: string;
  userEmail: string;
  themeId?: string;
  tier: 'single' | 'double' | 'creator';
}

export function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notReadyReason, setNotReadyReason] = useState<string | null>(null);

  useEffect(() => {
    // Feature flag: 명시적으로 비활성화된 경우만 중단
    if (!isPaymentsEnabled()) {
      setNotReadyReason('Payments are disabled by NEXT_PUBLIC_ENABLE_PAYMENTS.');
      setIsLoading(false);
      return;
    }

    const isLocalHost =
      typeof window !== 'undefined' &&
      ['localhost', '127.0.0.1', '::1', '[::1]'].includes(window.location.hostname);

    if (isLocalHost && PADDLE_CONFIG.environment === 'production') {
      setNotReadyReason(
        'Paddle live checkout is blocked on local hosts. Use sandbox locally or run on an allowed domain.'
      );
      setIsLoading(false);
      return;
    }

    if (!PADDLE_CONFIG.clientToken) {
      console.warn('[Paddle] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN이 설정되지 않았습니다');
      setNotReadyReason('NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is missing.');
      setIsLoading(false);
      return;
    }

    initializePaddle({
      environment: PADDLE_CONFIG.environment,
      token: PADDLE_CONFIG.clientToken,
    })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      })
      .catch((error) => {
        console.error('[Paddle] 초기화 실패:', error);
        setNotReadyReason(error instanceof Error ? error.message : 'Paddle initialization failed.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const openCheckout = useCallback(
    ({ priceId, userId, userEmail, themeId, tier }: OpenCheckoutParams) => {
      if (!paddle) {
        console.error('[Paddle] Paddle이 초기화되지 않았습니다');
        return;
      }

      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: { email: userEmail },
        customData: {
          user_id: userId,
          theme_id: themeId ?? '',
          tier,
        },
      });
    },
    [paddle]
  );

  return {
    paddle,
    isLoading,
    isReady: !!paddle,
    notReadyReason,
    openCheckout,
  };
}
