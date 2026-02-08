/**
 * Theme API Route
 * [SPEC-UI-003]
 *
 * 동적으로 테마 데이터를 로드하는 API 엔드포인트
 * GET /api/themes/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadTheme } from '@tekton-ui/core';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // @tekton-ui/core로 테마 로드
    const theme = loadTheme(id);

    if (!theme) {
      return NextResponse.json({ error: 'Theme not found', themeId: id }, { status: 404 });
    }

    // 테마 데이터 반환
    return NextResponse.json(theme, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Failed to load theme:', error);
    return NextResponse.json(
      {
        error: 'Failed to load theme',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
