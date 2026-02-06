/**
 * Supabase Client (Browser)
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U001] Supabase Auth를 단독 인증 제공자로 사용
 *
 * WHY: 클라이언트 컴포넌트에서 Supabase Auth 사용
 * IMPACT: 브라우저에서 OAuth 플로우 및 세션 관리
 */

'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * 브라우저 환경에서 사용하는 Supabase 클라이언트 생성
 *
 * @returns Supabase 클라이언트 인스턴스
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
