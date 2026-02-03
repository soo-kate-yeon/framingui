---
id: SPEC-AUTH-001
type: plan
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-AUTH-001: 구현 계획

## Traceability Tags

- [TAG-AUTH-001-U001] ~ [TAG-AUTH-001-U003]: Ubiquitous Requirements
- [TAG-AUTH-001-E001] ~ [TAG-AUTH-001-E003]: Event-Driven Requirements
- [TAG-AUTH-001-S001] ~ [TAG-AUTH-001-S002]: State-Driven Requirements

---

## 마일스톤

### Phase 1: Supabase 프로젝트 설정 (Primary Goal)

**목표**: Supabase 프로젝트 및 인증 기반 구성

**작업 항목**:
- [ ] Supabase 프로젝트 생성 (또는 기존 프로젝트 설정 확인)
- [ ] OAuth Provider 설정 (Google, GitHub) [TAG-AUTH-001-U001]
- [ ] Redirect URL 설정 (개발/프로덕션)
- [ ] 환경 변수 설정 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

**산출물**:
- Supabase 프로젝트 Dashboard 접근
- .env.local 설정 파일

### Phase 2: 데이터베이스 스키마 구축 (Primary Goal)

**목표**: 사용자 라이선스 및 템플릿 테이블 생성

**작업 항목**:
- [ ] user_licenses 테이블 생성 [TAG-AUTH-001-U003]
- [ ] free_screen_templates 테이블 생성
- [ ] RLS (Row Level Security) 정책 설정
- [ ] 인덱스 생성
- [ ] 초기 무료 템플릿 데이터 삽입

**SQL 실행 순서**:
```sql
-- 1. 테이블 생성
-- 2. 인덱스 생성
-- 3. RLS 활성화
-- 4. RLS 정책 생성
-- 5. 초기 데이터 삽입
```

### Phase 3: AuthProvider 및 Context 구현 (Primary Goal)

**목표**: 전역 인증 상태 관리 시스템 구축

**작업 항목**:
- [ ] Supabase 클라이언트 초기화 설정
- [ ] AuthProvider 컴포넌트 구현
- [ ] useAuth 커스텀 훅 구현
- [ ] 세션 자동 갱신 로직 구현 [TAG-AUTH-001-U002]
- [ ] 세션 만료 감지 및 알림 [TAG-AUTH-001-S002]

**코드 구조**:
```typescript
// lib/supabase/client.ts
export const supabase = createBrowserClient(...)

// contexts/AuthContext.tsx
export function AuthProvider({ children }: PropsWithChildren)

// hooks/useAuth.ts
export function useAuth(): AuthContextValue
```

### Phase 4: OAuth 로그인 플로우 구현 (Secondary Goal)

**목표**: 소셜 로그인 기능 완성

**작업 항목**:
- [ ] Google OAuth 로그인 구현 [TAG-AUTH-001-E001]
- [ ] GitHub OAuth 로그인 구현
- [ ] OAuth 콜백 처리 (/api/auth/callback) [TAG-AUTH-001-E002]
- [ ] 로그인 후 리다이렉트 처리
- [ ] 에러 핸들링 (인증 실패, 네트워크 오류)

**기술 접근**:
```typescript
// OAuth 로그인 시작
const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    },
  });
};
```

### Phase 5: MCP 인증 API 구현 (Secondary Goal)

**목표**: MCP 클라이언트 인증 지원

**작업 항목**:
- [ ] /api/mcp/auth 엔드포인트 구현 [TAG-AUTH-001-E001]
- [ ] OAuth URL 생성 로직
- [ ] State 파라미터 CSRF 보호
- [ ] 콜백 처리 및 토큰 발급
- [ ] MCP 세션 관리

**API 응답 형식**:
```typescript
// 성공 응답
{
  "auth_url": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "state": "random-state-string",
  "expires_in": 600
}

// 에러 응답
{
  "error": "invalid_request",
  "error_description": "Missing required parameter: client_id"
}
```

### Phase 6: UI 컴포넌트 구현 (Secondary Goal)

**목표**: 인증 관련 UI 컴포넌트 완성

**작업 항목**:
- [ ] AccountMenu 컴포넌트 구현 [TAG-AUTH-001-S001]
- [ ] LoginButton 컴포넌트 구현
- [ ] LogoutButton 컴포넌트 구현 [TAG-AUTH-001-E003]
- [ ] AuthLoadingSpinner 컴포넌트
- [ ] SessionExpiredModal 컴포넌트 [TAG-AUTH-001-S002]

**컴포넌트 트리**:
```
Header
├── Logo
├── Navigation
└── AuthSection
    ├── (로그인 전) LoginButton
    └── (로그인 후) AccountMenu
        ├── UserAvatar
        ├── UserInfo
        └── LogoutButton
```

---

## 기술 접근 방식

### Supabase 클라이언트 설정

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// lib/supabase/server.ts (Server Component용)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
```

### AuthContext 구현 패턴

```typescript
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 초기 세션 로드
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 세션 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ... signIn, signOut 구현

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 위험 요소 및 대응 방안

| 위험 요소 | 영향도 | 대응 방안 |
|----------|--------|----------|
| OAuth Provider 설정 오류 | 높음 | Redirect URL 꼼꼼히 확인, 개발/프로덕션 분리 |
| 세션 만료 처리 미흡 | 중간 | onAuthStateChange 이벤트 활용, 사용자 알림 |
| RLS 정책 누락 | 높음 | 모든 테이블에 RLS 적용 검증 |
| MCP 인증 보안 취약점 | 높음 | State 파라미터 검증, HTTPS 강제 |

---

## 의존성

### 선행 조건
- Supabase 계정 및 프로젝트 생성
- OAuth Provider (Google, GitHub) 앱 등록

### 후속 작업
- SPEC-PAYMENT-001: 결제 시스템과 라이선스 연동
- SPEC-MCP-005: MCP 도구의 인증 검증 로직

---

## 환경 변수

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
