---
id: SPEC-MCP-006
version: "1.0.1"
status: "implemented"
created: "2026-02-09"
updated: "2026-02-09"
author: "soo-kate-yeon"
priority: "HIGH"
---

## HISTORY

| 버전  | 날짜       | 작성자        | 변경 내용                    |
| ----- | ---------- | ------------- | ---------------------------- |
| 1.0.0 | 2026-02-09 | soo-kate-yeon | 초안 작성 (draft)            |
| 1.0.1 | 2026-02-09 | soo-kate-yeon | 구현 완료 (implemented)      |

---

# SPEC-MCP-006: MCP 사용자 온보딩 전면 개선 + v0.3.2

## 개요 (Executive Summary)

Tekton MCP 서버의 사용자 온보딩 실패 문제를 전면 개선한다. 현재 `npx @framingui/mcp-server init` 실행 후 사용자가 최소 3번 이상 실패해야 첫 화면을 생성할 수 있는 구조적 문제가 존재한다. 본 SPEC은 3-Layer 크로스 플랫폼 에이전트 가이드 전략, 정확한 테마 데이터 정비, 인증 우선 온보딩 플로우를 구현하고 v0.3.2 릴리스를 포함한다.

---

## 문제 정의 (Problem Statement)

### 근본 원인 1: Free 테마 제로

- 현재 6개 테마가 JSON 파일로 실제 존재한다: `classic-magazine`, `dark-boldness`, `minimal-workspace`, `neutral-workspace`, `pebble`, `square-minimalism`
- SPEC-DEPLOY-001에 의해 **모든 테마가 인증 필수**로 전환되었다
- 그러나 인증 안내가 어디에도 없어 사용자가 인증 없이 테마 접근을 시도하고 실패한다

### 근본 원인 2: README 허위 데이터

- README.md는 **13개 테마**를 나열하지만, 실제 JSON 파일로 존재하는 테마는 **6개**뿐이다
- `theme-access.ts`의 `PREMIUM_THEMES` 배열에 존재하지 않는 7개 테마가 포함되어 있다:
  - `calm-wellness`, `dynamic-fitness`, `korean-fintech`, `media-streaming`, `premium-editorial`, `saas-dashboard`, `warm-humanist` (실재하지 않음)
  - `next-tailwind-shadcn`, `vite-tailwind-shadcn`, `next-styled-components`, `next-tailwind-radix`, `saas-modern`, `tech-startup` (실재하지 않음)
- README에 "Free Themes" 섹션이 존재하지만, 실제로 무료 테마는 없다

### 근본 원인 3: AI 에이전트 가이드 부재

- Claude Code용 CLAUDE.md에만 가이드가 있고, 그마저도 init에서 자동 생성되지 않는다
- OpenAI Codex, Cursor 등 다른 MCP 클라이언트를 위한 에이전트 가이드가 전혀 없다
- MCP 프로토콜 레벨의 `prompts` capability가 선언되지 않아 범용 MCP 클라이언트가 워크플로우 가이드를 받을 수 없다

### 증거 (Evidence)

| 항목                     | 주장               | 실제                    | 소스 파일                |
| ------------------------ | ------------------ | ----------------------- | ------------------------ |
| 테마 수                  | 13개               | 6개                     | README.md Line 832       |
| Free 테마                | 6개 (인증 불필요)  | 0개 (모두 인증 필요)    | README.md Line 47-55     |
| PREMIUM_THEMES 배열      | 13개               | 실재 6개 + 가상 7개     | theme-access.ts          |
| MCP Prompts capability   | 없음               | tools만 선언            | index.ts Line 51-53      |
| init 인증 안내           | 없음               | 완료 메시지에 인증 미포함 | init.ts Line 246-257    |
| CLAUDE.md 자동 생성      | 없음               | init에서 미생성         | init.ts                  |
| AGENTS.md 자동 생성      | 없음               | 파일 자체 부재          | -                        |

---

## 목표 (Goals)

- **G1**: 크로스 플랫폼 에이전트 가이드 (3-Layer 전략)
  - Layer 1: MCP Prompts (범용 - 모든 MCP 클라이언트)
  - Layer 2: CLAUDE.md (Claude Code 전용)
  - Layer 3: AGENTS.md (OpenAI Codex / 범용)
