---
id: SPEC-STUDIO-001
version: "1.1.0"
status: draft
created: "2026-02-03"
updated: "2026-02-03"
author: soo-kate-yeon
priority: HIGH
---

## HISTORY

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-02-03 | 1.0.0 | 초안 작성 |
| 2026-02-03 | 1.1.0 | MVP 방향 재정의, Live Demo 강화 |

---

# SPEC-STUDIO-001: Template Landing Page 재구조화

## 개요

Studio Template 랜딩 페이지를 현대적인 SaaS 랜딩 페이지 패턴으로 완전히 재설계합니다. 기존의 편집 중심 인터페이스를 제거하고, **마케팅 및 구매 전환에 최적화된 구조**로 변경합니다.

### MVP 핵심 원칙

```
"백 마디 설명보다 한 번 보여주기"

Live Demo = 최고의 마케팅
```

- ✅ Live Demo를 다양한 유즈케이스로 풍부하게 제작
- ✅ 랜딩페이지에서 Demo → Buy 전환 퍼널 최적화
- ❌ Free Tier 없음 (Live Demo가 체험 역할)
- ❌ 편집 기능 (TokenSelectionPanel 등) 제거

---

## 요구사항 (EARS Format)

### Ubiquitous Requirements (항상 활성)

**[TAG-STUDIO-001-U001]** `/studio/template/[id]` 경로에서 랜딩페이지가 렌더링되어야 한다.

**[TAG-STUDIO-001-U002]** TopNav에 About, How to use, Documentation 앵커 링크가 표시되어야 한다.

**[TAG-STUDIO-001-U003]** i18n이 지원되어야 한다 (영어 기본, 한국어 지원).

**[TAG-STUDIO-001-U004]** 반응형 디자인이 적용되어야 한다 (모바일: < 768px, 태블릿: 768-1024px, 데스크톱: > 1024px).

**[TAG-STUDIO-001-U005]** Global Sidebar와 통합되어야 한다 (Explore 메뉴 유지).

**[TAG-STUDIO-001-U006]** 각 Theme마다 다양한 유즈케이스 Live Demo가 제공되어야 한다.

### Event-Driven Requirements (이벤트 기반)

**[TAG-STUDIO-001-E001]** WHEN [DEMO] 버튼 클릭 THEN Section 2 (Live Demo 갤러리)로 스무스 스크롤한다.

**[TAG-STUDIO-001-E002]** WHEN [BUY] 버튼 클릭 THEN Section 3 (Pricing)로 스무스 스크롤한다.

**[TAG-STUDIO-001-E003]** WHEN Live Demo 카드 클릭 THEN 새 창(target="_blank")으로 해당 Demo 페이지를 연다.

**[TAG-STUDIO-001-E004]** WHEN 코드 블록 복사 버튼 클릭 THEN 클립보드에 코드가 복사되고 성공 피드백을 표시한다.

### State-Driven Requirements (상태 기반)

**[TAG-STUDIO-001-S001]** IF 사용자가 라이선스 보유 상태 THEN "Manage License" 버튼이 표시되어야 한다.

**[TAG-STUDIO-001-S002]** IF 언어 설정이 변경됨 THEN 페이지 콘텐츠가 해당 언어로 전환되어야 한다.

### Unwanted Behaviors (금지 사항)

**[TAG-STUDIO-001-UW001]** `/studio/template/[id]/edit` 경로는 삭제되어야 한다.

**[TAG-STUDIO-001-UW002]** TokenSelectionPanel, DevicePreview, DeviceSwitcher 컴포넌트는 사용하지 않아야 한다.

---

## Live Demo 전략

### 핵심 원칙: "이거 예쁘다 → 사고 싶다"

Live Demo는 단순 프리뷰가 아닌, **실제 사용 시나리오를 보여주는 쇼케이스**입니다.

### Theme별 Live Demo 구성

각 Theme마다 최소 3개 이상의 유즈케이스 Demo를 제공합니다.

```
/studio/square-minimalism/
├── /                    (메인 랜딩)
├── /dashboard           (SaaS 대시보드)
├── /dashboard/settings  (설정 페이지)
├── /dashboard/customers (고객 관리)
└── /docs                (문서 사이트)

/studio/dark-boldness-v2/
├── /                    (피트니스 앱 메인)
├── /dashboard           (운동 대시보드)
├── /dashboard/settings  (설정)
└── /docs                (문서)

/studio/neutral-workspace/
├── /                    (포트폴리오 메인)
├── /blog                (블로그)
├── /contact             (문의)
└── /docs                (문서)

/studio/pebble/
├── /                    (미니멀 앱 메인)
└── /docs                (문서)

/studio/classic-magazine/
├── /                    (매거진 메인)
├── /article             (아티클 페이지)
└── /docs                (문서)

/studio/minimal-workspace/
├── /                    (워크스페이스 메인)
└── /docs                (문서)
```

### Live Demo 갤러리 (Section 2)

랜딩페이지의 Section 2에서 해당 Theme의 모든 Demo를 카드 형태로 보여줍니다.

