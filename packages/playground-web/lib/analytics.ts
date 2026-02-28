/**
 * PostHog Analytics 이벤트 헬퍼 함수
 *
 * 타입 안전한 이벤트 트래킹을 위한 유틸리티 함수들
 *
 * WHY: 일관된 이벤트 명명과 타입 안전성 보장
 * IMPACT: 런타임 에러 방지 및 개발자 경험 향상
 */

import posthog from 'posthog-js';
import { classifyInflowChannel, getUtmEventProperties } from './utm';

/**
 * 이벤트 타입 정의
 */
export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'template_select'
  | 'pricing_view'
  | 'beta_signup_click'
  | 'funnel_home_entered'
  | 'funnel_docs_or_explore_entered'
  | 'funnel_primary_cta_clicked'
  | 'funnel_free_trial_started';

/**
 * CTA 클릭 이벤트 속성
 */
export interface CtaClickProps {
  button_name: string;
  location: string;
}

export interface FunnelSectionEnterProps {
  section: 'docs' | 'explore';
  path: string;
}

export interface FunnelPrimaryCtaClickProps {
  cta_id: string;
  cta_label: string;
  location: string;
  destination?: string;
  cta_variant?: 'primary' | 'secondary' | 'beta' | 'free-start';
}

export interface FunnelFreeTrialStartedProps {
  entry_point: string;
  is_authenticated: boolean;
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

const captureWithAttribution = (
  eventName: AnalyticsEvent | string,
  properties?: Record<string, unknown>
): void => {
  if (!isPostHogInitialized()) {
    return;
  }

  const utmProperties = getUtmEventProperties();
  const eventProperties: Record<string, unknown> = {
    ...utmProperties,
    ...properties,
  };

  if (!eventProperties.inflow_channel) {
    const source =
      typeof eventProperties.utm_source === 'string'
        ? eventProperties.utm_source
        : typeof eventProperties.first_utm_source === 'string'
          ? eventProperties.first_utm_source
          : typeof eventProperties.session_utm_source === 'string'
            ? eventProperties.session_utm_source
            : undefined;
    eventProperties.inflow_channel = classifyInflowChannel(source);
  }

  posthog.capture(eventName, eventProperties);
};

/**
 * 페이지 뷰 이벤트 트래킹
 *
 * @example
 * trackPageView();
 */
export const trackPageView = (): void => {
  captureWithAttribution('page_view', {
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
  captureWithAttribution('cta_click', {
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
  captureWithAttribution('template_select', {
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
  captureWithAttribution('pricing_view', {
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
  captureWithAttribution('beta_signup_click', {
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
  captureWithAttribution(eventName, properties);
};

export const trackFunnelHomeEntered = (): void => {
  captureWithAttribution('funnel_home_entered', {
    path: '/',
    timestamp: new Date().toISOString(),
  });
};

export const trackFunnelSectionEntered = (props: FunnelSectionEnterProps): void => {
  captureWithAttribution('funnel_docs_or_explore_entered', {
    section: props.section,
    path: props.path,
    timestamp: new Date().toISOString(),
  });
};

export const trackFunnelPrimaryCtaClick = (props: FunnelPrimaryCtaClickProps): void => {
  captureWithAttribution('funnel_primary_cta_clicked', {
    cta_id: props.cta_id,
    cta_label: props.cta_label,
    location: props.location,
    destination: props.destination,
    cta_variant: props.cta_variant,
    timestamp: new Date().toISOString(),
  });
};

export const trackFunnelFreeTrialStarted = (props: FunnelFreeTrialStartedProps): void => {
  captureWithAttribution('funnel_free_trial_started', {
    entry_point: props.entry_point,
    is_authenticated: props.is_authenticated,
    timestamp: new Date().toISOString(),
  });
};
