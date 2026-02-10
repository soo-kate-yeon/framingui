/**
 * Rate Limiting Module
 * SPEC-DEPLOY-001 Phase 2.4: API Key 보안 - Rate Limiting
 *
 * WHY: API 엔드포인트를 무차별 공격(brute force)으로부터 보호
 * IMPACT: 서비스 안정성 보장 및 악의적인 요청 차단
 *
 * PRODUCTION NOTES:
 * - 현재 구현은 메모리 기반 (단일 인스턴스용)
 * - Vercel 프로덕션 배포 시 Upstash Redis 또는 Vercel Edge Config 권장
 * - 멀티 인스턴스 환경에서는 공유 상태 저장소 필요
 */

/**
 * Rate Limit 설정
 */
export const RATE_LIMIT_CONFIG = {
  // /api/mcp/verify: 분당 60회 (MCP 서버 초기화 및 도구 호출)
  MCP_VERIFY: {
    maxRequests: 60,
    windowMs: 60 * 1000, // 1분
  },
  // /api/user/api-keys: 분당 10회 (API Key 생성/조회/삭제)
  API_KEYS: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1분
  },
  // /api/webhooks/paddle: 초당 5회 (Paddle 웹훅)
  WEBHOOKS: {
    maxRequests: 5,
    windowMs: 1000, // 1초
  },
} as const;

/**
 * Rate Limit 결과
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp (milliseconds)
}

/**
 * Rate Limit 저장소 인터페이스
 */
interface RateLimitStore {
  count: number;
  resetAt: number;
}

/**
 * 메모리 기반 Rate Limit 저장소
 *
 * PRODUCTION WARNING:
 * - 메모리 기반이므로 서버 재시작 시 초기화됨
 * - Vercel의 Serverless 환경에서는 각 인스턴스마다 독립적으로 동작
 * - 프로덕션에서는 Redis 또는 Edge Config 사용 권장
 */
const rateLimitStore = new Map<string, RateLimitStore>();

/**
 * Rate Limit 정리 (1시간마다 만료된 엔트리 삭제)
 *
 * PERFORMANCE: 메모리 누수 방지
 */
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  },
  60 * 60 * 1000
); // 1시간

/**
 * IP 주소 기반 Rate Limiting
 *
 * [SECURITY] 동일 IP에서 과도한 요청 차단
 *
 * @param identifier 식별자 (IP 주소 또는 API Key)
 * @param maxRequests 최대 요청 수
 * @param windowMs 시간 윈도우 (밀리초)
 * @returns Rate Limit 결과
 *
 * @example
 * const result = await rateLimit(ipAddress, 60, 60000);
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: 'rate_limit_exceeded' },
 *     { status: 429, headers: { 'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)) } }
 *   );
 * }
 */
export async function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // 1. 기존 엔트리 조회
  const existing = rateLimitStore.get(key);

  // 2. 윈도우가 만료되었거나 없으면 새로 생성
  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: resetAt,
    };
  }

  // 3. 요청 수 증가
  existing.count += 1;

  // 4. 제한 초과 확인
  if (existing.count > maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: existing.resetAt,
    };
  }

  // 5. 제한 내 요청
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - existing.count,
    reset: existing.resetAt,
  };
}

/**
 * MCP Verify 엔드포인트용 Rate Limiting
 *
 * @param identifier 식별자 (API Key 또는 IP)
 * @returns Rate Limit 결과
 */
export async function rateLimitMcpVerify(identifier: string): Promise<RateLimitResult> {
  return rateLimit(
    identifier,
    RATE_LIMIT_CONFIG.MCP_VERIFY.maxRequests,
    RATE_LIMIT_CONFIG.MCP_VERIFY.windowMs
  );
}

/**
 * API Keys 엔드포인트용 Rate Limiting
 *
 * @param identifier 식별자 (User ID 또는 IP)
 * @returns Rate Limit 결과
 */
export async function rateLimitApiKeys(identifier: string): Promise<RateLimitResult> {
  return rateLimit(
    identifier,
    RATE_LIMIT_CONFIG.API_KEYS.maxRequests,
    RATE_LIMIT_CONFIG.API_KEYS.windowMs
  );
}

/**
 * Webhook 엔드포인트용 Rate Limiting
 *
 * @param identifier 식별자 (IP 주소)
 * @returns Rate Limit 결과
 */
