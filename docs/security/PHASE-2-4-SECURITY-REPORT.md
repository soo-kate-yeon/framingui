# SPEC-DEPLOY-001 Phase 2.4 보안 분석 리포트

**작성일**: 2026-02-06
**작성자**: expert-security (MoAI-ADK)
**상태**: 구현 완료 + 테스트 필요

---

## 📊 Executive Summary

SPEC-DEPLOY-001 Phase 2.4 API Key 보안 시스템을 분석하고, 보안 취약점을 식별하여 수정했습니다.

### 주요 성과

✅ **심각한 보안 취약점 수정**: `Math.random()` → `crypto.randomBytes`
✅ **Rate Limiting 구현**: 모든 API 엔드포인트에 적용
✅ **bcrypt 강도 향상**: rounds 10 → 12
✅ **보안 모듈 작성**: `lib/security/api-key.ts`, `lib/security/rate-limit.ts`

---

## 🔒 보안 체크리스트 (Phase 2.4 요구사항)

### 1. bcrypt 해싱 ✅ COMPLETE

| 항목 | 요구사항 | 구현 상태 | 위치 |
|------|---------|----------|------|
| bcrypt rounds | 10 이상 | ✅ 12 rounds | `lib/db/api-keys.ts:181` |
| timing-safe 비교 | bcrypt.compare 사용 | ✅ 구현됨 | `app/api/mcp/verify/route.ts:206` |
| key_hash 인덱스 | DB 인덱스 생성 | ✅ 마이그레이션됨 | SPEC-DEPLOY-001.md:128 |

**검증 방법**:
```typescript
// bcrypt rounds 확인
const hash = await bcrypt.hash('test', 12);
console.log(hash.startsWith('$2b$12$')); // true면 성공
```

---

### 2. Rate Limiting ✅ COMPLETE

| 엔드포인트 | 제한 | 구현 상태 | 위치 |
|----------|------|----------|------|
| `/api/mcp/verify` | 분당 60회 | ✅ 구현됨 | `app/api/mcp/verify/route.ts` |
| `/api/user/api-keys` | 분당 10회 | ✅ 구현됨 | `app/api/user/api-keys/route.ts` |
| IP 기반 제한 | 지원 | ✅ 구현됨 | `lib/security/rate-limit.ts:getClientIp` |
| 429 Too Many Requests | 초과 시 반환 | ✅ 구현됨 | `lib/security/rate-limit.ts:139` |

**Rate Limit 헤더**:
- `X-RateLimit-Limit`: 최대 요청 수
- `X-RateLimit-Remaining`: 남은 요청 수
- `X-RateLimit-Reset`: 리셋 시간 (Unix timestamp)
- `Retry-After`: 재시도까지 대기 시간 (초)

**테스트 방법**:
```bash
# 분당 60회 초과 테스트 (MCP Verify)
for i in {1..65}; do
  curl -H "Authorization: Bearer tk_live_xxx..." \
       http://localhost:3001/api/mcp/verify
done
# 61번째 요청부터 429 응답 예상
```

---

### 3. API Key 생성 보안 ✅ COMPLETE

| 항목 | 요구사항 | 구현 상태 | 위치 |
|------|---------|----------|------|
| 랜덤 생성기 | crypto.randomBytes | ✅ 수정됨 | `lib/db/api-keys.ts:175` |
| 키 길이 | 최소 32자 | ✅ 64자 hex | `lib/db/api-keys.ts:175` |
| prefix 강제 | `tk_live_` | ✅ 구현됨 | `lib/db/api-keys.ts:177` |

**BEFORE (취약)**:
```typescript
// ❌ Math.random()은 예측 가능
const randomPart = Array.from({ length: 32 }, () =>
  Math.random().toString(36).charAt(2)
).join('');
```

**AFTER (안전)**:
```typescript
// ✅ crypto.randomBytes는 암호학적으로 안전
const { randomBytes } = await import('crypto');
const randomPart = randomBytes(32).toString('hex'); // 64자 hex
```

