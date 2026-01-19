/**
 * @tekton/token-contract
 * Token Contract & CSS Variable System
 *
 * A comprehensive design token system with Zod validation, curated themes,
 * CSS variable generation, and React theme provider.
 */

// ========================================
// Schemas
// ========================================
export {
  ColorTokenSchema,
  ColorScaleSchema,
  SemanticTokenSchema,
  StateTokenSchema,
  CompositionTokenSchema,
} from './schemas/index.js';

export type {
  ColorToken,
  ColorScale,
  SemanticToken,
  StateToken,
  CompositionToken,
  BorderToken,
  ShadowToken,
  SpacingToken,
  TypographyToken,
} from './schemas/index.js';

// ========================================
// Themes
// ========================================
export {
  loadTheme,
  getAvailableThemes,
  validateTheme,
  // Deprecated: use getAvailableThemes instead
  getAvailableThemes as getAvailablePresets,
  // Deprecated: use validateTheme instead
  validateTheme as validatePreset,
} from './themes/theme-loader.js';

export {
  validateWCAGCompliance,
} from './themes/wcag-compliance.js';

export type {
  WCAGCheck,
  WCAGComplianceResult,
} from './themes/wcag-compliance.js';

export {
  ThemeNameSchema,
  ThemeSchema,
  // Deprecated: use ThemeNameSchema instead
  ThemeNameSchema as PresetNameSchema,
} from './themes/types.js';

export type {
  ThemeName,
  Theme,
  ThemeInfo,
  // Deprecated: use ThemeName instead
  ThemeName as PresetName,
  // Deprecated: use Theme instead
  Theme as Preset,
  // Deprecated: use ThemeInfo instead
  ThemeInfo as PresetInfo,
} from './themes/types.js';

// ========================================
// CSS Generator
// ========================================
export {
  generateVariableName,
  validateVariableName,
  isValidCSSVariableName,
  generateCSSVariables,
  generateCSSFromTokens,
  formatCSSRule,
  generateDarkModeCSS,
  generateDarkModeOverrides,
  mergeLightAndDarkCSS,
} from './css-generator/index.js';

// ========================================
// Theme Provider (React)
// ========================================
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  applyCSSVariables,
  applyDarkModeCSSVariables,
  removeCSSVariables,
} from './theme-provider/index.js';

export type {
  ThemeProviderProps,
  ThemeContextValue,
} from './theme-provider/index.js';

// ========================================
// Utils
// ========================================
export {
  getTokenWithFallback,
  getFallbackColor,
  logMissingTokenWarning,
  overrideThemeTokens,
  validateOverride,
  mergeTokens,
  // Deprecated: use overrideThemeTokens instead
  overrideThemeTokens as overridePresetTokens,
} from './utils/index.js';

export type {
  ValidationResult,
} from './utils/index.js';
