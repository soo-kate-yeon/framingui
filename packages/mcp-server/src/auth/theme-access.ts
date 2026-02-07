/**
 * Theme access configuration
 * SPEC-DEPLOY-001 Phase 4.1: Theme Filtering
 */

/**
 * Free themes available to all users without authentication
 * These are the basic starter themes
 */
export const FREE_THEMES = [
  'next-tailwind-shadcn',
  'vite-tailwind-shadcn',
  'next-styled-components',
  'next-tailwind-radix',
  'saas-modern',
  'tech-startup',
];

/**
 * Premium themes that require a valid license
 * These are advanced, branded, or specialized themes
 */
export const PREMIUM_THEMES = [
  'calm-wellness',
  'dynamic-fitness',
  'korean-fintech',
  'media-streaming',
  'premium-editorial',
  'saas-dashboard',
  'warm-humanist',
];

/**
 * Check if a theme is free (no authentication required)
 * @param themeId - Theme ID to check
 * @returns true if theme is free
 */
export function isFreeTheme(themeId: string): boolean {
  return FREE_THEMES.includes(themeId);
}

/**
 * Check if a theme is premium (requires authentication)
 * @param themeId - Theme ID to check
 * @returns true if theme is premium
 */
export function isPremiumTheme(themeId: string): boolean {
  return PREMIUM_THEMES.includes(themeId);
}
