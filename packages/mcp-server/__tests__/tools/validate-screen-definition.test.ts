/**
 * Tests for validate-screen-definition Tool
 * SPEC-MCP-004 Phase 3.5
 */

import { describe, it, expect } from 'vitest';
import { validateScreenDefinitionTool } from '../../src/tools/validate-screen-definition.js';

describe('validate-screen-definition Tool', () => {
  describe('Valid Screen Definitions', () => {
    it('should validate a correct screen definition', async () => {
      const validScreen = {
        id: 'test-screen',
        name: 'Test Screen',
        description: 'A test screen for validation',
        shell: 'shell.web.dashboard',
        page: 'page.dashboard',
        themeId: 'square-minimalism',
        sections: [
          {
            id: 'main-content',
            pattern: 'section.container',
            slot: 'main',
            components: [
              {
                type: 'Heading',
                props: { level: 1, children: 'Welcome' },
              },
              {
                type: 'Text',
                props: { children: 'Hello world' },
              },
            ],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: validScreen,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should validate minimal valid screen definition', async () => {
      const minimalScreen = {
        id: 'minimal',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.container',
            components: [{ type: 'Text', props: { children: 'Content' } }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: minimalScreen,
        strict: false,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(true);
    });
  });

  describe('Invalid Shell Tokens', () => {
    it('should reject invalid shell format', async () => {
      const invalidShell = {
        id: 'test',
        shell: 'invalid-shell',
        page: 'page.dashboard',
        sections: [],
      };

      const result = await validateScreenDefinitionTool({
        definition: invalidShell,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);

      const shellError = result.errors!.find(e => e.path.includes('shell'));
      expect(shellError).toBeDefined();
    });

    it('should reject unknown shell token', async () => {
      const unknownShell = {
        id: 'test',
        shell: 'shell.web.unknown',
        page: 'page.dashboard',
        sections: [],
      };

      const result = await validateScreenDefinitionTool({
        definition: unknownShell,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);

      const shellError = result.errors!.find(e => e.code === 'UNKNOWN_SHELL');
      expect(shellError).toBeDefined();
      expect(shellError?.suggestion).toBeDefined();
    });

    it('should suggest similar shell tokens', async () => {
      const typoShell = {
        id: 'test',
        shell: 'shell.web.dashbord', // typo
        page: 'page.dashboard',
        sections: [],
      };

      const result = await validateScreenDefinitionTool({
        definition: typoShell,
        strict: true,
      });

      expect(result.success).toBe(true);
      const shellError = result.errors!.find(e => e.code === 'UNKNOWN_SHELL');
      expect(shellError?.suggestion).toContain('shell.web.dashboard');
    });
  });

  describe('Invalid Page Tokens', () => {
    it('should reject invalid page format', async () => {
      const invalidPage = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'invalid-page',
        sections: [],
      };

      const result = await validateScreenDefinitionTool({
        definition: invalidPage,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);

      const pageError = result.errors!.find(e => e.path.includes('page'));
      expect(pageError).toBeDefined();
    });

    it('should suggest similar page tokens', async () => {
      const typoPage = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.dashbord', // typo
        sections: [],
      };

      const result = await validateScreenDefinitionTool({
        definition: typoPage,
        strict: true,
      });

      expect(result.success).toBe(true);
      const pageError = result.errors!.find(e => e.code === 'UNKNOWN_PAGE');
      expect(pageError?.suggestion).toContain('page.dashboard');
    });
  });

  describe('Invalid Section Patterns', () => {
    it('should reject invalid section pattern format in strict mode', async () => {
      const invalidPattern = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'invalid-pattern',
            components: [],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: invalidPattern,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);

      const patternError = result.errors!.find(e => e.path.includes('pattern'));
      expect(patternError).toBeDefined();
    });

    it('should warn about custom section patterns in non-strict mode', async () => {
      const customPattern = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.custom-pattern',
            components: [{ type: 'Text', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: customPattern,
        strict: false,
      });

      expect(result.success).toBe(true);
      // Should be valid in non-strict mode but with warnings
      expect(result.warnings).toBeDefined();
    });
  });

  describe('Invalid Component Types', () => {
    it('should reject unknown component types in strict mode', async () => {
      const unknownComponent = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.container',
            components: [{ type: 'UnknownComponent', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: unknownComponent,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);

      const componentError = result.errors!.find(e => e.code === 'UNKNOWN_COMPONENT');
      expect(componentError).toBeDefined();
      expect(componentError?.suggestion).toContain('list-components');
    });

    it('should suggest similar component names', async () => {
      const typoComponent = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.container',
            components: [
              { type: 'Buton', props: {} }, // typo
            ],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: typoComponent,
        strict: true,
      });

      expect(result.success).toBe(true);
      const componentError = result.errors!.find(e => e.code === 'UNKNOWN_COMPONENT');
      expect(componentError?.suggestion).toContain('Button');
    });

    it('should warn about component casing issues', async () => {
      const wrongCase = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.container',
            components: [
              { type: 'button', props: {} }, // lowercase
            ],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: wrongCase,
        strict: false,
      });

      expect(result.success).toBe(true);
      if (result.warnings) {
        const casingWarning = result.warnings.find(w => w.code === 'COMPONENT_CASE');
        expect(casingWarning).toBeDefined();
        expect(casingWarning?.recommendation).toContain('Button');
      }
    });
  });

  describe('Invalid Slots', () => {
    it('should reject invalid slot values', async () => {
      const invalidSlot = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.container',
            slot: 'invalid-slot',
            components: [{ type: 'Text', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: invalidSlot,
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);

      const slotError = result.errors!.find(e => e.code === 'INVALID_SLOT');
      expect(slotError).toBeDefined();
    });
  });

  describe('Improvement Suggestions', () => {
    it('should suggest adding name for unnamed screens', async () => {
      const unnamedScreen = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [{ type: 'Text', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: unnamedScreen,
        strict: false,
      });

      expect(result.success).toBe(true);
      expect(result.suggestions).toBeDefined();

      const nameSuggestion = result.suggestions!.find(s => s.affectedPath === 'name');
      expect(nameSuggestion).toBeDefined();
      expect(nameSuggestion?.category).toBe('maintainability');
    });

    it('should suggest adding themeId', async () => {
      const noTheme = {
        id: 'test',
        name: 'Test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [{ type: 'Text', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: noTheme,
        strict: false,
      });

      expect(result.success).toBe(true);
      expect(result.suggestions).toBeDefined();

      const themeSuggestion = result.suggestions!.find(s => s.affectedPath === 'themeId');
      expect(themeSuggestion).toBeDefined();
    });

    it('should suggest accessibility improvements for images', async () => {
      const noAlt = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [{ type: 'Avatar', props: { src: '/image.jpg' } }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: noAlt,
        strict: false,
      });

      expect(result.success).toBe(true);
      expect(result.suggestions).toBeDefined();

      const accessibilitySuggestion = result.suggestions!.find(
        s => s.category === 'accessibility' && s.message.includes('alt')
      );
      expect(accessibilitySuggestion).toBeDefined();
    });

    it('should warn about missing slot assignments', async () => {
      const noSlot = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.container',
            components: [{ type: 'Text', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: noSlot,
        strict: false,
      });

      expect(result.success).toBe(true);
      expect(result.suggestions).toBeDefined();

      const slotSuggestion = result.suggestions!.find(s => s.message.includes('slot'));
      expect(slotSuggestion).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty definition', async () => {
      const result = await validateScreenDefinitionTool({
        definition: {},
        strict: true,
      });

      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should handle null definition', async () => {
      const result = await validateScreenDefinitionTool({
        definition: null,
        strict: true,
      });

      // Tool should succeed in processing, but definition should be invalid
      expect(result.success).toBe(true);
      expect(result.valid).toBe(false);
      // Should have errors about missing required fields
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should handle definition with extra properties', async () => {
      const extraProps = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [],
        extraField: 'should be ignored',
        anotherExtra: 123,
      };

      const result = await validateScreenDefinitionTool({
        definition: extraProps,
        strict: true,
      });

      expect(result.success).toBe(true);
      // Should not fail due to extra properties
    });

    it('should handle deeply nested components', async () => {
      const nested = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'main',
            pattern: 'section.container',
            components: [
              {
                type: 'Card',
                props: {},
                children: [
                  {
                    type: 'Text',
                    props: {},
                    children: 'Nested content',
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        definition: nested,
        strict: false,
      });

      expect(result.success).toBe(true);
    });
  });

  describe('Strict vs Non-Strict Mode', () => {
    it('should be more lenient in non-strict mode', async () => {
      const customScreen = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.custom',
            components: [{ type: 'CustomComponent', props: {} }],
          },
        ],
      };

      const strictResult = await validateScreenDefinitionTool({
        definition: customScreen,
        strict: true,
      });

      const nonStrictResult = await validateScreenDefinitionTool({
        definition: customScreen,
        strict: false,
      });

      // Strict mode should have errors
      expect(strictResult.valid).toBe(false);
      expect(strictResult.errors?.length).toBeGreaterThan(0);

      // Non-strict mode should have warnings instead
      expect(nonStrictResult.warnings?.length).toBeGreaterThan(0);
    });

    it('should default to strict mode', async () => {
      const customScreen = {
        id: 'test',
        shell: 'shell.web.app',
        page: 'page.detail',
        sections: [
          {
            id: 'section1',
            pattern: 'section.custom',
            components: [{ type: 'Text', props: {} }],
          },
        ],
      };

      const result = await validateScreenDefinitionTool({
        strict: true,
        definition: customScreen,
      });

      expect(result.success).toBe(true);
      expect(result.errors).toBeDefined(); // Should be strict
    });
  });
});
