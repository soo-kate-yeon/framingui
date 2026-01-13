import { describe, it, expect } from 'vitest';
import {
  injectTokens,
  generateTailwindTokens,
  generateStyleSheetTokens,
  type TokenInjectionOptions,
} from '../../src/generators/token-injector.js';

describe('token-injector', () => {
  const mockTokens = {
    brand: {
      primary: {
        base: { l: 0.5, c: 0.15, h: 220 },
        light: { l: 0.7, c: 0.12, h: 220 },
        dark: { l: 0.3, c: 0.18, h: 220 },
        contrast: { l: 0.95, c: 0.02, h: 220 },
      },
    },
    semantic: {
      success: { l: 0.5, c: 0.15, h: 140 },
      warning: { l: 0.7, c: 0.18, h: 60 },
      error: { l: 0.5, c: 0.20, h: 25 },
      info: { l: 0.6, c: 0.15, h: 220 },
    },
    neutral: {
      50: { l: 0.98, c: 0.01, h: 0 },
      500: { l: 0.50, c: 0.01, h: 0 },
      900: { l: 0.10, c: 0.01, h: 0 },
    },
  };

  describe('generateTailwindTokens', () => {
    it('should generate Tailwind CSS classes', () => {
      const result = generateTailwindTokens(mockTokens as any);

      expect(result).toContain('bg-primary');
      expect(result).toContain('text-primary');
      expect(result).toContain('bg-success');
      expect(result).toContain('oklch');
    });

    it('should generate valid CSS syntax', () => {
      const result = generateTailwindTokens(mockTokens as any);

      // Should have CSS custom properties
      expect(result).toMatch(/--color-primary-base:/);
      expect(result).toMatch(/oklch\([^)]+\)/);
    });
  });

  describe('generateStyleSheetTokens', () => {
    it('should generate React Native StyleSheet', () => {
      const result = generateStyleSheetTokens(mockTokens as any);

      expect(result).toContain('StyleSheet.create');
      expect(result).toContain('colors');
      expect(result).toContain('primaryBase');
    });

    it('should generate valid JavaScript syntax', () => {
      const result = generateStyleSheetTokens(mockTokens as any);

      expect(result).toMatch(/import.*StyleSheet.*from.*react-native/);
      expect(result).toContain('export const colors');
    });
  });

  describe('injectTokens', () => {
    it('should inject Tailwind tokens for web environment', async () => {
      const options: TokenInjectionOptions = {
        tokens: mockTokens as any,
        platform: 'web',
        outputFormat: 'tailwind',
      };

      const result = await injectTokens(options);

      expect(result.success).toBe(true);
      expect(result.code).toContain('bg-primary');
      expect(result.format).toBe('tailwind');
    });

    it('should inject StyleSheet tokens for React Native', async () => {
      const options: TokenInjectionOptions = {
        tokens: mockTokens as any,
        platform: 'react-native',
        outputFormat: 'stylesheet',
      };

      const result = await injectTokens(options);

      expect(result.success).toBe(true);
      expect(result.code).toContain('StyleSheet');
      expect(result.format).toBe('stylesheet');
    });

    it('should complete injection in < 500ms', async () => {
      const startTime = Date.now();

      const options: TokenInjectionOptions = {
        tokens: mockTokens as any,
        platform: 'web',
        outputFormat: 'tailwind',
      };

      await injectTokens(options);

      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(500);
    });
  });
});
