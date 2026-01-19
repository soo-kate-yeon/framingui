/**
 * Token Contract Themes
 * Curated design system themes with WCAG compliance
 */

export {
  loadTheme,
  getAvailableThemes,
  validateTheme,
} from './theme-loader.js';

export { validateWCAGCompliance } from './wcag-compliance.js';

export {
  ThemeSchema,
  ThemeNameSchema,
  type Theme,
  type ThemeName,
  type ThemeInfo,
} from './types.js';

// Backward compatibility aliases
export {
  getAvailableThemes as getAvailablePresets,
  validateTheme as validatePreset,
} from './theme-loader.js';

export {
  type Theme as Preset,
  type ThemeName as PresetName,
  type ThemeInfo as PresetInfo,
  ThemeNameSchema as PresetNameSchema,
} from './types.js';

// Re-export theme definitions for direct access if needed
export { professionalTheme } from './definitions/professional.js';
export { creativeTheme } from './definitions/creative.js';
export { minimalTheme } from './definitions/minimal.js';
export { boldTheme } from './definitions/bold.js';
export { warmTheme } from './definitions/warm.js';
export { coolTheme } from './definitions/cool.js';
export { highContrastTheme } from './definitions/high-contrast.js';
