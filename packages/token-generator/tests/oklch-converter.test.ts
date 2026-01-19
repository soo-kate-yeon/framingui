import { describe, it, expect } from 'vitest';
import { oklchToRgb, rgbToHex, oklchToHex } from '../src/color/oklch-converter.js';
import type { ArchetypeColor } from '../src/types/archetype.types.js';

describe('OKLCH to RGB Converter', () => {
  describe('oklchToRgb', () => {
    it('should convert pure blue OKLCH to RGB', () => {
      const oklch: ArchetypeColor = {
        l: 0.5,
        c: 0.15,
        h: 220,
      };

      const rgb = oklchToRgb(oklch);

      expect(rgb).toBeDefined();
      expect(rgb.r).toBeGreaterThanOrEqual(0);
      expect(rgb.r).toBeLessThanOrEqual(255);
      expect(rgb.g).toBeGreaterThanOrEqual(0);
      expect(rgb.g).toBeLessThanOrEqual(255);
      expect(rgb.b).toBeGreaterThanOrEqual(0);
      expect(rgb.b).toBeLessThanOrEqual(255);
    });

    it('should convert pure black (l=0) correctly', () => {
      const black: ArchetypeColor = {
        l: 0,
        c: 0,
        h: 0,
      };

      const rgb = oklchToRgb(black);

      expect(rgb.r).toBe(0);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });

    it('should convert pure white (l=1) correctly', () => {
      const white: ArchetypeColor = {
        l: 1,
        c: 0,
        h: 0,
      };

      const rgb = oklchToRgb(white);

      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(255);
      expect(rgb.b).toBe(255);
    });

    it('should convert grayscale color (c=0) correctly', () => {
      const gray: ArchetypeColor = {
        l: 0.5,
        c: 0,
        h: 0,
      };

      const rgb = oklchToRgb(gray);

      // Grayscale should have equal R, G, B values
      expect(rgb.r).toBe(rgb.g);
      expect(rgb.g).toBe(rgb.b);
    });

    it('should handle edge case: very high chroma (may need clipping)', () => {
      const highChroma: ArchetypeColor = {
        l: 0.5,
        c: 0.4, // Very high chroma
        h: 180,
      };

      const rgb = oklchToRgb(highChroma);

      // Should still produce valid RGB values
      expect(rgb.r).toBeGreaterThanOrEqual(0);
      expect(rgb.r).toBeLessThanOrEqual(255);
      expect(rgb.g).toBeGreaterThanOrEqual(0);
      expect(rgb.g).toBeLessThanOrEqual(255);
      expect(rgb.b).toBeGreaterThanOrEqual(0);
      expect(rgb.b).toBeLessThanOrEqual(255);
    });

    it('should be deterministic (same input produces same output)', () => {
      const oklch: ArchetypeColor = {
        l: 0.6,
        c: 0.2,
        h: 30,
      };

      const rgb1 = oklchToRgb(oklch);
      const rgb2 = oklchToRgb(oklch);

      expect(rgb1).toEqual(rgb2);
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to hex format', () => {
      const rgb = { r: 255, g: 0, b: 0 };
      const hex = rgbToHex(rgb);

      expect(hex).toBe('#ff0000');
    });

    it('should pad single-digit hex values with zero', () => {
      const rgb = { r: 0, g: 0, b: 15 };
      const hex = rgbToHex(rgb);

      expect(hex).toBe('#00000f');
    });

    it('should convert black to #000000', () => {
      const rgb = { r: 0, g: 0, b: 0 };
      const hex = rgbToHex(rgb);

      expect(hex).toBe('#000000');
    });

    it('should convert white to #ffffff', () => {
      const rgb = { r: 255, g: 255, b: 255 };
      const hex = rgbToHex(rgb);

      expect(hex).toBe('#ffffff');
    });
  });

  describe('oklchToHex', () => {
    it('should convert OKLCH directly to hex', () => {
      const oklch: ArchetypeColor = {
        l: 0.5,
        c: 0.15,
        h: 220,
      };

      const hex = oklchToHex(oklch);

      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should convert black OKLCH to #000000', () => {
      const black: ArchetypeColor = {
        l: 0,
        c: 0,
        h: 0,
      };

      const hex = oklchToHex(black);
      expect(hex).toBe('#000000');
    });

    it('should convert white OKLCH to #ffffff', () => {
      const white: ArchetypeColor = {
        l: 1,
        c: 0,
        h: 0,
      };

      const hex = oklchToHex(white);
      expect(hex).toBe('#ffffff');
    });
  });

  describe('Performance', () => {
    it('should convert color in less than 1ms', () => {
      const oklch: ArchetypeColor = {
        l: 0.6,
        c: 0.18,
        h: 240,
      };

      const startTime = performance.now();
      oklchToRgb(oklch);
      const endTime = performance.now();

      const duration = endTime - startTime;
      expect(duration).toBeLessThan(1);
    });

    it('should handle 1000 conversions in under 1000ms', () => {
      const oklch: ArchetypeColor = {
        l: 0.5,
        c: 0.15,
        h: 220,
      };

      const startTime = performance.now();
      for (let i = 0; i < 1000; i++) {
        oklchToRgb(oklch);
      }
      const endTime = performance.now();

      const duration = endTime - startTime;
      expect(duration).toBeLessThan(1000);
    });
  });
});
