/**
 * Standalone Tools Configuration
 * Tool definitions and health response for standalone mode
 *
 * @module server/standalone-tools
 */

import type { ConnectionMode } from "../project/config-types.js";

/**
 * MCP Tool definition
 */
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

/**
 * Health response structure
 */
export interface HealthResponse {
  status: "ok" | "error";
  service: string;
  mode: ConnectionMode;
  version: string;
  tools: string[];
  features: {
    customThemes: boolean;
    cloudSync: boolean;
    analytics: boolean;
  };
}

/**
 * Package version
 */
const VERSION = "1.0.0";

/**
 * Standalone mode tools
 * These tools work without studio-api connection
 */
export const STANDALONE_TOOLS: MCPTool[] = [
  {
    name: "theme.list",
    description:
      "List all built-in themes available in standalone mode. Returns theme ID, name, description, and stack info.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "theme.get",
    description:
      "Get complete theme details including AI context for styling decisions. Provides questionnaire defaults and design tokens.",
    inputSchema: {
      type: "object",
      properties: {
        themeId: {
          type: "string",
          description:
            "Theme ID (e.g., 'next-tailwind-shadcn', 'saas-dashboard')",
        },
      },
      required: ["themeId"],
    },
  },
  {
    name: "project.status",
    description:
      "Get project status including connection mode (standalone/connected), active theme, and detected framework.",
    inputSchema: {
      type: "object",
      properties: {
        projectPath: {
          type: "string",
          description:
            "Optional project path (defaults to current working directory)",
        },
      },
      required: [],
    },
  },
  {
    name: "project.useBuiltinTheme",
    description:
      "Select a built-in theme as the active theme for the project. Persists to local .tekton/config.json.",
    inputSchema: {
      type: "object",
      properties: {
        themeId: {
          type: "string",
          description: "Built-in theme ID to activate",
        },
        projectPath: {
          type: "string",
          description:
            "Optional project path (defaults to current working directory)",
        },
      },
      required: ["themeId"],
    },
  },
];

/**
 * Get health response based on mode
 *
 * @param mode - Current connection mode
 * @param tools - List of registered tool names
 * @returns Health response object
 */
export function getHealthResponse(
  mode: ConnectionMode,
  tools: string[]
): HealthResponse {
  const isConnected = mode === "connected";

  return {
    status: "ok",
    service: "tekton-mcp",
    mode,
    version: VERSION,
    tools,
    features: {
      customThemes: isConnected,
      cloudSync: isConnected,
      analytics: isConnected,
    },
  };
}
