/**
 * API Key verification for Tekton MCP Server
 * SPEC-DEPLOY-001 Phase 4.1: MCP Server Authentication Layer
 */

import { info, error as logError } from '../utils/logger.js';

export interface VerifyResponse {
  valid: boolean;
  user?: {
    id: string;
    email: string;
    plan: string;
  };
  licenses?: Array<{
    themeId: string;
    tier: string;
    isActive: boolean;
    expiresAt: string | null;
  }>;
  themes?: {
    free: string[];
    licensed: string[];
  };
  error?: string;
}

/**
 * Verify API key with Tekton backend
 * @param apiKey - The API key to verify
 * @returns VerifyResponse with user data and licenses
 */
export async function verifyApiKey(apiKey: string): Promise<VerifyResponse> {
  const apiUrl = process.env.TEKTON_API_URL || 'https://tekton-ui.com';
  const endpoint = `${apiUrl}/api/mcp/verify`;

  try {
    info(`Verifying API key with endpoint: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      logError(`API key verification failed: ${response.status} ${response.statusText}`);

      return {
        valid: false,
        error: `Verification failed: ${response.status} ${response.statusText} - ${errorText}`,
      };
    }

    const data = (await response.json()) as VerifyResponse;

    if (!data.valid) {
      logError(`API key is invalid: ${data.error || 'Unknown reason'}`);
      return {
        valid: false,
        error: data.error || 'API key is invalid',
      };
    }

    info(
      `API key verified successfully for user: ${data.user?.email || 'unknown'} (plan: ${data.user?.plan || 'unknown'})`
    );

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logError(`API key verification error: ${errorMessage}`);

    return {
      valid: false,
      error: `Network error: ${errorMessage}`,
    };
  }
}

/**
 * Extract free and licensed theme IDs from verification response
 * @param verifyResponse - Verification response from verifyApiKey
 * @returns Object containing free and licensed theme ID arrays
 */
export function extractThemeAccess(verifyResponse: VerifyResponse): {
  free: string[];
  licensed: string[];
} {
  if (!verifyResponse.valid || !verifyResponse.themes) {
    return { free: [], licensed: [] };
  }

  return {
    free: verifyResponse.themes.free || [],
    licensed: verifyResponse.themes.licensed || [],
  };
}

/**
 * Check if a theme is accessible for the current authentication state
 * @param themeId - Theme ID to check
 * @param verifyResponse - Verification response (null for unauthenticated)
 * @param freeThemes - Array of free theme IDs
 * @returns true if theme is accessible
 */
export function isThemeAccessible(
  themeId: string,
  verifyResponse: VerifyResponse | null,
  freeThemes: string[]
): boolean {
  // Free themes are always accessible
  if (freeThemes.includes(themeId)) {
    return true;
  }

  // Premium themes require valid authentication
  if (!verifyResponse || !verifyResponse.valid) {
    return false;
  }

  // Check if user has license for this theme
  const themeAccess = extractThemeAccess(verifyResponse);
  return themeAccess.licensed.includes(themeId);
}
