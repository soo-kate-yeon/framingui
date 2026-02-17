/**
 * Pricing Page i18n Content
 *
 * 가격 페이지의 모든 텍스트 콘텐츠를 영어/한국어로 관리
 */

import type { GlobalLocale } from '../../contexts/GlobalLanguageContext';

export interface PricingContent {
  nav: {
    brandName: string;
    getStarted: string;
  };
  hero: {
    title: string;
    description: string;
  };
  plans: {
    single: {
      name: string;
      description: string;
      priceLabel: string;
      priceSub: string;
      cta: string;
      features: string[];
    };
    double: {
      name: string;
      description: string;
      priceLabel: string;
      priceSub: string;
      cta: string;
      badge: string;
      features: string[];
    };
    creator: {
      name: string;
      description: string;
      priceLabel: string;
      priceSub: string;
      cta: string;
      badge: string;
      features: string[];
      renewalNotice: string;
    };
  };
  comparison: {
    title: string;
    tableHeaders: {
      feature: string;
      single: string;
      double: string;
      creator: string;
    };
    features: {
      templatesIncluded: string;
      futureTemplates: string;
      updateDuration: string;
      commercialUse: string;
      emailSupport: string;
      priorityQueue: string;
      communityDiscord: string;
      documentation: string;
    };
    values: {
      single: {
        templatesIncluded: string;
        updateDuration: string;
        emailSupport: string;
      };
      double: {
        templatesIncluded: string;
        updateDuration: string;
        emailSupport: string;
      };
      creator: {
        templatesIncluded: string;
        updateDuration: string;
        emailSupport: string;
      };
    };
  };
  faq: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      content: string;
    }[];
  };
}

