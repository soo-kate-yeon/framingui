# SPEC-UI-002 수락 기준

**SPEC ID:** SPEC-UI-002
**버전:** 1.0.0
**작성일:** 2026-01-31

---

## 1. 개요

본 문서는 SPEC-UI-002 "P0 Screen Templates (12 Screens)" 구현의 수락 기준을 정의합니다. 모든 시나리오는 Given-When-Then 형식으로 작성되었으며, 각 시나리오는 spec.md의 요구사항 TAG와 매핑됩니다.

---

## 2. Phase 1: 타입 시스템 및 레지스트리

### AC-001: ScreenTemplate 인터페이스 정의

**TAG**: [TAG-UI002-001]

**Given**: TypeScript 프로젝트 환경이 설정되어 있다
**When**: `packages/core/src/screen-templates/types.ts` 파일을 작성한다
**Then**:
- ScreenTemplate 인터페이스가 다음 필드를 포함한다:
  - `id: string`
  - `name: string`
  - `category: ScreenCategory`
  - `description: string`
  - `skeleton: { shell, page, sections }`
  - `customizable: { texts, optional, slots }`
  - `requiredComponents: string[]`
  - `layout: TemplateLayout`
  - `Component: ComponentType<ScreenTemplateProps>`
- TypeScript 컴파일이 성공한다
- 타입 추론이 정상적으로 작동한다

---

### AC-002: Template Registry 구현

**TAG**: [TAG-UI002-001]

**Given**: ScreenTemplate 인터페이스가 정의되어 있다
**When**: `packages/core/src/screen-templates/registry.ts`에 TemplateRegistry 클래스를 구현한다
**Then**:
- TemplateRegistry가 싱글톤 패턴으로 구현된다
- `register(template)` 메서드가 템플릿을 등록한다
- `get(id)` 메서드가 ID로 템플릿을 조회한다
- `getByCategory(category)` 메서드가 카테고리별 템플릿 배열을 반환한다
- `findByRequiredComponents(components)` 메서드가 필수 컴포넌트로 템플릿을 검색한다
- TypeScript 컴파일이 성공한다

---

### AC-003: 레이아웃 토큰 정의

**TAG**: [TAG-UI002-002], [TAG-UI002-036]

**Given**: `@tekton/tokens` 패키지가 존재한다
**When**: `packages/tokens/src/layout-tokens.ts` 파일에 레이아웃 토큰을 정의한다
**Then**:
- `layoutTokens.breakpoint`가 mobile, tablet, desktop을 정의한다
- `layoutTokens.container`가 sm, md, lg, xl, full을 정의한다
- `layoutTokens.padding`이 desktop, tablet, mobile CSS Variable을 정의한다
- `layoutTokens.gap`이 desktop, tablet, mobile CSS Variable을 정의한다
- `layoutTokens.columns`가 desktop: 12, tablet: 8, mobile: 4를 정의한다
- 모든 값이 `var(--tekton-layout-*)` 패턴을 따른다

---

## 3. Phase 2: 인증 화면 템플릿 (4개)

### AC-004: Login 템플릿 구현

**TAG**: [TAG-UI002-024], [TAG-UI002-012]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/auth/login.ts` 파일에 Login 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'auth.login'`이다
- 카테고리가 `'auth'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Button', 'Input', 'Form', 'Card', 'Label']`을 포함한다
- `customizable.texts`가 `['title', 'subtitle', 'button_label']`을 포함한다
- `customizable.optional`이 `['social_login', 'remember_me']`를 포함한다
- Registry에 등록 시 정상적으로 조회된다

---

### AC-005: Signup 템플릿 구현

**TAG**: [TAG-UI002-025], [TAG-UI002-012]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/auth/signup.ts` 파일에 Signup 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'auth.signup'`이다
- 카테고리가 `'auth'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Button', 'Input', 'Form', 'Card', 'Label', 'Checkbox']`를 포함한다
- `customizable.texts`가 `['title', 'subtitle', 'button_label']`을 포함한다
- `customizable.optional`이 `['terms_of_service']`를 포함한다

---

### AC-006: Forgot Password 템플릿 구현

**TAG**: [TAG-UI002-026], [TAG-UI002-012]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/auth/forgot-password.ts` 파일에 Forgot Password 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'auth.forgot-password'`이다
- 카테고리가 `'auth'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Button', 'Input', 'Form', 'Card', 'Label']`을 포함한다
- `customizable.texts`가 `['title', 'subtitle', 'button_label']`을 포함한다

---

### AC-007: Verification 템플릿 구현

**TAG**: [TAG-UI002-027], [TAG-UI002-012]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/auth/verification.ts` 파일에 Verification 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'auth.verification'`이다
- 카테고리가 `'auth'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Button', 'Card', 'Badge']`를 포함한다
- `customizable.texts`가 `['title', 'subtitle', 'resend_button_label']`을 포함한다

