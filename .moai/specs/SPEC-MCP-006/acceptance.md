---
spec_id: SPEC-MCP-006
type: acceptance
version: "1.0.0"
created: "2026-02-09"
---

# SPEC-MCP-006 인수 기준

## 시나리오 1: MCP Prompts 동작 검증

**태그**: `[SPEC-MCP-006:U-001]`, `[SPEC-MCP-006:E-001]`, `[SPEC-MCP-006:E-002]`

```gherkin
Scenario: prompts/list 호출 시 2개 프롬프트 반환
  Given MCP 서버가 실행 중일 때
  When MCP 클라이언트가 prompts/list를 호출하면
  Then 2개의 프롬프트가 반환된다
  And 첫 번째 프롬프트의 name은 "tekton-getting-started"이다
  And 두 번째 프롬프트의 name은 "tekton-screen-workflow"이다
  And 각 프롬프트에 description이 포함되어 있다

Scenario: prompts/get으로 getting-started 가이드 조회
  Given MCP 서버가 실행 중일 때
  When MCP 클라이언트가 prompts/get으로 name="tekton-getting-started"를 요청하면
  Then messages 배열이 반환된다
  And 첫 번째 message의 role은 "user"이다
  And content에 인증(tekton-mcp login) 안내가 포함되어 있다
  And content에 테마 탐색(list-themes) 안내가 포함되어 있다
  And content에 화면 생성(get-screen-generation-context) 안내가 포함되어 있다

Scenario: prompts/get으로 screen-workflow 가이드 조회
  Given MCP 서버가 실행 중일 때
  When MCP 클라이언트가 prompts/get으로 name="tekton-screen-workflow"를 요청하면
  Then messages 배열이 반환된다
  And content에 Step 1: get-screen-generation-context 설명이 포함되어 있다
  And content에 Step 2: validate-screen-definition 설명이 포함되어 있다
  And content에 Step 3: generate_screen 설명이 포함되어 있다
  And content에 Step 4: validate-environment 설명이 포함되어 있다

Scenario: 존재하지 않는 프롬프트 요청 시 에러 반환
  Given MCP 서버가 실행 중일 때
  When MCP 클라이언트가 prompts/get으로 name="nonexistent-prompt"를 요청하면
  Then 에러 응답이 반환된다
  And 사용 가능한 프롬프트 목록이 에러 메시지에 포함되어 있다
```

---

## 시나리오 2: init 명령어 개선 검증

**태그**: `[SPEC-MCP-006:E-003]`, `[SPEC-MCP-006:E-004]`, `[SPEC-MCP-006:E-005]`, `[SPEC-MCP-006:U-002]`, `[SPEC-MCP-006:W-003]`

```gherkin
Scenario: 새 프로젝트에서 init 실행 시 8단계 완료
  Given 새 프로젝트 디렉토리에서 (package.json, next.config.ts 존재)
  When npx @tekton-ui/mcp-server init을 실행하면
  Then 총 8단계가 순차적으로 실행된다
  And [7/8] 단계에서 CLAUDE.md에 Tekton 섹션이 추가된다
  And [7/8] 단계에서 AGENTS.md 파일이 생성된다
  And [7/8] 단계에서 TEKTON-GUIDE.md 파일이 생성된다
  And 완료 메시지의 첫 번째 다음 단계가 "tekton-mcp login"이다
  And 완료 메시지에 인증이 필요한 이유가 포함되어 있다

Scenario: 기존 CLAUDE.md가 있는 프로젝트에서 init 실행
  Given 기존 CLAUDE.md가 있는 프로젝트에서 ("# My Project" 내용 포함)
  When npx @tekton-ui/mcp-server init을 실행하면
  Then 기존 CLAUDE.md의 "# My Project" 내용이 유지된다
  And CLAUDE.md 파일 끝에 "## Tekton Design System" 섹션이 추가된다
  And Tekton 섹션에 MCP 도구 목록이 포함되어 있다
  And Tekton 섹션에 워크플로우 가이드가 포함되어 있다

Scenario: 기존 AGENTS.md가 있는 프로젝트에서 init 실행
  Given 기존 AGENTS.md가 있는 프로젝트에서 ("# Agent Instructions" 내용 포함)
  When npx @tekton-ui/mcp-server init을 실행하면
  Then 기존 AGENTS.md의 "# Agent Instructions" 내용이 유지된다
  And AGENTS.md 파일 끝에 Tekton 섹션이 추가된다

Scenario: 이미 Tekton 섹션이 있는 CLAUDE.md에서 init 실행
  Given CLAUDE.md에 이미 "## Tekton Design System" 섹션이 있는 프로젝트에서
  When npx @tekton-ui/mcp-server init을 실행하면
  Then CLAUDE.md에 Tekton 섹션이 중복으로 추가되지 않는다
  And "이미 설정됨, skip" 메시지가 출력된다
```

