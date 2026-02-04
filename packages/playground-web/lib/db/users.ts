/**
 * User Database Operations
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U003] 사용자 데이터는 PostgreSQL 데이터베이스에 저장되어야 한다
 * [TAG-AUTH-001-E002] OAuth 콜백 수신 시 사용자 레코드를 생성하거나 업데이트
 *
 * WHY: 사용자 정보 CRUD 작업을 위한 서버 측 유틸리티
 * IMPACT: 인증된 사용자의 프로필 관리 및 동기화
 */

import { createClient } from '@/lib/supabase/server';
import type { UserProfile, UpdateUserData, DatabaseError } from './types';
import type { User } from '@supabase/supabase-js';

/**
 * 사용자 생성 또는 업데이트
 *
 * [TAG-AUTH-001-E002] OAuth 콜백 수신 시 사용자 레코드를 생성하거나 업데이트
 *
 * @param user Supabase Auth User 객체
 * @returns 생성/업데이트된 사용자 프로필
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const supabase = await createClient();
 * const { data: { user } } = await supabase.auth.getUser();
 * if (user) {
 *   const profile = await createOrUpdateUser(user);
 * }
 * ```
 */
export async function createOrUpdateUser(
  user: User
): Promise<UserProfile | null> {
  try {
    // auth.users는 Supabase가 자동으로 관리하므로
    // 추가 프로필 정보가 필요한 경우 별도 테이블 사용
    // 현재는 auth.users의 정보를 UserProfile 형태로 반환

    const profile: UserProfile = {
      id: user.id,
      email: user.email ?? '',
      created_at: user.created_at,
      updated_at: user.updated_at ?? user.created_at,
    };

    return profile;
  } catch (error) {
    console.error('Failed to create or update user:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to create or update user: ${details}`);
  }
}

/**
 * ID로 사용자 조회
 *
 * @param userId 사용자 ID (UUID)
 * @returns 사용자 프로필 또는 null
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const user = await getUserById('123e4567-e89b-12d3-a456-426614174000');
 * if (user) {
 *   console.log('Email:', user.email);
 * }
 * ```
 */
export async function getUserById(
  userId: string
): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();

    // Supabase Admin API를 사용하여 사용자 정보 조회
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
      console.error('Failed to get user by ID:', error.message);
      throw new Error(`Failed to get user by ID: ${error.message}`);
    }

    if (!data.user) {
      return null;
    }

    const profile: UserProfile = {
      id: data.user.id,
      email: data.user.email ?? '',
      created_at: data.user.created_at,
      updated_at: data.user.updated_at ?? data.user.created_at,
    };

    return profile;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.error('Unexpected error getting user:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Unexpected error getting user: ${details}`);
  }
}

/**
 * 사용자 정보 업데이트
 *
 * @param userId 사용자 ID (UUID)
 * @param data 업데이트할 데이터
 * @returns 업데이트된 사용자 프로필
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const updated = await updateUser(userId, {
 *   email: 'newemail@example.com',
 *   metadata: { display_name: 'John Doe' }
 * });
 * ```
 */
export async function updateUser(
  userId: string,
  data: UpdateUserData
): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();

    // Supabase Admin API를 사용하여 사용자 정보 업데이트
    const { data: updatedUser, error } = await supabase.auth.admin.updateUserById(
      userId,
      {
        email: data.email,
        user_metadata: data.metadata,
      }
    );

    if (error) {
      console.error('Failed to update user:', error.message);
      throw new Error(`Failed to update user: ${error.message}`);
    }

    if (!updatedUser.user) {
      return null;
    }

    const profile: UserProfile = {
      id: updatedUser.user.id,
      email: updatedUser.user.email ?? '',
      created_at: updatedUser.user.created_at,
      updated_at: updatedUser.user.updated_at ?? updatedUser.user.created_at,
    };

    return profile;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.error('Unexpected error updating user:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Unexpected error updating user: ${details}`);
  }
}

/**
 * 현재 인증된 사용자 프로필 가져오기
 *
 * [TAG-AUTH-001-S001] 사용자가 인증됨 상태에서 사용자 정보 표시
 *
 * @returns 현재 사용자 프로필 또는 null
 * @throws DatabaseError 데이터베이스 작업 실패 시
 *
 * @example
 * ```typescript
 * const currentUser = await getCurrentUser();
 * if (currentUser) {
 *   console.log('Logged in as:', currentUser.email);
 * }
 * ```
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Failed to get current user:', error.message);
      return null;
    }

    if (!data.user) {
      return null;
    }

    const profile: UserProfile = {
      id: data.user.id,
      email: data.user.email ?? '',
      created_at: data.user.created_at,
      updated_at: data.user.updated_at ?? data.user.created_at,
    };

    return profile;
  } catch (error) {
    console.error('Unexpected error getting current user:', error);
    return null;
  }
}
