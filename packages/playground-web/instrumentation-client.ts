/**
 * PostHog Client Instrumentation
 *
 * Next.js App Router의 instrumentation 패턴을 사용한 PostHog 초기화
 *
 * WHY: 클라이언트 측 초기화를 useEffect 대신 instrumentation에서 수행하여 더 빠른 로드
 * IMPACT: 페이지 렌더링 전에 PostHog가 초기화되어 모든 이벤트 캡처 가능
 *
 * @see https://posthog.com/docs/libraries/next-js
 */

import posthog from 'posthog-js';

/**
 * PostHog 클라이언트 초기화
 *
 * reverse proxy (/ingest)를 사용하여 ad-blocker 우회 및 성능 향상
 */
export function register() {
  // 환경 변수 확인 (gracefully skip if missing)
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!posthogKey) {
    // 환경 변수가 없으면 초기화 건너뛰기 (에러 발생 안 함)
    console.info('[PostHog] Environment variables not found. Analytics disabled.');
    return;
  }

  // PostHog 초기화 (이미 초기화되었으면 건너뛰기)
  if (!posthog.__loaded) {
    posthog.init(posthogKey, {
      // reverse proxy 사용 (next.config.ts에서 /ingest → https://us.i.posthog.com 리다이렉트)
      api_host: '/ingest',

      // Autocapture 비활성화 (명시적 이벤트만 트래킹)
      autocapture: false,

      // 세션 녹화 비활성화
      disable_session_recording: true,

      // 페이지뷰 자동 캡처 비활성화 (수동으로 처리)
      capture_pageview: false,

      // 페이지 이탈 이벤트 캡처
      capture_pageleave: true,

      // 개발 환경에서 로그 출력
      loaded: () => {
        if (process.env.NODE_ENV === 'development') {
          console.info('[PostHog] Initialized successfully via instrumentation');
        }
      },
    });
  }
}
