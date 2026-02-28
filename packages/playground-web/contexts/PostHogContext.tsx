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
import { persistUtmAttribution, type UtmSnapshot, classifyInflowChannel } from '@/lib/utm';
import { trackFunnelHomeEntered, trackFunnelSectionEntered } from '@/lib/analytics';

/**
 * 페이지 변경 추적 컴포넌트 (Suspense 필요)
 */
function PostHogPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog.__loaded) {
      const search = searchParams?.toString() ?? '';
      const url = search ? `${window.origin}${pathname}?${search}` : `${window.origin}${pathname}`;
      const utmSnapshot = persistUtmAttribution(new URLSearchParams(search));
      registerUtmSuperProperties(utmSnapshot);

      posthog.capture('$pageview', {
        $current_url: url,
      });

      if (pathname === '/') {
        trackFunnelHomeEntered();
      }

      if (pathname.startsWith('/docs')) {
        trackFunnelSectionEntered({ section: 'docs', path: pathname });
      } else if (pathname.startsWith('/explore')) {
        trackFunnelSectionEntered({ section: 'explore', path: pathname });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

interface PostHogProviderProps {
  children: ReactNode;
}

const registerUtmSuperProperties = (snapshot: UtmSnapshot): void => {
  const properties: Record<string, string> = {};
  const firstTouchProperties: Record<string, string> = {};

  const latest = snapshot.latest ?? snapshot.sessionFirstTouch ?? snapshot.firstTouch;

  if (latest) {
    for (const [key, value] of Object.entries(latest)) {
      if (value) {
        properties[key] = value;
      }
    }
  }

  if (snapshot.firstTouch) {
    for (const [key, value] of Object.entries(snapshot.firstTouch)) {
      if (value) {
        firstTouchProperties[`first_${key}`] = value;
      }
    }
  }

  if (snapshot.sessionFirstTouch) {
    for (const [key, value] of Object.entries(snapshot.sessionFirstTouch)) {
      if (value) {
        properties[`session_${key}`] = value;
      }
    }
  }

  const source =
    properties.utm_source ?? firstTouchProperties.first_utm_source ?? properties.session_utm_source;
  properties.inflow_channel = classifyInflowChannel(source);

  if (Object.keys(properties).length > 0) {
    posthog.register(properties);
  }

  if (Object.keys(firstTouchProperties).length > 0) {
    posthog.register_once(firstTouchProperties);
  }
};

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
