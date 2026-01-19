/**
 * Builtin Theme Loader
 * Loads bundled theme JSON files for standalone MCP operation
 *
 * @module theme/builtin
 */

import {
  type Theme,
  type ThemeMeta,
  BUILTIN_THEME_IDS,
  type BuiltinThemeId,
} from "./types.js";

// Import all theme JSON files
import saasModern from "./themes/saas-modern.json" with { type: "json" };
import dynamicFitness from "./themes/dynamic-fitness.json" with { type: "json" };
import premiumEditorial from "./themes/premium-editorial.json" with { type: "json" };
import mediaStreaming from "./themes/media-streaming.json" with { type: "json" };
import calmWellness from "./themes/calm-wellness.json" with { type: "json" };
import koreanFintech from "./themes/korean-fintech.json" with { type: "json" };
import warmHumanist from "./themes/warm-humanist.json" with { type: "json" };

/**
 * Map of theme ID to theme data
 */
const THEMES: Record<BuiltinThemeId, Theme> = {
  "saas-modern": saasModern as Theme,
  "dynamic-fitness": dynamicFitness as Theme,
  "premium-editorial": premiumEditorial as Theme,
  "media-streaming": mediaStreaming as Theme,
  "calm-wellness": calmWellness as Theme,
  "korean-fintech": koreanFintech as Theme,
  "warm-humanist": warmHumanist as Theme,
};

/**
 * Get metadata for all built-in themes
 * Returns lightweight theme metadata without full AI context
 *
 * @returns Array of theme metadata
 */
export function getBuiltinThemes(): ThemeMeta[] {
  return BUILTIN_THEME_IDS.map((id) => {
    const theme = THEMES[id];
    return {
      id: theme.id,
      name: theme.name,
      description: theme.description,
      stackInfo: theme.stackInfo,
      brandTone: theme.brandTone,
    };
  });
}

/**
 * Get complete theme data by ID
 *
 * @param themeId - The theme ID to retrieve
 * @returns Full theme data or null if not found
 */
export function getBuiltinTheme(themeId: string): Theme | null {
  if (!isValidThemeId(themeId)) {
    return null;
  }
  return THEMES[themeId as BuiltinThemeId] || null;
}

/**
 * Check if a theme ID is a valid built-in theme
 *
 * @param themeId - The theme ID to validate
 * @returns True if the ID is a valid built-in theme
 */
export function isValidThemeId(themeId: string): boolean {
  return BUILTIN_THEME_IDS.includes(themeId as BuiltinThemeId);
}
