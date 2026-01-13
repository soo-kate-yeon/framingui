---
id: SPEC-PHASEC-003
version: "1.0.0"
status: "draft"
created: "2026-01-13"
updated: "2026-01-13"
author: "asleep"
priority: "CRITICAL"
---

## HISTORY

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-01-13 | 1.0.0 | asleep | Initial draft creation |

# SPEC-PHASEC-003: Create Screen Workflow

## 개요

Phase C는 Tekton 디자인 시스템의 핵심 목표인 **"AI 에이전트가 화면을 자율적으로 생성"**할 수 있는 워크플로우를 구현합니다. 단순한 템플릿 복사가 아닌, **"Screen Contract(화면 규약)"** 기반으로 환경, 골격, 역할, 합성의 4계층을 통해 **적응형 화면 생성**을 지원합니다.

## 목표

**Primary Goal (필수)**:
- 4계층 Screen Contract 아키텍처 정의 및 구현
- 환경(해상도/폼팩터)에 따른 적응형 레이아웃 그리드 시스템
- 화면 역할(Intent)에 따른 Compound Pattern 자동 추천

**Secondary Goal (중요)**:
- CLI `tekton create screen <name>` 명령어 구현
- 토큰 및 컴포넌트 자동 적용 파이프라인
- VS Code Extension 통합 (Command Palette에서 화면 생성)

**Optional Goal (선택)**:
- AI 에이전트 Context Export (AFDS ADC Generator 연동)
- 화면 규약 검증 Linter

---

## Phase B 의존성

Phase C는 Phase B의 완료된 인프라를 기반으로 합니다:

- **B1: Monorepo 구조** (완료 ✅) - `@tekton/preset`, `@tekton/token-generator`, `@tekton/contracts`
- **B2: CLI 도구** (완료 ✅) - Framework/Tailwind/shadcn 감지, Token 생성
- **B3: VS Code Extension** (완료 ✅) - Command Palette 통합
- **B4: 템플릿 시스템** (완료 ✅) - `page.tsx.template`, `layout.tsx.template`

---

## 핵심 아키텍처: 4계층 Screen Contract

