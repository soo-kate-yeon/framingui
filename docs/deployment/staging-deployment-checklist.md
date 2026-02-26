# SPEC-DEPLOY-001 Phase 5.2: Staging Deployment 체크리스트

Phase 5.2 Staging Deployment 설정 및 검증을 위한 단계별 체크리스트입니다.

## 목차

- [1. Vercel 프로젝트 설정 확인](#1-vercel-프로젝트-설정-확인)
- [2. 환경변수 설정 검증](#2-환경변수-설정-검증)
- [3. Preview 배포 테스트](#3-preview-배포-테스트)
- [4. 성능 테스트 설정](#4-성능-테스트-설정)
- [5. 최종 검증](#5-최종-검증)

---

## 1. Vercel 프로젝트 설정 확인

### 1.1 기본 설정 검증

**Vercel Dashboard → Project Settings → General:**

- [ ] **Project Name**: `tekton-playground-web` (또는 원하는 이름)
- [ ] **Framework Preset**: Next.js
- [ ] **Root Directory**: `packages/playground-web`
- [ ] **Node.js Version**: 20.x (자동 감지)

### 1.2 Build & Development Settings

**Vercel Dashboard → Project Settings → Build & Development Settings:**

```bash
# Build Command (필수)
cd ../.. && pnpm install && pnpm --filter @tekton/playground-web build

# Output Directory (자동 감지)
.next

# Install Command (필수)
pnpm install --frozen-lockfile

# Development Command (선택)
pnpm dev
```

**검증:**
- [ ] Build Command에 `cd ../..`로 monorepo root 이동 확인
- [ ] `pnpm --filter` 사용하여 특정 패키지만 빌드
- [ ] `--frozen-lockfile` 옵션으로 의존성 고정

### 1.3 Git Integration 설정

**Vercel Dashboard → Project Settings → Git:**

- [ ] **Production Branch**: `master`
- [ ] **Automatic deployments**: 활성화
- [ ] **Deploy Previews**: 모든 브랜치에서 활성화
- [ ] **Comments on Pull Requests**: 활성화

**브랜치 전략:**
```
master    → Production (framingui.com)
develop   → Preview (dev.framingui.com)
feature/* → Preview (auto-generated URL)
```

---

## 2. 환경변수 설정 검증

### 2.1 필수 환경변수 비교표

| 환경변수 | Production | Preview (Staging) | 설명 |
|---------|-----------|------------------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 프로덕션 Supabase URL | 스테이징 Supabase URL | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 프로덕션 Anon Key | 스테이징 Anon Key | 공개 가능한 클라이언트 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | 프로덕션 Service Key | 스테이징 Service Key | 서버 전용, 절대 노출 금지 |
| `NEXT_PUBLIC_APP_URL` | `https://framingui.com` | `https://dev.framingui.com` | 앱 기본 URL |
| `NEXT_PUBLIC_ENABLE_AUTH` | `true` | `true` | 인증 기능 활성화 |
| `NEXT_PUBLIC_ENABLE_PAYMENTS` | `true` | `false` | 결제 기능 (Staging에서는 비활성화) |
| `NEXT_PUBLIC_ENABLE_MCP_EXPORT` | `true` | `true` | MCP Export 기능 |
| `NEXT_PUBLIC_DEBUG_MODE` | `false` | `true` | 디버그 모드 (Staging에서만) |
| `PADDLE_API_KEY` | 프로덕션 API Key | Sandbox API Key | **Phase 3 미완료, 보류** |
| `PADDLE_WEBHOOK_SECRET` | 프로덕션 Secret | Sandbox Secret | **Phase 3 미완료, 보류** |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | 프로덕션 Token | Sandbox Token | **Phase 3 미완료, 보류** |
| `NEXT_PUBLIC_PADDLE_ENVIRONMENT` | `production` | `sandbox` | **Phase 3 미완료, 보류** |

### 2.2 Vercel Dashboard 환경변수 설정

**Vercel Dashboard → Project Settings → Environment Variables:**

#### Production 환경변수 추가

1. Variable Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`
   - Environment: **Production** 체크

2. Variable Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `your-production-anon-key`
   - Environment: **Production** 체크

3. Variable Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: `your-production-service-role-key`
   - Environment: **Production** 체크
   - **Sensitive** 플래그 활성화 (자동 암호화)

4. Variable Name: `NEXT_PUBLIC_APP_URL`
   - Value: `https://framingui.com`
   - Environment: **Production** 체크

5. Variable Name: `NEXT_PUBLIC_ENABLE_AUTH`
   - Value: `true`
   - Environment: **Production, Preview** 체크

6. Variable Name: `NEXT_PUBLIC_ENABLE_PAYMENTS`
   - Value: `true` (Production), `false` (Preview)
   - Environment: 각각 별도로 추가

7. Variable Name: `NEXT_PUBLIC_ENABLE_MCP_EXPORT`
   - Value: `true`
   - Environment: **Production, Preview** 체크

8. Variable Name: `NEXT_PUBLIC_DEBUG_MODE`
   - Value: `false` (Production), `true` (Preview)
   - Environment: 각각 별도로 추가

#### Preview 환경변수 추가

**중요:** Staging 전용 Supabase 프로젝트 생성 권장

옵션 1: 별도 Staging Supabase 프로젝트 (권장)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-staging-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key
NEXT_PUBLIC_APP_URL=https://dev.framingui.com
```

옵션 2: Production Supabase 재사용 (간단하지만 권장하지 않음)
```bash
# Production과 동일한 Supabase 키 사용
# 단, APP_URL은 반드시 dev.framingui.com으로 설정
NEXT_PUBLIC_APP_URL=https://dev.framingui.com
```

### 2.3 환경변수 보안 검증

**체크리스트:**
- [ ] `.env.local`, `.env` 파일이 `.gitignore`에 포함되어 있음
- [ ] Git history에 시크릿 노출 없음 확인:
  ```bash
  git log --all --full-history --source -- .env*
  ```
- [ ] `SUPABASE_SERVICE_ROLE_KEY`는 서버 사이드에서만 사용
- [ ] Vercel 환경변수에 "Encrypted" 표시 확인
- [ ] `.env.example` 파일에 실제 값 없이 플레이스홀더만 포함

---

## 3. Preview 배포 테스트

### 3.1 develop 브랜치 생성 및 배포

**로컬에서 develop 브랜치 생성:**

```bash
# develop 브랜치 생성
git checkout -b develop

# 현재 master 브랜치와 동기화
git merge master

# GitHub에 push
git push -u origin develop
```

**Vercel에서 자동 배포 확인:**
- [ ] Vercel Dashboard → Deployments에서 develop 브랜치 배포 시작 확인
- [ ] 빌드 로그에서 에러 없음 확인
- [ ] Preview URL 생성 확인 (예: `tekton-playground-web-git-develop-username.vercel.app`)

### 3.2 커스텀 도메인 연결 (dev.framingui.com)

**Vercel Dashboard → Project Settings → Domains:**

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
   - "Assign" 클릭

**검증:**
- [ ] DNS 전파 완료 (5분~1시간 소요)
- [ ] `https://dev.framingui.com` 접속 가능
- [ ] SSL 인증서 자동 발급 확인 (자물쇠 아이콘)

### 3.3 Preview 배포 기능 테스트

**Pull Request 기반 Preview 배포:**

1. 새로운 feature 브랜치 생성:
   ```bash
   git checkout -b feature/test-preview
   echo "# Test Preview" >> README.md
   git add README.md
   git commit -m "test: Preview 배포 테스트"
   git push -u origin feature/test-preview
   ```

2. GitHub에서 Pull Request 생성:
   - Base: `develop`
   - Compare: `feature/test-preview`

3. Vercel Bot 댓글 확인:
   - [ ] Preview URL 자동 생성 (예: `tekton-playground-web-git-feature-test-username.vercel.app`)
   - [ ] "Visit Preview" 링크 클릭하여 접속 가능

4. PR에서 코드 수정 후 push:
   - [ ] Vercel이 자동으로 재배포
   - [ ] 새로운 Preview URL 생성 (또는 기존 URL 업데이트)

**검증 완료:**
- [ ] PR별 독립적인 Preview URL 생성
- [ ] 코드 변경 시 자동 재배포
- [ ] Preview 환경변수 적용 확인 (`NEXT_PUBLIC_DEBUG_MODE=true`)

---

## 4. 성능 테스트 설정

### 4.1 Lighthouse CI GitHub Actions 설정

**파일 생성: `.github/workflows/lighthouse-ci.yml`**

```yaml
name: Lighthouse CI

on:
  push:
    branches: [develop]
  pull_request:
    branches: [master, develop]

jobs:
  lighthouse:
    name: Lighthouse Performance Audit
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Wait for Vercel Preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.2
        id: wait-for-vercel
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 300
          check_interval: 10

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            ${{ steps.wait-for-vercel.outputs.url }}
            ${{ steps.wait-for-vercel.outputs.url }}/studio
          uploadArtifacts: true
          temporaryPublicStorage: true
          budgetPath: ./lighthouse-budget.json

      - name: Check Lighthouse scores
        run: |
          echo "Performance: ${{ steps.lighthouse.outputs.manifest[0].summary.performance }}"
          echo "Accessibility: ${{ steps.lighthouse.outputs.manifest[0].summary.accessibility }}"
          echo "Best Practices: ${{ steps.lighthouse.outputs.manifest[0].summary.best-practices }}"
          echo "SEO: ${{ steps.lighthouse.outputs.manifest[0].summary.seo }}"

      - name: Comment PR with Lighthouse results
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const results = `
            ## ⚡ Lighthouse CI Results

            | Category | Score |
            |----------|-------|
            | 🎨 Performance | ${manifest[0].summary.performance} |
            | ♿ Accessibility | ${manifest[0].summary.accessibility} |
            | ✅ Best Practices | ${manifest[0].summary['best-practices']} |
            | 🔍 SEO | ${manifest[0].summary.seo} |

            [View Full Report](${manifest[0].url})
            `;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: results
            });
```

**파일 생성: `lighthouse-budget.json`**

```json
[
  {
    "path": "/*",
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 300
      },
      {
        "resourceType": "stylesheet",
        "budget": 50
      },
      {
        "resourceType": "image",
        "budget": 200
      },
      {
        "resourceType": "total",
        "budget": 800
      }
    ],
    "timings": [
      {
        "metric": "interactive",
        "budget": 3000
      },
      {
        "metric": "first-contentful-paint",
        "budget": 1500
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
      }
    ]
  }
]
```

### 4.2 성능 목표 설정

**Phase 5.2 성능 목표:**

| 지표 | 목표 | 설명 |
|-----|------|------|
| **Performance** | 80+ | Core Web Vitals 최적화 |
| **Accessibility** | 90+ | WCAG AA 준수 |
| **Best Practices** | 90+ | 보안 헤더, HTTPS 등 |
| **SEO** | 90+ | 메타 태그, 시맨틱 HTML |
| **First Contentful Paint (FCP)** | < 1.5s | 첫 콘텐츠 렌더링 시간 |
| **Largest Contentful Paint (LCP)** | < 2.5s | 주요 콘텐츠 렌더링 시간 |
| **Total Blocking Time (TBT)** | < 200ms | 메인 스레드 블로킹 시간 |
| **Cumulative Layout Shift (CLS)** | < 0.1 | 레이아웃 이동 |

### 4.3 Vercel Speed Insights 통합

**파일: `packages/playground-web/app/layout.tsx` (이미 구현됨)**

```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Vercel Dashboard 확인:**
- [ ] Vercel Dashboard → Project → Analytics 탭에서 데이터 수집 확인
- [ ] Speed Insights 탭에서 Core Web Vitals 지표 확인
- [ ] Real User Monitoring (RUM) 데이터 수집 시작

### 4.4 성능 최적화 권장 사항

**이미 적용된 최적화:**
- ✅ Next.js Image Optimization (next/image)
- ✅ Server Components (App Router)
- ✅ Code Splitting (자동)
- ✅ Font Optimization (next/font)

**추가 최적화 고려 사항:**
- [ ] Static Generation (SSG) 적용 가능한 페이지 확인
- [ ] Incremental Static Regeneration (ISR) 적용
- [ ] Edge Functions 활용 (인증 미들웨어 등)
- [ ] Bundle Analyzer로 번들 사이즈 분석
  ```bash
  pnpm add -D @next/bundle-analyzer
  ```

---

## 5. 최종 검증

### 5.1 Staging 환경 기능 테스트

**dev.framingui.com 접속 후 체크리스트:**

- [ ] **홈페이지 로딩**: 3초 이내 First Contentful Paint
- [ ] **Google OAuth 로그인**: Staging Supabase 연결 정상
- [ ] **GitHub OAuth 로그인**: Staging Supabase 연결 정상
- [ ] **API Key 발급**: 정상 동작
- [ ] **Design Token 생성**: 정상 동작
- [ ] **MCP Export**: 정상 동작
- [ ] **Responsive Design**: 모바일, 태블릿 화면 정상
- [ ] **Dark Mode**: 테마 전환 정상

**디버그 모드 확인:**
- [ ] 브라우저 콘솔에서 `console.log` 출력 확인 (Preview 환경에서만)
- [ ] `NEXT_PUBLIC_DEBUG_MODE=true` 환경변수 적용 확인

### 5.2 배포 자동화 검증

**develop 브랜치 push 시나리오:**

1. 코드 변경 후 commit:
   ```bash
   git checkout develop
   echo "# Update" >> README.md
   git add README.md
   git commit -m "docs: README 업데이트"
   ```

2. GitHub에 push:
   ```bash
   git push origin develop
   ```

3. Vercel 자동 배포 확인:
   - [ ] Vercel Dashboard → Deployments에서 새 배포 시작
   - [ ] GitHub Actions Quality Gate 통과 후 배포 진행
   - [ ] `dev.framingui.com`에 변경사항 반영 (2~3분 소요)

**Pull Request 시나리오:**

1. feature 브랜치에서 PR 생성:
   ```bash
   git checkout -b feature/test-staging
   # 코드 변경
   git push -u origin feature/test-staging
   ```

2. GitHub에서 PR 생성 후:
   - [ ] Vercel Bot이 Preview URL 댓글 추가
   - [ ] Quality Gate 워크플로우 실행
   - [ ] E2E Tests 워크플로우 실행
   - [ ] Lighthouse CI 워크플로우 실행 (새로 추가됨)

3. 모든 체크 통과 후:
   - [ ] PR Merge 가능 상태 확인
   - [ ] Merge 시 develop 브랜치 자동 재배포

### 5.3 Rollback 테스트

**배포 실패 시나리오:**

1. 의도적으로 빌드 실패 유발:
   ```typescript
   // packages/playground-web/app/page.tsx
   export default function Home() {
     return <div>{undefinedVariable}</div>; // 에러 유발
   }
   ```

2. Push 후 배포 실패 확인:
   - [ ] Vercel Dashboard에서 "Failed" 상태 확인
   - [ ] 빌드 로그에서 에러 메시지 확인

3. Rollback 수행:
   - [ ] Vercel Dashboard → Deployments → 이전 성공 배포 선택
   - [ ] "Promote to Production" (또는 "Redeploy") 클릭
   - [ ] `dev.framingui.com`에 이전 버전 복구 확인

### 5.4 모니터링 설정 확인

**Vercel Dashboard 확인:**
- [ ] **Analytics**: 페이지뷰, 사용자 통계 수집 시작
- [ ] **Speed Insights**: Core Web Vitals 데이터 수집
- [ ] **Logs**: Function 로그 수집 및 필터링 가능
- [ ] **Integrations**: Slack, Discord 알림 설정 (선택)

**알림 설정 (선택사항):**
- [ ] Vercel Dashboard → Project Settings → Notifications
- [ ] Deployment Failed → Email/Slack 알림 활성화
- [ ] Deployment Succeeded → 선택적 알림

---

## 체크리스트 요약

### Phase 5.2 완료 기준

**필수 항목:**
- [x] Vercel 프로젝트 설정 완료
- [x] Production 환경변수 설정 완료
- [x] Preview 환경변수 설정 완료
- [x] develop 브랜치 → dev.framingui.com 배포 성공
- [x] Pull Request Preview URL 자동 생성 확인
- [x] Lighthouse CI 워크플로우 추가
- [x] 성능 목표 달성 (Performance 80+, Accessibility 90+)

**선택 항목:**
- [ ] 별도 Staging Supabase 프로젝트 생성
- [ ] Paddle Sandbox 환경변수 추가 (Phase 3 완료 후)
- [ ] Vercel CLI 설치 및 로컬 테스트
- [ ] Slack/Discord 배포 알림 설정
- [ ] Bundle Analyzer 설정

---

**다음 단계:** Phase 5.3 Production Deployment

**관련 문서:**
- [Vercel 배포 설정 가이드](./vercel-setup.md)
- [Branch Protection 설정](./branch-protection.md)
- [성능 최적화 가이드](../guides/performance-optimization.md)

---

**마지막 업데이트:** 2026-02-07
**담당자:** soo-kate-yeon
**SPEC:** SPEC-DEPLOY-001 Phase 5.2
