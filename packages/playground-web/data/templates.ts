/**
 * Template Data Configuration
 *
 * 각 템플릿의 상세 정보를 관리하는 중앙 데이터 소스
 * - 가격, 설명, 추천 사용처, 설치 가이드
 * - Supabase Storage 이미지 URL 헬퍼
 */

type TemplateLocale = 'en' | 'ko';

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
    title: 'Install MCP Server',
    titleKo: 'MCP 서버 설치',
    description: 'Add the FramingUI MCP server to Claude Code with one command.',
    descriptionKo: '명령어 한 줄로 FramingUI MCP 서버를 Claude Code에 추가하세요.',
    code: 'npx @framingui/mcp-server init',
  },
  {
    step: 2,
    title: 'Log in & Authenticate',
    titleKo: '로그인 & 인증',
    description: 'Sign in via Claude Code to activate your licensed themes.',
    descriptionKo: 'Claude Code에서 로그인해서 라이선스 테마를 활성화하세요.',
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
    taglineKo: '곡선 없이 깔끔하고 정돈된 인터페이스',
    description:
      'Minimalist theme with sharp corners, neutral palette, and tight spacing. Best for dashboards and admin tools.',
    descriptionKo:
      '각진 모서리와 강한 대비의 미니멀 테마. 데이터 대시보드와 관리자 화면에 잘 맞아요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('square-minimalism', 'dashboard.webp'),
      getScreenshotUrl('square-minimalism', 'components.webp'),
      getScreenshotUrl('square-minimalism', 'magazine.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Production-Ready Components',
        titleKo: '바로 실무에 쓸 수 있는 30개의 컴포넌트',
        subtitle: 'Shadcn-UI based React component library',
        subtitleKo: 'Shadcn-UI를 기반으로 한 완성도 높은 React 컴포넌트',
        description:
          '30 typed React components including Button, Input, Card, and Modal. Supports dark mode and meets accessibility standards.',
        descriptionKo:
          '버튼, 인풋, 카드, 모달 등 30가지 TypeScript 지원 컴포넌트. 다크 모드와 웹 접근성 기준을 모두 충족해요.',
      },
      {
        icon: '2',
        title: '13 Pre-built Layouts',
        titleKo: '13가지 필수 페이지 레이아웃',
        subtitle: 'Common page layouts for rapid development',
        subtitleKo: '자주 쓰이는 화면들로 빠르게 시작하기',
        description:
          'Landing, Dashboard, Auth, and Profile pages — 13 complete layouts, responsive from mobile to desktop.',
        descriptionKo:
          '랜딩, 대시보드, 로그인, 프로필 등 13가지 완성된 레이아웃. 모든 테마와 호환돼요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Generate UI with natural language in Claude Code',
        subtitleKo: '프롬프트만으로 UI 바로 완성하기',
        description:
          'Ask Claude Code "Build a dashboard with Square Minimalism theme" and get working code right away.',
        descriptionKo: '"Square Minimalism 테마로 대시보드 짜줘"라고 하면 바로 코드가 나와요.',
      },
      {
        icon: '4',
        title: 'Design Token System',
        titleKo: '체계적인 디자인 토큰',
        subtitle: 'CSS variable-based consistent styling',
        subtitleKo: 'CSS 변수로 관리하는 일관된 스타일',
        description:
          'Colors, spacing, and typography all managed as CSS variables. Change your brand color once and the whole theme updates.',
        descriptionKo:
          '색상, 간격, 폰트를 CSS 변수로 관리해요. 브랜드 컬러 하나만 바꾸면 전체 테마가 바뀌어요.',
      },
      {
        icon: '5',
        title: 'Theme-Matched Icons',
        titleKo: '테마에 꼭 맞는 아이콘',
        subtitle: 'Lucide React icons auto-adapted to theme',
        subtitleKo: '테마 분위기에 알아서 맞춰지는 Lucide 아이콘',
        description:
          '500+ Lucide React icons pre-configured to match the theme. Size, stroke weight, and color all set — no manual tuning needed.',
        descriptionKo:
          '500개 넘는 Lucide 아이콘이 테마에 맞게 설정되어 있어요. 크기나 색상을 따로 조정할 필요 없어요.',
      },
      {
        icon: '6',
        title: 'Responsive Layout Tokens',
        titleKo: '완벽한 반응형 레이아웃',
        subtitle: 'Auto-responsive from mobile to desktop',
        subtitleKo: '기기 크기에 맞춰 알아서 변하는 화면',
        description:
          'Tailwind CSS responsive utilities built in. Tell the AI "1 column on mobile, 2 on tablet" and it handles the rest.',
        descriptionKo:
          'Tailwind CSS 반응형 유틸리티가 내장되어 있어요. AI에게 "모바일 1열, 태블릿 2열"이라고 하면 알아서 처리해줘요.',
      },
    ],
    recommendedFor: [
      {
        title: 'SaaS Dashboards & Admin Panels',
        titleKo: 'SaaS 대시보드 및 어드민 패널',
        description:
          'Clear hierarchy and high contrast make data easy to scan. Charts, tables, and action buttons are all easy to distinguish.',
        descriptionKo:
          '정보 위계와 대비가 뚜렷해서 복잡한 데이터도 한눈에 들어와요. 버튼이 어디 있는지 찾을 필요가 없어요.',
      },
      {
        title: 'Professional B2B Applications',
        titleKo: '전문적인 B2B 웹 서비스',
        description:
          'Clean, functional design that signals reliability without relying on visual decoration.',
        descriptionKo: '군더더기 없는 미니멀 디자인이 비즈니스 고객에게 신뢰감을 줘요.',
      },
      {
        title: 'Rapid Prototyping',
        titleKo: '빠른 프로토타이핑',
        description:
          'Simple baseline styling lets you focus on feature development instead of design decisions.',
        descriptionKo:
          '깔끔한 기본 스타일 덕분에 디자인 고민 없이 핵심 기능 개발에 바로 집중할 수 있어요.',
      },
      {
        title: 'Accessibility-First Projects',
        titleKo: '접근성 중심 프로젝트',
        description:
          'High color contrast (AAA rating) with full keyboard navigation and screen reader support.',
        descriptionKo:
          '최고 수준의 색상 대비(AAA 등급)에 키보드 조작과 스크린 리더 지원도 완벽해요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"square-minimalism 테마로 사이드바 대시보드 만들어줘"',
      },
    ],
  },

  'editorial-tech': {
    id: 'editorial-tech',
    name: 'Editorial Tech',
    tagline: 'Lucid, airy, typography-first rational design',
    taglineKo: '글이 술술 읽히는 타이포그래피 중심 인터페이스',
    description:
      'Typography-first theme with generous white space and bold headings. Built for blogs, docs, and long-form content.',
    descriptionKo:
      '여백과 타이포그래피로 읽기 경험을 극대화한 테마. 기술 블로그와 문서 사이트에 딱 맞아요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('editorial-tech', 'dashboard.webp'),
      getScreenshotUrl('editorial-tech', 'components.webp'),
      getScreenshotUrl('editorial-tech', 'solutions.webp'),
    ],
    features: [
      {
        icon: '1',
        title: 'Airy Canvas Layouts',
        titleKo: '여유로운 캔버스 레이아웃',
        subtitle: 'Generous padding and wide margins',
        subtitleKo: '시원하고 넉넉한 여백',
        description:
          'White space is treated as a design element, giving content room to breathe and making long reads feel effortless.',
        descriptionKo: '여백도 디자인의 일부예요. 꽉 막힌 느낌 없이 글에 집중할 수 있어요.',
      },
      {
        icon: '2',
        title: 'Typography-First Hierarchy',
        titleKo: '폰트 중심의 정보 구조',
        subtitle: 'Big clean headings, high legibility',
        subtitleKo: '시원한 제목과 뛰어난 가독성',
        description:
          'Information is separated by font size, weight, and tracking — no heavy borders or colored backgrounds needed.',
        descriptionKo:
          '폰트 크기와 굵기만으로 정보를 구분해요. 두꺼운 테두리나 배경색 없이도 레이아웃이 논리적으로 읽혀요.',
      },
      {
        icon: '3',
        title: 'Systematic Neutrals',
        titleKo: '정돈된 무채색 팔레트',
        subtitle: 'Pure grays with stark contrast',
        subtitleKo: '배경과 글을 분리해 주는 담백한 그레이톤',
        description:
          'Pure white canvas with near-black text. No background noise — content stays front and center.',
        descriptionKo:
          '흰 배경과 짙은 텍스트만 써요. 배경이 방해하지 않고 내용이 그대로 눈에 들어와요.',
      },
      {
        icon: '4',
        title: 'Measured Curves',
        titleKo: '세련된 곡선 감각',
        subtitle: 'Alloy of sharp logic and human circularity',
        subtitleKo: '각진 레이아웃 속 부드러운 포인트',
        description:
          'Sharp geometric layouts with pill-shaped buttons and chips as deliberate soft accents.',
        descriptionKo:
          '직각의 레이아웃 속에 둥근 버튼과 칩을 포인트로 넣어 딱딱하지 않은 균형을 만들어요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Design Portfolios & Agencies',
        titleKo: '디자인 포트폴리오 및 에이전시',
        description:
          'Clean layout lets the work speak for itself, without competing UI elements in the way.',
        descriptionKo: '복잡한 UI 없이 작업물 자체에 시선이 가요. 포트폴리오가 더 돋보여요.',
      },
      {
        title: 'In-Depth Reading Material',
        titleKo: '심도 있는 읽을거리',
        description:
          'Right for long-form essays, technical journalism, and newsletters that need sustained reader focus.',
        descriptionKo:
          '긴 에세이, 기술 블로그, 심층 뉴스레터처럼 끝까지 읽어야 하는 콘텐츠에 맞아요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"editorial-tech 테마로 아티클 피드 페이지 만들어줘"',
      },
    ],
  },

  'dark-boldness': {
    id: 'dark-boldness',
    name: 'Dark Boldness',
    tagline: 'Modern dark mode dashboard & monitoring design',
    taglineKo: '다크 모드 기반의 미니멀 모던 UI',
    description:
      'Always-dark theme with sharp components and high-contrast accents. Made for data dashboards and monitoring tools.',
    descriptionKo: '항상 다크 모드. 직각 컴포넌트와 강한 대비로 데이터를 한눈에 파악할 수 있어요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('dark-boldness', 'dashboard.webp'),
      getScreenshotUrl('dark-boldness', 'components.webp'),
      getScreenshotUrl('dark-boldness', 'trading.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Data Dashboard Components',
        titleKo: '데이터 대시보드에 최적화된 컴포넌트 30종',
        subtitle: 'Modern, refined components built on Shadcn-UI',
        subtitleKo: 'Shadcn-UI 기반의 모던하고 정제된 컴포넌트',
        description:
          'Stat cards, progress bars, data tables — 30 components built for data-heavy interfaces on a dark canvas.',
        descriptionKo:
          '스탯 카드, 프로그레스 바, 데이터 테이블 등 데이터 집중 화면에 필요한 컴포넌트 30종.',
      },
      {
        icon: '2',
        title: '13 Essential Page Layouts',
        titleKo: '13가지 필수 페이지 레이아웃',
        subtitle: 'Start fast with the most-used screens',
        subtitleKo: '자주 쓰이는 화면들로 빠르게 시작하기',
        description:
          'Landing, Dashboard, Auth, and Profile — 13 complete layouts that work across all themes.',
        descriptionKo:
          '랜딩, 대시보드, 로그인, 프로필 등 13가지 완성된 레이아웃. 모든 테마와 호환돼요.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Build complex dashboard UIs with AI in seconds',
        subtitleKo: 'AI로 복잡한 대시보드 UI 뚝딱 만들기',
        description:
          'Tell Claude Code "Build a real-time monitoring screen with Dark Boldness" and get a metrics-packed dashboard instantly.',
        descriptionKo:
          '"Dark Boldness 테마로 실시간 모니터링 화면 짜줘"라고 하면 바로 대시보드가 나와요.',
      },
      {
        icon: '4',
        title: 'High-Impact Accent Colors',
        titleKo: '몰입을 돕는 눈에 띄는 포인트 컬러',
        subtitle: 'Vivid accents that energize the dark palette',
        subtitleKo: '다크 톤에 생기를 불어넣는 강렬한 엑센트',
        description:
          'High-contrast accent colors defined as CSS variables. Change the primary color once to complete your brand dark theme.',
        descriptionKo:
          '강렬한 대비의 액센트 컬러가 CSS 변수로 설정되어 있어요. 대표 컬러만 바꾸면 브랜드 다크 테마가 완성돼요.',
      },
      {
        icon: '5',
        title: 'Dynamic Motion Effects',
        titleKo: '다이내믹한 모션 효과',
        subtitle: 'Lively animations that add excitement',
        subtitleKo: '톡톡 튀는 애니메이션으로 재미 더하기',
        description:
          'Framer Motion animation presets for button clicks, card hovers, and page transitions.',
        descriptionKo:
          'Framer Motion 기반 애니메이션이 적용되어 있어요. 버튼, 카드, 페이지 전환에 모두 들어가 있어요.',
      },
      {
        icon: '6',
        title: 'Statistics Visualization Components',
        titleKo: '통계 시각화 컴포넌트',
        subtitle: 'Intuitive charts for at-a-glance insights',
        subtitleKo: '변화를 한눈에 보는 직관적인 차트',
        description:
          'Time-series graphs, donut charts, and more — integrated with Chart.js for flexible data visualization.',
        descriptionKo: '시계열 그래프, 도넛 차트 등 Chart.js와 연동된 다양한 시각화 컴포넌트.',
      },
    ],
    recommendedFor: [
      {
        title: 'Data Monitoring & Analytics Dashboards',
        titleKo: '데이터 모니터링 및 분석 대시보드',
        description:
          'High-contrast layout makes it easy to track many live metrics without losing track of anomalies.',
        descriptionKo:
          '강한 대비 덕분에 수많은 실시간 지표 중에서도 이상 신호를 바로 잡아낼 수 있어요.',
      },
      {
        title: 'Developer Tools & Admin Panels',
        titleKo: '개발자 도구 및 어드민 패널',
        description:
          'Good fit for heavy-use internal tools where minimalism reduces eye fatigue over long sessions.',
        descriptionKo:
          '매일 들여다보는 관리 툴에 잘 맞아요. 군더더기 없는 디자인이 눈의 피로를 줄여줘요.',
      },
      {
        title: 'Crypto & Fintech Services',
        titleKo: '가상자산 및 핀테크 서비스',
        description:
          'Polished dark aesthetic fits crypto exchanges, portfolio trackers, and financial platforms.',
        descriptionKo: '암호화폐 거래소, 자산 관리 앱 등 핀테크 서비스의 분위기와 잘 맞아요.',
      },
      {
        title: 'Trendy & Modern Brands',
        titleKo: '트렌디하고 현대적인 브랜드',
        description:
          'The dark mode look works well for tech-forward brands that want a strong, modern identity.',
        descriptionKo:
          '기술적이고 진취적인 브랜드에 어울려요. 다크 모드 특유의 시크한 인상이 강해요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"dark-boldness 테마로 실시간 모니터링 대시보드 만들어줘"',
      },
    ],
  },

  pebble: {
    id: 'pebble',
    name: 'Pebble',
    tagline: 'Soft, rounded, gentle user experience',
    taglineKo: '둥글둥글하고 다정한 느낌의 모바일 앱 UI',
    description:
      'Soft-corner components with warm pastel colors. Good for consumer apps, social platforms, and lifestyle services.',
    descriptionKo: '둥근 모서리와 따뜻한 색상의 테마. 소셜, 커뮤니티, 생활 서비스 앱에 잘 맞아요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('pebble', 'dashboard.webp'),
      getScreenshotUrl('pebble', 'components.webp'),
      getScreenshotUrl('pebble', 'feed.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Soft-Rounded Components',
        titleKo: '부드럽고 둥근 컴포넌트 30종',
        subtitle: 'Shadcn-UI with a warm, friendly touch',
        subtitleKo: 'Shadcn-UI에 따뜻함을 한 스푼 넣은 컴포넌트',
        description:
          '30 components with soft corners (rounded-xl, rounded-2xl). Friendly feel optimized for consumer-facing apps.',
        descriptionKo:
          '둥근 모서리(rounded-xl 등)가 적용된 컴포넌트 30종. 딱딱하지 않고 친근하게 느껴져요.',
      },
      {
        icon: '2',
        title: '13 Essential Page Layouts',
        titleKo: '13가지 필수 페이지 레이아웃',
        subtitle: 'Start fast with the most-used screens',
        subtitleKo: '자주 쓰이는 화면들로 빠르게 시작하기',
        description:
          'Social Feed, User Profile, Community, and Chat layouts — 13 complete pages for consumer apps.',
        descriptionKo:
          '소셜 피드, 프로필, 커뮤니티, 채팅 등 소비자용 앱에 맞는 13가지 완성 레이아웃.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Create friendly UIs with a single prompt',
        subtitleKo: '말 한마디로 친근한 UI 뚝딱',
        description:
          'Say "Build a profile page with Pebble theme" and get a soft-styled screen with avatar and follow button right away.',
        descriptionKo:
          '"Pebble 테마로 프로필 페이지 만들어줘"라고 하면 아바타와 팔로우 버튼이 있는 부드러운 화면이 바로 나와요.',
      },
      {
        icon: '4',
        title: 'Warm & Cozy Color Palette',
        titleKo: '포근한 컬러 팔레트',
        subtitle: 'Eye-friendly pastel tones',
        subtitleKo: '눈이 편안한 파스텔 톤 색상들',
        description:
          'Pastel blues and soft pinks as CSS variables. Easy on the eyes even during long sessions.',
        descriptionKo: '파스텔 블루, 소프트 핑크 등 튀지 않는 색상들. 오래 봐도 눈이 편해요.',
      },
      {
        icon: '5',
        title: 'Soft Shadow System',
        titleKo: '은은한 그림자 효과',
        subtitle: 'Layered shadows for a light 3D feel',
        subtitleKo: '화면에 가벼운 입체감을 부여하는 그림자',
        description:
          'Multi-layer soft shadows give components a floating feel. Applied consistently via elevation tokens.',
        descriptionKo: '겹겹이 쌓은 부드러운 그림자로 컴포넌트가 살짝 떠 있는 느낌을 줘요.',
      },
      {
        icon: '6',
        title: 'Touch-Friendly Interactions',
        titleKo: '손가락에 꼭 맞는 터치 영역',
        subtitle: 'Perfectly sized targets for effortless tapping',
        subtitleKo: '오터치 없이 편하게 누르는 최적의 사이즈',
        description:
          'All interactive elements have minimum 44x44px touch targets with adequate spacing between them.',
        descriptionKo:
          '버튼, 탭 등 모든 인터랙션 요소가 최소 44x44px. 잘못 눌릴 일 없는 넉넉한 여백.',
      },
    ],
    recommendedFor: [
      {
        title: 'B2C Mobile Apps',
        titleKo: 'B2C 모바일 앱',
        description:
          'Works well for apps users check daily — social feeds, personal journals, and shopping.',
        descriptionKo: '소셜 피드, 일상 기록, 쇼핑처럼 매일 가볍게 쓰는 모바일 앱에 잘 맞아요.',
      },
      {
        title: 'Approachable Brand Identity',
        titleKo: '친근한 브랜드 아이덴티티',
        description: 'Replaces the cold IT-service feel with something warm and human.',
        descriptionKo: '차갑고 딱딱한 IT 서비스 느낌 대신 사람 냄새 나는 인상을 줄 수 있어요.',
      },
      {
        title: 'Community & Social Platforms',
        titleKo: '커뮤니티 및 소셜 플랫폼',
        description:
          'Natural fit for spaces where users gather, share interests, and interact with each other.',
        descriptionKo: '유저들이 모여서 이야기하고 취향을 나누는 공간에 잘 어울려요.',
      },
      {
        title: 'Calming & Comforting Services',
        titleKo: '마음이 편안해지는 서비스',
        description:
          "Good for children's apps, sleep aids, or meditation tools — no sharp or jarring elements.",
        descriptionKo:
          '아이 앱, 수면 유도, 명상 앱처럼 뾰족한 것 없이 시각적으로 편안한 화면이 필요할 때 추천해요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"pebble 테마로 카드 레이아웃 화면 만들어줘"',
      },
    ],
  },

  'classic-magazine': {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    tagline: 'Editorial, content-rich, timeless typography',
    taglineKo: '종이 잡지를 읽는 듯한 클래식 매거진 UI',
    description:
      'Print-editorial layout with serif typography and a multi-column grid. For article sites, newsletters, and media publications.',
    descriptionKo:
      '세리프 폰트와 다단 그리드로 구성된 인쇄 잡지 스타일 테마. 아티클, 뉴스레터, 미디어 사이트에 맞아요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('classic-magazine', 'dashboard.webp'),
      getScreenshotUrl('classic-magazine', 'components.webp'),
      getScreenshotUrl('classic-magazine', 'article.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Editorial-Optimized Components',
        titleKo: '기사 편집에 특화된 컴포넌트 30종',
        subtitle: 'Specialized building blocks for media and publishing',
        subtitleKo: '미디어와 출판을 위한 특별한 조각들',
        description:
          'Article Card, Byline, Pull Quote, Drop Cap — 30 components built for content publishing, straight from print to web.',
        descriptionKo:
          'Drop Cap, Pull Quote 등 잡지에서나 보던 편집 요소들을 웹에서 바로 쓸 수 있어요.',
      },
      {
        icon: '2',
        title: '13 Essential Page Layouts',
        titleKo: '13가지 필수 페이지 레이아웃',
        subtitle: 'Start fast with the most-used screens',
        subtitleKo: '자주 쓰이는 화면들로 빠르게 시작하기',
        description:
          'Homepage Grid, Article Detail, Category Page, and Author Profile — 13 layouts built for content-first sites.',
        descriptionKo:
          '홈 그리드, 기사 상세, 카테고리, 저자 프로필 등 콘텐츠 중심 사이트용 13가지 레이아웃.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'AI-generated stunning layouts in seconds',
        subtitleKo: 'AI가 짜주는 기깔난 레이아웃',
        description:
          'Tell Claude "Build an article body with Classic Magazine theme" and get a full magazine layout — headline to sidebar — right away.',
        descriptionKo:
          '"Classic Magazine 테마로 기사 본문 짜줘"라고 하면 헤드라인부터 사이드바까지 완성된 레이아웃이 바로 나와요.',
      },
      {
        icon: '4',
        title: 'Elegant Typography',
        titleKo: '기품 있는 타이포그래피',
        subtitle: 'The beauty of Serif and Sans in harmony',
        subtitleKo: '명조(Serif)와 고딕(Sans)의 아름다운 조화',
        description:
          'Merriweather Serif headings paired with Inter body text. Line height, letter spacing, and paragraph spacing optimized for long reads.',
        descriptionKo:
          '세리프 제목 + 산세리프 본문 조합. 줄 간격과 자간을 조정해 긴 글도 편하게 읽혀요.',
      },
      {
        icon: '5',
        title: 'Refined Multi-Column Layout',
        titleKo: '세밀한 다단 레이아웃',
        subtitle: 'Flexible column arrangement stitch by stitch',
        subtitleKo: '한 땀 한 땀 나눈 유연한 단 구성',
        description:
          '12-column grid system for flexible article arrangements. 2 or 3 columns collapse and expand responsively.',
        descriptionKo:
          '12컬럼 그리드 기반으로 2단, 3단을 자유롭게 구성해요. 브라우저 크기에 맞게 알아서 접히고 펴져요.',
      },
      {
        icon: '6',
        title: 'Clear Content Hierarchy',
        titleKo: '확실한 정보의 위계',
        subtitle: 'Systematic categorization that eases article weight',
        subtitleKo: '기사의 무게감을 덜어주는 체계적인 분류',
        description:
          'Dates, authors, and tags are arranged by hierarchy so users can navigate complex articles without getting lost.',
        descriptionKo:
          '날짜, 기자, 태그 등 메타데이터를 위계에 맞게 정돈해요. 복잡한 기사에서도 길을 잃지 않아요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Journalism & Article Publishing',
        titleKo: '저널리즘 및 아티클 퍼블리싱',
        description:
          'Best for newsletters and editorial magazines that publish high-quality writing on a regular schedule.',
        descriptionKo:
          '수준 높은 글을 정기적으로 발행하는 뉴스레터와 기획 매거진에 가장 잘 맞아요.',
      },
      {
        title: 'Independent Media & Specialty Publications',
        titleKo: '독립 미디어 및 전문지',
        description:
          'Adds distinction to interview magazines, deep-dive reports, and online newsletters with a clear editorial voice.',
        descriptionKo:
          '차별화된 시각을 가진 인터뷰 매거진, 심층 리포트, 온라인 사보에 격조를 더해줘요.',
      },
      {
        title: 'Long-Form Content & Article Sites',
        titleKo: '롱폼 콘텐츠 및 아티클 사이트',
        description:
          'Typography and layout are designed to pull readers through essays, reviews, and guides to the end.',
        descriptionKo:
          '에세이, 리뷰, 가이드 같은 긴 글을 끝까지 읽게 만드는 타이포그래피와 레이아웃.',
      },
      {
        title: 'Traditional Editorial Design Projects',
        titleKo: '전통적인 편집 디자인 프로젝트',
        description:
          'Suited for literary journals, academic publications, and corporate magazines that need an authoritative look.',
        descriptionKo:
          '문학지, 학술지, 기업 매거진처럼 권위 있고 신뢰감 있는 디자인이 필요한 곳에 맞아요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"classic-magazine 테마로 매거진 아티클 페이지 만들어줘"',
      },
    ],
  },

  'neutral-workspace': {
    id: 'neutral-workspace',
    name: 'Neutral Workspace',
    tagline: 'Universal, accessible, human-centered design for everyone',
    taglineKo: '누구에게나 평등한 접근성을 보장하는 유니버셜 UI',
    description:
      'Accessibility-first design system built to WCAG AAA standards. Anyone can use it clearly, regardless of age or ability.',
    descriptionKo:
      'WCAG AAA 기준의 접근성 우선 테마. 연령이나 장애 여부에 상관없이 누구나 쓸 수 있어요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('neutral-workspace', 'dashboard.webp'),
      getScreenshotUrl('neutral-workspace', 'components.webp'),
      getScreenshotUrl('neutral-workspace', 'kanban.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Universally Accessible Components',
        titleKo: '보편적 사용성을 고려한 30종의 컴포넌트',
        subtitle: 'Shadcn-UI with strict web standards applied',
        subtitleKo: 'Shadcn-UI에 엄격한 웹 표준을 더한 컴포넌트',
        description:
          '30 components meeting WCAG AAA contrast standards. Clear for everyone, including users with visual difficulties.',
        descriptionKo:
          'WCAG AAA 대비 기준을 충족하는 컴포넌트 30종. 시각적 불편함이 있어도 쉽게 인식할 수 있어요.',
      },
      {
        icon: '2',
        title: '13 Essential Page Layouts',
        titleKo: '13가지 필수 페이지 레이아웃',
        subtitle: 'Start fast with the most-used screens',
        subtitleKo: '자주 쓰이는 화면들로 빠르게 시작하기',
        description:
          'Healthcare Dashboard, Education Portal, Government Forms — 13 layouts for trust-critical sectors.',
        descriptionKo:
          '헬스케어 대시보드, 교육 포털, 정부 폼 등 신뢰가 중요한 분야를 위한 13가지 레이아웃.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Build perfectly accessible UIs with AI',
        subtitleKo: 'AI로 접근성 완벽한 UI 만들기',
        description:
          'Say "Build a patient survey form" and get a complete form with clear hints and error messages around each input.',
        descriptionKo:
          '"환자 설문 폼 만들어줘"라고 하면 힌트와 에러 안내가 포함된 완성된 폼이 나와요.',
      },
      {
        icon: '4',
        title: 'Neutral Color System',
        titleKo: '가장 차분하고 중립적인 컬러맵',
        subtitle: 'Trustworthy grayscale palette with no bias',
        subtitleKo: '호불호 없는 신뢰의 회색조',
        description:
          'A plain gray palette that works across genders and age groups. Supports the credibility of the content itself.',
        descriptionKo:
          '특정 취향을 타지 않는 담백한 그레이 팔레트. 정보의 객관성과 신뢰도를 뒷받침해요.',
      },
      {
        icon: '5',
        title: 'Clear Focus Indicators',
        titleKo: '뚜렷한 포커스 표시',
        subtitle: 'Zero frustration keyboard navigation',
        subtitleKo: '마우스 없이도 답답함 제로인 키보드 이동',
        description:
          'Bold blue focus ring makes the selected element obvious. Full keyboard navigation with Tab only — always clear where you are.',
        descriptionKo:
          '굵은 파란 포커스 링으로 선택된 요소가 바로 보여요. Tab 키만으로 전체 화면을 이동할 수 있어요.',
      },
      {
        icon: '6',
        title: 'Multilingual & RTL Support',
        titleKo: '다국어 및 RTL 지원',
        subtitle: 'Designed for global users',
        subtitleKo: '글로벌 사용자를 위한 설계',
        description:
          'Supports RTL languages like Arabic and Hebrew. Typography stays readable across diverse writing systems.',
        descriptionKo:
          '아랍어, 히브리어 같은 RTL 언어를 지원해요. 다양한 문자 체계에서도 가독성이 유지돼요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Healthcare & Medical Services',
        titleKo: '헬스케어 및 병원 서비스',
        description:
          'Helps elderly patients and those with disabilities read appointment info and fill out forms without confusion.',
        descriptionKo: '어르신 환자도 예약 정보를 쉽게 확인하고 폼을 안전하게 입력할 수 있어요.',
      },
      {
        title: 'Education & Learning Platforms',
        titleKo: '교육 및 학습 플랫폼',
        description:
          'Distraction-free layout keeps students and teachers focused. Supports diverse learning styles.',
        descriptionKo:
          '학생과 교사가 집중할 수 있는 방해 없는 디자인. 다양한 학습 스타일을 지원해요.',
      },
      {
        title: 'Government Agencies & Public Portals',
        titleKo: '정부 기관 및 공공 포털',
        description:
          'Right for public services and university portals where universal access is a hard requirement.',
        descriptionKo:
          '공평한 접근이 필수인 관공서 대국민 서비스나 학사 관리 포털에 필수적인 테마예요.',
      },
      {
        title: 'Accessibility-First Projects',
        titleKo: '접근성이 최우선인 프로젝트',
        description:
          'Built for WCAG AAA compliance. Accounts for visual, auditory, and motor disabilities.',
        descriptionKo:
          'WCAG AAA 달성을 목표로 하는 프로젝트에 맞아요. 시각, 청각, 운동 장애를 모두 고려했어요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"neutral-workspace 테마로 워크스페이스 대시보드 만들어줘"',
      },
    ],
  },

  'minimal-workspace': {
    id: 'minimal-workspace',
    name: 'Minimal Workspace',
    tagline: 'Hyper-focused, zero-distraction productivity UI',
    taglineKo: '오직 일에만 몰입하게 만드는 초집중 UI',
    description:
      'No decoration, pure utility. Built for editors, project managers, and developer dashboards where focus is everything.',
    descriptionKo:
      '장식 없이 기능만 남긴 테마. 에디터, 프로젝트 관리, 개발자 대시보드처럼 집중이 전부인 툴에 맞아요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('minimal-workspace', 'dashboard.webp'),
      getScreenshotUrl('minimal-workspace', 'components.webp'),
      getScreenshotUrl('minimal-workspace', 'kanban.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '30 Productivity-Maximizing Components',
        titleKo: '30가지의 생산성 극대화 조각들',
        subtitle: 'Solid components built for professionals',
        subtitleKo: '프로들을 위한 탄탄한 컴포넌트들',
        description:
          'Editor, Sidebar, Command Palette, Toolbar — 30 components designed for professionals who need speed and efficiency.',
        descriptionKo:
          '에디터, 커맨드 팔레트, 사이드바 등 생산성에 집착하는 프로를 위한 컴포넌트 30종.',
      },
      {
        icon: '2',
        title: '13 Essential Page Layouts',
        titleKo: '13가지 필수 페이지 레이아웃',
        subtitle: 'Start fast with the most-used screens',
        subtitleKo: '자주 쓰이는 화면들로 빠르게 시작하기',
        description:
          'Code Editor, Note Taking, Task Management, Project Dashboard — 13 productivity layouts with left sidebar and wide work area.',
        descriptionKo:
          '코드 에디터, 노트, 태스크 관리, 프로젝트 대시보드 등 생산성 앱용 13가지 레이아웃.',
      },
      {
        icon: '3',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Build professional workspaces with AI instantly',
        subtitleKo: 'AI로 전문적인 워크스페이스 즉시 구축',
        description:
          'Tell the AI "Build a layout with a status bar and editor" and get an IDE-style workspace generated on the spot.',
        descriptionKo:
          '"에디터 포함된 상태바 레이아웃 만들어줘"라고 하면 IDE 스타일 워크스페이스가 바로 만들어져요.',
      },
      {
        icon: '4',
        title: 'Ultimate Subtraction Design',
        titleKo: '극강의 뺄셈 디자인',
        subtitle: 'A noiseless real canvas instead of glamour',
        subtitleKo: '화려함 대신 노이즈리스 리얼 캔버스',
        description:
          "No animations, no flashy shadows. The interface stays out of the way so only the user's content takes center stage.",
        descriptionKo:
          '애니메이션도 화려한 그림자도 없어요. 인터페이스가 뒤로 물러나고 사용자의 글과 코드만 주인공이 돼요.',
      },
      {
        icon: '5',
        title: 'Keyboard-First Workflow',
        titleKo: '마우스를 버릴 수 있는 키보드 중심 설계',
        subtitle: 'Press Cmd+K and everything is at your fingertips',
        subtitleKo: 'Cmd+K만 누르면 다 되는 마법',
        description:
          'One keyboard shortcut opens modals and navigates menus — no mouse clicking through menus one by one.',
        descriptionKo:
          '단축키 하나로 모달을 띄우고 메뉴를 탐색해요. 마우스로 일일이 클릭할 필요 없어요.',
      },
      {
        icon: '6',
        title: 'Dark Mode First Design',
        titleKo: '다크 모드 우선 디자인',
        subtitle: 'Dark theme ideal for extended work',
        subtitleKo: '장시간 작업에 적합한 다크 테마',
        description:
          'Dark mode by default to reduce eye strain. Blends naturally with code editors, terminals, and developer tools.',
        descriptionKo:
          '기본이 다크 모드라 눈이 편해요. 코드 에디터, 터미널 같은 개발자 도구와 자연스럽게 어우러져요.',
      },
    ],
    recommendedFor: [
      {
        title: 'Project Management & Collaboration Tools',
        titleKo: '프로젝트 관리 및 협업 툴',
        description:
          'Clean interface for managing tasks, projects, and teams. Good match for Notion, Linear, and Asana-style tools.',
        descriptionKo:
          '태스크, 프로젝트, 팀원을 효율적으로 관리할 수 있어요. Notion, Linear, Asana 스타일에 맞아요.',
      },
      {
        title: 'Note Apps & Knowledge Management Systems',
        titleKo: '노트 앱 및 지식 관리 시스템',
        description:
          'Distraction-free writing environment. Works well for Obsidian and Roam Research-style apps.',
        descriptionKo:
          '글쓰기와 사고 정리에 집중할 수 있는 화면. Obsidian, Roam Research 스타일에 잘 맞아요.',
      },
      {
        title: 'Code Editors & Developer Tools',
        titleKo: '코드 에디터 및 개발 도구',
        description:
          'VS Code and Sublime Text-style layouts with optimized sidebar, editor, and terminal placement.',
        descriptionKo:
          'VS Code, Sublime Text 스타일의 개발 환경. 사이드바, 에디터, 터미널 레이아웃이 최적화되어 있어요.',
      },
      {
        title: 'Work Environments Prioritizing Productivity',
        titleKo: '생산성과 집중이 중요한 작업 환경',
        description: 'For power users who want maximum efficiency and minimum unnecessary clicks.',
        descriptionKo: '효율을 극대화하고 불필요한 클릭을 줄이려는 파워 유저를 위한 테마예요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"minimal-workspace 테마로 에디터 사이드바 레이아웃 만들어줘"',
      },
    ],
  },

  'bold-line': {
    id: 'bold-line',
    name: 'Bold Line',
    tagline: 'High-contrast, line-forward, typographically bold',
    taglineKo: '두꺼운 선과 직각이 만드는 압도적 명료함',
    description:
      'Black-and-white theme using 2px borders instead of filled surfaces. Blueprint-style grid for data-heavy professional dashboards.',
    descriptionKo:
      '색 배경 대신 2px 검은 선으로 구역을 나누는 흑백 테마. 방대한 데이터를 다루는 전문가용 관제 화면에 맞아요.',
    price: 49,
    screenshots: [
      getScreenshotUrl('bold-line', 'dashboard.webp'),
      getScreenshotUrl('bold-line', 'components.webp'),
      getScreenshotUrl('bold-line', 'docs.webp'),
    ],
    features: [
      {
        icon: '1',
        title: '2px Bold Border System',
        titleKo: '단호한 2px 테두리 두께',
        subtitle: 'Intense line-forward visual language',
        subtitleKo: '윤곽선 위주의 강렬한 시각 언어',
        description:
          'Zones divided by thick 2px black lines instead of background colors. Maximizes clarity with no visual noise.',
        descriptionKo:
          '배경색 대신 2px 검은 선으로 구역을 나눠요. 시각적 노이즈 없이 명확성을 극대화해요.',
      },
      {
        icon: '2',
        title: 'Uncompromising 0px Corners',
        titleKo: '자비 없는 0px 모서리',
        subtitle: 'The geometric beauty of perfect right angles',
        subtitleKo: '완전한 직각의 기하학적 아름다움',
        description:
          'Zero curves anywhere. Every element uses 0px radius for a mechanical, grid-precise aesthetic.',
        descriptionKo:
          '곡선은 1픽셀도 없어요. 모든 요소가 0px 반경의 직각으로 기계적이고 정밀한 인상을 줘요.',
      },
      {
        icon: '3',
        title: 'Monochrome + Neon Green Accent',
        titleKo: '무채색과 네온 그린의 강렬한 조화',
        subtitle: 'One drop of neon light in a monochrome world',
        subtitleKo: '단색 세상에 떨어뜨린 한 방울의 네온 빛',
        description:
          'Pure black and white throughout, with neon green firing only at critical moments — active states, success, payment — to steal the gaze.',
        descriptionKo:
          '온통 흑백이다가 "작동 중", "성공", "결제" 같은 중요한 순간에만 네온 그린이 한 번 터져 시선을 완전히 훔쳐요.',
      },
      {
        icon: '4',
        title: 'Heavyweight Typography',
        titleKo: '묵직한 헤비급 타이포그래피',
        subtitle: 'Ultra-bold weight that commands attention',
        subtitleKo: '시선을 강탈하는 초고도 굵기',
        description:
          'Headlines use 900-weight font-black. Text weight alone creates hierarchy — no decorative elements needed.',
        descriptionKo:
          '제목에 900 굵기(font-black)를 써요. 텍스트 무게만으로 계층을 나눠서 장식이 따로 필요 없어요.',
      },
      {
        icon: '5',
        title: 'MCP Server Integration',
        titleKo: 'MCP 서버 통합',
        subtitle: 'Blueprint-style layouts generated with AI',
        subtitleKo: 'AI로 도면 같은 레이아웃 뚝딱',
        description:
          'Tell the AI "Build a data-heavy dashboard blueprint" and get a framework of decisive lines and monochrome contrast instantly.',
        descriptionKo:
          '"데이터 많은 대시보드 도면 짜줘"라고 하면 단호한 선과 흑백 대비의 전문적인 틀이 바로 나와요.',
      },
      {
        icon: '6',
        title: 'Ready-to-Use Monitoring Dashboard',
        titleKo: '관제탑용 모니터링 템플릿 완성',
        subtitle: 'A ready-made dashboard set with dense tables and charts',
        subtitleKo: '촘촘한 표와 차트가 버무려진 바로 쓸 수 있는 대시보드 세트',
        description:
          'Stats, area charts, and multi-level tables pre-assembled. Just plug in your data and the dashboard is ready.',
        descriptionKo:
          '스탯, 면적 차트, 다단 테이블이 이미 조립된 채로 제공돼요. 데이터만 넣으면 끝.',
      },
    ],
    recommendedFor: [
      {
        title: 'Hardcore Data Analytics Dashboards',
        titleKo: '하드코어 데이터 분석 대시보드',
        description:
          'Built for monitoring rooms that need to catch anomalies fast across many live metrics, or super admin panels.',
        descriptionKo:
          '수많은 지표 중 이상 징후를 가장 빨리 잡아야 하는 모니터링 룸이나 관리자용 슈퍼 어드민에 최고예요.',
      },
      {
        title: 'Cynical Developer & DevOps Toolkit',
        titleKo: '시니컬한 개발자 및 데브옵스 툴킷',
        description:
          'Terminal-native aesthetic fits infrastructure tools and API testing tools that developers trust.',
        descriptionKo:
          '터미널에 익숙한 개발자들이 좋아하는 시니컬하고 긱한 감성. 인프라 툴, API 테스팅 툴에 잘 맞아요.',
      },
      {
        title: 'Editorial & Publishing Platforms',
        titleKo: '편집 및 출판 플랫폼',
        description:
          'Bold typography and line structure bring print-editorial quality to digital products — news platforms, CMS, writing tools.',
        descriptionKo:
          '굵은 타이포그래피와 선 중심 구조가 뉴스 플랫폼, CMS, 글쓰기 도구에 인쇄물 같은 품격을 더해요.',
      },
      {
        title: 'High-Frequency Trading & Finance Apps',
        titleKo: '고빈도 트레이딩 및 금융 앱',
        description:
          'Strong weight and high contrast help users track rapidly changing numbers without getting overwhelmed.',
        descriptionKo:
          '오르내리는 숫자가 쏟아지는 트레이딩 앱과 회계 장부에서도 강한 굵기와 대비로 사용자가 흐름을 놓치지 않아요.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 3,
        title: 'Ask Claude to Build Your Screen',
        titleKo: 'Claude에게 원하는 화면 만들어 달라고 하기',
        description:
          'Tell Claude what you need — login, blog, dashboard, anything. FramingUI puts together CSS variables, icons, components, and templates into production-ready UI.',
        descriptionKo:
          '로그인이든 대시보드든 원하는 화면을 말하면, FramingUI가 CSS 변수, 아이콘, 컴포넌트, 템플릿을 조합해서 바로 쓸 수 있는 UI를 만들어줘요.',
        code: '"bold-line 테마로 대시보드 만들어줘"',
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

/**
 * locale에 맞는 텍스트를 선택합니다.
 * - ko/ja가 없으면 en으로 fallback
 */
export function getLocalizedTemplateText(locale: TemplateLocale, en: string, ko?: string): string {
  if (locale === 'ko' && ko) {
    return ko;
  }
  return en;
}
