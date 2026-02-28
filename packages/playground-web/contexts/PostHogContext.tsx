/**
 * PostHog Analytics Provider
 *
 * PostHog 페이지뷰 추적 제공
 *
 * NOTE: PostHog 초기화는 instrumentation-client.ts에서 수행됨
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
 * 초기화는 instrumentation-client.ts에서 수행되므로, 이 컴포넌트는 페이지 추적만 담당
 *
 * @example
 * <PostHogProvider>
 *   <App />
 * </PostHogProvider>
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageTracker />
      </Suspense>
      {children}
    </>
  );
}
