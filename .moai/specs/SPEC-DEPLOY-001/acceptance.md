# SPEC-DEPLOY-001: Acceptance Criteria

## Phase 1: Infrastructure Foundation

### AC-1.1: Database Schema
- **Given** Supabase 프로젝트에 접근 가능할 때
- **When** 마이그레이션 스크립트를 실행하면
- **Then** user_profiles, api_keys, user_licenses 테이블이 생성되고 RLS 정책이 활성화된다
- **Verify**: `SELECT * FROM information_schema.tables WHERE table_schema = 'public'`로 3개 테이블 존재 확인

### AC-1.2: Environment Security
- **Given** 프로젝트 git 히스토리를 검사할 때
- **When** `.env.local`을 검색하면
- **Then** 커밋된 시크릿이 없어야 하며, `.gitignore`에 `.env.local`이 포함되어 있어야 한다
- **Verify**: `git log --all --full-history -- "*/.env.local" "**/.env.local"` 결과가 비어있어야 함

### AC-1.3: npm Package Build
- **Given** 프로젝트 루트에서
- **When** `pnpm --filter "./packages/*" build`를 실행하면
- **Then** 모든 6개 패키지가 에러 없이 빌드 완료된다
- **Verify**: 각 패키지의 `dist/` 디렉토리에 빌드 결과물 존재

### AC-1.4: Vercel Deployment
- **Given** Vercel 프로젝트가 설정되었을 때
- **When** master 브랜치에 푸시하면
- **Then** tekton-ui.com으로 접속 시 Next.js 앱이 정상 로딩된다
- **Verify**: `curl -I https://tekton-ui.com` 응답 코드 200, SSL 유효

---

## Phase 2: Auth Consolidation

### AC-2.1: NextAuth Removal
- **Given** NextAuth가 제거된 후
- **When** `pnpm --filter @tekton/playground-web build`를 실행하면
- **Then** next-auth 관련 import 에러 없이 빌드 성공한다
- **Verify**: `grep -r "next-auth" packages/playground-web/` 결과 없음

### AC-2.2: Supabase OAuth Login
- **Given** 인증되지 않은 사용자가
- **When** Google 또는 GitHub 로그인을 시도하면
- **Then** Supabase Auth를 통해 인증되고 /studio로 리다이렉트된다
- **Verify**: 브라우저에서 로그인 → Studio 페이지 접근 확인

### AC-2.3: API Key Creation
- **Given** 인증된 사용자가
- **When** POST /api/user/api-keys { name: "Test Key" }를 호출하면
- **Then** 평문 키(tk_live_xxx)가 반환되고, DB에 bcrypt 해시로 저장된다
- **Verify**: 응답의 key 필드가 `tk_live_`로 시작, DB의 key_hash가 `$2b$`로 시작

### AC-2.4: API Key Verification
- **Given** 유효한 API Key가 있을 때
- **When** GET /api/mcp/verify (Authorization: Bearer tk_live_xxx)를 호출하면
- **Then** { valid: true, licenses: [...] } 형태의 응답이 반환된다
- **Verify**: 응답 HTTP 200, valid === true

### AC-2.5: Invalid API Key Rejection
- **Given** 무효한 API Key를 사용할 때
- **When** GET /api/mcp/verify를 호출하면
- **Then** HTTP 401과 { valid: false, error: "Invalid API key" }가 반환된다
- **Verify**: 응답 HTTP 401

---

## Phase 3: Payment Integration

### AC-3.1: Paddle Webhook Signature
- **Given** Paddle 웹훅 요청이 도착할 때
- **When** 서명이 유효하면
- **Then** 이벤트를 처리하고 200을 반환한다
- **When** 서명이 무효하면
- **Then** 이벤트를 무시하고 403을 반환한다

### AC-3.2: License Creation on Purchase
- **Given** 사용자가 테마를 구매하고
- **When** transaction.completed 웹훅이 도착하면
- **Then** user_licenses에 새 레코드가 생성되고 is_active=true이다
- **Verify**: DB에서 `SELECT * FROM user_licenses WHERE paddle_transaction_id = 'txn_xxx'` 조회

### AC-3.3: License Deactivation on Refund
- **Given** 사용자가 환불을 요청하고
- **When** transaction.refunded 웹훅이 도착하면
- **Then** 해당 라이선스의 is_active가 false로 변경된다

### AC-3.4: Realtime UI Update
- **Given** 사용자가 결제 완료 후 웹앱에 있을 때
- **When** 라이선스가 생성되면
- **Then** 페이지 새로고침 없이 UI에 라이선스가 표시된다
- **Verify**: Supabase Realtime 채널 구독 확인

### AC-3.5: Webhook Idempotency
- **Given** 동일한 transaction_id를 가진 웹훅이
- **When** 2회 이상 도착하면
- **Then** 라이선스는 1개만 생성된다
- **Verify**: `SELECT count(*) FROM user_licenses WHERE paddle_transaction_id = 'txn_xxx'` = 1

---

## Phase 4: MCP + npm Publishing

### AC-4.1: MCP Server Without Auth
- **Given** TEKTON_API_KEY가 설정되지 않았을 때
- **When** `npx @tekton/mcp-server`를 실행하면
- **Then** 무료 테마와 기본 도구만 사용 가능하다
- **Verify**: MCP Inspector에서 free 테마만 list-themes에 표시

### AC-4.2: MCP Server With Auth
- **Given** 유효한 TEKTON_API_KEY가 설정되었을 때
- **When** MCP 서버를 실행하면
- **Then** 무료 + 구매 테마 도구가 모두 사용 가능하다
- **Verify**: 구매한 premium 테마가 preview-theme에서 접근 가능

### AC-4.3: API Key Dashboard
- **Given** 인증된 사용자가 프로필 페이지에 접근할 때
- **When** API Key 섹션을 확인하면
- **Then** 키 목록 조회, 새 키 생성, 키 삭제 기능이 모두 동작한다
- **Verify**: UI에서 키 생성 → 목록 표시 → 삭제 → 목록에서 사라짐

### AC-4.4: npm Install
- **Given** npm registry에 패키지가 퍼블리시된 후
- **When** `npm install @tekton/mcp-server`를 실행하면
- **Then** 패키지가 정상 설치되고 `tekton-mcp` CLI가 사용 가능하다
- **Verify**: `npx @tekton/mcp-server --version` 출력 확인

### AC-4.5: Automated npm Publish
- **Given** master 브랜치에 v* 태그를 푸시할 때
- **When** GitHub Actions가 실행되면
- **Then** 6개 패키지가 순서대로 npm에 퍼블리시된다
- **Verify**: npmjs.com에서 각 패키지 확인

---

## Phase 5: Launch Verification

### AC-5.1: Full User Journey
- **Given** 새로운 사용자가
- **When** 가입 → 로그인 → 테마 브라우징 → 결제 → API Key 발급 → MCP 설치를 순서대로 수행하면
- **Then** 전체 여정이 에러 없이 완료된다
- **Verify**: Playwright E2E 테스트 통과

### AC-5.2: Performance
- **Given** tekton-ui.com이 프로덕션 배포된 후
- **When** Lighthouse 테스트를 실행하면
- **Then** Performance 80+, Accessibility 90+ 점수를 달성한다

### AC-5.3: SSL & Domain
- **Given** tekton-ui.com 도메인이 설정된 후
- **When** HTTPS로 접속하면
- **Then** 유효한 SSL 인증서와 함께 정상 로딩된다
- **Verify**: `curl -vI https://tekton-ui.com 2>&1 | grep "SSL certificate verify ok"`