- **G2**: 정확한 테마 데이터 (13 -> 6 정비, Free/Premium 통합)
- **G3**: 인증 우선 온보딩 플로우 (init 완료 시 인증 단계 안내)
- **G4**: v0.3.2 릴리스 (6개 패키지 버전 범프)

---

## EARS 요구사항

### Ubiquitous Requirements (항상 활성)

**U-001**: MCP 서버는 **항상** Server 생성 시 `prompts` capability를 선언해야 한다.

```typescript
capabilities: {
  tools: {},
  prompts: {},
}
```

**U-002**: `init` 명령은 **항상** 완료 메시지에 인증 단계를 포함해야 한다.

- `tekton-mcp login` 명령어 안내
- 인증이 필요한 이유 (모든 테마가 인증 필수) 설명

**U-003**: 테마 관련 데이터는 **항상** 실제 존재하는 테마만 참조해야 한다.

- 실재 테마: `classic-magazine`, `dark-boldness`, `minimal-workspace`, `neutral-workspace`, `pebble`, `square-minimalism`
- 총 6개

---

### Event-Driven Requirements (이벤트 기반)

**E-001**: **WHEN** MCP 클라이언트가 `prompts/list`를 호출 **THEN** 2개 프롬프트를 반환한다.

- `tekton-getting-started`: Tekton 시작 가이드 (인증 -> 테마 탐색 -> 화면 생성 전체 워크플로우)
- `tekton-screen-workflow`: 화면 생성 4단계 워크플로우 상세 가이드

**E-002**: **WHEN** MCP 클라이언트가 `prompts/get`을 name과 함께 호출 **THEN** 해당 프롬프트의 상세 가이드를 반환한다.

- `tekton-getting-started` 요청 시: 인증 -> 테마 탐색 -> 컴포넌트 확인 -> 화면 생성 전체 워크플로우
- `tekton-screen-workflow` 요청 시: get-screen-generation-context -> validate-screen-definition -> generate_screen -> validate-environment 4단계 상세

**E-003**: **WHEN** `init` 실행이 완료 **THEN** 프로젝트의 CLAUDE.md에 Tekton 섹션을 추가한다.

- 기존 CLAUDE.md가 있으면 Tekton 섹션을 append
- 없으면 Tekton 섹션만 포함한 CLAUDE.md를 새로 생성

**E-004**: **WHEN** `init` 실행이 완료 **THEN** 프로젝트 루트에 AGENTS.md 파일을 생성한다.

- OpenAI Codex 및 범용 에이전트용 Tekton 워크플로우 가이드 포함
- 기존 AGENTS.md가 있으면 Tekton 섹션을 append

**E-005**: **WHEN** `init` 실행이 완료 **THEN** 인증 안내를 포함한 다음 단계를 표시한다.

- 1단계: `tekton-mcp login`으로 인증
- 2단계: Claude Code / 에이전트 재시작
- 3단계: AI에게 "로그인 화면 만들어줘" 요청

---

### State-Driven Requirements (조건 기반)

**S-001**: **IF** 기존 CLAUDE.md가 프로젝트에 존재 **THEN** 기존 내용을 유지하면서 Tekton 섹션을 파일 끝에 append한다.

**S-002**: **IF** 기존 AGENTS.md가 프로젝트에 존재 **THEN** 기존 내용을 유지하면서 Tekton 섹션을 파일 끝에 append한다.

**S-003**: **IF** `PREMIUM_THEMES` 배열을 참조하는 코드가 있으면 **THEN** 실제 존재하는 6개 테마만 포함한다.

```typescript
export const PREMIUM_THEMES = [
  'classic-magazine',
  'dark-boldness',
  'minimal-workspace',
  'neutral-workspace',
  'pebble',
  'square-minimalism',
];
```

---

### Unwanted Requirements (금지 사항)

**W-001**: README에 실제 존재하지 않는 테마를 나열**하지 않아야 한다**.

- `calm-wellness`, `dynamic-fitness`, `korean-fintech`, `media-streaming`, `premium-editorial`, `saas-dashboard`, `warm-humanist` 제거
- `next-tailwind-shadcn`, `vite-tailwind-shadcn`, `next-styled-components`, `next-tailwind-radix`, `saas-modern`, `tech-startup` 제거