---

### 4. 세션 검증 ✅ COMPLETE

| 항목 | 요구사항 | 구현 상태 | 위치 |
|------|---------|----------|------|
| Supabase Auth | 세션 검증 | ✅ 구현됨 | `app/api/user/api-keys/route.ts:60-77` |
| user_id 추출 | 세션에서만 | ✅ 구현됨 | 모든 엔드포인트 |
| 요청 파라미터 무시 | user_id 조작 방지 | ✅ 구현됨 | RLS 정책으로 보장 |

**검증 로직**:
```typescript
// 1. 세션 확인
const { data: { user }, error } = await supabase.auth.getUser();

// 2. user_id는 세션에서만 추출 (요청 body 무시)
if (!user) {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

// 3. DB 쿼리에 user_id 사용
await supabase.from('api_keys').select().eq('user_id', user.id);
```

---

### 5. 입력 검증 ✅ COMPLETE

| 항목 | 요구사항 | 구현 상태 | 위치 |
|------|---------|----------|------|
| name 길이 제한 | 1-100자 | ✅ Zod 스키마 | `app/api/user/api-keys/route.ts:23` |
| SQL Injection 방지 | Supabase Client | ✅ 자동 방지 | 모든 DB 쿼리 |
| XSS 방지 | 출력 이스케이핑 | ✅ Next.js 자동 | React 렌더링 |

**Zod 스키마**:
```typescript
const CreateApiKeySchema = z.object({
  name: z.string().min(1, 'name is required').max(100, 'name is too long'),
});
```

---

## 🚀 Rate Limiting 구현 옵션

### Option 1: 메모리 기반 (현재 구현) ⚠️ 개발용만

**장점**:
- ✅ 추가 의존성 없음
- ✅ 빠른 구현
- ✅ 로컬 개발에 적합

**단점**:
- ❌ 서버 재시작 시 초기화
- ❌ Vercel Serverless 환경에서 인스턴스별 독립 동작
- ❌ 분산 환경 미지원

**사용 환경**: 로컬 개발, 단일 인스턴스

---

### Option 2: Upstash Redis (권장 - 프로덕션) ✅

**장점**:
- ✅ 글로벌 분산 환경 지원
- ✅ Serverless에 최적화 (HTTP API)
- ✅ 무료 플랜 10,000 요청/일
- ✅ Sliding Window 알고리즘 지원

**구현 방법**:

1. **Upstash Redis 설치**:
```bash
pnpm add @upstash/redis
```

2. **환경변수 설정**:
```env
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

3. **Rate Limit 함수 수정**:
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimitRedis(
  identifier: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  // Sliding window 구현
  const pipeline = redis.pipeline();
  pipeline.zadd(key, { score: now, member: `${now}` });
  pipeline.zremrangebyscore(key, 0, windowStart);
  pipeline.zcard(key);
  pipeline.expire(key, Math.ceil(windowMs / 1000));

  const results = await pipeline.exec();
  const count = results[2] as number;

  return {
    success: count <= maxRequests,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - count),
    reset: now + windowMs,
  };
}
```

4. **환경별 분기 처리**:
```typescript
export async function rateLimit(...args) {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    return rateLimitRedis(...args);
  }
  return rateLimitMemory(...args); // fallback
}
```

**비용**:
- Free: 10,000 요청/일
- Pay-as-you-go: $0.2 per 100K 요청

---

### Option 3: Vercel Edge Config (무료) 🆓

**장점**:
- ✅ Vercel 전용, 완전 무료
- ✅ Edge Network 분산
- ✅ 읽기 성능 우수

**단점**:
- ❌ 쓰기 제한 (분당 100회)
- ❌ Rate Limiting에는 부적합 (고빈도 쓰기 필요)

**권장 사용**: 설정 값 저장용 (Rate Limiting 제외)

