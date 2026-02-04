/**
 * Supabase Authentication Helpers
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U001] Supabase Auth를 단독 인증 제공자로 사용
 * [TAG-AUTH-001-E001] OAuth redirect 페이지로 이동
 * [TAG-AUTH-001-E003] 로그아웃 시 세션 클리어 및 리다이렉트
 *
 * WHY: OAuth 인증 플로우 및 세션 관리를 위한 헬퍼 함수
 * IMPACT: 클라이언트 컴포넌트에서 간편한 인증 기능 사용
 */

'use client';

import { createClient } from '@/lib/supabase/client';
import type { Session, User, AuthError } from '@supabase/supabase-js';

/**
 * OAuth 제공자 타입
 */
export type OAuthProvider = 'google' | 'github';

/**
 * OAuth 시작 결과 타입
 */
export interface OAuthResult {
  url: string | null;
  error: AuthError | null;
}

/**
 * 인증 결과 타입 (세션 조회용)
 */
export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

/**
 * Google OAuth 로그인 시작
 *
 * [TAG-AUTH-001-E001] OAuth redirect 페이지로 이동
 *
 * @returns OAuth URL 또는 에러
 *
 * @example
 * ```typescript
 * const { url, error } = await signInWithGoogle();
 * if (error) {
 *   console.error('Login failed:', error.message);
 * } else if (url) {
 *   // 브라우저가 자동으로 OAuth URL로 리다이렉트됨
 * }
 * ```
 */
export async function signInWithGoogle(): Promise<OAuthResult> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    return {
      url: data.url,
      error,
    };
  } catch (err) {
    return {
      url: null,
      error: err as AuthError,
    };
  }
}

/**
 * GitHub OAuth 로그인 시작
 *
 * [TAG-AUTH-001-E001] OAuth redirect 페이지로 이동
 *
 * @returns OAuth URL 또는 에러
 *
 * @example
 * ```typescript
 * const { url, error } = await signInWithGitHub();
 * if (error) {
 *   console.error('Login failed:', error.message);
 * } else if (url) {
 *   // 브라우저가 자동으로 OAuth URL로 리다이렉트됨
 * }
 * ```
 */
export async function signInWithGitHub(): Promise<OAuthResult> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return {
      url: data.url,
      error,
    };
  } catch (err) {
    return {
      url: null,
      error: err as AuthError,
    };
  }
}

/**
 * 사용자 로그아웃
 *
 * [TAG-AUTH-001-E003] 로그아웃 시 세션 클리어 및 리다이렉트
 *
 * @returns 에러 발생 시 에러 객체
 *
 * @example
 * ```typescript
 * const { error } = await signOut();
 * if (!error) {
 *   window.location.href = '/';
 * }
 * ```
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err as AuthError };
  }
}

/**
 * 현재 세션 가져오기
 *
 * [TAG-AUTH-001-U002] 세션은 페이지 새로고침 시에도 유지되어야 한다
 *
 * @returns 현재 세션 또는 null
 *
 * @example
 * ```typescript
 * const session = await getSession();
 * if (session) {
 *   console.log('User ID:', session.user.id);
 * }
 * ```
 */
export async function getSession(): Promise<Session | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Failed to get session:', error.message);
      return null;
    }

    return data.session;
  } catch (err) {
    console.error('Unexpected error getting session:', err);
    return null;
  }
}

/**
 * 현재 인증된 사용자 가져오기
 *
 * [TAG-AUTH-001-U002] 세션은 페이지 새로고침 시에도 유지되어야 한다
 *
 * @returns 현재 사용자 또는 null
 *
 * @example
 * ```typescript
 * const user = await getUser();
 * if (user) {
 *   console.log('Email:', user.email);
 * }
 * ```
 */
export async function getUser(): Promise<User | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Failed to get user:', error.message);
      return null;
    }

    return data.user;
  } catch (err) {
    console.error('Unexpected error getting user:', err);
    return null;
  }
}

/**
 * 세션 갱신
 *
 * [TAG-AUTH-001-S002] 세션 만료 시 재인증 프롬프트 표시
 *
 * @returns 갱신된 세션 또는 에러
 *
 * @example
 * ```typescript
 * const { session, error } = await refreshSession();
 * if (error) {
 *   // 재인증 필요
 *   console.error('Session expired:', error.message);
 * }
 * ```
 */
export async function refreshSession(): Promise<{
  session: Session | null;
  error: AuthError | null;
}> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.refreshSession();

    return {
      session: data.session,
      error,
    };
  } catch (err) {
    return {
      session: null,
      error: err as AuthError,
    };
  }
}

/**
 * 인증 상태 변경 리스너 등록
 *
 * [TAG-AUTH-001-U002] 세션은 페이지 새로고침 시에도 유지되어야 한다
 *
 * @param callback 인증 상태 변경 시 호출될 콜백 함수
 * @returns 구독 해제 함수
 *
 * @example
 * ```typescript
 * const unsubscribe = onAuthStateChange((event, session) => {
 *   if (event === 'SIGNED_IN') {
 *     console.log('User signed in:', session?.user.email);
 *   } else if (event === 'SIGNED_OUT') {
 *     console.log('User signed out');
 *   }
 * });
 *
 * // 컴포넌트 언마운트 시
 * unsubscribe();
 * ```
 */
export function onAuthStateChange(
  callback: (
    event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'USER_UPDATED',
    session: Session | null
  ) => void
): () => void {
  const supabase = createClient();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    // 관련 이벤트만 콜백 호출
    if (
      event === 'SIGNED_IN' ||
      event === 'SIGNED_OUT' ||
      event === 'TOKEN_REFRESHED' ||
      event === 'USER_UPDATED'
    ) {
      callback(event, session);
    }
  });

  // 구독 해제 함수 반환
  return () => {
    subscription.unsubscribe();
  };
}
