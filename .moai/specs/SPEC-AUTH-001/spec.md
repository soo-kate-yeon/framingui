---
id: SPEC-AUTH-001
version: "1.1.0"
status: draft
created: "2026-02-03"
updated: "2026-02-03"
author: soo-kate-yeon
priority: HIGH
---

## HISTORY

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-02-03 | 1.0.0 | 초안 작성 |
| 2026-02-03 | 1.1.0 | Free Tier 제거, MCP 라이선스 체크 통합 |

---

# SPEC-AUTH-001: Supabase 인증 및 MCP 라이선스 체크

## 개요

Supabase Authentication을 Studio 애플리케이션의 단독 인증 시스템으로 통합합니다. OAuth 기반 소셜 로그인, 세션 관리, 사용자 데이터 저장 및 **MCP에서의 라이선스 검증**을 구현합니다.

### MVP 핵심 원칙

- ❌ Free Tier 없음 (무료 템플릿 제공 안 함)
- ✅ 구매한 Theme만 MCP에서 사용 가능
- ✅ Live Demo가 쇼케이스 역할 (구매 전 체험)

---

## 요구사항 (EARS Format)

### Ubiquitous Requirements (항상 활성)

**[TAG-AUTH-001-U001]** 시스템은 Supabase Auth를 단독 인증 제공자로 사용해야 한다.

**[TAG-AUTH-001-U002]** 사용자 세션은 페이지 새로고침 시에도 유지되어야 한다.

**[TAG-AUTH-001-U003]** 사용자 데이터는 PostgreSQL 데이터베이스에 저장되어야 한다.

**[TAG-AUTH-001-U004]** MCP는 인증된 사용자의 구매한 Theme만 제공해야 한다.

**[TAG-AUTH-001-U005]** 미인증 또는 라이선스 없는 사용자의 MCP Theme 요청은 거부되어야 한다.

### Event-Driven Requirements (이벤트 기반)

**[TAG-AUTH-001-E001]** WHEN MCP 인증 시작 THEN 브라우저가 OAuth redirect 페이지로 이동한다.

**[TAG-AUTH-001-E002]** WHEN OAuth 콜백 수신 THEN 사용자 레코드를 생성하거나 업데이트한다.

**[TAG-AUTH-001-E003]** WHEN 로그아웃 요청 THEN 세션을 클리어하고 홈페이지로 리다이렉트한다.

**[TAG-AUTH-001-E004]** WHEN MCP가 Theme 요청 THEN 라이선스를 검증하고 유효하면 Theme JSON을 반환한다.

**[TAG-AUTH-001-E005]** WHEN 라이선스 없이 Theme 요청 THEN 구매 안내 메시지와 함께 거부한다.

### State-Driven Requirements (상태 기반)

**[TAG-AUTH-001-S001]** IF 사용자가 인증됨 THEN 계정 메뉴와 사용자 정보가 표시되어야 한다.

**[TAG-AUTH-001-S002]** IF 세션이 만료됨 THEN 재인증 프롬프트가 표시되어야 한다.

**[TAG-AUTH-001-S003]** IF Creator Pass 보유 THEN 모든 Theme 접근이 허용되어야 한다.

**[TAG-AUTH-001-S004]** IF Single/Double 라이선스 보유 THEN 구매한 Theme만 접근이 허용되어야 한다.

**[TAG-AUTH-001-S005]** IF 라이선스 만료됨 THEN 갱신 안내와 함께 접근이 거부되어야 한다.

---

## 데이터베이스 스키마

### user_licenses 테이블

사용자의 템플릿 라이선스 정보를 저장합니다.

```sql
CREATE TABLE user_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_id VARCHAR(50) NOT NULL,
  tier VARCHAR(20) CHECK (tier IN ('single', 'double', 'creator')),
  paddle_subscription_id VARCHAR(100),
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, theme_id)
);

-- 인덱스
CREATE INDEX idx_user_licenses_user_id ON user_licenses(user_id);
CREATE INDEX idx_user_licenses_theme_id ON user_licenses(theme_id);
CREATE INDEX idx_user_licenses_is_active ON user_licenses(is_active);
CREATE INDEX idx_user_licenses_expires_at ON user_licenses(expires_at);
```

### Row Level Security (RLS) 정책

```sql
-- user_licenses RLS
ALTER TABLE user_licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own licenses"
  ON user_licenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all licenses"
  ON user_licenses FOR ALL
  USING (auth.role() = 'service_role');
```

---

## MCP 라이선스 체크 아키텍처

### 플로우

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCP License Check Flow                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Claude Desktop / Cursor]                                      │
│       │                                                         │
│       ▼ MCP Tool 호출 (generate-screen, list-themes 등)         │
│  [Tekton MCP Server]                                            │
│       │                                                         │
│       ▼ 인증 토큰 확인                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Token 없음?                                             │   │
│  │  → "인증이 필요합니다. tekton.so/auth/mcp 에서 로그인"    │   │
│  │  → 브라우저 OAuth 플로우 시작                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│       │                                                         │
│       ▼ Token 있음                                              │
│  [Tekton API Server]                                            │
│       │                                                         │
│       ▼ POST /api/mcp/verify-license                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  1. JWT 토큰 검증 (Supabase)                             │   │
│  │  2. user_licenses 테이블 조회                            │   │
│  │  3. 요청된 theme_id가 라이선스에 포함되는지 확인          │   │
│  │  4. Creator Pass면 모든 Theme 허용                       │   │
│  │  5. 만료일 확인                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│       │                                                         │
│       ├── 라이선스 유효 → Theme JSON 반환                       │
│       │                                                         │
│       └── 라이선스 없음/만료 →                                  │
│           {                                                     │
│             "success": false,                                   │
│             "error": "LICENSE_REQUIRED",                        │
│             "message": "이 Theme을 사용하려면 라이선스가 필요합니다.",│
│             "purchaseUrl": "https://tekton.so/studio/template/[id]#pricing",│
│             "availableThemes": ["theme-1", "theme-2"]  // 보유 중인 것만│
│           }                                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### MCP 응답 포맷