---

## 🧪 보안 테스트 시나리오

### 시나리오 1: 무효한 API Key ✅

**테스트**:
```bash
curl -X GET http://localhost:3001/api/mcp/verify \
  -H "Authorization: Bearer tk_live_invalid_key_12345"
```

**기대 결과**:
```json
{
  "valid": false,
  "error": "unauthorized",
  "message": "Invalid or expired API key"
}
```
**HTTP 상태 코드**: 401 Unauthorized

---

### 시나리오 2: revoked API Key ✅

**테스트**:
1. API Key 생성
2. DELETE `/api/user/api-keys/{id}` 호출 (revoke)
3. revoked 된 키로 `/api/mcp/verify` 호출

**기대 결과**:
```json
{
  "valid": false,
  "error": "unauthorized",
  "message": "Invalid or expired API key"
}
```
**HTTP 상태 코드**: 401 Unauthorized

---

### 시나리오 3: 만료된 API Key ✅

**테스트**:
1. DB에서 `expires_at`을 과거 날짜로 설정
2. 만료된 키로 `/api/mcp/verify` 호출

**기대 결과**:
```json
{
  "valid": false,
  "error": "unauthorized",
  "message": "API key has expired"
}
```
**HTTP 상태 코드**: 401 Unauthorized

---

### 시나리오 4: Rate Limit 초과 ✅

**테스트**:
```bash
# 분당 60회 초과 (MCP Verify)
for i in {1..65}; do
  curl -H "Authorization: Bearer tk_live_valid_key" \
       http://localhost:3001/api/mcp/verify
  echo "Request $i"
done
```

**기대 결과 (61번째 요청부터)**:
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 42
}
```
**HTTP 상태 코드**: 429 Too Many Requests
**헤더**:
- `Retry-After: 42`
- `X-RateLimit-Limit: 60`
- `X-RateLimit-Remaining: 0`
- `X-RateLimit-Reset: 1675689600000`

---

### 시나리오 5: 세션 없이 API Key 생성 시도 ✅

**테스트**:
```bash
curl -X POST http://localhost:3001/api/user/api-keys \
  -H "Content-Type: application/json" \
  -d '{"name": "Unauthorized Key"}'
```

**기대 결과**:
```json
{
  "error": "unauthorized",
  "message": "Authentication required"
}
```
**HTTP 상태 코드**: 401 Unauthorized

---

### 시나리오 6: 긴 name으로 API Key 생성 시도 ✅

**테스트**:
```bash
curl -X POST http://localhost:3001/api/user/api-keys \
  -H "Content-Type: application/json" \
  -d '{"name": "'$(python3 -c 'print("A" * 101)')'"}' \
  --cookie "supabase-auth-token=valid-token"
```

**기대 결과**:
```json
{
  "error": "validation_error",
  "message": "Invalid request body",
  "details": [
    {
      "field": "name",
      "message": "name is too long"
    }
  ]
}
```
**HTTP 상태 코드**: 400 Bad Request

---

## 📁 구현된 파일 구조

```
packages/playground-web/
├── app/api/
│   ├── mcp/
│   │   └── verify/
│   │       └── route.ts          ✅ Rate Limiting 추가
│   └── user/
│       └── api-keys/
│           └── route.ts          ✅ Rate Limiting 추가
├── lib/
│   ├── security/                 ✅ 신규 생성
│   │   ├── api-key.ts            ✅ API Key 생성/검증
│   │   └── rate-limit.ts         ✅ Rate Limiting
│   └── db/
│       └── api-keys.ts           ✅ crypto.randomBytes로 수정
└── middleware.ts                 (기존 유지)
```

---

## 🔧 필수 패키지 설치

### 1. bcryptjs 설치

```bash
cd /Users/sooyeon/Developer/tekton-SPEC-DEPLOY-001/packages/playground-web
pnpm add bcryptjs
pnpm add -D @types/bcryptjs
```

**이미 설치되어 있는지 확인**:
```bash
grep bcryptjs package.json
```

---

### 2. (선택) Upstash Redis 설치 (프로덕션 권장)

```bash
pnpm add @upstash/redis
```

**환경변수 설정**:
```bash
# .env.local
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