**W-002**: "Free Themes" 섹션이 존재**하지 않아야 한다**.

- 모든 테마가 인증 필수이므로 Free/Premium 구분을 제거한다
- "Themes (6)" 단일 섹션으로 통합한다

**W-003**: `init` 완료 후 인증 안내 없이 종료**하지 않아야 한다**.

- 현재: "Claude Code를 재시작하세요" -> "AI에게 요청하세요" (인증 미언급)
- 개선: "tekton-mcp login으로 인증하세요" -> "재시작하세요" -> "요청하세요"

---

### Optional Requirements (선택 사항)

**O-001**: **가능하면** MCP Inspector로 prompts 핸들러를 테스트하는 가이드를 plan.md에 포함한다.

**O-002**: **가능하면** 각 에이전트 플랫폼별 (Claude Code, OpenAI Codex, Cursor) 테스트 체크리스트를 acceptance.md에 포함한다.

---

## 기술 명세 (Technical Specifications)

### 1. MCP Prompts capability 추가 (`index.ts`)

Server 생성자의 capabilities에 `prompts: {}` 추가. `ListPromptsRequestSchema`와 `GetPromptRequestSchema` 핸들러를 등록한다.

```typescript
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
```

`prompts/list` 핸들러가 2개 프롬프트 메타데이터를 반환하고, `prompts/get` 핸들러가 name 파라미터에 따라 상세 가이드를 반환한다.

### 2. 프롬프트 콘텐츠 (`prompts/` 디렉토리)

2개 새 파일 생성:

- `prompts/getting-started.ts`: 인증 -> 테마 탐색 -> 화면 생성 전체 워크플로우 가이드 export
- `prompts/screen-workflow.ts`: 4단계 화면 생성 워크플로우 상세 가이드 export

### 3. Agent MD 템플릿 (`cli/agent-md-templates.ts`)

새 파일. CLAUDE.md용 Tekton 섹션 템플릿과 AGENTS.md용 Tekton 섹션 템플릿을 export한다.

```typescript
export function generateClaudeMdSection(framework: Framework): string;
export function generateAgentsMdSection(framework: Framework): string;
```

### 4. init 명령어 개선 (`cli/init.ts`)

기존 6단계를 8단계로 확장:

| 단계 | 현재                    | 개선                           |
| ---- | ----------------------- | ------------------------------ |
| 1/8  | 프로젝트 감지           | 프로젝트 감지 (동일)           |
| 2/8  | 패키지 설치             | 패키지 설치 (동일)             |
| 3/8  | Tailwind CSS 설정       | Tailwind CSS 설정 (동일)       |
| 4/8  | CSS 토큰 임포트         | CSS 토큰 임포트 (동일)         |
| 5/8  | MCP 설정                | MCP 설정 (동일)                |
| 6/8  | 가이드 문서 생성        | 가이드 문서 생성 (개선)        |
| 7/8  | -                       | **CLAUDE.md / AGENTS.md 설정** |
| 8/8  | -                       | **완료 + 인증 안내**           |

Step 7에서 `agent-md-templates.ts`의 함수를 호출하여 CLAUDE.md와 AGENTS.md를 생성/업데이트한다. Step 8에서 인증 안내를 포함한 완료 메시지를 출력한다.

### 5. 가이드 템플릿 개선 (`cli/guide-template.ts`)

TEKTON-GUIDE.md 템플릿에 다음 섹션 추가:

- **인증 (Authentication)** 섹션: `tekton-mcp login` 명령어 및 인증 플로우 설명
- **워크플로우 (Workflow)** 섹션: 4단계 화면 생성 워크플로우 요약

### 6. theme-access.ts 수정

`PREMIUM_THEMES` 배열을 실제 존재하는 6개 테마로 축소:

```typescript
export const PREMIUM_THEMES = [
  'classic-magazine',
  'dark-boldness',
  'minimal-workspace',
  'neutral-workspace',
  'pebble',
  'square-minimalism',
];
```

### 7. README.md 정비

- "Built-in Themes (13 Total)" -> "Themes (6)" 로 변경
- "Free Themes" / "Premium Themes" 구분 제거, 단일 "Themes" 섹션으로 통합
- 존재하지 않는 7개 테마 목록 삭제
- "13 built-in OKLCH-based themes" -> "6 OKLCH-based themes" 문구 수정
- `count: 13` 등 하드코딩된 수치 수정

