/**
 * Landing Page i18n Content
 *
 * 랜딩 페이지의 모든 텍스트 콘텐츠를 영어/한국어/일본어로 관리
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
      browseThemes: string;
      freeTrial: string;
    };
    noCreditCard: string;
    initPrompt: string;
    demoPlaceholder: string;
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
  useCases: {
    title: string;
    subtitle: string;
  };
  templateCarousel: {
    title: string;
    subtitle: string;
    copyPromptLabel: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
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

const landingContent: Record<GlobalLocale, LandingContent> = {
  en: {
    nav: {
      brandName: 'framingui',
      pricing: 'Pricing',
      docs: 'Docs',
      tryStudio: 'Try Explore',
      getStarted: 'Start with Free Quota',
    },
    hero: {
      brandName: 'framingui',
      title: {
        part1: 'Built for AI agents to ship real UI,',
        part2: 'framingui is the MCP UI system your agent actually uses.',
      },
      description: '',
      buttons: {
        tryStudio: 'Try Explore Free',
        getStarted: 'Start with Free Quota',
        browseThemes: 'Explore Themes',
        freeTrial: 'Start with Free Quota',
      },
      noCreditCard: '100 weighted tool units included every month',
      initPrompt: 'npx @framingui/mcp-server init',
      demoPlaceholder: 'Create a dashboard with...',
    },
    mainImage: {
      alt: 'Main Dashboard Preview',
      placeholder: 'Main Dashboard Preview',
    },
    sections: {
      s1: {
        title: 'Core of the UI System: Tokens',
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
          'Automatically applies the UI system guide, rendering custom components perfectly tailored to your service identity.',
      },
      s4: {
        title: 'Adopt Immediately with MCP',
        description:
          'No canvas guessing required. Use MCP in your IDE, CLI, or agent runtime to discover components, validate screens, and track workflow usage.',
      },
    },
    section5: {
      badge: 'Quota Transition Access',
      title: 'Start Free, Upgrade by Usage',
      description:
        'Start with 100 weighted tool units per month, then move to a larger monthly allowance when your workflow is stable.',
      cta: 'View pricing',
    },
    useCases: {
      title: 'See It in Action',
      subtitle: 'Real UI screens generated with framingui — fully interactive, scroll to explore.',
    },
    templateCarousel: {
      title: 'Choose Your UI System',
      subtitle: 'Pick a theme, copy the prompt, and let your AI agent build the UI.',
      copyPromptLabel: 'Copy Prompt',
    },
    howItWorks: {
      title: 'Ship UI in 3 Steps',
      subtitle: 'From install to production-ready screens in minutes.',
      steps: [
        {
          title: 'Install',
          description: 'Run one command to add the MCP server to your agent.',
        },
        {
          title: 'Choose a UI System',
          description: 'Browse themes and pick the one that fits your product.',
        },
        {
          title: 'Generate',
          description: 'Tell your AI agent what to build — it handles the rest.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about framingui.',
      items: [
        {
          title: 'How does framingui work?',
          content:
            'Install the MCP server, authenticate once, inspect `whoami` for theme entitlements and your 100-unit free quota snapshot, then use the screen workflow to generate and validate production UI.',
        },
        {
          title: 'Is framingui free?',
          content:
            'Yes. The free plan includes 100 weighted tool units per month, so you can explore the MCP workflow before moving to a larger recurring quota.',
        },
        {
          title: 'Can I use it for app development?',
          content:
            'Yes. framingui supports web React workflows and now includes a direct-write path for Expo and React Native through `@framingui/react-native`.',
        },
        {
          title: 'Can I apply it to an existing project?',
          content:
            'Yes! Run npx @framingui/mcp-server init in your project root. It auto-detects your framework, installs dependencies, and configures everything — without breaking your existing code.',
        },
        {
          title: 'Is there a Figma import feature?',
          content:
            "Not yet. Today's core workflow is MCP-first: component discovery, theme guidance, validation, and direct code output in your coding environment.",
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
      getStarted: '무료 quota로 시작',
    },
    hero: {
      brandName: 'framingui',
      title: {
        part1: 'AI 에이전트가 진짜 UI를 만들도록,',
        part2: 'framingui는 에이전트가 실제로 쓰는 MCP UI 시스템입니다.',
      },
      description: '',
      buttons: {
        tryStudio: '무료로 Explore 시작',
        getStarted: '무료 quota로 시작',
        browseThemes: '테마 둘러보기',
        freeTrial: '무료 quota로 시작',
      },
      noCreditCard: '매달 100 weighted tool units 포함',
      initPrompt: 'npx @framingui/mcp-server init',
      demoPlaceholder: '대시보드를 만들어줘...',
    },
    mainImage: {
      alt: '메인 대시보드 미리보기',
      placeholder: '메인 대시보드 미리보기',
    },
    sections: {
      s1: {
        title: 'UI 시스템의 핵심, 토큰',
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
          'UI 시스템 가이드를 자동으로 반영해 서비스 톤에 맞는 UI를 구성합니다. 기본 컴포넌트로 시작해도 제품 수준의 결과를 만들 수 있습니다.',
      },
      s4: {
        title: 'MCP로 바로 투입',
        description:
          '캔버스에서 감으로 맞출 필요가 없습니다. IDE, CLI, OpenClaw에서 MCP로 컴포넌트를 찾고 화면을 검증하면서 사용량까지 확인할 수 있습니다.',
      },
    },
    section5: {
      badge: 'Quota 전환 안내',
      title: '무료로 시작하고 사용량에 맞춰 확장하세요.',
      description:
        '매달 100 weighted tool units로 시작하고, 워크플로우가 안정되면 더 큰 월간 플랜으로 확장할 수 있습니다.',
      cta: '요금 보기',
    },
    useCases: {
      title: '직접 확인해 보세요',
      subtitle: 'framingui로 생성한 실제 UI 화면 — 인터랙션 가능, 스크롤해서 탐색하세요.',
    },
    templateCarousel: {
      title: 'UI 시스템을 선택하세요',
      subtitle: '테마를 고르고, 프롬프트를 복사해서 AI 에이전트에게 전달하세요.',
      copyPromptLabel: '프롬프트 복사',
    },
    howItWorks: {
      title: '3단계로 UI 완성',
      subtitle: '설치부터 프로덕션 화면까지, 몇 분이면 충분합니다.',
      steps: [
        {
          title: '설치',
          description: '명령어 한 줄로 에이전트에 MCP 서버를 추가합니다.',
        },
        {
          title: 'UI 시스템 선택',
          description: '테마를 둘러보고 제품에 맞는 것을 선택하세요.',
        },
        {
          title: '생성',
          description: 'AI 에이전트에게 만들 화면을 알려주세요 — 나머지는 알아서 합니다.',
        },
      ],
    },
    faq: {
      title: '자주 묻는 질문',
      subtitle: 'framingui 시작 전에 자주 확인하는 내용입니다.',
      items: [
        {
          title: 'framingui는 어떻게 사용하나요?',
          content:
            'MCP 서버를 설치하고 로그인한 뒤 `whoami`로 테마 entitlement와 무료 100-unit quota 상태를 확인합니다. 이후 screen workflow로 프로덕션 UI를 생성하고 검증합니다.',
        },
        {
          title: 'framingui는 무료인가요?',
          content:
            '네. 무료 플랜에는 매달 100 weighted tool units가 포함되어 있어, MCP 워크플로우를 먼저 써보고 더 큰 월간 플랜으로 넘어갈 수 있습니다.',
        },
        {
          title: '앱 개발에 사용할 수 있나요?',
          content:
            '네. 현재는 web React 워크플로우를 지원하고, Expo/React Native를 위한 direct-write 경로도 `@framingui/react-native`로 제공하고 있습니다.',
        },
        {
          title: '기존 프로젝트에 적용할 수 있나요?',
          content:
            '가능합니다. 프로젝트 루트에서 npx @framingui/mcp-server init을 실행하면 프레임워크 인식, 패키지 설치, 설정을 자동으로 처리합니다. 기존 코드는 변경하지 않습니다.',
        },
        {
          title: 'Figma 가져오기 기능이 있나요?',
          content:
            '아직 제공하지 않습니다. 현재 핵심은 MCP 기반의 컴포넌트 discovery, theme guidance, validation, direct code output입니다.',
        },
      ],
    },
  },
};

export function getLandingContent(locale: GlobalLocale): LandingContent {
  return landingContent[locale];
}
