# SPEC-DEPLOY-001: Implementation Plan

## Execution Strategy

### Phase Dependencies

```
Phase 1 (인프라) ──► Phase 2 (인증) ──► Phase 3 (결제) ──► Phase 5 (출시)
                                    └──► Phase 4 (MCP) ──┘
```

- Phase 2, 3, 4는 Phase 1 완료 후 시작
- Phase 3과 Phase 4는 병렬 진행 가능 (독립적)
- Phase 5는 Phase 2, 3, 4 모두 완료 후 시작

### Agent Assignment

| Phase | Primary Agent | Supporting Agent |
|-------|--------------|-----------------|
| Phase 1 | expert-backend | expert-security, expert-devops |
| Phase 2 | expert-backend | expert-security |
| Phase 3 | expert-backend | expert-frontend |
| Phase 4 | expert-backend, expert-frontend | expert-devops |
| Phase 5 | expert-testing | expert-devops, manager-quality |

### Manual Steps (soo-kate-yeon)

개발자가 직접 수행해야 하는 항목:

| # | 항목 | Phase | 이유 |
|---|------|-------|------|
| M1 | @tekton npm org 생성 | P1 | npm 계정 인증 필요 |
| M2 | NPM_TOKEN 발급 → GitHub Secrets 등록 | P1 | npm 계정 인증 필요 |
| M3 | Vercel 프로젝트 생성 | P1 | Vercel 계정 인증 필요 |
| M4 | tekton-ui.com DNS 설정 | P1 | 도메인 레지스트라 접근 필요 |
| M5 | Vercel 환경변수 설정 | P1 | Vercel Dashboard 접근 필요 |
| M6 | Paddle 계정 생성 + Product 설정 | P3 | Paddle 계정 인증 필요 |
| M7 | Paddle 웹훅 URL + 시크릿 설정 | P3 | Paddle Dashboard 접근 필요 |
| M8 | Supabase OAuth Provider 설정 확인 | P2 | Supabase Dashboard 접근 필요 |
| M9 | Production 최종 배포 승인 | P5 | 최종 검증 후 수동 배포 |

---

## Phase 1: Infrastructure Foundation

### Step 1.1: Database Migration

**실행 방법**: Supabase Dashboard SQL Editor 또는 Supabase CLI

```bash
# Supabase CLI 사용 시
supabase db push
# 또는 Dashboard에서 SQL 직접 실행
```

**파일 생성**:
- `supabase/migrations/001_user_profiles.sql`
- `supabase/migrations/002_api_keys.sql`
- `supabase/migrations/003_user_licenses.sql`

**Agent**: expert-backend
**의존성**: 없음

### Step 1.2: Environment Security Audit

**작업 항목**:
1. `.gitignore` 확인: `.env.local`, `.env*.local` 포함 여부
2. git history 검사: `git log --all --full-history -- "**/.env.local"`
3. 노출 시: 모든 키 회전 (Supabase, OAuth, Auth Secret)
4. `.env.example` 업데이트

**Agent**: expert-security
**의존성**: 없음

### Step 1.3: npm Package Configuration

**작업 항목**:
1. 각 패키지 `package.json`에 publishConfig, files, repository 추가
2. 각 패키지 빌드 테스트
3. `pnpm pack` 으로 퍼블리시 결과물 확인

**Agent**: expert-backend
**의존성**: 없음

### Step 1.4: Vercel Setup

**Manual (soo-kate-yeon)**:
1. Vercel 프로젝트 생성 (Import from GitHub)
2. Root Directory: `packages/playground-web`
3. Framework Preset: Next.js
4. tekton-ui.com 도메인 연결
5. 환경변수 설정

---

## Phase 2: Auth Consolidation

### Step 2.1: Remove NextAuth

**순서**:
1. `next-auth` 패키지 제거
2. `lib/auth.ts` 삭제
3. `app/api/auth/[...nextauth]/route.ts` 삭제
4. `providers.tsx`에서 SessionProvider 제거
5. 미들웨어를 Supabase 세션 기반으로 교체
6. 전체 import 정리

**Agent**: expert-backend
**의존성**: Phase 1 완료

### Step 2.2: API Key CRUD

**순서**:
1. `app/api/user/api-keys/route.ts` 생성 (GET, POST)
2. `app/api/user/api-keys/[id]/route.ts` 생성 (DELETE)
3. bcrypt 해시 유틸리티 (lib/auth/api-key.ts)
4. 랜덤 키 생성 유틸리티

**Agent**: expert-backend
**의존성**: Step 2.1

### Step 2.3: MCP Verify Endpoint

**순서**:
1. `app/api/mcp/verify/route.ts` 생성
2. API Key → bcrypt 비교
3. user_licenses 조회
4. 무료/유료 테마 분류
5. Rate limiting (옵션)

