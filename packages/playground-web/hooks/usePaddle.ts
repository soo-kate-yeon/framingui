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
import { PADDLE_CONFIG } from '@/lib/paddle/config';

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

  useEffect(() => {
    // Feature flag 확인
    if (process.env.NEXT_PUBLIC_ENABLE_PAYMENTS !== 'true') {
      setIsLoading(false);
      return;
    }

    if (!PADDLE_CONFIG.clientToken) {
      console.warn('[Paddle] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN이 설정되지 않았습니다');
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
    openCheckout,
  };
}