```
┌─────────────────────────────────────────────────────────────────┐
│  Section 2: Live Demos                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "See what you can build with Square Minimalism"               │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ [Screenshot]│  │ [Screenshot]│  │ [Screenshot]│            │
│  │             │  │             │  │             │            │
│  │  Dashboard  │  │  Settings   │  │  Docs Site  │            │
│  │  SaaS Admin │  │  User Prefs │  │  API Docs   │            │
│  │             │  │             │  │             │            │
│  │ [View Demo] │  │ [View Demo] │  │ [View Demo] │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                             │
│  │ [Screenshot]│  │ [Screenshot]│                             │
│  │             │  │             │                             │
│  │  Landing    │  │  Customers  │                             │
│  │  Marketing  │  │  CRM View   │                             │
│  │             │  │             │                             │
│  │ [View Demo] │  │ [View Demo] │                             │
│  └─────────────┘  └─────────────┘                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 페이지 구조

```
TemplateLandingPage
├── LandingTopNav
│   ├── Logo (→ /studio)
│   ├── NavLinks (About, Live Demos, Pricing)
│   └── CTAButtons (Demo, Buy)
│
├── HeroSection (Section 1: #about)
│   ├── ThemeName & Tagline
│   ├── HeroImage (Theme 대표 스크린샷)
│   ├── CTAButtons (View Demos, Buy Now)
│   └── ComponentOverview (주요 컴포넌트 미리보기)
│
├── LiveDemoSection (Section 2: #demos)
│   ├── SectionTitle ("See what you can build")
│   ├── DemoGrid
│   │   └── DemoCard[] (각 유즈케이스별)
│   │       ├── Screenshot
│   │       ├── Title & Description
│   │       └── ViewDemoButton (새 창)
│   └── MCPGuide (선택적: MCP 설치 안내)
│
└── PricingSection (Section 3: #pricing)
    ├── SectionTitle
    ├── PricingCards (Single $59, Double $99, Creator $149)
    └── FAQ (선택적)
```

---

## 컴포넌트 설계

### 생성할 컴포넌트

| 컴포넌트 | 위치 | 설명 |
|---------|------|------|
| `TemplateLandingPage` | `page.tsx` | 메인 랜딩 페이지 (완전 재작성) |
| `LandingTopNav` | `components/landing/` | 앵커 링크 포함 상단 네비게이션 |
| `HeroSection` | `components/landing/` | Section 1 - 히어로 영역 |
| `ComponentOverview` | `components/landing/` | 컴포넌트 프리뷰 그리드 |
| `LiveDemoSection` | `components/landing/` | Section 2 - Live Demo 갤러리 |
| `DemoCard` | `components/landing/` | 개별 Demo 카드 |
| `PricingSection` | `components/landing/` | Section 3 - 가격 정책 |
| `PricingCard` | `components/landing/` | 가격 카드 컴포넌트 |
| `CodeBlock` | `components/common/` | 복사 버튼 포함 코드 블록 |

### 삭제할 컴포넌트

| 컴포넌트 | 경로 | 삭제 이유 |
|---------|------|----------|
| `TokenSelectionPanel.tsx` | `components/studio/` | 편집 기능 제거 |
| `DevicePreview.tsx` | `components/studio/` | 편집 기능 제거 |
| `DeviceSwitcher.tsx` | `components/studio/` | 편집 기능 제거 |
| `ScreenSelector.tsx` | `components/studio/` | 편집 기능 제거 |
| `ActionButtons.tsx` | `components/studio/` | 편집 기능 제거 |
| `page.tsx` | `/studio/template/[id]/edit/` | 편집 페이지 제거 |

---

## 데이터 구조

### Theme Demo 메타데이터

각 Theme의 Demo 정보를 관리합니다.

```typescript
interface ThemeDemoConfig {
  themeId: string;
  themeName: string;
  tagline: string;
  heroImage: string;
  demos: Demo[];
}

interface Demo {
  id: string;
  title: string;
  description: string;
  category: 'dashboard' | 'landing' | 'docs' | 'app' | 'marketing';
  path: string;  // e.g., "/studio/square-minimalism/dashboard"
  screenshot: string;
  features: string[];
}
```

### Theme Demo 설정 예시

```typescript
const squareMinimalismDemos: ThemeDemoConfig = {
  themeId: 'square-minimalism',
  themeName: 'Square Minimalism',
  tagline: 'Bold. Clean. Memorable.',
  heroImage: '/demos/square-minimalism/hero.png',
  demos: [
    {
      id: 'dashboard',
      title: 'SaaS Dashboard',
      description: 'Complete admin dashboard with analytics, user management, and settings',
      category: 'dashboard',
      path: '/studio/square-minimalism/dashboard',
      screenshot: '/demos/square-minimalism/dashboard.png',
      features: ['Analytics Charts', 'Data Tables', 'User Management']
    },
    {
      id: 'settings',
      title: 'Settings Page',
      description: 'User preferences and account settings',
      category: 'dashboard',
      path: '/studio/square-minimalism/dashboard/settings',
      screenshot: '/demos/square-minimalism/settings.png',
      features: ['Form Controls', 'Toggle Switches', 'Input Fields']
    },
    {
      id: 'docs',
      title: 'Documentation Site',
      description: 'Technical documentation with sidebar navigation',
      category: 'docs',
      path: '/studio/square-minimalism/docs',
      screenshot: '/demos/square-minimalism/docs.png',
      features: ['Sidebar Nav', 'Code Blocks', 'Search']
    }
  ]
};
```

---

## 기술 제약사항

- **프레임워크**: Next.js 15 App Router
- **스타일링**: Tailwind CSS + CSS Variables (Theme 토큰)
- **i18n**: next-intl
- **애니메이션**: CSS scroll-behavior: smooth
- **이미지**: Next.js Image + Placeholder blur
- **접근성**: WCAG 2.1 AA 준수

---

## 반응형 디자인

| 뷰포트 | 레이아웃 |
|--------|---------|
| Mobile (< 768px) | 1열 그리드, 햄버거 메뉴 |
| Tablet (768-1024px) | 2열 그리드, 축소된 사이드바 |
| Desktop (> 1024px) | 3열 그리드, 풀 사이드바 |

---

## 관련 SPEC

- SPEC-AUTH-001: 인증 상태에 따른 UI 분기, 라이선스 표시
- SPEC-PAYMENT-001: PricingSection과 Paddle 결제 연동