**Agent**: expert-backend
**의존성**: Step 2.2

---

## Phase 3: Payment Integration (Phase 2와 병렬 가능)

### Step 3.1: Paddle SDK Setup

**순서**:
1. `@paddle/paddle-js` (클라이언트) 설치
2. `@paddle/paddle-node-sdk` (서버) 설치
3. Paddle 초기화 코드 (`lib/paddle/client.ts`, `lib/paddle/server.ts`)

**Agent**: expert-backend
**의존성**: Phase 1 완료

### Step 3.2: Webhook Handler

**순서**:
1. `app/api/webhooks/paddle/route.ts` 생성
2. 서명 검증 미들웨어
3. 이벤트별 핸들러 (transaction.completed, subscription.*, refund)
4. Idempotency 처리

**Agent**: expert-backend
**의존성**: Step 3.1

### Step 3.3: Checkout UI

**순서**:
1. 테마 상세 페이지에 가격/구매 버튼 추가
2. Paddle.js Checkout 오버레이 통합
3. 결제 후 라이선스 확인 UI

**Agent**: expert-frontend
**의존성**: Step 3.1

### Step 3.4: Realtime Subscription

**순서**:
1. AuthContext에 Supabase Realtime 채널 추가
2. user_licenses INSERT 이벤트 구독
3. UI 즉시 업데이트

**Agent**: expert-frontend
**의존성**: Step 3.2

---

## Phase 4: MCP + npm (Phase 3과 병렬 가능)

### Step 4.1: MCP Auth Layer

**순서**:
1. `packages/mcp-server/src/auth/verify.ts` 생성
2. 서버 시작 시 API Key 검증
3. 라이선스 캐시 (5분 TTL)
4. 테마 도구 필터링 로직

**Agent**: expert-backend
**의존성**: Phase 2 완료 (verify 엔드포인트 필요)

### Step 4.2: API Key Dashboard

**순서**:
1. `/profile` 또는 `/settings/api-keys` 페이지 생성
2. API Key 목록 컴포넌트
3. 키 생성 모달 (이름 입력 + 결과 표시)
4. Claude Desktop 설정 스니펫 생성
5. 키 삭제 확인 다이얼로그

**Agent**: expert-frontend
**의존성**: Phase 2 완료

### Step 4.3: npm Publish Workflow

**순서**:
1. `.github/workflows/npm-publish.yml` 생성
2. 의존 순서 빌드 + 퍼블리시
3. 로컬에서 `pnpm pack`으로 검증
4. 첫 publish는 수동 (`pnpm publish --access public`)

**Agent**: expert-devops
**의존성**: Phase 1 npm 설정 완료

---

## Phase 5: Launch

### Step 5.1: E2E Tests

**Playwright 테스트 시나리오**:
10개 시나리오를 `packages/playground-web/tests/e2e/` 에 작성

**Agent**: expert-testing
**의존성**: Phase 2, 3, 4 모두 완료

### Step 5.2: Staging Verification

**체크리스트**:
- [ ] dev.tekton-ui.com 접속 확인
- [ ] OAuth 로그인 (Google, GitHub)
- [ ] Paddle Sandbox 결제
- [ ] API Key 발급 + MCP 서버 인증
- [ ] Lighthouse 점수 확인

### Step 5.3: Production Deploy

**체크리스트**:
- [ ] master 머지
- [ ] Vercel Production 빌드 성공
- [ ] tekton-ui.com SSL 확인
- [ ] Paddle Production 전환
- [ ] npm v0.2.0 태그 + publish
- [ ] 전체 여정 수동 검증

---

## Parallel Execution Map

```
Week 1:
├─ Phase 1 전체 (1-2일)
│   ├─ [P] DB Migration
│   ├─ [P] Security Audit
│   ├─ [P] npm Config
│   └─ [M] Vercel + Domain (Manual)
│
├─ Phase 2 시작 (Phase 1 완료 후)
│   └─ NextAuth 제거

Week 2:
├─ Phase 2 계속
│   ├─ API Key CRUD
│   └─ /api/mcp/verify
│
├─ Phase 3 시작 (Phase 1 완료 후, Phase 2와 병렬)  ← 병렬!
│   ├─ [M] Paddle 설정 (Manual)
│   ├─ Webhook Handler
│   └─ Checkout UI
│
├─ Phase 4 시작 (Phase 2 완료 후)
│   ├─ MCP Auth Layer
│   ├─ API Key Dashboard
│   └─ npm Publish Workflow

Week 3:
├─ Phase 3 완료 (Realtime)
├─ Phase 4 완료 (Dashboard)
└─ Phase 5: Launch
    ├─ E2E Tests
    ├─ Staging Verification
    └─ Production Deploy

[P] = Parallel (병렬 가능)
[M] = Manual (수동 작업)
```
