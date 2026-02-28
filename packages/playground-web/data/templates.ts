/**
 * Template Data Configuration
 *
 * 각 템플릿의 상세 정보를 관리하는 중앙 데이터 소스
 * - 가격, 설명, 추천 사용처, 설치 가이드
 * - Supabase Storage 이미지 URL 헬퍼
 */

// ============================================================================
// Types
// ============================================================================

export interface TemplateData {
  id: string;
  name: string;
  tagline: string;
  taglineKo?: string;
  description: string;
  descriptionKo?: string;
  price: number;
  screenshots: string[];
  features: {
    icon: string;
    title: string;
    titleKo?: string;
    subtitle: string;
    subtitleKo?: string;
    description: string;
    descriptionKo?: string;
  }[];
  recommendedFor: {
    title: string;
    titleKo?: string;
    description: string;
    descriptionKo?: string;
  }[];
  howToUse: {
    step: number;
    title: string;
    titleKo?: string;
    description: string;
    descriptionKo?: string;
    code?: string;
  }[];
}

// ============================================================================
// Supabase Storage Helper
// ============================================================================

/**
 * Supabase Storage 공개 URL 생성
 *
 * @param templateId - 템플릿 ID
 * @param filename - 스크린샷 파일명
 * @returns Supabase Storage 공개 URL
 */
export function getScreenshotUrl(templateId: string, filename: string): string {
  return `/screenshots/${templateId}/${filename}`;
}

// ============================================================================
// Shared How To Use Steps (MCP Server Installation)
// ============================================================================

const SHARED_HOW_TO_USE = [
  {
    step: 1,
    title: 'Install Tekton Design System',
    titleKo: 'Tekton 디자인 시스템 설치',
    description: 'Install the FramingUI package using pnpm in your project.',
    descriptionKo: '프로젝트에 pnpm을 사용하여 FramingUI 패키지를 설치합니다.',
    code: 'pnpm add @framingui/ui @framingui/tokens',
  },
  {
    step: 2,
    title: 'Configure Theme Tokens',
    titleKo: '테마 토큰 설정',
    description: 'Import and apply the theme tokens in your application root or layout file.',
    descriptionKo: '애플리케이션 루트 또는 레이아웃 파일에서 테마 토큰을 가져와 적용합니다.',
    code: 'import "@framingui/tokens/themes/[theme-id].css";\n// Replace [theme-id] with: square-minimalism, neutral-workspace, etc.',
  },
  {
    step: 3,
    title: 'Import Components',
    titleKo: '컴포넌트 가져오기',
    description: 'Import and use Tekton components in your React application.',
    descriptionKo: 'React 애플리케이션에서 Tekton 컴포넌트를 가져와 사용합니다.',
    code: 'import { Button, Card, Input } from "@framingui/ui";\n\nexport default function App() {\n  return <Button>Get Started</Button>;\n}',
  },
  {
    step: 4,
    title: 'Customize with CSS Variables',
    titleKo: 'CSS 변수로 커스터마이징',
    description:
      'Override theme variables in your global CSS to customize colors, spacing, and more.',
    descriptionKo: '글로벌 CSS에서 테마 변수를 재정의하여 색상, 간격 등을 커스터마이징합니다.',
    code: ':root {\n  --tekton-bg-canvas: #ffffff;\n  --tekton-text-primary: #000000;\n  /* Override other variables as needed */\n}',
  },
];

// ============================================================================
// Template Data
// ============================================================================

