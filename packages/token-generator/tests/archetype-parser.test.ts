import { describe, it, expect } from 'vitest';
import { parseArchetypeTheme, parseArchetypeFromFile } from '../src/parser/archetype-parser.js';
import type { ArchetypeTheme } from '../src/types/archetype.types.js';

describe('Archetype Parser', () => {
  describe('parseArchetypeTheme', () => {
    it('should parse valid theme object', () => {
      const themeData = {
        id: 'test-theme',
        name: 'Test Theme',
        description: 'A test theme',
        stackInfo: {
          framework: 'nextjs',
          styling: 'tailwindcss',
          components: 'shadcn-ui',
        },
        brandTone: 'professional',
        colorPalette: {
          primary: { l: 0.5, c: 0.15, h: 220 },
          secondary: { l: 0.7, c: 0.1, h: 180 },
          accent: { l: 0.6, c: 0.2, h: 30 },
          neutral: { l: 0.5, c: 0.02, h: 0 },
        },
        typography: {
          fontFamily: 'Inter',
          fontScale: 'medium',
          headingWeight: 600,
          bodyWeight: 400,
        },
        componentDefaults: {
          borderRadius: 'medium',
          density: 'comfortable',
          contrast: 'high',
        },
        aiContext: {
          brandTone: 'professional',
          designPhilosophy: 'Clean and modern',
          colorGuidance: 'Use blue as primary',
          componentGuidance: 'Rounded corners',
          accessibilityNotes: 'High contrast',
        },
      };

      const result = parseArchetypeTheme(themeData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('test-theme');
        expect(result.data.colorPalette.primary.l).toBe(0.5);
      }
    });

    it('should return error for invalid theme (missing colorPalette)', () => {
      const invalidTheme = {
        id: 'test-theme',
        name: 'Test Theme',
        description: 'A test theme',
        stackInfo: {
          framework: 'nextjs',
          styling: 'tailwindcss',
          components: 'shadcn-ui',
        },
        brandTone: 'professional',
        // colorPalette missing
        typography: {
          fontFamily: 'Inter',
          fontScale: 'medium',
          headingWeight: 600,
          bodyWeight: 400,
        },
        componentDefaults: {
          borderRadius: 'medium',
          density: 'comfortable',
          contrast: 'high',
        },
        aiContext: {
          brandTone: 'professional',
          designPhilosophy: 'Clean and modern',
          colorGuidance: 'Use blue as primary',
          componentGuidance: 'Rounded corners',
          accessibilityNotes: 'High contrast',
        },
      };

      const result = parseArchetypeTheme(invalidTheme);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error.issues).toBeDefined();
      }
    });

    it('should return error for invalid color values', () => {
      const invalidTheme = {
        id: 'test-theme',
        name: 'Test Theme',
        description: 'A test theme',
        stackInfo: {
          framework: 'nextjs',
          styling: 'tailwindcss',
          components: 'shadcn-ui',
        },
        brandTone: 'professional',
        colorPalette: {
          primary: { l: 1.5, c: 0.15, h: 220 }, // Invalid l > 1
          secondary: { l: 0.7, c: 0.1, h: 180 },
          accent: { l: 0.6, c: 0.2, h: 30 },
          neutral: { l: 0.5, c: 0.02, h: 0 },
        },
        typography: {
          fontFamily: 'Inter',
          fontScale: 'medium',
          headingWeight: 600,
          bodyWeight: 400,
        },
        componentDefaults: {
          borderRadius: 'medium',
          density: 'comfortable',
          contrast: 'high',
        },
        aiContext: {
          brandTone: 'professional',
          designPhilosophy: 'Clean and modern',
          colorGuidance: 'Use blue as primary',
          componentGuidance: 'Rounded corners',
          accessibilityNotes: 'High contrast',
        },
      };

      const result = parseArchetypeTheme(invalidTheme);

      expect(result.success).toBe(false);
    });
  });

  describe('parseArchetypeFromFile', () => {
    it('should parse premium-editorial.json successfully', async () => {
      const filePath = '/Users/asleep/Developer/tekton/packages/studio-mcp/src/theme/themes/premium-editorial.json';

      const result = await parseArchetypeFromFile(filePath);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('premium-editorial');
        expect(result.data.name).toBe('Premium Editorial');
        expect(result.data.colorPalette.primary).toBeDefined();
        expect(result.data.colorPalette.primary.l).toBe(0.20);
      }
    });

    it('should return error for non-existent file', async () => {
      const filePath = '/non/existent/file.json';

      const result = await parseArchetypeFromFile(filePath);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });

    it('should return error for invalid JSON file', async () => {
      // Create a temporary invalid JSON file for testing
      const fs = await import('fs/promises');
      const path = await import('path');
      const tmpDir = '/tmp';
      const invalidJsonPath = path.join(tmpDir, 'invalid-theme.json');

      await fs.writeFile(invalidJsonPath, '{ invalid json }');

      const result = await parseArchetypeFromFile(invalidJsonPath);

      expect(result.success).toBe(false);

      // Cleanup
      await fs.unlink(invalidJsonPath);
    });
  });

  describe('extractColorTokens', () => {
    it('should extract all color tokens from colorPalette', () => {
      const theme = {
        id: 'test-theme',
        name: 'Test Theme',
        description: 'Test',
        stackInfo: {
          framework: 'nextjs',
          styling: 'tailwindcss',
          components: 'shadcn-ui',
        },
        brandTone: 'professional',
        colorPalette: {
          primary: { l: 0.5, c: 0.15, h: 220 },
          secondary: { l: 0.7, c: 0.1, h: 180 },
          accent: { l: 0.6, c: 0.2, h: 30 },
          neutral: { l: 0.5, c: 0.02, h: 0 },
        },
        typography: {
          fontFamily: 'Inter',
          fontScale: 'medium',
          headingWeight: 600,
          bodyWeight: 400,
        },
        componentDefaults: {
          borderRadius: 'medium',
          density: 'comfortable',
          contrast: 'high',
        },
        aiContext: {
          brandTone: 'professional',
          designPhilosophy: 'Test',
          colorGuidance: 'Test',
          componentGuidance: 'Test',
          accessibilityNotes: 'Test',
        },
      };

      const parseResult = parseArchetypeTheme(theme);

      expect(parseResult.success).toBe(true);
      if (parseResult.success) {
        const tokens = parseResult.data.colorPalette;
        expect(Object.keys(tokens)).toHaveLength(4);
        expect(tokens.primary).toEqual({ l: 0.5, c: 0.15, h: 220 });
        expect(tokens.secondary).toEqual({ l: 0.7, c: 0.1, h: 180 });
        expect(tokens.accent).toEqual({ l: 0.6, c: 0.2, h: 30 });
        expect(tokens.neutral).toEqual({ l: 0.5, c: 0.02, h: 0 });
      }
    });
  });
});
