import { ThemeSchema, type Theme, type ThemeName, type ThemeInfo } from './types.js';
import { professionalTheme } from './definitions/professional.js';
import { creativeTheme } from './definitions/creative.js';
import { minimalTheme } from './definitions/minimal.js';
import { boldTheme } from './definitions/bold.js';
import { warmTheme } from './definitions/warm.js';
import { coolTheme } from './definitions/cool.js';
import { highContrastTheme } from './definitions/high-contrast.js';

/**
 * Theme Registry
 * Maps theme names to their definitions
 */
const themeRegistry: Record<ThemeName, Theme> = {
  professional: professionalTheme,
  creative: creativeTheme,
  minimal: minimalTheme,
  bold: boldTheme,
  warm: warmTheme,
  cool: coolTheme,
  'high-contrast': highContrastTheme,
};

/**
 * Load a theme by name
 * @param name - Theme identifier
 * @returns Validated theme configuration
 * @throws Error if theme not found or invalid
 */
export function loadTheme(name: ThemeName): Theme {
  const theme = themeRegistry[name];

  if (!theme) {
    throw new Error(`Theme '${name}' not found`);
  }

  // Validate theme structure
  const result = ThemeSchema.safeParse(theme);
  if (!result.success) {
    throw new Error(
      `Theme '${name}' validation failed: ${result.error.message}`
    );
  }

  return result.data;
}

/**
 * Get list of available themes with metadata
 * @returns Array of theme information
 */
export function getAvailableThemes(): ThemeInfo[] {
  return Object.values(themeRegistry).map(theme => ({
    name: theme.name,
    description: theme.description,
    targetUseCase: theme.metadata?.targetUseCase ?? '',
    characteristics: theme.metadata?.characteristics ?? [],
  }));
}

/**
 * Validate a theme configuration
 * @param theme - Theme to validate
 * @returns Validation result with success flag
 */
export function validateTheme(theme: unknown): {
  success: boolean;
  error?: string;
} {
  const result = ThemeSchema.safeParse(theme);

  if (!result.success) {
    return {
      success: false,
      error: result.error.message,
    };
  }

  return { success: true };
}
