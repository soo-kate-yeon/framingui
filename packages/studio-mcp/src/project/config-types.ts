/**
 * Config Schema and Types
 * Type definitions and Zod schemas for local .tekton/config.json
 *
 * @module project/config-types
 */

import { z } from "zod";

/**
 * Connection mode for MCP server
 */
export const ConnectionModeSchema = z.enum(["standalone", "connected"]);

export type ConnectionMode = z.infer<typeof ConnectionModeSchema>;

/**
 * Project information schema
 */
export const ProjectInfoSchema = z.object({
  name: z.string(),
  frameworkType: z.string(),
  detectedAt: z.string(),
});

export type ProjectInfo = z.infer<typeof ProjectInfoSchema>;

/**
 * Theme selection schema
 */
export const ThemeSelectionSchema = z.object({
  activeThemeId: z.string().nullable(),
  selectedAt: z.string().nullable(),
});

export type ThemeSelection = z.infer<typeof ThemeSelectionSchema>;

/**
 * Complete Tekton configuration schema
 * Stored in .tekton/config.json
 */
export const TektonConfigSchema = z.object({
  $schema: z.string(),
  version: z.string(),
  mode: ConnectionModeSchema,
  project: ProjectInfoSchema,
  theme: ThemeSelectionSchema,
});

export type TektonConfig = z.infer<typeof TektonConfigSchema>;

/**
 * Partial config for updates
 */
export type TektonConfigUpdate = {
  mode?: ConnectionMode;
  project?: Partial<ProjectInfo>;
  theme?: Partial<ThemeSelection>;
};
