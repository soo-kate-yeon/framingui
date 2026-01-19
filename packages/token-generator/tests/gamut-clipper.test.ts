import { describe, it, expect } from 'vitest';
import { clipToSrgbGamut, isInSrgbGamut } from '../src/color/gamut-clipper.js';
import type { ArchetypeColor } from '../src/types/archetype.types.js';

describe('sRGB Gamut Clipping', () => {
  describe('isInSrgbGamut', () => {
    it('should return true for colors within sRGB gamut', () => {
      const inGamut: ArchetypeColor = {
        l: 0.5,
        c: 0.05,
        h: 220,
      };

      expect(isInSrgbGamut(inGamut)).toBe(true);
    });

    it('should return false for colors outside sRGB gamut (high chroma)', () => {
      const outOfGamut: ArchetypeColor = {
        l: 0.5,
        c: 0.4, // Very high chroma, likely outside sRGB
        h: 180,
      };

      expect(isInSrgbGamut(outOfGamut)).toBe(false);
    });

    it('should return true for black', () => {
      const black: ArchetypeColor = {
        l: 0,
        c: 0,
        h: 0,
      };

      expect(isInSrgbGamut(black)).toBe(true);
    });

    it('should return true for white', () => {
      const white: ArchetypeColor = {
        l: 1,
        c: 0,
        h: 0,
      };

      expect(isInSrgbGamut(white)).toBe(true);
    });
  });

  describe('clipToSrgbGamut', () => {
    it('should not modify colors already in gamut', () => {
      const inGamut: ArchetypeColor = {
        l: 0.5,
        c: 0.05,
        h: 220,
      };

      const clipped = clipToSrgbGamut(inGamut);

      expect(clipped.l).toBe(inGamut.l);
      expect(clipped.c).toBe(inGamut.c);
      expect(clipped.h).toBe(inGamut.h);
    });

    it('should clip out-of-gamut color by reducing chroma', () => {
      const outOfGamut: ArchetypeColor = {
        l: 0.5,
        c: 0.4, // Very high chroma
        h: 220,
      };

      const clipped = clipToSrgbGamut(outOfGamut);

      // Lightness and hue should be preserved
      expect(clipped.l).toBe(outOfGamut.l);
      expect(clipped.h).toBe(outOfGamut.h);

      // Chroma should be reduced
      expect(clipped.c).toBeLessThan(outOfGamut.c);

      // Result should be in gamut
      expect(isInSrgbGamut(clipped)).toBe(true);
    });

    it('should preserve lightness during clipping', () => {
      const outOfGamut: ArchetypeColor = {
        l: 0.6,
        c: 0.35,
        h: 180,
      };

      const clipped = clipToSrgbGamut(outOfGamut);

      // Lightness must be preserved for perceptual uniformity
      expect(clipped.l).toBe(outOfGamut.l);
    });

    it('should preserve hue during clipping', () => {
      const outOfGamut: ArchetypeColor = {
        l: 0.5,
        c: 0.4,
        h: 30,
      };

      const clipped = clipToSrgbGamut(outOfGamut);

      // Hue must be preserved
      expect(clipped.h).toBe(outOfGamut.h);
    });

    it('should clip multiple out-of-gamut colors correctly', () => {
      const colors: ArchetypeColor[] = [
        { l: 0.5, c: 0.4, h: 0 },
        { l: 0.5, c: 0.4, h: 120 },
        { l: 0.5, c: 0.4, h: 240 },
      ];

      for (const color of colors) {
        const clipped = clipToSrgbGamut(color);

        expect(clipped.l).toBe(color.l);
        expect(clipped.h).toBe(color.h);
        expect(clipped.c).toBeLessThanOrEqual(color.c);
        expect(isInSrgbGamut(clipped)).toBe(true);
      }
    });

    it('should handle black without modification', () => {
      const black: ArchetypeColor = {
        l: 0,
        c: 0,
        h: 0,
      };

      const clipped = clipToSrgbGamut(black);

      expect(clipped).toEqual(black);
    });

    it('should handle white without modification', () => {
      const white: ArchetypeColor = {
        l: 1,
        c: 0,
        h: 0,
      };

      const clipped = clipToSrgbGamut(white);

      expect(clipped).toEqual(white);
    });

    it('should be deterministic (same input produces same output)', () => {
      const color: ArchetypeColor = {
        l: 0.5,
        c: 0.4,
        h: 220,
      };

      const clipped1 = clipToSrgbGamut(color);
      const clipped2 = clipToSrgbGamut(color);

      expect(clipped1).toEqual(clipped2);
    });

    it('should clip in under 1ms', () => {
      const color: ArchetypeColor = {
        l: 0.5,
        c: 0.4,
        h: 180,
      };

      const startTime = performance.now();
      clipToSrgbGamut(color);
      const endTime = performance.now();

      const duration = endTime - startTime;
      expect(duration).toBeLessThan(1);
    });
  });
});