---

## 시나리오 3: 테마 데이터 정확성 검증

**태그**: `[SPEC-MCP-006:U-003]`, `[SPEC-MCP-006:S-003]`, `[SPEC-MCP-006:W-001]`, `[SPEC-MCP-006:W-002]`

```gherkin
Scenario: PREMIUM_THEMES 배열 정확성
  Given theme-access.ts 파일에서
  When PREMIUM_THEMES 배열을 확인하면
  Then 정확히 6개 테마만 포함되어 있다
  And "classic-magazine"이 포함되어 있다
  And "equinox-fitness"이 포함되어 있다
  And "minimal-workspace"이 포함되어 있다
  And "neutral-humanism"이 포함되어 있다
  And "round-minimal"이 포함되어 있다
  And "square-minimalism"이 포함되어 있다
  And "calm-wellness"이 포함되어 있지 않다
  And "dynamic-fitness"이 포함되어 있지 않다
  And "korean-fintech"이 포함되어 있지 않다
  And "media-streaming"이 포함되어 있지 않다
  And "premium-editorial"이 포함되어 있지 않다
  And "saas-dashboard"이 포함되어 있지 않다
  And "warm-humanist"이 포함되어 있지 않다

Scenario: README.md 테마 섹션 정확성
  Given README.md 파일에서
  When 테마 관련 섹션을 확인하면
  Then "13"이라는 숫자가 테마 수 컨텍스트에서 나타나지 않는다
  And "Free Themes" 섹션이 존재하지 않는다
  And "Premium Themes" 섹션이 존재하지 않는다
  And 6개 테마만 나열되어 있다
  And 모든 테마에 인증이 필요하다는 안내가 있다

Scenario: README.md에서 존재하지 않는 테마 제거 확인
  Given README.md 파일에서
  When grep으로 "calm-wellness"을 검색하면
  Then 0건이 반환된다
  When grep으로 "dynamic-fitness"을 검색하면
  Then 0건이 반환된다
  When grep으로 "korean-fintech"을 검색하면
  Then 0건이 반환된다
  When grep으로 "next-tailwind-shadcn"을 검색하면
  Then 0건이 반환된다 (테마 목록 섹션에서)
```

---

## 시나리오 4: 크로스 플랫폼 호환성 검증

**태그**: `[SPEC-MCP-006:E-003]`, `[SPEC-MCP-006:E-004]`

```gherkin
Scenario: CLAUDE.md로 Claude Code 자동 로드 검증
  Given init으로 생성된 CLAUDE.md 파일에서
  When Claude Code가 세션을 시작하면
  Then Tekton MCP 워크플로우 가이드가 자동으로 로드된다
  And MCP 도구 목록이 컨텍스트에 포함된다
  And 인증 안내가 컨텍스트에 포함된다

Scenario: AGENTS.md로 OpenAI Codex 자동 로드 검증
  Given init으로 생성된 AGENTS.md 파일에서
  When OpenAI Codex가 세션을 시작하면
  Then Tekton MCP 워크플로우 가이드가 자동으로 로드된다
  And 화면 생성 4단계 워크플로우가 포함된다

Scenario: MCP Prompts로 범용 MCP 클라이언트 지원 검증
  Given MCP 서버가 prompts capability를 선언한 상태에서
  When 범용 MCP 클라이언트가 prompts/list를 호출하면
  Then 사용 가능한 2개 프롬프트가 반환된다
  And 클라이언트가 이를 사용자에게 표시할 수 있다

Scenario: CLAUDE.md 템플릿 콘텐츠 검증
  Given agent-md-templates.ts의 generateClaudeMdSection 함수에서
  When framework="nextjs"로 호출하면
  Then "## Tekton Design System" 헤딩이 포함된다
  And MCP 도구 목록 (16개 도구)이 나열되어 있다
  And 인증 절차 (tekton-mcp login)가 포함되어 있다
  And 화면 생성 워크플로우 (4단계)가 요약되어 있다

Scenario: AGENTS.md 템플릿 콘텐츠 검증
  Given agent-md-templates.ts의 generateAgentsMdSection 함수에서
  When framework="nextjs"로 호출하면
  Then Tekton MCP 도구 사용법이 포함되어 있다
  And 인증 절차가 포함되어 있다
  And 에이전트에게 화면 생성 워크플로우가 안내되어 있다
```

---

## 시나리오 5: 버전 범프 검증

**태그**: `[SPEC-MCP-006]`

