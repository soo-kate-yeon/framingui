/**
 * PostHog Analytics Provider
 *
 * PostHog 초기화 및 전역 제공
 *
 * WHY: 중앙화된 분석 도구 관리
 * IMPACT: 일관된 이벤트 트래킹 및 사용자 행동 분석
 */

'use client';

import { Suspense, useEffect, type ReactNode } from 'react';
import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * 페이지 변경 추적 컴포넌트 (Suspense 필요)
 */
function PostHogPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog.__loaded) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

interface PostHogProviderProps {
  children: ReactNode;
}

/**
 * PostHog Provider 컴포넌트
 *
 * 환경 변수가 없으면 초기화를 건너뛰고 에러를 발생시키지 않음
 *
 * @example
 * <PostHogProvider>
 *   <App />
 * </PostHogProvider>
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // 환경 변수 확인 (gracefully skip if missing)
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!posthogKey || !posthogHost) {
      // 환경 변수가 없으면 초기화 건너뛰기 (에러 발생 안 함)
      console.info('[PostHog] Environment variables not found. Analytics disabled.');
      return;
    }

    // PostHog 초기화 (이미 초기화되었으면 건너뛰기)
    if (!posthog.__loaded) {
      posthog.init(posthogKey, {
        api_host: posthogHost,

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
            console.info('[PostHog] Initialized successfully');
          }
        },
      });
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageTracker />
      </Suspense>
      {children}
    </>
  );
}