---

## ✅ 최종 체크리스트

### Phase 2.4 완료 여부

- [x] bcrypt rounds: 12 이상 (`lib/db/api-keys.ts:181`)
- [x] timing-safe 비교 (`app/api/mcp/verify/route.ts:206`)
- [x] key_hash 인덱스 (DB 마이그레이션 완료)
- [x] Rate Limiting: `/api/mcp/verify` 분당 60회
- [x] Rate Limiting: `/api/user/api-keys` 분당 10회
- [x] 429 Too Many Requests 응답
- [x] crypto.randomBytes 사용 (안전한 랜덤 생성)
- [x] 최소 32자 길이 (64자 hex 구현)
- [x] `tk_live_` 접두사 강제
- [x] Supabase Auth 세션 검증
- [x] user_id는 세션에서만 추출
- [x] 요청 파라미터의 user_id 무시 (RLS 정책)
- [x] name 길이 제한 (1-100자, Zod)
- [x] SQL Injection 방지 (Supabase Client)
- [x] XSS 방지 (React 자동 이스케이핑)

---

## 🚨 보안 권고사항

### CRITICAL (즉시 조치 필요)

1. ✅ **Math.random() → crypto.randomBytes** (수정 완료)
2. ⚠️ **프로덕션 배포 전 Upstash Redis 통합** (권장)
3. ⚠️ **환경변수 노출 확인** (`.env.local`이 `.gitignore`에 포함되어 있는지 확인)

### HIGH (배포 전 권장)

4. ⚠️ **Rate Limiting 모니터링** (Vercel Analytics 또는 Sentry 통합)
5. ⚠️ **API Key 사용량 알림** (일일 사용량 1000회 초과 시 알림)
6. ⚠️ **Supabase RLS 정책 재검증** (Phase 1.1 완료 확인)

### MEDIUM (향후 개선)

7. 📝 **API Key 만료 정책 구현** (90일 후 자동 만료)
8. 📝 **IP 기반 Rate Limiting 강화** (VPN/Proxy 탐지)
9. 📝 **보안 이벤트 로깅** (CloudWatch 또는 Sentry 통합)

---

## 📊 보안 메트릭스

| 지표 | 목표 | 현재 상태 |
|------|------|----------|
| bcrypt rounds | 12+ | ✅ 12 |
| Rate Limit (MCP) | 60/min | ✅ 60/min |
| Rate Limit (API Keys) | 10/min | ✅ 10/min |
| API Key 길이 | 32+ 자 | ✅ 72자 (`tk_live_` + 64자 hex) |
| 난수 생성기 | crypto 모듈 | ✅ crypto.randomBytes |
| 세션 검증 | Supabase Auth | ✅ 구현됨 |
| 입력 검증 | Zod 스키마 | ✅ 구현됨 |

---

## 🎯 다음 단계 (Phase 2.5 이후)

1. **E2E 테스트 작성** (Playwright)
   - 전체 시나리오 자동화
   - CI/CD 통합

2. **보안 이벤트 모니터링**
   - Rate Limit 초과 알림
   - 무효 API Key 시도 추적
   - 이상 패턴 탐지

3. **API Key 관리 UI**
   - API Key 목록 페이지 (`/profile/api-keys`)
   - Claude Desktop 설정 스니펫 자동 생성
   - 사용량 통계 대시보드

4. **프로덕션 배포**
   - Upstash Redis 통합
   - Vercel 환경변수 설정
   - DNS 전파 확인

---

**보고서 작성 완료**
**다음 작업**: Phase 2.5 (인증 플로우 E2E 테스트)
