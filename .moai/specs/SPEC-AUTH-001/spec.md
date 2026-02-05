---
id: SPEC-AUTH-001
version: "1.1.0"
status: completed
created: "2026-02-03"
updated: "2026-02-04"
author: soo-kate-yeon
priority: HIGH
---

## HISTORY

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-02-03 | 1.0.0 | 초안 작성 |
| 2026-02-04 | 1.1.0 | 구현 완료 및 문서화 |

---

# SPEC-AUTH-001: Supabase 인증 통합

## 개요

Supabase Authentication을 Studio 애플리케이션의 단독 인증 시스템으로 통합합니다. OAuth 기반 소셜 로그인, 세션 관리, 사용자 데이터 저장을 구현합니다.

---

## 요구사항 (EARS Format)

### Ubiquitous Requirements (항상 활성)

**[TAG-AUTH-001-U001]** 시스템은 Supabase Auth를 단독 인증 제공자로 사용해야 한다.

**[TAG-AUTH-001-U002]** 사용자 세션은 페이지 새로고침 시에도 유지되어야 한다.

**[TAG-AUTH-001-U003]** 사용자 데이터는 PostgreSQL 데이터베이스에 저장되어야 한다.

### Event-Driven Requirements (이벤트 기반)

**[TAG-AUTH-001-E001]** WHEN MCP 인증 시작 THEN 브라우저가 OAuth redirect 페이지로 이동한다.

**[TAG-AUTH-001-E002]** WHEN OAuth 콜백 수신 THEN 사용자 레코드를 생성하거나 업데이트한다.

**[TAG-AUTH-001-E003]** WHEN 로그아웃 요청 THEN 세션을 클리어하고 홈페이지로 리다이렉트한다.

### State-Driven Requirements (상태 기반)

**[TAG-AUTH-001-S001]** IF 사용자가 인증됨 THEN 계정 메뉴와 사용자 정보가 표시되어야 한다.

**[TAG-AUTH-001-S002]** IF 세션이 만료됨 THEN 재인증 프롬프트가 표시되어야 한다.

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
  UNIQUE(user_id, theme_id)
);

-- 인덱스
CREATE INDEX idx_user_licenses_user_id ON user_licenses(user_id);
CREATE INDEX idx_user_licenses_theme_id ON user_licenses(theme_id);
CREATE INDEX idx_user_licenses_is_active ON user_licenses(is_active);
```

### free_screen_templates 테이블

무료로 제공되는 스크린 템플릿 목록을 관리합니다.

```sql
CREATE TABLE free_screen_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기본 무료 템플릿 데이터
INSERT INTO free_screen_templates (template_id, name, description) VALUES
  ('landing-basic', 'Landing Basic', '기본 랜딩 페이지 템플릿'),
  ('signup', 'Sign Up', '회원가입 페이지 템플릿'),
  ('contact-form', 'Contact Form', '문의 양식 템플릿');
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

-- free_screen_templates RLS (공개 읽기)
ALTER TABLE free_screen_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view free templates"
  ON free_screen_templates FOR SELECT
  USING (true);
```

---

## 인증 플로우

### OAuth 로그인 플로우

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
  |                          |                        |                        |
  |                          |-- Create/Update User ->|                        |
  |<-- Authenticated --------|                        |                        |
```

### MCP 인증 플로우

```
Cursor/Claude            MCP Server               Studio Auth API           Supabase
     |                       |                          |                       |
     |-- authenticate() ---->|                          |                       |
     |                       |-- POST /api/mcp/auth --->|                       |
     |                       |                          |-- Generate OAuth URL->|
     |                       |<-- { authUrl, state } ---|                       |
     |<-- Open Browser ------|                          |                       |
     |                       |                          |                       |
     |                       |<-- Callback with code ---|<-- OAuth Callback ----|
     |                       |                          |                       |
     |<-- Token -------------|<-- { token, user } -----|<-- Verify & Session --|
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

### GET /api/auth/callback

OAuth 콜백을 처리합니다.

**Query Parameters**:
- `code`: OAuth authorization code
- `state`: CSRF protection state

### POST /api/auth/logout

사용자 로그아웃을 처리합니다.

**Response**:
```typescript
interface LogoutResponse {
  success: boolean;
  redirect_url: string;
}
```

---

## 컴포넌트 설계

### AuthProvider

전역 인증 상태를 관리하는 Context Provider입니다.

```typescript
interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}
```

### useAuth Hook

인증 상태에 접근하는 커스텀 훅입니다.

```typescript
function useAuth(): AuthContextValue;
```

### AccountMenu

로그인된 사용자의 계정 메뉴를 표시합니다.

```typescript
interface AccountMenuProps {
  user: User;
  onSignOut: () => void;
}
```

---

## 기술 제약사항

- **Supabase Client**: @supabase/supabase-js v2.x
- **인증 방식**: OAuth 2.0 (PKCE flow)
- **세션 저장**: Local Storage (Supabase 기본)
- **토큰 갱신**: 자동 갱신 (Supabase 내장)
- **보안**: HTTPS 필수, SameSite=Strict 쿠키

---

## 지원 OAuth Provider

| Provider | 우선순위 | 상태 |
|----------|----------|------|
| Google | 높음 | 구현 예정 |
| GitHub | 높음 | 구현 예정 |
| Discord | 중간 | 선택사항 |

---

## 관련 SPEC

- SPEC-PAYMENT-001: 결제 완료 후 라이선스 생성 연동
- SPEC-MCP-005: MCP 인증 및 라이선스 검증 연동
