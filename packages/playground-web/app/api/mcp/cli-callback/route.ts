/**
 * MCP CLI Callback API
 * CLI login 플로우에서 OAuth 인증 후 API Key를 생성하고
 * localhost 콜백으로 리다이렉트
 *
 * GET /api/mcp/cli-callback?provider=google&callback_port=12345&state=...
 */

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/mcp/cli-callback
 *
 * 1단계: OAuth provider로 리다이렉트
 * - provider, callback_port, state를 받아 OAuth 시작
 * - OAuth 완료 후 /api/mcp/cli-callback/complete로 콜백
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get('provider');
  const callbackPort = searchParams.get('callback_port');
  const state = searchParams.get('state');

  // 파라미터 검증
  if (!callbackPort || !/^\d+$/.test(callbackPort)) {
    return NextResponse.json({ error: 'Invalid callback_port parameter' }, { status: 400 });
  }

  if (!state || state.length < 32) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
  }

  if (!provider || !['google', 'github'].includes(provider)) {
    return NextResponse.json(
      { error: 'Invalid provider. Use "google" or "github"' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();

    // OAuth 완료 후 돌아올 때 사용할 파라미터를 리다이렉트 URL에 포함
    const redirectTo = `${request.nextUrl.origin}/api/auth/callback?next=${encodeURIComponent(
      `/api/mcp/cli-callback/complete?callback_port=${callbackPort}&state=${state}`
    )}`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'github',
      options: {
        redirectTo,
        scopes: 'email profile',
      },
    });

    if (error || !data.url) {
      console.error('[MCP CLI Callback] OAuth URL generation failed:', error);
      return NextResponse.json({ error: 'Failed to start OAuth flow' }, { status: 500 });
    }

    // OAuth URL로 리다이렉트
    return NextResponse.redirect(data.url);
  } catch (err) {
    console.error('[MCP CLI Callback] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
