---
task_id: TASK-TOKEN-SYSTEM
spec_id: SPEC-COMPONENT-001-A
title: Token System Implementation
status: TODO
priority: HIGH
created: 2026-01-26
assignee: TBD
estimated_effort: 2.5-3.5 hours
blocking_issue: PR #45 TypeScript compilation errors
tags:
  - SPEC-COMPONENT-001-A
  - token-system
  - typescript
  - phase-a
---

# TASK: Token System Implementation

## 작업 개요

### 현재 상태
- **Phase**: SPEC-COMPONENT-001-A (Token System)
- **현재 문제**: TypeScript 컴파일 오류로 인해 토큰 시스템 관련 export가 임시 주석 처리됨
- **차단 요소**: PR #45의 TypeScript 컴파일 오류
- **완료된 작업**:
  - ✅ Phase B (Component Schemas & Validation) 완료
  - ✅ Lint 문제 해결 완료

### 목표
완전한 토큰 시스템 구현을 통해 동적 토큰 바인딩과 템플릿 변수 해석 기능을 제공합니다.

**핵심 기능:**
- 토큰 참조 해석 (`semantic.*`, `atomic.*`, `component.*`)
- 템플릿 변수 지원 (`{variant}`, `{size}`, `{color}`)
- 테마 검증 및 CSS 생성
- 런타임 토큰 바인딩 해석

---

## 환경 정보 (ENVIRONMENT)

### 기술 스택
- **TypeScript**: 5.9+
- **Testing**: Vitest + React Testing Library
- **Validation**: Zod 스키마 기반
- **Build**: ESM 모듈 시스템

### 프로젝트 구조
```
packages/core/src/
├── index.ts              ✅ export 정의됨 (주석 처리 상태)
├── types.ts              ⚠️ 토큰 타입 추가 필요
├── token-resolver.ts     ❌ 생성 필요
├── token-validation.ts   ❌ 생성 필요
└── css-generator.ts      ❌ 생성 필요
```

### 참조 정보
- **관련 SPEC**: SPEC-COMPONENT-001 (Headless Component System & Schema Architecture)
- **관련 커밋**: `04a7a8a` (test 파일에 토큰 시스템 언급됨)
- **테스트 파일**: `packages/core/__tests__/token-bindings.test.ts`
- **현재 임시 조치**: `packages/core/src/index.ts` 54-60줄 export 주석 처리

---

## 전제조건 (ASSUMPTIONS)

### 기술적 가정

**A-001: 토큰 계층 구조**
- **가정**: 3-tier 토큰 시스템 (Atomic → Semantic → Component)이 충분함
- **신뢰도**: HIGH
- **근거**: Design Tokens Community Group W3C 표준, Material Design, Chakra UI 사례
- **리스크**: 복잡한 테마 커스터마이징에서 4-tier 이상 필요 가능
- **검증 방법**: Phase C (Styled Component Wrappers) 통합 시 실제 테마 적용 테스트

**A-002: 템플릿 변수 문법**
- **가정**: `{variant}`, `{size}`, `{color}` 중괄호 문법으로 충분
- **신뢰도**: HIGH
- **근거**: 기존 테스트 파일에서 중괄호 문법 사용 (`token-bindings.test.ts` 13-21줄)
- **리스크**: 중첩 템플릿 또는 조건부 템플릿 필요 시 문법 확장 필요
- **검증 방법**: 모든 20개 컴포넌트 스키마에서 템플릿 변수 해석 테스트

**A-003: CSS 변수 네이밍 규칙**
- **가정**: CSS 변수는 `--tekton-{category}-{name}` 형식 사용
- **신뢰도**: MEDIUM
- **근거**: 프로젝트 전반에서 `--tekton-` 접두사 사용 패턴
- **리스크**: 네이밍 충돌 또는 프레임워크 통합 시 네이밍 변경 필요 가능
- **검증 방법**: `generateCSSVariables` 함수와 통합 확인

### 비즈니스 가정

