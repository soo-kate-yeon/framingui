# SPEC-UI-002 구현 계획

**SPEC ID:** SPEC-UI-002
**버전:** 1.0.0
**작성일:** 2026-01-31

---

## 1. 개요

### 목표

AI-Native Design Library로서 코딩 에이전트가 실제로 사용 가능한 12개 P0 화면 템플릿을 구현합니다. 단순한 tsx 파일이 아닌, 재사용 가능한 컴포넌트 조합과 명확한 AI 커스터마이징 경계를 가진 구조화된 템플릿 시스템을 구축합니다.

### 핵심 원칙

1. **AI-First Design**: 코딩 에이전트가 이해하고 수정 가능한 명확한 인터페이스
2. **Component Reusability**: 재사용 가능한 컴포넌트 조합 중심
3. **Token-Based Responsive**: Tekton 레이아웃 토큰 기반 반응형 디자인
4. **Clear Boundaries**: AI 커스터마이징 가능 영역과 필수 골격의 명확한 분리

---

## 2. 의존성 및 제약사항

### 기술 의존성

| 의존성 | 버전 | 상태 | 비고 |
|--------|------|------|------|
| SPEC-UI-001 | 1.0.0 | ✅ 완료 | shadcn-ui Fork 및 Token 통합 |
| @tekton/ui | 0.1.0 | ✅ 사용 가능 | shadcn-ui 기반 30개 컴포넌트 |
| @tekton/tokens | 0.1.0 | ✅ 사용 가능 | TokenReference 타입 정의 |
| React | 18/19 | ✅ 사용 가능 | Peer dependency |
| TypeScript | 5.7+ | ✅ 사용 가능 | 타입 시스템 |

### 제약사항

1. **기술 제약**
   - TypeScript strict mode 필수
   - React Server Components 호환성 유지
   - Tailwind CSS 4.0 기반 스타일링
   - CSS Variable (`--tekton-*`) 패턴만 사용

2. **품질 제약**
   - TypeScript 컴파일 오류 0개
   - ESLint 경고 0개
   - 테스트 커버리지 85% 이상
   - WCAG 2.1 AA 준수

3. **아키텍처 제약**
   - 하드코딩된 레이아웃 값 금지
   - 필수 컴포넌트 없이 템플릿 렌더링 금지
   - AI 커스터마이징 불가 영역 수정 금지

---

## 3. 구현 마일스톤

### Phase 1: 타입 시스템 및 레지스트리 구축 (우선순위: 높음)

**목표**: ScreenTemplate 인터페이스와 Template Registry 구현

**구현 내용**:
- [TAG-UI002-001] ScreenTemplate 인터페이스 정의
- [TAG-UI002-002] SectionTemplate, TemplateLayout, ResponsiveLayout 타입 정의
- [TAG-UI002-003] TemplateRegistry 클래스 구현 (싱글톤 패턴)
- [TAG-UI002-036] 레이아웃 토큰 정의 (`layout-tokens.ts`)

**산출물**:
- `packages/core/src/screen-templates/types.ts`
- `packages/core/src/screen-templates/registry.ts`
- `packages/tokens/src/layout-tokens.ts`

**검증 기준**:
- TypeScript 컴파일 성공
- 타입 추론 정상 작동
- Registry 메서드 (register, get, getByCategory, findByRequiredComponents) 동작

---

### Phase 2: 인증 화면 템플릿 (4개) (우선순위: 높음)

**목표**: 인증 관련 화면 템플릿 4개 구현

**구현 내용**:

1. **Login 템플릿** [TAG-UI002-024]
   - 필수 컴포넌트: Button, Input, Form, Card, Label
   - 레이아웃: centered
   - 커스터마이징 가능: title, subtitle, button_label, social_login (optional), remember_me (optional)

2. **Signup 템플릿** [TAG-UI002-025]
   - 필수 컴포넌트: Button, Input, Form, Card, Label, Checkbox
   - 레이아웃: centered
   - 커스터마이징 가능: title, subtitle, button_label, terms_of_service (optional)

