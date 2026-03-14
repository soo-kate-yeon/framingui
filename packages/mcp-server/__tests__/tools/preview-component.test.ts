/**
 * Preview Component Tool Tests
 * SPEC-MCP-003: AC-002 Preview Component
 * [TAG-MCP003-007] Preview component with detailed information
 * [TAG-MCP003-012] Component not found error handling
 */

import { describe, it, expect, vi } from 'vitest';

const componentFixtures = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'core',
    description: 'Action button',
    tier: 1,
    props: [
      { name: 'children', type: 'ReactNode', required: true },
      { name: 'variant', type: 'string', required: false },
    ],
    variants: [
      { name: 'variant', value: 'default' },
      { name: 'variant', value: 'primary' },
    ],
    subComponents: [],
    importStatement: "import { Button } from '@framingui/ui';",
    dependencies: { internal: [], external: ['@framingui/ui'] },
    examples: [{ title: 'Primary', code: '<Button variant="primary">Save</Button>' }],
    accessibility: 'Supports focus, keyboard, and screen-reader usage.',
  },
  card: {
    id: 'card',
    name: 'Card',
    category: 'layout',
    description: 'Card container',
    tier: 1,
    props: [{ name: 'children', type: 'ReactNode', required: true }],
    variants: [{ name: 'variant', value: 'default' }],
    subComponents: ['CardHeader', 'CardContent', 'CardFooter'],
    importStatement: "import { Card, CardHeader, CardContent, CardFooter } from '@framingui/ui';",
    dependencies: { internal: [], external: ['@framingui/ui'] },
    examples: [{ title: 'Default', code: '<Card><CardContent /></Card>' }],
    accessibility: 'Semantic container with optional headings.',
  },
  dialog: {
    id: 'dialog',
    name: 'Dialog',
    category: 'overlay',
    description: 'Dialog surface',
    tier: 1,
    props: [{ name: 'open', type: 'boolean', required: false }],
    variants: [],
    subComponents: ['DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogFooter'],
    importStatement:
      "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '@framingui/ui';",
    dependencies: { internal: [], external: ['@framingui/ui'] },
    examples: [{ title: 'Basic', code: '<Dialog><DialogContent /></Dialog>' }],
    accessibility: 'Focus management and escape key dismissal.',
  },
} as const;

vi.mock('../../src/api/data-client.js', () => ({
  fetchComponent: vi.fn(async (componentId: string) => {
    const fixture = componentFixtures[componentId as keyof typeof componentFixtures];

    if (!fixture) {
      return {
        ok: false,
        error: {
          code: 'NOT_FOUND',
          message: `Component not found: ${componentId}`,
        },
      };
    }

    return { ok: true, data: fixture };
  }),
  fetchComponentList: vi.fn(async () => ({
    ok: true,
    data: Object.values(componentFixtures).map(component => ({
      id: component.id,
      name: component.name,
    })),
  })),
}));

import { previewComponentTool } from '../../src/tools/preview-component.js';

