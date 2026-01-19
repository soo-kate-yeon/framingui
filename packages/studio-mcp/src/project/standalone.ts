/**
 * Standalone Project Tools
 * Tool handlers for project.status and project.useBuiltinTheme MCP tools
 *
 * @module project/standalone
 */

import { readConfig, updateConfig, getDefaultConfig } from "./config.js";
import type { TektonConfig, ConnectionMode } from "./config-types.js";
import { getBuiltinTheme, isValidThemeId } from "../theme/builtin.js";
import type { ThemeMeta } from "../theme/types.js";
import { ProjectTools } from "./tools.js";

/**
 * Tool result wrapper (consistent with other tools)
 */
export interface ToolResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Input schema for project.status tool
 */
export interface ProjectStatusInput {
  projectPath?: string;
}

/**
 * Input schema for project.useBuiltinTheme tool
 */
export interface UseBuiltinThemeInput {
  themeId: string;
  projectPath?: string;
}

/**
 * Project status response
 */
export interface ProjectStatusResponse {
  mode: ConnectionMode;
  project: {
    name: string;
    frameworkType: string;
    detectedAt: string;
  } | null;
  activeTheme: {
    id: string;
    name: string;
    brandTone: string;
    selectedAt: string;
  } | null;
}

/**
 * Use builtin theme response
 */
export interface UseBuiltinThemeResponse {
  theme: ThemeMeta;
  config: TektonConfig;
}

// Singleton project tools instance for framework detection
const projectTools = new ProjectTools();

/**
 * Get project status including mode and active preset
 * MCP Tool: project.status
 *
 * @param input - Optional projectPath
 * @returns Project status with mode, framework info, and active preset
 */
export async function projectStatus(
  input: ProjectStatusInput
): Promise<ToolResult<ProjectStatusResponse>> {
  try {
    const projectPath = input.projectPath || process.cwd();

    // Read existing config or use defaults
    let config = readConfig(projectPath);

    // If no config exists, detect framework and create default status
    if (!config) {
      config = getDefaultConfig();

      // Try to detect framework
      const detection = await projectTools.detectStructure({ projectPath });
      if (detection.success && detection.data) {
        config.project.frameworkType = detection.data.frameworkType;
        config.project.detectedAt = new Date().toISOString();
      }
    }

    // Build response
    const response: ProjectStatusResponse = {
      mode: config.mode,
      project: {
        name: config.project.name,
        frameworkType: config.project.frameworkType,
        detectedAt: config.project.detectedAt,
      },
      activeTheme: null,
    };

    // If there's an active theme, include its info
    if (config.theme.activeThemeId) {
      const theme = getBuiltinTheme(config.theme.activeThemeId);
      if (theme) {
        response.activeTheme = {
          id: theme.id,
          name: theme.name,
          brandTone: theme.brandTone,
          selectedAt: config.theme.selectedAt || new Date().toISOString(),
        };
      }
    }

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get project status",
    };
  }
}

/**
 * Select a built-in theme as active for the project
 * MCP Tool: project.useBuiltinTheme
 *
 * @param input - Contains themeId and optional projectPath
 * @returns Confirmation with theme info
 */
export async function useBuiltinTheme(
  input: UseBuiltinThemeInput
): Promise<ToolResult<UseBuiltinThemeResponse>> {
  try {
    const { themeId, projectPath = process.cwd() } = input;

    // Validate theme ID
    if (!themeId || themeId.trim() === "") {
      return {
        success: false,
        error: "Theme ID is required",
      };
    }

    if (!isValidThemeId(themeId)) {
      return {
        success: false,
        error: `Invalid theme ID: ${themeId}. Use theme.list to see available themes.`,
      };
    }

    // Get theme data
    const theme = getBuiltinTheme(themeId);
    if (!theme) {
      return {
        success: false,
        error: `Theme not found: ${themeId}`,
      };
    }

    // Update config with new theme selection
    const now = new Date().toISOString();
    const updatedConfig = updateConfig(projectPath, {
      theme: {
        activeThemeId: themeId,
        selectedAt: now,
      },
    });

    // Build theme metadata for response
    const themeMeta: ThemeMeta = {
      id: theme.id,
      name: theme.name,
      description: theme.description,
      stackInfo: theme.stackInfo,
      brandTone: theme.brandTone,
    };

    return {
      success: true,
      data: {
        theme: themeMeta,
        config: updatedConfig,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to set theme",
    };
  }
}