```
┌─────────────────────────────────────────────────────────────────┐
│                     Screen Contract                             │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Environment                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Desktop   │  │   Mobile    │  │   Tablet    │              │
│  │  (12-col)   │  │   (4-col)   │  │   (8-col)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2: Skeleton                                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Layout Preset: FullScreen | WithSidebar | WithHeader   │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────────────────────┐│    │
│  │  │ Header? │ │Sidebar? │ │         Content             ││    │
│  │  └─────────┘ └─────────┘ └─────────────────────────────┘│    │
│  │  ┌─────────────────────────────────────────────────────┐│    │
│  │  │                     Footer?                         ││    │
│  │  └─────────────────────────────────────────────────────┘│    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3: Intent (Role)                                         │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │ DataList  │ │   Form    │ │ Dashboard │ │  Detail   │        │
│  │ (Table,   │ │ (Input,   │ │ (Card,    │ │ (Section, │        │
│  │  List)    │ │  Select)  │ │  Chart)   │ │  Media)   │        │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘        │
├─────────────────────────────────────────────────────────────────┤
│  Layer 4: Composition                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Component Assembly + Token Application                 │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │    │
│  │  │ Button  │ │  Card   │ │  Input  │ │  Table  │ ...    │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │    │
│  │         ↓ Token Injection (Color, Spacing, Typography)  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Environment (환경 계층)

### 목적
프로젝트가 타겟팅하는 **플랫폼과 해상도를 감지**하여 적합한 레이아웃 그리드 **및 레이아웃 행동 규칙**을 결정합니다.

### 감지 방법
1. **자동 감지**: `package.json`의 dependencies 분석 (react-native, electron, capacitor 등)
2. **수동 선택**: CLI 프롬프트 또는 `tekton.config.json`에서 명시

### Environment Enum

```typescript
export enum Environment {
  Web = 'web',               // Desktop-first web application
  Mobile = 'mobile',         // Mobile app (React Native, Capacitor)
  Tablet = 'tablet',         // Tablet-optimized layout
  Responsive = 'responsive', // Multi-breakpoint (default)
  TV = 'tv',                 // TV/Large screen (10-foot UI)
  Kiosk = 'kiosk',           // Kiosk/Fixed resolution
}
```

### Grid System

| Environment | Columns | Gutter | Margin | Breakpoint |
|-------------|---------|--------|--------|------------|
| Desktop     | 12      | 24px   | 64px   | ≥1280px    |
| Tablet      | 8       | 16px   | 32px   | 768-1279px |
| Mobile      | 4       | 12px   | 16px   | <768px     |
| TV          | 16      | 48px   | 96px   | ≥1920px    |
| Kiosk       | 6       | 32px   | 48px   | fixed-1080p|

### Layout Behavior (레이아웃 행동 규칙)

Grid만으로는 환경별 차이를 표현할 수 없습니다. **Layout Behavior**는 환경별로 네비게이션, 카드 배치, 데이터 밀도, 인터랙션 모델을 정의합니다.

```typescript
export const environmentBehaviors: Record<Environment, LayoutBehavior> = {
  web: {
    grid: { columns: 12, gutter: 24, margin: 64 },
    navigation: 'sidebar',           // 고정 사이드바
    cardLayout: 'grid',              // 그리드 배치
    dataDensity: 'high',             // 많은 정보 표시
    interactionModel: 'mouse-first', // 마우스 클릭 우선
  },
  mobile: {
    grid: { columns: 4, gutter: 12, margin: 16 },
    navigation: 'bottom-tabs',       // 하단 탭 네비게이션
    cardLayout: 'stack',             // 수직 스택 배치
    dataDensity: 'low',              // 적은 정보 (스크롤 유도)
    interactionModel: 'touch-first', // 터치 제스처 우선
  },
  tv: {
    grid: { columns: 16, gutter: 48, margin: 96 },
    navigation: 'left-rail',         // 좌측 레일 (항상 표시)
    cardLayout: 'horizontal-scroll', // 가로 스크롤 그룹
    dataDensity: 'minimal',          // 최소 정보 (10ft UI)
    interactionModel: 'remote-first',// 리모컨/방향키 우선
    focusManagement: 'spatial',      // 공간 기반 포커스 이동
  },
  // ... tablet, kiosk, responsive 등
};
```

### Layout Behavior Schema

```typescript
export const layoutBehaviorSchema = z.object({
  grid: z.object({
    columns: z.number(),
    gutter: z.number(),
    margin: z.number(),
  }),
  navigation: z.enum(['sidebar', 'top-nav', 'bottom-tabs', 'left-rail', 'hamburger']),
  cardLayout: z.enum(['grid', 'stack', 'horizontal-scroll', 'masonry']),
  dataDensity: z.enum(['minimal', 'low', 'medium', 'high']),
  interactionModel: z.enum(['mouse-first', 'touch-first', 'remote-first', 'keyboard-first']),
  focusManagement: z.enum(['default', 'spatial', 'sequential']).optional(),
});
```

### 확장 전략
- **새 Environment 추가**: `Environment` enum 확장 + Grid + Layout Behavior 정의
- **커스텀 Behavior**: `tekton.config.json`에서 project-level override 허용
- **LLM 컨텍스트 자동 생성**: Environment 선택 시 해당 Behavior가 에이전트 컨텍스트에 주입됨

---

## Layer 2: Skeleton (골격 계층)

### 목적
화면의 **전체적인 뼈대(Header, Sidebar, Footer 등)**를 정의합니다.

### Skeleton Preset

```typescript
export enum SkeletonPreset {
  FullScreen = 'full-screen',       // Content only, no chrome
  WithHeader = 'with-header',       // Header + Content
  WithSidebar = 'with-sidebar',     // Sidebar + Content
  WithHeaderSidebar = 'with-header-sidebar', // Header + Sidebar + Content
  WithHeaderFooter = 'with-header-footer',   // Header + Content + Footer
  Dashboard = 'dashboard',          // Header + Sidebar + Content + Footer (optional)
}
```

### Skeleton Contract Schema

```typescript
export const skeletonContractSchema = z.object({
  preset: z.nativeEnum(SkeletonPreset),
  
  header: z.object({
    enabled: z.boolean(),
    sticky: z.boolean().optional().default(true),
    height: z.enum(['sm', 'md', 'lg']).optional().default('md'),
  }).optional(),
  
  sidebar: z.object({
    enabled: z.boolean(),
    position: z.enum(['left', 'right']).optional().default('left'),
    width: z.enum(['sm', 'md', 'lg']).optional().default('md'),
    collapsible: z.boolean().optional().default(true),
  }).optional(),
  
  footer: z.object({
    enabled: z.boolean(),
    sticky: z.boolean().optional().default(false),
  }).optional(),
  
  content: z.object({
    maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).optional().default('lg'),
    padding: z.enum(['none', 'sm', 'md', 'lg']).optional().default('md'),
  }),
});
```

### 확장 전략
- **새 Preset 추가**: `SkeletonPreset` enum 확장 + 기본 구성 정의
- **Preset Override**: 사용자가 preset 선택 후 개별 속성 수정 가능

---

## Layer 3: Intent (역할 계층)

### 목적
화면이 **어떤 목적/역할을 수행하는지** 정의하고, 그에 맞는 Compound Pattern을 추천합니다.

### Intent Enum

```typescript
export enum ScreenIntent {
  // Data Display
  DataList = 'data-list',       // List or Table of items
  DataDetail = 'data-detail',   // Single item detail view
  Dashboard = 'dashboard',      // Overview with multiple widgets
  
