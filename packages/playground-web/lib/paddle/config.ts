/**
 * Paddle 결제 설정
 * SPEC-DEPLOY-001 Phase 3: Paddle 결제 연동
 *
 * WHY: 모든 Paddle 관련 설정을 한 곳에서 관리하여 Sandbox/Production 전환 용이
 * IMPACT: 환경변수만 변경하면 결제 환경 전환 가능
 */

export const PADDLE_CONFIG = {
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT ?? 'sandbox') as
    | 'sandbox'
    | 'production',
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
  prices: {
    single: process.env.NEXT_PUBLIC_PADDLE_PRICE_SINGLE!,
    double: process.env.NEXT_PUBLIC_PADDLE_PRICE_DOUBLE!,
    creator: process.env.NEXT_PUBLIC_PADDLE_PRICE_CREATOR!,
  },
} as const;

export type PaddlePriceTier = keyof typeof PADDLE_CONFIG.prices;

/**
 * PricingTier 문자열을 Paddle Price tier로 매핑
 */
export function toPaddlePriceTier(tier: string): PaddlePriceTier | null {
  const mapping: Record<string, PaddlePriceTier> = {
    Single: 'single',
    Double: 'double',
    'Creator Pass': 'creator',
  };
  return mapping[tier] ?? null;
}
