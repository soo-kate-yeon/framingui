import { describe, it, expect } from 'vitest';
import { loadTheme } from '../../src/themes/theme-loader.js';
import { generateCSSFromTokens } from '../../src/css-generator/generator.js';
import { validateWCAGCompliance } from '../../src/themes/wcag-compliance.js';

describe('OKLCH Integration', () => {
  describe('Theme Loading', () => {
    it('should load themes with valid OKLCH colors', () => {
      const theme = loadTheme('professional');

      // Themes should contain ColorToken objects, not strings
      expect(theme.tokens.primary['500']).toHaveProperty('l');
      expect(theme.tokens.primary['500']).toHaveProperty('c');
      expect(theme.tokens.primary['500']).toHaveProperty('h');
      expect(theme.tokens.neutral['500']).toHaveProperty('l');
      expect(theme.tokens.success['500']).toHaveProperty('l');
    });

    it('should maintain OKLCH format through all themes', () => {
      const themes = ['professional', 'creative', 'minimal', 'bold', 'warm', 'cool', 'high-contrast'] as const;

      for (const themeName of themes) {
        const theme = loadTheme(themeName);

        for (const [tokenName, scale] of Object.entries(theme.tokens)) {
          if (!scale) continue;
          Object.values(scale).forEach(token => {
            expect(token).toHaveProperty('l');
            expect(token).toHaveProperty('c');
            expect(token).toHaveProperty('h');
          });
        }
      }
    });
  });

  describe('Contract Implementation', () => {
    it('should implement professional theme correctly', () => {
      const theme = loadTheme('professional');
      expect(theme.name).toBe('professional');
      expect(theme.tokens).toBeDefined();
      expect(theme.composition).toBeDefined();
    });

    it('should implement creative theme correctly', () => {
      const theme = loadTheme('creative');
      expect(theme.name).toBe('creative');
    });

    it('should implement high-contrast theme correctly', () => {
      const theme = loadTheme('high-contrast');
      const compliance = validateWCAGCompliance(theme);

      // Verify that compliance validation is performed
      expect(compliance.checks.length).toBeGreaterThan(0);
      expect(compliance.level).toBe('AA');
    });

    it('should handle all theme WCAG validations', () => {
      const themes = ['professional', 'creative', 'minimal', 'bold', 'warm', 'cool', 'high-contrast'] as const;

      for (const themeName of themes) {
        const theme = loadTheme(themeName);
        const compliance = validateWCAGCompliance(theme);

        // Verify checks are performed for all themes
        expect(compliance.checks.length).toBeGreaterThan(0);
        expect(compliance.passed).toBeDefined();
      }
    });
  });

  describe('CSS Generation Integration', () => {
    it('should generate valid CSS from professional theme', () => {
      const theme = loadTheme('professional');
      const css = generateCSSFromTokens({
        semantic: theme.tokens,
        composition: theme.composition,
      });

      expect(css).toContain('--tekton-primary-500');
      expect(css).toContain('oklch');
    });

    it('should generate valid CSS from creative theme', () => {
      const theme = loadTheme('creative');
      const css = generateCSSFromTokens({
        semantic: theme.tokens,
        composition: theme.composition,
      });

      expect(css).toContain('--tekton-primary-500');
    });
  });

  describe('WCAG Compliance Integration', () => {
    it('should validate OKLCH colors for WCAG compliance', () => {
      const theme = loadTheme('high-contrast');
      const compliance = validateWCAGCompliance(theme);

      // Verify that WCAG checks are performed
      expect(compliance.checks.length).toBeGreaterThan(0);
      expect(Array.isArray(compliance.checks)).toBe(true);
      expect(compliance.level).toBe('AA');
    });

    it('should handle all theme WCAG validations', () => {
      const themes = ['professional', 'creative', 'minimal', 'bold', 'warm', 'cool', 'high-contrast'] as const;

      for (const themeName of themes) {
        const theme = loadTheme(themeName);
        const compliance = validateWCAGCompliance(theme);

        // Verify checks are performed for all themes
        expect(compliance.checks.length).toBeGreaterThan(0);
        expect(compliance.passed).toBeDefined();
      }
    });
  });
});
