/**
 * Preview Theme Tool Tests
 * SPEC-MCP-002: AC-007 Theme Preview
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { getAuthData, setAuthData, clearAuthData } from '../../src/auth/state.js';

const themeFixtures = {
  'classic-magazine': {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    description: 'Editorial theme',
    brandTone: 'editorial',
    schemaVersion: '2.1',
    designDNA: {},
    tokens: {
      atomic: {
        color: { neutral: { white: '#ffffff', 900: '#111111' }, brand: { 500: '#0044ff' } },
        spacing: { 4: '1rem' },
        radius: { md: '0.5rem' },
      },
      semantic: {
        background: {
          canvas: 'atomic.color.neutral.white',
          surface: {
            subtle: 'atomic.color.neutral.white',
            default: 'atomic.color.neutral.white',
            emphasis: 'atomic.color.neutral.900',
          },
          brand: {
            subtle: 'atomic.color.brand.500',
            default: 'atomic.color.brand.500',
            emphasis: 'atomic.color.brand.500',
          },
        },
        border: {
          default: {
            subtle: 'atomic.color.neutral.white',
            default: 'atomic.color.neutral.900',
            emphasis: 'atomic.color.neutral.900',
          },
        },
      },
      component: {},
    },
    stateLayer: {},
    motion: {},
    elevation: {},
    typography: {
      fontFamily: { sans: 'Inter' },
      fontWeight: { regular: 400 },
    },
  },
  'dark-boldness': {
    id: 'dark-boldness',
    name: 'Dark Boldness',
    description: 'Dark contrast-heavy theme',
    brandTone: 'bold',
    schemaVersion: '2.1',
    designDNA: {},
    tokens: {
      atomic: {
        color: {
          neutral: { white: 'oklch(100% 0 0)', 900: 'oklch(18% 0.02 262)' },
          brand: { 500: 'oklch(63% 0.24 264)' },
        },
        spacing: { 4: '1rem' },
        radius: { md: '0.5rem' },
      },
      semantic: {
        background: {
          canvas: 'atomic.color.neutral.900',
          surface: {
            subtle: 'atomic.color.neutral.900',
            default: 'atomic.color.neutral.900',
            emphasis: 'atomic.color.neutral.white',
          },
          brand: {
            subtle: 'atomic.color.brand.500',
            default: 'atomic.color.brand.500',
            emphasis: 'atomic.color.brand.500',
          },
        },
        border: {
          default: {
            subtle: 'atomic.color.neutral.900',
            default: 'atomic.color.neutral.white',
            emphasis: 'atomic.color.neutral.white',
          },
        },
      },
      component: {},
    },
    stateLayer: {},
    motion: {},
    elevation: {},
    typography: {
      fontFamily: { sans: 'Inter' },
      fontWeight: { regular: 400 },
    },
  },
} as const;

vi.mock('../../src/api/data-client.js', () => ({
  fetchTheme: vi.fn(async (themeId: string) => {
    const licensedThemes = getAuthData()?.themes?.licensed ?? [];
    const fixture = themeFixtures[themeId as keyof typeof themeFixtures];

    if (themeId === 'classic-magazine' && !licensedThemes.includes('classic-magazine')) {
      return {
        ok: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Theme "classic-magazine" is not included in your license.',
        },
      };
    }

    if (fixture) {
      return { ok: true, data: fixture };
    }

    return {
      ok: false,
      error: {
        code: 'NOT_FOUND',
        message: `Theme not found: ${themeId}. Available themes: classic-magazine, dark-boldness`,
      },
    };
  }),
}));

import { previewThemeTool } from '../../src/tools/preview-theme.js';

function setupAuth(licensedThemes: string[] = []): void {
  setAuthData({
    valid: true,
    user: { id: 'test-user', email: 'test@example.com', plan: 'pro' },
    themes: { licensed: licensedThemes },
  });
}

describe('previewThemeTool', () => {
  afterEach(() => {
    clearAuthData();
  });

  it('should generate preview for valid theme', async () => {
    setupAuth(['classic-magazine']);
    const result = await previewThemeTool({
      themeId: 'classic-magazine',
    });

    expect(result.success).toBe(true);
    expect(result.theme?.id).toBe('classic-magazine');
    expect(result.theme?.name).toBeDefined();
    expect(result.theme?.tokens).toBeDefined();
  });

  it('should include OKLCH color tokens', async () => {
    setupAuth(['dark-boldness']);
    const result = await previewThemeTool({
      themeId: 'dark-boldness',
    });

    expect(result.success).toBe(true);
    expect(result.theme?.tokens?.atomic).toBeDefined();
    expect(result.theme?.tokens?.atomic.color.brand[500]).toContain('oklch');
  });

  it('should return error for invalid theme ID', async () => {
    setupAuth(['classic-magazine']);
    const result = await previewThemeTool({
      themeId: 'non-existent-theme',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Theme not found');
    expect(result.error).toContain('Available themes:');
  });

  it('should return theme without custom base URL', async () => {
    setupAuth(['classic-magazine']);
    const result = await previewThemeTool({ themeId: 'classic-magazine' });

    expect(result.success).toBe(true);
    expect(result.theme).toBeDefined();
  });

  it('should require authentication', async () => {
    setAuthData(null);
    const result = await previewThemeTool({ themeId: 'classic-magazine' });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Authentication required');
  });

  it('should require license for theme', async () => {
    setupAuth(['other-theme']);
    const result = await previewThemeTool({ themeId: 'classic-magazine' });

    expect(result.success).toBe(false);
    expect(result.error).toContain('not included in your license');
  });
});