---

### AC-008: 인증 템플릿 필수 컴포넌트 검증

**TAG**: [TAG-UI002-007], [TAG-UI002-019]

**Given**: Login 템플릿이 구현되어 있다
**When**: 필수 컴포넌트 `Button`이 없는 상태로 템플릿을 렌더링한다
**Then**:
- 에러가 발생한다
- 에러 메시지가 "Required component 'Button' is missing"을 포함한다
- 템플릿이 렌더링되지 않는다

---

## 4. Phase 3: 핵심 화면 템플릿 (3개)

### AC-009: Landing 템플릿 구현

**TAG**: [TAG-UI002-028]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/home/landing.ts` 파일에 Landing 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'home.landing'`이다
- 카테고리가 `'marketing'`이다
- 레이아웃 타입이 `'full'`이다
- 필수 컴포넌트가 `['Button', 'Card', 'Avatar', 'Badge']`를 포함한다
- `customizable.texts`가 `['hero_title', 'hero_subtitle', 'cta_button_label']`을 포함한다
- `customizable.optional`이 `['features']`를 포함한다

---

### AC-010: Settings 템플릿 구현

**TAG**: [TAG-UI002-029], [TAG-UI002-013]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/settings/preferences.ts` 파일에 Settings 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'settings.preferences'`이다
- 카테고리가 `'form'`이다
- 레이아웃 타입이 `'sidebar'`이다
- 필수 컴포넌트가 `['Switch', 'Select', 'Button', 'Form', 'Tabs', 'Separator']`를 포함한다
- `customizable.texts`가 `['tabs', 'settings_sections']`을 포함한다

---

### AC-011: Profile 템플릿 구현

**TAG**: [TAG-UI002-030], [TAG-UI002-013]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/account/profile.ts` 파일에 Profile 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'account.profile'`이다
- 카테고리가 `'form'`이다
- 레이아웃 타입이 `'sidebar'`이다
- 필수 컴포넌트가 `['Avatar', 'Button', 'Input', 'Form', 'Card']`를 포함한다
- `customizable.texts`가 `['profile_fields']`을 포함한다
- `customizable.optional`이 `['avatar_upload']`를 포함한다

---

### AC-012: 슬롯 컨텐츠 주입

**TAG**: [TAG-UI002-010]

**Given**: Landing 템플릿이 구현되어 있다
**When**: 템플릿을 렌더링하면서 `slots.header`에 커스텀 컴포넌트를 전달한다
**Then**:
- 전달된 커스텀 컴포넌트가 템플릿의 header 슬롯에 렌더링된다
- 기본 레이아웃이 유지된다
- 다른 슬롯은 기본값을 유지한다

---

## 5. Phase 4: 시스템 상태 템플릿 (5개)

### AC-013: Loading 템플릿 구현

**TAG**: [TAG-UI002-031]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/feedback/loading.ts` 파일에 Loading 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'feedback.loading'`이다
- 카테고리가 `'feedback'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Skeleton', 'Card']`를 포함한다
- `customizable.optional`이 `['loading_text']`를 포함한다

---

### AC-014: Error 템플릿 구현

**TAG**: [TAG-UI002-032]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/feedback/error.ts` 파일에 Error 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'feedback.error'`이다
- 카테고리가 `'feedback'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Button', 'Card', 'Badge']`를 포함한다
- `customizable.texts`가 `['error_title', 'error_message', 'retry_button_label']`을 포함한다

---

### AC-015: Empty State 템플릿 구현

**TAG**: [TAG-UI002-033]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/feedback/empty.ts` 파일에 Empty State 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'feedback.empty'`이다
- 카테고리가 `'feedback'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Button', 'Card']`를 포함한다
- `customizable.texts`가 `['empty_title', 'empty_message', 'action_button_label']`을 포함한다

---

### AC-016: Confirmation 템플릿 구현

**TAG**: [TAG-UI002-034]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/feedback/confirmation.ts` 파일에 Confirmation 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'feedback.confirmation'`이다
- 카테고리가 `'feedback'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Dialog', 'Button', 'AlertDialog']`를 포함한다
- `customizable.texts`가 `['confirmation_title', 'confirmation_message', 'confirm_button_label', 'cancel_button_label']`을 포함한다

---

### AC-017: Success 템플릿 구현

**TAG**: [TAG-UI002-035]

**Given**: ScreenTemplate 인터페이스와 Registry가 구현되어 있다
**When**: `templates/feedback/success.ts` 파일에 Success 템플릿을 구현한다
**Then**:
- 템플릿 ID가 `'feedback.success'`이다
- 카테고리가 `'feedback'`이다
- 레이아웃 타입이 `'centered'`이다
- 필수 컴포넌트가 `['Toast', 'Card', 'Badge']`를 포함한다
- `customizable.texts`가 `['success_title', 'success_message']`을 포함한다

