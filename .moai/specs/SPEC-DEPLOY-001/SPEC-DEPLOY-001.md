# SPEC-DEPLOY-001: Tekton Production Deployment Architecture

## Overview

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-DEPLOY-001 |
| **Title** | Tekton Production Deployment Architecture |
| **Status** | Draft |
| **Priority** | Critical |
| **Created** | 2026-02-06 |
| **Author** | R2-D2 + soo-kate-yeon |
| **Branch** | feature/SPEC-DEPLOY-001 |

## Problem Statement

Tekton의 핵심 개발(디자인 시스템, MCP 서버, Studio 웹앱)은 완료되었지만, **프로덕션 배포를 위한 인프라가 구성되지 않은 상태**입니다:

- MCP 서버가 npm에 퍼블리시되지 않아 외부 사용자가 설치할 수 없음
- Next.js 앱이 배포되지 않아 tekton-ui.com 도메인이 활용되지 않음
- 인증 시스템이 NextAuth 5 + Supabase Auth 이중 구조로 불안정
- 결제 시스템이 없어 유료 테마 판매가 불가능
- MCP 서버가 사용자 라이선스를 확인할 수 없어 무료/유료 테마 구분 불가

## Goals

1. **npm Publishing**: @tekton/* 패키지를 npm에 퍼블리시하여 `npx @tekton/mcp-server`로 설치 가능하게
2. **Web Deployment**: Next.js 앱을 Vercel에 배포하고 tekton-ui.com 도메인 연결
3. **Auth Consolidation**: Supabase Auth로 단일화하여 안정적인 인증 제공
4. **Payment Integration**: Paddle을 통한 테마 라이선스 결제 시스템 구축
5. **MCP Authentication**: API Key 기반 인증으로 구매 테마만 활성화
6. **E2E User Journey**: 가입 → 브라우징 → 결제 → API Key 발급 → MCP 설치까지 전체 흐름 완성

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| 인증 시스템 | Supabase Auth (단일화) | DB/RLS/Edge Functions와 자연 통합, 이미 AuthContext가 Supabase 기반 |
| MCP 서버 인증 | API Key 방식 | CLI 환경에 적합, 1회 설정 후 revoke까지 유효, 구현 간단 |
| 결제 웹훅 처리 | Next.js API Route | Vercel에 이미 배포되는 앱의 Route Handler 활용, 별도 서버 불필요 |
| 결제 솔루션 | Paddle | MoR로 세금/VAT 자동 처리, 글로벌 SaaS에 적합 |
| 웹 호스팅 | Vercel | Next.js 16 공식 호스팅, 모노레포 지원, Preview 배포 |
| 데이터베이스 | Supabase PostgreSQL | Auth와 통합, RLS 정책, Realtime 지원 |

---

## System Architecture

```
┌──────────────────────┐    ┌──────────────────────┐    ┌─────────────┐
│   tekton-ui.com      │    │   npm Registry       │    │   Paddle    │
│   (Vercel)           │    │   (@tekton/*)        │    │   Billing   │
│                      │    │                      │    │             │
│  Next.js 16 App      │    │  @tekton/core        │    │  결제 처리   │
│  ├─ /studio          │    │  @tekton/tokens      │    │  구독 관리   │
│  ├─ /auth            │◄──►│  @tekton/ui          │    │  웹훅 전송   │
│  ├─ /profile         │    │  @tekton/styled      │    │      │      │
│  ├─ /api/webhooks ◄──┼────┼──────────────────────┼────┼──────┘      │
│  ├─ /api/mcp/verify  │    │  @tekton/mcp-server  │    └─────────────┘
│  └─ /api/user/*      │    │  (CLI: tekton-mcp)   │
│         │            │    │         │            │
└─────────┼────────────┘    └─────────┼────────────┘
          │                           │
          ▼                           ▼
┌──────────────────────────────────────────────────────┐
│                    Supabase                           │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌───────┐ │
│  │  Auth    │  │  DB      │  │   RLS   │  │ Edge  │ │
│  │ OAuth    │  │ Postgres │  │ Policies│  │ CDN   │ │
│  └─────────┘  └──────────┘  └─────────┘  └───────┘ │
└──────────────────────────────────────────────────────┘
```

### User Journey

```
가입/로그인 → 테마 브라우징 → Paddle 결제 → 라이선스 활성화 → API Key 발급 → MCP 설치
     │              │              │               │                │            │
  Supabase       Studio         Paddle.js      Webhook →        /profile     npx @tekton/
  OAuth          페이지         Checkout       user_licenses     API Key     mcp-server
```

---

## Phase 1: Infrastructure Foundation

### Objective
배포를 위한 기반 인프라 구성: DB 스키마, 환경변수 보안, npm 설정, Vercel 프로젝트

### 1.1 Database Migration (Supabase)

**테이블: user_profiles**
```sql
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'creator')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role can manage all" ON public.user_profiles
  USING (auth.role() = 'service_role');
```

**테이블: api_keys**
```sql
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,        -- "tk_live_xxxx" (식별용)
  name TEXT NOT NULL DEFAULT 'Default',
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,          -- nullable = 무기한
  revoked_at TIMESTAMPTZ,          -- nullable = 활성
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON public.api_keys(key_hash);

-- RLS
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can revoke own keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role can manage all" ON public.api_keys
  USING (auth.role() = 'service_role');
```

**테이블: user_licenses**
```sql
CREATE TABLE public.user_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('single', 'double', 'creator')),
  paddle_subscription_id TEXT,
  paddle_transaction_id TEXT,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,          -- nullable = 영구
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_user_licenses_user_id ON public.user_licenses(user_id);
CREATE UNIQUE INDEX idx_user_licenses_unique ON public.user_licenses(user_id, theme_id)
  WHERE is_active = true;

-- RLS
ALTER TABLE public.user_licenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own licenses" ON public.user_licenses
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can manage all" ON public.user_licenses
  USING (auth.role() = 'service_role');
```

### 1.2 Environment Variable Security

**현재 상태**: `.env.local`에 프로덕션 Supabase 키, OAuth 시크릿이 평문으로 존재 (보안 위험)

**조치 항목**:
- [ ] `.env.local`이 `.gitignore`에 포함되어 있는지 확인
- [ ] git history에서 시크릿 노출 여부 확인 → 필요시 키 회전
- [ ] `.env.example` 업데이트 (Paddle 관련 변수 추가)
- [ ] 프로덕션 환경변수는 Vercel Dashboard에서만 관리

**필요 환경변수 (전체)**:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App
NEXT_PUBLIC_APP_URL=https://tekton-ui.com

# Paddle
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_ENVIRONMENT=production  # 또는 sandbox

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
```

### 1.3 npm Package Configuration

**@tekton npm org 생성** 필요

**각 패키지 publishConfig 정리**:
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "files": ["dist", "README.md"],
  "repository": {
    "type": "git",
    "url": "https://github.com/soo-kate-yeon/tekton"
  }
}
```

**빌드 순서 (의존성)**:
```
@tekton/tokens  (독립)
     ↓
@tekton/core    (tokens에 의존)
     ↓
@tekton/ui      (tokens, core에 의존)
     ↓
@tekton/styled  (tokens에 의존)
@tekton/esbuild-plugin (독립)
     ↓
@tekton/mcp-server (core, ui에 의존)
```

### 1.4 Vercel Project Setup

- [ ] Vercel 프로젝트 생성 (tekton-playground-web)
- [ ] Root Directory: `packages/playground-web`
- [ ] Build Command: `cd ../.. && pnpm install && pnpm --filter @tekton/playground-web build`
- [ ] tekton-ui.com DNS 설정 (A/CNAME 레코드)
- [ ] www.tekton-ui.com → tekton-ui.com 리다이렉트
- [ ] 환경변수 설정 (Vercel Dashboard)
- [ ] Preview 배포: develop → dev.tekton-ui.com

### Tasks

| # | Task | Owner | Priority |
|---|------|-------|----------|
| 1.1 | Supabase DB 마이그레이션 실행 (3 테이블 + RLS) | expert-backend | P0 |
| 1.2 | .env.local 보안 점검 + gitignore 확인 | expert-security | P0 |
| 1.3 | 각 패키지 package.json publishConfig 정리 | expert-backend | P0 |
| 1.4 | @tekton npm org 생성 + NPM_TOKEN 발급 | manual (soo-kate-yeon) | P0 |
| 1.5 | Vercel 프로젝트 생성 + 도메인 연결 | manual (soo-kate-yeon) | P0 |
| 1.6 | .env.example 업데이트 (Paddle 변수 추가) | expert-backend | P1 |

### Success Criteria

- [ ] 3개 테이블 생성 + RLS 정책 활성화
- [ ] .env.local이 git에 노출되지 않음 확인
- [ ] 모든 패키지가 `pnpm --filter @tekton/* build` 성공
- [ ] Vercel에서 tekton-ui.com 접속 가능

---

## Phase 2: Auth Consolidation

### Objective
NextAuth 5를 제거하고 Supabase Auth로 단일화. API Key 발급/검증 시스템 구축.

### 2.1 NextAuth Removal

**제거 대상 파일**:
- `packages/playground-web/lib/auth.ts` (NextAuth 설정)
- `packages/playground-web/app/api/auth/[...nextauth]/route.ts`
- `packages/playground-web/app/providers.tsx`의 `SessionProvider` 래핑

**수정 대상 파일**:
- `packages/playground-web/app/providers.tsx` → SessionProvider 제거, AuthProvider만 유지
- `packages/playground-web/middleware.ts` → Supabase 세션 체크로 교체

**유지 파일** (이미 Supabase 기반):
- `lib/auth/supabase-auth.ts` ✅
- `lib/supabase/client.ts` ✅
- `lib/supabase/server.ts` ✅
- `contexts/AuthContext.tsx` ✅ (이미 Supabase 기반)
- `app/auth/callback/route.ts` ✅ (Supabase OAuth 콜백)

**의존성 제거**:
```bash
pnpm --filter @tekton/playground-web remove next-auth
```

### 2.2 API Key System

**API Key 형식**: `tk_live_` + 32자리 랜덤 (총 40자)
- 예: `tk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
- 생성 시 평문 1회 표시 → bcrypt 해시로 저장
- key_prefix에 `tk_live_a1b2` 저장 (식별용)

**API 엔드포인트**:

```typescript
// POST /api/user/api-keys
// Body: { name: "My Claude Desktop" }
// Response: { id, key: "tk_live_xxx...", name, createdAt }
//           ※ key 평문은 이 응답에서만 반환

// GET /api/user/api-keys
// Response: [{ id, keyPrefix: "tk_live_a1b2", name, lastUsedAt, createdAt }]
//           ※ key 평문은 반환하지 않음

// DELETE /api/user/api-keys/[id]
// Response: { success: true }  (soft delete: revoked_at 설정)
```

### 2.3 MCP Verify Endpoint

```typescript
// GET /api/mcp/verify
// Headers: { Authorization: "Bearer tk_live_xxx..." }
// Response:
{
  "valid": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "plan": "pro"
  },
  "licenses": [
    {
      "themeId": "equinox-fitness-v2",
      "tier": "single",
      "isActive": true,
      "expiresAt": null
    }
  ],
  "themes": {
    "free": ["minimal-starter", "basic-dashboard"],
    "licensed": ["equinox-fitness-v2"]
  }
}
```

**보안 요구사항**:
- bcrypt로 해시 비교 (timing-safe)
- Rate limiting: 분당 60회 (Vercel Edge Middleware)
- last_used_at 업데이트 (비동기)
- revoked/expired 키 거부

### Tasks

| # | Task | Owner | Priority |
|---|------|-------|----------|
| 2.1 | NextAuth 완전 제거 + Supabase Auth 미들웨어 | expert-backend | P0 |
| 2.2 | API Key 생성/조회/삭제 API Routes | expert-backend | P0 |
| 2.3 | /api/mcp/verify 엔드포인트 구현 | expert-backend | P0 |
| 2.4 | API Key 보안 (bcrypt, rate limiting) | expert-security | P0 |
| 2.5 | 인증 플로우 E2E 테스트 | expert-testing | P1 |

### Success Criteria

- [ ] NextAuth 의존성 완전 제거 (package.json, 코드, 라우트)
- [ ] Supabase Auth로 Google/GitHub OAuth 로그인 정상 동작
- [ ] API Key 생성 시 평문 1회 반환, DB에 해시 저장
- [ ] /api/mcp/verify에서 유효한 API Key로 라이선스 목록 반환
- [ ] 무효한/만료된 API Key는 401 반환

---

## Phase 3: Payment Integration

### Objective
Paddle 결제를 통한 테마 라이선스 구매 및 자동 활성화

### 3.1 Paddle Setup

**Paddle 설정 항목**:
- [ ] Paddle 계정 생성 + Sandbox 환경 구성
- [ ] 테마별 Product 생성 (single, double, creator 티어)
- [ ] 웹훅 URL 등록: `https://tekton-ui.com/api/webhooks/paddle`
- [ ] 웹훅 시크릿 발급 → Vercel 환경변수

**가격 구조 (예시)**:
| Tier | 설명 | 가격 |
|------|------|------|
| single | 테마 1개 | $29 일회성 |
| double | 테마 2개 번들 | $49 일회성 |
| creator | 전체 테마 접근 | $19/월 구독 |

### 3.2 Paddle Webhook Handler

```typescript
// POST /api/webhooks/paddle
// 처리할 이벤트:

// transaction.completed → 일회성 구매
{
  event_type: "transaction.completed",
  data: {
    id: "txn_xxx",
    customer_id: "ctm_xxx",
    custom_data: { userId: "uuid", themeId: "equinox-fitness-v2" },
    items: [{ price: { product_id: "pro_xxx" } }]
  }
}
// → user_licenses에 INSERT (is_active: true, expires_at: null)

// subscription.created → 구독 시작
// → user_licenses에 INSERT (paddle_subscription_id 포함)

// subscription.updated → 구독 갱신
// → user_licenses의 expires_at 업데이트

// subscription.canceled → 구독 취소
// → user_licenses의 expires_at를 현재 구독 기간 종료일로 설정

// transaction.refunded → 환불
// → user_licenses의 is_active를 false로 설정
```

**서명 검증**:
```typescript
import { validateWebhookSignature } from '@paddle/paddle-node-sdk';

// 모든 웹훅 요청에 대해 서명 검증 필수
const isValid = validateWebhookSignature(
  rawBody,
  signature,
  process.env.PADDLE_WEBHOOK_SECRET
);
```

**Idempotency**: `paddle_transaction_id`로 중복 이벤트 무시

### 3.3 Paddle Checkout UI

**테마 상세 페이지에 통합**:
```tsx
// Paddle.js 클라이언트 사이드 오버레이 결제
import { initializePaddle } from '@paddle/paddle-js';

// 사용자가 "Purchase" 클릭 시:
paddle.Checkout.open({
  items: [{ priceId: 'pri_xxx', quantity: 1 }],
  customData: { userId: user.id, themeId: theme.id },
  customer: { email: user.email }
});
```

### 3.4 Realtime License Activation

```typescript
// Supabase Realtime으로 결제 완료 즉시 UI 반영
const channel = supabase
  .channel('license-changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'user_licenses',
    filter: `user_id=eq.${user.id}`
  }, (payload) => {
    // UI에 즉시 반영 - 새로고침 불필요
    addLicense(payload.new);
  })
  .subscribe();
```

### Tasks

| # | Task | Owner | Priority |
|---|------|-------|----------|
| 3.1 | Paddle 계정/Product 설정 | manual (soo-kate-yeon) | P0 |
| 3.2 | Paddle 웹훅 핸들러 구현 (서명 검증 + 이벤트 처리) | expert-backend | P0 |
| 3.3 | Paddle Checkout UI 통합 (테마 상세 페이지) | expert-frontend | P0 |
| 3.4 | Supabase Realtime 라이선스 반영 | expert-frontend | P1 |
| 3.5 | Paddle Sandbox 환경 E2E 테스트 | expert-testing | P1 |

### Success Criteria

- [ ] Paddle Sandbox에서 테스트 결제 성공
- [ ] 웹훅으로 user_licenses 자동 생성
- [ ] 결제 완료 후 UI에 즉시 라이선스 표시
- [ ] 환불 시 라이선스 자동 비활성화
- [ ] 서명 검증 실패 시 웹훅 거부 (403)

---

## Phase 4: MCP Server Auth & npm Publishing

### Objective
MCP 서버에 API Key 인증을 추가하고, @tekton/* 패키지를 npm에 퍼블리시

### 4.1 MCP Server Auth Layer

**@tekton/mcp-server 수정사항**:

```typescript
// src/auth/verify.ts (신규)
export async function verifyApiKey(apiKey: string): Promise<VerifyResponse> {
  const response = await fetch(`${TEKTON_API_URL}/api/mcp/verify`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });

  if (!response.ok) throw new AuthError('Invalid API key');
  return response.json();
}

// src/index.ts (수정)
// MCP 서버 시작 시:
const apiKey = process.env.TEKTON_API_KEY;
let authData: VerifyResponse | null = null;

if (apiKey) {
  authData = await verifyApiKey(apiKey);
  // 캐시: 5분 TTL
}

// 도구 필터링:
// - free 테마 도구: 모든 사용자
// - premium 테마: authData.licenses에 포함된 테마만
```

**Claude Desktop 설정**:
```json
{
  "mcpServers": {
    "tekton": {
      "command": "npx",
      "args": ["@tekton/mcp-server@latest"],
      "env": {
        "TEKTON_API_KEY": "tk_live_xxxxxxxxxxxx",
        "TEKTON_API_URL": "https://tekton-ui.com"
      }
    }
  }
}
```

**인증 없이 사용 시**: 무료 테마와 기본 도구만 활성화

### 4.2 API Key Dashboard UI

**위치**: `/profile` 페이지 또는 `/settings/api-keys`

**UI 요소**:
- API Key 목록 (prefix, name, lastUsedAt, createdAt)
- "새 API Key 생성" 버튼 → 모달 (이름 입력)
- 생성 시 평문 키 표시 + "복사" 버튼 + 경고 ("이 키는 다시 표시되지 않습니다")
- Claude Desktop 설정 스니펫 자동 생성
- 키 삭제(Revoke) 버튼 + 확인 다이얼로그

### 4.3 npm Publish GitHub Actions

```yaml
# .github/workflows/npm-publish.yml
name: npm Publish
on:
  push:
    tags: ['v*']

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter "./packages/*" build

      # 의존 순서대로 퍼블리시
      - run: pnpm --filter @tekton/tokens publish --no-git-checks
      - run: pnpm --filter @tekton/core publish --no-git-checks
      - run: pnpm --filter @tekton/ui publish --no-git-checks
      - run: pnpm --filter @tekton/styled publish --no-git-checks
      - run: pnpm --filter @tekton/esbuild-plugin publish --no-git-checks
      - run: pnpm --filter @tekton/mcp-server publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Tasks

| # | Task | Owner | Priority |
|---|------|-------|----------|
| 4.1 | MCP 서버 인증 레이어 추가 (verify + cache + filter) | expert-backend | P0 |
| 4.2 | API Key 대시보드 UI (생성/조회/삭제) | expert-frontend | P0 |
| 4.3 | Claude Desktop 설정 스니펫 자동 생성 UI | expert-frontend | P1 |
| 4.4 | npm publish GitHub Actions 워크플로우 | expert-devops | P0 |
| 4.5 | 각 패키지 README.md 작성 | manager-docs | P1 |

### Success Criteria

- [ ] `npx @tekton/mcp-server` 실행 시 API Key 없이도 무료 도구 사용 가능
- [ ] API Key 설정 시 구매 테마 도구 활성화
- [ ] 웹 대시보드에서 API Key 발급/삭제 정상 동작
- [ ] GitHub tag 푸시 시 자동 npm publish
- [ ] 모든 6개 패키지가 npm에서 설치 가능

---

## Phase 5: Launch Verification

### Objective
전체 사용자 여정 E2E 테스트 + Staging → Production 배포

### 5.1 E2E Test Scenarios

| # | 시나리오 | 기대 결과 |
|---|---------|----------|
| 1 | Google OAuth 가입 | 프로필 생성, Studio 접근 가능 |
| 2 | GitHub OAuth 가입 | 프로필 생성, Studio 접근 가능 |
| 3 | 무료 테마 브라우징 | 모든 사용자 접근 가능 |
| 4 | Paddle 테스트 결제 | 라이선스 자동 활성화 |
| 5 | API Key 발급 | 키 생성 + 평문 표시 + DB 해시 저장 |
| 6 | MCP 서버 설치 (인증 없이) | 무료 도구만 활성화 |
| 7 | MCP 서버 설치 (API Key) | 구매 테마 도구 활성화 |
| 8 | API Key Revoke | MCP 서버에서 인증 실패 |
| 9 | 구독 취소 | 기간 만료 후 라이선스 비활성화 |
| 10 | 환불 | 즉시 라이선스 비활성화 |

### 5.2 Staging Deployment

- develop 브랜치 → dev.tekton-ui.com
- Paddle Sandbox 환경
- 전체 E2E 시나리오 실행
- 성능 테스트 (Lighthouse 80+ 목표)

### 5.3 Production Launch

- [ ] master 브랜치 머지 + Vercel Production 배포
- [ ] tekton-ui.com DNS 전파 확인
- [ ] Paddle Production 환경 전환
- [ ] npm v0.2.0 태그 + publish
- [ ] 모니터링 설정 (Vercel Analytics + Sentry)

### Tasks

| # | Task | Owner | Priority |
|---|------|-------|----------|
| 5.1 | E2E 테스트 시나리오 작성 (Playwright) | expert-testing | P0 |
| 5.2 | Staging 환경 배포 + 검증 | expert-devops | P0 |
| 5.3 | Production 배포 + DNS 전파 확인 | manual (soo-kate-yeon) | P0 |
| 5.4 | Vercel Analytics + Sentry 설정 | expert-devops | P1 |
| 5.5 | Launch 체크리스트 최종 확인 | manager-quality | P0 |

### Success Criteria

- [ ] 10개 E2E 시나리오 전체 통과
- [ ] tekton-ui.com 정상 접속 + SSL 인증서
- [ ] npm install @tekton/mcp-server 정상 설치
- [ ] Lighthouse Performance 80+, Accessibility 90+
- [ ] 가입 → MCP 설치까지 전체 여정 30분 이내 완료 가능

---

## Security Checklist

| # | 항목 | Phase | Status |
|---|------|-------|--------|
| S1 | .env.local git 노출 방지 | P1 | [ ] |
| S2 | API Key bcrypt 해시 저장 | P2 | [ ] |
| S3 | API Key Rate Limiting (60/min) | P2 | [ ] |
| S4 | Paddle 웹훅 서명 검증 | P3 | [ ] |
| S5 | Paddle 웹훅 Idempotency | P3 | [ ] |
| S6 | Supabase RLS 모든 테이블 | P1 | [ ] |
| S7 | Service Role Key 서버 사이드만 | P1 | [ ] |
| S8 | CORS 헤더 적절히 설정 | P4 | [ ] |
| S9 | OAuth state 매개변수 검증 | P2 | [ ] |
| S10 | 프로덕션 키 회전 (노출 시) | P1 | [ ] |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| .env.local 기존 커밋에 노출됨 | High | High | git history 확인 + 모든 키 회전 |
| NextAuth 제거 시 기존 세션 깨짐 | Medium | Medium | AuthContext가 이미 Supabase 기반이므로 영향 최소 |
| Paddle 웹훅 지연/누락 | Low | High | Retry 정책 + 수동 라이선스 부여 UI |
| npm org 이름 충돌 | Low | Medium | 대안 이름 준비 (@tektonui) |
| MCP 서버 인증 캐시 무효화 문제 | Medium | Low | 5분 TTL + 강제 재검증 옵션 |
| Vercel 모노레포 빌드 실패 | Medium | Medium | 로컬 빌드 검증 + turbo-ignore |

---

## Implementation Timeline

```
Phase 1: Infrastructure Foundation ────────────── (1-2일)
├─ DB 마이그레이션 + RLS
├─ 환경변수 보안 정리
├─ npm 패키지 설정
└─ Vercel 프로젝트 + 도메인

Phase 2: Auth Consolidation ───────────────────── (2-3일)
├─ NextAuth 제거
├─ API Key CRUD API
└─ /api/mcp/verify 엔드포인트

Phase 3: Payment Integration ──────────────────── (2-3일)
├─ Paddle 웹훅 핸들러
├─ Checkout UI 통합
└─ Realtime 라이선스 반영

Phase 4: MCP + npm Publishing ─────────────────── (1-2일)
├─ MCP 서버 인증 레이어
├─ API Key 대시보드 UI
└─ npm publish Actions

Phase 5: Launch ───────────────────────────────── (1-2일)
├─ E2E 테스트
├─ Staging 검증
└─ Production 배포
```

---

## Related SPECs

- SPEC-AUTH-001: Authentication System (이전 auth 작업)
- SPEC-MCP-004: MCP Workflow Optimization (MCP 도구 파이프라인)
- SPEC-STUDIO-001: Studio Web Application

## Appendix

### A. Database Schema Diagram

```
auth.users (Supabase managed)
  ├── id (uuid, PK)
  ├── email
  ├── raw_user_meta_data (provider info)
  └── created_at
        │
        ├──────────────────┐───────────────────┐
        ▼                  ▼                   ▼
user_profiles          api_keys           user_licenses
  ├─ id (FK)           ├─ id (PK)         ├─ id (PK)
  ├─ display_name      ├─ user_id (FK)    ├─ user_id (FK)
  ├─ avatar_url        ├─ key_hash        ├─ theme_id
  ├─ plan              ├─ key_prefix      ├─ tier
  └─ updated_at        ├─ name            ├─ paddle_sub_id
                       ├─ last_used_at    ├─ is_active
                       └─ revoked_at      └─ expires_at
```

### B. API Route Summary

```
/api/
├── auth/
│   └── callback/route.ts         -- Supabase OAuth 콜백
├── user/
│   ├── profile/route.ts          -- GET: 프로필
│   ├── licenses/route.ts         -- GET: 라이선스 목록
│   └── api-keys/
│       ├── route.ts              -- GET: 키 목록, POST: 키 생성
│       └── [id]/route.ts         -- DELETE: 키 삭제(revoke)
├── mcp/
│   └── verify/route.ts           -- GET: API Key 검증 + 라이선스
└── webhooks/
    └── paddle/route.ts           -- POST: Paddle 웹훅
```

### C. npm Package List

| Package | Version | CLI | Public |
|---------|---------|-----|--------|
| @tekton/tokens | 0.2.0 | - | Yes |
| @tekton/core | 0.2.0 | - | Yes |
| @tekton/ui | 0.2.0 | - | Yes |
| @tekton/styled | 0.2.0 | - | Yes |
| @tekton/esbuild-plugin | 0.2.0 | - | Yes |
| @tekton/mcp-server | 0.2.0 | tekton-mcp | Yes |