**라이선스 없는 경우 (코딩 에이전트가 출력할 메시지)**:

```
⚠️ This theme requires a license.

You don't have access to "Square Minimalism" theme.

To purchase this theme, visit:
https://tekton.so/studio/template/square-minimalism#pricing

Or try the live demo first:
https://tekton.so/studio/square-minimalism

Your current licenses: (none)
```

**라이선스 만료된 경우**:

```
⚠️ Your license for "Square Minimalism" has expired.

Expired on: 2026-01-15

To renew, visit:
https://tekton.so/account/licenses
```

---

## API 엔드포인트

### POST /api/mcp/auth

MCP 클라이언트 인증을 시작합니다.

**Request**:
```typescript
interface MCPAuthRequest {
  client_id: string;
  redirect_uri: string;
  state: string;
}
```

**Response**:
```typescript
interface MCPAuthResponse {
  auth_url: string;
  state: string;
  expires_in: number;
}
```

### POST /api/mcp/verify-license

MCP에서 Theme 접근 권한을 확인합니다.

**Request**:
```typescript
interface VerifyLicenseRequest {
  theme_id: string;
  token: string;  // Supabase JWT
}
```

**Response (성공)**:
```typescript
interface VerifyLicenseSuccess {
  success: true;
  theme: ThemeJSON;
  license: {
    tier: 'single' | 'double' | 'creator';
    expires_at: string | null;
  };
}
```

**Response (실패)**:
```typescript
interface VerifyLicenseFailure {
  success: false;
  error: 'LICENSE_REQUIRED' | 'LICENSE_EXPIRED' | 'INVALID_TOKEN';
  message: string;
  purchaseUrl: string;
  availableThemes: string[];  // 사용자가 보유한 Theme 목록
}
```

### GET /api/mcp/my-themes

사용자가 보유한 Theme 목록을 반환합니다.

**Response**:
```typescript
interface MyThemesResponse {
  themes: Array<{
    theme_id: string;
    name: string;
    tier: string;
    expires_at: string | null;
    is_active: boolean;
  }>;
}
```

### GET /api/auth/callback

OAuth 콜백을 처리합니다.

### POST /api/auth/logout

사용자 로그아웃을 처리합니다.

---

## 인증 플로우

### OAuth 로그인 플로우 (Web)

```
사용자                   Studio App              Supabase Auth           OAuth Provider
  |                          |                        |                        |
  |-- "Login with Google" -->|                        |                        |
  |                          |-- signInWithOAuth() -->|                        |
  |                          |                        |-- Redirect ----------->|
  |                          |                        |                        |
  |<-------------------------|<-----------------------|<-- OAuth Callback -----|
  |                          |                        |                        |
  |                          |-- getSession() ------->|                        |
  |                          |<-- Session Token ------|                        |
  |<-- Authenticated --------|                        |                        |
```

### MCP 인증 플로우 (CLI)

```
Claude Desktop          MCP Server               Studio Auth API           Supabase
     |                       |                          |                       |
     |-- Tool 호출 --------->|                          |                       |
     |                       |-- 토큰 없음 감지 -------->|                       |
     |                       |                          |                       |
     |<-- "인증 필요" 메시지 -|                          |                       |
     |                       |                          |                       |
     |-- (사용자가 브라우저에서 로그인) ---------------->|                       |
     |                       |                          |-- OAuth 처리 -------->|
     |                       |                          |<-- Session ----------|
     |                       |                          |                       |
     |                       |<-- Token 저장 -----------|                       |
     |                       |   (~/.tekton/credentials)|                       |
     |                       |                          |                       |
     |-- Tool 재호출 ------->|                          |                       |
     |                       |-- 토큰으로 검증 -------->|                       |
     |<-- 정상 응답 ---------|<-- Theme JSON -----------|                       |
```

---

## 컴포넌트 설계

### AuthProvider

전역 인증 상태를 관리하는 Context Provider입니다.

```typescript
interface AuthContextValue {
  user: User | null;
  session: Session | null;
  licenses: License[];
  isLoading: boolean;
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  hasLicense: (themeId: string) => boolean;
}
```

### useAuth Hook

```typescript
function useAuth(): AuthContextValue;
```

### useLicense Hook

특정 Theme에 대한 라이선스 상태를 확인합니다.

```typescript
function useLicense(themeId: string): {
  hasLicense: boolean;
  tier: 'single' | 'double' | 'creator' | null;
  expiresAt: Date | null;
  isLoading: boolean;
};
```

---

## 기술 제약사항

- **Supabase Client**: @supabase/supabase-js v2.x
- **인증 방식**: OAuth 2.0 (PKCE flow)
- **세션 저장**: Local Storage (Supabase 기본)
- **MCP 토큰 저장**: `~/.tekton/credentials.json`
- **토큰 갱신**: 자동 갱신 (Supabase 내장)
- **보안**: HTTPS 필수, SameSite=Strict 쿠키

---

## 지원 OAuth Provider

| Provider | 우선순위 | 상태 |
|----------|----------|------|
| Google | 높음 | 구현 예정 |
| GitHub | 높음 | 구현 예정 |

---

## 관련 SPEC

- SPEC-STUDIO-001: 랜딩페이지 인증 상태에 따른 UI 분기
- SPEC-PAYMENT-001: 결제 완료 후 라이선스 생성 연동
