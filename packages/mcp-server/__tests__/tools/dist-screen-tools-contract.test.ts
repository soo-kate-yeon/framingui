import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

const generateScreenDistPath = resolve(process.cwd(), 'dist/tools/generate-screen.js');
const validateScreenDefinitionDistPath = resolve(
  process.cwd(),
  'dist/tools/validate-screen-definition.js'
);

describe.skipIf(
  !existsSync(generateScreenDistPath) || !existsSync(validateScreenDefinitionDistPath)
)('dist screen tools contract', () => {
  it('generate_screen dist module returns full code for tailwind output', async () => {
    const { generateScreenTool } = await import(pathToFileURL(generateScreenDistPath).href);

    const result = await generateScreenTool({
      screenDefinition: {
        id: 'dist-tailwind',
        name: 'Dist Tailwind',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [
              {
                type: 'Text',
                props: {
                  children: 'Hello from dist',
                  className: 'text-base',
                },
              },
            ],
          },
        ],
      },
      outputFormat: 'tailwind',
    });

    expect(result.success).toBe(true);
    expect(result.code).toContain('export const DistTailwindScreen');
    expect(result.code).toContain('Hello from dist');
    expect(result.code).not.toContain('export const componentClasses');
  });

  it('validate-screen-definition dist module falls back to local schema validation', async () => {
    const { validateScreenDefinitionTool } = await import(
      pathToFileURL(validateScreenDefinitionDistPath).href
    );

    const result = await validateScreenDefinitionTool({
      definition: {
        id: 'dist-form',
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
    expect(
      result.errors?.some((error: { code: string }) => error.code === 'MISSING_REQUIRED_PROP')
    ).toBe(true);
  });
});
