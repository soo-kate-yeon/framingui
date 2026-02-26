---
spec_id: SPEC-MCP-006
type: plan
version: "1.0.0"
created: "2026-02-09"
---

# SPEC-MCP-006 구현 계획

## 실행 순서 (11단계)

### 1단계: MCP Prompts 콘텐츠 파일 생성 [Priority High]

**태그**: `[SPEC-MCP-006:E-001]`, `[SPEC-MCP-006:E-002]`

새 디렉토리 및 파일 생성:

- `packages/mcp-server/src/prompts/getting-started.ts`
  - `getGettingStartedPrompt()` 함수 export
  - 인증 -> 테마 탐색 -> 컴포넌트 확인 -> 화면 생성 전체 워크플로우 가이드 반환
  - MCP Prompt 응답 형식: `{ messages: [{ role: 'user', content: { type: 'text', text: string } }] }`

- `packages/mcp-server/src/prompts/screen-workflow.ts`
  - `getScreenWorkflowPrompt()` 함수 export
  - 4단계 화면 생성 워크플로우 상세 가이드 반환
  - Step 1: `get-screen-generation-context` -> Step 2: `validate-screen-definition` -> Step 3: `generate_screen` -> Step 4: `validate-environment`

### 2단계: index.ts 수정 - MCP Prompts capability + 핸들러 [Priority High]

**태그**: `[SPEC-MCP-006:U-001]`, `[SPEC-MCP-006:E-001]`, `[SPEC-MCP-006:E-002]`

수정 내용:

1. import 추가:
   ```typescript
   import { ListPromptsRequestSchema, GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';
   import { getGettingStartedPrompt } from './prompts/getting-started.js';
   import { getScreenWorkflowPrompt } from './prompts/screen-workflow.js';
   ```

2. capabilities에 `prompts: {}` 추가:
   ```typescript
   capabilities: {
     tools: {},
     prompts: {},
   }
   ```

3. `ListPromptsRequestSchema` 핸들러 등록:
   - 2개 프롬프트 메타데이터 반환 (`tekton-getting-started`, `tekton-screen-workflow`)

4. `GetPromptRequestSchema` 핸들러 등록:
   - name 파라미터에 따라 해당 프롬프트 콘텐츠 반환

### 3단계: agent-md-templates.ts 새 파일 생성 [Priority High]

**태그**: `[SPEC-MCP-006:E-003]`, `[SPEC-MCP-006:E-004]`

`packages/mcp-server/src/cli/agent-md-templates.ts` 생성:

- `generateClaudeMdSection(framework: Framework): string`
  - Tekton MCP 도구 목록, 워크플로우, 인증 안내 포함
  - `## Tekton Design System` 헤딩으로 시작하여 기존 CLAUDE.md에 append 가능한 형식

- `generateAgentsMdSection(framework: Framework): string`
  - OpenAI Codex / 범용 에이전트용 Tekton 워크플로우 가이드
  - MCP 도구 사용법, 인증 절차, 화면 생성 워크플로우 포함

### 4단계: guide-template.ts 수정 [Priority Medium]

**태그**: `[SPEC-MCP-006:U-002]`, `[SPEC-MCP-006:W-003]`

TEKTON-GUIDE.md 템플릿에 추가:

- **Authentication** 섹션:
  ```markdown
  ## Authentication

  모든 테마는 인증이 필요합니다. 다음 명령어로 인증하세요:

  ```bash
  tekton-mcp login
  ```
  ```

- **Screen Generation Workflow** 섹션:
  - 4단계 워크플로우 요약 (get-screen-generation-context -> validate -> generate -> validate-environment)

### 5단계: init.ts 수정 - 8단계 확장 [Priority High]

**태그**: `[SPEC-MCP-006:E-003]`, `[SPEC-MCP-006:E-004]`, `[SPEC-MCP-006:E-005]`, `[SPEC-MCP-006:S-001]`, `[SPEC-MCP-006:S-002]`

변경 사항:

1. `totalSteps`를 6에서 8로 변경
2. Step 7 추가: `setupAgentMd(cwd, framework)`
   - CLAUDE.md 처리: 기존 파일 존재 시 Tekton 섹션 append, 없으면 새로 생성
   - AGENTS.md 처리: 기존 파일 존재 시 Tekton 섹션 append, 없으면 새로 생성
3. Step 8: `printSuccess()` 개선
   - 인증 안내를 다음 단계의 첫 번째 항목으로 추가
   - "1. `tekton-mcp login`으로 인증하세요"
   - "2. Claude Code를 재시작하세요"
   - "3. AI에게 요청하세요: 로그인 화면 만들어줘"

### 6단계: theme-access.ts 수정 [Priority High]

**태그**: `[SPEC-MCP-006:U-003]`, `[SPEC-MCP-006:S-003]`

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

### 7단계: README.md 수정 [Priority High]

**태그**: `[SPEC-MCP-006:W-001]`, `[SPEC-MCP-006:W-002]`

수정 항목:

1. "13 built-in OKLCH-based themes" -> "6 OKLCH-based themes"
2. "Built-in Themes (13 Total)" 섹션 -> "Themes (6)" 섹션으로 변경
3. "Free Themes" / "Premium Themes" 구분 삭제, 단일 "Themes (6)" 섹션으로 통합
4. 존재하지 않는 테마 7개 삭제
5. `count: 13` 하드코딩 수치 수정
6. Authentication 섹션에서 "Free Themes (No authentication required)" 제거
7. 모든 테마가 인증 필수임을 명시
8. init 명령어 섹션의 단계 수를 6 -> 8로 업데이트
9. MCP Prompts capability 관련 설명 추가

