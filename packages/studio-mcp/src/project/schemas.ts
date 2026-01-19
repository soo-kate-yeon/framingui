/**
 * Project Tools Zod Schemas
 * Input validation schemas for project-related MCP tools
 *
 * @module project/schemas
 */

import { z } from "zod";

/**
 * Schema for project.detectStructure tool input
 */
export const DetectStructureInputSchema = z.object({
  projectPath: z.string().min(1, "Project path is required"),
});

export type DetectStructureInput = z.infer<typeof DetectStructureInputSchema>;

/**
 * Schema for project.getActiveTheme tool input
 * No required parameters - uses implicit project context
 */
export const GetActiveThemeInputSchema = z.object({
  projectPath: z.string().optional(),
});

export type GetActiveThemeInput = z.infer<typeof GetActiveThemeInputSchema>;

/**
 * Schema for project.setActiveTheme tool input
 */
export const SetActiveThemeInputSchema = z.object({
  themeId: z.number().int().positive("Theme ID must be a positive integer"),
  projectPath: z.string().optional(),
});

export type SetActiveThemeInput = z.infer<typeof SetActiveThemeInputSchema>;

/**
 * Framework types supported by the project detector
 */
export const FrameworkTypeSchema = z.enum([
  "next-app",
  "next-pages",
  "vite",
  "unknown",
]);

export type FrameworkType = z.infer<typeof FrameworkTypeSchema>;

/**
 * Project structure response schema
 */
export const ProjectStructureSchema = z.object({
  frameworkType: FrameworkTypeSchema,
  rootPath: z.string(),
  pagesDirectory: z.string().nullable(),
  appDirectory: z.string().nullable(),
  srcDirectory: z.string().nullable(),
  configFiles: z.array(z.string()),
});

export type ProjectStructure = z.infer<typeof ProjectStructureSchema>;

/**
 * Active theme response schema
 */
export const ActiveThemeSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string().optional(),
  style_archetype: z.string().optional(),
}).nullable();

export type ActiveTheme = z.infer<typeof ActiveThemeSchema>;