---

## 6. Phase 5: 반응형 레이아웃 통합

### AC-018: Desktop 레이아웃 적용

**TAG**: [TAG-UI002-016]

**Given**: Login 템플릿이 구현되어 있다
**When**: 화면 너비가 1024px 이상일 때 템플릿을 렌더링한다
**Then**:
- `layout.responsive.desktop` 설정이 적용된다
- 패딩이 `var(--tekton-layout-padding-desktop)` (64px)로 설정된다
- 간격이 `var(--tekton-layout-gap-desktop)` (32px)로 설정된다
- 그리드 컬럼이 12개로 설정된다

---

### AC-019: Tablet 레이아웃 적용

**TAG**: [TAG-UI002-015]

**Given**: Login 템플릿이 구현되어 있다
**When**: 화면 너비가 768px~1024px일 때 템플릿을 렌더링한다
**Then**:
- `layout.responsive.tablet` 설정이 적용된다
- 패딩이 `var(--tekton-layout-padding-tablet)` (32px)로 설정된다
- 간격이 `var(--tekton-layout-gap-tablet)` (24px)로 설정된다
- 그리드 컬럼이 8개로 설정된다

---

### AC-020: Mobile 레이아웃 적용

**TAG**: [TAG-UI002-014]

**Given**: Login 템플릿이 구현되어 있다
**When**: 화면 너비가 768px 미만일 때 템플릿을 렌더링한다
**Then**:
- `layout.responsive.mobile` 설정이 적용된다
- 패딩이 `var(--tekton-layout-padding-mobile)` (16px)로 설정된다
- 간격이 `var(--tekton-layout-gap-mobile)` (16px)로 설정된다
- 그리드 컬럼이 4개로 설정된다

---

### AC-021: 화면 크기 변경 시 레이아웃 업데이트

**TAG**: [TAG-UI002-009]

**Given**: Login 템플릿이 Desktop 레이아웃으로 렌더링되어 있다
**When**: 브라우저 창 너비를 768px 미만으로 조정한다
**Then**:
- 레이아웃이 Mobile 설정으로 즉시 변경된다
- 패딩과 간격이 Mobile 토큰으로 업데이트된다
- 템플릿 컨텐츠가 정상적으로 리플로우된다

---

## 7. 품질 검증

### AC-022: TypeScript 컴파일

**TAG**: [TAG-UI002-001]

**Given**: 모든 템플릿 파일이 작성되어 있다
**When**: `tsc --noEmit` 명령을 실행한다
**Then**:
- TypeScript 컴파일 오류가 0개이다
- 타입 추론이 모든 템플릿에서 정상 작동한다

---

### AC-023: ESLint 검사

**TAG**: [TAG-UI002-004]

**Given**: 모든 템플릿 파일이 작성되어 있다
**When**: `eslint src` 명령을 실행한다
**Then**:
- ESLint 경고가 0개이다
- 모든 코드가 코딩 스타일 규칙을 준수한다

---

### AC-024: 테스트 커버리지

**TAG**: [TAG-UI002-004]

**Given**: 모든 템플릿 및 유닛 테스트가 작성되어 있다
**When**: `vitest --coverage` 명령을 실행한다
**Then**:
- 전체 테스트 커버리지가 85% 이상이다
- 모든 템플릿 파일의 커버리지가 80% 이상이다
- Registry 클래스 커버리지가 90% 이상이다

---

### AC-025: 접근성 테스트

**TAG**: [TAG-UI002-006]

**Given**: Login 템플릿이 렌더링되어 있다
**When**: axe-core를 사용하여 접근성 테스트를 실행한다
**Then**:
- WCAG 2.1 AA 위반 사항이 0개이다
- 모든 폼 요소에 적절한 레이블이 있다
- 키보드 네비게이션이 정상 작동한다
- 스크린 리더가 모든 컨텐츠를 읽을 수 있다

---

### AC-026: 하드코딩 값 검증

**TAG**: [TAG-UI002-017]

**Given**: 모든 템플릿 파일이 작성되어 있다
**When**: 자동 검증 스크립트로 하드코딩된 레이아웃 값을 검사한다
**Then**:
- 하드코딩된 px, rem 값이 발견되지 않는다
- 모든 레이아웃 값이 `var(--tekton-*)` 패턴을 사용한다
- 검증 스크립트가 성공 상태를 반환한다

---

## 8. 통합 테스트

### AC-027: Template Registry 통합

**TAG**: [TAG-UI002-001]