export async function rateLimitWebhooks(identifier: string): Promise<RateLimitResult> {
  return rateLimit(
    identifier,
    RATE_LIMIT_CONFIG.WEBHOOKS.maxRequests,
    RATE_LIMIT_CONFIG.WEBHOOKS.windowMs
  );
}

/**
 * Rate Limit 헤더 생성
 *
 * @param result Rate Limit 결과
 * @returns HTTP 헤더 객체
 *
 * @example
 * const headers = createRateLimitHeaders(result);
 * return NextResponse.json(data, { headers });
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.reset),
  };
}

/**
 * 요청에서 IP 주소 추출
 *
 * @param request Next.js Request
 * @returns IP 주소 또는 'unknown'
 */
export function getClientIp(request: Request): string {
  // Vercel 환경에서는 x-forwarded-for 또는 x-real-ip 사용
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    if (firstIp) {
      return firstIp.trim();
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

/**
 * 429 Too Many Requests 응답 생성 헬퍼
 *
 * @param result Rate Limit 결과
 * @returns NextResponse with 429 status
 */
export function createRateLimitErrorResponse(result: RateLimitResult): Response {
  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

  return new Response(
    JSON.stringify({
      error: 'rate_limit_exceeded',
      message: 'Too many requests. Please try again later.',
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
        ...createRateLimitHeaders(result),
      },
    }
  );
}

// ============================================================================
// PRODUCTION UPGRADE GUIDE
// ============================================================================

/**
 * UPSTASH REDIS 통합 예시 (프로덕션 권장)
 *
 * 1. Upstash Redis 설치:
 *    ```
 *    pnpm add @upstash/redis
 *    ```
 *
 * 2. 환경변수 설정:
 *    ```
 *    UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
 *    UPSTASH_REDIS_REST_TOKEN=your-token
 *    ```
 *
 * 3. Redis 기반 Rate Limit 구현:
 *    ```typescript
 *    import { Redis } from '@upstash/redis';
 *
 *    const redis = new Redis({
 *      url: process.env.UPSTASH_REDIS_REST_URL,
 *      token: process.env.UPSTASH_REDIS_REST_TOKEN,
 *    });
 *
 *    export async function rateLimitRedis(
 *      identifier: string,
 *      maxRequests: number,
 *      windowMs: number
 *    ): Promise<RateLimitResult> {
 *      const key = `ratelimit:${identifier}`;
 *      const now = Date.now();
 *      const windowStart = now - windowMs;
 *
 *      // Redis sorted set으로 sliding window 구현
 *      const pipeline = redis.pipeline();
 *      pipeline.zadd(key, { score: now, member: `${now}` });
 *      pipeline.zremrangebyscore(key, 0, windowStart);
 *      pipeline.zcard(key);
 *      pipeline.expire(key, Math.ceil(windowMs / 1000));
 *
 *      const results = await pipeline.exec();
 *      const count = results[2] as number;
 *
 *      return {
 *        success: count <= maxRequests,
 *        limit: maxRequests,
 *        remaining: Math.max(0, maxRequests - count),
 *        reset: now + windowMs,
 *      };
 *    }
 *    ```
 *
 * 4. 기존 함수 대체:
 *    ```typescript
 *    export async function rateLimit(...) {
 *      if (process.env.UPSTASH_REDIS_REST_URL) {
 *        return rateLimitRedis(...);
 *      }
 *      return rateLimitMemory(...); // fallback
 *    }
 *    ```
 */

/**
 * VERCEL EDGE CONFIG 통합 예시 (무료, Vercel 전용)
 *
 * 1. Vercel Edge Config 설치:
 *    ```
 *    pnpm add @vercel/edge-config
 *    ```
 *
 * 2. Vercel Dashboard에서 Edge Config 생성
 *
 * 3. 환경변수 자동 설정됨:
 *    ```
 *    EDGE_CONFIG=https://edge-config.vercel.com/...
 *    ```
 *
 * 4. Edge Config 기반 Rate Limit:
 *    ```typescript
 *    import { get, set } from '@vercel/edge-config';
 *
 *    export async function rateLimitEdgeConfig(...) {
 *      const key = `ratelimit:${identifier}`;
 *      const store = await get<RateLimitStore>(key);
 *      // ... 로직은 메모리 기반과 동일
 *      await set(key, updatedStore);
 *    }
 *    ```
 *
 * NOTE: Edge Config는 읽기 성능이 뛰어나지만 쓰기 제한이 있으므로
 *       고빈도 쓰기가 필요한 경우 Redis 권장
 */