**A-004: 토큰 시스템 우선순위**
- **가정**: 토큰 시스템은 Phase C 진행을 위한 블로커
- **신뢰도**: HIGH
- **근거**: SPEC-COMPONENT-001-B 완료 상태, Phase C 대기 중
- **리스크**: 토큰 시스템 구현 지연 시 전체 컴포넌트 스타일링 작업 차단
- **검증 방법**: PR #45 머지 후 Phase C 착수 가능 여부 확인

---

## 요구사항 (REQUIREMENTS)

### Ubiquitous Requirements (항상 활성)

**U-001: 타입 안전성**
- 시스템은 **항상** 모든 토큰 해석 함수에 대해 완전한 TypeScript 타입 정의를 제공해야 한다
- **근거**: 컴파일 타임 오류 방지 및 개발자 경험 향상
- **테스트 전략**: TypeScript strict mode 컴파일, 타입 추론 검증

**U-002: 토큰 참조 해석**
- 시스템은 **항상** `semantic.*`, `atomic.*`, `component.*` 형식의 토큰 참조를 정확히 해석해야 한다
- **근거**: 토큰 바인딩 시스템의 핵심 기능
- **테스트 전략**: `token-bindings.test.ts` 43-65줄 검증 통과

**U-003: Fallback 메커니즘**
- 시스템은 **항상** 존재하지 않는 토큰 참조 시 fallback 값을 제공해야 한다
- **근거**: 런타임 오류 방지 및 안정성 보장
- **테스트 전략**: 존재하지 않는 토큰 참조 시나리오 테스트

**U-004: ESM 호환성**
- 시스템은 **항상** ESM 모듈로 export되어야 한다 (`.js` 확장자)
- **근거**: 프로젝트 전체가 ESM 기반
- **테스트 전략**: `index.ts`의 import 문에서 `.js` 확장자 확인

### Event-Driven Requirements (트리거-응답)

**E-001: 템플릿 변수 해석**
- **WHEN** 토큰 바인딩에 `{variant}`, `{size}`, `{color}` 템플릿 변수가 포함되어 있을 때
- **THEN** 시스템은 해당 prop 값을 기반으로 실제 토큰 경로를 해석해야 한다
- **근거**: 동적 토큰 바인딩 지원
- **테스트 전략**: `token-bindings.test.ts` 157-187줄 검증 통과

**E-002: CSS 생성 트리거**
- **WHEN** `ThemeWithTokens` 객체가 제공될 때
- **THEN** 시스템은 완전한 CSS 변수 선언을 생성해야 한다
- **근거**: 런타임 스타일 적용
- **테스트 전략**: `generateThemeCSS` 함수 단위 테스트

**E-003: 검증 실패 처리**
- **WHEN** 테마 검증이 실패할 때
- **THEN** 시스템은 상세한 오류 메시지와 함께 `ValidationResult`를 반환해야 한다
- **근거**: 디버깅 가능성 및 사용자 피드백
- **테스트 전략**: Zod 검증 오류 시나리오 테스트

### State-Driven Requirements (조건부 동작)

**S-001: 토큰 존재 여부 확인**
- **IF** 토큰 참조가 테마에 존재하지 않으면
- **THEN** fallback 값을 반환하고 경고 로그를 출력해야 한다
- **근거**: 개발 중 누락된 토큰 감지
- **테스트 전략**: 누락된 토큰 참조 시나리오

**S-002: 중첩 토큰 참조**
- **IF** 토큰 값이 다른 토큰을 참조하면 (예: `semantic.primary` → `atomic.blue.500`)
- **THEN** 재귀적으로 최종 값까지 해석해야 한다
- **근거**: 토큰 시스템 유연성 및 유지보수성
- **테스트 전략**: 중첩 참조 해석 테스트

### Unwanted Behaviors (금지 동작)

**UW-001: 직접 CSS 값 허용 금지**
- 시스템은 토큰 바인딩에 `16px`, `#fff` 같은 직접 CSS 값을 **허용하지 않아야** 한다
- **근거**: 플랫폼 독립성 유지
- **테스트 전략**: `token-bindings.test.ts` 189-205줄 검증 통과

