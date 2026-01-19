import { describe, it, expect } from 'vitest';
import {
  ArchetypeColorSchema,
  ColorPaletteSchema,
  ArchetypeThemeSchema
} from '../src/parser/schema-validator.js';

describe('Zod Schema Validation', () => {
  describe('ArchetypeColorSchema', () => {
    it('should validate correct OKLCH color', () => {
      const validColor = {
        l: 0.5,
        c: 0.15,
        h: 220,
      };

      const result = ArchetypeColorSchema.safeParse(validColor);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validColor);
      }
    });

    it('should reject invalid lightness (l < 0)', () => {
      const invalidColor = {
        l: -0.1,
        c: 0.15,
        h: 220,
      };

      const result = ArchetypeColorSchema.safeParse(invalidColor);
      expect(result.success).toBe(false);
    });

    it('should reject invalid lightness (l > 1)', () => {
      const invalidColor = {
        l: 1.5,
        c: 0.15,
        h: 220,
      };

      const result = ArchetypeColorSchema.safeParse(invalidColor);
      expect(result.success).toBe(false);
    });

    it('should reject invalid chroma (c < 0)', () => {
      const invalidColor = {
        l: 0.5,
        c: -0.1,
        h: 220,
      };

      const result = ArchetypeColorSchema.safeParse(invalidColor);
      expect(result.success).toBe(false);
    });

    it('should reject invalid hue (h < 0)', () => {
      const invalidColor = {
        l: 0.5,
        c: 0.15,
        h: -10,
      };

      const result = ArchetypeColorSchema.safeParse(invalidColor);
      expect(result.success).toBe(false);
    });

    it('should reject invalid hue (h > 360)', () => {
      const invalidColor = {
        l: 0.5,
        c: 0.15,
        h: 400,
      };

      const result = ArchetypeColorSchema.safeParse(invalidColor);
      expect(result.success).toBe(false);
    });
  });

  describe('ColorPaletteSchema', () => {
    it('should validate complete color palette', () => {
      const validPalette = {
        primary: { l: 0.5, c: 0.15, h: 220 },
        secondary: { l: 0.7, c: 0.1, h: 180 },
        accent: { l: 0.6, c: 0.2, h: 30 },
        neutral: { l: 0.5, c: 0.02, h: 0 },
      };

      const result = ColorPaletteSchema.safeParse(validPalette);
      expect(result.success).toBe(true);
    });

    it('should reject palette missing primary color', () => {
      const invalidPalette = {
        secondary: { l: 0.7, c: 0.1, h: 180 },
        accent: { l: 0.6, c: 0.2, h: 30 },
        neutral: { l: 0.5, c: 0.02, h: 0 },
      };

      const result = ColorPaletteSchema.safeParse(invalidPalette);
      expect(result.success).toBe(false);
    });
  });

  describe('ArchetypeThemeSchema', () => {
    it('should validate complete theme from premium-editorial.json', () => {
      const validTheme = {
        id: 'premium-editorial',
        name: 'Premium Editorial',
        description: 'Elegant and airy magazine-style UI',
        stackInfo: {
          framework: 'nextjs',
          styling: 'tailwindcss',
          components: 'shadcn-ui',
        },
        brandTone: 'elegant',
        colorPalette: {
          primary: { l: 0.20, c: 0.00, h: 0 },
          secondary: { l: 0.98, c: 0.00, h: 0 },
          accent: { l: 0.50, c: 0.05, h: 220 },
          neutral: { l: 0.95, c: 0.01, h: 40 },
        },
        typography: {
          fontFamily: 'Georgia',
          fontScale: 'medium',
          headingWeight: 700,
          bodyWeight: 400,
        },
        componentDefaults: {
          borderRadius: 'none',
          density: 'comfortable',
          contrast: 'high',
        },
        aiContext: {
          brandTone: 'elegant',
          designPhilosophy: 'Content is king',
          colorGuidance: 'Monochrome',
          componentGuidance: 'Serif headings',
          accessibilityNotes: 'High contrast',
        },
      };

      const result = ArchetypeThemeSchema.safeParse(validTheme);
      expect(result.success).toBe(true);
    });

    it('should reject theme with invalid id (empty string)', () => {
      const invalidTheme = {
        id: '',
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

      const result = ArchetypeThemeSchema.safeParse(invalidTheme);
      expect(result.success).toBe(false);
    });

    it('should reject theme with invalid framework', () => {
      const invalidTheme = {
        id: 'test-theme',
        name: 'Test Theme',
        description: 'Test',
        stackInfo: {
          framework: 'invalid-framework',
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

      const result = ArchetypeThemeSchema.safeParse(invalidTheme);
      expect(result.success).toBe(false);
    });
  });
});
