/**
 * Global authentication state for MCP server
 * SPEC-DEPLOY-001 Phase 4.1: MCP Server Authentication Layer
 */

import type { VerifyResponse } from './verify.js';
import { MemoryCache } from './cache.js';
import { info } from '../utils/logger.js';

// Cache TTL: 5 minutes (300,000 milliseconds)
const CACHE_TTL_MS = 5 * 60 * 1000;

// Global authentication data cache
const authCache = new MemoryCache<VerifyResponse>();

// Current authentication state
let currentAuthData: VerifyResponse | null = null;

/**
 * Set authentication data and cache it
 * @param authData - Verification response from API
 */
export function setAuthData(authData: VerifyResponse | null): void {
  currentAuthData = authData;

  if (authData && authData.valid) {
    authCache.set('auth', authData, CACHE_TTL_MS);
    info('Authentication data cached for 5 minutes');
  }
}

/**
 * Get current authentication data
 * @returns Current authentication data or null if not authenticated
 */
export function getAuthData(): VerifyResponse | null {
  // Try to get from cache first
  const cachedAuth = authCache.get('auth');

  if (cachedAuth) {
    info('Using cached authentication data');
    return cachedAuth;
  }

  // Return current state
  return currentAuthData;
}

/**
 * Clear authentication data and cache
 */
export function clearAuthData(): void {
  currentAuthData = null;
  authCache.clear();
  info('Authentication data cleared');
}

/**
 * Check if user is authenticated
 * @returns true if authenticated with valid data
 */
export function isAuthenticated(): boolean {
  const authData = getAuthData();
  return authData !== null && authData.valid === true;
}

/**
 * Get accessible theme IDs based on current authentication
 * @param allThemeIds - All available theme IDs
 * @param freeThemeIds - Free theme IDs (always accessible)
 * @returns Array of accessible theme IDs
 */
export function getAccessibleThemes(allThemeIds: string[], freeThemeIds: string[]): string[] {
  const authData = getAuthData();

  // No authentication: only free themes
  if (!authData || !authData.valid) {
    return freeThemeIds;
  }

  // Authenticated: free themes + licensed themes
  const licensedThemes = authData.themes?.licensed || [];
  const accessibleThemes = new Set([...freeThemeIds, ...licensedThemes]);

  // Filter to only include themes that actually exist
  return allThemeIds.filter(id => accessibleThemes.has(id));
}