**UW-002: 플랫폼 종속성 금지**
- 시스템은 React, Vue 등 특정 프레임워크에 **의존하지 않아야** 한다
- **근거**: 플랫폼 독립적 토큰 시스템
- **테스트 전략**: 의존성 검증 (package.json 확인)

---

## 구현 사양 (SPECIFICATIONS)

### 1. 타입 정의 추가 (`types.ts`)

**파일**: `packages/core/src/types.ts`
**위치**: 파일 끝에 추가 (95줄 이후)

**구현 내용:**

```typescript
// ============================================================================
// Token System Types (SPEC-COMPONENT-001-A)
// ============================================================================

/** Atomic tokens: Foundational design values (colors, spacing, typography) */
export interface AtomicTokens {
  colors?: Record<string, string>;
  spacing?: Record<string, string>;
  typography?: Record<string, string>;
  borderRadius?: Record<string, string>;
  shadows?: Record<string, string>;
}

/** Semantic tokens: Purpose-driven tokens (primary, success, error) */
export interface SemanticTokens {
  primary?: string;
  secondary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  background?: string;
  foreground?: string;
  muted?: string;
  border?: string;
}

/** Component tokens: Component-specific tokens (button, input, etc) */
export interface ComponentTokens {
  button?: Record<string, string>;
  input?: Record<string, string>;
  card?: Record<string, string>;
  modal?: Record<string, string>;
  [component: string]: Record<string, string> | undefined;
}

/** Theme with full token system */
export interface ThemeWithTokens extends Theme {
  tokens: {
    atomic: AtomicTokens;
    semantic: SemanticTokens;
    component: ComponentTokens;
  };
}
```

**근거:**
- 3-tier 토큰 시스템: Atomic → Semantic → Component
- Design Tokens Community Group W3C 표준 준수
- 타입 안전성 보장

---

### 2. 토큰 리졸버 구현 (`token-resolver.ts`)

**파일**: `packages/core/src/token-resolver.ts`

**구현 내용:**

```typescript
/**
 * Token Resolver
 * [SPEC-COMPONENT-001-A]
 *
 * Resolves token references like "semantic.primary" or "component.button.background"
 * Supports template variables: {variant}, {size}, {color}
 */

import type { ThemeWithTokens } from './types.js';

export interface TokenReference {
  path: string;
  fallback?: string;
}

/**
 * Resolves a token reference path to its final value
 * @param theme - Theme with tokens
 * @param reference - Token reference path (e.g., "semantic.primary")
 * @returns Resolved token value or undefined
 */
export function resolveToken(
  theme: ThemeWithTokens,
  reference: string
): string | undefined {
  if (!reference || typeof reference !== 'string') {
    return undefined;
  }

  // Handle direct values (should not happen, but defensive)
  if (!reference.includes('.')) {
    return reference;
  }

  const parts = reference.split('.');
  let current: any = theme.tokens;

  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[part];
  }

  // If resolved value is also a reference, resolve recursively
  if (typeof current === 'string' && current.includes('.')) {
    return resolveToken(theme, current);
  }

  return current;
}

/**
 * Resolves a token reference with fallback
 * @param theme - Theme with tokens
 * @param reference - Token reference path
 * @param fallback - Fallback value if token not found
 * @returns Resolved token value or fallback
 */
export function resolveWithFallback(
  theme: ThemeWithTokens,
  reference: string,
  fallback: string
): string {
  const resolved = resolveToken(theme, reference);
  if (resolved === undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Tekton] Token "${reference}" not found, using fallback: "${fallback}"`);
    }
    return fallback;
  }
  return resolved;
}

/**
 * Resolves template variables in token references
 * @param reference - Token reference with template variables (e.g., "component.button.{variant}")
 * @param context - Context object with prop values (e.g., { variant: "primary" })
 * @returns Resolved token reference
 */
