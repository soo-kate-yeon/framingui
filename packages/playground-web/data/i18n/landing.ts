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
    preview: string;
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
      previewDemo: string;
      getStarted: string;
    };
  };
  mainImage: {
    alt: string;
    placeholder: string;
  };
  feature1: {
    title: string;
    accordionItems: {
      title: string;
      content: string;
    }[];
    imageAlt: string;
  };
  feature2: {
    title: string;
    accordionItems: {
      title: string;
      content: string;
    }[];
    imageAlt: string;
  };
  feature3: {
    title: string;
    accordionItems: {
      title: string;
      content: string;
    }[];
    imageAlt: string;
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
      brandName: 'TEKTON',
      pricing: 'Pricing',
      preview: 'Preview',
      getStarted: 'Get Started',
    },
    hero: {
      brandName: 'TEKTON',
      title: {
        part1: 'Design Intelligence',
        part2: 'for AI Agents',
      },
      description:
        'TEKTON is the first design system AI agents can actually understand. Structured tokens and layout logic let agents generate professional, production-ready UI—directly in your codebase. No Figma. No guesswork.',
      buttons: {
        previewDemo: 'Preview Demo',
        getStarted: 'Get Started',
      },
    },
    mainImage: {
      alt: 'Main Dashboard Preview',
      placeholder: 'Main Dashboard Preview',
    },
    feature1: {
      title: 'High-Quality Themes. Zero Design Effort.',
      accordionItems: [
        {
          title: 'Precision OKLCH Token System',
          content:
            'Every theme ships with a complete OKLCH-based token architecture — atomic colors, semantic layers, typography, spacing, elevation, motion, density, state layers, and dark mode. All WCAG AA compliant out of the box.',
        },
        {
          title: 'Fully Responsive Layout Tokens',
          content:
            'Go beyond basic grids. TEKTON defines structured tokens for Shells (app frames), Pages (content layouts), and Sections (content blocks) that auto-adapt across Mobile, Tablet, and Desktop breakpoints. Your agent knows exactly how to scale.',
        },
        {
          title: 'Built on 30+ shadcn/ui Components',
          content:
            'From Buttons and Cards to Dialogs, Tables, Sidebars, and Calendars — built on battle-tested shadcn/ui primitives organized into 3 tiers. Stable, consistent, and ready to ship.',
        },
      ],
      imageAlt: 'Feature Image 1',
    },
    feature2: {
      title: 'From Chat to Production. Instantly.',
      accordionItems: [
        {
          title: 'Works Everywhere MCP Runs',
          content:
            'Not locked to one platform. Claude Code, Cursor, Windsurf, OpenAI Codex — if it supports MCP, TEKTON works. One npx command and your agent has full design capabilities.',
        },
        {
          title: 'Import a System, Not Just a Screen',
          content:
            "Don't just generate one UI — import an entire design language. With tekton init, your agent sets up theme tokens, component libraries, and layout logic to design every flow in your product consistently.",
        },
        {
          title: 'Production-Ready TypeScript Output',
          content:
            'Generated code is clean, fully typed, and uses Tailwind CSS with design tokens. It looks and behaves exactly like code written by a senior engineer — because the system enforces it.',
        },
      ],
      imageAlt: 'Feature Image 2',
    },
    feature3: {
      title: 'Deterministic UI. No Hallucinations.',
      accordionItems: [
        {
          title: 'Reliable Code, Every Single Time',
          content:
            'Raw LLMs guess at styles and layouts — TEKTON eliminates that. A semantic scoring algorithm places components using weighted rules, producing code that follows strict design constraints instead of hallucinating CSS.',
        },
        {
          title: '6 Curated Themes, Ready Now',
          content:
            'classic-magazine, equinox-fitness, minimal-workspace, neutral-humanism, round-minimal, square-minimalism — each handcrafted with 200+ tokens. Pick one, and your agent handles the rest.',
        },
        {
          title: 'Safety Protocols Built In',
          content:
            'Multi-layer validation — threshold checks, hallucination detection, constraint enforcement, and automatic fallbacks — ensures your agent never ships broken UI.',
        },
      ],
      imageAlt: 'Feature Image 3',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about Tekton.',
      items: [
        {
          title: 'Is TEKTON free?',
          content:
            'TEKTON requires a paid license. You need to purchase at least one theme to unlock MCP server access and start generating production UI with your agent.',
        },
        {
          title: 'Can I use it for app development?',
          content:
            'Currently, TEKTON supports the React ecosystem — including Next.js and Vite projects. The init CLI auto-detects both frameworks. Native mobile design system support is coming soon.',
        },
        {
          title: 'Can I apply it to an existing project?',
          content:
            'Yes! Run npx @tekton-ui/mcp-server init in your project root. It auto-detects your framework, installs dependencies, and configures everything — without breaking your existing code.',
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
      brandName: 'TEKTON',
      pricing: '가격',
      preview: '미리보기',
      getStarted: '시작하기',
    },
    hero: {
      brandName: 'TEKTON',
      title: {
        part1: 'AI 에이전트를 위한',
        part2: '디자인 인텔리전스',
      },
      description:
        'TEKTON은 AI 에이전트가 실제로 이해할 수 있는 최초의 디자인 시스템입니다. 구조화된 토큰과 레이아웃 로직을 통해 에이전트가 전문적이고 프로덕션 준비가 완료된 UI를 코드베이스에 직접 생성합니다. Figma도, 추측도 필요 없습니다.',
      buttons: {
        previewDemo: '데모 보기',
        getStarted: '시작하기',
      },
    },
    mainImage: {
      alt: '메인 대시보드 미리보기',
      placeholder: '메인 대시보드 미리보기',
    },
    feature1: {
      title: '고품질 테마. 디자인 노력은 제로.',
      accordionItems: [
        {
          title: '정밀한 OKLCH 토큰 시스템',
          content:
            '모든 테마는 완전한 OKLCH 기반 토큰 아키텍처와 함께 제공됩니다 — 원자 색상, 시맨틱 레이어, 타이포그래피, 간격, 높이, 모션, 밀도, 상태 레이어, 다크 모드. 모두 기본적으로 WCAG AA를 준수합니다.',
        },
        {
          title: '완전 반응형 레이아웃 토큰',
          content:
            '기본 그리드를 넘어섭니다. TEKTON은 Shells(앱 프레임), Pages(콘텐츠 레이아웃), Sections(콘텐츠 블록)에 대한 구조화된 토큰을 정의하여 모바일, 태블릿, 데스크톱 브레이크포인트에 자동으로 적응합니다. 에이전트는 정확히 어떻게 확장할지 알고 있습니다.',
        },
        {
          title: '30개 이상의 shadcn/ui 컴포넌트 기반',
          content:
            'Button, Card부터 Dialog, Table, Sidebar, Calendar까지 — 3단계로 구성된 검증된 shadcn/ui 프리미티브 기반으로 구축되었습니다. 안정적이고 일관되며 배포 준비 완료.',
        },
      ],
      imageAlt: '기능 이미지 1',
    },
    feature2: {
      title: '채팅에서 프로덕션까지. 즉시.',
      accordionItems: [
        {
          title: 'MCP가 실행되는 모든 곳에서 작동',
          content:
            '하나의 플랫폼에 잠기지 않습니다. Claude Code, Cursor, Windsurf, OpenAI Codex — MCP를 지원하는 곳이라면 TEKTON이 작동합니다. 하나의 npx 명령으로 에이전트가 완전한 디자인 기능을 갖추게 됩니다.',
        },
        {
          title: '화면이 아닌 시스템을 가져오기',
          content:
            '단순히 하나의 UI만 생성하지 않습니다 — 전체 디자인 언어를 가져옵니다. tekton init을 통해 에이전트는 테마 토큰, 컴포넌트 라이브러리, 레이아웃 로직을 설정하여 제품의 모든 흐름을 일관되게 디자인합니다.',
        },
        {
          title: '프로덕션 준비 완료 TypeScript 출력',
          content:
            '생성된 코드는 깔끔하고 완전히 타입이 지정되어 있으며 디자인 토큰이 포함된 Tailwind CSS를 사용합니다. 시니어 엔지니어가 작성한 코드처럼 보이고 작동합니다 — 시스템이 이를 강제하기 때문입니다.',
        },
      ],
      imageAlt: '기능 이미지 2',
    },
    feature3: {
      title: '결정론적 UI. 환각 없음.',
      accordionItems: [
        {
          title: '매번 신뢰할 수 있는 코드',
          content:
            '원시 LLM은 스타일과 레이아웃을 추측합니다 — TEKTON은 이를 제거합니다. 시맨틱 스코어링 알고리즘이 가중치 규칙을 사용하여 컴포넌트를 배치하여 CSS를 환각하는 대신 엄격한 디자인 제약을 따르는 코드를 생성합니다.',
        },
        {
          title: '6개의 큐레이션된 테마, 지금 바로 사용 가능',
          content:
            'classic-magazine, equinox-fitness, minimal-workspace, neutral-humanism, round-minimal, square-minimalism — 각각 200개 이상의 토큰으로 수작업으로 제작되었습니다. 하나를 선택하면 에이전트가 나머지를 처리합니다.',
        },
        {
          title: '내장된 안전 프로토콜',
          content:
            '다중 레이어 검증 — 임계값 확인, 환각 감지, 제약 강제, 자동 폴백 — 에이전트가 결코 깨진 UI를 배포하지 않도록 보장합니다.',
        },
      ],
      imageAlt: '기능 이미지 3',
    },
    faq: {
      title: '자주 묻는 질문',
      subtitle: 'Tekton에 대해 알아야 할 모든 것.',
      items: [
        {
          title: 'TEKTON은 무료인가요?',
          content:
            'TEKTON은 유료 라이선스가 필요합니다. MCP 서버 액세스를 잠금 해제하고 에이전트로 프로덕션 UI를 생성하려면 최소 하나의 테마를 구매해야 합니다.',
        },
        {
          title: '앱 개발에 사용할 수 있나요?',
          content:
            '현재 TEKTON은 React 생태계를 지원합니다 — Next.js 및 Vite 프로젝트 포함. init CLI는 두 프레임워크를 자동으로 감지합니다. 네이티브 모바일 디자인 시스템 지원은 곧 제공될 예정입니다.',
        },
        {
          title: '기존 프로젝트에 적용할 수 있나요?',
          content:
            '네! 프로젝트 루트에서 npx @tekton-ui/mcp-server init을 실행하세요. 프레임워크를 자동으로 감지하고 종속성을 설치하며 모든 것을 구성합니다 — 기존 코드를 손상시키지 않습니다.',
        },
        {
          title: 'Figma 가져오기 기능이 있나요?',
          content:
            '아직 없습니다. 사용자 정의 디자인을 AI 네이티브 토큰으로 변환하는 Figma-to-Tekton 브리지를 구축 중입니다. 업데이트를 기대해 주세요.',
        },
      ],
    },
  },
};

export function getLandingContent(locale: GlobalLocale): LandingContent {
  return landingContent[locale];
}
