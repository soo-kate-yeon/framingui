/**
 * API Key Security Module
 * SPEC-DEPLOY-001 Phase 2.4: API Key 보안
 *
 * WHY: API Key 생성, 검증, 해싱을 안전하게 처리
 * IMPACT: MCP 서버 인증의 핵심 보안 레이어
 */

import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

/**
 * API Key 설정
 */
export const API_KEY_CONFIG = {
  PREFIX: 'tk_live_',
  LENGTH: 32, // 32자 랜덤 + 8자 prefix = 40자 총 길이
  BCRYPT_ROUNDS: 12, // bcrypt 권장 라운드 (보안과 성능 균형)
  PREFIX_DISPLAY_LENGTH: 12, // 사용자에게 표시할 prefix 길이 (tk_live_xxxx)
} as const;

/**
 * API Key 생성 결과
 */
export interface GeneratedApiKey {
  plainKey: string; // 평문 키 (1회만 표시)
  keyHash: string; // bcrypt 해시 (DB 저장용)
  keyPrefix: string; // 식별용 prefix (UI 표시용)
}

/**
 * API Key 검증 결과
 */
export interface ApiKeyVerification {
  valid: boolean;
  userId?: string;
  keyId?: string;
  error?: string;
}

/**
 * 암호학적으로 안전한 API Key 생성
 *
 * [SECURITY] crypto.randomBytes를 사용하여 예측 불가능한 키 생성
 *
 * @returns 평문 키, 해시, prefix를 포함한 객체
 *
 * @example
 * const { plainKey, keyHash, keyPrefix } = await generateApiKey();
 * // plainKey: "tk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
 * // keyHash: "$2b$12$..."
 * // keyPrefix: "tk_live_a1b2"
 */
export async function generateApiKey(): Promise<GeneratedApiKey> {
  // 1. 암호학적으로 안전한 랜덤 바이트 생성
  const randomBytes = crypto.randomBytes(API_KEY_CONFIG.LENGTH);
  const randomHex = randomBytes.toString('hex');

  // 2. prefix와 결합하여 평문 키 생성
  const plainKey = `${API_KEY_CONFIG.PREFIX}${randomHex}`;

  // 3. bcrypt를 사용하여 해시 생성
  // SECURITY: bcrypt는 자동으로 salt를 생성하고 timing-safe 비교 제공
  const bcrypt = await import('bcryptjs');
  const keyHash = await bcrypt.hash(plainKey, API_KEY_CONFIG.BCRYPT_ROUNDS);

  // 4. UI 표시용 prefix 생성 (tk_live_xxxx)
  const keyPrefix = plainKey.substring(0, API_KEY_CONFIG.PREFIX_DISPLAY_LENGTH);

  return {
    plainKey, // 사용자에게 1회만 표시
    keyHash, // DB에 저장
    keyPrefix, // UI 목록에 표시
  };
}

/**
 * API Key 검증 (bcrypt timing-safe 비교)
 *
 * [SECURITY] bcrypt.compare는 timing attack에 안전한 비교 제공
 *
 * @param plainKey 요청에서 받은 평문 API Key
 * @returns 검증 결과 (valid, userId, keyId)
 *
 * @example
 * const result = await verifyApiKey("tk_live_xxx...");
 * if (result.valid) {
 *   console.log("User ID:", result.userId);
 * }
 */
export async function verifyApiKey(
  plainKey: string
): Promise<ApiKeyVerification> {
  try {
    // 1. 입력 검증
    if (!plainKey || typeof plainKey !== 'string') {
      return {
        valid: false,
        error: 'invalid_format',
      };
    }

    // 2. prefix 검증
    if (!plainKey.startsWith(API_KEY_CONFIG.PREFIX)) {
      return {
        valid: false,
        error: 'invalid_prefix',
      };
    }

    // 3. 길이 검증
    const expectedLength = API_KEY_CONFIG.PREFIX.length + API_KEY_CONFIG.LENGTH * 2;
    if (plainKey.length !== expectedLength) {
      return {
        valid: false,
        error: 'invalid_length',
      };
    }

    // 4. Supabase 서버 클라이언트로 DB 조회
    const supabase = await createClient();

    // 5. 활성화된 API Key 목록 조회 (revoked/expired 제외)
    const { data: apiKeys, error: queryError } = await supabase
      .from('api_keys')
      .select('id, user_id, key_hash, expires_at, revoked_at')
      .is('revoked_at', null) // revoked되지 않은 키만
      .order('created_at', { ascending: false });

    if (queryError) {
      console.error('[API Key] Database query error:', queryError);
      return {
        valid: false,
        error: 'database_error',
      };
    }

    if (!apiKeys || apiKeys.length === 0) {
      return {
        valid: false,
        error: 'key_not_found',
      };
    }

    // 6. bcrypt로 모든 키 해시 비교 (timing-safe)
    const bcrypt = await import('bcryptjs');

    for (const apiKey of apiKeys) {
      const isMatch = await bcrypt.compare(plainKey, apiKey.key_hash);

      if (isMatch) {
        // 7. 만료 여부 확인
        if (apiKey.expires_at) {
          const expiresAt = new Date(apiKey.expires_at);
          if (expiresAt < new Date()) {
            return {
              valid: false,
              error: 'key_expired',
            };
          }
        }

        // 8. last_used_at 업데이트 (비동기, 실패해도 무시)
        void (async () => {
          try {
            const { error } = await supabase
              .from('api_keys')
              .update({ last_used_at: new Date().toISOString() })
              .eq('id', apiKey.id);
            if (error) {throw error;}
            console.log('[API Key] Updated last_used_at for key:', apiKey.id);
          } catch (error) {
            console.warn('[API Key] Failed to update last_used_at:', error);
          }
        })();

        // 9. 검증 성공
        return {
          valid: true,
          userId: apiKey.user_id,
          keyId: apiKey.id,
        };
      }
    }

    // 10. 일치하는 키 없음
    return {
      valid: false,
      error: 'key_not_found',
    };
  } catch (error) {
    console.error('[API Key] Unexpected verification error:', error);
    return {
      valid: false,
      error: 'internal_error',
    };
  }
}

/**
 * API Key 유효성 검사 (형식만 검증, DB 조회 없음)
 *
 * @param plainKey 검사할 API Key
 * @returns 형식이 올바른지 여부
 */
export function validateApiKeyFormat(plainKey: string): boolean {
  if (!plainKey || typeof plainKey !== 'string') {
    return false;
  }

  if (!plainKey.startsWith(API_KEY_CONFIG.PREFIX)) {
    return false;
  }

  const expectedLength = API_KEY_CONFIG.PREFIX.length + API_KEY_CONFIG.LENGTH * 2;
  if (plainKey.length !== expectedLength) {
    return false;
  }

  // 16진수 문자만 포함 (prefix 이후)
  const hexPart = plainKey.substring(API_KEY_CONFIG.PREFIX.length);
  const hexRegex = /^[0-9a-f]+$/;
  return hexRegex.test(hexPart);
}
