/**
 * API Key DELETE Endpoint
 * SPEC-DEPLOY-001 Phase 2.2: API Key 삭제(revoke) API Route
 *
 * WHY: 사용자가 더 이상 사용하지 않는 API Key를 비활성화
 * IMPACT: API Key를 삭제(revoke)하여 MCP 서버 인증 차단
 */

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { revokeApiKey } from '@/lib/db/api-keys';

/**
 * 에러 응답 타입
 */
interface ErrorResponse {
  error: string;
  message: string;
  details?: unknown;
}

/**
 * 성공 응답 타입
 */
interface SuccessResponse {
  success: true;
}

/**
 * DELETE /api/user/api-keys/[id]
 *
 * API Key를 삭제(revoke)합니다.
 * Soft delete: revoked_at 타임스탬프를 설정하여 비활성화
 *
 * @param request Next.js 요청 객체
 * @param params 동적 라우트 파라미터
 * @returns 삭제 성공 여부
 *
 * @example
 * DELETE /api/user/api-keys/123e4567-e89b-12d3-a456-426614174000
 *
 * Response:
 * {
 *   "success": true
 * }
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. params await (Next.js 16 요구사항)
    const { id: keyId } = await params;

    // 2. Supabase 클라이언트 생성
    const supabase = await createClient();

    // 3. 현재 인증된 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'unauthorized',
          message: 'Authentication required',
          details: authError?.message,
        },
        { status: 401 }
      );
    }

    // 4. UUID 형식 검증
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(keyId)) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'validation_error',
          message: 'Invalid API key ID format',
          details: { keyId },
        },
        { status: 400 }
      );
    }

    console.log('[API Keys DELETE] Revoking API key:', {
      keyId,
      user_id: user.id,
    });

    // 5. API Key 삭제(revoke) - soft delete
    const success = await revokeApiKey(keyId, user.id);

    if (!success) {
      return NextResponse.json<ErrorResponse>(
        {
          error: 'not_found',
          message: 'API key not found or already revoked',
        },
        { status: 404 }
      );
    }

    console.log('[API Keys DELETE] API key revoked successfully:', {
      keyId,
      user_id: user.id,
    });

    // 6. 성공 응답
    const response: SuccessResponse = {
      success: true,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[API Keys DELETE] Unexpected error:', error);

    return NextResponse.json<ErrorResponse>(
      {
        error: 'internal_server_error',
        message: 'Failed to revoke API key',
        details: error instanceof Error ? { message: error.message } : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/user/api-keys/[id]
 *
 * CORS preflight 요청 처리
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24시간
    },
  });
}