```gherkin
Scenario: 6개 패키지 버전 0.3.2 업데이트 확인
  Given 모든 수정이 완료된 후
  When 6개 패키지의 package.json을 확인하면
  Then packages/tokens/package.json의 version은 "0.3.2"이다
  And packages/core/package.json의 version은 "0.3.2"이다
  And packages/ui/package.json의 version은 "0.3.2"이다
  And packages/styled/package.json의 version은 "0.3.2"이다
  And packages/esbuild-plugin/package.json의 version은 "0.3.2"이다
  And packages/mcp-server/package.json의 version은 "0.3.2"이다

Scenario: MCP 서버 빌드 성공 확인
  Given 모든 수정이 완료된 후
  When pnpm --filter @tekton-ui/mcp-server build를 실행하면
  Then 빌드가 성공한다
  And TypeScript 컴파일 에러가 0개이다
  And dist/ 디렉토리에 index.js가 생성된다
  And dist/prompts/ 디렉토리에 getting-started.js가 생성된다
  And dist/prompts/ 디렉토리에 screen-workflow.js가 생성된다
  And dist/cli/agent-md-templates.js가 생성된다
```

---

## 시나리오 6: 가이드 템플릿 개선 검증

**태그**: `[SPEC-MCP-006:U-002]`, `[SPEC-MCP-006:W-003]`

```gherkin
Scenario: TEKTON-GUIDE.md에 인증 섹션 포함
  Given guide-template.ts의 generateGuide 함수에서
  When framework="nextjs"로 호출하면
  Then 반환된 문자열에 "## Authentication" 또는 "## 인증" 섹션이 포함된다
  And "tekton-mcp login" 명령어가 포함되어 있다
  And 모든 테마에 인증이 필요하다는 안내가 있다

Scenario: TEKTON-GUIDE.md에 워크플로우 섹션 포함
  Given guide-template.ts의 generateGuide 함수에서
  When 아무 framework로 호출하면
  Then 반환된 문자열에 화면 생성 워크플로우 섹션이 포함된다
  And get-screen-generation-context 단계가 언급되어 있다
  And validate-screen-definition 단계가 언급되어 있다
  And generate_screen 단계가 언급되어 있다
```

---

## 품질 게이트 (Quality Gate)

### 필수 통과 조건

| 항목                          | 기준                                     | 검증 방법                                          |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------- |
| TypeScript 컴파일             | 에러 0개                                 | `pnpm --filter @tekton-ui/mcp-server build`        |
| MCP Prompts 응답              | prompts/list, prompts/get 정상 응답      | MCP Inspector 또는 단위 테스트                     |
| init 명령                     | 8단계 모두 실행                          | 새 프로젝트에서 init 실행 후 파일 확인             |
| CLAUDE.md 생성                | Tekton 섹션 포함                         | init 후 CLAUDE.md 내용 확인                        |
| AGENTS.md 생성                | Tekton 섹션 포함                         | init 후 AGENTS.md 내용 확인                        |
| README "free theme" 제거      | grep "free theme" README.md -> 0건       | `grep -i "free theme" README.md`                   |
| README "13" 테마 수 제거      | 테마 수 컨텍스트에서 "13" -> 0건         | `grep "13" README.md` (테마 관련 라인만 확인)      |
| PREMIUM_THEMES                | 정확히 6개                               | `grep -c "'" theme-access.ts` (테마 문자열 수 확인) |
| 버전 범프                     | 6개 패키지 모두 0.3.2                    | `grep '"version"' packages/*/package.json`         |
| 인증 안내                     | init 완료 메시지에 포함                  | init 출력에서 "tekton-mcp login" 확인              |

### 선택 통과 조건

| 항목                          | 기준                                     | 검증 방법                                          |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------- |
| MCP Inspector 테스트          | prompts 핸들러 수동 테스트 통과          | `pnpm inspect` 후 브라우저에서 확인                |
| 플랫폼별 테스트               | Claude Code, Codex에서 가이드 로드 확인  | 각 플랫폼에서 세션 시작 후 컨텍스트 확인           |

### Definition of Done

- [ ] MCP Prompts capability 선언 및 핸들러 등록 완료
- [ ] 2개 프롬프트 콘텐츠 파일 생성 완료
- [ ] agent-md-templates.ts 생성 완료 (CLAUDE.md + AGENTS.md 템플릿)
- [ ] init 명령어 8단계 확장 완료
- [ ] guide-template.ts 인증 + 워크플로우 섹션 추가 완료
- [ ] theme-access.ts PREMIUM_THEMES 6개로 축소 완료
- [ ] README.md 테마 데이터 정비 완료 (13 -> 6, Free/Premium 통합)
- [ ] docs/packages/mcp-server.md 동기화 완료
- [ ] 6개 패키지 v0.3.2 버전 범프 완료
- [ ] TypeScript 빌드 성공 (에러 0개)
- [ ] 모든 필수 품질 게이트 통과