### 8. 문서 동기화 (`docs/packages/mcp-server.md`)

- 기존에 올바르게 6개 테마만 나열되어 있으나, init 단계 설명을 6단계 -> 8단계로 업데이트
- 인증 섹션에 init 후 인증 필요성 강조 추가
- MCP Prompts 관련 설명 추가

### 9. 버전 범프 (6개 패키지 -> 0.3.2)

모든 workspace 패키지의 `package.json` version을 `0.3.2`로 업데이트:

- `packages/tokens/package.json`
- `packages/core/package.json`
- `packages/ui/package.json`
- `packages/styled/package.json`
- `packages/esbuild-plugin/package.json`
- `packages/mcp-server/package.json`

---

## 영향받는 파일 (9개)

| #  | 파일 경로                                              | 변경 유형 |
| -- | ------------------------------------------------------ | --------- |
| 1  | `packages/mcp-server/src/index.ts`                     | 수정      |
| 2  | `packages/mcp-server/src/prompts/getting-started.ts`   | 신규      |
| 3  | `packages/mcp-server/src/prompts/screen-workflow.ts`   | 신규      |
| 4  | `packages/mcp-server/src/cli/agent-md-templates.ts`    | 신규      |
| 5  | `packages/mcp-server/src/cli/init.ts`                  | 수정      |
| 6  | `packages/mcp-server/src/cli/guide-template.ts`        | 수정      |
| 7  | `packages/mcp-server/src/auth/theme-access.ts`         | 수정      |
| 8  | `packages/mcp-server/README.md`                        | 수정      |
| 9  | `docs/packages/mcp-server.md`                          | 수정      |

추가 파일 (버전 범프):

- `packages/tokens/package.json` (0.3.1 -> 0.3.2)
- `packages/core/package.json` (0.3.1 -> 0.3.2)
- `packages/ui/package.json` (0.3.1 -> 0.3.2)
- `packages/styled/package.json` (0.3.1 -> 0.3.2)
- `packages/esbuild-plugin/package.json` (0.3.1 -> 0.3.2)
- `packages/mcp-server/package.json` (0.3.1 -> 0.3.2)

---

## 참조 (References)

| SPEC ID         | 제목                                     | 관계        |
| --------------- | ---------------------------------------- | ----------- |
| SPEC-MCP-002    | MCP Server base implementation           | 기반 구현   |
| SPEC-MCP-003    | Component & Template Discovery Tools     | 도구 확장   |
| SPEC-MCP-004    | Screen Definition Schema                 | 스키마 참조 |
| SPEC-MCP-005    | Agent Workflow & Dependency Management   | 패턴 재사용 |
| SPEC-AUTH-001   | Supabase Authentication & License Check  | 인증 참조   |
| SPEC-DEPLOY-001 | Deployment                               | 테마 정책   |

---

## 태그 (Traceability)

- `[SPEC-MCP-006:U-001]` - MCP Prompts capability 선언
- `[SPEC-MCP-006:U-002]` - init 인증 안내
- `[SPEC-MCP-006:U-003]` - 테마 데이터 정확성
- `[SPEC-MCP-006:E-001]` - prompts/list 핸들러
- `[SPEC-MCP-006:E-002]` - prompts/get 핸들러
- `[SPEC-MCP-006:E-003]` - CLAUDE.md 자동 생성
- `[SPEC-MCP-006:E-004]` - AGENTS.md 자동 생성
- `[SPEC-MCP-006:E-005]` - 인증 포함 완료 메시지
- `[SPEC-MCP-006:S-001]` - 기존 CLAUDE.md append
- `[SPEC-MCP-006:S-002]` - 기존 AGENTS.md append
- `[SPEC-MCP-006:S-003]` - PREMIUM_THEMES 6개 제한
- `[SPEC-MCP-006:W-001]` - 가상 테마 제거
- `[SPEC-MCP-006:W-002]` - Free Themes 섹션 제거
- `[SPEC-MCP-006:W-003]` - 인증 없는 종료 금지
- `[SPEC-MCP-006:O-001]` - MCP Inspector 테스트 가이드
- `[SPEC-MCP-006:O-002]` - 플랫폼별 테스트 체크리스트
