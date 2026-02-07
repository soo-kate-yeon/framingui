/**
 * List Themes MCP Tool (v2.1)
 * Lists all available themes from .moai/themes/generated/
 * SPEC-DEPLOY-001 Phase 4.1: Theme filtering based on authentication
 */

import { listThemes } from '@tekton/core';
import type { ListThemesOutput } from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';
import { getAccessibleThemes } from '../auth/state.js';
import { FREE_THEMES } from '../auth/theme-access.js';

/**
 * List available themes based on authentication status
 * - Unauthenticated: Only free themes
 * - Authenticated: Free themes + licensed themes
 * @returns Array of accessible theme metadata from .moai/themes/generated/
 */
export async function listThemesTool(): Promise<ListThemesOutput> {
  try {
    // Get all themes from @tekton/core (v2.1 loader)
    const allThemes = listThemes();
    const allThemeIds = allThemes.map(theme => theme.id);

    // Get accessible themes based on authentication
    const accessibleThemeIds = getAccessibleThemes(allThemeIds, FREE_THEMES);

    // Filter themes to only include accessible ones
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