export function resolveTemplateVariables(
  reference: string,
  context: Record<string, string>
): string {
  let resolved = reference;

  // Replace template variables: {variant}, {size}, {color}
  for (const [key, value] of Object.entries(context)) {
    const placeholder = `{${key}}`;
    if (resolved.includes(placeholder)) {
      resolved = resolved.replace(new RegExp(placeholder, 'g'), value);
    }
  }

  return resolved;
}
```

**테스트 시나리오:**
1. 단순 토큰 참조: `semantic.primary` → 값 반환
2. 중첩 토큰 참조: `semantic.primary` → `atomic.blue.500` → 최종 값
3. 존재하지 않는 토큰: `undefined` 반환
4. Fallback 사용: `resolveWithFallback` 시 fallback 값 반환
5. 템플릿 변수: `component.button.{variant}` + `{variant: "primary"}` → `component.button.primary`

---

### 3. 토큰 검증 구현 (`token-validation.ts`)

**파일**: `packages/core/src/token-validation.ts`

**구현 내용:**

```typescript
/**
 * Token Validation
 * [SPEC-COMPONENT-001-A]
 *
 * Validates ThemeWithTokens structure using Zod
 */

import { z } from 'zod';
import type { ThemeWithTokens } from './types.js';

export interface ValidationResult {
  success: boolean;
  errors?: string[];
}

const AtomicTokensSchema = z.object({
  colors: z.record(z.string()).optional(),
  spacing: z.record(z.string()).optional(),
  typography: z.record(z.string()).optional(),
  borderRadius: z.record(z.string()).optional(),
  shadows: z.record(z.string()).optional(),
});

const SemanticTokensSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  success: z.string().optional(),
  warning: z.string().optional(),
  error: z.string().optional(),
  info: z.string().optional(),
  background: z.string().optional(),
  foreground: z.string().optional(),
  muted: z.string().optional(),
  border: z.string().optional(),
});

const ComponentTokensSchema = z.record(z.record(z.string()));

export const ThemeWithTokensSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  brandTone: z.string(),
  colorPalette: z.object({
    primary: z.object({
      l: z.number(),
      c: z.number(),
      h: z.number(),
    }),
    secondary: z.object({
      l: z.number(),
      c: z.number(),
      h: z.number(),
    }).optional(),
    accent: z.object({
      l: z.number(),
      c: z.number(),
      h: z.number(),
    }).optional(),
    neutral: z.object({
      l: z.number(),
      c: z.number(),
      h: z.number(),
    }).optional(),
  }),
  typography: z.object({
    fontFamily: z.string(),
    fontScale: z.enum(['small', 'medium', 'large']),
    headingWeight: z.number(),
    bodyWeight: z.number(),
  }),
  componentDefaults: z.object({
    borderRadius: z.enum(['none', 'small', 'medium', 'large', 'full']),
    density: z.enum(['compact', 'comfortable', 'spacious']),
    contrast: z.enum(['low', 'medium', 'high']),
  }),
  tokens: z.object({
    atomic: AtomicTokensSchema,
    semantic: SemanticTokensSchema,
    component: ComponentTokensSchema,
  }),
});

/**
 * Validates a theme with tokens
 * @param theme - Theme object to validate
 * @returns ValidationResult with success status and errors
 */
export function validateTheme(theme: unknown): ValidationResult {
  const result = ThemeWithTokensSchema.safeParse(theme);

  if (result.success) {
    return { success: true };
  }

  return {
    success: false,
    errors: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
  };
}
```

**테스트 시나리오:**
1. 유효한 테마: `{ success: true }` 반환
2. 누락된 필드: `{ success: false, errors: [...] }` 반환
3. 잘못된 타입: Zod 타입 오류 메시지 포함
4. 중첩 객체 검증: `tokens.atomic.colors` 등 깊은 경로 검증

---

### 4. CSS 생성기 구현 (`css-generator.ts`)

**파일**: `packages/core/src/css-generator.ts`

**구현 내용:**

```typescript
/**
 * CSS Generator
 * [SPEC-COMPONENT-001-A]
 *
 * Generates CSS variables from ThemeWithTokens
 */

import type { ThemeWithTokens } from './types.js';

