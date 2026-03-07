import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockFetchComponent } = vi.hoisted(() => ({
  mockFetchComponent: vi.fn(),
}));

vi.mock('../../src/api/data-client.ts', () => ({
  fetchComponent: mockFetchComponent,
}));

import { validateScreenDefinitionTool } from '../../src/tools/validate-screen-definition.ts';

describe('validate-screen-definition resilience', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('degrades gracefully when component metadata lookup throws', async () => {
    mockFetchComponent.mockRejectedValueOnce(new Error('upstream metadata outage'));

    const result = await validateScreenDefinitionTool({
      definition: {
        id: 'metadata-outage',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [{ type: 'Text', props: { children: 'Still validates' } }],
          },
        ],
      },
      strict: true,
    });

    expect(result.success).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
    expect(
      result.warnings?.some(warning => warning.code === 'COMPONENT_METADATA_UNAVAILABLE')
    ).not.toBe(true);
  });
});
