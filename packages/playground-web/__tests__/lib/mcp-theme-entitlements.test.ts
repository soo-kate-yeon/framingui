import { describe, expect, it, vi } from 'vitest';

vi.mock('@framingui/core', () => ({
  listThemes: vi.fn(() => [
    { id: 'pebble' },
    { id: 'square-minimalism' },
    { id: 'classic-magazine' },
  ]),
}));

import {
  CREATOR_ALL_ACCESS_THEME_ID,
  TRIAL_ALL_ACCESS_THEME_ID,
  normalizeLicensedThemes,
} from '@/lib/mcp/theme-entitlements';

describe('theme entitlement normalization', () => {
  it('expands legacy default placeholder licenses to canonical theme ids', () => {
    const result = normalizeLicensedThemes([
      {
        id: 'lic-1',
        user_id: 'user-1',
        theme_id: 'default',
        tier: 'double',
        type: 'individual',
        is_active: true,
        expires_at: null,
      },
    ]);

    expect(result.licensedThemes).toEqual(['pebble', 'square-minimalism', 'classic-magazine']);
    expect(result.warnings).toContain('legacy-placeholder:default');
  });

  it('expands trial all-access licenses to every canonical theme id', () => {
    const result = normalizeLicensedThemes([
      {
        id: 'lic-1',
        user_id: 'user-1',
        theme_id: TRIAL_ALL_ACCESS_THEME_ID,
        tier: 'creator',
        type: 'trial',
        is_active: true,
        expires_at: null,
      },
    ]);

    expect(result.licensedThemes).toEqual(['pebble', 'square-minimalism', 'classic-magazine']);
    expect(result.warnings).toEqual([]);
  });

  it('expands creator all-access licenses to every canonical theme id', () => {
    const result = normalizeLicensedThemes([
      {
        id: 'lic-1',
        user_id: 'user-1',
        theme_id: CREATOR_ALL_ACCESS_THEME_ID,
        tier: 'creator',
        type: 'creator',
        is_active: true,
        expires_at: null,
      },
    ]);

    expect(result.licensedThemes).toEqual(['pebble', 'square-minimalism', 'classic-magazine']);
  });

  it('preserves canonical ids and removes duplicates in catalog order', () => {
    const result = normalizeLicensedThemes([
      {
        id: 'lic-1',
        user_id: 'user-1',
        theme_id: 'square-minimalism',
        tier: 'single',
        type: 'individual',
        is_active: true,
        expires_at: null,
      },
      {
        id: 'lic-2',
        user_id: 'user-1',
        theme_id: 'pebble',
        tier: 'single',
        type: 'individual',
        is_active: true,
        expires_at: null,
      },
      {
        id: 'lic-3',
        user_id: 'user-1',
        theme_id: 'square-minimalism',
        tier: 'single',
        type: 'individual',
        is_active: true,
        expires_at: null,
      },
    ]);

    expect(result.licensedThemes).toEqual(['pebble', 'square-minimalism']);
  });

  it('drops unknown non-canonical ids and reports them', () => {
    const result = normalizeLicensedThemes([
      {
        id: 'lic-1',
        user_id: 'user-1',
        theme_id: 'mystery-theme',
        tier: 'single',
        type: 'individual',
        is_active: true,
        expires_at: null,
      },
    ]);

    expect(result.licensedThemes).toEqual([]);
    expect(result.warnings).toContain('unknown-theme-id:mystery-theme');
  });
});
