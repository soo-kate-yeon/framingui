/**
 * Supabase Client (Server)
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U001] Supabase Auth를 단독 인증 제공자로 사용
 *
 * WHY: 서버 컴포넌트, 서버 액션, 라우트 핸들러에서 Supabase Auth 사용
 * IMPACT: 서버에서 안전한 인증 검증 및 데이터 접근
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * 서버 환경에서 사용하는 Supabase 클라이언트 생성
 *
 * @returns Supabase 클라이언트 인스턴스
 */
export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // 서버 컴포넌트에서 쿠키 설정 시도 시 무시
          // Middleware나 Server Action에서만 쿠키 설정 가능
        }
      },
    },
  });
}
