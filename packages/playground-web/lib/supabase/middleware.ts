/**
 * Supabase Middleware Helper
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U002] 사용자 세션은 페이지 새로고침 시에도 유지
 *
 * WHY: Next.js Middleware에서 세션 갱신 처리
 * IMPACT: 사용자 세션 자동 갱신으로 로그인 유지
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware에서 Supabase 세션을 갱신하는 헬퍼 함수
 *
 * @param request Next.js 요청 객체
 * @returns 갱신된 응답 객체
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // 세션 갱신 수행 (getUser()를 호출하면 자동으로 세션 갱신)
  await supabase.auth.getUser();

  // 보호된 경로 접근 제어 (선택사항)
  // if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

  return response;
}
