---
id: SPEC-STUDIO-002
version: "1.0.0"
status: "draft"
created: "2026-01-13"
updated: "2026-01-13"
author: "asleep"
priority: "HIGH"
---

## HISTORY

- 2026-01-13: Initial SPEC creation

# SPEC-STUDIO-002: 웹 스튜디오 프론트엔드

## 개요

Next.js 15+ App Router 기반의 인터랙티브 Brand DNA 편집기 웹 애플리케이션입니다. 사용자는 5개 축(Density, Warmth, Playfulness, Sophistication, Energy)을 슬라이더로 조정하고, 실시간으로 디자인 토큰 변환 결과를 프리뷰하며, 프리셋을 선택/로드하고, 완성된 Brand DNA를 다운로드할 수 있습니다.

## 핵심 기능

1. **인터랙티브 축 편집기**
   - 5개 축별 슬라이더 UI (0.0 ~ 1.0 범위)
   - 실시간 값 검증 및 피드백
   - 축별 설명 툴팁 제공

2. **실시간 디자인 토큰 프리뷰**
   - Axis Interpreter 결과 시각화
   - 컴포넌트 샘플 (Button, Card, Input) 렌더링
   - 변경 사항 즉시 반영 (<100ms 지연)

3. **프리셋 선택 및 로드**
   - 3개 기본 프리셋 (Modern Tech, Luxury Fashion, Friendly Casual)
   - 프리셋 썸네일 및 설명 표시
   - 원클릭 로드 기능

4. **내보내기 및 다운로드**
   - JSON 형식 Brand DNA 다운로드
   - 복사 버튼 (클립보드로 복사)
   - 파일명 자동 생성 (brand-dna-{timestamp}.json)

## 요구사항 (EARS)

### Ubiquitous (항상 적용)

**REQ-FE-001: Zod 스키마 기반 실시간 검증**

시스템은 **항상** 사용자 입력을 Zod 스키마로 검증해야 한다.

- 축 값 범위 (0.0 ~ 1.0) 초과 시 즉시 에러 메시지 표시
- 검증 실패 시 저장/내보내기 버튼 비활성화

**REQ-FE-002: 접근성 준수 (WCAG AA)**

시스템은 **항상** WCAG AA 접근성 기준을 준수해야 한다.

- 키보드 네비게이션 지원 (Tab, Enter, Space)
- ARIA 레이블 및 역할 명시
- 충분한 색상 대비 (최소 4.5:1)

**REQ-FE-003: 반응형 레이아웃**

시스템은 **항상** 데스크톱(1280px+), 태블릿(768px+), 모바일(375px+) 해상도를 지원해야 한다.

- Tailwind CSS 반응형 유틸리티 사용
- 모바일에서 축 편집기 세로 스크롤 지원

### Event-Driven (이벤트 기반)

**REQ-FE-004: 축 값 변경 시 실시간 프리뷰**

**WHEN** 사용자가 슬라이더를 조정하면, **THEN** 시스템은 100ms 이내에 디자인 토큰 프리뷰를 갱신해야 한다.

- Debounce 패턴 적용 (100ms 지연)
- @tekton/studio-mcp의 interpretBrandDNA() 호출

**REQ-FE-005: 프리셋 선택 시 자동 로드**

**WHEN** 사용자가 프리셋을 선택하면, **THEN** 시스템은 해당 프리셋의 축 값을 UI에 자동 반영해야 한다.

- 프리셋 데이터 @tekton/studio-mcp 패키지에서 로드
- 선택 시 확인 다이얼로그 표시 (현재 편집 중인 데이터 손실 방지)

**REQ-FE-006: 내보내기 버튼 클릭 시 다운로드**

**WHEN** 사용자가 "다운로드" 버튼을 클릭하면, **THEN** 시스템은 현재 Brand DNA를 JSON 파일로 저장해야 한다.

- 파일명 형식: brand-dna-{timestamp}.json
- 다운로드 완료 시 성공 알림 표시

### State-Driven (상태 기반)

**REQ-FE-007: 검증 실패 시 저장 버튼 비활성화**

**IF** 축 값 검증이 실패하면, **THEN** 시스템은 저장 및 내보내기 버튼을 비활성화해야 한다.

- 검증 에러 메시지를 슬라이더 하단에 표시
- 유효한 값 입력 시 즉시 버튼 활성화

**REQ-FE-008: 다크 모드 지원**

**IF** 사용자의 시스템 설정이 다크 모드이면, **THEN** 시스템은 다크 테마를 적용해야 한다.

- Tailwind CSS dark: 유틸리티 사용
- 수동 테마 토글 버튼 제공

### Optional (선택 기능)

**REQ-FE-009: 히스토리 기능**

**가능하면**, 시스템은 최근 5개 편집 히스토리를 로컬 스토리지에 저장해야 한다.

- Undo/Redo 버튼 제공
- 브라우저 새로고침 후에도 히스토리 유지

**REQ-FE-010: 축 비교 모드**

**가능하면**, 시스템은 두 개의 Brand DNA를 나란히 비교하는 모드를 제공해야 한다.

- 축 값 차이 시각화
- 디자인 토큰 비교 테이블 표시

## 기술 스택

**프론트엔드 프레임워크**:
- Next.js 15+ (App Router)
- React 19 (Server Components + Client Components)
- TypeScript 5.9+

**UI 라이브러리**:
- shadcn/ui (Button, Card, Slider, Dialog, Toast)
- Tailwind CSS 4.0
- Radix UI (접근성 보장)

**상태 관리**:
- Zustand (클라이언트 상태)
- React Context (테마 관리)

**검증 및 데이터**:
- Zod 3.23+ (@tekton/studio-mcp의 스키마 재사용)
- @tekton/studio-mcp (Brand DNA 로직 공유)

**테스팅**:
- Vitest (단위 테스트)
- React Testing Library (컴포넌트 테스트)
- Playwright (E2E 테스트)

## 의존성

**필수 의존성**:
- SPEC-STUDIO-001 완료 (✅ 완료됨)
- @tekton/studio-mcp 패키지 npm 배포 필요

**비차단 의존성**:
- SPEC-STUDIO-003 (백엔드 API) - 로컬 파일 기반으로 먼저 구현 가능
- 프리셋 라이브러리 확장 (추후 구현)

## 기술적 제약사항

**브라우저 호환성**:
- Chrome 111+, Safari 15+, Firefox 113+ (OKLCH 지원)
- ES2022+ 문법 사용

**성능 요구사항**:
- Lighthouse Performance 점수 ≥ 90
- First Contentful Paint (FCP) < 1.5초
- Time to Interactive (TTI) < 3초

**접근성 요구사항**:
- WCAG AA 준수 (색상 대비 4.5:1 이상)
- 키보드 네비게이션 100% 지원
- 스크린 리더 호환성

## 보안 고려사항

**XSS 방지**:
- React의 기본 이스케이프 처리 활용
- dangerouslySetInnerHTML 사용 금지

**CORS 설정**:
- Next.js API 라우트에서 허용된 도메인만 접근 가능
- 개발 환경: localhost:3000, localhost:3001
- 프로덕션: 배포 도메인 화이트리스트

**입력 검증**:
- 모든 사용자 입력을 Zod 스키마로 검증
- 서버 측 검증 이중화 (클라이언트 검증 우회 방지)
