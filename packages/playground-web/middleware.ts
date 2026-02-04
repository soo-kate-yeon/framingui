/**
 * Next.js Middleware for Session Management
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U002] 사용자 세션은 페이지 새로고침 시에도 유지되어야 한다
 *
 * WHY: 모든 요청에서 세션을 자동으로 갱신하고 보호된 라우트에 대한 접근 제어 수행
 * IMPACT: 사용자 로그인 상태 유지 및 인증 필요 페이지 보호
 */

import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 보호된 라우트 목록
 * 인증이 필요한 경로들
 */
const PROTECTED_ROUTES = ['/dashboard'];

/**
 * 공개 라우트 참고
 * 인증 없이 접근 가능한 경로들: /, /auth/login, /auth/callback
 * (현재는 보호된 라우트만 명시적으로 체크하며, 나머지는 모두 공개 라우트로 처리됨)
 */

/**
 * Middleware 함수
 *
 * [TAG-AUTH-001-U002] 사용자 세션은 페이지 새로고침 시에도 유지되어야 한다
 *
 * @param request Next.js 요청 객체
 * @returns 응답 객체 (세션 갱신 완료 또는 리다이렉트)
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. 세션 갱신 수행 (모든 요청)
  const response = await updateSession(request);

  // 2. 보호된 라우트 접근 제어
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // 3. 사용자 인증 상태 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[Middleware] Missing Supabase environment variables');
      return response;
    }

    // 4. 쿠키에서 세션 토큰 확인
    const { createServerClient } = await import('@supabase/ssr');

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Middleware에서는 쿠키 설정이 updateSession에서 이미 처리됨
        },
      },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // 5. 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (error || !user) {
      console.log('[Middleware] Unauthenticated access to protected route:', pathname);
      return NextResponse.redirect(
        new URL('/auth/login', request.url)
      );
    }

    console.log('[Middleware] Authenticated access granted:', {
      userId: user.id,
      path: pathname,
    });
  }

  // 6. 공개 라우트 또는 인증 완료된 요청은 계속 진행
  return response;
}

/**
 * Middleware 설정
 *
 * 적용 대상:
 * - 모든 라우트 (/)
 * - 제외: _next/static, _next/image, favicon.ico, 정적 파일 (svg, png, jpg, etc.)
 *
 * WHY: 정적 파일과 Next.js 내부 경로는 세션 체크가 불필요함
 * IMPACT: 성능 최적화 및 불필요한 세션 갱신 방지
 */
export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로에 적용:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - 이미지 확장자 (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
