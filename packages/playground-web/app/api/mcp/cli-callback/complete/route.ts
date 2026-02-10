/**
 * MCP CLI Callback Complete
 * OAuth 인증 완료 후 API Key 생성 → localhost 콜백으로 리다이렉트
 *
 * GET /api/mcp/cli-callback/complete?callback_port=12345&state=...
 */

import { createClient } from '@/lib/supabase/server';
import { createClient as createServerClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { generateApiKey } from '@/lib/db/api-keys';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const callbackPort = searchParams.get('callback_port');
  const state = searchParams.get('state');

  // 파라미터 검증
  if (!callbackPort || !/^\d+$/.test(callbackPort)) {
    return new NextResponse(
      '<html><body><h1>Error</h1><p>Invalid callback_port.</p></body></html>',
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (!state || state.length < 32) {
    return new NextResponse(
      '<html><body><h1>Error</h1><p>Invalid state parameter.</p></body></html>',
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    // 현재 로그인한 사용자 확인
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !user.email) {
      return new NextResponse(
        '<html><body><h1>Authentication Failed</h1><p>Please try again with `tekton-mcp login`.</p></body></html>',
        { status: 401, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // API Key 생성
    const { key, hash, prefix } = await generateApiKey();

    // Service Role로 API Key를 DB에 저장
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return new NextResponse(
        '<html><body><h1>Server Error</h1><p>Missing configuration.</p></body></html>',
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const adminClient = createServerClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error: insertError } = await adminClient.from('api_keys').insert({
      user_id: user.id,
      key_hash: hash,
      key_prefix: prefix,
      name: 'MCP CLI Login',
    });

    if (insertError) {
      console.error('[MCP CLI Complete] Failed to store API key:', insertError);
      return new NextResponse(
        '<html><body><h1>Error</h1><p>Failed to generate API key.</p></body></html>',
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // localhost 콜백으로 리다이렉트 (보안: localhost만 허용)
    const callbackUrl = `http://127.0.0.1:${callbackPort}/callback?key=${encodeURIComponent(key)}&email=${encodeURIComponent(user.email)}&state=${encodeURIComponent(state)}`;

    return NextResponse.redirect(callbackUrl);
  } catch (err) {
    console.error('[MCP CLI Complete] Unexpected error:', err);
    return new NextResponse(
      '<html><body><h1>Error</h1><p>An unexpected error occurred.</p></body></html>',
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