**Given**: 12개 템플릿이 모두 구현되어 있다
**When**: 애플리케이션을 초기화하고 모든 템플릿을 Registry에 등록한다
**Then**:
- Registry에 12개 템플릿이 모두 등록된다
- `getAll()` 메서드가 12개 템플릿 배열을 반환한다
- 각 템플릿이 고유한 ID를 가진다

---

### AC-028: 카테고리별 조회

**TAG**: [TAG-UI002-001]

**Given**: 12개 템플릿이 Registry에 등록되어 있다
**When**: `getByCategory('auth')` 메서드를 호출한다
**Then**:
- 4개의 인증 템플릿이 반환된다
- 모든 템플릿의 category가 'auth'이다
- 반환된 템플릿 ID가 `['auth.login', 'auth.signup', 'auth.forgot-password', 'auth.verification']`를 포함한다

---

### AC-029: 필수 컴포넌트로 검색

**TAG**: [TAG-UI002-004]

**Given**: 12개 템플릿이 Registry에 등록되어 있다
**When**: `findByRequiredComponents(['Button', 'Card'])` 메서드를 호출한다
**Then**:
- Button과 Card를 모두 필수 컴포넌트로 포함하는 템플릿들이 반환된다
- 반환된 템플릿 수가 6개 이상이다
- 각 템플릿의 `requiredComponents`가 'Button'과 'Card'를 포함한다

---

### AC-030: AI 커스터마이징 경계 검증

**TAG**: [TAG-UI002-008], [TAG-UI002-018]

**Given**: Login 템플릿이 렌더링되어 있다
**When**: AI가 `customizable.texts`에 포함되지 않은 텍스트를 수정하려고 시도한다
**Then**:
- 에러가 발생한다
- 에러 메시지가 "Cannot modify non-customizable text"를 포함한다
- 템플릿 골격(skeleton)이 변경되지 않는다

---

### AC-031: 테마 변경 시 토큰 업데이트

**TAG**: [TAG-UI002-011]

**Given**: Login 템플릿이 'linear-minimal-v1' 테마로 렌더링되어 있다
**When**: 테마를 'dark-theme'으로 변경한다
**Then**:
- 템플릿의 `tokenBindings`가 새 테마 토큰으로 업데이트된다
- 배경색, 텍스트 색상 등이 새 테마에 맞게 변경된다
- 레이아웃은 유지된다

---

## 9. 최종 검증

### AC-032: 전체 통합 테스트

**Given**: 모든 Phase가 완료되어 있다
**When**: 전체 통합 테스트 스위트를 실행한다
**Then**:
- 모든 AC-001 ~ AC-031 시나리오가 통과한다
- 품질 기준 6개 항목이 모두 충족된다:
  - TypeScript 컴파일 오류 0개
  - ESLint 경고 0개
  - 테스트 커버리지 85% 이상
  - WCAG 2.1 AA 준수
  - 12개 템플릿 모두 Registry 등록
  - 3개 breakpoint 정상 작동

---

### AC-033: 성공 지표 검증

**Given**: 전체 통합 테스트가 통과했다
**When**: 정량적 성공 지표를 측정한다
**Then**:
- ✅ 12개 템플릿 모두 Registry 등록
- ✅ TypeScript 컴파일 오류 0개
- ✅ ESLint 경고 0개
- ✅ 테스트 커버리지 85% 이상
- ✅ 반응형 breakpoint 3개 모두 정상 작동
- ✅ WCAG 2.1 AA 준수

---

## 10. 배포 준비 검증

### AC-034: 빌드 검증

**Given**: 모든 수락 기준이 충족되었다
**When**: `pnpm build` 명령으로 패키지를 빌드한다
**Then**:
- 빌드가 성공한다
- `dist/` 디렉토리에 번들 파일이 생성된다
- 타입 정의 파일 (.d.ts)이 생성된다
- 번들 크기가 목표치 이하이다

---

### AC-035: 문서 검증

**Given**: 모든 수락 기준이 충족되었다
**When**: README 및 예제 문서를 검토한다
**Then**:
- README가 ScreenTemplate 사용법을 명확히 설명한다
- 12개 템플릿에 대한 예제 코드가 제공된다
- AI 커스터마이징 가이드가 포함되어 있다
- 모든 예제 코드가 정상 작동한다

---

## 11. 요약

**전체 수락 기준 수**: 35개

**필수 기준 (MUST)**: AC-001 ~ AC-031 (31개)
**배포 준비 기준 (SHOULD)**: AC-032 ~ AC-035 (4개)

**통과 조건**:
- 필수 기준 31개 모두 통과 (100%)
- 배포 준비 기준 4개 중 3개 이상 통과 (75%)

**최종 배포 승인 조건**:
- 모든 필수 기준 통과
- 품질 기준 6개 항목 모두 충족
- 정량적 성공 지표 달성
- 기술 리뷰 승인

---

**참조**: [spec.md](./spec.md), [plan.md](./plan.md)
