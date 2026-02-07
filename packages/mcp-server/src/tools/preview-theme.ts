/**
 * Preview Theme MCP Tool (v2.1)
 * SPEC-MCP-002: E-002 Theme Preview Request
 * SPEC-DEPLOY-001 Phase 4.1: Theme access control
 * Updated for v2.1 theme schema
 */

import { loadTheme, listThemes } from '@tekton/core';
import type { PreviewThemeInput, PreviewThemeOutput } from '../schemas/mcp-schemas.js';
import { createThemeNotFoundError, extractErrorMessage } from '../utils/error-handler.js';
import { getAuthData } from '../auth/state.js';
import { isPremiumTheme } from '../auth/theme-access.js';

/**
 * Preview theme MCP tool implementation
 * SPEC: E-002 Theme Preview Request
 * SPEC-DEPLOY-001 Phase 4.1: Theme access control based on authentication
 *
 * @param input - Theme ID to preview
 * @returns Full v2.1 theme data (MCP JSON-RPC format)
 */
export async function previewThemeTool(input: PreviewThemeInput): Promise<PreviewThemeOutput> {
  try {
    // Check theme access based on authentication
    // Only restrict access for explicitly defined premium themes
    const authData = getAuthData();
    const themeId = input.themeId;

    // Only check premium theme access if theme is explicitly marked as premium
    if (isPremiumTheme(themeId)) {
      // Premium theme requires authentication
      if (!authData || !authData.valid) {
        return {
          success: false,
          error: `Theme "${themeId}" is a premium theme and requires authentication. Please set TEKTON_API_KEY environment variable.`,
        };
      }

      // Check if premium theme is in user's licenses
      if (!authData.themes?.licensed?.includes(themeId)) {
        return {
          success: false,
          error: `Theme "${themeId}" is not included in your license. Please upgrade your plan or purchase this theme.`,
        };
      }
    }
    // Non-premium themes (including unlisted themes) are accessible to all

    // SPEC: U-003 @tekton/core Integration - Use loadTheme from @tekton/core
    const theme = loadTheme(themeId);

    if (!theme) {
      // SPEC: S-002 Theme Availability Check - Provide helpful error with available themes
      const availableThemes = listThemes().map((t: { id: string }) => t.id);
      return createThemeNotFoundError(themeId, availableThemes);
    }

    // Return full v2.1 theme data
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