export const pricingContent: Record<GlobalLocale, PricingContent> = {
  en: {
    nav: {
      brandName: 'TEKTON',
      getStarted: 'Get Started',
    },
    hero: {
      title: 'Choose your plan',
      description:
        'Premium React templates with AI-powered design system. Start building production-ready interfaces today.',
    },
    plans: {
      single: {
        name: 'Single Template',
        description: 'Start with the perfect template for your project.',
        priceLabel: 'See templates',
        priceSub: 'Price varies by template',
        cta: 'Browse Templates',
        features: [
          '1 template of your choice',
          '1 year of updates',
          'Commercial use',
          'Email support (72h)',
        ],
      },
      double: {
        name: 'Double Package',
        description: 'Best value for developers who need more.',
        priceLabel: '$99',
        priceSub: 'one-time payment',
        cta: 'Get Started',
        badge: 'Most Popular',
        features: [
          '2 templates of your choice',
          '1 year of updates',
          'Commercial use',
          'Email support (72h)',
          'Save vs. buying separately',
        ],
      },
      creator: {
        name: 'Creator Pass',
        description: 'Unlimited access for prolific builders.',
        priceLabel: '$149',
        priceSub: '/year',
        cta: 'Subscribe',
        badge: 'Best Value',
        features: [
          'All current templates',
          'All future templates included',
          'Updates during subscription',
          'Priority email support (48h)',
          'Priority support queue',
        ],
        renewalNotice: 'Auto-renews at $149/year. Cancel anytime.',
      },
    },
    comparison: {
      title: 'Compare plans',
      tableHeaders: {
        feature: 'Feature',
        single: 'Single',
        double: 'Double',
        creator: 'Creator Pass',
      },
      features: {
        templatesIncluded: 'Templates included',
        futureTemplates: 'Future templates',
        updateDuration: 'Update duration',
        commercialUse: 'Commercial use',
        emailSupport: 'Email support',
        priorityQueue: 'Priority queue',
        communityDiscord: 'Community Discord',
        documentation: 'Documentation',
      },
      values: {
        single: {
          templatesIncluded: '1',
          updateDuration: '1 year',
          emailSupport: '72h',
        },
        double: {
          templatesIncluded: '2',
          updateDuration: '1 year',
          emailSupport: '72h',
        },
        creator: {
          templatesIncluded: 'All',
          updateDuration: 'Subscription',
          emailSupport: '48h',
        },
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our pricing and plans.',
      items: [
        {
          title: 'What happens after my update period ends?',
          content:
            "You keep full access to the templates you downloaded. You just won't receive new updates. You can renew anytime to get the latest versions.",
        },
        {
          title: 'Can I use templates in client projects?',
          content:
            'Yes! All plans include a commercial license. You can use templates in unlimited personal and client projects. The only restriction is you cannot resell or redistribute the templates themselves.',
        },
        {
          title: 'How does Creator Pass auto-renewal work?',
          content:
            'Creator Pass renews automatically every year at $149/year. You can cancel anytime from your account settings — cancellation takes effect at the end of your current billing period, and you keep access until then.',
        },
        {
          title: 'What is your refund policy?',
          content:
            'Since templates are digital products, refunds are available before download within 7 days of purchase. Technical defects and duplicate purchases are always eligible for refund. See our full refund policy for details.',
        },
        {
          title: 'Do you offer team or education discounts?',
          content:
            'Team licenses and education discounts are coming soon. Contact us at soo.kate.yeon@gmail.com for early access or custom pricing.',
        },
      ],
    },
  },
  ko: {
    nav: {
      brandName: 'TEKTON',
      getStarted: '시작하기',
    },
    hero: {
      title: '플랜을 선택해보세요',
      description:
        'AI 기반 디자인 시스템을 갖춘 프리미엄 React 템플릿이에요. 오늘부터 바로 쓸 수 있는 인터페이스를 만들어보세요.',
    },
    plans: {
      single: {
        name: '단일 템플릿',
        description: '프로젝트에 딱 맞는 템플릿 하나로 시작해보세요.',
        priceLabel: '템플릿 보기',
        priceSub: '템플릿별 가격 상이',
        cta: '템플릿 둘러보기',
        features: [
          '원하는 템플릿 1개',
          '1년간 업데이트',
          '상업적 사용 가능',
          '이메일 지원 (72시간)',
        ],
      },
      double: {
        name: '더블 패키지',
        description: '더 많이 필요한 분들을 위한 최고의 가성비.',
        priceLabel: '$99',
        priceSub: '한 번만 결제',
        cta: '시작하기',
        badge: '가장 인기 있는',
        features: [
          '원하는 템플릿 2개',
          '1년간 업데이트',
          '상업적 사용 가능',
          '이메일 지원 (72시간)',
          '따로 사는 것보다 저렴해요',
        ],
      },
      creator: {
        name: '크리에이터 패스',
        description: '많이 만드는 분들을 위한 무제한 이용권.',
        priceLabel: '$149',
        priceSub: '/년',
        cta: '구독하기',
        badge: '최고의 가치',
        features: [
          '지금 있는 모든 템플릿',
          '앞으로 나올 템플릿도 전부',
          '구독 기간 동안 계속 업데이트',
          '빠른 이메일 지원 (48시간)',
          '우선 지원',
        ],
        renewalNotice: '매년 $149에 자동 갱신돼요. 언제든지 취소할 수 있어요.',
      },
    },
    comparison: {
      title: '플랜 비교',
      tableHeaders: {
        feature: '기능',
        single: '단일',
        double: '더블',
        creator: '크리에이터 패스',
      },
      features: {
        templatesIncluded: '포함된 템플릿',
        futureTemplates: '향후 템플릿',
        updateDuration: '업데이트 기간',
        commercialUse: '상업적 사용',
        emailSupport: '이메일 지원',
        priorityQueue: '우선 큐',
        communityDiscord: '커뮤니티 Discord',
        documentation: '문서',
      },
      values: {
        single: {
          templatesIncluded: '1개',
          updateDuration: '1년',
          emailSupport: '72시간',
        },
        double: {
          templatesIncluded: '2개',
          updateDuration: '1년',
          emailSupport: '72시간',
        },
        creator: {
          templatesIncluded: '전체',
          updateDuration: '구독 기간',
          emailSupport: '48시간',
        },
      },
    },
    faq: {
      title: '자주 묻는 질문',
      subtitle: '가격과 플랜에 대해 궁금한 점들을 모았어요.',
      items: [
        {
          title: '업데이트 기간이 끝나면 어떻게 되나요?',
          content:
            '다운로드한 템플릿은 계속 쓸 수 있어요. 다만 새로운 업데이트만 못 받을 뿐이에요. 언제든지 갱신하면 최신 버전을 받을 수 있어요.',
        },
        {
          title: '클라이언트 프로젝트에 써도 되나요?',
          content:
            '물론이죠! 모든 플랜에 상업용 라이선스가 포함돼 있어요. 개인 프로젝트든 클라이언트 프로젝트든 제한 없이 쓸 수 있어요. 단, 템플릿 자체를 재판매하거나 재배포하는 건 안 돼요.',
        },
        {
          title: '크리에이터 패스 자동 갱신은 어떻게 되나요?',
          content:
            '크리에이터 패스는 매년 $149에 자동으로 갱신돼요. 계정 설정에서 언제든 취소할 수 있어요. 취소하면 현재 결제 기간이 끝날 때 적용되고, 그때까지는 계속 이용하실 수 있어요.',
        },
        {
          title: '환불은 어떻게 받을 수 있나요?',
          content:
            '템플릿은 디지털 제품이라서, 구매 후 7일 이내에 다운로드하기 전이라면 환불받을 수 있어요. 기술적 문제나 중복 구매는 언제든 환불 가능해요. 자세한 내용은 환불 정책을 확인해보세요.',
        },
        {
          title: '팀이나 교육 할인이 있나요?',
          content:
            '팀 라이선스와 교육 할인은 곧 선보일 예정이에요. 미리 써보고 싶거나 맞춤 가격이 필요하시면 soo.kate.yeon@gmail.com으로 연락 주세요.',
        },
      ],
    },
  },
};

export function getPricingContent(locale: GlobalLocale): PricingContent {
  return pricingContent[locale];
}
