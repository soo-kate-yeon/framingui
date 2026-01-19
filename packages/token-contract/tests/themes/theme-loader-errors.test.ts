import { describe, it, expect } from 'vitest';
import { loadTheme, validateTheme } from '../../src/themes/theme-loader.js';

describe('Theme Loader Error Handling', () => {
  describe('loadTheme', () => {
    it('should throw error for invalid theme name', () => {
      expect(() => loadTheme('nonexistent' as any)).toThrow(
        "Theme 'nonexistent' not found"
      );
    });

    it('should throw error for undefined theme name', () => {
      expect(() => loadTheme(undefined as any)).toThrow();
    });

    it('should throw error for null theme name', () => {
      expect(() => loadTheme(null as any)).toThrow();
    });
  });

  describe('validateTheme error cases', () => {
    it('should return validation error for invalid theme structure', () => {
      const invalidTheme = {
        name: 'invalid',
        description: 'Invalid theme',
        // Missing tokens
      };

      const result = validateTheme(invalidTheme as any);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should return validation error for theme with invalid tokens', () => {
      const invalidTheme = {
        name: 'invalid',
        description: 'Invalid theme',
        tokens: {
          primary: {
            '500': 'invalid-color',
          },
        },
      };

      const result = validateTheme(invalidTheme as any);
      expect(result.success).toBe(false);
    });

    it('should handle non-object inputs', () => {
      const result = validateTheme('not an object' as any);
      expect(result.success).toBe(false);
    });

    it('should handle null inputs', () => {
      const result = validateTheme(null as any);
      expect(result.success).toBe(false);
    });

    it('should handle undefined inputs', () => {
      const result = validateTheme(undefined as any);
      expect(result.success).toBe(false);
    });

    it('should handle array inputs', () => {
      const result = validateTheme([] as any);
      expect(result.success).toBe(false);
    });
  });
});
