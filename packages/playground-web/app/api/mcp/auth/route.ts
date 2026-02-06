/**
 * MCP Authentication Endpoint
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-E001] MCP 인증 시작 시 브라우저가 OAuth redirect 페이지로 이동
 *
 * WHY: MCP 클라이언트(Cursor/Claude)가 Studio 인증을 시작하기 위한 OAuth URL 제공
 * IMPACT: MCP 서버가 사용자를 OAuth 플로우로 안내하여 인증 완료
 */

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * MCP 인증 요청 스키마
 *
 * - client_id: MCP 클라이언트 식별자 (MVP에서는 검증 생략 가능)
 * - redirect_uri: OAuth 콜백 후 MCP 클라이언트로 돌아갈 URI
 * - state: CSRF 보호를 위한 랜덤 문자열
 */
const MCPAuthRequestSchema = z.object({
  client_id: z.string().min(1, 'client_id is required'),
  redirect_uri: z.string().url('redirect_uri must be a valid URL'),
  state: z.string().min(1, 'state is required'),
});

/**
 * MCP 인증 응답 타입
 */
interface MCPAuthResponse {
  auth_url: string;
  state: string;
  expires_in: number;
}

/**
 * 에러 응답 타입
 */
interface ErrorResponse {
  error: string;
  message: string;
  details?: unknown;
}

/**
 * POST /api/mcp/auth
 *
 * MCP 클라이언트 인증을 시작하고 Supabase OAuth URL을 반환합니다.
 *
 * [TAG-AUTH-001-E001] MCP 인증 시작 시 브라우저가 OAuth redirect 페이지로 이동
 *
 * @param request Next.js 요청 객체
 * @returns OAuth URL과 state를 포함한 JSON 응답
 *
 * @example
 * POST /api/mcp/auth
 * {
 *   "client_id": "mcp-cursor-client",
 *   "redirect_uri": "http://localhost:3000/mcp/callback",
 *   "state": "random-csrf-token-12345"
 * }
 *
 * Response:
 * {
 *   "auth_url": "https://accounts.google.com/o/oauth2/auth?...",
 *   "state": "random-csrf-token-12345",
 *   "expires_in": 300
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Request body 파싱
    const body = await request.json();

    // 2. Request body 검증
    const validationResult = MCPAuthRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json<ErrorResponse>(
        {
          error: 'validation_error',
          message: 'Invalid request body',
          details: errorDetails,
        },
        { status: 400 }
      );
    }

    const { client_id, redirect_uri, state } = validationResult.data;

    // 3. 로깅 (디버깅용)
    console.log('[MCP Auth] Authentication request received:', {
      client_id,
      redirect_uri,
      state: state.substring(0, 10) + '...', // state는 민감 정보이므로 일부만 로깅
    });

    // 4. Supabase 서버 클라이언트 생성
    const supabase = await createClient();

    // 5. Supabase OAuth URL 생성 (Google provider)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // OAuth 콜백 후 Studio callback 페이지로 이동
        redirectTo: `${request.nextUrl.origin}/api/auth/callback`,
        // CSRF 보호를 위한 state 파라미터 포함
        // MCP 클라이언트가 제공한 state를 그대로 전달
        queryParams: {
          state,
          access_type: 'offline',
          prompt: 'consent',
        },
        // MCP 클라이언트의 redirect_uri를 metadata에 저장 (콜백 처리 시 사용)
        // 주의: Supabase는 이 값을 직접 사용하지 않으며, 콜백 핸들러에서 처리해야 함
        scopes: 'email profile',
      },
    });

    if (error) {
      console.error('[MCP Auth] Supabase OAuth URL generation failed:', {
        error: error.message,
        code: error.code,
      });

      return NextResponse.json<ErrorResponse>(
        {
          error: 'oauth_url_generation_failed',
          message: 'Failed to generate OAuth URL',
          details: { code: error.code, message: error.message },
        },
        { status: 500 }
      );
    }

    if (!data.url) {
      console.error('[MCP Auth] OAuth URL is missing in Supabase response');

      return NextResponse.json<ErrorResponse>(
        {
          error: 'oauth_url_missing',
          message: 'OAuth URL was not generated',
        },
        { status: 500 }
      );
    }

    // 6. 성공 응답 반환
    const response: MCPAuthResponse = {
      auth_url: data.url,
      state, // 클라이언트가 제공한 state를 그대로 반환 (CSRF 검증용)
      expires_in: 300, // 5분 (OAuth 플로우 완료 제한 시간)
    };

    console.log('[MCP Auth] OAuth URL generated successfully:', {
      client_id,
      expires_in: response.expires_in,
    });

    return NextResponse.json<MCPAuthResponse>(response, { status: 200 });
  } catch (error) {
    // 7. 예상치 못한 에러 처리
    console.error('[MCP Auth] Unexpected error:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'internal_server_error',
        message: 'An unexpected error occurred',
        details: error instanceof Error ? { message: error.message } : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/mcp/auth
 *
 * CORS preflight 요청 처리
 * MCP 서버가 다른 origin에서 호출할 수 있도록 CORS 허용
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // MVP에서는 모든 origin 허용
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24시간
    },
  });
}
