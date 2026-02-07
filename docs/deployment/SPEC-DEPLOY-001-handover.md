# SPEC-DEPLOY-001 Handover Document

## 현재 개발 상태 (2026-02-08 기준)

| Phase | 항목 | 진행률 | 비고 |
|-------|------|--------|------|
| Phase 1 | Vercel 배포 + 환경 설정 | 95% | `.env` 구성 완료, 도메인 설정 필요 |
| Phase 2 | 보안 + 안정성 | 100% | Rate limiting, CSP, E2E 테스트 완료 |
| Phase 3 | Paddle 결제 연동 | 90% | 코드 작성 완료, Sandbox 테스트 대기 |
| Phase 4 | npm 퍼블리시 준비 | 100% | dry-run 검증 완료 |
| Phase 5 | 문서화 + 최종 검증 | 50% | 일부 문서 존재, 최종 정리 필요 |

---

## 이번 세션 완료 내역

### Part A: npm 퍼블리시 준비 (Phase 4 마무리)

1. **prepublishOnly 스크립트** - 6개 패키지 모두 `"prepublishOnly": "pnpm build"` 추가
   - `packages/tokens/package.json`
   - `packages/core/package.json`
   - `packages/esbuild-plugin/package.json`
   - `packages/styled/package.json`
   - `packages/ui/package.json`
   - `packages/mcp-server/package.json`

2. **npm-publish 워크플로우** - `--provenance` 플래그 추가 (공급망 보안)
   - `.github/workflows/npm-publish.yml`

3. **MCP CLI shebang** - `#!/usr/bin/env node` 확인 (소스 + 빌드 출력 모두)

4. **.env.example** - Paddle Price ID 환경변수 3개 추가

5. **dry-run 검증** - 6개 패키지 모두 성공

| 패키지 | 크기 | 파일 수 |
|--------|------|---------|
| @tekton/tokens | 3.5 kB | 15 |
| @tekton/core | 219.2 kB | 255 |
| @tekton/esbuild-plugin | 27.4 kB | 16 |
| @tekton/styled | 5.0 kB | 19 |
| @tekton/ui | 197.2 kB | 344 |
| @tekton/mcp-server | 130.6 kB | 179 |

### Part B: Paddle 결제 연동 (Phase 3)

#### 신규 파일

| 파일 | 용도 |
|------|------|
| `lib/paddle/config.ts` | Paddle 설정 + Price ID 매핑 + tier 변환 |
| `hooks/usePaddle.ts` | Paddle.js 초기화 + `openCheckout()` 헬퍼 |
| `app/api/webhooks/paddle/route.ts` | 웹훅 핸들러 (결제/취소/환불) |
| `app/api/user/licenses/route.ts` | 사용자 라이선스 조회 API |

#### 수정 파일

| 파일 | 변경 내용 |
|------|-----------|
| `app/settings/billing/page.tsx` | 라이선스 목록 표시 (활성/만료), feature flag 연동 |
| `app/studio/template/[id]/page.tsx` | Paddle Checkout Overlay 연결 |

#### 아키텍처

```
사용자 → PricingCard "Buy Now" → usePaddle.openCheckout()
  ↓
Paddle Checkout Overlay → 결제 완료
  ↓
Paddle 서버 → Webhook POST → /api/webhooks/paddle
  ↓
웹훅 서명 검증 → transaction.completed 이벤트 처리
  ↓
Service Role Supabase → user_licenses 테이블에 라이선스 생성
  ↓
Settings > Billing → GET /api/user/licenses → 라이선스 표시
```

#### 웹훅 처리 이벤트

| Paddle 이벤트 | 처리 | 결과 |
|---------------|------|------|
| `transaction.completed` | 라이선스 생성 | `user_licenses` INSERT |
| `subscription.activated` | 로그 기록 | 정보 로그 |
| `subscription.canceled` | 라이선스 비활성화 | `is_active = false` |
| `subscription.past_due` | 경고 로그 | 알림용 |
| `adjustment.created` (refund) | 라이선스 비활성화 | `is_active = false` |

#### 보안

- 웹훅 서명 검증: `@paddle/paddle-node-sdk`의 `unmarshal()` 사용
- Rate limiting: 기존 `rateLimitWebhooks()` (초당 5회)
- RLS 우회: Service Role Supabase 클라이언트
- Idempotency: `paddle_subscription_id`로 중복 트랜잭션 방지
- Feature flag: `NEXT_PUBLIC_ENABLE_PAYMENTS=false`이면 결제 UI 숨김

---

## 남은 작업

