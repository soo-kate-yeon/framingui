/**
 * Landing Page i18n Content
 *
 * 랜딩 페이지의 모든 텍스트 콘텐츠를 영어/한국어로 관리
 */

import type { GlobalLocale } from '../../contexts/GlobalLanguageContext';

export interface LandingContent {
  nav: {
    brandName: string;
    pricing: string;
    docs: string;
    tryStudio: string;
    getStarted: string;
  };
  hero: {
    brandName: string;
    title: {
      part1: string;
      part2: string;
    };
    description: string;
    buttons: {
      tryStudio: string;
      getStarted: string;
    };
  };
  mainImage: {
    alt: string;
    placeholder: string;
  };
  sections: {
    s1: { title: string; description: string };
    s2: { title: string; description: string };
    s3: { title: string; description: string };
    s4: { title: string; description: string };
  };
  section5: {
    badge: string;
    title: string;
    description: string;
    cta: string;
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

export const landingContent: Record<GlobalLocale, LandingContent> = {
  en: {
    nav: {
      brandName: 'framingui',
      pricing: 'Pricing',
      docs: 'Docs',
      tryStudio: 'Try Explore',
      getStarted: 'Sign up',
    },
    hero: {
      brandName: 'framingui',
      title: {
        part1: 'Agent-first',
        part2: 'Design System',
      },
      description:
        'framingui is the first design system AI agents can actually understand. Structured tokens and layout logic let agents generate professional, production-ready UI—directly in your codebase. No Figma. No guesswork.',
      buttons: {
        tryStudio: 'Try Explore Free',
        getStarted: 'Sign up',
      },
    },
    mainImage: {
      alt: 'Main Dashboard Preview',
      placeholder: 'Main Dashboard Preview',
    },
    sections: {
      s1: {
        title: 'Core of the Design System: Tokens',
        description:
          'Complete architecture leveraging atomic colors, typography, spacing, and elevation. Every pixel mathematically aligned.',
      },
      s2: {
        title: 'Production Quality: Adaptive Layout',
        description:
          'Understands App and Web Shells. Tokens scale naturally to provide a perfectly responsive layout across all breakpoints.',
      },
      s3: {
        title: '30+ Built-in shadcn/ui Components',
        description:
          'Automatically applies the design system guide, rendering custom components perfectly tailored to your service identity.',
      },
      s4: {
        title: 'Adopt Immediately with MCP',
        description:
          'No Figma, no canvas required. Issue natural language commands directly in your IDE, CLI, or OpenClaw to design instantly.',
      },
    },
    section5: {
      badge: 'March Launch Beta Invite',
      title: 'Choose 1 Design System for Free',
      description:
        'Leave a detailed review to receive a 1-Year Creator Pass with unlimited access.',
      cta: 'Explore design system',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about framingui.',
      items: [
        {
          title: 'How do I use the templates?',
          content:
            'Pick a template, install the MCP server with one command, and your AI coding tool is ready to generate production UI. During beta, your first template is free.',
        },
        {
          title: 'Is framingui free?',
          content:
            'framingui requires a paid license. You need to purchase at least one template to unlock MCP server access and start generating production UI with your agent.',
        },
        {
          title: 'Can I use it for app development?',
          content:
            'Currently, TEKTON supports the React ecosystem — including Next.js and Vite projects. The init CLI auto-detects both frameworks. Native mobile design system support is coming soon.',
        },
        {
          title: 'Can I apply it to an existing project?',
          content:
            'Yes! Run npx @framingui/mcp-server init in your project root. It auto-detects your framework, installs dependencies, and configures everything — without breaking your existing code.',
        },
        {
          title: 'Is there a Figma import feature?',
          content:
            "Not yet. We're building a Figma-to-Tekton bridge that will convert your custom designs into AI-native tokens. Stay tuned for updates.",
        },
      ],
    },
  },
  ko: {
    nav: {
      brandName: 'framingui',
      pricing: '가격',
      docs: '문서',
      tryStudio: 'Explore 체험',
      getStarted: '가입하기',
    },
    hero: {
      brandName: 'framingui',
      title: {
        part1: '에이전트-퍼스트',
        part2: '디자인 시스템',
      },
      description:
        'framingui는 AI 에이전트가 완벽하게 이해할 수 있는 첫 번째 디자인 시스템입니다. 구조화된 토큰과 직관적인 레이아웃 로직으로, 당신의 아이디어를 즉시 프로덕션 수준의 UI로 렌더링하세요.',
      buttons: {
        tryStudio: '디자인 시스템 살펴보기...',
        getStarted: '가입하기',
      },
    },
    mainImage: {
      alt: '메인 대시보드 미리보기',
      placeholder: '메인 대시보드 미리보기',
    },
    sections: {
      s1: {
        title: '디자인 시스템의 코어: 토큰',
        description:
          '컬러, 타이포그래피, 여백까지. 완벽하게 계산된 OKLCH 토큰 아키텍처가 에이전트에게 명확한 가이드를 제공합니다.',
      },
      s2: {
        title: '프로덕션 품질의 핵심: 레이아웃',
        description:
          '앱과 웹 Shell을 완벽하게 이해합니다. 단순한 그리드를 넘어 모바일, 태블릿, 데스크톱에 맞춰 자동으로 조정되는 반응형 레이아웃을 제공합니다.',
      },
      s3: {
        title: '30개 이상의 shadcn/ui 컴포넌트 기본 제공',
        description:
          '자동으로 디자인 시스템 가이드가 적용되어, 여러분이 만드는 서비스 아이덴티티에 딱 맞는 커스텀 컴포넌트로 렌더링합니다.',
      },
      s4: {
        title: 'MCP로 바로 도입',
        description:
          'Figma 필요 없고, 캔버스도 필요 없어요. IDE, CLI, 심지어는 OpenClaw에서 자연어로 명령해 바로 프론트엔드 코드를 디자인하세요.',
      },
    },
    section5: {
      badge: '3월 런칭 베타 한정',
      title: 'Design System 1개를 골라 무료로 사용할 수 있어요.',
      description: '상세한 리뷰를 남겨주신 분께는 무제한 사용이 가능한 1년 Creator Pass를 드려요.',
      cta: '디자인 시스템 살펴보기',
    },
    faq: {
      title: '자주 묻는 질문',
      subtitle: 'framingui에 대해 알아야 할 모든 것.',
      items: [
        {
          title: '템플릿은 어떻게 사용하나요?',
          content:
            '템플릿을 고르고, 명령어 하나로 MCP 서버를 설치하면 AI 코딩 도구에서 바로 프로덕션 UI를 만들 수 있어요. 베타 기간에는 첫 번째 템플릿이 무료예요.',
        },
        {
          title: 'framingui는 무료인가요?',
          content:
            'framingui는 유료예요. MCP 서버에 접근하고 에이전트로 실제 사용 가능한 UI를 만들려면 최소 템플릿 하나는 구매하셔야 해요.',
        },
        {
          title: '앱 개발에 사용할 수 있나요?',
          content:
            '지금은 React 생태계를 지원해요. Next.js랑 Vite 프로젝트 모두 쓸 수 있어요. init CLI가 프레임워크를 자동으로 감지해줘요. 네이티브 모바일 디자인 시스템 지원은 곧 만나볼 수 있어요.',
        },
        {
          title: '기존 프로젝트에 적용할 수 있나요?',
          content:
            '물론이죠! 프로젝트 루트에서 npx @framingui/mcp-server init을 실행해보세요. 프레임워크를 자동으로 인식하고 필요한 패키지를 설치한 뒤 모든 걸 세팅해줘요. 기존 코드는 건드리지 않아요.',
        },
        {
          title: 'Figma 가져오기 기능이 있나요?',
          content:
            '아직은 없어요. 커스텀 디자인을 AI가 이해할 수 있는 토큰으로 바꿔주는 Figma-to-Tekton 브리지를 만들고 있어요. 조금만 기다려주세요!',
        },
      ],
    },
  },
};

export function getLandingContent(locale: GlobalLocale): LandingContent {
  return landingContent[locale];
}
