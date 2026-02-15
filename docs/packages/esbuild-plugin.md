# @tekton-ui/esbuild-plugin

> 빌드 타임 토큰 준수 검증 esbuild 플러그인. AST 분석으로 하드코딩된 값을 자동 감지합니다.

## 설치

```bash
npm install @tekton-ui/esbuild-plugin -D
```

### Peer Dependencies

```json
{
  "esbuild": "^0.18.0 || ^0.19.0 || ^0.20.0 || ^0.21.0 || ^0.22.0 || ^0.23.0 || ^0.24.0"
}
```

---

## 핵심 역할

`@tekton-ui/esbuild-plugin`은 빌드 시 코드에서 **하드코딩된 디자인 값을 자동으로 감지**합니다.

[`@tekton-ui/styled`](./styled.md)가 런타임에서 하드코딩을 방지한다면, 이 플러그인은 **빌드 타임**에서 동일한 역할을 수행합니다. Babel AST parser를 사용하여 styled-components 템플릿 리터럴을 분석하고, 토큰이 아닌 원시 값이 사용된 곳을 정확하게 보고합니다.

**주요 특징:**

- **AST 기반 분석**: Babel parser로 구문 트리를 분석하여 정확한 위반 위치를 보고합니다.
- **자동 수정 제안**: 하드코딩된 `16px`이 발견되면 `tokens.spacing[4]`를 제안합니다.
- **개발/프로덕션 모드**: 개발 시에는 경고만 표시하고, 프로덕션에서는 빌드를 실패시킵니다.
- **준수율 계산**: 전체 코드베이스의 토큰 준수율을 퍼센트로 보고합니다.

---

## AST 기반 분석

이 플러그인은 다음 패턴을 분석합니다.

**감지 대상:**

- `styled.div\`...\`` - styled-components 엘리먼트 태그
- `styled(Component)\`...\`` - styled-components HOC 패턴
- `css\`...\`` - CSS 템플릿 리터럴

**감지 항목:**

| 카테고리 | 감지 패턴     | 예시                 | 제안                             |
| -------- | ------------- | -------------------- | -------------------------------- |
| 색상     | `#hex`        | `#ff0000`            | `tokens.bg.*` 또는 `tokens.fg.*` |
| 색상     | `rgb()`       | `rgb(255, 0, 0)`     | `tokens.bg.*` 또는 `tokens.fg.*` |
| 색상     | `rgba()`      | `rgba(0,0,0,0.5)`    | `tokens.bg.*` 또는 `tokens.fg.*` |
| 색상     | `hsl()`       | `hsl(0, 100%, 50%)`  | `tokens.bg.*` 또는 `tokens.fg.*` |
| 색상     | `hsla()`      | `hsla(0,100%,50%,1)` | `tokens.fg.*`                    |
| 간격     | `{prop}: Npx` | `padding: 16px`      | `tokens.spacing[4]`              |

**간격 자동 제안 스케일:**

| 하드코딩된 값 | 제안 토큰            |
| ------------- | -------------------- |
| `0px`         | `tokens.spacing[0]`  |
| `4px`         | `tokens.spacing[1]`  |
| `8px`         | `tokens.spacing[2]`  |
| `12px`        | `tokens.spacing[3]`  |
| `16px`        | `tokens.spacing[4]`  |
| `20px`        | `tokens.spacing[5]`  |
| `24px`        | `tokens.spacing[6]`  |
| `32px`        | `tokens.spacing[8]`  |
| `40px`        | `tokens.spacing[10]` |
| `48px`        | `tokens.spacing[12]` |
| `64px`        | `tokens.spacing[16]` |
| `80px`        | `tokens.spacing[20]` |
| `96px`        | `tokens.spacing[24]` |

---

## 설정 옵션

```typescript
interface TektonPluginOptions {
  strict?: boolean; // 위반 시 빌드 실패 (기본: production에서 true)
  include?: RegExp[]; // 분석할 파일 패턴 (기본: [/\.tsx?$/])
  exclude?: RegExp[]; // 제외할 파일 패턴 (기본: [/node_modules/, /\.test\.tsx?$/, ...])
  threshold?: number; // 준수율 임계값 (기본: 100)
  reportPath?: string; // 리포트 파일 경로 (선택)
  verbose?: boolean; // 상세 로깅 (기본: false)
}
```

### 옵션 상세 설명

