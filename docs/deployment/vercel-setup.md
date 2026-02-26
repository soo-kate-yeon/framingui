# Vercel 배포 설정 가이드

SPEC-DEPLOY-001 Phase 1.4 및 Phase 5 기준 Vercel Git Integration을 통한 자동 배포 설정 가이드입니다.

## 목차

- [1. Vercel 프로젝트 생성](#1-vercel-프로젝트-생성)
- [2. Git Integration 연결](#2-git-integration-연결)
- [3. 환경변수 설정](#3-환경변수-설정)
- [4. 도메인 설정](#4-도메인-설정)
- [5. 브랜치별 배포 전략](#5-브랜치별-배포-전략)
- [6. 배포 검증](#6-배포-검증)

---

## 1. Vercel 프로젝트 생성

### 1.1 Vercel 계정 연결

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. GitHub 계정으로 로그인
3. "Add New..." → "Project" 선택

### 1.2 프로젝트 설정

**Import Git Repository:**
- Repository: `soo-kate-yeon/tekton` (또는 실제 저장소 이름)
- Framework Preset: **Next.js**

**Build and Output Settings:**
```
Root Directory: packages/playground-web
Build Command: cd ../.. && pnpm install && pnpm --filter @tekton/playground-web build
Output Directory: .next (자동 감지)
Install Command: pnpm install --frozen-lockfile
```

**Environment Variables:**
- 이 단계에서는 건너뛰고 나중에 설정 (다음 섹션 참조)

**Deploy:**
- "Deploy" 버튼 클릭하여 초기 배포 시작

---

## 2. Git Integration 연결

### 2.1 자동 배포 활성화

Vercel은 GitHub 저장소와 연결 시 자동으로 다음 이벤트에 배포를 트리거합니다:

- **Push to `master`**: Production 배포
- **Push to `develop`**: Preview 배포
- **Pull Request**: Preview 배포 (PR 코멘트에 URL 자동 생성)

### 2.2 브랜치 설정

**Vercel Dashboard → Project Settings → Git:**

1. **Production Branch**: `master`
2. **Branch Protection**: 활성화 권장 (GitHub에서 설정)
3. **Ignored Build Step**: 선택사항
   ```bash
   # 특정 경로 변경 시에만 배포 (선택)
   git diff HEAD^ HEAD --quiet -- packages/playground-web/
   ```

---

## 3. 환경변수 설정

### 3.1 Production 환경변수

**Vercel Dashboard → Project Settings → Environment Variables:**

다음 환경변수를 **Production** 환경에 추가:

```bash
# Supabase (SPEC-DEPLOY-001 Phase 1.1)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://framingui.com

# Paddle (SPEC-DEPLOY-001 Phase 3)
PADDLE_API_KEY=your-production-paddle-api-key
PADDLE_WEBHOOK_SECRET=your-production-paddle-webhook-secret
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your-production-client-token
NEXT_PUBLIC_PADDLE_ENVIRONMENT=production

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_MCP_EXPORT=true
```

### 3.2 Preview 환경변수

**Preview** 환경에 별도의 Supabase Staging 프로젝트 및 Paddle Sandbox 사용:

```bash
# Supabase Staging
NEXT_PUBLIC_SUPABASE_URL=https://your-staging-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://dev.framingui.com

# Paddle Sandbox
PADDLE_API_KEY=your-sandbox-paddle-api-key
PADDLE_WEBHOOK_SECRET=your-sandbox-paddle-webhook-secret
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your-sandbox-client-token
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
```

### 3.3 환경변수 보안 검증

**중요:** 다음 항목들을 확인하세요:

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] Git history에 시크릿이 노출되지 않았는지 확인 (`git log --all --full-history --source -- .env*`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY`는 절대 클라이언트 사이드 코드에서 사용하지 않기
- [ ] Vercel Environment Variables는 "Encrypted" 상태 유지

---

## 4. 도메인 설정

### 4.1 Production 도메인

**Vercel Dashboard → Project Settings → Domains:**

1. "Add Domain" 클릭
2. `framingui.com` 입력
3. DNS 설정 안내에 따라 다음 레코드 추가:

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. DNS 전파 대기 (5분~24시간)

### 4.2 Preview 도메인

**develop 브랜치 전용 서브도메인:**

1. "Add Domain" 클릭
2. `dev.framingui.com` 입력
3. DNS 레코드 추가:

```
Type: CNAME
Name: dev
Value: cname.vercel-dns.com
```

4. **Git Branch 매핑:**
   - Domain: `dev.framingui.com`
   - Git Branch: `develop`

### 4.3 도메인 리다이렉트

**www → apex 리다이렉트:**

Vercel은 자동으로 `www.framingui.com` → `framingui.com` 리다이렉트를 생성합니다.

---

## 5. 브랜치별 배포 전략

### 5.1 배포 플로우

```
┌──────────────┐
│  develop     │ ──push──> Preview (dev.framingui.com)
│  브랜치      │           ├─ E2E 테스트 자동 실행
└──────────────┘           └─ Staging 환경변수 사용

       │
       │ PR 생성
       ▼
┌──────────────┐
│  Pull        │ ──auto──> Preview (unique-url.vercel.app)
│  Request     │           ├─ Quality Gate 통과 필요
└──────────────┘           ├─ E2E Tests 통과 필요
                           └─ Security Scan 통과 필요
       │
       │ PR 승인 + Merge
       ▼
┌──────────────┐
│  master      │ ──push──> Production (framingui.com)
│  브랜치      │           ├─ 모든 Quality Gates 통과 확인
└──────────────┘           ├─ Production 환경변수 사용
                           └─ Vercel Analytics 활성화
```

### 5.2 배포 전 자동 체크

Vercel은 다음 GitHub Actions 워크플로우가 성공할 때까지 배포를 대기하도록 설정 가능:

**Vercel Dashboard → Project Settings → Git → Deploy Protection:**
- ✅ `quality-summary` (from quality-gate.yml)
- ✅ `e2e-tests` (from e2e-tests.yml)
- ✅ `npm-audit` (from security-scan.yml)

**권장 설정:**
- **Production Branch (`master`)**: 모든 체크 필수
- **Preview Branches (`develop`)**: Quality Gate만 필수

---

## 6. 배포 검증

### 6.1 Production 배포 후 체크리스트

- [ ] `https://framingui.com` 접속 가능
- [ ] SSL 인증서 정상 (자동 발급)
- [ ] Google OAuth 로그인 정상 동작
- [ ] GitHub OAuth 로그인 정상 동작
- [ ] API Key 발급 기능 동작
- [ ] Paddle Checkout 테스트 (Sandbox)
- [ ] Lighthouse Performance 80+ 달성
- [ ] Vercel Analytics 데이터 수집 시작

### 6.2 Preview 배포 후 체크리스트

- [ ] `https://dev.framingui.com` 접속 가능
- [ ] Staging Supabase 연결 확인
- [ ] Paddle Sandbox 환경 사용 확인
- [ ] E2E 테스트 전체 통과

### 6.3 문제 해결

**배포 실패 시:**

1. **Vercel 빌드 로그 확인:**
   - Vercel Dashboard → Deployments → 실패한 배포 클릭 → "View Function Logs"

2. **흔한 오류 및 해결:**

   - **Error: Cannot find module '@tekton/core'**
     - 원인: 모노레포 의존성 미설치
     - 해결: Build Command에 `pnpm install` 포함 확인

   - **Error: ENOENT: no such file or directory**
     - 원인: Root Directory 설정 오류
     - 해결: Root Directory를 `packages/playground-web`로 변경

   - **Error: Environment variable not found**
     - 원인: Vercel 환경변수 미설정
     - 해결: Vercel Dashboard에서 환경변수 추가 후 Redeploy

3. **Rollback:**
   - Vercel Dashboard → Deployments → 이전 성공한 배포 선택 → "Promote to Production"

---

## 7. Vercel CLI (선택사항)

로컬에서 배포 테스트 및 관리를 위한 Vercel CLI:

### 7.1 설치

```bash
npm install -g vercel
```

### 7.2 로그인

```bash
vercel login
```

### 7.3 프로젝트 연결

```bash
cd packages/playground-web
vercel link
```

### 7.4 Preview 배포

```bash
vercel --prod=false
```

### 7.5 Production 배포

```bash
vercel --prod
```

---

## 8. 추가 최적화

### 8.1 Vercel Analytics 활성화

```tsx
// packages/playground-web/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 8.2 Edge Middleware 캐싱

```typescript
// packages/playground-web/middleware.ts
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  // Supabase 세션 갱신 로직 (이미 구현됨)
  // ...
}
```

---

## 관련 문서

- [Branch Protection 설정 가이드](./branch-protection.md)
- [SPEC-DEPLOY-001 전체 문서](../../.moai/specs/SPEC-DEPLOY-001/SPEC-DEPLOY-001.md)
- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js Deployment 가이드](https://nextjs.org/docs/deployment)

---

**마지막 업데이트:** 2026-02-06
**담당자:** soo-kate-yeon
**SPEC:** SPEC-DEPLOY-001
