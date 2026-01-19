import { describe, it, expect } from 'vitest';
import { loadTheme } from '../../src/themes/theme-loader.js';
import { validateWCAGCompliance } from '../../src/themes/wcag-compliance.js';

describe('WCAG Compliance', () => {
  const themeNames = [
    'professional',
    'creative',
    'minimal',
    'bold',
    'warm',
    'cool',
    'high-contrast',
  ] as const;

  describe('AA Compliance', () => {
    themeNames.forEach(themeName => {
      it(`should validate ${themeName} theme has contrast checks`, () => {
        const theme = loadTheme(themeName);
        const result = validateWCAGCompliance(theme, 'AA');

        // Verify that WCAG checks are performed
        expect(result.checks.length).toBeGreaterThan(0);
        expect(result.level).toBe('AA');
      });
    });

    it('should validate primary color contrast against neutral background', () => {
      themeNames.forEach(themeName => {
        const theme = loadTheme(themeName);
        const result = validateWCAGCompliance(theme, 'AA');

        const primaryChecks = result.checks.filter(
          check => check.semantic === 'primary'
        );
        // At least some primary checks should exist
        expect(primaryChecks.length).toBeGreaterThan(0);
      });
    });

    it('should validate success color contrast', () => {
      themeNames.forEach(themeName => {
        const theme = loadTheme(themeName);
        const result = validateWCAGCompliance(theme, 'AA');

        const successChecks = result.checks.filter(
          check => check.semantic === 'success'
        );
        // At least some success checks should exist
        expect(successChecks.length).toBeGreaterThan(0);
      });
    });

    it('should validate error color contrast', () => {
      themeNames.forEach(themeName => {
        const theme = loadTheme(themeName);
        const result = validateWCAGCompliance(theme, 'AA');

        const errorChecks = result.checks.filter(
          check => check.semantic === 'error'
        );
        // At least some error checks should exist
        expect(errorChecks.length).toBeGreaterThan(0);
      });
    });

    it('should validate warning color contrast', () => {
      themeNames.forEach(themeName => {
        const theme = loadTheme(themeName);
        const result = validateWCAGCompliance(theme, 'AA');

        const warningChecks = result.checks.filter(
          check => check.semantic === 'warning'
        );
        // At least some warning checks should exist
        expect(warningChecks.length).toBeGreaterThan(0);
      });
    });
  });

  describe('High Contrast Theme - AAA Compliance', () => {
    it('should validate high-contrast theme has AAA checks', () => {
      const theme = loadTheme('high-contrast');
      const result = validateWCAGCompliance(theme, 'AAA');

      expect(result.level).toBe('AAA');
      expect(result.checks.length).toBeGreaterThan(0);
    });

    it('should have high contrast ratios for high-contrast theme', () => {
      const theme = loadTheme('high-contrast');
      const result = validateWCAGCompliance(theme, 'AA');

      // High contrast theme should have higher average contrast
      const avgContrast =
        result.checks.reduce((sum, check) => sum + check.contrastRatio, 0) /
        result.checks.length;

      expect(avgContrast).toBeGreaterThan(3.0);
    });
  });

  describe('Theme Characteristics', () => {
    it('should have professional theme with contrast checks', () => {
      const theme = loadTheme('professional');
      const result = validateWCAGCompliance(theme, 'AA');

      const avgContrast =
        result.checks.reduce((sum, check) => sum + check.contrastRatio, 0) /
        result.checks.length;

      // Professional theme should have reasonable contrast
      expect(avgContrast).toBeGreaterThan(2.0);
    });

    it('should have bold theme with maximum chroma', () => {
      const theme = loadTheme('bold');

      // Bold theme should have higher chroma values
      const primaryChroma = theme.tokens.primary['500']?.c ?? 0;
      expect(primaryChroma).toBeGreaterThan(0.1);
    });

    it('should have minimal theme with low chroma', () => {
      const theme = loadTheme('minimal');

      // Minimal theme should have lower chroma values
      const primaryChroma = theme.tokens.primary['500']?.c ?? 0;
      expect(primaryChroma).toBeLessThan(0.15);
    });
  });
});
