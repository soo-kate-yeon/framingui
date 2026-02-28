/**
 * PostHog Server SDK
 *
 * 서버 측 이벤트 트래킹을 위한 PostHog Node 클라이언트
 *
 * WHY: Server Components 및 API Routes에서 이벤트 트래킹
 * IMPACT: 서버 측 분석 데이터 수집 및 사용자 행동 분석
 *
 * @see https://posthog.com/docs/libraries/next-js#server-side-rendering
 */

import { PostHog } from 'posthog-node';

/**
 * PostHog 서버 클라이언트 싱글톤
 *
 * flushAt: 1 - 즉시 이벤트 전송
 * flushInterval: 0 - 주기적 flush 비활성화
 */
export const posthogServer = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
  host: 'https://us.i.posthog.com',
  flushAt: 1,
  flushInterval: 0,
});
