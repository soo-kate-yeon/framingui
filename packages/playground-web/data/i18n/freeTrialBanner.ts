import type { BlogLocale } from '../../lib/blog';

export interface FreeTrialBannerContent {
  label: string;
  cta: string;
}

export const freeTrialBannerContent: Record<BlogLocale, FreeTrialBannerContent> = {
  en: {
    label: 'See what you can build — browse our UI templates',
    cta: 'Explore',
  },
  ko: {
    label: '어떤 템플릿이 있는지 둘러보세요. 모든 템플릿은 3일 무료체험이 가능해요.',
    cta: '둘러보기',
  },
  ja: {
    label: 'FramingUIのすべての機能を3日間無料でお試しください。',
    cta: '無料トライアルを開始',
  },
};

export function getFreeTrialBannerContent(locale: BlogLocale): FreeTrialBannerContent {
  return freeTrialBannerContent[locale] || freeTrialBannerContent.en;
}
