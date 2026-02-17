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
        'TEKTON은 AI 에이전트가 진짜로 이해할 수 있는 첫 번째 디자인 시스템이에요. 구조화된 토큰과 레이아웃 로직으로 에이전트가 전문적이고 바로 쓸 수 있는 UI를 코드베이스에 직접 만들어줘요. Figma도, 추측도 필요 없어요.',
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
            '모든 테마에 완전한 OKLCH 토큰 아키텍처가 들어있어요. 원자 색상, 시맨틱 레이어, 타이포그래피, 간격, 높이, 모션, 밀도, 상태 레이어, 다크 모드까지 전부요. 웹 접근성 WCAG AA 기준도 기본으로 만족해요.',
        },
        {
          title: '완전 반응형 레이아웃 토큰',
          content:
            '기본 그리드를 넘어서요. TEKTON은 Shells(앱 프레임), Pages(콘텐츠 레이아웃), Sections(콘텐츠 블록)을 위한 토큰을 제공해요. 모바일, 태블릿, 데스크톱에 맞춰 자동으로 조정되죠. 에이전트가 정확히 어떻게 확장할지 알고 있어요.',
        },
        {
          title: '30개 이상의 shadcn/ui 컴포넌트 기반',
          content:
            'Button, Card부터 Dialog, Table, Sidebar, Calendar까지 검증된 shadcn/ui 컴포넌트로 만들어졌어요. 안정적이고 일관되며 바로 배포할 수 있어요.',
        },
      ],
      imageAlt: '기능 이미지 1',
    },
    feature2: {
      title: '채팅에서 프로덕션까지. 즉시.',
      accordionItems: [
        {
          title: 'MCP가 실행되는 모든 곳에서 작동해요',
          content:
            '하나의 플랫폼에 묶이지 않아요. Claude Code, Cursor, Windsurf, OpenAI Codex처럼 MCP를 지원하는 곳이라면 TEKTON이 다 작동해요. npx 명령 하나로 에이전트가 완전한 디자인 기능을 갖출 수 있어요.',
        },
        {
          title: '화면 하나가 아니라 시스템 전체를 가져와요',
          content:
            '단순히 UI 하나만 만드는 게 아니에요. 전체 디자인 언어를 가져와요. tekton init 명령으로 에이전트가 테마 토큰, 컴포넌트 라이브러리, 레이아웃 로직을 세팅해서 제품의 모든 화면을 일관되게 디자인해줘요.',
        },
        {
          title: '바로 쓸 수 있는 TypeScript 코드',
          content:
            '만들어진 코드는 깔끔하고 타입도 완벽하게 지정돼요. 디자인 토큰이 담긴 Tailwind CSS를 사용하죠. 시니어 엔지니어가 짠 코드처럼 보이고 동작해요. 시스템이 품질을 보장하거든요.',
        },
      ],
      imageAlt: '기능 이미지 2',
    },
    feature3: {
      title: '정확한 UI. 환각 없음.',
      accordionItems: [
        {
          title: '매번 믿을 수 있는 코드',
          content:
            '일반 LLM은 스타일과 레이아웃을 추측해요. TEKTON은 이걸 없앴어요. 시맨틱 스코어링 알고리즘이 규칙 기반으로 컴포넌트를 배치해서, CSS를 만들어내는 대신 정확한 디자인 제약을 따르는 코드를 생성해요.',
        },
        {
          title: '6개의 엄선된 테마, 지금 바로 사용',
          content:
            'classic-magazine, equinox-fitness, minimal-workspace, neutral-humanism, round-minimal, square-minimalism. 각 테마마다 200개 이상의 토큰을 손수 만들었어요. 하나만 선택하면 에이전트가 알아서 처리해줘요.',
        },
        {
          title: '안전장치가 내장되어 있어요',
          content:
            '여러 겹의 검증 시스템이 있어요. 임계값 확인, 환각 감지, 제약 강제, 자동 복구까지. 에이전트가 절대 깨진 UI를 만들지 않도록 막아줘요.',
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
            'TEKTON은 유료예요. MCP 서버에 접근하고 에이전트로 실제 사용 가능한 UI를 만들려면 최소 테마 하나는 구매하셔야 해요.',
        },
        {
          title: '앱 개발에 사용할 수 있나요?',
          content:
            '지금은 React 생태계를 지원해요. Next.js랑 Vite 프로젝트 모두 쓸 수 있어요. init CLI가 프레임워크를 자동으로 감지해줘요. 네이티브 모바일 디자인 시스템 지원은 곧 만나볼 수 있어요.',
        },
        {
          title: '기존 프로젝트에 적용할 수 있나요?',
          content:
            '물론이죠! 프로젝트 루트에서 npx @tekton-ui/mcp-server init을 실행해보세요. 프레임워크를 자동으로 인식하고 필요한 패키지를 설치한 뒤 모든 걸 세팅해줘요. 기존 코드는 건드리지 않아요.',
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