3. **Forgot Password 템플릿** [TAG-UI002-026]
   - 필수 컴포넌트: Button, Input, Form, Card, Label
   - 레이아웃: centered
   - 커스터마이징 가능: title, subtitle, button_label

4. **Verification 템플릿** [TAG-UI002-027]
   - 필수 컴포넌트: Button, Card, Badge
   - 레이아웃: centered
   - 커스터마이징 가능: title, subtitle, resend_button_label

**산출물**:
- `packages/core/src/screen-templates/templates/auth/login.ts`
- `packages/core/src/screen-templates/templates/auth/signup.ts`
- `packages/core/src/screen-templates/templates/auth/forgot-password.ts`
- `packages/core/src/screen-templates/templates/auth/verification.ts`

**검증 기준**:
- [TAG-UI002-007] 템플릿 로드 시 필수 컴포넌트 검증 통과
- [TAG-UI002-012] 'auth' 카테고리 템플릿은 centered 레이아웃 사용
- [TAG-UI002-014~016] 반응형 breakpoint별 레이아웃 정상 작동
- WCAG 2.1 AA 준수 (axe-core 테스트 통과)

---

### Phase 3: 핵심 화면 템플릿 (3개) (우선순위: 높음)

**목표**: 핵심 화면 템플릿 3개 구현

**구현 내용**:

1. **Landing 템플릿** [TAG-UI002-028]
   - 필수 컴포넌트: Button, Card, Avatar, Badge
   - 레이아웃: full
   - 커스터마이징 가능: hero_title, hero_subtitle, cta_button_label, features (optional)

2. **Settings 템플릿** [TAG-UI002-029]
   - 필수 컴포넌트: Switch, Select, Button, Form, Tabs, Separator
   - 레이아웃: sidebar
   - 커스터마이징 가능: tabs, settings_sections

3. **Profile 템플릿** [TAG-UI002-030]
   - 필수 컴포넌트: Avatar, Button, Input, Form, Card
   - 레이아웃: sidebar
   - 커스터마이징 가능: profile_fields, avatar_upload (optional)

**산출물**:
- `packages/core/src/screen-templates/templates/home/landing.ts`
- `packages/core/src/screen-templates/templates/settings/preferences.ts`
- `packages/core/src/screen-templates/templates/account/profile.ts`

**검증 기준**:
- [TAG-UI002-013] 'dashboard' 카테고리 템플릿은 sidebar 레이아웃 사용
- [TAG-UI002-010] 슬롯 컨텐츠 주입 정상 작동
- [TAG-UI002-008] AI 수정 범위 제한 정상 작동

---

### Phase 4: 시스템 상태 템플릿 (5개) (우선순위: 중간)

**목표**: 시스템 상태 피드백 템플릿 5개 구현

**구현 내용**:

1. **Loading 템플릿** [TAG-UI002-031]
   - 필수 컴포넌트: Skeleton, Card
   - 레이아웃: centered
   - 커스터마이징 가능: loading_text (optional)

2. **Error 템플릿** [TAG-UI002-032]
   - 필수 컴포넌트: Button, Card, Badge
   - 레이아웃: centered
   - 커스터마이징 가능: error_title, error_message, retry_button_label

3. **Empty State 템플릿** [TAG-UI002-033]
   - 필수 컴포넌트: Button, Card
   - 레이아웃: centered
   - 커스터마이징 가능: empty_title, empty_message, action_button_label

4. **Confirmation 템플릿** [TAG-UI002-034]
   - 필수 컴포넌트: Dialog, Button, AlertDialog
   - 레이아웃: centered
   - 커스터마이징 가능: confirmation_title, confirmation_message, confirm_button_label, cancel_button_label

5. **Success 템플릿** [TAG-UI002-035]
   - 필수 컴포넌트: Toast, Card, Badge
   - 레이아웃: centered
   - 커스터마이징 가능: success_title, success_message

