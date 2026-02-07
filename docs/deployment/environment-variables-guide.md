# 환경변수 설정 가이드

SPEC-DEPLOY-001을 위한 Vercel 배포 환경변수 설정 가이드입니다.

## 목차

- [1. 환경변수 개요](#1-환경변수-개요)
- [2. Production vs Preview 환경변수](#2-production-vs-preview-환경변수)
- [3. Vercel Dashboard 설정 방법](#3-vercel-dashboard-설정-방법)
- [4. 로컬 개발 환경 설정](#4-로컬-개발-환경-설정)
- [5. 보안 모범 사례](#5-보안-모범-사례)
- [6. 문제 해결](#6-문제-해결)

---

## 1. 환경변수 개요

### 1.1 환경변수 분류

Tekton 프로젝트는 다음과 같은 환경변수 카테고리를 사용합니다:

| 카테고리 | 설명 | 예시 |
|---------|------|------|
| **Supabase 인증** | 사용자 인증 및 데이터베이스 연결 | `NEXT_PUBLIC_SUPABASE_URL` |
| **앱 설정** | 애플리케이션 기본 설정 | `NEXT_PUBLIC_APP_URL` |
| **결제 (Phase 3)** | Paddle 결제 통합 | `PADDLE_API_KEY` |
| **Feature Flags** | 기능 활성화/비활성화 | `NEXT_PUBLIC_ENABLE_AUTH` |
| **디버그 모드** | 개발/디버깅 설정 | `NEXT_PUBLIC_DEBUG_MODE` |

### 1.2 환경변수 네이밍 규칙

- `NEXT_PUBLIC_*`: 클라이언트 사이드에 노출되는 변수
  - 브라우저에서 접근 가능
  - 민감 정보 포함 금지
  - 예: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_ENABLE_AUTH`

- `NEXT_PUBLIC_` 접두사 없음: 서버 사이드 전용 변수
  - Node.js 서버에서만 접근 가능
  - 민감 정보 포함 가능
  - 예: `SUPABASE_SERVICE_ROLE_KEY`, `PADDLE_API_KEY`

---

## 2. Production vs Preview 환경변수

### 2.1 전체 비교표

| 환경변수 | Production | Preview (Staging) | Development | 설명 |
|---------|-----------|------------------|-------------|------|
| **Supabase 인증** | | | | |
| `NEXT_PUBLIC_SUPABASE_URL` | 프로덕션 URL | 스테이징 URL | 로컬 URL | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 프로덕션 Anon Key | 스테이징 Anon Key | 로컬 Anon Key | 공개 가능한 클라이언트 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | 프로덕션 Service Key | 스테이징 Service Key | 로컬 Service Key | ⚠️ 서버 전용, 절대 노출 금지 |
| **앱 설정** | | | | |
| `NEXT_PUBLIC_APP_URL` | `https://tekton-ui.com` | `https://dev.tekton-ui.com` | `http://localhost:3001` | 애플리케이션 기본 URL |
| **Paddle 결제 (Phase 3)** | | | | |
| `PADDLE_API_KEY` | 프로덕션 API Key | Sandbox API Key | Sandbox API Key | ⚠️ 서버 전용 |
| `PADDLE_WEBHOOK_SECRET` | 프로덕션 Secret | Sandbox Secret | Sandbox Secret | ⚠️ 서버 전용 |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | 프로덕션 Token | Sandbox Token | Sandbox Token | 클라이언트 사이드 |
| `NEXT_PUBLIC_PADDLE_ENVIRONMENT` | `production` | `sandbox` | `sandbox` | 결제 환경 모드 |
| **Feature Flags** | | | | |
| `NEXT_PUBLIC_ENABLE_AUTH` | `true` | `true` | `false` (optional) | 인증 기능 활성화 |
| `NEXT_PUBLIC_ENABLE_PAYMENTS` | `true` | `false` | `false` | 결제 기능 활성화 |
| `NEXT_PUBLIC_ENABLE_MCP_EXPORT` | `true` | `true` | `true` | MCP Export 활성화 |
| **디버그 모드** | | | | |
| `NEXT_PUBLIC_DEBUG_MODE` | `false` | `true` | `true` | 디버그 로그 출력 |
| **E2E 테스트 (CI 전용)** | | | | |
| `PLAYWRIGHT_TEST_BASE_URL` | - | - | `http://localhost:3001` | Playwright 테스트 URL |
| `PLAYWRIGHT_HEADLESS` | - | - | `true` | Playwright headless 모드 |

### 2.2 환경별 우선순위

**Production (tekton-ui.com):**
- 실제 사용자 데이터 처리
- 프로덕션 Supabase 프로젝트 사용
- Paddle 프로덕션 환경 사용
- 디버그 모드 비활성화
- 모든 기능 활성화

**Preview (dev.tekton-ui.com):**
- 내부 테스트 및 QA 환경
- 별도 Staging Supabase 프로젝트 사용 (권장)
- Paddle Sandbox 환경 사용
- 디버그 모드 활성화
- 결제 기능 비활성화 (테스트 목적으로만 활성화)

**Development (localhost:3001):**
- 로컬 개발 환경
- 로컬 Supabase 또는 Staging Supabase 사용
- Paddle Sandbox 환경 사용
- 모든 디버그 기능 활성화
- Feature Flags 자유롭게 조정

---

## 3. Vercel Dashboard 설정 방법

### 3.1 환경변수 추가 단계

**Vercel Dashboard 접속:**
1. [Vercel Dashboard](https://vercel.com/dashboard) 로그인
2. 프로젝트 선택 (`tekton-playground-web`)
3. **Settings** → **Environment Variables** 클릭

### 3.2 Production 환경변수 설정

**Supabase 인증 (필수):**

```bash
# 1. Supabase Project URL
Variable Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project-id.supabase.co
Environments: ☑ Production

# 2. Supabase Anonymous Key
Variable Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ☑ Production

# 3. Supabase Service Role Key (⚠️ 민감 정보)
Variable Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ☑ Production
Sensitive: ☑ Encrypted (자동 체크)
```

**앱 설정 (필수):**

```bash
# 4. App URL
Variable Name: NEXT_PUBLIC_APP_URL
Value: https://tekton-ui.com
Environments: ☑ Production
```

**Feature Flags (필수):**

```bash
# 5. Enable Auth
Variable Name: NEXT_PUBLIC_ENABLE_AUTH
Value: true
Environments: ☑ Production

# 6. Enable Payments
Variable Name: NEXT_PUBLIC_ENABLE_PAYMENTS
Value: true
Environments: ☑ Production

# 7. Enable MCP Export
Variable Name: NEXT_PUBLIC_ENABLE_MCP_EXPORT
Value: true
Environments: ☑ Production
```

**디버그 모드 (필수):**

```bash
# 8. Debug Mode
Variable Name: NEXT_PUBLIC_DEBUG_MODE
Value: false
Environments: ☑ Production
```

**Paddle 결제 (Phase 3 완료 후 추가):**

```bash
# 9. Paddle API Key (⚠️ 민감 정보)
Variable Name: PADDLE_API_KEY
Value: your-production-paddle-api-key
Environments: ☑ Production
Sensitive: ☑ Encrypted

# 10. Paddle Webhook Secret (⚠️ 민감 정보)
Variable Name: PADDLE_WEBHOOK_SECRET
Value: your-production-paddle-webhook-secret
Environments: ☑ Production
Sensitive: ☑ Encrypted

# 11. Paddle Client Token
Variable Name: NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
Value: your-production-client-token
Environments: ☑ Production

# 12. Paddle Environment
Variable Name: NEXT_PUBLIC_PADDLE_ENVIRONMENT
Value: production
Environments: ☑ Production
```

### 3.3 Preview 환경변수 설정

**Supabase Staging (권장: 별도 프로젝트 생성):**

```bash
# 1. Staging Supabase Project URL
Variable Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-staging-project-id.supabase.co
Environments: ☑ Preview

# 2. Staging Supabase Anonymous Key
Variable Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ☑ Preview

# 3. Staging Supabase Service Role Key
Variable Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environments: ☑ Preview
Sensitive: ☑ Encrypted
```

**앱 설정 (Preview):**

```bash
# 4. Preview App URL
Variable Name: NEXT_PUBLIC_APP_URL
Value: https://dev.tekton-ui.com
Environments: ☑ Preview
```

**Feature Flags (Preview):**

```bash
# 5. Enable Auth
Variable Name: NEXT_PUBLIC_ENABLE_AUTH
Value: true
Environments: ☑ Preview

# 6. Enable Payments (Staging에서는 비활성화)
Variable Name: NEXT_PUBLIC_ENABLE_PAYMENTS
Value: false
Environments: ☑ Preview

# 7. Enable MCP Export
Variable Name: NEXT_PUBLIC_ENABLE_MCP_EXPORT
Value: true
Environments: ☑ Preview
```

**디버그 모드 (Preview):**

```bash
# 8. Debug Mode (Staging에서는 활성화)
Variable Name: NEXT_PUBLIC_DEBUG_MODE
Value: true
Environments: ☑ Preview
```

**Paddle Sandbox (Phase 3 완료 후):**

```bash
# 9. Paddle API Key (Sandbox)
Variable Name: PADDLE_API_KEY
Value: your-sandbox-paddle-api-key
Environments: ☑ Preview
Sensitive: ☑ Encrypted

# 10. Paddle Webhook Secret (Sandbox)
Variable Name: PADDLE_WEBHOOK_SECRET
Value: your-sandbox-paddle-webhook-secret
Environments: ☑ Preview
Sensitive: ☑ Encrypted

# 11. Paddle Client Token (Sandbox)
Variable Name: NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
Value: your-sandbox-client-token
Environments: ☑ Preview

# 12. Paddle Environment (Sandbox)
Variable Name: NEXT_PUBLIC_PADDLE_ENVIRONMENT
Value: sandbox
Environments: ☑ Preview
```

### 3.4 환경변수 업데이트

**기존 환경변수 수정:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. 수정할 변수 찾기
3. "Edit" 버튼 클릭
4. 값 수정 후 "Save" 클릭
5. **중요:** 변경사항 적용을 위해 **Redeploy** 필요
   - Deployments 탭 → 최신 배포 선택 → "Redeploy" 클릭

---

## 4. 로컬 개발 환경 설정

### 4.1 .env.local 파일 생성

**루트 디렉토리가 아닌 `packages/playground-web/` 디렉토리에 생성:**

```bash
cd packages/playground-web
cp .env.example .env.local
```

### 4.2 .env.local 파일 편집

**파일: `packages/playground-web/.env.local`**

```bash
# Supabase (로컬 개발용)
NEXT_PUBLIC_SUPABASE_URL=https://your-staging-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key

# App Configuration (로컬)
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Paddle (Sandbox)
PADDLE_API_KEY=your-sandbox-paddle-api-key
PADDLE_WEBHOOK_SECRET=your-sandbox-paddle-webhook-secret
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your-sandbox-client-token
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox

# Feature Flags (로컬)
NEXT_PUBLIC_ENABLE_AUTH=false  # 로컬에서는 인증 없이 테스트 가능
NEXT_PUBLIC_ENABLE_PAYMENTS=false
NEXT_PUBLIC_ENABLE_MCP_EXPORT=true

# Debug Mode (로컬에서는 활성화)
NEXT_PUBLIC_DEBUG_MODE=true

# E2E Testing
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3001
PLAYWRIGHT_HEADLESS=true
```

### 4.3 환경변수 로드 확인

**Next.js 개발 서버 시작:**

```bash
cd packages/playground-web
pnpm dev
```

**브라우저 콘솔에서 확인:**

```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
// Output: https://your-staging-project-id.supabase.co
```

**서버 사이드에서 확인 (API Route):**

```typescript
// packages/playground-web/app/api/test/route.ts
export async function GET() {
  return Response.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}
```

---

## 5. 보안 모범 사례

### 5.1 절대 Git에 커밋하지 말아야 할 파일

**`.gitignore`에 반드시 포함:**

```bash
# 환경변수 파일
.env
.env.local
.env.production
.env.development

# Vercel
.vercel

# Next.js
.next/
```

### 5.2 환경변수 유출 방지

**체크리스트:**
- [ ] `.env.local`, `.env` 파일이 `.gitignore`에 포함
- [ ] Git history에 시크릿 노출 확인:
  ```bash
  git log --all --full-history --source -- .env*
  ```
- [ ] `.env.example`에는 실제 값 없이 플레이스홀더만 포함
- [ ] `SUPABASE_SERVICE_ROLE_KEY`, `PADDLE_API_KEY`는 절대 클라이언트 코드에서 사용하지 않음
- [ ] Vercel 환경변수는 "Encrypted" 상태 유지

### 5.3 Service Role Key 안전 사용

**❌ 잘못된 사용 (클라이언트 사이드):**

```typescript
// 절대 하지 말 것!
'use client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ❌ 클라이언트에 노출됨
);
```

**✅ 올바른 사용 (서버 사이드):**

```typescript
// app/api/admin/route.ts
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ 서버에서만 실행
  );

  // Admin 작업 수행
  const { data, error } = await supabase.auth.admin.listUsers();
  return Response.json({ data, error });
}
```

### 5.4 환경변수 로테이션

**정기적으로 갱신해야 할 항목:**

| 항목 | 로테이션 주기 | 방법 |
|-----|------------|------|
| `SUPABASE_SERVICE_ROLE_KEY` | 6개월 | Supabase Dashboard → Settings → API → Regenerate |
| `PADDLE_API_KEY` | 1년 | Paddle Dashboard → Authentication → Create New Key |
| `PADDLE_WEBHOOK_SECRET` | 필요 시 | Paddle Dashboard → Webhooks → Regenerate Secret |

---

## 6. 문제 해결

### 6.1 환경변수가 적용되지 않을 때

**증상:**
- 빌드 시 `undefined` 에러 발생
- Supabase 연결 실패

**해결 방법:**

1. **Vercel에서 Redeploy:**
   - Vercel Dashboard → Deployments → 최신 배포 → "Redeploy"
   - 환경변수 변경 후 반드시 재배포 필요

2. **로컬에서 재시작:**
   ```bash
   # Next.js 개발 서버 재시작
   pnpm dev
   ```

3. **환경변수 이름 확인:**
   - `NEXT_PUBLIC_` 접두사 확인
   - 대소문자 정확히 일치해야 함

### 6.2 "Environment variable not found" 에러

**원인:**
- Vercel Dashboard에 환경변수 미설정
- 환경 (Production/Preview) 체크박스 미선택

**해결:**
1. Vercel Dashboard → Settings → Environment Variables
2. 누락된 변수 추가
3. 해당 환경 체크박스 선택 (Production/Preview)
4. "Save" 후 "Redeploy"

### 6.3 Supabase 연결 실패

**증상:**
- 로그인 실패
- "Invalid API key" 에러

**해결:**
1. **Supabase URL 확인:**
   ```bash
   # 올바른 형식
   https://your-project-id.supabase.co

   # 잘못된 형식
   https://supabase.co/project/your-project-id ❌
   ```

2. **API Key 확인:**
   - Supabase Dashboard → Settings → API
   - "anon public" 키 복사 (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - "service_role" 키 복사 (`SUPABASE_SERVICE_ROLE_KEY`)

3. **네트워크 방화벽 확인:**
   - Vercel에서 Supabase로의 연결 허용 확인

---

## 관련 문서

- [Vercel 배포 설정 가이드](./vercel-setup.md)
- [Staging Deployment 체크리스트](./staging-deployment-checklist.md)
- [Supabase 인증 설정 가이드](../guides/supabase-auth-setup.md)
- [Paddle 결제 통합 가이드](../guides/paddle-integration.md) (Phase 3)

---

**마지막 업데이트:** 2026-02-07
**담당자:** soo-kate-yeon
**SPEC:** SPEC-DEPLOY-001 Phase 5.2
