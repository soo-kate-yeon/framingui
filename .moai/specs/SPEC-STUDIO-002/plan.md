# SPEC-STUDIO-002: 웹 스튜디오 프론트엔드 구현 계획

## 구현 개요

Next.js 15 App Router 기반의 Brand DNA 편집기 웹 애플리케이션을 구현합니다. 사용자는 직관적인 UI를 통해 Brand DNA의 5개 축을 조정하고, 실시간으로 디자인 토큰 변환 결과를 확인할 수 있습니다.

## 태스크 분해 (8개 태스크)

### Task 1: 프로젝트 초기화 및 설정

**설명**: Next.js 15 프로젝트 생성 및 필수 의존성 설치

**작업 내용**:
- packages/studio-web/ 디렉토리 생성
- Next.js 15 설치 (pnpm create next-app)
- Tailwind CSS 설정
- shadcn/ui 초기화
- TypeScript 설정 (strict: true)
- ESLint, Prettier 설정

**산출물**:
- package.json
- tsconfig.json
- tailwind.config.ts
- next.config.js

**우선순위**: PRIMARY GOAL

---

### Task 2: 축 편집기 컴포넌트

**설명**: 5개 축(Density, Warmth, Playfulness, Sophistication, Energy)을 조정하는 슬라이더 UI 구현

**작업 내용**:
- components/brand-dna/AxisEditor.tsx 생성
- shadcn/ui Slider 컴포넌트 사용
- Zod 검증 통합
- Debounce 패턴 적용 (100ms)
- ARIA 레이블 추가

**산출물**:
- components/brand-dna/AxisEditor.tsx
- hooks/useBrandDNA.ts

**우선순위**: PRIMARY GOAL

---

### Task 3: 디자인 토큰 프리뷰 컴포넌트

**설명**: 축 값 변경에 따른 디자인 토큰을 시각화하는 프리뷰 패널 구현

**작업 내용**:
- components/preview/TokenPreview.tsx 생성
- Button, Card, Input 샘플 컴포넌트 렌더링
- @tekton/studio-mcp의 interpretBrandDNA() 호출
- 실시간 업데이트 (<100ms 지연)

**산출물**:
- components/preview/TokenPreview.tsx
- hooks/useTokenInterpretation.ts

**우선순위**: PRIMARY GOAL

---

### Task 4: 프리셋 선택 UI

**설명**: 3개 기본 프리셋(Modern Tech, Luxury Fashion, Friendly Casual)을 선택하고 로드하는 UI 구현

**작업 내용**:
- components/presets/PresetCard.tsx 생성
- @tekton/studio-mcp에서 프리셋 데이터 로드
- 프리셋 선택 시 확인 다이얼로그 표시
- 반응형 그리드 레이아웃

**산출물**:
- components/presets/PresetCard.tsx
- components/presets/PresetGrid.tsx
- hooks/usePresets.ts

**우선순위**: SECONDARY GOAL

---

### Task 5: 내보내기 및 다운로드 기능

**설명**: Brand DNA를 JSON 파일로 다운로드하는 기능 구현

**작업 내용**:
- components/actions/ExportButton.tsx 생성
- JSON 파일 생성 및 다운로드 로직
- 클립보드 복사 기능
- 성공/실패 알림 (shadcn/ui Toast)

**산출물**:
- components/actions/ExportButton.tsx
- lib/exportUtils.ts

**우선순위**: SECONDARY GOAL

---

### Task 6: 접근성 및 반응형 레이아웃

**설명**: WCAG AA 접근성 기준 준수 및 반응형 레이아웃 구현

**작업 내용**:
- ARIA 레이블 추가
- 키보드 네비게이션 구현
- 모바일/태블릿 레이아웃 최적화
- 색상 대비 검증 (4.5:1)

**산출물**:
- 접근성 테스트 결과 보고서
- 반응형 레이아웃 스타일시트

**우선순위**: SECONDARY GOAL

---

### Task 7: 상태 관리 및 테스팅

**설명**: Zustand 상태 관리 설정 및 단위/컴포넌트 테스트 작성

**작업 내용**:
- Zustand 스토어 설정
- Vitest 단위 테스트 작성
- React Testing Library 컴포넌트 테스트
- 테스트 커버리지 ≥ 85%

**산출물**:
- stores/brandDNAStore.ts
- **/*.test.ts, **/*.test.tsx

**우선순위**: FINAL GOAL

---

### Task 8: E2E 테스트 및 배포 준비

**설명**: Playwright E2E 테스트 작성 및 Vercel 배포 설정

**작업 내용**:
- Playwright E2E 시나리오 작성
- Lighthouse CI 설정
- Vercel 배포 설정
- 환경 변수 설정

**산출물**:
- e2e/**/*.spec.ts
- vercel.json
- .github/workflows/deploy.yml

**우선순위**: OPTIONAL GOAL

---

## 의존성 그래프

```
Task 1 (초기화)
  ↓
Task 2 (축 편집기) ─┬─→ Task 3 (프리뷰)
  ↓                  │
Task 4 (프리셋) ─────┘
  ↓
Task 5 (내보내기)
  ↓
Task 6 (접근성) ─→ Task 7 (테스팅)
                      ↓
                  Task 8 (E2E & 배포)
```

## 리소스 요구사항

**개발 환경**:
- Node.js 20+
- pnpm 9+
- VS Code (권장)

**필수 패키지**:
- @tekton/studio-mcp (npm 배포 필요)
- Next.js 15+
- React 19
- shadcn/ui

**배포 환경**:
- Vercel (권장) 또는 Cloudflare Pages
- 도메인: studio.tekton.dev (예상)

## 마일스톤 구조

**Milestone 1: 핵심 편집 기능 (Primary Goals)**
- Task 1: 프로젝트 초기화
- Task 2: 축 편집기
- Task 3: 디자인 토큰 프리뷰

**Milestone 2: 프리셋 및 내보내기 (Secondary Goals)**
- Task 4: 프리셋 선택
- Task 5: 내보내기 기능
- Task 6: 접근성 및 반응형

**Milestone 3: 품질 보증 (Final Goal)**
- Task 7: 상태 관리 및 테스팅

**Milestone 4: 배포 (Optional Goal)**
- Task 8: E2E 테스트 및 배포

## 위험 요소 및 완화 전략

**위험 1: @tekton/studio-mcp 패키지 미배포**
- 완화: Task 1에서 npm 배포 여부 확인
- 대안: 로컬 workspace 링크 사용

**위험 2: 실시간 프리뷰 성능 문제**
- 완화: Debounce 패턴 및 메모이제이션 적용
- 대안: Web Worker로 계산 오프로드

**위험 3: 접근성 기준 미달**
- 완화: 개발 단계부터 axe DevTools로 지속적 검증
- 대안: 접근성 전문가 리뷰 의뢰

## 다음 단계

1. **즉시 시작 가능**: /moai:2-run SPEC-STUDIO-002
2. **병렬 개발**: SPEC-STUDIO-003 (백엔드 API)와 동시 작업 가능
3. **품질 검증**: /moai:3-sync로 문서화 및 검증