**산출물**:
- `packages/core/src/screen-templates/templates/feedback/loading.ts`
- `packages/core/src/screen-templates/templates/feedback/error.ts`
- `packages/core/src/screen-templates/templates/feedback/empty.ts`
- `packages/core/src/screen-templates/templates/feedback/confirmation.ts`
- `packages/core/src/screen-templates/templates/feedback/success.ts`

**검증 기준**:
- [TAG-UI002-011] 테마 변경 시 토큰 업데이트 정상 작동
- [TAG-UI002-019] 필수 컴포넌트 없이 렌더링 시도 시 에러 발생
- 모든 피드백 템플릿 접근성 테스트 통과

---

### Phase 5: 반응형 레이아웃 통합 및 테스트 (우선순위: 높음)

**목표**: 반응형 breakpoint별 레이아웃 통합 및 종합 테스트

**구현 내용**:

1. **반응형 레이아웃 토큰 적용**
   - [TAG-UI002-005] 3개 breakpoint (Desktop, Tablet, Mobile) 지원
   - [TAG-UI002-014] Mobile: < 768px
   - [TAG-UI002-015] Tablet: 768px ~ 1024px
   - [TAG-UI002-016] Desktop: >= 1024px

2. **반응형 테스트**
   - 각 템플릿별 3개 breakpoint 테스트
   - 레이아웃 토큰 (padding, gap, columns) 정상 적용 확인
   - 브라우저 DevTools를 통한 수동 검증

3. **통합 테스트**
   - Registry에 12개 템플릿 모두 등록 확인
   - 카테고리별 조회 테스트
   - 필수 컴포넌트 검색 테스트

**산출물**:
- 반응형 레이아웃 테스트 케이스
- 통합 테스트 스크립트

**검증 기준**:
- [TAG-UI002-009] 화면 크기 변경 시 breakpoint별 레이아웃 적용
- [TAG-UI002-017] 하드코딩된 레이아웃 값 사용 금지 (자동 검증)
- 모든 템플릿 테스트 커버리지 85% 이상

---

### Phase 6: 문서화 및 예제 (우선순위: 낮음, 선택적)

**목표**: 개발자 문서 및 사용 예제 작성

**구현 내용**:

1. **README 작성**
   - ScreenTemplate 인터페이스 사용법
   - Template Registry 사용법
   - AI 커스터마이징 가이드

2. **예제 작성**
   - 각 템플릿별 사용 예제
   - AI 에이전트를 위한 프롬프트 예제
   - 커스터마이징 예제

3. **선택적 기능** (Optional)
   - [TAG-UI002-021] 템플릿 미리보기 이미지
   - [TAG-UI002-022] 템플릿 변형(variants)
   - [TAG-UI002-023] AI 추천 컴포넌트 제안 기능

**산출물**:
- `packages/core/src/screen-templates/README.md`
- 예제 코드 스니펫
- (선택적) 템플릿 미리보기 이미지

**검증 기준**:
- 문서가 명확하고 이해하기 쉬움
- 예제 코드가 정상 작동

---

## 4. 기술 접근 방식

### 4.1 ScreenTemplate 인터페이스 설계

**핵심 설계 원칙**:

1. **AI-Readable Metadata**
   - 템플릿 ID, 이름, 설명을 명확히 정의
   - 카테고리 기반 분류
   - 필수 컴포넌트 목록 명시

2. **Customization Boundaries**
   - `customizable.texts`: AI가 수정 가능한 텍스트 키 배열
   - `customizable.optional`: 선택적 기능 키 배열
   - `customizable.slots`: 커스터마이징 가능한 슬롯 배열

3. **Validation System**
   - `requiredComponents`: 필수 컴포넌트 목록
   - 템플릿 로드 시 자동 검증
   - 누락된 컴포넌트 발견 시 에러 발생

### 4.2 Template Registry 패턴

