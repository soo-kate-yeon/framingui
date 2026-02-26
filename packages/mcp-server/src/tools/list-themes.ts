/**
 * List Themes MCP Tool (v2.1)
 * Lists all available themes from .moai/themes/generated/
 * SPEC-DEPLOY-001: 인증된 사용자의 라이선스 보유 테마만 반환
 */

import { listThemes } from '@framingui/core';
import type { ListThemesOutput } from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';
import { getAccessibleThemes } from '../auth/state.js';

/**
 * List available themes based on authentication status
 * 인증된 사용자의 라이선스 보유 테마만 반환
 * @returns Array of accessible theme metadata from .moai/themes/generated/
 */
export async function listThemesTool(): Promise<ListThemesOutput> {
  try {
    // @framingui/core에서 전체 테마 로드
    const allThemes = listThemes();
    const allThemeIds = allThemes.map(theme => theme.id);

    // 인증 기반 접근 가능 테마 필터링
    const accessibleThemeIds = getAccessibleThemes(allThemeIds);

    // 접근 가능한 테마만 반환
    const filteredThemes = allThemes.filter(theme => accessibleThemeIds.includes(theme.id));

    return {
      success: true,
      themes: filteredThemes.map(theme => ({
        id: theme.id,
        name: theme.name,
        description: theme.description,
        brandTone: theme.brandTone,
        schemaVersion: theme.schemaVersion,
      })),
      count: filteredThemes.length,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
