import { describe, it, expect } from 'vitest';
import type { ArchetypeTheme, ColorPalette, ArchetypeColor } from '../src/types/archetype.types.js';

describe('Archetype Type Definitions', () => {
  describe('ArchetypeColor', () => {
    it('should accept valid OKLCH color with l, c, h properties', () => {
      const color: ArchetypeColor = {
        l: 0.5,
        c: 0.15,
        h: 220,
      };

      expect(color.l).toBe(0.5);
      expect(color.c).toBe(0.15);
      expect(color.h).toBe(220);
    });
  });

  describe('ColorPalette', () => {
    it('should accept primary, secondary, accent, and neutral colors', () => {
      const palette: ColorPalette = {
        primary: { l: 0.5, c: 0.15, h: 220 },
        secondary: { l: 0.7, c: 0.1, h: 180 },
        accent: { l: 0.6, c: 0.2, h: 30 },
        neutral: { l: 0.5, c: 0.02, h: 0 },
      };

      expect(palette.primary).toBeDefined();
      expect(palette.secondary).toBeDefined();
      expect(palette.accent).toBeDefined();
      expect(palette.neutral).toBeDefined();
    });
  });

  describe('ArchetypeTheme', () => {
    it('should accept complete theme structure from existing theme files', () => {
      const theme: ArchetypeTheme = {
        id: 'premium-editorial',
        name: 'Premium Editorial',
        description: 'Elegant editorial theme',
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

      expect(theme.id).toBe('premium-editorial');
      expect(theme.colorPalette.primary.l).toBe(0.20);
      expect(theme.typography.fontFamily).toBe('Georgia');
    });
  });
});
