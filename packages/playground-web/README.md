# Tekton Playground Web

Next.js 16 기반 Tekton 디자인 토큰 생성기 Playground 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: @tanstack/react-query 5.x
- **Validation**: Zod 3.23+
- **Backend**: @tekton/core (workspace package)

## 시작하기

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
MCP_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 개발 서버 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작 (포트 3001)
pnpm dev

# 타입 체크
pnpm type-check

# 린트
pnpm lint
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start
```

## 인증 설정

Tekton Studio는 안전한 OAuth 기반 사용자 로그인을 위해 Supabase Authentication을 사용합니다.

### 사전 요구사항

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. Supabase Dashboard에서 Google 및 GitHub OAuth 제공자 활성화
3. Supabase 인증 정보 복사

### 환경 변수

`packages/playground-web/`에 `.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OAuth (Supabase Dashboard에서 관리)
# 별도 설정 불필요 - Supabase가 자동 관리
```

### 데이터베이스 설정

Supabase 마이그레이션 실행:

```bash
npx supabase migration up
```

다음 항목이 생성됩니다:

- `user_licenses` 테이블 - 사용자 템플릿 라이선스
- `free_screen_templates` 테이블 - 무료 템플릿
- Row Level Security 정책

### 사용 예시

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, hasLicense } = useAuth();

  // 로그인
  await login('google');

  // 라이선스 확인
  const canAccess = hasLicense('premium-template-id');
}
```

자세한 구현 내용은 [SPEC-AUTH-001](/.moai/specs/SPEC-AUTH-001/spec.md)을 참조하세요.

---

## 디렉토리 구조

```
playground-web/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   │   ├── auth/           # 인증 API
│   │   └── mcp/            # MCP API
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 홈 페이지
├── components/             # React 컴포넌트
│   ├── theme/              # 테마 관련 컴포넌트
│   ├── layouts/            # 레이아웃 컴포넌트
│   ├── blueprint/          # Blueprint 관련 컴포넌트
│   └── ui/                 # 재사용 가능한 UI 컴포넌트
├── contexts/               # React Context
│   └── AuthContext.tsx     # 인증 Context Provider
├── lib/                    # 유틸리티 및 헬퍼
│   ├── auth/               # 인증 헬퍼
│   ├── db/                 # 데이터베이스 유틸리티
│   ├── supabase/           # Supabase 클라이언트
│   ├── mcp-client.ts       # MCP 서버 클라이언트
│   ├── schemas.ts          # Zod 스키마
│   └── utils.ts            # 유틸리티 함수
├── supabase/               # Supabase 설정
│   └── migrations/         # 데이터베이스 마이그레이션
└── styles/                 # 전역 스타일
    └── globals.css         # 전역 CSS
```

## MCP 서버 연동

이 애플리케이션은 SPEC-MCP-002 MCP 서버와 통신합니다:

- **서버 주소**: `http://localhost:3000`
- **프로토콜**: JSON-RPC over HTTP
- **주요 메서드**:
  - `generate-blueprint`: Blueprint 생성
  - (추가 메서드는 향후 구현)

## 개발 가이드

### 타입 안전성

- Strict TypeScript 모드 활성화
- Zod를 사용한 런타임 검증
- Path aliases 설정 (`@/*`)

### 코드 품질

- ESLint (Next.js 권장 설정)
- Prettier (코드 포맷팅)
- TypeScript strict 모드

### 성능 최적화

- React Server Components 사용
- Next.js 16 App Router 최적화
- Tailwind CSS JIT 컴파일

## 라이선스

MIT