### 1. Paddle Sandbox 테스트 (필수)

```
1. Paddle Dashboard (sandbox.paddle.com) 접속
2. Developer Tools > Notifications > 웹훅 엔드포인트 등록
   URL: https://{vercel-domain}/api/webhooks/paddle
3. Catalog > Products/Prices에서 3개 Price 생성
   - Single ($59), Double ($99), Creator Pass ($149/year)
4. Price ID를 .env.local에 설정
5. 테스트 카드(4242 4242 4242 4242)로 결제 테스트
6. 웹훅 수신 확인 → user_licenses 레코드 생성 확인
7. Settings > Billing에서 라이선스 표시 확인
```

### 2. 환경변수 설정 (필수)

`.env.local`에 아래 값 설정 필요:

```bash
# Paddle Sandbox 키 (Dashboard에서 발급)
PADDLE_API_KEY=<sandbox-api-key>
PADDLE_WEBHOOK_SECRET=<webhook-secret>
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=<client-token>
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox

# Price IDs (Catalog에서 생성 후)
NEXT_PUBLIC_PADDLE_PRICE_SINGLE=pri_xxxxx
NEXT_PUBLIC_PADDLE_PRICE_DOUBLE=pri_xxxxx
NEXT_PUBLIC_PADDLE_PRICE_CREATOR=pri_xxxxx

# 결제 기능 활성화
NEXT_PUBLIC_ENABLE_PAYMENTS=true
```

Vercel 배포 시에도 동일한 환경변수를 Dashboard > Settings > Environment Variables에 등록.

### 3. Vercel 환경변수 분리 (권장)

| 환경 | `PADDLE_API_KEY` | `NEXT_PUBLIC_PADDLE_ENVIRONMENT` |
|------|------------------|----------------------------------|
| Preview | Sandbox API Key | `sandbox` |
| Production | Production API Key | `production` |

### 4. Phase 5 문서 마무리 (선택)

- [ ] `docs/deployment/environment-variables-guide.md`에 Paddle 환경변수 섹션 추가
- [ ] `docs/deployment/staging-deployment-checklist.md`에 Paddle 테스트 단계 추가
- [ ] CHANGELOG 업데이트 (Phase 3 + Phase 4 내역)

### 5. Phase 1 잔여 (선택)

- [ ] 커스텀 도메인 설정 (tekton-ui.com → Vercel)
- [ ] Lighthouse CI 워크플로우 활성화 (`.github/workflows/lighthouse-ci.yml` 이미 존재)

---

## 기술 참고사항

### Paddle SDK 버전

- `@paddle/paddle-js@1.6.2` (클라이언트, Checkout Overlay)
- `@paddle/paddle-node-sdk@3.6.0` (서버, 웹훅 검증)

### Paddle v3 환불 처리

Paddle v3에서는 `TransactionRefunded` 이벤트가 없음.
환불은 `AdjustmentCreated` 이벤트로 처리됨 (`action: 'refund' | 'credit'`).

### custom_data 구조

Checkout 시 전달하는 `custom_data`:

```typescript
{
  user_id: string;      // Supabase auth user ID
  theme_id?: string;    // 선택한 테마 ID
  tier: 'single' | 'double' | 'creator';
}
```

### 기존 코드 재사용

| 파일 | 함수 | 용도 |
|------|------|------|
| `lib/db/licenses.ts` | `getUserLicenses()`, `createLicense()`, `updateLicense()` | 라이선스 CRUD |
| `lib/db/types.ts` | `UserLicense`, `LicenseTier` | 타입 정의 |
| `lib/security/rate-limit.ts` | `rateLimitWebhooks()`, `getClientIp()` | 웹훅 보호 |
| `lib/supabase/server.ts` | `createClient()` | 인증된 Supabase 접근 |

---

## npm 퍼블리시 절차

```bash
# 1. 버전 업데이트 (모든 패키지 동일 버전)
pnpm -r exec -- npm version 0.3.0

# 2. 태그 생성 + 푸시
git tag v0.3.0
git push origin v0.3.0

# 3. GitHub Actions가 자동으로 npm-publish.yml 실행
#    - 의존성 순서: tokens → core, esbuild-plugin → styled, ui → mcp-server
#    - --provenance 플래그로 공급망 서명

# 4. 수동 퍼블리시 (필요 시)
cd packages/tokens && pnpm publish --no-git-checks --access public
```

---

*작성일: 2026-02-08*
*작성자: R2-D2 (Claude Code)*
*브랜치: feature/SPEC-DEPLOY-001*