/**
 * Generates CSS custom properties from a theme with tokens
 * @param theme - Theme with tokens
 * @returns CSS string with :root { --tekton-* variables }
 */
export function generateThemeCSS(theme: ThemeWithTokens): string {
  const lines: string[] = [':root {'];

  // Generate atomic token CSS variables
  if (theme.tokens.atomic) {
    const { colors, spacing, typography, borderRadius, shadows } = theme.tokens.atomic;

    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        lines.push(`  --tekton-color-${key}: ${value};`);
      });
    }

    if (spacing) {
      Object.entries(spacing).forEach(([key, value]) => {
        lines.push(`  --tekton-spacing-${key}: ${value};`);
      });
    }

    if (typography) {
      Object.entries(typography).forEach(([key, value]) => {
        lines.push(`  --tekton-typography-${key}: ${value};`);
      });
    }

    if (borderRadius) {
      Object.entries(borderRadius).forEach(([key, value]) => {
        lines.push(`  --tekton-border-radius-${key}: ${value};`);
      });
    }

    if (shadows) {
      Object.entries(shadows).forEach(([key, value]) => {
        lines.push(`  --tekton-shadow-${key}: ${value};`);
      });
    }
  }

  // Generate semantic token CSS variables
  if (theme.tokens.semantic) {
    Object.entries(theme.tokens.semantic).forEach(([key, value]) => {
      if (value) {
        lines.push(`  --tekton-semantic-${key}: ${value};`);
      }
    });
  }

  // Generate component token CSS variables
  if (theme.tokens.component) {
    Object.entries(theme.tokens.component).forEach(([component, tokens]) => {
      if (tokens) {
        Object.entries(tokens).forEach(([key, value]) => {
          lines.push(`  --tekton-component-${component}-${key}: ${value};`);
        });
      }
    });
  }

  lines.push('}');
  return lines.join('\n');
}
```

**테스트 시나리오:**
1. 모든 토큰 타입 포함: Atomic, Semantic, Component 변수 생성
2. 부분 토큰: 일부 토큰만 있어도 정상 작동
3. CSS 변수 네이밍: `--tekton-{category}-{name}` 형식 준수
4. 빈 토큰: 빈 객체 시 `:root {}` 반환

---

### 5. Export 주석 제거 (`index.ts`)

**파일**: `packages/core/src/index.ts`
**작업**: 54-60줄 주석 제거

**수정 전 (54-60줄):**
```typescript
// Token System (SPEC-COMPONENT-001-A)
export { resolveToken, resolveWithFallback, type TokenReference } from './token-resolver.js';
export {
  validateTheme,
  ThemeWithTokensSchema,
  type ValidationResult as TokenValidationResult,
} from './token-validation.js';
export { generateThemeCSS } from './css-generator.js';
```

**수정 후:**
위 주석 제거 (이미 작성되어 있음, 주석만 해제)

---

## 추적성 (TRACEABILITY)

### 요구사항 → 구현 매핑

| Requirement ID | Implementation | Test Coverage |
|----------------|----------------|---------------|
| U-001 | types.ts 타입 정의 | TypeScript strict mode 컴파일 |
| U-002 | resolveToken() 함수 | token-bindings.test.ts 43-65줄 |
| U-003 | resolveWithFallback() 함수 | 존재하지 않는 토큰 시나리오 |
| U-004 | ESM export with .js | index.ts import 확인 |
| E-001 | resolveTemplateVariables() | token-bindings.test.ts 157-187줄 |
| E-002 | generateThemeCSS() | CSS 생성 단위 테스트 |
| E-003 | validateTheme() | Zod 검증 오류 테스트 |
| S-001 | resolveWithFallback() + console.warn | 누락 토큰 시나리오 |
| S-002 | resolveToken() 재귀 로직 | 중첩 참조 테스트 |
| UW-001 | validateTheme() 검증 | token-bindings.test.ts 189-205줄 |
| UW-002 | 의존성 검증 | package.json 검토 |

---

## 완료 조건 (DEFINITION OF DONE)

### 구현 완료 체크리스트

- [ ] **파일 생성 완료**
  - [ ] `packages/core/src/token-resolver.ts` 생성 (약 100줄)
  - [ ] `packages/core/src/token-validation.ts` 생성 (약 120줄)
  - [ ] `packages/core/src/css-generator.ts` 생성 (약 80줄)
  - [ ] `packages/core/src/types.ts`에 4개 타입 추가 (약 40줄)

- [ ] **Export 활성화**
  - [ ] `packages/core/src/index.ts` 54-60줄 주석 제거
  - [ ] TypeScript 컴파일 오류 0개

- [ ] **기능 검증**
  - [ ] `resolveToken()` 단순 참조 해석
  - [ ] `resolveToken()` 중첩 참조 해석
  - [ ] `resolveWithFallback()` fallback 동작
  - [ ] `resolveTemplateVariables()` 템플릿 변수 해석
  - [ ] `validateTheme()` Zod 검증
  - [ ] `generateThemeCSS()` CSS 변수 생성

### 테스트 완료 체크리스트

- [ ] **단위 테스트 작성**
  - [ ] `token-resolver.test.ts` 작성 (기본 + 중첩 + fallback)
  - [ ] `token-validation.test.ts` 작성 (Zod 검증 시나리오)
  - [ ] `css-generator.test.ts` 작성 (CSS 생성 검증)

- [ ] **기존 테스트 통과**
  - [ ] `token-bindings.test.ts` 모든 테스트 통과 (219줄)
  - [ ] `component-schemas.test.ts` 회귀 없음
  - [ ] `pipeline.test.ts` 회귀 없음

- [ ] **커버리지 목표 달성**
  - [ ] 전체 테스트 커버리지 ≥85% (TRUST 5 요구사항)
  - [ ] 토큰 시스템 파일 커버리지 ≥90%

### 품질 게이트 체크리스트

- [ ] **TypeScript 컴파일**
  - [ ] `pnpm build` 성공 (오류 0개)
  - [ ] Strict mode 경고 0개
  - [ ] 타입 추론 정상 작동

- [ ] **Linting 및 포맷팅**
  - [ ] ESLint 경고 0개
  - [ ] Prettier 포맷 통과
  - [ ] Import 문 `.js` 확장자 확인

- [ ] **문서화**
  - [ ] 각 함수에 JSDoc 주석 추가
  - [ ] `[SPEC-COMPONENT-001-A]` 태그 포함
  - [ ] 사용 예시 포함 (선택)

### 통합 완료 체크리스트

- [ ] **PR #45 준비**
  - [ ] 변경 사항 커밋 (`[SPEC-COMPONENT-001-A] Implement token system`)
  - [ ] CI/CD 파이프라인 통과
  - [ ] PR 설명에 완료 조건 체크리스트 포함

- [ ] **Phase C 준비**
  - [ ] 토큰 시스템 API 문서화 업데이트
  - [ ] SPEC-COMPONENT-003 (Styled Component Wrappers) 준비 상태 확인

---

## 리스크 분석 (RISK ANALYSIS)

### 고위험 영역

**Risk 1: 토큰 해석 로직 복잡도**
- **가능성**: MEDIUM
- **영향**: HIGH
- **완화 전략**: 단위 테스트 먼저 작성 (TDD), 재귀 깊이 제한 (최대 10)
- **대응 방안**: 복잡한 중첩 참조 발견 시 로깅 추가, 순환 참조 감지 로직

**Risk 2: 기존 코드 회귀**
- **가능성**: LOW
- **영향**: HIGH
- **완화 전략**: 기존 테스트 스위트 전체 실행, component-schemas 통합 확인
- **대응 방안**: 회귀 발견 시 즉시 롤백, 영향 범위 최소화

### 중위험 영역

**Risk 3: 템플릿 변수 문법 확장 필요**
- **가능성**: MEDIUM
- **영향**: MEDIUM
- **완화 전략**: 현재 3개 변수로 제한, 확장 가능한 구조 설계
- **대응 방안**: Phase C에서 추가 요구사항 발생 시 문법 확장 버전 2 설계

**Risk 4: CSS 변수 네이밍 충돌**
- **가능성**: LOW
- **영향**: MEDIUM
- **완화 전략**: `--tekton-` 접두사 일관성 유지, 네이밍 컨벤션 문서화
- **대응 방안**: 충돌 발견 시 네이밍 마이그레이션 스크립트 작성

---

## 예상 작업 시간 (EFFORT ESTIMATION)

### 세부 작업 분해

1. **타입 정의 작성** (`types.ts`)
   - 예상 시간: 15분
   - 복잡도: LOW
   - 4개 인터페이스 정의

2. **토큰 리졸버 구현** (`token-resolver.ts`)
   - 예상 시간: 45분
   - 복잡도: MEDIUM
   - 3개 함수: resolveToken, resolveWithFallback, resolveTemplateVariables

3. **토큰 검증 구현** (`token-validation.ts`)
   - 예상 시간: 30분
   - 복잡도: LOW
   - Zod 스키마 정의 및 검증 함수

4. **CSS 생성기 구현** (`css-generator.ts`)
   - 예상 시간: 30분
   - 복잡도: LOW
   - 문자열 생성 로직

5. **단위 테스트 작성**
   - 예상 시간: 45분
   - 복잡도: MEDIUM
   - 3개 테스트 파일 작성

6. **통합 테스트 및 디버깅**
   - 예상 시간: 30분
   - 복잡도: MEDIUM
   - 기존 테스트 통과 확인, 버그 수정

7. **문서화 및 커밋**
   - 예상 시간: 15분
   - 복잡도: LOW
   - JSDoc 추가, 커밋 메시지 작성

**총 예상 시간**: 3시간 30분 (버퍼 포함 시 4시간)

---

## 다음 단계 (NEXT STEPS)

### 즉시 실행

1. **개발 환경 준비**
   ```bash
   cd packages/core
   pnpm install
   pnpm test -- --watch  # 테스트 watch 모드
   ```

2. **TDD 사이클 시작**
   - `token-resolver.test.ts` 작성 (Red)
   - `token-resolver.ts` 구현 (Green)
   - 리팩토링 (Refactor)

### Phase C 준비

1. **토큰 시스템 통합 확인**
   - SPEC-COMPONENT-003에서 `resolveToken` API 사용 검증
   - Styled Component Wrappers와 토큰 바인딩 통합

2. **문서화 업데이트**
   - API 문서에 토큰 시스템 섹션 추가
   - 사용 예시 및 베스트 프랙티스 작성

### 장기 계획

1. **성능 최적화**
   - 토큰 해석 결과 캐싱 (메모이제이션)
   - 대규모 테마에서 CSS 생성 성능 측정

2. **확장 기능 고려**
   - 조건부 템플릿 변수 (`{variant:primary|secondary}`)
   - 다크 모드 토큰 자동 생성
   - 토큰 테마 마이그레이션 도구

---

## 참고 자료 (REFERENCES)

### 내부 문서
- [SPEC-COMPONENT-001](./spec.md) - Headless Component System & Schema Architecture
- [Component Schemas](../../../packages/core/src/component-schemas.ts) - 20개 컴포넌트 스키마 정의
- [Token Bindings Test](../../../packages/core/__tests__/token-bindings.test.ts) - 토큰 바인딩 검증 테스트

### 외부 표준
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) - W3C 디자인 토큰 표준
- [Design Tokens Format Module](https://tr.designtokens.org/format/) - 토큰 포맷 명세
- [Zod Documentation](https://zod.dev/) - TypeScript 스키마 검증

### 참고 구현
- [Chakra UI Theme](https://chakra-ui.com/docs/styled-system/theme) - 토큰 시스템 참고
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview) - 3-tier 토큰 구조
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - 토큰 변환 도구

---

**작성일**: 2026-01-26
**최종 수정**: 2026-01-26
**상태**: TODO → 구현 대기 중
**담당자**: TBD

**변경 이력**:
- 2026-01-26: 초기 작성 (TASK-TOKEN-SYSTEM)