  // User Input
  Form = 'form',                // Data entry/edit form
  Wizard = 'wizard',            // Multi-step form
  
  // Authentication
  Auth = 'auth',                // Login, Signup, Password Reset
  
  // Utility
  Settings = 'settings',        // Configuration/preferences
  EmptyState = 'empty-state',   // No data placeholder
  Error = 'error',              // Error page (404, 500)
  
  // Custom
  Custom = 'custom',            // User-defined composition
}
```

### Intent → Compound Pattern Mapping

| Intent | Primary Components | Layout Pattern | Recommended Actions |
|--------|-------------------|----------------|---------------------|
| DataList | Table, List, Card Grid | Vertical scroll, pagination | Create, Filter, Sort |
| DataDetail | Card, Section, Media | Single column, tabs | Edit, Delete, Back |
| Dashboard | Card, Chart, Stat | Grid, masonry | Refresh, Filter |
| Form | Input, Select, Textarea | Single column, sections | Submit, Cancel, Reset |
| Wizard | Step, Progress, Form | Single column, navigation | Next, Back, Submit |
| Auth | Input, Button, Link | Centered, minimal | Submit, Forgot Password |
| Settings | Toggle, Select, Section | Single column, grouped | Save, Reset |
| EmptyState | Illustration, Text, Button | Centered | Primary CTA |
| Error | Illustration, Text, Button | Centered | Go Home, Retry |

### Intent Contract Schema

```typescript
export const intentContractSchema = z.object({
  type: z.nativeEnum(ScreenIntent),
  
  // Recommended components for this intent
  primaryComponents: z.array(z.string()),
  
  // Suggested layout patterns
  layoutPatterns: z.array(z.enum(['single-column', 'two-column', 'grid', 'centered', 'masonry'])),
  
  // Common actions for this intent
  actions: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(['primary', 'secondary', 'destructive', 'link']),
    placement: z.enum(['header', 'footer', 'inline', 'floating']),
  })),
  
  // Data requirements
  dataShape: z.object({
    hasCollection: z.boolean(),        // List/table of items
    hasSingleItem: z.boolean(),        // Single detail item
    hasFormState: z.boolean(),         // Form inputs
    hasAsyncData: z.boolean(),         // API calls needed
  }).optional(),
});
```

### 확장 전략
- **새 Intent 추가**: `ScreenIntent` enum 확장 + Compound Pattern 매핑 정의
- **Intent 조합**: 복합 화면의 경우 `{ primary: 'dashboard', secondary: 'form' }` 형태 지원
- **도메인 특화**: SaaS Pack, E-commerce Pack 등 도메인별 Intent 확장

---

## Layer 4: Composition (합성 계층)

### 목적
Layer 1-3의 결정사항을 바탕으로 **실제 컴포넌트를 조립**하고, 프로젝트의 **토큰을 주입**합니다.

### Composition Pipeline

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Screen Config  │ →  │  Template       │ →  │  Token          │
│  (Env, Skel,    │    │  Selection      │    │  Injection      │
│   Intent)       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ↓                      ↓                      ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Component      │ →  │  Contract       │ →  │  Code           │
│  Assembly       │    │  Validation     │    │  Generation     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Composition Contract Schema

```typescript
export const compositionContractSchema = z.object({
  // References to upper layers
  environment: z.nativeEnum(Environment),
  skeleton: skeletonContractSchema,
  intent: intentContractSchema,
  
  // Component assembly rules
  components: z.array(z.object({
    id: z.string(),
    type: z.string(),                    // Component name (shadcn or custom)
    source: z.enum(['shadcn', 'custom']).optional(), // Component source
    placement: z.enum(['header', 'sidebar', 'content', 'footer']),
    props: z.record(z.unknown()).optional(),
    children: z.array(z.lazy(() => componentSchema)).optional(),
  })),
  
  // Token bindings (see Extended Token System below)
  tokens: tokenPresetSchema,
  
  // Validation rules (from @tekton/contracts)
  validationRules: z.array(z.string()).optional(), // Contract IDs to enforce
});
```

---

## Extended Token System (확장 토큰 시스템)

### 목적
단순한 Primary 컬러 기반이 아닌, **브랜드 계층, 시맨틱 컬러, 데이터 시각화 팔레트, 뉴트럴 스케일**을 모두 지원하는 확장 가능한 토큰 시스템.

### Token Preset Schema

```typescript
export const tokenPresetSchema = z.object({
  // 브랜드 계층 (1~4단계, 확장 가능)
  brand: z.object({
    primary: oklchColorSchema,
    secondary: oklchColorSchema.optional(),
    tertiary: oklchColorSchema.optional(),
    quaternary: oklchColorSchema.optional(),
  }),
  
  // Semantic Colors (고정, WCAG 자동 검증)
  semantic: z.object({
    success: oklchColorSchema,
    warning: oklchColorSchema,
    error: oklchColorSchema,
    info: oklchColorSchema,
  }),
  
  // Data Visualization (차트/그래프용)
  dataViz: z.object({
    categorical: z.array(oklchColorSchema).min(6).max(12), // 범주형 데이터
    sequential: z.object({                                  // 연속형 데이터
      start: oklchColorSchema,
      end: oklchColorSchema,
      steps: z.number().min(3).max(9),
    }).optional(),
    diverging: z.object({                                   // 발산형 데이터
      negative: oklchColorSchema,
      neutral: oklchColorSchema,
      positive: oklchColorSchema,
    }).optional(),
  }).optional(),
  
  // Neutral Scale (Gray 10단계)
  neutral: z.object({
    scale: z.array(oklchColorSchema).length(10), // 50~950 10단계
  }),
  
  // 밀도/간격/둥글기
  spacing: z.enum(['compact', 'comfortable', 'loose']),
  radius: z.enum(['sharp', 'rounded', 'pill']),
});
```

### Domain Pack별 Token 확장 예시

```typescript
// @tekton/token-pack-data-heavy
export const dataHeavyTokenExtension = {
  brand: {
    primary: { h: 220, s: 0.7, l: 0.5 },
    secondary: { h: 180, s: 0.6, l: 0.45 },
    tertiary: { h: 280, s: 0.5, l: 0.55 },
  },
  dataViz: {
    categorical: [
      { h: 220, s: 0.7, l: 0.5 },  // Blue
      { h: 30, s: 0.8, l: 0.55 },  // Orange
      { h: 150, s: 0.6, l: 0.45 }, // Teal
      // ... 총 10색
    ],
    sequential: {
      start: { h: 220, s: 0.2, l: 0.9 },
      end: { h: 220, s: 0.8, l: 0.3 },
      steps: 7,
    },
  },
  spacing: 'compact', // Data-heavy는 조밀하게
};
```

---

## Custom Component Registry (커스텀 컴포넌트 레지스트리)

### 목적
shadcn/ui 외에 **사용자가 직접 디자인한 커스텀 컴포넌트**를 등록하고, 에이전트가 이를 인식하여 사용할 수 있게 합니다.

### 컴포넌트 레지스트리 구조

```json
// tekton.config.json
{
  "components": {
    "shadcn": {
      "path": "components/ui",
      "autoScan": true
    },
    "custom": {
      "path": "components/custom",
      "definitions": [
        {
          "name": "PricingTable",
          "file": "pricing-table.tsx",
          "contract": "pricing-table.contract.ts"
        },
        {
          "name": "StockChart",
          "file": "stock-chart.tsx",
          "contract": null
        }
      ]
    }
  }
}
```

### 커스텀 컴포넌트 Contract (선택)

```typescript
// components/custom/pricing-table.contract.ts
export const PricingTableContract: ComponentContract = {
  id: 'pricing-table',
  version: '1.0.0',
  description: 'Custom pricing comparison table',
  
  constraints: [
    {
      id: 'PRICE-A01',
      severity: 'error',
      description: 'PricingTable must have at least 2 plans',
      rule: {
        type: 'children',
        minChildren: 2,
        maxChildren: 5,
      },
    },
    {
      id: 'PRICE-S01',
      severity: 'warning',
      description: 'Recommended plan should be highlighted',
      rule: {
        type: 'prop-combination',
        required: [{ props: ['highlightedPlan'] }],
      },
    },
  ],
  
  // 에이전트 가이드
  bestPractices: [
    'Always include a free/trial tier for comparison',
    'Highlight the most popular plan',
    'Keep feature lists under 10 items',
  ],
};
```

### Intent에 커스텀 컴포넌트 연결

```typescript
// intent-patterns.ts
export const intentPatterns = {
  // 기존 Intent...
  'pricing': {
    primaryComponents: [
      'PricingTable',     // 커스텀 컴포넌트
      'button',           // shadcn
      'badge',            // shadcn
    ],
    layoutPatterns: ['centered', 'single-column'],
  },
};
```

### 확장 전략
- **shadcn 자동 스캔**: `components/ui` 폴더 내 `.tsx` 파일 자동 인식
- **커스텀 수동 등록**: `tekton.config.json`에서 명시적 등록
- **Contract 선택적 적용**: Contract 없이도 사용 가능, 있으면 검증 활성화
- **LLM 컨텍스트 주입**: 에이전트에게 사용 가능한 컴포넌트 목록 + 사용법 전달

---

## CLI 명령어 설계

### `tekton create screen <name>`

**기본 플로우**:

```bash
$ tekton create screen UserProfile

