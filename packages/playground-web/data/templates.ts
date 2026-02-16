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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return `/placeholder-${filename}`;
  }
  return `${supabaseUrl}/storage/v1/object/public/templates/${templateId}/${filename}`;
}

// ============================================================================
// Shared How To Use Steps (MCP Server Installation)
// ============================================================================

const SHARED_HOW_TO_USE = [
  {
    step: 1,
    title: 'Install Tekton Design System',
    titleKo: 'Tekton 디자인 시스템 설치',
    description: 'Install the Tekton UI package using pnpm in your project.',
    descriptionKo: '프로젝트에 pnpm을 사용하여 Tekton UI 패키지를 설치합니다.',
    code: 'pnpm add @tekton-ui/ui @tekton-ui/tokens',
  },
  {
    step: 2,
    title: 'Configure Theme Tokens',
    titleKo: '테마 토큰 설정',
    description: 'Import and apply the theme tokens in your application root or layout file.',
    descriptionKo: '애플리케이션 루트 또는 레이아웃 파일에서 테마 토큰을 가져와 적용합니다.',
    code: 'import "@tekton-ui/tokens/themes/[theme-id].css";\n// Replace [theme-id] with: square-minimalism, neutral-humanism, etc.',
  },
  {
    step: 3,
    title: 'Import Components',
    titleKo: '컴포넌트 가져오기',
    description: 'Import and use Tekton components in your React application.',
    descriptionKo: 'React 애플리케이션에서 Tekton 컴포넌트를 가져와 사용합니다.',
    code: 'import { Button, Card, Input } from "@tekton-ui/ui";\n\nexport default function App() {\n  return <Button>Get Started</Button>;\n}',
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
    description:
      '정사각형 모서리와 높은 대비를 특징으로 하는 미니멀리즘 디자인 시스템입니다. 명확한 계층 구조와 깔끔한 타이포그래피로 전문적인 웹 애플리케이션을 빠르게 구축할 수 있습니다.',
    price: 49,
    screenshots: [
      getScreenshotUrl('square-minimalism', 'hero.png'),
      getScreenshotUrl('square-minimalism', 'dashboard.png'),
      getScreenshotUrl('square-minimalism', 'components.png'),
      getScreenshotUrl('square-minimalism', 'auth.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        subtitle: '프로덕션 준비 완료된 React 컴포넌트 라이브러리',
        description:
          'Button, Input, Card, Modal 등 30개의 재사용 가능한 컴포넌트를 제공합니다. TypeScript로 완벽하게 타입이 지정되어 있으며, 접근성 표준을 준수합니다. 각 컴포넌트는 다크 모드를 지원하고 커스터마이징이 가능합니다.',
      },
      {
        icon: '2',
        title: '13개의 사전 정의된 레이아웃',
        subtitle: '자주 사용하는 페이지 레이아웃으로 빠른 시작',
        description:
          'Landing, Dashboard, Auth, Profile 등 13개의 완성된 페이지 레이아웃을 제공합니다. 반응형 디자인이 적용되어 있으며, 모바일부터 데스크톱까지 완벽하게 대응합니다. 복사-붙여넣기만으로 바로 사용 가능합니다.',
      },
      {
        icon: '3',
        title: 'MCP 서버 통합',
        subtitle: 'Claude Code에서 자연어로 UI 생성',
        description:
          'Tekton MCP 서버와 통합되어 Claude Code에서 자연어 프롬프트만으로 이 테마를 사용한 UI를 생성할 수 있습니다. "Square Minimalism 테마로 대시보드를 만들어줘"라고 요청하면 즉시 코드가 생성됩니다.',
      },
      {
        icon: '4',
        title: '디자인 토큰 시스템',
        subtitle: 'CSS 변수 기반의 일관된 스타일링',
        description:
          '색상, 간격, 타이포그래피가 모두 CSS 변수로 정의되어 있습니다. 브랜드 컬러를 변경하면 전체 테마가 자동으로 업데이트됩니다. 다크 모드 전환도 변수만 변경하면 됩니다.',
      },
      {
        icon: '5',
        title: '테마별 아이콘 매칭',
        subtitle: 'Lucide React 아이콘이 자동으로 테마에 맞춰짐',
        description:
          '500개 이상의 Lucide React 아이콘이 테마의 디자인 언어에 맞게 최적화되어 있습니다. 아이콘 크기, 스트로크, 컬러가 테마와 완벽하게 조화를 이룹니다.',
      },
      {
        icon: '6',
        title: '반응형 레이아웃 토큰',
        subtitle: '모바일부터 데스크톱까지 자동 대응',
        description:
          'Tailwind CSS의 반응형 유틸리티와 통합된 레이아웃 토큰을 제공합니다. MCP 서버에 "모바일에서는 1열, 태블릿에서는 2열"이라고 요청하면 자동으로 구현됩니다.',
      },
    ],
    recommendedFor: [
      {
        title: 'SaaS 대시보드 및 관리 패널',
        description:
          '명확한 계층 구조와 높은 대비로 데이터를 효과적으로 표시합니다. 차트와 테이블이 돋보이며, 액션 버튼이 분명하게 구분됩니다.',
      },
      {
        title: '전문적인 B2B 웹 애플리케이션',
        description:
          '신뢰감을 주는 미니멀한 디자인으로 비즈니스 사용자에게 적합합니다. 불필요한 장식 없이 기능에 집중할 수 있습니다.',
      },
      {
        title: '빠른 프로토타이핑',
        description:
          '최소한의 스타일로 구성되어 있어 빠르게 아이디어를 검증할 수 있습니다. 디자인 결정에 시간을 낭비하지 않고 기능 개발에 집중할 수 있습니다.',
      },
      {
        title: '접근성 중심 프로젝트',
        description:
          '높은 색상 대비(AAA 등급)로 시각 장애가 있는 사용자도 쉽게 사용할 수 있습니다. 키보드 네비게이션과 스크린 리더를 완벽하게 지원합니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'generate-blueprint 툴 사용',
        description:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: square-minimalism, layout: sidebar-left, components: Card, Button, Input"',
      },
      {
        step: 6,
        title: '미리보기 및 코드 내보내기',
        description:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'equinox-fitness': {
    id: 'equinox-fitness',
    name: 'Equinox Fitness',
    tagline: 'Energetic, bold fitness & wellness design',
    description:
      '에너지 넘치는 컬러와 대담한 타이포그래피로 피트니스 및 웰니스 브랜드를 위한 디자인 시스템입니다.',
    price: 49,
    screenshots: [
      getScreenshotUrl('equinox-fitness', 'hero.png'),
      getScreenshotUrl('equinox-fitness', 'workouts.png'),
      getScreenshotUrl('equinox-fitness', 'profile.png'),
      getScreenshotUrl('equinox-fitness', 'plans.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        subtitle: '에너지 넘치는 피트니스 전용 컴포넌트',
        description:
          '운동 카드, 진행률 바, 칼로리 트래커 등 피트니스 앱에 최적화된 30개의 컴포넌트를 제공합니다. 모든 컴포넌트는 대담한 컬러와 모션 효과로 사용자의 동기를 부여합니다.',
      },
      {
        icon: '2',
        title: '13개의 사전 정의된 레이아웃',
        subtitle: '피트니스 앱 필수 화면 구성',
        description:
          'Workout Dashboard, Progress Tracking, Meal Plans, Profile 등 피트니스 앱에 필요한 13개의 레이아웃을 제공합니다. 각 레이아웃은 사용자 참여를 극대화하도록 설계되었습니다.',
      },
      {
        icon: '3',
        title: 'MCP 서버 통합',
        subtitle: 'AI로 운동 UI를 즉시 생성',
        description:
          '"Equinox 테마로 운동 진행률 대시보드 만들어줘"라고 Claude Code에 요청하면, 칼로리 소모량, 운동 시간, 목표 달성률을 표시하는 UI가 자동으로 생성됩니다.',
      },
      {
        icon: '4',
        title: '에너지 넘치는 컬러 시스템',
        subtitle: '동기를 부여하는 비비드 컬러 팔레트',
        description:
          '오렌지, 그린, 블루 등 에너지가 느껴지는 컬러 팔레트가 CSS 변수로 정의되어 있습니다. 브랜드 컬러를 변경하면 전체 테마가 자동으로 업데이트됩니다.',
      },
      {
        icon: '5',
        title: '모션 효과 라이브러리',
        subtitle: '동적인 애니메이션으로 사용자 참여 증대',
        description:
          'Framer Motion 기반의 애니메이션 프리셋이 포함되어 있습니다. 버튼 클릭, 카드 호버, 페이지 전환에 역동적인 모션이 적용됩니다.',
      },
      {
        icon: '6',
        title: '데이터 시각화 컴포넌트',
        subtitle: '진행률과 통계를 한눈에',
        description:
          '칼로리 소모 그래프, 운동 시간 차트, 목표 달성률 프로그레스 바 등 데이터 시각화 컴포넌트가 포함되어 있습니다. Chart.js와 완벽하게 통합됩니다.',
      },
    ],
    recommendedFor: [
      {
        title: '피트니스 및 헬스케어 앱',
        description:
          '운동 추적, 칼로리 관리, 건강 데이터 시각화에 최적화되어 있습니다. 사용자가 목표를 달성하도록 동기를 부여하는 디자인입니다.',
      },
      {
        title: '스포츠 이벤트 및 커뮤니티',
        description:
          '마라톤, 사이클링, 크로스핏 등 스포츠 커뮤니티 플랫폼에 적합합니다. 에너지 넘치는 디자인이 팀 정신을 고취시킵니다.',
      },
      {
        title: '웰니스 및 라이프스타일 서비스',
        description:
          '명상, 요가, 영양 관리 등 전반적인 웰빙 서비스에 사용할 수 있습니다. 긍정적이고 활기찬 분위기를 연출합니다.',
      },
      {
        title: '에너지 넘치는 브랜드',
        description:
          '역동적이고 활기찬 브랜드 이미지를 구축하고 싶은 경우에 적합합니다. 젊은 타겟층에게 강한 인상을 남깁니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'generate-blueprint 툴 사용',
        description:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: equinox-fitness, layout: dashboard, components: Card, Progress, Chart"',
      },
      {
        step: 6,
        title: '미리보기 및 코드 내보내기',
        description:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'round-minimal': {
    id: 'round-minimal',
    name: 'Round Minimal',
    tagline: 'Soft, rounded, gentle user experience',
    description:
      '부드러운 모서리와 온화한 컬러로 친근한 사용자 경험을 제공하는 미니멀 디자인 시스템입니다.',
    price: 49,
    screenshots: [
      getScreenshotUrl('round-minimal', 'hero.png'),
      getScreenshotUrl('round-minimal', 'features.png'),
      getScreenshotUrl('round-minimal', 'auth.png'),
      getScreenshotUrl('round-minimal', 'dashboard.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        subtitle: '부드러운 느낌의 라운드 컴포넌트',
        description:
          'rounded-xl, rounded-2xl 등 부드러운 모서리가 적용된 30개의 컴포넌트를 제공합니다. 친근하고 편안한 느낌을 주어 소비자 앱에 최적화되어 있습니다.',
      },
      {
        icon: '2',
        title: '13개의 사전 정의된 레이아웃',
        subtitle: '사용자 친화적인 화면 구성',
        description:
          'Social Feed, User Profile, Community, Chat 등 소비자 대상 앱에 필요한 13개의 레이아웃을 제공합니다. 직관적이고 접근하기 쉬운 디자인입니다.',
      },
      {
        icon: '3',
        title: 'MCP 서버 통합',
        subtitle: '친근한 UI를 자연어로 생성',
        description:
          '"Round Minimal 테마로 프로필 페이지 만들어줘"라고 요청하면, 아바타, 자기소개, 팔로우 버튼이 포함된 친근한 프로필 UI가 생성됩니다.',
      },
      {
        icon: '4',
        title: '온화한 컬러 팔레트',
        subtitle: '편안함을 주는 파스텔 톤',
        description:
          '파스텔 블루, 소프트 핑크 등 눈에 부담이 없는 온화한 컬러가 CSS 변수로 정의되어 있습니다. 장시간 사용해도 피로감이 적습니다.',
      },
      {
        icon: '5',
        title: '부드러운 쉐도우 시스템',
        subtitle: '깊이감을 주는 섬세한 그림자',
        description:
          '여러 레이어의 부드러운 그림자가 컴포넌트에 자연스러운 깊이감을 부여합니다. elevation-sm, elevation-md, elevation-lg 토큰으로 일관성있게 적용됩니다.',
      },
      {
        icon: '6',
        title: '터치 친화적 인터랙션',
        subtitle: '모바일 최적화 타겟 영역',
        description:
          '모든 인터랙티브 요소는 최소 44x44px 터치 타겟을 보장합니다. 손가락으로 쉽게 탭할 수 있도록 간격이 충분히 확보되어 있습니다.',
      },
    ],
    recommendedFor: [
      {
        title: '소비자 대상 모바일 앱',
        description:
          '부드러운 디자인이 사용자에게 친근하고 편안한 느낌을 줍니다. 소셜, 쇼핑, 라이프스타일 앱에 최적화되어 있습니다.',
      },
      {
        title: '친근한 브랜드 아이덴티티',
        description:
          '접근하기 쉽고 따뜻한 브랜드 이미지를 구축할 수 있습니다. 젊은 여성 타겟층이나 가족 대상 서비스에 적합합니다.',
      },
      {
        title: '커뮤니티 및 소셜 플랫폼',
        description:
          '사용자 간의 상호작용과 공유를 장려하는 디자인입니다. 댓글, 좋아요, 공유 등 소셜 기능이 자연스럽게 어우러집니다.',
      },
      {
        title: '부드러운 UX가 필요한 서비스',
        description:
          '명상, 수면, 육아 등 편안함과 안정감이 중요한 서비스에 적합합니다. 사용자가 긴장을 풀고 서비스를 즐길 수 있도록 돕습니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'generate-blueprint 툴 사용',
        description:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: round-minimal, layout: centered, components: Card, Avatar, Button"',
      },
      {
        step: 6,
        title: '미리보기 및 코드 내보내기',
        description:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'classic-magazine': {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    tagline: 'Editorial, content-rich, timeless typography',
    description:
      '클래식한 잡지 레이아웃과 우아한 타이포그래피로 콘텐츠 중심의 웹사이트를 위한 디자인 시스템입니다. 가독성과 편집 디자인의 전통을 계승합니다.',
    price: 49,
    screenshots: [
      getScreenshotUrl('classic-magazine', 'hero.png'),
      getScreenshotUrl('classic-magazine', 'articles.png'),
      getScreenshotUrl('classic-magazine', 'detail.png'),
      getScreenshotUrl('classic-magazine', 'sidebar.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        subtitle: '편집 디자인에 최적화된 컴포넌트',
        description:
          'Article Card, Byline, Pull Quote, Drop Cap 등 콘텐츠 퍼블리싱에 특화된 30개의 컴포넌트를 제공합니다. 전통적인 잡지 레이아웃을 웹에서 구현합니다.',
      },
      {
        icon: '2',
        title: '13개의 사전 정의된 레이아웃',
        subtitle: '잡지 편집 스타일의 레이아웃',
        description:
          'Homepage Grid, Article Detail, Category Page, Author Profile 등 콘텐츠 사이트에 필요한 13개의 레이아웃을 제공합니다. 그리드 시스템이 정교하게 설계되어 있습니다.',
      },
      {
        icon: '3',
        title: 'MCP 서버 통합',
        subtitle: '아티클 레이아웃을 자동 생성',
        description:
          '"Classic Magazine 테마로 블로그 포스트 만들어줘"라고 요청하면, 헤드라인, 리드 문단, 본문, 사이드바가 포함된 전통적인 아티클 레이아웃이 생성됩니다.',
      },
      {
        icon: '4',
        title: '우아한 타이포그래피',
        subtitle: 'Serif + Sans 조합의 가독성 극대화',
        description:
          'Merriweather Serif 헤드라인과 Inter Sans 본문의 조합으로 가독성을 극대화합니다. 행간, 자간, 문단 간격이 최적화되어 장시간 독서에 적합합니다.',
      },
      {
        icon: '5',
        title: '다단 레이아웃 시스템',
        subtitle: '그리드 기반의 유연한 컬럼',
        description:
          '12컬럼 그리드 시스템으로 복잡한 레이아웃을 구현할 수 있습니다. 2단, 3단, 4단 등 다양한 컬럼 배치를 지원하며, 반응형으로 자동 조정됩니다.',
      },
      {
        icon: '6',
        title: '콘텐츠 계층 구조',
        subtitle: '명확한 정보 아키텍처',
        description:
          '카테고리, 태그, 날짜, 저자 등 메타데이터가 명확하게 구분됩니다. 사용자가 콘텐츠를 탐색하고 관련 아티클을 발견하기 쉽도록 설계되었습니다.',
      },
    ],
    recommendedFor: [
      {
        title: '블로그 및 콘텐츠 퍼블리싱 플랫폼',
        description:
          '장문의 아티클을 읽기 편하게 표시합니다. 타이포그래피와 행간이 최적화되어 있어 몰입도 높은 독서 경험을 제공합니다.',
      },
      {
        title: '뉴스 및 미디어 웹사이트',
        description:
          '뉴스 기사, 인터뷰, 리포트 등 다양한 콘텐츠 형식을 효과적으로 표현합니다. 전통적인 뉴스 레이아웃을 현대적으로 재해석했습니다.',
      },
      {
        title: '롱폼 콘텐츠 및 아티클 사이트',
        description:
          '에세이, 리뷰, 가이드 등 깊이 있는 콘텐츠에 적합합니다. 사용자가 끝까지 읽도록 유도하는 타이포그래피와 레이아웃입니다.',
      },
      {
        title: '전통적인 편집 디자인 프로젝트',
        description:
          '문학지, 학술지, 기업 매거진 등 권위 있고 신뢰감 있는 디자인이 필요한 경우에 적합합니다. 클래식한 미학을 중시하는 프로젝트에 이상적입니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'generate-blueprint 툴 사용',
        description:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: classic-magazine, layout: article, components: Heading, Paragraph, Image"',
      },
      {
        step: 6,
        title: '미리보기 및 코드 내보내기',
        description:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'neutral-humanism': {
    id: 'neutral-humanism',
    name: 'Neutral Humanism',
    tagline: 'Human-centered, approachable, balanced design',
    description:
      '사람 중심의 따뜻한 디자인과 중립적인 컬러 팔레트로 접근성과 가독성을 우선하는 디자인 시스템입니다. 모든 사용자에게 편안한 경험을 제공합니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('neutral-humanism', 'hero.png'),
      getScreenshotUrl('neutral-humanism', 'features.png'),
      getScreenshotUrl('neutral-humanism', 'form.png'),
      getScreenshotUrl('neutral-humanism', 'cards.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        subtitle: '접근성 우선 휴먼 중심 컴포넌트',
        description:
          'WCAG AAA 등급을 만족하는 30개의 컴포넌트를 제공합니다. 모든 연령층과 능력을 가진 사용자가 쉽게 사용할 수 있도록 설계되었습니다.',
      },
      {
        icon: '2',
        title: '13개의 사전 정의된 레이아웃',
        subtitle: '직관적이고 명확한 정보 구조',
        description:
          'Healthcare Dashboard, Education Portal, Government Forms 등 신뢰성이 중요한 분야의 13개 레이아웃을 제공합니다. 복잡한 정보를 명확하게 전달합니다.',
      },
      {
        icon: '3',
        title: 'MCP 서버 통합',
        subtitle: '접근 가능한 UI를 자동 생성',
        description:
          '"Neutral Humanism 테마로 환자 정보 폼 만들어줘"라고 요청하면, 명확한 라벨, 에러 메시지, 도움말이 포함된 접근 가능한 폼이 생성됩니다.',
      },
      {
        icon: '4',
        title: '중립적인 컬러 시스템',
        subtitle: '보편적인 회색조 팔레트',
        description:
          '그레이스케일을 기반으로 한 중립적인 컬러 시스템을 사용합니다. 문화적 편향이 없고 모든 사용자에게 공평한 경험을 제공합니다.',
      },
      {
        icon: '5',
        title: '명확한 포커스 인디케이터',
        subtitle: '키보드 네비게이션 최적화',
        description:
          '모든 인터랙티브 요소에 뚜렷한 포커스 링이 표시됩니다. 키보드만으로 전체 사이트를 탐색할 수 있으며, 탭 순서가 논리적으로 구성되어 있습니다.',
      },
      {
        icon: '6',
        title: '다국어 및 RTL 지원',
        subtitle: '글로벌 사용자를 위한 설계',
        description:
          '아랍어, 히브리어 등 RTL(Right-to-Left) 언어를 지원합니다. 다양한 문자 체계에서도 가독성이 유지되도록 타이포그래피가 최적화되어 있습니다.',
      },
    ],
    recommendedFor: [
      {
        title: '헬스케어 및 의료 서비스',
        description:
          '환자의 건강 정보를 안전하고 명확하게 표시합니다. 의료 전문가와 환자 모두가 쉽게 이해할 수 있는 디자인입니다.',
      },
      {
        title: '교육 및 학습 플랫폼',
        description:
          '학생과 교사가 집중할 수 있는 방해 요소 없는 디자인입니다. 콘텐츠 가독성이 최우선이며, 다양한 학습 스타일을 지원합니다.',
      },
      {
        title: '정부 및 공공기관 웹사이트',
        description:
          '모든 시민이 공평하게 접근할 수 있는 디자인입니다. 법적 접근성 요구사항을 충족하며, 신뢰감을 줍니다.',
      },
      {
        title: '접근성이 최우선인 프로젝트',
        description:
          'WCAG AAA 등급을 목표로 하는 프로젝트에 적합합니다. 시각, 청각, 운동 능력 장애가 있는 사용자를 모두 고려한 디자인입니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'generate-blueprint 툴 사용',
        description:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: neutral-humanism, layout: form, components: Input, Label, Button"',
      },
      {
        step: 6,
        title: '미리보기 및 코드 내보내기',
        description:
          '생성된 previewUrl에서 결과를 확인한 후, export-screen 툴로 TSX 코드를 프로젝트에 내보냅니다.',
      },
    ],
  },

  'minimal-workspace': {
    id: 'minimal-workspace',
    name: 'Minimal Workspace',
    tagline: 'Productivity-focused, distraction-free, efficient',
    description:
      '생산성과 집중력을 극대화하는 미니멀 워크스페이스 디자인 시스템입니다. 불필요한 요소를 제거하고 사용자가 작업에만 몰입할 수 있도록 설계되었습니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('minimal-workspace', 'workspace.png'),
      getScreenshotUrl('minimal-workspace', 'sidebar.png'),
      getScreenshotUrl('minimal-workspace', 'editor.png'),
      getScreenshotUrl('minimal-workspace', 'settings.png'),
    ],
    features: [
      {
        icon: '1',
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        subtitle: '생산성 도구에 최적화된 컴포넌트',
        description:
          'Editor, Sidebar, Command Palette, Toolbar 등 생산성 앱에 필요한 30개의 컴포넌트를 제공합니다. 모든 컴포넌트는 효율성과 속도에 최적화되어 있습니다.',
      },
      {
        icon: '2',
        title: '13개의 사전 정의된 레이아웃',
        subtitle: '작업 집중도를 높이는 레이아웃',
        description:
          'Code Editor, Note Taking, Task Management, Project Dashboard 등 생산성 앱의 13개 레이아웃을 제공합니다. 좌측 사이드바와 넓은 작업 영역이 특징입니다.',
      },
      {
        icon: '3',
        title: 'MCP 서버 통합',
        subtitle: '워크스페이스 UI를 즉시 구축',
        description:
          '"Minimal Workspace 테마로 코드 에디터 만들어줘"라고 요청하면, 사이드바, 에디터 영역, 상태바가 포함된 IDE 스타일 레이아웃이 생성됩니다.',
      },
      {
        icon: '4',
        title: '방해 요소 제거 디자인',
        subtitle: '집중을 위한 미니멀 인터페이스',
        description:
          '불필요한 장식, 애니메이션, 컬러를 배제했습니다. 사용자가 콘텐츠와 작업에만 집중할 수 있도록 인터페이스는 배경으로 물러납니다.',
      },
      {
        icon: '5',
        title: '키보드 우선 워크플로우',
        subtitle: '단축키로 모든 기능 접근',
        description:
          '모든 기능을 키보드 단축키로 실행할 수 있습니다. Command Palette (Cmd+K)로 검색하여 빠르게 액션을 실행할 수 있습니다.',
      },
      {
        icon: '6',
        title: '다크 모드 우선 디자인',
        subtitle: '장시간 작업에 적합한 다크 테마',
        description:
          '다크 모드를 기본으로 설계되어 눈의 피로를 최소화합니다. 코드 에디터, 터미널 등 개발자 도구와 자연스럽게 어우러집니다.',
      },
    ],
    recommendedFor: [
      {
        title: '프로젝트 관리 및 협업 툴',
        description:
          '태스크, 프로젝트, 팀원을 효율적으로 관리할 수 있습니다. Notion, Linear, Asana 스타일의 생산성 도구에 적합합니다.',
      },
      {
        title: '노트 앱 및 지식 관리 시스템',
        description:
          '글쓰기와 사고 정리에 집중할 수 있는 방해 없는 인터페이스입니다. Obsidian, Roam Research 스타일의 앱에 이상적입니다.',
      },
      {
        title: '코드 에디터 및 개발 도구',
        description:
          'VS Code, Sublime Text 스타일의 개발 환경을 구축할 수 있습니다. 사이드바, 에디터, 터미널 레이아웃이 최적화되어 있습니다.',
      },
      {
        title: '생산성과 집중이 중요한 작업 환경',
        description:
          '파워 유저와 전문가를 위한 도구입니다. 효율성을 극대화하고 불필요한 클릭을 줄이는 것이 목표인 프로젝트에 적합합니다.',
      },
    ],
    howToUse: [
      ...SHARED_HOW_TO_USE,
      {
        step: 5,
        title: 'generate-blueprint 툴 사용',
        description:
          'Claude Code에서 다음과 같이 요청하세요: "Use generate-blueprint tool with themeId: minimal-workspace, layout: sidebar-left, components: Editor, Sidebar, Toolbar"',
      },
      {
        step: 6,
        title: '미리보기 및 코드 내보내기',
        description:
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
