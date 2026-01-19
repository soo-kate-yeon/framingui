/**
 * Theme MCP Tools
 * Tool handlers for theme.list and theme.get MCP tools
 *
 * @module theme/tools
 */

import { getBuiltinThemes, getBuiltinTheme, isValidThemeId } from "./builtin.js";
import type { Theme, ThemeMeta } from "./types.js";

/**
 * Tool result wrapper (consistent with other tools)
 */
export interface ToolResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Input schema for theme.get tool
 */
export interface ThemeGetInput {
  themeId: string;
}

/**
 * List all built-in themes
 * MCP Tool: theme.list
 *
 * @returns List of theme metadata sorted by ID
 */
export async function themeList(): Promise<ToolResult<ThemeMeta[]>> {
  try {
    const themes = getBuiltinThemes();

    // Sort by ID for consistent ordering
    const sortedThemes = [...themes].sort((a, b) => a.id.localeCompare(b.id));

    return {
      success: true,
      data: sortedThemes,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to list themes",
    };
  }
}

/**
 * Get complete theme data by ID
 * MCP Tool: theme.get
 *
 * @param input - Contains themeId to retrieve
 * @returns Full theme data or error
 */
export async function themeGet(input: ThemeGetInput): Promise<ToolResult<Theme>> {
  try {
    const { themeId } = input;

    if (!themeId || themeId.trim() === "") {
      return {
        success: false,
        error: "Preset ID is required",
      };
    }

    if (!isValidThemeId(themeId)) {
      return {
        success: false,
        error: `Theme not found: ${themeId}`,
      };
    }

    const theme = getBuiltinTheme(themeId);

    if (!theme) {
      return {
        success: false,
        error: `Theme not found: ${themeId}`,
      };
    }

    return {
      success: true,
      data: theme,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get theme",
    };
  }
}
