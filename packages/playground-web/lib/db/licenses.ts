/**
 * License Database Operations
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U003] 사용자 데이터는 PostgreSQL 데이터베이스에 저장되어야 한다
 *
 * WHY: 사용자 라이선스 CRUD 작업 및 검증
 * IMPACT: 템플릿 접근 권한 제어 및 결제 시스템 연동
 */

import { createClient } from '@/lib/supabase/server';
import type { UserLicense, CreateLicenseData, UpdateLicenseData, DatabaseError } from './types';
import { toDatabaseError, createDatabaseError } from './error';

/**
 * 사용자의 모든 라이선스 조회
 *
 * @param userId 사용자 ID (UUID)
 * @returns 사용자의 라이선스 목록
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const licenses = await getUserLicenses(userId);
 * const activeCount = licenses.filter(l => l.is_active).length;
 * console.log(`Active licenses: ${activeCount}`);
 * ```
 */
export async function getUserLicenses(userId: string): Promise<UserLicense[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_licenses')
      .select('*')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false });

    if (error) {
      console.error('Failed to get user licenses:', error.message);
      throw toDatabaseError('Failed to get user licenses', error.message, error.code);
    }

    return (data as UserLicense[]) ?? [];
  } catch (error) {
    if (
      (error as DatabaseError).code !== undefined ||
      (error as DatabaseError).message?.startsWith('Failed to get')
    ) {
      throw error;
    }

    console.error('Unexpected error getting user licenses:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw toDatabaseError('Unexpected error getting user licenses', details);
  }
}

/**
 * 새 라이선스 생성
 *
 * @param license 생성할 라이선스 데이터
 * @returns 생성된 라이선스
 * @throws DatabaseError 데이터베이스 작업 실패 시 (중복 키 포함)
 *
 * @example
 * ```typescript
 * const license = await createLicense({
 *   user_id: userId,
 *   theme_id: 'premium-dashboard',
 *   tier: 'single',
 *   paddle_subscription_id: 'sub_123456',
 * });
 * ```
 */
export async function createLicense(license: CreateLicenseData): Promise<UserLicense> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_licenses')
      .insert({
        user_id: license.user_id,
        theme_id: license.theme_id,
        tier: license.tier,
        paddle_subscription_id: license.paddle_subscription_id ?? null,
        expires_at: license.expires_at ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create license:', error.message);

      // 중복 키 에러 처리
      if (error.code === '23505') {
        throw createDatabaseError(
          'License already exists for this user and theme',
          '23505',
          'UNIQUE constraint violation'
        );
      }

      throw toDatabaseError('Failed to create license', error.message, error.code);
    }

    if (!data) {
      throw createDatabaseError(
        'No data returned after license creation',
        undefined,
        'Insert operation succeeded but no data returned'
      );
    }

    return data as UserLicense;
  } catch (error) {
    // Check if it's already a DatabaseError by checking for message property
    if ((error as any).message && typeof (error as any).message === 'string') {
      if (
        (error as any).message.startsWith('License already exists') ||
        (error as any).message.startsWith('No data returned') ||
        (error as any).message.startsWith('Failed to create') ||
        (error as any).code !== undefined
      ) {
        throw error;
      }
    }

    console.error('Unexpected error creating license:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw toDatabaseError('Unexpected error creating license', details);
  }
}

/**
 * 사용자의 특정 테마 라이선스 확인
 *
 * @param userId 사용자 ID (UUID)
 * @param themeId 테마 ID
 * @returns 라이선스 존재 여부 및 활성 상태
 *
 * @example
 * ```typescript
 * const hasLicense = await checkLicense(userId, 'premium-dashboard');
 * if (hasLicense) {
 *   // 템플릿 접근 허용
 * } else {
 *   // 결제 페이지로 리다이렉트
 * }
 * ```
 */
export async function checkLicense(userId: string, themeId: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_licenses')
      .select('id, is_active, expires_at')
      .eq('user_id', userId)
      .eq('theme_id', themeId)
      .eq('is_active', true)
      .single();

    if (error) {
      // Not found는 정상 케이스 (라이선스 없음)
      if (error.code === 'PGRST116') {
        return false;
      }

      console.error('Failed to check license:', error.message);
      return false;
    }

    if (!data) {
      return false;
    }

    // 만료일 확인 (만료일이 없으면 영구 라이선스)
    if (data.expires_at) {
      const expiresAt = new Date(data.expires_at);
      const now = new Date();

      if (expiresAt < now) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Unexpected error checking license:', error);
    return false;
  }
}

/**
 * 라이선스 업데이트
 *
 * @param licenseId 라이선스 ID (UUID)
 * @param updates 업데이트할 필드
 * @returns 업데이트된 라이선스
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * // 라이선스 등급 업그레이드
 * const updated = await updateLicense(licenseId, {
 *   tier: 'creator',
 *   expires_at: '2027-12-31T23:59:59Z',
 * });
 *
 * // 구독 취소 시 비활성화
 * await updateLicense(licenseId, { is_active: false });
 * ```
 */
export async function updateLicense(
  licenseId: string,
  updates: UpdateLicenseData
): Promise<UserLicense> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_licenses')
      .update(updates)
      .eq('id', licenseId)
      .select()
      .single();

    if (error) {
      console.error('Failed to update license:', error.message);
      throw toDatabaseError('Failed to update license', error.message, error.code);
    }

    if (!data) {
      throw createDatabaseError(
        'License not found',
        'PGRST116',
        'No license found with the given ID'
      );
    }

    return data as UserLicense;
  } catch (error) {
    if ((error as any).message && typeof (error as any).message === 'string') {
      if (
        (error as any).message.startsWith('License not found') ||
        (error as any).message.startsWith('Failed to update') ||
        (error as any).code !== undefined
      ) {
        throw error;
      }
    }

    console.error('Unexpected error updating license:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw toDatabaseError('Unexpected error updating license', details);
  }
}

/**
 * 사용자의 활성 라이선스 수 조회
 *
 * @param userId 사용자 ID (UUID)
 * @returns 활성 라이선스 개수
 *
 * @example
 * ```typescript
 * const activeCount = await getActiveLicenseCount(userId);
 * console.log(`User has ${activeCount} active licenses`);
 * ```
 */
export async function getActiveLicenseCount(userId: string): Promise<number> {
  try {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from('user_licenses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      console.error('Failed to count active licenses:', error.message);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error('Unexpected error counting licenses:', error);
    return 0;
  }
}

/**
 * 만료된 라이선스 비활성화 (배치 작업용)
 *
 * @returns 비활성화된 라이선스 수
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * // Cron job에서 매일 실행
 * const deactivatedCount = await deactivateExpiredLicenses();
 * console.log(`Deactivated ${deactivatedCount} expired licenses`);
 * ```
 */
export async function deactivateExpiredLicenses(): Promise<number> {
  try {
    const supabase = await createClient();

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('user_licenses')
      .update({ is_active: false })
      .eq('is_active', true)
      .lt('expires_at', now)
      .not('expires_at', 'is', null)
      .select();

    if (error) {
      console.error('Failed to deactivate expired licenses:', error.message);
      throw toDatabaseError('Failed to deactivate expired licenses', error.message, error.code);
    }

    return data?.length ?? 0;
  } catch (error) {
    if (
      (error as DatabaseError).code !== undefined ||
      (error as DatabaseError).message?.startsWith('Failed to deactivate')
    ) {
      throw error;
    }

    console.error('Unexpected error deactivating licenses:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw toDatabaseError('Unexpected error deactivating licenses', details);
  }
}
