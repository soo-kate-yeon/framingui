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
    };
    noCreditCard: string;
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

const landingContent: Record<GlobalLocale, LandingContent> = {
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
      noCreditCard: 'No credit card required',
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
      noCreditCard: '카드 등록 없이 시작',
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
  ja: {
    nav: {
      brandName: 'framingui',
      pricing: '料金',
      docs: 'ドキュメント',
      tryStudio: 'Exploreを試す',
      getStarted: '始める',
    },
    hero: {
      brandName: 'framingui',
      title: {
        part1: 'AIが理解する',
        part2: 'デザインシステム',
      },
      description:
        'framingui は AI が実際に理解できるデザインシステムです。構造化トークンとレイアウト規則をもとに、エージェントが推測なしでコードベースに本番品質の UI を生成します。',
      buttons: {
        tryStudio: 'Exploreを無料で試す',
        getStarted: '始める',
      },
      noCreditCard: 'クレジットカード不要',
    },
    mainImage: {
      alt: 'メインダッシュボードのプレビュー',
      placeholder: 'メインダッシュボードのプレビュー',
    },
    sections: {
      s1: {
        title: 'デザインシステムの中核、トークン',
        description:
          'カラー、タイポグラフィ、余白をトークンで体系化しました。OKLCH ベースの構造で、エージェントが基準を正確に適用できます。',
      },
      s2: {
        title: '本番品質を支えるレイアウト',
        description:
          'App/Web Shell 構造を基準にレスポンシブレイアウトを構成します。モバイルからデスクトップまでトークンスケールを一貫して保てます。',
      },
      s3: {
        title: '30+ shadcn/ui コンポーネントを標準搭載',
        description:
          'デザインガイドを自動反映し、サービスのトーンに合う UI を構成します。基本コンポーネントだけでも実用レベルの画面を作れます。',
      },
      s4: {
        title: 'MCP ですぐ実運用へ',
        description:
          'Figma がなくても始められます。IDE、CLI、OpenClaw で自然言語で指示すれば、エージェントがフロントエンドコードをすぐ生成します。',
      },
    },
    section5: {
      badge: '3月ローンチ ベータ特典',
      title: 'デザインシステムを1つ無料で使えます。',
      description:
        'レビューを残すと 1 年間の Creator Pass を提供します。期間中は制限なく利用できます。',
      cta: 'デザインシステムを見る',
    },
    faq: {
      title: 'よくある質問',
      subtitle: 'framingui を始める前によく確認される内容です。',
      items: [
        {
          title: 'テンプレートはどう使いますか？',
          content:
            'テンプレートを選んでコマンド1つで MCP サーバーをインストールできます。すぐに AI コーディングツールで本番 UI を生成でき、ベータ期間は最初のテンプレートを無料で提供します。',
        },
        {
          title: 'framingui は無料ですか？',
          content:
            'framingui は有料サービスです。MCP サーバーへのアクセスと実運用 UI 生成には、最低1つのテンプレート購入が必要です。',
        },
        {
          title: 'アプリ開発でも使えますか？',
          content:
            '現在は React エコシステム（Next.js、Vite）をサポートしています。init CLI がフレームワークを自動検出して設定します。ネイティブモバイル向けデザインシステム対応も準備中です。',
        },
        {
          title: '既存プロジェクトに適用できますか？',
          content:
            '適用できます。プロジェクトルートで npx @framingui/mcp-server init を実行すると、フレームワーク認識、依存関係インストール、設定を自動で行います。既存コードは壊しません。',
        },
        {
          title: 'Figma 取り込み機能はありますか？',
          content:
            '現在は提供していません。カスタムデザインを AI が読めるトークンへ変換する Figma-to-Tekton ブリッジを開発中です。',
        },
      ],
    },
  },
};

export function getLandingContent(locale: GlobalLocale): LandingContent {
  return landingContent[locale];
}
