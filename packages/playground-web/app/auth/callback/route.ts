/**
 * Legacy OAuth callback bridge
 *
 * WHY:
 * - 기존 설정/문서에는 /auth/callback 경로가 남아있을 수 있음
 * - 실제 처리 로직은 /api/auth/callback으로 단일화하여 분기 제거
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const target = new URL('/api/auth/callback', requestUrl.origin);

  // 기존 쿼리(code, error, next 등) 그대로 전달
  requestUrl.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  return NextResponse.redirect(target);
}
