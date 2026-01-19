/**
 * Theme Type Definitions
 * Type definitions and Zod schemas for standalone theme system
 *
 * @module theme/types
 */

import { z } from "zod";

/**
 * OKLCH Color Schema
 * L: Lightness (0-1), C: Chroma (0-0.5), H: Hue (0-360)
 */
export const OKLCHColorSchema = z.object({
  l: z.number().min(0).max(1),
  c: z.number().min(0).max(0.5),
  h: z.number().min(0).max(360),
});

export type OKLCHColor = z.infer<typeof OKLCHColorSchema>;

/**
 * Brand tone options
 */
export const BrandToneSchema = z.enum([
  "professional",
  "playful",
  "elegant",
  "bold",
  "minimal",
  "warm",
  "creative",
  "flexible",
  "energetic",
  "immersive",
  "calm",
  "friendly",
]);

export type BrandTone = z.infer<typeof BrandToneSchema>;

/**
 * Contrast level options
 */
export const ContrastSchema = z.enum(["low", "medium", "high", "maximum"]);

export type Contrast = z.infer<typeof ContrastSchema>;

/**
 * UI density options
 */
export const DensitySchema = z.enum(["compact", "comfortable", "spacious"]);

export type Density = z.infer<typeof DensitySchema>;

/**
 * Border radius options
 */
export const BorderRadiusSchema = z.enum([
  "none",
  "small",
  "medium",
  "large",
  "full",
]);

export type BorderRadius = z.infer<typeof BorderRadiusSchema>;

/**
 * Neutral tone options
 */
export const NeutralToneSchema = z.enum(["pure", "warm", "cool"]);

export type NeutralTone = z.infer<typeof NeutralToneSchema>;

/**
 * Font scale options
 */
export const FontScaleSchema = z.enum(["small", "medium", "large"]);

export type FontScale = z.infer<typeof FontScaleSchema>;

/**
 * Stack info schema for theme metadata
 */
export const StackInfoSchema = z.object({
  framework: z.string(),
  styling: z.string(),
  components: z.string().optional(),
});

export type StackInfo = z.infer<typeof StackInfoSchema>;

/**
 * Color palette schema
 */
export const ColorPaletteSchema = z.object({
  primary: OKLCHColorSchema,
  secondary: OKLCHColorSchema.optional(),
  accent: OKLCHColorSchema.optional(),
  neutral: OKLCHColorSchema.optional(),
});

export type ColorPalette = z.infer<typeof ColorPaletteSchema>;

/**
 * Typography schema
 */
export const TypographySchema = z.object({
  fontFamily: z.string().optional(),
  fontScale: FontScaleSchema,
  headingWeight: z.number().optional(),
  bodyWeight: z.number().optional(),
});

export type Typography = z.infer<typeof TypographySchema>;

/**
 * Component defaults schema
 */
export const ComponentDefaultsSchema = z.object({
  borderRadius: BorderRadiusSchema,
  density: DensitySchema,
  contrast: ContrastSchema,
});

export type ComponentDefaults = z.infer<typeof ComponentDefaultsSchema>;

/**
 * AI context schema - provides context for AI assistants
 */
export const ThemeAIContextSchema = z.object({
  brandTone: BrandToneSchema,
  designPhilosophy: z.string(),
  colorGuidance: z.string(),
  componentGuidance: z.string(),
  accessibilityNotes: z.string().optional(),
});

export type ThemeAIContext = z.infer<typeof ThemeAIContextSchema>;

/**
 * Complete theme schema for standalone mode
 */
export const ThemeSchema = z.object({
  id: z.string().min(1, "Theme id is required"),
  name: z.string().min(1, "Theme name is required"),
  description: z.string(),
  stackInfo: StackInfoSchema,
  brandTone: BrandToneSchema,
  colorPalette: ColorPaletteSchema,
  typography: TypographySchema,
  componentDefaults: ComponentDefaultsSchema,
  aiContext: ThemeAIContextSchema,
});

export type Theme = z.infer<typeof ThemeSchema>;

/**
 * Theme metadata for listing (lightweight version)
 */
export const ThemeMetaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  stackInfo: StackInfoSchema,
  brandTone: BrandToneSchema,
});

export type ThemeMeta = z.infer<typeof ThemeMetaSchema>;

/**
 * List of all built-in theme IDs
 */
export const BUILTIN_THEME_IDS = [
  "saas-modern",
  "dynamic-fitness",
  "premium-editorial",
  "media-streaming",
  "calm-wellness",
  "korean-fintech",
  "warm-humanist",
] as const;

export type BuiltinThemeId = (typeof BUILTIN_THEME_IDS)[number];
