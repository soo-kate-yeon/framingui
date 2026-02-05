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
  description: string;
  price: number;
  screenshots: string[];
  features: {
    title: string;
    description: string;
  }[];
  recommendedFor: string[];
  howToUse: {
    step: number;
    title: string;
    description: string;
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
// Template Data
// ============================================================================

export const TEMPLATES: Record<string, TemplateData> = {
  'square-minimalism': {
    id: 'square-minimalism',
    name: 'Square Minimalism',
    tagline: 'Bold, geometric, high-contrast design system',
    description: '정사각형 모서리와 높은 대비를 특징으로 하는 미니멀리즘 디자인 시스템입니다. 명확한 계층 구조와 깔끔한 타이포그래피로 전문적인 웹 애플리케이션을 빠르게 구축할 수 있습니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('square-minimalism', 'hero.png'),
      getScreenshotUrl('square-minimalism', 'dashboard.png'),
      getScreenshotUrl('square-minimalism', 'components.png'),
      getScreenshotUrl('square-minimalism', 'auth.png'),
    ],
    features: [
      {
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        description: 'Button, Input, Card, Modal 등 즉시 사용 가능한 React 컴포넌트 라이브러리',
      },
      {
        title: '13개의 사전 정의된 레이아웃 템플릿',
        description: 'Landing, Dashboard, Auth, Profile 등 자주 사용되는 페이지 레이아웃',
      },
      {
        title: 'IDE & CLI에서 바로 사용 가능한 MCP Integration',
        description: 'Claude Code, VS Code에서 즉시 테마와 컴포넌트를 불러와 사용',
      },
      {
        title: 'MCP 툴 - 내장 테마 디자인 토큰',
        description: 'CSS 변수와 디자인 토큰을 자동으로 import하여 일관된 스타일 유지',
      },
      {
        title: 'MCP 툴 - 테마에 맞는 아이콘 라이브러리',
        description: 'Lucide React 아이콘이 테마 컬러와 자동 매칭',
      },
      {
        title: 'MCP 툴 - 반응형 레이아웃 토큰',
        description: '간단한 프롬프트만으로 반응형 디자인을 자동 생성',
      },
    ],
    recommendedFor: [
      'SaaS 대시보드 및 관리 패널',
      '전문적인 B2B 웹 애플리케이션',
      '최소한의 디자인으로 빠른 프로토타이핑',
      'High contrast가 필요한 접근성 중심 프로젝트',
    ],
    howToUse: [
      {
        step: 1,
        title: 'Purchase',
        description: '원하는 라이선스 티어를 선택하고 구매합니다.',
      },
      {
        step: 2,
        title: 'Install npm',
        description: 'npm 패키지를 설치합니다.',
        code: 'npm install @studio-templates/square-minimalism',
      },
      {
        step: 3,
        title: 'Auth Login',
        description: 'Studio CLI로 인증합니다.',
        code: 'npx studio-cli login',
      },
      {
        step: 4,
        title: 'Theme Activation',
        description: 'MCP 서버에 테마를 활성화합니다.',
        code: 'npx studio-cli activate square-minimalism',
      },
      {
        step: 5,
        title: 'Start Designing',
        description: 'Claude Code 또는 IDE에서 테마를 불러와 원하는 UI를 디자인합니다.',
      },
    ],
  },

  'equinox-fitness': {
    id: 'equinox-fitness',
    name: 'Equinox Fitness',
    tagline: 'Energetic, bold fitness & wellness design',
    description: '에너지 넘치는 컬러와 대담한 타이포그래피로 피트니스 및 웰니스 브랜드를 위한 디자인 시스템입니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('equinox-fitness', 'hero.png'),
      getScreenshotUrl('equinox-fitness', 'workouts.png'),
      getScreenshotUrl('equinox-fitness', 'profile.png'),
      getScreenshotUrl('equinox-fitness', 'plans.png'),
    ],
    features: [
      {
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        description: 'Button, Input, Card, Modal 등 즉시 사용 가능한 React 컴포넌트 라이브러리',
      },
      {
        title: '13개의 사전 정의된 레이아웃 템플릿',
        description: 'Landing, Dashboard, Auth, Profile 등 자주 사용되는 페이지 레이아웃',
      },
      {
        title: 'IDE & CLI에서 바로 사용 가능한 MCP Integration',
        description: 'Claude Code, VS Code에서 즉시 테마와 컴포넌트를 불러와 사용',
      },
      {
        title: 'MCP 툴 - 내장 테마 디자인 토큰',
        description: 'CSS 변수와 디자인 토큰을 자동으로 import하여 일관된 스타일 유지',
      },
      {
        title: 'MCP 툴 - 테마에 맞는 아이콘 라이브러리',
        description: 'Lucide React 아이콘이 테마 컬러와 자동 매칭',
      },
      {
        title: 'MCP 툴 - 반응형 레이아웃 토큰',
        description: '간단한 프롬프트만으로 반응형 디자인을 자동 생성',
      },
    ],
    recommendedFor: [
      '피트니스 및 헬스케어 앱',
      '스포츠 이벤트 및 커뮤니티 플랫폼',
      '웰니스 및 라이프스타일 서비스',
      '에너지 넘치는 브랜드 아이덴티티',
    ],
    howToUse: [
      {
        step: 1,
        title: 'Purchase',
        description: '원하는 라이선스 티어를 선택하고 구매합니다.',
      },
      {
        step: 2,
        title: 'Install npm',
        description: 'npm 패키지를 설치합니다.',
        code: 'npm install @studio-templates/equinox-fitness',
      },
      {
        step: 3,
        title: 'Auth Login',
        description: 'Studio CLI로 인증합니다.',
        code: 'npx studio-cli login',
      },
      {
        step: 4,
        title: 'Theme Activation',
        description: 'MCP 서버에 테마를 활성화합니다.',
        code: 'npx studio-cli activate equinox-fitness',
      },
      {
        step: 5,
        title: 'Start Designing',
        description: 'Claude Code 또는 IDE에서 테마를 불러와 원하는 UI를 디자인합니다.',
      },
    ],
  },

  'round-minimal': {
    id: 'round-minimal',
    name: 'Round Minimal',
    tagline: 'Soft, rounded, gentle user experience',
    description: '부드러운 모서리와 온화한 컬러로 친근한 사용자 경험을 제공하는 미니멀 디자인 시스템입니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('round-minimal', 'hero.png'),
      getScreenshotUrl('round-minimal', 'features.png'),
      getScreenshotUrl('round-minimal', 'auth.png'),
      getScreenshotUrl('round-minimal', 'dashboard.png'),
    ],
    features: [
      {
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        description: 'Button, Input, Card, Modal 등 즉시 사용 가능한 React 컴포넌트 라이브러리',
      },
      {
        title: '13개의 사전 정의된 레이아웃 템플릿',
        description: 'Landing, Dashboard, Auth, Profile 등 자주 사용되는 페이지 레이아웃',
      },
      {
        title: 'IDE & CLI에서 바로 사용 가능한 MCP Integration',
        description: 'Claude Code, VS Code에서 즉시 테마와 컴포넌트를 불러와 사용',
      },
      {
        title: 'MCP 툴 - 내장 테마 디자인 토큰',
        description: 'CSS 변수와 디자인 토큰을 자동으로 import하여 일관된 스타일 유지',
      },
      {
        title: 'MCP 툴 - 테마에 맞는 아이콘 라이브러리',
        description: 'Lucide React 아이콘이 테마 컬러와 자동 매칭',
      },
      {
        title: 'MCP 툴 - 반응형 레이아웃 토큰',
        description: '간단한 프롬프트만으로 반응형 디자인을 자동 생성',
      },
    ],
    recommendedFor: [
      '소비자 대상 모바일 앱',
      '친근한 브랜드 아이덴티티',
      '커뮤니티 및 소셜 플랫폼',
      '부드러운 UX가 필요한 서비스',
    ],
    howToUse: [
      {
        step: 1,
        title: 'Purchase',
        description: '원하는 라이선스 티어를 선택하고 구매합니다.',
      },
      {
        step: 2,
        title: 'Install npm',
        description: 'npm 패키지를 설치합니다.',
        code: 'npm install @studio-templates/round-minimal',
      },
      {
        step: 3,
        title: 'Auth Login',
        description: 'Studio CLI로 인증합니다.',
        code: 'npx studio-cli login',
      },
      {
        step: 4,
        title: 'Theme Activation',
        description: 'MCP 서버에 테마를 활성화합니다.',
        code: 'npx studio-cli activate round-minimal',
      },
      {
        step: 5,
        title: 'Start Designing',
        description: 'Claude Code 또는 IDE에서 테마를 불러와 원하는 UI를 디자인합니다.',
      },
    ],
  },

  'classic-magazine': {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    tagline: 'Editorial, content-rich, timeless typography',
    description: '클래식한 잡지 레이아웃과 우아한 타이포그래피로 콘텐츠 중심의 웹사이트를 위한 디자인 시스템입니다. 가독성과 편집 디자인의 전통을 계승합니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('classic-magazine', 'hero.png'),
      getScreenshotUrl('classic-magazine', 'articles.png'),
      getScreenshotUrl('classic-magazine', 'detail.png'),
      getScreenshotUrl('classic-magazine', 'sidebar.png'),
    ],
    features: [
      {
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        description: 'Button, Input, Card, Modal 등 즉시 사용 가능한 React 컴포넌트 라이브러리',
      },
      {
        title: '13개의 사전 정의된 레이아웃 템플릿',
        description: 'Landing, Dashboard, Auth, Profile 등 자주 사용되는 페이지 레이아웃',
      },
      {
        title: 'IDE & CLI에서 바로 사용 가능한 MCP Integration',
        description: 'Claude Code, VS Code에서 즉시 테마와 컴포넌트를 불러와 사용',
      },
      {
        title: 'MCP 툴 - 내장 테마 디자인 토큰',
        description: 'CSS 변수와 디자인 토큰을 자동으로 import하여 일관된 스타일 유지',
      },
      {
        title: 'MCP 툴 - 테마에 맞는 아이콘 라이브러리',
        description: 'Lucide React 아이콘이 테마 컬러와 자동 매칭',
      },
      {
        title: 'MCP 툴 - 반응형 레이아웃 토큰',
        description: '간단한 프롬프트만으로 반응형 디자인을 자동 생성',
      },
    ],
    recommendedFor: [
      '블로그 및 콘텐츠 퍼블리싱 플랫폼',
      '뉴스 및 미디어 웹사이트',
      '롱폼 콘텐츠 및 아티클 사이트',
      '전통적인 편집 디자인이 필요한 프로젝트',
    ],
    howToUse: [
      {
        step: 1,
        title: 'Purchase',
        description: '원하는 라이선스 티어를 선택하고 구매합니다.',
      },
      {
        step: 2,
        title: 'Install npm',
        description: 'npm 패키지를 설치합니다.',
        code: 'npm install @studio-templates/classic-magazine',
      },
      {
        step: 3,
        title: 'Auth Login',
        description: 'Studio CLI로 인증합니다.',
        code: 'npx studio-cli login',
      },
      {
        step: 4,
        title: 'Theme Activation',
        description: 'MCP 서버에 테마를 활성화합니다.',
        code: 'npx studio-cli activate classic-magazine',
      },
      {
        step: 5,
        title: 'Start Designing',
        description: 'Claude Code 또는 IDE에서 테마를 불러와 원하는 UI를 디자인합니다.',
      },
    ],
  },

  'neutral-humanism': {
    id: 'neutral-humanism',
    name: 'Neutral Humanism',
    tagline: 'Human-centered, approachable, balanced design',
    description: '사람 중심의 따뜻한 디자인과 중립적인 컬러 팔레트로 접근성과 가독성을 우선하는 디자인 시스템입니다. 모든 사용자에게 편안한 경험을 제공합니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('neutral-humanism', 'hero.png'),
      getScreenshotUrl('neutral-humanism', 'features.png'),
      getScreenshotUrl('neutral-humanism', 'form.png'),
      getScreenshotUrl('neutral-humanism', 'cards.png'),
    ],
    features: [
      {
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        description: 'Button, Input, Card, Modal 등 즉시 사용 가능한 React 컴포넌트 라이브러리',
      },
      {
        title: '13개의 사전 정의된 레이아웃 템플릿',
        description: 'Landing, Dashboard, Auth, Profile 등 자주 사용되는 페이지 레이아웃',
      },
      {
        title: 'IDE & CLI에서 바로 사용 가능한 MCP Integration',
        description: 'Claude Code, VS Code에서 즉시 테마와 컴포넌트를 불러와 사용',
      },
      {
        title: 'MCP 툴 - 내장 테마 디자인 토큰',
        description: 'CSS 변수와 디자인 토큰을 자동으로 import하여 일관된 스타일 유지',
      },
      {
        title: 'MCP 툴 - 테마에 맞는 아이콘 라이브러리',
        description: 'Lucide React 아이콘이 테마 컬러와 자동 매칭',
      },
      {
        title: 'MCP 툴 - 반응형 레이아웃 토큰',
        description: '간단한 프롬프트만으로 반응형 디자인을 자동 생성',
      },
    ],
    recommendedFor: [
      '헬스케어 및 의료 서비스',
      '교육 및 학습 플랫폼',
      '정부 및 공공기관 웹사이트',
      '접근성이 최우선인 프로젝트',
    ],
    howToUse: [
      {
        step: 1,
        title: 'Purchase',
        description: '원하는 라이선스 티어를 선택하고 구매합니다.',
      },
      {
        step: 2,
        title: 'Install npm',
        description: 'npm 패키지를 설치합니다.',
        code: 'npm install @studio-templates/neutral-humanism',
      },
      {
        step: 3,
        title: 'Auth Login',
        description: 'Studio CLI로 인증합니다.',
        code: 'npx studio-cli login',
      },
      {
        step: 4,
        title: 'Theme Activation',
        description: 'MCP 서버에 테마를 활성화합니다.',
        code: 'npx studio-cli activate neutral-humanism',
      },
      {
        step: 5,
        title: 'Start Designing',
        description: 'Claude Code 또는 IDE에서 테마를 불러와 원하는 UI를 디자인합니다.',
      },
    ],
  },

  'minimal-workspace': {
    id: 'minimal-workspace',
    name: 'Minimal Workspace',
    tagline: 'Productivity-focused, distraction-free, efficient',
    description: '생산성과 집중력을 극대화하는 미니멀 워크스페이스 디자인 시스템입니다. 불필요한 요소를 제거하고 사용자가 작업에만 몰입할 수 있도록 설계되었습니다.',
    price: 59,
    screenshots: [
      getScreenshotUrl('minimal-workspace', 'workspace.png'),
      getScreenshotUrl('minimal-workspace', 'sidebar.png'),
      getScreenshotUrl('minimal-workspace', 'editor.png'),
      getScreenshotUrl('minimal-workspace', 'settings.png'),
    ],
    features: [
      {
        title: '30개의 Shadcn-UI 기반 컴포넌트',
        description: 'Button, Input, Card, Modal 등 즉시 사용 가능한 React 컴포넌트 라이브러리',
      },
      {
        title: '13개의 사전 정의된 레이아웃 템플릿',
        description: 'Landing, Dashboard, Auth, Profile 등 자주 사용되는 페이지 레이아웃',
      },
      {
        title: 'IDE & CLI에서 바로 사용 가능한 MCP Integration',
        description: 'Claude Code, VS Code에서 즉시 테마와 컴포넌트를 불러와 사용',
      },
      {
        title: 'MCP 툴 - 내장 테마 디자인 토큰',
        description: 'CSS 변수와 디자인 토큰을 자동으로 import하여 일관된 스타일 유지',
      },
      {
        title: 'MCP 툴 - 테마에 맞는 아이콘 라이브러리',
        description: 'Lucide React 아이콘이 테마 컬러와 자동 매칭',
      },
      {
        title: 'MCP 툴 - 반응형 레이아웃 토큰',
        description: '간단한 프롬프트만으로 반응형 디자인을 자동 생성',
      },
    ],
    recommendedFor: [
      '프로젝트 관리 및 협업 툴',
      '노트 앱 및 지식 관리 시스템',
      '코드 에디터 및 개발 도구',
      '생산성과 집중이 중요한 작업 환경',
    ],
    howToUse: [
      {
        step: 1,
        title: 'Purchase',
        description: '원하는 라이선스 티어를 선택하고 구매합니다.',
      },
      {
        step: 2,
        title: 'Install npm',
        description: 'npm 패키지를 설치합니다.',
        code: 'npm install @studio-templates/minimal-workspace',
      },
      {
        step: 3,
        title: 'Auth Login',
        description: 'Studio CLI로 인증합니다.',
        code: 'npx studio-cli login',
      },
      {
        step: 4,
        title: 'Theme Activation',
        description: 'MCP 서버에 테마를 활성화합니다.',
        code: 'npx studio-cli activate minimal-workspace',
      },
      {
        step: 5,
        title: 'Start Designing',
        description: 'Claude Code 또는 IDE에서 테마를 불러와 원하는 UI를 디자인합니다.',
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
