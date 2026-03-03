import type { BlogLocale } from '../../lib/blog';

export interface FreeTrialBannerContent {
  label: string;
  cta: string;
}

export const freeTrialBannerContent: Record<BlogLocale, FreeTrialBannerContent> = {
  en: {
    label: 'FramingUI Beta is live. Agent-first design systems for modern engineering teams.',
    cta: 'Start Free Trial',
  },
  ko: {
    label:
      'FramingUI 베타 버전이 출시되었습니다. 현대적인 엔지니어링 팀을 위한 에이전트 우선 디자인 시스템입니다.',
    cta: '무료 체험 시작하기',
  },
  ja: {
    label:
      'FramingUIベータ版がリリースされました。モダンなエンジニアリングチームのためのエージェントファーストデザインシステムです。',
    cta: '無料トライアルを開始',
  },
};

export function getFreeTrialBannerContent(locale: BlogLocale): FreeTrialBannerContent {
  return freeTrialBannerContent[locale] || freeTrialBannerContent.en;
}
