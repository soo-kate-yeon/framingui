/**
 * API Key Database Operations
 * SPEC-DEPLOY-001: MCP 서버 인증을 위한 API Key 관리
 *
 * WHY: MCP 서버가 사용자를 인증하고 라이선스를 확인하기 위한 API Key 시스템
 * IMPACT: 안전한 API Key 생성, 조회, 삭제 기능 제공
 */

import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';
import type { ApiKey, CreateApiKeyData, ApiKeyListItem } from './types';

/**
 * API Key 생성 (bcrypt 해시 사용)
 *
 * @param data API Key 생성 데이터
 * @returns 생성된 API Key 레코드
 * @throws Error 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const apiKey = await createApiKey({
 *   user_id: 'uuid',
 *   name: 'My Claude Desktop',
 *   key_hash: 'hashed_key',
 *   key_prefix: 'tk_live_a1b2'
 * });
 * ```
 */
export async function createApiKey(data: CreateApiKeyData): Promise<ApiKey | null> {
  try {
    const supabase = await createClient();

    const { data: apiKey, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: data.user_id,
        name: data.name,
        key_hash: data.key_hash,
        key_prefix: data.key_prefix,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create API key:', error.message);
      throw new Error(`Failed to create API key: ${error.message}`);
    }

    return apiKey;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.error('Unexpected error creating API key:', error);
    throw new Error('Unexpected error creating API key');
  }
}

/**
 * 사용자의 API Key 목록 조회
 *
 * @param userId 사용자 ID (UUID)
 * @returns API Key 목록 (평문 키 제외)
 * @throws Error 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const keys = await getApiKeysByUserId('uuid');
 * console.log('Total keys:', keys.length);
 * ```
 */
export async function getApiKeysByUserId(userId: string): Promise<ApiKeyListItem[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('api_keys')
      .select('id, key_prefix, name, last_used_at, created_at')
      .eq('user_id', userId)
      .is('revoked_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to get API keys:', error.message);
      throw new Error(`Failed to get API keys: ${error.message}`);
    }

    return data ?? [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.error('Unexpected error getting API keys:', error);
    throw new Error('Unexpected error getting API keys');
  }
}

/**
 * API Key 삭제 (soft delete: revoked_at 설정)
 *
 * @param keyId API Key ID (UUID)
 * @param userId 사용자 ID (UUID) - 권한 검증용
 * @returns 삭제 성공 여부
 * @throws Error 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const success = await revokeApiKey('key-uuid', 'user-uuid');
 * if (success) {
 *   console.log('API Key revoked successfully');
 * }
 * ```
 */
export async function revokeApiKey(keyId: string, userId: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('api_keys')
      .update({ revoked_at: new Date().toISOString() })
      .eq('id', keyId)
      .eq('user_id', userId)
      .is('revoked_at', null);

    if (error) {
      console.error('Failed to revoke API key:', error.message);
      throw new Error(`Failed to revoke API key: ${error.message}`);
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.error('Unexpected error revoking API key:', error);
    throw new Error('Unexpected error revoking API key');
  }
}

/**
 * API Key 생성 헬퍼 (평문 키 생성 + bcrypt 해시)
 *
 * [SECURITY-S2] bcrypt 해싱 + 암호학적으로 안전한 랜덤 생성
 *
 * @returns { key: 평문 키, hash: bcrypt 해시, prefix: 식별용 prefix }
 *
 * @example
 * ```typescript
 * const { key, hash, prefix } = await generateApiKey();
 * // key: "tk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
 * // hash: "$2a$12$..."
 * // prefix: "tk_live_a1b2"
 * ```
 */
export async function generateApiKey(): Promise<{
  key: string;
  hash: string;
  prefix: string;
}> {
  // SECURITY: crypto.randomBytes로 암호학적으로 안전한 난수 생성
  const { randomBytes } = await import('crypto');
  const randomPart = randomBytes(32).toString('hex'); // 64자 hex (32바이트)

  const key = `tk_live_${randomPart}`;

  // bcrypt 해시 생성 (rounds: 12 - Phase 2.4 요구사항)
  // SECURITY: 높은 rounds로 무차별 대입 공격 저항력 강화
  const hash = await bcrypt.hash(key, 12);

  // prefix 추출 (tk_live_ + 첫 4자리)
  const prefix = key.substring(0, 12); // "tk_live_a1b2"

  return { key, hash, prefix };
}

/**
 * API Key 검증 (bcrypt 비교)
 *
 * @param plainKey 평문 API Key
 * @param hashedKey bcrypt 해시된 키
 * @returns 검증 성공 여부
 *
 * @example
 * ```typescript
 * const isValid = await verifyApiKey(plainKey, storedHash);
 * if (isValid) {
 *   console.log('API Key is valid');
 * }
 * ```
 */
export async function verifyApiKey(plainKey: string, hashedKey: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainKey, hashedKey);
  } catch (error) {
    console.error('Failed to verify API key:', error);
    return false;
  }
}