### 8단계: docs/packages/mcp-server.md 수정 [Priority Medium]

**태그**: `[SPEC-MCP-006:W-001]`, `[SPEC-MCP-006:U-002]`

수정 항목:

1. init 명령어 설명을 6단계 -> 8단계로 업데이트
2. Step 7 (CLAUDE.md / AGENTS.md 설정) 및 Step 8 (인증 안내) 추가
3. 인증 섹션에 init 후 인증 필요성 강조
4. MCP Prompts 기능 설명 추가

### 9단계: 전체 패키지 0.3.2 버전 범프 [Priority Medium]

6개 패키지의 `package.json` version 필드를 `0.3.2`로 업데이트:

| 패키지                      | 현재 버전 | 목표 버전 |
| --------------------------- | --------- | --------- |
| `@framingui/tokens`         | 0.3.1     | 0.3.2     |
| `@framingui/core`           | 0.3.1     | 0.3.2     |
| `@framingui/ui`             | 0.3.1     | 0.3.2     |
| `@framingui/styled`         | 0.3.1     | 0.3.2     |
| `@framingui/esbuild-plugin` | 0.3.1     | 0.3.2     |
| `@framingui/mcp-server`     | 0.3.1     | 0.3.2     |

### 10단계: 빌드 검증 [Priority High]

```bash
pnpm --filter @framingui/mcp-server build
```

TypeScript 컴파일 에러 0개 확인.

### 11단계: 커밋 + 푸시 + v0.3.2 태그 [Priority Medium]

```bash
git add .
git commit -m "feat(mcp-server): 사용자 온보딩 전면 개선 + v0.3.2

- MCP Prompts capability 추가 (prompts/list, prompts/get)
- init 명령: CLAUDE.md/AGENTS.md 자동 생성, 인증 안내 포함
- PREMIUM_THEMES 13개 -> 6개로 정비 (실재 테마만)
- README 테마 수 수정 (13 -> 6), Free/Premium 구분 제거
- 전체 패키지 v0.3.2 버전 범프

SPEC: SPEC-MCP-006"

git tag v0.3.2
git push origin master --tags
```

---

## 기술 스택

| 기술                          | 버전       | 용도                              |
| ----------------------------- | ---------- | --------------------------------- |
| `@modelcontextprotocol/sdk`   | ^1.26.0    | MCP Prompts 핸들러 (ListPromptsRequestSchema, GetPromptRequestSchema) |
| TypeScript                    | ^5.7.3     | strict mode 컴파일                |
| Node.js                       | >=20.0.0   | 런타임                            |
| Vitest                        | ^2.1.8     | 테스트                            |

### MCP SDK Prompts API 참조

`@modelcontextprotocol/sdk` v1.26.0에서 사용하는 핵심 스키마:

- `ListPromptsRequestSchema`: `prompts/list` 요청 처리
- `GetPromptRequestSchema`: `prompts/get` 요청 처리 (name 파라미터)

Prompt 응답 형식:

```typescript
// prompts/list 응답
{
  prompts: [
    {
      name: 'tekton-getting-started',
      description: 'Tekton Design System 시작 가이드',
    },
    {
      name: 'tekton-screen-workflow',
      description: '화면 생성 4단계 워크플로우',
    },
  ]
}

// prompts/get 응답
{
  messages: [
    {
      role: 'user',
      content: {
        type: 'text',
        text: '... 상세 가이드 ...',
      },
    },
  ]
}
```

---

## 위험 분석

| 위험                                    | 심각도 | 대응 방안                                  |
| --------------------------------------- | ------ | ------------------------------------------ |
| MCP Prompts가 SDK 1.26.0+에서만 지원    | 중     | package.json의 SDK 버전 확인 (현재 ^1.26.0으로 충족) |
| init 단계 수 변경으로 기존 테스트 실패   | 중     | init 관련 테스트가 있다면 totalSteps 수정 필요 |
| README 대량 수정으로 링크 깨짐 가능      | 하     | 모든 내부/외부 링크 정상 작동 확인          |
| CLAUDE.md append 시 기존 내용 손상       | 중     | 파일 읽기 -> Tekton 섹션 존재 여부 확인 -> 없으면 append |
| 일부 MCP 클라이언트가 prompts를 미지원   | 하     | prompts는 선택적 capability이므로 기존 tools 기능에 영향 없음 |

---

## 의존성

| 의존 SPEC      | 상태   | 관계                                       |
| -------------- | ------ | ------------------------------------------ |
| SPEC-MCP-005   | 완료   | 워크플로우 가이드 패턴 재사용              |
| SPEC-AUTH-001  | draft  | 인증 플로우 참조 (안내 메시지만, 코드 변경 없음) |
| SPEC-DEPLOY-001| 완료   | 모든 테마 유료 정책 근거                   |

---

## 마일스톤

**Primary Goal (주요 목표)**:
- 1~6단계 완료: MCP Prompts, init 개선, 테마 데이터 정비

**Secondary Goal (부차 목표)**:
- 7~8단계 완료: README/문서 동기화

**Final Goal (최종 목표)**:
- 9~11단계 완료: 버전 범프, 빌드 검증, 릴리스
