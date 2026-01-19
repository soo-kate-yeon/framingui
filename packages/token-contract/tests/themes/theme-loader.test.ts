import { describe, it, expect } from 'vitest';
import {
  loadTheme,
  getAvailableThemes,
  validateTheme,
} from '../../src/themes/theme-loader.js';

describe('Theme Loader', () => {
  describe('getAvailableThemes', () => {
    it('should return all 7 curated themes', () => {
      const themes = getAvailableThemes();
      expect(themes).toHaveLength(7);
    });

    it('should include all required theme names', () => {
      const themes = getAvailableThemes();
      const themeNames = themes.map(p => p.name);

      expect(themeNames).toContain('professional');
      expect(themeNames).toContain('creative');
      expect(themeNames).toContain('minimal');
      expect(themeNames).toContain('bold');
      expect(themeNames).toContain('warm');
      expect(themeNames).toContain('cool');
      expect(themeNames).toContain('high-contrast');
    });

    it('should have descriptions for all themes', () => {
      const themes = getAvailableThemes();
      themes.forEach(theme => {
        expect(theme.description).toBeDefined();
        expect(theme.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('loadTheme', () => {
    it('should load professional theme', () => {
      const theme = loadTheme('professional');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('professional');
    });

    it('should load creative theme', () => {
      const theme = loadTheme('creative');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('creative');
    });

    it('should load minimal theme', () => {
      const theme = loadTheme('minimal');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('minimal');
    });

    it('should load bold theme', () => {
      const theme = loadTheme('bold');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('bold');
    });

    it('should load warm theme', () => {
      const theme = loadTheme('warm');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('warm');
    });

    it('should load cool theme', () => {
      const theme = loadTheme('cool');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('cool');
    });

    it('should load high-contrast theme', () => {
      const theme = loadTheme('high-contrast');
      expect(theme).toBeDefined();
      expect(theme.name).toBe('high-contrast');
    });

    it('should throw error for invalid theme name', () => {
      expect(() => loadTheme('invalid-theme' as any)).toThrow();
    });
  });

  describe('validateTheme', () => {
    it('should validate professional theme structure', () => {
      const theme = loadTheme('professional');
      const result = validateTheme(theme);
      expect(result.success).toBe(true);
    });

    it('should validate all themes have required semantic tokens', () => {
      const themeNames = ['professional', 'creative', 'minimal', 'bold', 'warm', 'cool', 'high-contrast'] as const;

      themeNames.forEach(name => {
        const theme = loadTheme(name);
        expect(theme.tokens.primary).toBeDefined();
        expect(theme.tokens.neutral).toBeDefined();
        expect(theme.tokens.success).toBeDefined();
        expect(theme.tokens.warning).toBeDefined();
        expect(theme.tokens.error).toBeDefined();
      });
    });

    it('should validate all themes have composition tokens', () => {
      const themeNames = ['professional', 'creative', 'minimal', 'bold', 'warm', 'cool', 'high-contrast'] as const;

      themeNames.forEach(name => {
        const theme = loadTheme(name);
        expect(theme.composition).toBeDefined();
        expect(theme.composition.border).toBeDefined();
        expect(theme.composition.shadow).toBeDefined();
        expect(theme.composition.spacing).toBeDefined();
        expect(theme.composition.typography).toBeDefined();
      });
    });
  });
});
