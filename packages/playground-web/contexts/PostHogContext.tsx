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
 * Internal 유저 필터링 상수
 */
const INTERNAL_EMAIL_PATTERNS = [
  'sooyeon',
  'framingui.com',
  'tekton',
];

/**
 * 내부 사용자 트래픽 필터링
 *
 * WHY: 내부 테스트/개발 트래픽이 프로덕션 분석을 오염시키지 않도록 필터링
 * HOW:
 *   1. localhost 접속 → opt_out_capturing()
 *   2. 내부 이메일 패턴 → opt_out_capturing()
 *   3. is_test_user property 설정 (PostHog 필터 백업용)
 */
function useInternalUserFiltering() {
  useEffect(() => {
    if (typeof window === 'undefined' || !posthog.__loaded) return;

    const isLocalhost =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // PostHog에서 현재 식별된 사용자의 이메일 확인
    const distinctId = posthog.get_distinct_id();
    const personProperties = posthog.get_property('$stored_person_properties') || {};
    const userEmail = (personProperties.email as string) || distinctId || '';

    const isInternalEmail = INTERNAL_EMAIL_PATTERNS.some((pattern) =>
      userEmail.toLowerCase().includes(pattern.toLowerCase())
    );

    if (isLocalhost || isInternalEmail) {
      // 완전히 캡처 중단
      posthog.opt_out_capturing();
      posthog.setPersonProperties({ is_test_user: true });
      console.log('[PostHog] Internal user detected, opt-out capturing:', {
        isLocalhost,
        isInternalEmail,
        email: userEmail.slice(0, 10) + '...',
      });
    }
  }, []);
}

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
  useInternalUserFiltering();

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageTracker />
      </Suspense>
      {children}
    </>
  );
}
