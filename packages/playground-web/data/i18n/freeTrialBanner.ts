import type { BlogLocale } from '../../lib/blog';

export interface FreeTrialBannerContent {
  label: string;
  cta: string;
}

export const freeTrialBannerContent: Record<BlogLocale, FreeTrialBannerContent> = {
  en: {
    label: 'Try all FramingUI features free for 3 days.',
    cta: 'Start Free Trial',
  },
  ko: {
    label: 'FramingUI의 모든 기능을 3일 동안 무료로 체험해보세요.',
    cta: '무료 체험 시작하기',
  },
  ja: {
    label: 'FramingUIのすべての機能を3日間無料でお試しください。',
    cta: '無料トライアルを開始',
  },
};

export function getFreeTrialBannerContent(locale: BlogLocale): FreeTrialBannerContent {
  return freeTrialBannerContent[locale] || freeTrialBannerContent.en;
}
