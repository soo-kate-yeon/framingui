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
      title: '플랜을 선택하세요',
      description:
        'AI 기반 디자인 시스템을 갖춘 프리미엄 React 템플릿. 오늘부터 프로덕션 준비가 완료된 인터페이스를 구축하세요.',
    },
    plans: {
      single: {
        name: '단일 템플릿',
        description: '프로젝트에 완벽한 템플릿으로 시작하세요.',
        priceLabel: '템플릿 보기',
        priceSub: '템플릿별 가격 상이',
        cta: '템플릿 둘러보기',
        features: [
          '선택한 템플릿 1개',
          '1년간 업데이트',
          '상업적 사용 가능',
          '이메일 지원 (72시간)',
        ],
      },
      double: {
        name: '더블 패키지',
        description: '더 많이 필요한 개발자를 위한 최고의 가치.',
        priceLabel: '$99',
        priceSub: '일회성 결제',
        cta: '시작하기',
        badge: '가장 인기 있는',
        features: [
          '선택한 템플릿 2개',
          '1년간 업데이트',
          '상업적 사용 가능',
          '이메일 지원 (72시간)',
          '개별 구매 대비 절약',
        ],
      },
      creator: {
        name: '크리에이터 패스',
        description: '활발한 빌더를 위한 무제한 액세스.',
        priceLabel: '$149',
        priceSub: '/년',
        cta: '구독하기',
        badge: '최고의 가치',
        features: [
          '모든 현재 템플릿',
          '모든 향후 템플릿 포함',
          '구독 기간 동안 업데이트',
          '우선 이메일 지원 (48시간)',
          '우선 지원 큐',
        ],
        renewalNotice: '연간 $149에 자동 갱신됩니다. 언제든지 취소할 수 있습니다.',
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
      subtitle: '가격 및 플랜에 대해 알아야 할 모든 것.',
      items: [
        {
          title: '업데이트 기간이 끝나면 어떻게 되나요?',
          content:
            '다운로드한 템플릿에 대한 전체 액세스 권한은 유지됩니다. 단지 새로운 업데이트를 받지 못할 뿐입니다. 언제든지 갱신하여 최신 버전을 받을 수 있습니다.',
        },
        {
          title: '클라이언트 프로젝트에서 템플릿을 사용할 수 있나요?',
          content:
            '네! 모든 플랜에는 상업적 라이선스가 포함되어 있습니다. 무제한 개인 및 클라이언트 프로젝트에서 템플릿을 사용할 수 있습니다. 유일한 제한은 템플릿 자체를 재판매하거나 재배포할 수 없다는 것입니다.',
        },
        {
          title: '크리에이터 패스 자동 갱신은 어떻게 작동하나요?',
          content:
            '크리에이터 패스는 매년 $149/년에 자동으로 갱신됩니다. 계정 설정에서 언제든지 취소할 수 있습니다 — 취소는 현재 청구 기간이 끝날 때 적용되며, 그때까지 액세스 권한은 유지됩니다.',
        },
        {
          title: '환불 정책은 어떻게 되나요?',
          content:
            '템플릿은 디지털 제품이므로 구매 후 7일 이내에 다운로드하기 전에 환불이 가능합니다. 기술적 결함 및 중복 구매는 항상 환불 대상입니다. 자세한 내용은 전체 환불 정책을 참조하세요.',
        },
        {
          title: '팀 또는 교육 할인을 제공하나요?',
          content:
            '팀 라이선스 및 교육 할인은 곧 제공될 예정입니다. 조기 액세스 또는 맞춤 가격은 soo.kate.yeon@gmail.com으로 문의하세요.',
        },
      ],
    },
  },
};

export function getPricingContent(locale: GlobalLocale): PricingContent {
  return pricingContent[locale];
}
