import { describe, expect, it, vi } from 'vitest';

vi.mock('../../src/api/data-client.js', () => ({
  fetchComponentList: vi.fn(async () => ({
    ok: true,
    data: [
      {
        id: 'button',
        name: 'Button',
        category: 'core',
        description: 'Action button',
        variantsCount: 3,
        hasSubComponents: false,
        tier: 1,
      },
      {
        id: 'table',
        name: 'Table',
        category: 'complex',
        description: 'Tabular data layout',
        variantsCount: 1,
        hasSubComponents: true,
        tier: 2,
      },
    ],
  })),
}));

import { listComponentsTool } from '../../src/tools/list-components.js';

describe('listComponentsTool react-native platform', () => {
  it('returns the react-native runtime catalog instead of web-only components', async () => {
    const result = await listComponentsTool({ category: 'all', platform: 'react-native' });

    expect(result.success).toBe(true);
    expect(result.components?.some(component => component.id === 'button')).toBe(true);
    expect(result.components?.some(component => component.id === 'screen')).toBe(true);
    expect(result.components?.some(component => component.id === 'table')).toBe(false);
    expect(
      result.components?.every(
        component => component.platformSupport?.reactNative?.status === 'full'
      )
    ).toBe(true);
  });
});
