/**
 * OAuth Callback Route Handler
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-E002] OAuth 콜백 수신 시 사용자 레코드를 생성하거나 업데이트
 *
 * WHY: OAuth 제공자로부터 인증 코드를 받아 세션을 생성하고 사용자 정보를 DB에 저장
 * IMPACT: 사용자의 OAuth 로그인 플로우를 완성하여 인증된 세션 제공
 */

import { createClient } from '@/lib/supabase/server';
import { createOrUpdateUser } from '@/lib/db/users';
import { NextRequest, NextResponse } from 'next/server';

/**
 * OAuth 콜백 처리
 *
 * [TAG-AUTH-001-E002] OAuth 콜백 수신 시 사용자 레코드를 생성하거나 업데이트
 *
 * @param request Next.js 요청 객체
 * @returns 리다이렉트 응답 (/dashboard 또는 /auth/login)
 *
 * @example
 * GET /api/auth/callback?code=xxx&state=yyy
 * → 성공: 302 /dashboard
 * → 실패: 302 /auth/login?error=auth_failed
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // 1. Authorization code 검증
  // Note: Supabase uses PKCE for CSRF protection, so state parameter is optional
  if (!code) {
    console.error('[OAuth Callback] Missing authorization code');
    return NextResponse.redirect(
      new URL('/auth/login?error=missing_code', requestUrl.origin)
    );
  }

  try {
    // 2. Supabase 서버 클라이언트 생성
    const supabase = await createClient();

    // 3. PKCE 코드 교환: Authorization code를 세션으로 교환
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('[OAuth Callback] Code exchange failed:', {
        error: exchangeError.message,
        code: exchangeError.code,
      });
      return NextResponse.redirect(
        new URL('/auth/login?error=exchange_failed', requestUrl.origin)
      );
    }

    // 4. 세션 및 사용자 정보 검증
    if (!data.session || !data.user) {
      console.error('[OAuth Callback] Invalid session or user data after exchange');
      return NextResponse.redirect(
        new URL('/auth/login?error=invalid_session', requestUrl.origin)
      );
    }

    // 5. 사용자 레코드 생성 또는 업데이트
    try {
      const userProfile = await createOrUpdateUser(data.user);

      if (!userProfile) {
        console.error('[OAuth Callback] Failed to create/update user profile');
        return NextResponse.redirect(
          new URL('/auth/login?error=user_creation_failed', requestUrl.origin)
        );
      }

      console.log('[OAuth Callback] User authenticated successfully:', {
        userId: userProfile.id,
        email: userProfile.email,
      });
    } catch (dbError) {
      console.error('[OAuth Callback] Database error during user creation:', dbError);
      return NextResponse.redirect(
        new URL('/auth/login?error=database_error', requestUrl.origin)
      );
    }

    // 6. 성공: 원래 페이지 또는 홈페이지로 리다이렉트
    const returnUrl = requestUrl.searchParams.get('returnUrl') || '/';
    console.log('[OAuth Callback] Redirecting to:', returnUrl);
    return NextResponse.redirect(new URL(returnUrl, requestUrl.origin));
  } catch (error) {
    // 7. 예상치 못한 에러 처리
    console.error('[OAuth Callback] Unexpected error:', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=unexpected_error', requestUrl.origin)
    );
  }
}
