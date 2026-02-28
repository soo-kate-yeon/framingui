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

const landingContent: Record<'en' | 'ko', LandingContent> = {
  en: {
    nav: {
      brandName: 'framingui',
      pricing: 'Pricing',
      docs: 'Docs',
      tryStudio: 'Try Explore',
      getStarted: 'Start Free Trial',
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
        getStarted: 'Start Free Trial',
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
      pricing: '요금',
      docs: '문서',
      tryStudio: 'Explore 둘러보기',
      getStarted: '가입하기',
    },
    hero: {
      brandName: 'framingui',
      title: {
        part1: 'AI가 이해하는',
        part2: '디자인 시스템',
      },
      description:
        'framingui는 AI가 실제로 이해하는 디자인 시스템입니다. 구조화된 토큰과 레이아웃 규칙을 기반으로 에이전트가 추측 없이 코드베이스에서 프로덕션급 UI를 생성합니다.',
      buttons: {
        tryStudio: '무료로 Explore 시작',
        getStarted: '가입하기',
      },
    },
    mainImage: {
      alt: '메인 대시보드 미리보기',
      placeholder: '메인 대시보드 미리보기',
    },
    sections: {
      s1: {
        title: '디자인 시스템의 핵심, 토큰',
        description:
          '컬러, 타이포그래피, 간격을 토큰으로 체계화했습니다. OKLCH 기반 구조를 통해 에이전트가 기준을 정확히 적용합니다.',
      },
      s2: {
        title: '프로덕션 퀄리티를 만드는 레이아웃',
        description:
          'App/Web Shell 구조를 기준으로 반응형 레이아웃을 구성합니다. 모바일부터 데스크톱까지 토큰 스케일이 일관되게 연결됩니다.',
      },
      s3: {
        title: '30+ shadcn/ui 컴포넌트 기본 탑재',
        description:
          '디자인 시스템 가이드를 자동으로 반영해 서비스 톤에 맞는 UI를 구성합니다. 기본 컴포넌트로 시작해도 제품 수준의 결과를 만들 수 있습니다.',
      },
      s4: {
        title: 'MCP로 바로 투입',
        description:
          'Figma 없이도 시작할 수 있습니다. IDE, CLI, OpenClaw에서 자연어로 지시하면 에이전트가 프론트엔드 코드를 즉시 생성합니다.',
      },
    },
    section5: {
      badge: '3월 런칭 베타 한정 혜택',
      title: '디자인 시스템 1개를 무료로 이용해 보세요.',
      description:
        '리뷰를 남기면 1년 Creator Pass를 제공합니다. 기간 내에 제한 없이 이용할 수 있습니다.',
      cta: '디자인 시스템 살펴보기',
    },
    faq: {
      title: '자주 묻는 질문',
      subtitle: 'framingui 시작 전에 자주 확인하는 내용입니다.',
      items: [
        {
          title: '템플릿은 어떻게 사용하나요?',
          content:
            '템플릿을 선택한 뒤 명령어 한 번으로 MCP 서버를 설치합니다. 바로 AI 코딩 도구에서 프로덕션 UI를 생성할 수 있으며, 베타 기간에는 첫 템플릿을 무료로 제공합니다.',
        },
        {
          title: 'framingui는 무료인가요?',
          content:
            'framingui는 유료 서비스입니다. MCP 서버 접근과 실사용 UI 생성을 위해 템플릿을 최소 1개 구매해야 합니다.',
        },
        {
          title: '앱 개발에 사용할 수 있나요?',
          content:
            '현재는 React 생태계(Next.js, Vite)를 지원합니다. init CLI가 프레임워크를 자동으로 감지하고 설정합니다. 네이티브 모바일 디자인 시스템 지원도 준비 중입니다.',
        },
        {
          title: '기존 프로젝트에 적용할 수 있나요?',
          content:
            '가능합니다. 프로젝트 루트에서 npx @framingui/mcp-server init을 실행하면 프레임워크 인식, 패키지 설치, 설정을 자동으로 처리합니다. 기존 코드는 변경하지 않습니다.',
        },
        {
          title: 'Figma 가져오기 기능이 있나요?',
          content:
            '아직 제공하지 않습니다. 커스텀 디자인을 AI가 읽을 수 있는 토큰으로 변환하는 Figma-to-Tekton 브리지를 개발하고 있습니다.',
        },
      ],
    },
  },
};

export function getLandingContent(locale: GlobalLocale): LandingContent {
  return locale === 'ko' ? landingContent.ko : landingContent.en;
}