**싱글톤 패턴 사용 이유**:
- 전역적으로 단일 레지스트리 인스턴스 유지
- 템플릿 등록 및 조회 성능 최적화
- 메모리 효율성

**주요 메서드**:
- `register(template)`: 템플릿 등록
- `get(id)`: ID로 템플릿 조회
- `getByCategory(category)`: 카테고리별 조회
- `findByRequiredComponents(components)`: 필수 컴포넌트로 검색

### 4.3 반응형 레이아웃 전략

**Breakpoint 정의**:
```typescript
mobile: < 768px
tablet: 768px ~ 1024px
desktop: >= 1024px
```

**레이아웃 토큰 사용**:
```typescript
// Desktop
padding: var(--tekton-layout-padding-desktop) // 64px
gap: var(--tekton-layout-gap-desktop)         // 32px
columns: 12

// Tablet
padding: var(--tekton-layout-padding-tablet)  // 32px
gap: var(--tekton-layout-gap-tablet)          // 24px
columns: 8

// Mobile
padding: var(--tekton-layout-padding-mobile)  // 16px
gap: var(--tekton-layout-gap-mobile)          // 16px
columns: 4
```

**CSS Media Queries**:
- Tailwind CSS `md:`, `lg:` breakpoint 유틸리티 사용
- CSS Variable 기반 동적 스타일링

---

## 5. 위험 요소 및 대응 방안

| 위험 요소 | 영향도 | 대응 방안 |
|-----------|--------|----------|
| AI 에이전트가 ScreenTemplate 인터페이스를 이해하지 못함 | 높음 | 명확한 메타데이터 및 주석 제공, 예제 코드 작성 |
| 필수 컴포넌트 누락으로 인한 렌더링 실패 | 중간 | 템플릿 로드 시 자동 검증 시스템 구현 |
| 반응형 breakpoint 충돌 | 중간 | CSS Variable 기반 일관된 breakpoint 정의 |
| 하드코딩된 레이아웃 값 사용 | 낮음 | ESLint 규칙 및 자동 검증 스크립트 추가 |
| 접근성 기준 미달 | 높음 | axe-core 자동 테스트, WCAG 2.1 AA 체크리스트 |

---

## 6. 성공 지표

### 정량적 지표

- ✅ 12개 템플릿 모두 Registry 등록
- ✅ TypeScript 컴파일 오류 0개
- ✅ ESLint 경고 0개
- ✅ 테스트 커버리지 85% 이상
- ✅ 반응형 breakpoint 3개 모두 정상 작동
- ✅ WCAG 2.1 AA 준수 (axe-core 테스트 통과)

### 정성적 지표

- ✅ AI 에이전트가 ScreenTemplate 인터페이스를 이해하고 수정 가능
- ✅ 개발자가 템플릿을 쉽게 사용하고 커스터마이징 가능
- ✅ 템플릿 간 일관된 디자인 패턴 유지
- ✅ 레이아웃 토큰 기반 일관된 반응형 동작

---

## 7. 다음 단계

### Phase 완료 후

1. **Phase 1 완료 후**: 타입 시스템 및 레지스트리 검증, Phase 2 시작
2. **Phase 2 완료 후**: 인증 템플릿 통합 테스트, Phase 3 시작
3. **Phase 3 완료 후**: 핵심 화면 템플릿 테스트, Phase 4 시작
4. **Phase 4 완료 후**: 시스템 상태 템플릿 테스트, Phase 5 시작
5. **Phase 5 완료 후**: 전체 통합 테스트 및 품질 검증, Phase 6 (선택적) 진행

### 최종 검증

- [TAG-UI002-001~036] 모든 TAG 요구사항 충족 확인
- `acceptance.md`의 모든 시나리오 통과
- 품질 기준 100% 만족

### 배포 준비

- `packages/core` 빌드 및 패키징
- `@tekton/core` npm 퍼블리싱 준비
- 문서 배포 (README, 예제)

---

**참조**: [acceptance.md](./acceptance.md)에서 상세 수락 기준 확인
