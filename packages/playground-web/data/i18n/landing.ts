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
        'framingui는 AI가 진짜로 읽는 디자인 시스템이다. 구조화된 토큰과 레이아웃 규칙 덕분에 에이전트가 추측 없이 코드베이스에서 바로 프로덕션급 UI를 만든다.',
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
          '컬러, 타이포, 간격까지 토큰으로 정리했다. OKLCH 기반 구조라 에이전트가 헤매지 않고 정확히 따라간다.',
      },
      s2: {
        title: '프로덕션 퀄리티를 만드는 레이아웃',
        description:
          'App/Web Shell 구조를 기준으로 반응형이 자연스럽게 맞춰진다. 모바일부터 데스크톱까지 토큰 스케일이 깔끔하게 이어진다.',
      },
      s3: {
        title: '30+ shadcn/ui 컴포넌트 기본 탑재',
        description:
          '디자인 시스템 가이드를 자동 반영해 서비스 톤에 맞는 UI를 만든다. 기본 컴포넌트로 시작해도 결과물은 충분히 제품급이다.',
      },
      s4: {
        title: 'MCP로 바로 투입',
        description:
          'Figma 없어도 된다. IDE, CLI, OpenClaw에서 자연어로 지시하면 에이전트가 바로 프론트엔드 코드를 뽑는다.',
      },
    },
    section5: {
      badge: '3월 런칭 베타 한정 혜택',
      title: '디자인 시스템 1개, 무료로 써봐.',
      description: '리뷰를 자세히 남기면 1년 Creator Pass를 준다. 제한 없이 써볼 수 있다.',
      cta: '디자인 시스템 살펴보기',
    },
    faq: {
      title: '자주 묻는 질문',
      subtitle: 'framingui 시작 전에 많이 묻는 것들.',
      items: [
        {
          title: '템플릿은 어떻게 사용하나요?',
          content:
            '템플릿을 고른 뒤 명령어 한 번으로 MCP 서버를 설치하면 된다. 바로 AI 코딩 도구에서 프로덕션 UI를 만들 수 있고, 베타 기간에는 첫 템플릿이 무료다.',
        },
        {
          title: 'framingui는 무료인가요?',
          content:
            'framingui는 유료다. MCP 서버 접근과 실사용 UI 생성을 하려면 템플릿을 최소 1개 구매해야 한다.',
        },
        {
          title: '앱 개발에 사용할 수 있나요?',
          content:
            '지금은 React 생태계(Next.js, Vite)를 지원한다. init CLI가 프레임워크를 자동으로 감지하고 설정한다. 네이티브 모바일 디자인 시스템 지원도 준비 중이다.',
        },
        {
          title: '기존 프로젝트에 적용할 수 있나요?',
          content:
            '가능하다. 프로젝트 루트에서 npx @framingui/mcp-server init만 실행하면 된다. 프레임워크 인식, 패키지 설치, 설정까지 자동으로 처리하고 기존 코드는 건드리지 않는다.',
        },
        {
          title: 'Figma 가져오기 기능이 있나요?',
          content:
            '아직은 없다. 커스텀 디자인을 AI가 읽는 토큰으로 바꿔주는 Figma-to-Tekton 브리지를 만들고 있다.',
        },
      ],
    },
  },
};

export function getLandingContent(locale: GlobalLocale): LandingContent {
  return landingContent[locale];
}