**strict**

위반이 발견되었을 때 빌드를 실패시킬지 결정합니다. 기본적으로 `NODE_ENV === 'production'`일 때만 `true`입니다.

**include / exclude**

분석 대상 파일을 정규식 패턴으로 지정합니다. 기본값으로 모든 `.ts`/`.tsx` 파일이 포함되며, `node_modules`와 테스트 파일(`*.test.ts`, `*.spec.ts`, `__tests__/`)은 제외됩니다.

**threshold**

빌드 통과를 위한 최소 준수율(%)입니다. 기본값은 100으로, 위반이 하나라도 있으면 빌드가 실패합니다. 점진적 도입 시 낮은 값으로 시작하여 점차 올릴 수 있습니다.

**reportPath**

분석 리포트를 파일로 저장할 경로를 지정합니다.

---

## esbuild 설정 예시

### 기본 사용

```typescript
import * as esbuild from 'esbuild';
import { tektonPlugin } from '@tekton-ui/esbuild-plugin';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
  plugins: [
    tektonPlugin(), // 기본 옵션으로 사용
  ],
});
```

### 개발 모드 (경고만 표시)

```typescript
import { tektonPlugin } from '@tekton-ui/esbuild-plugin';

tektonPlugin({
  strict: false, // 빌드 실패하지 않음
  verbose: true, // 상세 로그 출력
});
```

### 프로덕션 모드 (빌드 실패)

```typescript
import { tektonPlugin } from '@tekton-ui/esbuild-plugin';

tektonPlugin({
  strict: true, // 위반 시 빌드 실패
  threshold: 100, // 100% 준수 필요
  reportPath: './reports/token-compliance.json',
});
```

### 점진적 도입

기존 프로젝트에 도입할 때는 낮은 threshold로 시작하여 점차 올리는 전략을 사용할 수 있습니다.

```typescript
import { tektonPlugin } from '@tekton-ui/esbuild-plugin';

tektonPlugin({
  strict: true,
  threshold: 80, // 80% 이상만 통과 (점진적으로 올림)
  exclude: [
    /node_modules/,
    /\.test\.tsx?$/,
    /legacy\//, // 레거시 코드는 제외
  ],
  verbose: true,
});
```

### 특정 디렉토리만 분석

```typescript
import { tektonPlugin } from '@tekton-ui/esbuild-plugin';

tektonPlugin({
  include: [/src\/components\/.*\.tsx$/], // components 디렉토리만
  exclude: [/node_modules/],
  strict: false,
  verbose: true,
});
```

---

## 출력 예시

### 위반이 발견된 경우

```
[Tekton] Found 3 violations in src/components/Card.tsx

Token Compliance Report
=======================
Violations: 3
Compliance: 85%

  src/components/Card.tsx:12:4
    color: #333333
    Suggestion: tokens.bg.* or tokens.fg.*

  src/components/Card.tsx:15:4
    padding: 16px
    Suggestion: tokens.spacing[4]

  src/components/Card.tsx:18:4
    margin: 24px
    Suggestion: tokens.spacing[6]

[Tekton] Token compliance 85% is below threshold 100%
```

### 모든 위반이 해결된 경우

```
[Tekton] Token compliance: 100% - No violations found
```

---

## 개발 vs 프로덕션 모드

| 동작        | 개발 모드 (`strict: false`) | 프로덕션 모드 (`strict: true`)    |
| ----------- | --------------------------- | --------------------------------- |
| 위반 감지   | 위반 목록 출력              | 위반 목록 출력                    |
| 수정 제안   | 토큰 제안 표시              | 토큰 제안 표시                    |
| 빌드 결과   | **경고만** (빌드 성공)      | **빌드 실패** (threshold 미달 시) |
| 리포트 생성 | reportPath 지정 시 생성     | reportPath 지정 시 생성           |

---

## 다른 패키지와의 관계

- **[@tekton-ui/styled](./styled.md)**: styled가 **런타임**에서 하드코딩을 방지하고, esbuild-plugin은 **빌드 타임**에서 방지합니다. 두 패키지를 함께 사용하면 이중 보호가 가능합니다.
- **[@tekton-ui/tokens](./tokens.md)**: 간격 자동 제안 스케일이 tokens 패키지의 `SpacingTokens` 정의와 일치합니다.

---

[< 패키지 개요로 돌아가기](./README.md)
