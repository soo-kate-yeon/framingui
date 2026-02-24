/**
 * PostHog Analytics 이벤트 헬퍼 함수
 *
 * 타입 안전한 이벤트 트래킹을 위한 유틸리티 함수들
 *
 * WHY: 일관된 이벤트 명명과 타입 안전성 보장
 * IMPACT: 런타임 에러 방지 및 개발자 경험 향상
 */

import posthog from 'posthog-js';

/**
 * 이벤트 타입 정의
 */
export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'template_select'
  | 'pricing_view'
  | 'beta_signup_click';

/**
 * CTA 클릭 이벤트 속성
 */
export interface CtaClickProps {
  button_name: string;
  location: string;
}

/**
 * 템플릿 선택 이벤트 속성
 */
export interface TemplateSelectProps {
  template_name: string;
}

/**
 * PostHog가 초기화되었는지 확인
 */
export const isPostHogInitialized = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    posthog.__loaded === true &&
    !!process.env.NEXT_PUBLIC_POSTHOG_KEY
  );
};

/**
 * 페이지 뷰 이벤트 트래킹
 *
 * @example
 * trackPageView();
 */
export const trackPageView = (): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  posthog.capture('page_view', {
    url: window.location.href,
    path: window.location.pathname,
  });
};

/**
 * CTA 클릭 이벤트 트래킹
 *
 * @param props - 버튼 이름과 위치 정보
 * @example
 * trackCtaClick({ button_name: 'Get Started', location: 'hero' });
 */
export const trackCtaClick = (props: CtaClickProps): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  posthog.capture('cta_click', {
    button_name: props.button_name,
    location: props.location,
    timestamp: new Date().toISOString(),
  });
};

/**
 * 템플릿 선택 이벤트 트래킹
 *
 * @param props - 템플릿 이름
 * @example
 * trackTemplateSelect({ template_name: 'minimal-workspace' });
 */
export const trackTemplateSelect = (props: TemplateSelectProps): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  posthog.capture('template_select', {
    template_name: props.template_name,
    timestamp: new Date().toISOString(),
  });
};

/**
 * 가격 페이지 뷰 이벤트 트래킹
 *
 * @example
 * trackPricingView();
 */
export const trackPricingView = (): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  posthog.capture('pricing_view', {
    timestamp: new Date().toISOString(),
  });
};

/**
 * 베타 가입 클릭 이벤트 트래킹
 *
 * @example
 * trackBetaSignupClick();
 */
export const trackBetaSignupClick = (): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  posthog.capture('beta_signup_click', {
    timestamp: new Date().toISOString(),
  });
};

/**
 * 커스텀 이벤트 트래킹 (일반 용도)
 *
 * @param eventName - 이벤트 이름
 * @param properties - 이벤트 속성
 * @example
 * trackEvent('custom_event', { key: 'value' });
 */
export const trackEvent = (eventName: string, properties?: Record<string, unknown>): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  posthog.capture(eventName, properties);
};
