/**
 * GET /api/mcp/tokens — 레이아웃 토큰 목록 API
 * [SPEC-MCP-007:E-005] fetchTokenList(type) 지원
 * Shell / Page / Section 토큰을 @framingui/core에서 로드하여 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getAllShellTokens,
  getAllMobileShellTokens,
  getAllPageLayoutTokens,
  getAllSectionPatternTokens,
} from '@framingui/core';
import { authenticateMcpRequest } from '@/lib/mcp/auth-helper';

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateMcpRequest(request);
    if (!auth.valid) {
      return auth.response;
    }

    const { searchParams } = new URL(request.url);
    const tokenType = searchParams.get('type') ?? 'all';

    let shells: any[] | undefined;
    let pages: any[] | undefined;
    let sections: any[] | undefined;

    if (tokenType === 'all' || tokenType === 'shell') {
      const webShellTokens = getAllShellTokens();
      const mobileShellTokens = getAllMobileShellTokens();
      const allShellTokens = [...webShellTokens, ...mobileShellTokens];
      shells = allShellTokens.map((token: any) => ({
        id: token.id,
        name: token.id.split('.').pop() || token.id,
        description: token.description,
        platform: token.platform,
      }));
    }

    if (tokenType === 'all' || tokenType === 'page') {
      const pageTokens = getAllPageLayoutTokens();
      pages = pageTokens.map((token: any) => ({
        id: token.id,
        name: token.id.split('.').pop() || token.id,
        description: token.description,
        purpose: token.purpose,
      }));
    }

    if (tokenType === 'all' || tokenType === 'section') {
      const sectionTokens = getAllSectionPatternTokens();
      sections = sectionTokens.map((token: any) => ({
        id: token.id,
        name: token.id.split('.').pop() || token.id,
        description: token.description,
        type: token.type,
      }));
    }

    const total = (shells?.length ?? 0) + (pages?.length ?? 0) + (sections?.length ?? 0);

    return NextResponse.json(
      {
        success: true,
        shells: shells && shells.length > 0 ? shells : undefined,
        pages: pages && pages.length > 0 ? pages : undefined,
        sections: sections && sections.length > 0 ? sections : undefined,
        metadata: { total },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600',
          ...auth.rateLimitHeaders,
        },
      }
    );
  } catch (error) {
    console.error('[MCP Tokens] Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