? Target environment: (Use arrow keys)
❯ Responsive (recommended)
  Desktop only
  Mobile only

? Screen skeleton: (Use arrow keys)
❯ With Header
  With Sidebar
  Dashboard (Header + Sidebar)
  Full Screen

? Screen intent: (Use arrow keys)
❯ Data Detail (single item view)
  Data List (table/list)
  Form (data entry)
  Dashboard (overview)

? Include components: (select multiple)
◉ Card
◉ Section
◉ Button
◯ Table
◯ Chart

✔ Creating UserProfile screen...

Created:
  src/screens/user-profile/
  ├── page.tsx
  ├── layout.tsx
  ├── components/
  │   └── index.ts
  └── index.ts
```

### Non-Interactive Mode

```bash
$ tekton create screen UserProfile \
  --env responsive \
  --skeleton with-header \
  --intent data-detail \
  --components card,section,button
```

---

## AFDS 통합: Agent Design Context

### Agent Context Export

Phase C의 결과물은 **Agent Design Context (ADC)**로 내보내져, AI 에이전트가 화면 생성 규칙을 이해할 수 있게 합니다.

```typescript
// agent-context.json (자동 생성)
{
  "version": "1.0.0",
  "project": {
    "environment": "responsive",
    "framework": "Next.js",
    "designSystem": "@tekton/default"
  },
  "screenRules": {
    "environments": [...],
    "skeletons": [...],
    "intents": [...],
    "componentContracts": [...]
  },
  "tokens": {
    "colors": {...},
    "spacing": {...},
    "typography": {...}
  }
}
```

### 에이전트 활용 시나리오

1. **에이전트가 ADC 로드**: `tekton` 패키지 설치 시 자동 생성된 `agent-context.json` 참조
2. **화면 생성 요청 해석**: "유저 프로필 화면 만들어줘" → `Intent: DataDetail` 판단
3. **규칙 기반 코드 생성**: Intent에 맞는 Compound Pattern + 토큰 적용
4. **Contract 검증**: 생성된 코드를 `@tekton/contracts`로 검증
5. **자기 교정**: 위반 시 `fixSuggestion` 참조하여 자동 수정

---

## 구현 마일스톤

### M1: Core Screen Contract (Foundation)
- [ ] Environment 계층 스키마 및 Grid 시스템
- [ ] Skeleton 계층 스키마 및 Preset
- [ ] Intent 계층 스키마 및 Compound Pattern 매핑

### M2: CLI Create Screen Command
- [ ] `tekton create screen` 명령어 구현
- [ ] Interactive Q&A 워크플로우
- [ ] 템플릿 기반 코드 생성

### M3: Token & Contract Integration
- [ ] `@tekton/token-generator` 연동
- [ ] `@tekton/contracts` 검증 파이프라인
- [ ] 자동 토큰 주입

### M4: AFDS Agent Context
- [ ] Agent Context JSON 생성기
- [ ] Screen Rules 문서화 (에이전트 친화적)
- [ ] VS Code Extension 연동

---

## 확장 전략 요약

| 계층 | 확장 방법 | 기존 시스템 연동 |
|------|----------|-----------------|
| Environment | Enum 추가 + Grid 정의 | `tekton.config.json` |
| Skeleton | Preset 추가 + 기본 구성 | `@tekton/preset` |
| Intent | Enum 추가 + Pattern 매핑 | Domain Packs (SaaS, E-commerce) |
| Composition | Component 추가 (자동) | `@tekton/contracts`, `@tekton/token-generator` |

---

## 위험 요소 및 완화 전략

### 높은 위험

**R-001: Intent 분류의 모호성**
- 영향도: HIGH
- 완화: Intent 조합 허용 (`primary` + `secondary`), `Custom` fallback 제공

**R-002: 에이전트의 규칙 무시**
- 영향도: HIGH
- 완화: Contract 검증 필수화, 검증 실패 시 코드 저장 차단 옵션

### 중간 위험

**R-003: 템플릿 경직성**
- 영향도: MEDIUM
- 완화: Override 시스템 (Skeleton Preset 선택 후 개별 속성 수정)

---

## 다음 단계

Phase C 완료 후:
1. **Phase D: Figma 동기화** - Figma Token 동기화, Design System 버전 관리
2. **AFDS 마켓플레이스 출시** - Domain Pack 판매, 에이전트 최적화 UI Kit

---

## 참고 문서

- Phase A 완료 보고서: `.moai/docs/phase-a-completion.md`
- Phase B 완료 보고서: `.moai/specs/SPEC-PHASEB-002/M4-completion-report.md`
- AFDS 전략 문서: `AFDS_PLAN.md` (Artifacts)
