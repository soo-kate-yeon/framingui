---
id: SPEC-STUDIO-001
version: "1.0.0"
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

---

# SPEC-STUDIO-001: Template Landing Page 재구조화

## 개요

Studio Template 랜딩 페이지를 현대적인 SaaS 랜딩 페이지 패턴으로 완전히 재설계합니다. 기존의 편집 중심 인터페이스를 제거하고, 마케팅 및 구매 전환에 최적화된 구조로 변경합니다.

---

## 요구사항 (EARS Format)

### Ubiquitous Requirements (항상 활성)

**[TAG-STUDIO-001-U001]** `/studio/template/[id]` 경로에서 랜딩페이지가 렌더링되어야 한다.

**[TAG-STUDIO-001-U002]** TopNav에 About, How to use, Documentation 앵커 링크가 표시되어야 한다.

**[TAG-STUDIO-001-U003]** i18n이 지원되어야 한다 (영어 기본, 한국어 지원).

**[TAG-STUDIO-001-U004]** 반응형 디자인이 적용되어야 한다 (모바일: < 768px, 태블릿: 768-1024px, 데스크톱: > 1024px).

**[TAG-STUDIO-001-U005]** Global Sidebar와 통합되어야 한다 (Explore 메뉴 유지).

### Event-Driven Requirements (이벤트 기반)

**[TAG-STUDIO-001-E001]** WHEN [DEMO] 버튼 클릭 THEN Section 2 (MCP Guide)로 스무스 스크롤한다.

**[TAG-STUDIO-001-E002]** WHEN [BUY] 버튼 클릭 THEN Section 3 (Pricing)로 스무스 스크롤한다.

**[TAG-STUDIO-001-E003]** WHEN [Open Full Demo] 클릭 THEN 새 창(target="_blank")으로 Live Demo 페이지를 연다.

**[TAG-STUDIO-001-E004]** WHEN 코드 블록 복사 버튼 클릭 THEN 클립보드에 코드가 복사되고 성공 피드백을 표시한다.

### State-Driven Requirements (상태 기반)

**[TAG-STUDIO-001-S001]** IF 사용자가 라이선스 보유 상태 THEN "Manage License" 버튼이 표시되어야 한다.

**[TAG-STUDIO-001-S002]** IF 언어 설정이 변경됨 THEN 페이지 콘텐츠가 해당 언어로 전환되어야 한다.

### Unwanted Behaviors (금지 사항)

**[TAG-STUDIO-001-UW001]** `/studio/template/[id]/edit` 경로는 삭제되어야 한다.

**[TAG-STUDIO-001-UW002]** TokenSelectionPanel, DevicePreview, DeviceSwitcher 컴포넌트는 사용하지 않아야 한다.

---

## 컴포넌트 설계

### 생성할 컴포넌트

| 컴포넌트 | 위치 | 설명 |
|---------|------|------|
| `TemplateLandingPage` | `page.tsx` | 메인 랜딩 페이지 (완전 재작성) |
| `LandingTopNav` | `components/` | 앵커 링크 포함 상단 네비게이션 |
| `HeroSection` | `components/` | Section 1 - 히어로 영역 |
| `ComponentOverview` | `components/` | 컴포넌트 프리뷰 그리드 |
| `McpGuideSection` | `components/` | Section 2 - MCP 가이드 |
| `PricingSection` | `components/` | Section 3 - 가격 정책 |
| `PricingCard` | `components/` | 가격 카드 컴포넌트 |
| `CodeBlock` | `components/` | 복사 버튼 포함 코드 블록 |

### 삭제할 컴포넌트

| 컴포넌트 | 경로 | 삭제 이유 |
|---------|------|----------|
| `TokenSelectionPanel.tsx` | `components/` | 편집 기능 제거 |
| `DevicePreview.tsx` | `components/` | 편집 기능 제거 |
| `DeviceSwitcher.tsx` | `components/` | 편집 기능 제거 |
| `ScreenSelector.tsx` | `components/` | 편집 기능 제거 |
| `ActionButtons.tsx` | `components/` | 편집 기능 제거 |
| `page.tsx` | `/studio/template/[id]/edit/` | 편집 페이지 제거 |

---

## 페이지 구조

```
TemplateLandingPage
├── LandingTopNav
│   ├── Logo
│   ├── NavLinks (About, How to use, Documentation)
│   └── CTAButtons (Demo, Buy)
├── HeroSection (Section 1)
│   ├── Title & Subtitle
│   ├── CTAButtons (Open Full Demo, Buy Now)
│   └── ComponentOverview (프리뷰 그리드)
├── McpGuideSection (Section 2)
│   ├── MCP Installation Guide
│   ├── CodeBlock (설치 명령어)
│   └── Usage Examples
└── PricingSection (Section 3)
    ├── SectionTitle
    └── PricingCards (Single, Double, Creator Pass)
```

---

## 기술 제약사항

- **프레임워크**: Next.js 15 App Router
- **스타일링**: Tailwind CSS + CSS Variables
- **i18n**: next-intl
- **애니메이션**: CSS scroll-behavior: smooth
- **접근성**: WCAG 2.1 AA 준수

---

## 관련 SPEC

- SPEC-AUTH-001: 인증 상태에 따른 UI 분기
- SPEC-PAYMENT-001: PricingSection과 Paddle 결제 연동