export const TEMPLATES: Record<string, TemplateData> = {
  'square-minimalism': {
    id: 'square-minimalism',
    name: 'Square Minimalism',
    tagline: 'Bold, geometric, high-contrast design system',
    taglineKo: '대담하고 기하학적인 고대비 디자인 시스템',
    description:
      'A minimalist design system featuring sharp corners and high contrast. Build professional web applications quickly with clear visual hierarchy and clean typography.',
    descriptionKo:
      '날카로운 모서리와 높은 대비가 특징인 미니멀리즘 디자인 시스템이에요. 명확한 계층 구조와 깔끔한 타이포그래피로 전문적인 웹 앱을 빠르게 만들 수 있어요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('square-minimalism', 'dashboard.png'),
      getScreenshotUrl('square-minimalism', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Production-Ready Components',
        titleKo: '30개의 프로덕션 준비 완료 컴포넌트',
        subtitle: 'Shadcn-UI based React component library',
        subtitleKo: 'Shadcn-UI 기반 React 컴포넌트 라이브러리',
        description:
          'Includes 30 reusable components like Button, Input, Card, and Modal. Fully typed with TypeScript and follows accessibility standards. Each component supports dark mode and is highly customizable.',
        descriptionKo:
          'Button, Input, Card, Modal 등 30개의 컴포넌트를 바로 쓸 수 있어요. TypeScript로 타입이 완벽하게 지정돼 있고, 웹 접근성 표준도 준수해요. 모든 컴포넌트가 다크 모드를 지원하고 커스터마이징도 자유로워요.',
      },
      {
        icon: '2',
        title: '13 Pre-built Layouts',
        titleKo: '13개의 사전 정의된 레이아웃',
        subtitle: 'Common page layouts for rapid development',
        subtitleKo: '자주 사용하는 페이지 레이아웃으로 빠른 시작',
        description:
          'Complete layouts for Landing, Dashboard, Auth, and Profile pages. Fully responsive from mobile to desktop. Ready to use with simple copy-paste.',
        descriptionKo:
          'Landing, Dashboard, Auth, Profile 등 13개의 완성된 페이지 레이아웃이 들어있어요. 모바일부터 데스크톱까지 반응형으로 완벽하게 대응해요. 복사-붙여넣기만 하면 바로 쓸 수 있어요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Generate UI with natural language in Claude Code',
        subtitleKo: 'Claude Code에서 자연어로 UI 생성',
        description:
          'Integrated with Tekton MCP server. Generate UIs using natural language prompts in Claude Code. Simply ask "Create a dashboard with Square Minimalism theme" and get instant code.',
        descriptionKo:
          'Tekton MCP 서버와 통합되어 있어서 Claude Code에서 자연어만으로 UI를 만들 수 있어요. "Square Minimalism 테마로 대시보드 만들어줘"라고 요청하면 바로 코드가 생성돼요.',
      },
      {
        icon: '4',
        title: 'Design Token System',
        titleKo: '디자인 토큰 시스템',
        subtitle: 'CSS variable-based consistent styling',
        subtitleKo: 'CSS 변수 기반의 일관된 스타일링',
        description:
          'All colors, spacing, and typography defined as CSS variables. Change your brand color once and the entire theme updates automatically. Dark mode is as simple as variable switching.',
        descriptionKo:
          '색상, 간격, 타이포그래피가 모두 CSS 변수로 정의되어 있어요. 브랜드 컬러를 한 번만 바꾸면 전체 테마가 자동으로 업데이트돼요. 다크 모드도 변수 하나만 바꾸면 끝이에요.',
      },
      {
        icon: '5',
        title: 'Theme-Matched Icons',
        titleKo: '테마별 아이콘 매칭',
        subtitle: 'Lucide React icons auto-adapted to theme',
        subtitleKo: 'Lucide React 아이콘이 자동으로 테마에 맞춰짐',
        description:
          'Over 500 Lucide React icons optimized for the theme design language. Icon size, stroke, and color perfectly harmonized with the theme aesthetic.',
        descriptionKo:
          '500개 이상의 Lucide React 아이콘이 테마에 맞게 최적화되어 있어요. 아이콘 크기, 스트로크, 컬러가 테마와 완벽하게 어우러져요.',
      },
      {
        icon: '6',
        title: 'Responsive Layout Tokens',
        titleKo: '반응형 레이아웃 토큰',
        subtitle: 'Auto-responsive from mobile to desktop',
        subtitleKo: '모바일부터 데스크톱까지 자동 대응',
        description:
          'Integrated layout tokens with Tailwind CSS responsive utilities. Ask the MCP server "1 column on mobile, 2 on tablet" and it implements automatically.',
        descriptionKo:
          'Tailwind CSS 반응형 유틸리티와 통합된 레이아웃 토큰이 있어요. MCP 서버에 "모바일에서는 1열, 태블릿에서는 2열"이라고 요청하면 자동으로 만들어져요.',
      },
    ],
    recommendedFor: [
      {
        title: 'SaaS Dashboards & Admin Panels',
        titleKo: 'SaaS 대시보드 및 관리 패널',
        description:
          'Clear hierarchy and high contrast effectively display data. Charts and tables stand out, action buttons are clearly distinguished.',
        descriptionKo:
          '명확한 계층 구조와 높은 대비로 데이터를 효과적으로 보여줘요. 차트와 테이블이 눈에 잘 들어오고, 액션 버튼도 분명하게 구분돼요.',
      },
      {
        title: 'Professional B2B Applications',
        titleKo: '전문적인 B2B 웹 애플리케이션',
        description:
          'Trustworthy minimalist design suited for business users. Focus on functionality without unnecessary decoration.',
        descriptionKo:
          '신뢰감을 주는 미니멀한 디자인으로 비즈니스 사용자에게 딱이에요. 불필요한 장식 없이 기능에만 집중할 수 있어요.',
      },
      {
        title: 'Rapid Prototyping',
        titleKo: '빠른 프로토타이핑',
        description:
          'Minimal styling enables quick idea validation. Focus on feature development instead of design decisions.',
        descriptionKo:
          '최소한의 스타일로 구성되어 있어서 아이디어를 빠르게 검증할 수 있어요. 디자인 고민 없이 기능 개발에 집중할 수 있어요.',
      },
      {
        title: 'Accessibility-First Projects',
        titleKo: '접근성 중심 프로젝트',
        description:
          'High color contrast (AAA rating) ensures usability for visually impaired users. Full keyboard navigation and screen reader support.',
        descriptionKo:
          '높은 색상 대비(AAA 등급)로 시각 장애가 있는 사용자도 쉽게 쓸 수 있어요. 키보드 네비게이션과 스크린 리더를 완벽하게 지원해요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: square-minimalism, layout: sidebar-left, components: Card, Button, Input"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: square-minimalism, layout: sidebar-left, components: Card, Button, Input"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'editorial-tech': {
    id: 'editorial-tech',
    name: 'Editorial Tech',
    tagline: 'Lucid, airy, typography-first rational design',
    taglineKo: '명료하고 여유로운 타이포그래피 중심의 이성적인 디자인',
    description:
      'An elegant design system blending intellectual clarity with airy layouts. Prioritizes large, clean headings and generous white space to create a rational "blank canvas" atmosphere.',
    descriptionKo:
      '지적인 명확성과 여유로운 레이아웃을 결합한 우아한 디자인 시스템입니다. 크고 깔끔한 헤딩과 넉넉한 여백을 우선시하여 이성적인 "빈 캔버스" 같은 분위기를 조성합니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('editorial-tech', 'dashboard.png'),
      getScreenshotUrl('editorial-tech', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: 'Airy Canvas Layouts',
        titleKo: '에어리 캔버스 레이아웃',
        subtitle: 'Generous padding and wide margins',
        subtitleKo: '넉넉한 패딩과 넓은 마진',
        description:
          'Features a systematic approach to white space, treating the screen as an open, breathable canvas that gives content maximum clarity.',
        descriptionKo:
          '여백에 대한 체계적인 접근 방식을 특징으로 하며, 화면을 개방적이고 숨 쉴 수 있는 캔버스로 취급하여 콘텐츠에 최대한의 명확성을 부여합니다.',
      },
      {
        icon: '2',
        title: 'Typography-First Hierarchy',
        titleKo: '타이포그래피 중심의 계층',
        subtitle: 'Big clean headings, high legibility',
        subtitleKo: '크고 깔끔한 헤딩, 높은 가독성',
        description:
          'Information architecture driven entirely by font scales, weights, and tracking. Achieves logical separation without relying on heavy borders or backgrounds.',
        descriptionKo:
          '오로지 폰트 스케일, 웨이트, 자간에 의해 주도되는 정보 아키텍처. 무거운 테두리나 배경에 의존하지 않고도 논리적인 분리를 달성합니다.',
      },
      {
        icon: '3',
        title: 'Systematic Neutrals',
        titleKo: '체계적인 뉴트럴',
        subtitle: 'Pure grays with stark contrast',
        subtitleKo: '뚜렷한 대비를 보여주는 순수한 그레이',
        description:
          'A restrained, intellectual palette reliant on neutral 950s and pure white canvases to emphasize the content rather than the container.',
        descriptionKo:
          '컨테이너보다는 콘텐츠를 강조하기 위해 뉴트럴 950과 순백의 캔버스에 의존하는 절제된 지적인 팔레트입니다.',
      },
      {
        icon: '4',
        title: 'Measured Curves',
        titleKo: '절제된 곡선',
        subtitle: 'Alloy of sharp logic and human circularity',
        subtitleKo: '날카로운 논리와 인간적인 둥글음의 조화',
        description:
          'Select components feature distinct pill shapes (rounded-full) functioning as accents amidst an otherwise sharp, geometric environment.',
        descriptionKo:
          '선택된 컴포넌트는 그 외에는 날카롭고 기하학적인 환경 속에서 악센트로 기능하는 독특한 알약 모양(rounded-full)을 특징으로 합니다.',
      },
    ],
    recommendedFor: [
      {
        title: 'Design Portfolios & Agencys',
        titleKo: '디자인 포트폴리오 및 에이전시',
        description:
          'Lets the work speak for itself by removing UI clutter and focusing purely on the visual content and underlying grid.',
        descriptionKo:
          'UI의 어수선함을 제거하고 시각적 콘텐츠와 기본 그리드에만 순수하게 집중함으로써 작품 자체가 스스로를 대변하게 합니다.',
      },
      {
        title: 'Intellectual Publications',
        titleKo: '지적인 출판물',
        description:
          'Perfect for long-form essays, tech-journalism, or deep-dive newsletters requiring sustained reader focus.',
        descriptionKo:
          '지속적인 독자의 집중이 필요한 긴 에세이, 테크 저널리즘 또는 심층 뉴스레터에 완벽합니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: editorial-tech, layout: feed, components: Card, Heading, Article"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: editorial-tech, layout: feed, components: Card, Heading, Article"',
      },
    ],
  },

  'dark-boldness': {
    id: 'dark-boldness',
    name: 'Dark Boldness',
    tagline: 'Energetic, bold fitness & wellness design',
    taglineKo: '에너지 넘치고 대담한 피트니스 및 웰니스 디자인',
    description:
      'A vibrant design system with energetic colors and bold typography for fitness and wellness brands. Motivate users with dynamic visuals and engaging interactions.',
    descriptionKo:
      '에너지 넘치는 컬러와 대담한 타이포그래피로 피트니스와 웰니스 브랜드를 위한 디자인 시스템이에요. 역동적인 비주얼과 매력적인 인터랙션으로 사용자에게 동기를 부여해요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('dark-boldness', 'dashboard.png'),
      getScreenshotUrl('dark-boldness', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Fitness-Optimized Components',
        titleKo: '30개의 피트니스 최적화 컴포넌트',
        subtitle: 'Energetic components built on Shadcn-UI',
        subtitleKo: 'Shadcn-UI 기반 에너지 넘치는 컴포넌트',
        description:
          'Workout cards, progress bars, calorie trackers, and more—30 components optimized for fitness apps. Bold colors and motion effects motivate users to stay active.',
        descriptionKo:
          '운동 카드, 진행률 바, 칼로리 트래커 등 피트니스 앱에 최적화된 30개의 컴포넌트가 있어요. 대담한 컬러와 모션 효과가 사용자의 동기를 자극해요.',
      },
      {
        icon: '2',
        title: '13 Essential Fitness Layouts',
        titleKo: '13개의 필수 피트니스 레이아웃',
        subtitle: 'Pre-built screens for fitness apps',
        subtitleKo: '피트니스 앱 필수 화면 구성',
        description:
          'Workout Dashboard, Progress Tracking, Meal Plans, and Profile layouts. Each designed to maximize user engagement and motivation.',
        descriptionKo:
          'Workout Dashboard, Progress Tracking, Meal Plans, Profile 등 피트니스 앱에 필요한 13개의 레이아웃이 들어있어요. 사용자 참여를 극대화하도록 설계됐어요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'AI-powered workout UI generation',
        subtitleKo: 'AI로 운동 UI를 즉시 생성',
        description:
          'Ask Claude Code "Create a workout progress dashboard with Dark Boldness theme" and instantly generate UI showing calories burned, workout duration, and goal completion.',
        descriptionKo:
          'Claude Code에 "Dark Boldness 테마로 운동 진행률 대시보드 만들어줘"라고 요청하면, 칼로리 소모량, 운동 시간, 목표 달성률을 보여주는 UI가 바로 만들어져요.',
      },
      {
        icon: '4',
        title: 'Energetic Color System',
        titleKo: '에너지 넘치는 컬러 시스템',
        subtitle: 'Vivid palette that motivates action',
        subtitleKo: '동기를 부여하는 비비드 컬러 팔레트',
        description:
          'Vibrant orange, green, and blue colors defined as CSS variables. Change your brand color once and the entire theme updates automatically.',
        descriptionKo:
          '오렌지, 그린, 블루 등 에너지 넘치는 컬러 팔레트가 CSS 변수로 정의되어 있어요. 브랜드 컬러를 한 번만 바꾸면 전체 테마가 자동으로 업데이트돼요.',
      },
      {
        icon: '5',
        title: 'Motion Effects Library',
        titleKo: '모션 효과 라이브러리',
        subtitle: 'Dynamic animations boost engagement',
        subtitleKo: '동적인 애니메이션으로 사용자 참여 증대',
        description:
          'Framer Motion animation presets included. Dynamic motion applied to button clicks, card hovers, and page transitions.',
        descriptionKo:
          'Framer Motion 애니메이션 프리셋이 포함되어 있어요. 버튼 클릭, 카드 호버, 페이지 전환에 역동적인 모션이 적용돼요.',
      },
      {
        icon: '6',
        title: 'Data Visualization Components',
        titleKo: '데이터 시각화 컴포넌트',
        subtitle: 'Progress and stats at a glance',
        subtitleKo: '진행률과 통계를 한눈에',
        description:
          'Calorie burn graphs, workout duration charts, and goal progress bars. Seamlessly integrated with Chart.js for beautiful data visualization.',
        descriptionKo:
          '칼로리 소모 그래프, 운동 시간 차트, 목표 달성률 프로그레스 바가 들어있어요. Chart.js와 완벽하게 통합돼요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Fitness & Healthcare Apps',
        titleKo: '피트니스 및 헬스케어 앱',
        description:
          'Optimized for workout tracking, calorie management, and health data visualization. Design that motivates users to achieve their goals.',
        descriptionKo:
          '운동 추적, 칼로리 관리, 건강 데이터 시각화에 딱 맞아요. 사용자가 목표를 달성하도록 동기를 부여하는 디자인이에요.',
      },
      {
        title: 'Sports Events & Communities',
        titleKo: '스포츠 이벤트 및 커뮤니티',
        description:
          'Perfect for marathon, cycling, and CrossFit community platforms. Energetic design fosters team spirit and camaraderie.',
        descriptionKo:
          '마라톤, 사이클링, 크로스핏 같은 스포츠 커뮤니티 플랫폼에 완벽해요. 에너지 넘치는 디자인이 팀 정신을 북돋워줘요.',
      },
      {
        title: 'Wellness & Lifestyle Services',
        titleKo: '웰니스 및 라이프스타일 서비스',
        description:
          'Suitable for meditation, yoga, nutrition management, and holistic wellness services. Creates a positive and vibrant atmosphere.',
        descriptionKo:
          '명상, 요가, 영양 관리 같은 웰빙 서비스에 쓸 수 있어요. 긍정적이고 활기찬 분위기를 만들어줘요.',
      },
      {
        title: 'Dynamic Brands',
        titleKo: '에너지 넘치는 브랜드',
        description:
          'Ideal for brands seeking a dynamic and vibrant image. Makes a strong impression on younger target audiences.',
        descriptionKo:
          '역동적이고 활기찬 브랜드 이미지를 원한다면 딱이에요. 젊은 타겟층에게 강한 인상을 남겨요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: dark-boldness, layout: dashboard, components: Card, Progress, Chart"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: dark-boldness, layout: dashboard, components: Card, Progress, Chart"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  pebble: {
    id: 'pebble',
    name: 'Pebble',
    tagline: 'Soft, rounded, gentle user experience',
    taglineKo: '부드럽고 둥글며 온화한 사용자 경험',
    description:
      'A minimal design system with soft corners and gentle colors for friendly user experiences. Approachable and comfortable for consumer-facing applications.',
    descriptionKo:
      '부드러운 모서리와 온화한 컬러로 친근한 사용자 경험을 만드는 미니멀 디자인 시스템이에요. 소비자 대상 앱에 접근하기 쉽고 편안해요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('pebble', 'dashboard.png'),
      getScreenshotUrl('pebble', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Soft-Rounded Components',
        titleKo: '30개의 부드러운 라운드 컴포넌트',
        subtitle: 'Friendly components built on Shadcn-UI',
        subtitleKo: 'Shadcn-UI 기반 친근한 컴포넌트',
        description:
          '30 components with soft corners (rounded-xl, rounded-2xl). Friendly and comfortable feel optimized for consumer apps.',
        descriptionKo:
          'rounded-xl, rounded-2xl 같은 부드러운 모서리가 적용된 30개의 컴포넌트가 있어요. 친근하고 편안한 느낌으로 소비자 앱에 딱 맞아요.',
      },
      {
        icon: '2',
        title: '13 User-Friendly Layouts',
        titleKo: '13개의 사용자 친화적 레이아웃',
        subtitle: 'Consumer-focused screen configurations',
        subtitleKo: '사용자 친화적인 화면 구성',
        description:
          'Social Feed, User Profile, Community, and Chat layouts for consumer apps. Intuitive and accessible design.',
        descriptionKo:
          'Social Feed, User Profile, Community, Chat 같은 소비자 앱용 레이아웃 13개가 들어있어요. 직관적이고 접근하기 쉬워요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Generate friendly UIs with natural language',
        subtitleKo: '친근한 UI를 자연어로 생성',
        description:
          'Ask "Create a profile page with Pebble theme" and get a friendly profile UI with avatar, bio, and follow button.',
        descriptionKo:
          '"Pebble 테마로 프로필 페이지 만들어줘"라고 요청하면, 아바타, 자기소개, 팔로우 버튼이 포함된 친근한 프로필 UI가 만들어져요.',
      },
      {
        icon: '4',
        title: 'Gentle Color Palette',
        titleKo: '온화한 컬러 팔레트',
        subtitle: 'Comfortable pastel tones',
        subtitleKo: '편안함을 주는 파스텔 톤',
        description:
          'Gentle colors like pastel blue and soft pink defined as CSS variables. Easy on the eyes even during extended use.',
        descriptionKo:
          '파스텔 블루, 소프트 핑크 같은 온화한 컬러가 CSS 변수로 정의되어 있어요. 장시간 써도 눈이 편해요.',
      },
      {
        icon: '5',
        title: 'Soft Shadow System',
        titleKo: '부드러운 쉐도우 시스템',
        subtitle: 'Delicate shadows for natural depth',
        subtitleKo: '깊이감을 주는 섬세한 그림자',
        description:
          'Multi-layer soft shadows give components natural depth. Consistent application via elevation-sm, elevation-md, elevation-lg tokens.',
        descriptionKo:
          '여러 겹의 부드러운 그림자가 컴포넌트에 자연스러운 깊이감을 줘요. elevation-sm, elevation-md, elevation-lg 토큰으로 일관성 있게 적용돼요.',
      },
      {
        icon: '6',
        title: 'Touch-Friendly Interactions',
        titleKo: '터치 친화적 인터랙션',
        subtitle: 'Mobile-optimized target areas',
        subtitleKo: '모바일 최적화 타겟 영역',
        description:
          'All interactive elements guarantee minimum 44x44px touch targets. Adequate spacing ensures easy finger tapping.',
        descriptionKo:
          '모든 인터랙티브 요소가 최소 44x44px 터치 타겟을 보장해요. 손가락으로 쉽게 탭할 수 있도록 간격이 충분해요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Consumer Mobile Apps',
        titleKo: '소비자 대상 모바일 앱',
        description:
          'Soft design feels friendly and comfortable to users. Optimized for social, shopping, and lifestyle apps.',
        descriptionKo:
          '부드러운 디자인이 사용자에게 친근하고 편안한 느낌을 줘요. 소셜, 쇼핑, 라이프스타일 앱에 최적화되어 있어요.',
      },
      {
        title: 'Approachable Brand Identity',
        titleKo: '친근한 브랜드 아이덴티티',
        description:
          'Build an accessible and warm brand image. Ideal for young female demographics or family-oriented services.',
        descriptionKo:
          '접근하기 쉽고 따뜻한 브랜드 이미지를 만들 수 있어요. 젊은 여성 타겟층이나 가족 대상 서비스에 딱이에요.',
      },
      {
        title: 'Community & Social Platforms',
        titleKo: '커뮤니티 및 소셜 플랫폼',
        description:
          'Design that encourages user interaction and sharing. Social features like comments, likes, and shares blend naturally.',
        descriptionKo:
          '사용자 간의 상호작용과 공유를 자연스럽게 이끌어내는 디자인이에요. 댓글, 좋아요, 공유 같은 소셜 기능이 자연스럽게 어우러져요.',
      },
      {
        title: 'Services Requiring Soft UX',
        titleKo: '부드러운 UX가 필요한 서비스',
        description:
          'Perfect for meditation, sleep, parenting services where comfort and stability matter. Helps users relax and enjoy the service.',
        descriptionKo:
          '명상, 수면, 육아 같은 편안함과 안정감이 중요한 서비스에 완벽해요. 사용자가 편하게 서비스를 즐길 수 있도록 도와줘요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: pebble, layout: centered, components: Card, Avatar, Button"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: pebble, layout: centered, components: Card, Avatar, Button"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'classic-magazine': {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    tagline: 'Editorial, content-rich, timeless typography',
    taglineKo: '편집적이고 콘텐츠가 풍부한 시대를 초월한 타이포그래피',
    description:
      'A design system with classic magazine layouts and elegant typography for content-focused websites. Honors the traditions of readability and editorial design.',
    descriptionKo:
      '클래식한 잡지 레이아웃과 우아한 타이포그래피로 콘텐츠 중심 웹사이트를 위한 디자인 시스템이에요. 가독성과 편집 디자인의 전통을 이어가요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('classic-magazine', 'dashboard.png'),
      getScreenshotUrl('classic-magazine', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Editorial-Optimized Components',
        titleKo: '30개의 편집 최적화 컴포넌트',
        subtitle: 'Components built for content publishing',
        subtitleKo: '콘텐츠 퍼블리싱 특화 컴포넌트',
        description:
          'Article Card, Byline, Pull Quote, Drop Cap, and more—30 components specialized for content publishing. Brings traditional magazine layouts to the web.',
        descriptionKo:
          'Article Card, Byline, Pull Quote, Drop Cap 같은 콘텐츠 퍼블리싱 특화 컴포넌트 30개가 있어요. 전통적인 잡지 레이아웃을 웹에서 그대로 구현해요.',
      },
      {
        icon: '2',
        title: '13 Magazine-Style Layouts',
        titleKo: '13개의 잡지 스타일 레이아웃',
        subtitle: 'Sophisticated grid-based layouts',
        subtitleKo: '정교한 그리드 기반 레이아웃',
        description:
          'Homepage Grid, Article Detail, Category Page, and Author Profile layouts for content sites. Precisely designed grid system.',
        descriptionKo:
          'Homepage Grid, Article Detail, Category Page, Author Profile 같은 콘텐츠 사이트용 레이아웃 13개가 들어있어요. 그리드 시스템이 정교하게 설계되어 있어요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Auto-generate article layouts',
        subtitleKo: '아티클 레이아웃 자동 생성',
        description:
          'Request "Create a blog post with Classic Magazine theme" and get a traditional article layout with headline, lead paragraph, body, and sidebar.',
        descriptionKo:
          '"Classic Magazine 테마로 블로그 포스트 만들어줘"라고 요청하면, 헤드라인, 리드 문단, 본문, 사이드바가 포함된 전통적인 아티클 레이아웃이 만들어져요.',
      },
      {
        icon: '4',
        title: 'Elegant Typography',
        titleKo: '우아한 타이포그래피',
        subtitle: 'Serif + Sans combination for maximum readability',
        subtitleKo: 'Serif + Sans 조합의 가독성 극대화',
        description:
          'Merriweather Serif headlines paired with Inter Sans body text maximize readability. Line height, letter spacing, and paragraph spacing optimized for long-form reading.',
        descriptionKo:
          'Merriweather Serif 헤드라인과 Inter Sans 본문의 조합으로 가독성을 극대화해요. 행간, 자간, 문단 간격이 최적화되어 있어서 오래 읽기 편해요.',
      },
      {
        icon: '5',
        title: 'Multi-Column Layout System',
        titleKo: '다단 레이아웃 시스템',
        subtitle: 'Flexible grid-based columns',
        subtitleKo: '그리드 기반의 유연한 컬럼',
        description:
          '12-column grid system enables complex layouts. Supports 2, 3, 4-column arrangements with responsive auto-adjustment.',
        descriptionKo:
          '12컬럼 그리드 시스템으로 복잡한 레이아웃도 만들 수 있어요. 2단, 3단, 4단 배치를 지원하고, 반응형으로 자동 조정돼요.',
      },
      {
        icon: '6',
        title: 'Content Hierarchy',
        titleKo: '콘텐츠 계층 구조',
        subtitle: 'Clear information architecture',
        subtitleKo: '명확한 정보 아키텍처',
        description:
          'Metadata like categories, tags, dates, and authors clearly distinguished. Designed for users to easily explore content and discover related articles.',
        descriptionKo:
          '카테고리, 태그, 날짜, 저자 같은 메타데이터가 명확하게 구분돼요. 사용자가 콘텐츠를 탐색하고 관련 글을 쉽게 찾을 수 있도록 설계했어요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Blogs & Content Publishing Platforms',
        titleKo: '블로그 및 콘텐츠 퍼블리싱 플랫폼',
        description:
          'Displays long-form articles in a comfortable reading format. Optimized typography and line spacing provide immersive reading experiences.',
        descriptionKo:
          '긴 글을 읽기 편하게 보여줘요. 타이포그래피와 행간이 최적화되어 있어서 몰입해서 읽을 수 있어요.',
      },
      {
        title: 'News & Media Websites',
        titleKo: '뉴스 및 미디어 웹사이트',
        description:
          'Effectively presents diverse content formats like news articles, interviews, and reports. Modern reinterpretation of traditional news layouts.',
        descriptionKo:
          '뉴스 기사, 인터뷰, 리포트 같은 다양한 콘텐츠를 효과적으로 표현해요. 전통적인 뉴스 레이아웃을 현대적으로 재해석했어요.',
      },
      {
        title: 'Long-Form Content & Article Sites',
        titleKo: '롱폼 콘텐츠 및 아티클 사이트',
        description:
          'Perfect for in-depth content like essays, reviews, and guides. Typography and layout encourage users to read to the end.',
        descriptionKo:
          '에세이, 리뷰, 가이드 같은 깊이 있는 콘텐츠에 완벽해요. 타이포그래피와 레이아웃이 끝까지 읽고 싶게 만들어요.',
      },
      {
        title: 'Traditional Editorial Design Projects',
        titleKo: '전통적인 편집 디자인 프로젝트',
        description:
          'Ideal for literary journals, academic publications, and corporate magazines requiring authoritative, trustworthy design. Perfect for projects valuing classic aesthetics.',
        descriptionKo:
          '문학지, 학술지, 기업 매거진처럼 권위 있고 신뢰감 있는 디자인이 필요한 곳에 딱이에요. 클래식한 미학을 중시하는 프로젝트에 이상적이에요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: classic-magazine, layout: article, components: Heading, Paragraph, Image"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: classic-magazine, layout: article, components: Heading, Paragraph, Image"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'neutral-workspace': {
    id: 'neutral-workspace',
    name: 'Neutral Workspace',
    tagline: 'Human-centered, approachable, balanced design',
    taglineKo: '사람 중심의 접근하기 쉬운 균형잡힌 디자인',
    description:
      'A design system prioritizing accessibility and readability with warm human-centered design and a neutral color palette. Provides comfortable experiences for all users.',
    descriptionKo:
      '사람 중심의 따뜻한 디자인과 중립적인 컬러로 접근성과 가독성을 최우선으로 하는 디자인 시스템이에요. 모든 사용자에게 편안한 경험을 제공해요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('neutral-workspace', 'dashboard.png'),
      getScreenshotUrl('neutral-workspace', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Accessibility-First Components',
        titleKo: '30개의 접근성 우선 컴포넌트',
        subtitle: 'Human-centered components built on Shadcn-UI',
        subtitleKo: 'Shadcn-UI 기반 휴먼 중심 컴포넌트',
        description:
          '30 components meeting WCAG AAA standards. Designed for easy use by users of all ages and abilities.',
        descriptionKo:
          'WCAG AAA 등급을 만족하는 30개의 컴포넌트가 있어요. 모든 연령층과 능력을 가진 사용자가 쉽게 쓸 수 있도록 설계했어요.',
      },
      {
        icon: '2',
        title: '13 Trust-Critical Layouts',
        titleKo: '13개의 신뢰성 중심 레이아웃',
        subtitle: 'Intuitive and clear information structure',
        subtitleKo: '직관적이고 명확한 정보 구조',
        description:
          'Healthcare Dashboard, Education Portal, Government Forms—13 layouts for trust-critical sectors. Clearly communicates complex information.',
        descriptionKo:
          'Healthcare Dashboard, Education Portal, Government Forms 같은 신뢰성이 중요한 분야의 레이아웃 13개가 들어있어요. 복잡한 정보도 명확하게 전달해요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Auto-generate accessible UIs',
        subtitleKo: '접근 가능한 UI를 자동 생성',
        description:
          'Request "Create a patient information form with Neutral Workspace theme" and get an accessible form with clear labels, error messages, and help text.',
        descriptionKo:
          '"Neutral Workspace 테마로 환자 정보 폼 만들어줘"라고 요청하면, 명확한 라벨, 에러 메시지, 도움말이 포함된 접근 가능한 폼이 만들어져요.',
      },
      {
        icon: '4',
        title: 'Neutral Color System',
        titleKo: '중립적인 컬러 시스템',
        subtitle: 'Universal grayscale palette',
        subtitleKo: '보편적인 회색조 팔레트',
        description:
          'Neutral color system based on grayscale. Culturally unbiased, providing equitable experiences for all users.',
        descriptionKo:
          '그레이스케일 기반의 중립적인 컬러 시스템을 써요. 문화적 편향이 없고 모든 사용자에게 공평한 경험을 제공해요.',
      },
      {
        icon: '5',
        title: 'Clear Focus Indicators',
        titleKo: '명확한 포커스 인디케이터',
        subtitle: 'Keyboard navigation optimized',
        subtitleKo: '키보드 네비게이션 최적화',
        description:
          'All interactive elements display distinct focus rings. Entire site navigable by keyboard alone with logical tab order.',
        descriptionKo:
          '모든 인터랙티브 요소에 뚜렷한 포커스 링이 표시돼요. 키보드만으로 전체 사이트를 탐색할 수 있고, 탭 순서도 논리적으로 구성되어 있어요.',
      },
      {
        icon: '6',
        title: 'Multilingual & RTL Support',
        titleKo: '다국어 및 RTL 지원',
        subtitle: 'Designed for global users',
        subtitleKo: '글로벌 사용자를 위한 설계',
        description:
          'Supports RTL (Right-to-Left) languages like Arabic and Hebrew. Typography optimized to maintain readability across diverse writing systems.',
        descriptionKo:
          '아랍어, 히브리어 같은 RTL(Right-to-Left) 언어를 지원해요. 다양한 문자 체계에서도 가독성이 유지되도록 타이포그래피가 최적화되어 있어요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Healthcare & Medical Services',
        titleKo: '헬스케어 및 의료 서비스',
        description:
          'Displays patient health information safely and clearly. Design easily understood by both medical professionals and patients.',
        descriptionKo:
          '환자의 건강 정보를 안전하고 명확하게 보여줘요. 의료 전문가와 환자 모두가 쉽게 이해할 수 있는 디자인이에요.',
      },
      {
        title: 'Education & Learning Platforms',
        titleKo: '교육 및 학습 플랫폼',
        description:
          'Distraction-free design enabling students and teachers to focus. Content readability is paramount, supporting diverse learning styles.',
        descriptionKo:
          '학생과 교사가 집중할 수 있는 방해 없는 디자인이에요. 콘텐츠 가독성을 최우선으로 하고, 다양한 학습 스타일을 지원해요.',
      },
      {
        title: 'Government & Public Institution Websites',
        titleKo: '정부 및 공공기관 웹사이트',
        description:
          'Design enabling equitable access for all citizens. Meets legal accessibility requirements and inspires trust.',
        descriptionKo:
          '모든 시민이 공평하게 접근할 수 있는 디자인이에요. 법적 접근성 요구사항을 충족하고, 신뢰감을 줘요.',
      },
      {
        title: 'Accessibility-First Projects',
        titleKo: '접근성이 최우선인 프로젝트',
        description:
          'Ideal for projects targeting WCAG AAA compliance. Design considers users with visual, auditory, and motor disabilities.',
        descriptionKo:
          'WCAG AAA 등급을 목표로 하는 프로젝트에 딱이에요. 시각, 청각, 운동 능력 장애가 있는 사용자를 모두 고려한 디자인이에요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: neutral-workspace, layout: form, components: Input, Label, Button"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: neutral-workspace, layout: form, components: Input, Label, Button"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'minimal-workspace': {
    id: 'minimal-workspace',
    name: 'Minimal Workspace',
    tagline: 'Productivity-focused, distraction-free, efficient',
    taglineKo: '생산성 중심의 방해 없는 효율적인 작업 환경',
    description:
      'A minimal workspace design system maximizing productivity and focus. Eliminates unnecessary elements so users can immerse themselves in their work.',
    descriptionKo:
      '생산성과 집중력을 극대화하는 미니멀 워크스페이스 디자인 시스템이에요. 불필요한 요소를 없애서 작업에만 몰입할 수 있도록 설계했어요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('minimal-workspace', 'dashboard.png'),
      getScreenshotUrl('minimal-workspace', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Productivity-Optimized Components',
        titleKo: '30개의 생산성 최적화 컴포넌트',
        subtitle: 'Components built for productivity tools',
        subtitleKo: '생산성 도구 특화 컴포넌트',
        description:
          'Editor, Sidebar, Command Palette, Toolbar—30 components for productivity apps. All optimized for efficiency and speed.',
        descriptionKo:
          'Editor, Sidebar, Command Palette, Toolbar 같은 생산성 앱용 컴포넌트 30개가 있어요. 모두 효율성과 속도에 최적화되어 있어요.',
      },
      {
        icon: '2',
        title: '13 Focus-Enhancing Layouts',
        titleKo: '13개의 집중력 향상 레이아웃',
        subtitle: 'Layouts that boost work concentration',
        subtitleKo: '작업 집중도를 높이는 레이아웃',
        description:
          'Code Editor, Note Taking, Task Management, Project Dashboard—13 productivity app layouts. Features left sidebar and spacious work area.',
        descriptionKo:
          'Code Editor, Note Taking, Task Management, Project Dashboard 같은 생산성 앱용 레이아웃 13개가 들어있어요. 좌측 사이드바와 넓은 작업 영역이 특징이에요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Build workspace UIs instantly',
        subtitleKo: '워크스페이스 UI를 즉시 구축',
        description:
          'Request "Create a code editor with Minimal Workspace theme" and get an IDE-style layout with sidebar, editor area, and status bar.',
        descriptionKo:
          '"Minimal Workspace 테마로 코드 에디터 만들어줘"라고 요청하면, 사이드바, 에디터 영역, 상태바가 포함된 IDE 스타일 레이아웃이 만들어져요.',
      },
      {
        icon: '4',
        title: 'Distraction-Free Design',
        titleKo: '방해 요소 제거 디자인',
        subtitle: 'Minimal interface for focus',
        subtitleKo: '집중을 위한 미니멀 인터페이스',
        description:
          'Eliminates unnecessary decoration, animations, and colors. Interface recedes to the background so users focus solely on content and work.',
        descriptionKo:
          '불필요한 장식, 애니메이션, 컬러를 없앴어요. 인터페이스는 배경으로 물러나서 콘텐츠와 작업에만 집중할 수 있어요.',
      },
      {
        icon: '5',
        title: 'Keyboard-First Workflow',
        titleKo: '키보드 우선 워크플로우',
        subtitle: 'Access all features via shortcuts',
        subtitleKo: '단축키로 모든 기능 접근',
        description:
          'All features executable via keyboard shortcuts. Command Palette (Cmd+K) allows quick action searches and execution.',
        descriptionKo:
          '모든 기능을 키보드 단축키로 실행할 수 있어요. Command Palette (Cmd+K)로 빠르게 검색하고 실행할 수 있어요.',
      },
      {
        icon: '6',
        title: 'Dark Mode First Design',
        titleKo: '다크 모드 우선 디자인',
        subtitle: 'Dark theme ideal for extended work',
        subtitleKo: '장시간 작업에 적합한 다크 테마',
        description:
          'Designed with dark mode as default to minimize eye strain. Blends naturally with code editors, terminals, and other developer tools.',
        descriptionKo:
          '다크 모드를 기본으로 설계해서 눈이 편해요. 코드 에디터, 터미널 같은 개발자 도구와 자연스럽게 어우러져요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Project Management & Collaboration Tools',
        titleKo: '프로젝트 관리 및 협업 툴',
        description:
          'Efficiently manage tasks, projects, and team members. Ideal for Notion, Linear, Asana-style productivity tools.',
        descriptionKo:
          '태스크, 프로젝트, 팀원을 효율적으로 관리할 수 있어요. Notion, Linear, Asana 스타일의 생산성 도구에 딱이에요.',
      },
      {
        title: 'Note Apps & Knowledge Management Systems',
        titleKo: '노트 앱 및 지식 관리 시스템',
        description:
          'Distraction-free interface for writing and thought organization. Ideal for Obsidian, Roam Research-style apps.',
        descriptionKo:
          '글쓰기와 사고 정리에 집중할 수 있는 방해 없는 인터페이스에요. Obsidian, Roam Research 스타일의 앱에 이상적이에요.',
      },
      {
        title: 'Code Editors & Developer Tools',
        titleKo: '코드 에디터 및 개발 도구',
        description:
          'Build VS Code, Sublime Text-style development environments. Optimized sidebar, editor, and terminal layouts.',
        descriptionKo:
          'VS Code, Sublime Text 스타일의 개발 환경을 만들 수 있어요. 사이드바, 에디터, 터미널 레이아웃이 최적화되어 있어요.',
      },
      {
        title: 'Work Environments Prioritizing Productivity',
        titleKo: '생산성과 집중이 중요한 작업 환경',
        description:
          'Tools for power users and professionals. Ideal for projects aiming to maximize efficiency and reduce unnecessary clicks.',
        descriptionKo:
          '파워 유저와 전문가를 위한 도구에요. 효율성을 극대화하고 불필요한 클릭을 줄이려는 프로젝트에 적합해요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: minimal-workspace, layout: sidebar-left, components: Editor, Sidebar, Toolbar"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: minimal-workspace, layout: sidebar-left, components: Editor, Sidebar, Toolbar"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'bold-line': {
    id: 'bold-line',
    name: 'Bold Line',
    tagline: 'High-contrast, line-forward, typographically bold',
    taglineKo: '강렬한 대비, 선 중심, 타이포그래피가 돋보이는 디자인',
    description:
      'A stark black-and-white design system that uses bold borders instead of filled surfaces. Built for clarity, function, and maximum visual impact with a vibrant green accent.',
    descriptionKo:
      '굵은 테두리와 흑백 대비로 이루어진 선 중심 디자인 시스템이에요. 군더더기 없이 명확하고 강렬한 인상을 주며, 그린 액센트로 포인트를 살렸어요.',
    price: 59,
    screenshots: [
      getScreenshotUrl('bold-line', 'dashboard.png'),
      getScreenshotUrl('bold-line', 'components.png'),
    ],
    features: [
      {
        icon: '1',
        title: '2px Bold Border System',
        titleKo: '2px 굵은 테두리 시스템',
        subtitle: 'Line-forward visual language',
        subtitleKo: '선 중심의 시각 언어',
        description:
          'Every component uses 2px black borders instead of filled surfaces, creating a distinctive editorial look with maximum visual clarity.',
        descriptionKo:
          '모든 컴포넌트가 채워진 배경 대신 2px 검정 테두리를 사용해요. 강렬하고 편집적인 느낌으로 시각적 명료성을 극대화해요.',
      },
      {
        icon: '2',
        title: 'Zero-Radius Sharp Corners',
        titleKo: '0px 직각 모서리',
        subtitle: 'Geometric precision throughout',
        subtitleKo: '일관된 기하학적 정밀함',
        description:
          'No rounded corners anywhere. All elements use 0px border-radius for a geometric, grid-aligned aesthetic that communicates precision and confidence.',
        descriptionKo:
          '어디에도 둥근 모서리가 없어요. 모든 요소가 0px 라디우스를 사용해 기하학적이고 그리드 정렬된 미학을 표현해요.',
      },
      {
        icon: '3',
        title: 'Black & White with Green Accent',
        titleKo: '흑백 + 그린 액센트',
        subtitle: 'Strict monotone with vibrant highlight',
        subtitleKo: '모노톤 위의 생동감 있는 포인트',
        description:
          'Strict black and white palette with a single vibrant green accent for status indicators, highlights, and calls-to-action. Maximum clarity, zero noise.',
        descriptionKo:
          '엄격한 흑백 팔레트에 그린 액센트 하나만 사용해요. 상태 표시, 강조, CTA에 활용돼 노이즈 없이 최대한 명료하게 전달해요.',
      },
      {
        icon: '4',
        title: 'Heavy Weight Typography',
        titleKo: '헤비 웨이트 타이포그래피',
        subtitle: 'Black-weight fonts for impact',
        subtitleKo: '임팩트를 위한 블랙 웨이트 폰트',
        description:
          'Headings use font-black (900 weight) with tight tracking. Labels and metadata use uppercase with wide letter-spacing for editorial hierarchy.',
        descriptionKo:
          '제목은 font-black(900 굵기)에 좁은 자간을 사용해요. 레이블과 메타데이터는 대문자에 넓은 자간을 사용해 편집적 위계를 만들어요.',
      },
      {
        icon: '5',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Generate Bold Line UIs instantly',
        subtitleKo: 'Bold Line UI를 즉시 생성',
        description:
          'Request "Create a dashboard with Bold Line theme" and get a high-contrast layout with bold borders, sharp corners, and black-white typography in seconds.',
        descriptionKo:
          '"Bold Line 테마로 대시보드 만들어줘"라고 요청하면 굵은 테두리, 직각 모서리, 흑백 타이포그래피가 적용된 레이아웃이 즉시 생성돼요.',
      },
      {
        icon: '6',
        title: 'Dashboard Screen Template',
        titleKo: '대시보드 스크린 템플릿',
        subtitle: 'Production-ready analytics dashboard',
        subtitleKo: '프로덕션 준비된 분석 대시보드',
        description:
          "Includes a full analytics dashboard with stats cards, area chart, activity feed, and transaction table—all styled with Bold Line's signature aesthetic.",
        descriptionKo:
          '스탯 카드, 에리어 차트, 활동 피드, 거래 테이블이 포함된 완전한 분석 대시보드가 Bold Line 시그니처 스타일로 제공돼요.',
      },
    ],
    recommendedFor: [
      {
        title: 'SaaS Analytics & Admin Dashboards',
        titleKo: 'SaaS 분석 및 관리자 대시보드',
        description:
          'The high-contrast, data-forward design makes metrics and KPIs stand out immediately. Ideal for analytics platforms, admin panels, and monitoring tools.',
        descriptionKo:
          '높은 대비와 데이터 중심 디자인으로 지표와 KPI가 즉시 눈에 들어와요. 분석 플랫폼, 관리자 패널, 모니터링 도구에 딱이에요.',
      },
      {
        title: 'Developer Tools & Technical Products',
        titleKo: '개발자 도구 및 기술 제품',
        description:
          'The precision-focused, no-nonsense aesthetic resonates with developers and technical users. Works great for CLIs with web interfaces, API dashboards, and DevOps tools.',
        descriptionKo:
          '군더더기 없는 정밀한 미학이 개발자와 기술 사용자에게 어필해요. 웹 인터페이스가 있는 CLI, API 대시보드, DevOps 도구에 잘 어울려요.',
      },
      {
        title: 'Editorial & Publishing Platforms',
        titleKo: '편집 및 출판 플랫폼',
        description:
          'The bold typography and line-forward structure bring a print-editorial quality to digital products. Perfect for news platforms, content management systems, and writing tools.',
        descriptionKo:
          '굵은 타이포그래피와 선 중심 구조가 디지털 제품에 인쇄 편집물 같은 품격을 더해요. 뉴스 플랫폼, CMS, 글쓰기 도구에 완벽해요.',
      },
      {
        title: 'Fintech & Data-Heavy Applications',
        titleKo: '핀테크 및 데이터 집약적 애플리케이션',
        description:
          'The green accent for positive status and the bold contrast for emphasis make financial data readable at a glance. Ideal for trading platforms, invoicing tools, and financial dashboards.',
        descriptionKo:
          '긍정 상태를 나타내는 그린 액센트와 강조를 위한 굵은 대비로 금융 데이터를 한눈에 파악할 수 있어요. 거래 플랫폼, 인보이스 도구, 금융 대시보드에 이상적이에요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'Use generate-blueprint Tool',
        titleKo: 'generate-blueprint 툴 사용',
        description:
          'In Claude Code, request: "Use generate-blueprint tool with themeId: bold-line, layout: dashboard, components: Card, Table, Chart, Badge"',
        descriptionKo:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: bold-line, layout: dashboard, components: Card, Table, Chart, Badge"',
      },
      {
        step: 6,
        title: 'Preview and Export Code',
        titleKo: '미리보기 및 코드 내보내기',
        description:
          'Review the result at the generated previewUrl, then export TSX code to your project using the export-screen tool.',
        descriptionKo:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * 템플릿 ID로 데이터 조회
 */
export function getTemplateData(id: string): TemplateData | null {
  return TEMPLATES[id] || null;
}

/**
 * 모든 템플릿 목록 반환
 */
export function getAllTemplates(): TemplateData[] {
  return Object.values(TEMPLATES);
}
