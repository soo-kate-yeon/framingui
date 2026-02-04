---
id: SPEC-STUDIO-001
type: plan
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-STUDIO-001: 구현 계획

## Traceability Tags

- [TAG-STUDIO-001-U001] ~ [TAG-STUDIO-001-U005]: Ubiquitous Requirements
- [TAG-STUDIO-001-E001] ~ [TAG-STUDIO-001-E004]: Event-Driven Requirements
- [TAG-STUDIO-001-S001] ~ [TAG-STUDIO-001-S002]: State-Driven Requirements
- [TAG-STUDIO-001-UW001] ~ [TAG-STUDIO-001-UW002]: Unwanted Behaviors

---

## 마일스톤

### Phase 1: 컴포넌트 구조 설계 (Primary Goal)

**목표**: 기존 코드 분석 및 새 컴포넌트 구조 설계

**작업 항목**:
- [ ] 기존 `/studio/template/[id]` 코드 분석
- [ ] 삭제 대상 컴포넌트 식별 및 의존성 매핑
- [ ] 새 컴포넌트 디렉토리 구조 설계
- [ ] TypeScript 인터페이스 정의

**산출물**:
- 컴포넌트 의존성 다이어그램
- TypeScript 타입 정의 파일

### Phase 2: HeroSection 및 ComponentOverview 구현 (Primary Goal)

**목표**: 랜딩 페이지 상단 영역 구현

**작업 항목**:
- [ ] `LandingTopNav` 컴포넌트 구현 [TAG-STUDIO-001-U002]
- [ ] `HeroSection` 컴포넌트 구현
- [ ] `ComponentOverview` 그리드 레이아웃 구현
- [ ] CTA 버튼 스크롤 동작 구현 [TAG-STUDIO-001-E001, E002]

**기술 접근**:
```typescript
// 스무스 스크롤 구현
const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
```

### Phase 3: McpGuideSection 및 CodeBlock 구현 (Secondary Goal)

**목표**: MCP 설치 가이드 섹션 구현

**작업 항목**:
- [ ] `McpGuideSection` 컴포넌트 구현
- [ ] `CodeBlock` 컴포넌트 구현 (복사 기능 포함) [TAG-STUDIO-001-E004]
- [ ] MCP 설치 명령어 및 사용 예제 콘텐츠 작성

**기술 접근**:
```typescript
// 클립보드 복사 기능
const copyToClipboard = async (code: string) => {
  await navigator.clipboard.writeText(code);
  toast.success('Copied to clipboard!');
};
```

### Phase 4: PricingSection 구현 (Secondary Goal)

**목표**: 가격 정책 섹션 구현

**작업 항목**:
- [ ] `PricingSection` 컴포넌트 구현
- [ ] `PricingCard` 컴포넌트 구현
- [ ] 3가지 가격 티어 UI 구현 (Single, Double, Creator Pass)
- [ ] 라이선스 상태에 따른 UI 분기 [TAG-STUDIO-001-S001]

**가격 데이터**:
| 티어 | 가격 | 설명 |
|-----|------|------|
| Single | $59 | 1개 템플릿, 1년 업데이트 |
| Double | $99 | 2개 템플릿, 1년 업데이트, 16% 할인 |
| Creator Pass | $149/년 | 전체 템플릿, 신규 템플릿 자동 추가 |

### Phase 5: i18n 적용 및 반응형 대응 (Secondary Goal)

**목표**: 다국어 지원 및 반응형 레이아웃 완성

**작업 항목**:
- [ ] next-intl 설정 및 번역 파일 생성 [TAG-STUDIO-001-U003]
- [ ] 영어/한국어 번역 콘텐츠 작성
- [ ] 모바일/태블릿/데스크톱 반응형 스타일 적용 [TAG-STUDIO-001-U004]
- [ ] 브레이크포인트별 레이아웃 테스트

**브레이크포인트**:
```css
/* Tailwind 기본 브레이크포인트 */
sm: 640px   /* 모바일 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 대형 데스크톱 */
```

### Phase 6: 레거시 컴포넌트 정리 (Final Goal)

**목표**: 사용하지 않는 컴포넌트 제거 및 코드 정리

**작업 항목**:
- [ ] `TokenSelectionPanel.tsx` 삭제 [TAG-STUDIO-001-UW002]
- [ ] `DevicePreview.tsx` 삭제 [TAG-STUDIO-001-UW002]
- [ ] `DeviceSwitcher.tsx` 삭제 [TAG-STUDIO-001-UW002]
- [ ] `ScreenSelector.tsx` 삭제 [TAG-STUDIO-001-UW002]
- [ ] `ActionButtons.tsx` 삭제 [TAG-STUDIO-001-UW002]
- [ ] `/studio/template/[id]/edit/page.tsx` 삭제 [TAG-STUDIO-001-UW001]
- [ ] 미사용 import 및 의존성 정리
- [ ] 테스트 실행 및 빌드 검증

---

## 기술 접근 방식

### 컴포넌트 아키텍처

```
src/app/studio/template/[id]/
├── page.tsx                    # TemplateLandingPage (재작성)
├── components/
│   ├── LandingTopNav.tsx
│   ├── HeroSection.tsx
│   ├── ComponentOverview.tsx
│   ├── McpGuideSection.tsx
│   ├── PricingSection.tsx
│   ├── PricingCard.tsx
│   └── CodeBlock.tsx
└── locales/
    ├── en.json
    └── ko.json
```

### 상태 관리

- **인증 상태**: Supabase Auth Context 활용
- **언어 설정**: next-intl useLocale 훅
- **스크롤 위치**: Native IntersectionObserver

### 성능 최적화

- **이미지**: next/image 컴포넌트 사용
- **코드 스플리팅**: Dynamic import for heavy sections
- **캐싱**: ISR (Incremental Static Regeneration)

---

## 위험 요소 및 대응 방안

| 위험 요소 | 영향도 | 대응 방안 |
|----------|--------|----------|
| 기존 컴포넌트 의존성 복잡 | 중간 | 단계적 마이그레이션, 의존성 분석 선행 |
| i18n 번역 품질 | 낮음 | 네이티브 스피커 검토 |
| 반응형 레이아웃 버그 | 중간 | 실기기 테스트, BrowserStack 활용 |
| 레거시 코드 삭제 시 빌드 오류 | 높음 | 점진적 삭제, 각 단계별 빌드 검증 |

---

## 의존성

### 선행 조건
- 없음 (독립 작업 가능)

### 후속 작업
- SPEC-AUTH-001: 인증 상태에 따른 라이선스 표시 연동
- SPEC-PAYMENT-001: PricingCard와 Paddle Checkout 연동
