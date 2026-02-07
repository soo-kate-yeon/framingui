/**
 * Preview Theme MCP Tool (v2.1)
 * SPEC-MCP-002: E-002 Theme Preview Request
 * SPEC-DEPLOY-001: 인증된 사용자의 라이선스 보유 테마만 접근 가능
 */

import { loadTheme, listThemes } from '@tekton/core';
import type { PreviewThemeInput, PreviewThemeOutput } from '../schemas/mcp-schemas.js';
import { createThemeNotFoundError, extractErrorMessage } from '../utils/error-handler.js';
import { getAuthData } from '../auth/state.js';

/**
 * Preview theme MCP tool implementation
 * 인증된 사용자의 라이선스 보유 테마만 미리보기 가능
 *
 * @param input - Theme ID to preview
 * @returns Full v2.1 theme data (MCP JSON-RPC format)
 */
export async function previewThemeTool(input: PreviewThemeInput): Promise<PreviewThemeOutput> {
  try {
    const authData = getAuthData();
    const themeId = input.themeId;

    // 인증 + 라이선스 확인
    if (!authData || !authData.valid) {
      return {
        success: false,
        error: `Authentication required to preview themes. Run \`tekton-mcp login\` to authenticate.`,
      };
    }

    // 라이선스 보유 확인
    const licensedThemes = authData.themes?.licensed || [];
    if (!licensedThemes.includes(themeId)) {
      return {
        success: false,
        error: `Theme "${themeId}" is not included in your license. Please purchase this theme at https://tekton-ui.com.`,
      };
    }

    // @tekton/core에서 테마 로드
    const theme = loadTheme(themeId);

    if (!theme) {
      const availableThemes = listThemes().map((t: { id: string }) => t.id);
      return createThemeNotFoundError(themeId, availableThemes);
    }

    // v2.1 테마 데이터 반환
    return {
      success: true,
      theme: {
        id: theme.id,
        name: theme.name,
        description: theme.description,
        brandTone: theme.brandTone,
        schemaVersion: theme.schemaVersion,
        designDNA: theme.designDNA,
        tokens: {
          atomic: theme.tokens.atomic,
          semantic: theme.tokens.semantic,
          component: theme.tokens.component,
          recipes: (theme.tokens as any).recipes,
        },
        stateLayer: theme.stateLayer,
        motion: theme.motion,
        elevation: theme.elevation,
        typography: theme.typography,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