describe('previewComponentTool', () => {
  describe('Positive Cases', () => {
    it('should return valid component details for "button"', async () => {
      const result = await previewComponentTool({ componentId: 'button' });

      expect(result.success).toBe(true);
      expect(result.component).toBeDefined();
      expect(result.component?.id).toBe('button');
      expect(result.component?.name).toBe('Button');
      expect(result.component?.category).toBe('core');
      expect(result.component?.tier).toBe(1);
    });

    it('should return component with props interface', async () => {
      const result = await previewComponentTool({ componentId: 'button', includeExamples: true });

      expect(result.success).toBe(true);
      expect(result.component?.props).toBeDefined();
      expect(result.component?.props.length).toBeGreaterThan(0);

      result.component?.props.forEach(prop => {
        expect(prop.name).toBeDefined();
        expect(prop.type).toBeDefined();
        expect(typeof prop.required).toBe('boolean');
      });
    });

    it('should return variants array for components with variants', async () => {
      const result = await previewComponentTool({ componentId: 'button', includeExamples: true });

      expect(result.success).toBe(true);
      expect(result.component?.variants).toBeDefined();
      expect(result.component?.variants?.length).toBeGreaterThan(0);

      result.component?.variants?.forEach(variant => {
        expect(variant.name).toBeDefined();
        expect(variant.value).toBeDefined();
      });
    });

    it('should return sub-components for composite components', async () => {
      const result = await previewComponentTool({ componentId: 'card' });

      expect(result.success).toBe(true);
      expect(result.component?.subComponents).toContain('CardHeader');
      expect(result.component?.subComponents).toContain('CardContent');
      expect(result.component?.subComponents).toContain('CardFooter');
    }, 15000);

    it('should return import statement', async () => {
      const result = await previewComponentTool({ componentId: 'button' });

      expect(result.success).toBe(true);
      expect(result.component?.importStatement).toContain('@framingui/ui');
      expect(result.component?.importStatement).toContain('Button');
    });

    it('should include examples when includeExamples=true', async () => {
      const result = await previewComponentTool({ componentId: 'button', includeExamples: true });

      expect(result.success).toBe(true);
      expect(result.component?.examples?.length).toBeGreaterThan(0);
      expect(result.component?.examples?.[0]?.title).toBeDefined();
      expect(result.component?.examples?.[0]?.code).toBeDefined();
    });

    it('should include dependencies when includeDependencies=true', async () => {
      const result = await previewComponentTool({
        componentId: 'button',
        includeDependencies: true,
      });

      expect(result.success).toBe(true);
      expect(result.component?.dependencies?.internal).toBeDefined();
      expect(result.component?.dependencies?.external).toContain('@framingui/ui');
    });

    it('should return accessibility information', async () => {
      const result = await previewComponentTool({ componentId: 'button' });

      expect(result.success).toBe(true);
      expect(typeof result.component?.accessibility).toBe('string');
    });
  });

  describe('Negative Cases', () => {
    it('should return error for non-existent component', async () => {
      const result = await previewComponentTool({ componentId: 'xyz-nonexistent-component' });

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
      expect(result.error).toContain('xyz-nonexistent-component');
    });

    it('should return error with available components list', async () => {
      const result = await previewComponentTool({ componentId: 'invalid-component' });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Available components:');
      expect(result.error).toContain('button');
    });
  });

  describe('Edge Cases', () => {
    it('should not include examples when includeExamples=false', async () => {
      const result = await previewComponentTool({ componentId: 'button', includeExamples: false });

      expect(result.success).toBe(true);
      expect(result.component?.examples).toBeUndefined();
    });

    it('should not include dependencies when includeDependencies=false', async () => {
      const result = await previewComponentTool({
        componentId: 'button',
        includeDependencies: false,
      });

      expect(result.success).toBe(true);
      expect(result.component?.dependencies).toBeUndefined();
    });

    it('should handle component with multiple sub-components', async () => {
      const result = await previewComponentTool({ componentId: 'dialog' });

      expect(result.success).toBe(true);
      expect(result.component?.subComponents?.length).toBeGreaterThan(3);
      expect(result.component?.importStatement).toContain('DialogTrigger');
      expect(result.component?.importStatement).toContain('DialogContent');
    });

    it('should verify import statement includes all sub-components', async () => {
      const result = await previewComponentTool({ componentId: 'card' });

      expect(result.success).toBe(true);
      expect(result.component?.importStatement).toContain('Card');
      result.component?.subComponents?.forEach(subComponent => {
        expect(result.component?.importStatement).toContain(subComponent);
      });
    });

    it('should return react-native runtime guidance when platform is react-native', async () => {
      const result = await previewComponentTool({
        componentId: 'text-field',
        platform: 'react-native',
        includeExamples: true,
      });

      expect(result.success).toBe(true);
      expect(result.component?.name).toBe('TextField');
      expect(result.component?.importStatement).toContain('@framingui/react-native');
      expect(result.component?.examples?.[0]?.code).toContain("from '@framingui/react-native'");
    });
  });
});
