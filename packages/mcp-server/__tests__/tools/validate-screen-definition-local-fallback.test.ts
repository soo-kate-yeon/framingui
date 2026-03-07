import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockFetchComponent } = vi.hoisted(() => ({
  mockFetchComponent: vi.fn(),
}));

vi.mock('../../src/api/data-client.ts', () => ({
  fetchComponent: mockFetchComponent,
}));

import { validateScreenDefinitionTool } from '../../src/tools/validate-screen-definition.ts';

describe('validate-screen-definition local schema fallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchComponent.mockResolvedValue({
      ok: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Component not found',
      },
    });
  });

  it('uses core component schema to validate required props when remote metadata is unavailable', async () => {
    const result = await validateScreenDefinitionTool({
      definition: {
        id: 'local-form-fallback',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [{ type: 'Form', props: {} }],
          },
        ],
      },
      strict: false,
    });

    expect(result.success).toBe(true);
    expect(result.errors?.some(error => error.code === 'MISSING_REQUIRED_PROP')).toBe(true);
  });

  it('uses core component schema to validate enum-like props when remote metadata is unavailable', async () => {
    const result = await validateScreenDefinitionTool({
      definition: {
        id: 'local-button-fallback',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [
              {
                type: 'Button',
                props: { variant: 'nonexistent-variant', children: 'Click' },
              },
            ],
          },
        ],
      },
      strict: false,
    });

    expect(result.success).toBe(true);
    expect(result.warnings?.some(warning => warning.code === 'INVALID_VARIANT')).toBe(true);
  });
});
