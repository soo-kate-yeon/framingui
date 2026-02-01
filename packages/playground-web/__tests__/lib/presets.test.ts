/**
 * Presets unit tests
 * SPEC-UI-003: Theme Preset System
 * [TAG-UI003-055]
 */

import { describe, it, expect } from 'vitest';
import {
  colorPresets,
  typographyPresets,
  spacingPresets,
  getPresetById,
  getPresetsByCategory,
} from '@/lib/presets';

describe('Theme Presets', () => {
  describe('colorPresets', () => {
    it('정확히 3개의 프리셋 존재', () => {
      expect(colorPresets).toHaveLength(3);
    });

    it('모든 프리셋이 color 카테고리', () => {
      colorPresets.forEach((preset) => {
        expect(preset.category).toBe('color');
      });
    });

    it('각 프리셋이 유효한 OKLCH 값 포함', () => {
      colorPresets.forEach((preset) => {
        Object.entries(preset.values).forEach(([key, value]) => {
          // CSS Variable 키 확인
          expect(key).toMatch(/^--tekton-/);

          // OKLCH 값 확인
          expect(value).toMatch(/oklch\(/);
        });
      });
    });

    it('필수 프리셋 ID 존재', () => {
      const ids = colorPresets.map((p) => p.id);
      expect(ids).toContain('color-ocean');
      expect(ids).toContain('color-forest');
      expect(ids).toContain('color-sunset');
    });

    it('각 프리셋에 primary 색상 포함', () => {
      colorPresets.forEach((preset) => {
        expect(preset.values).toHaveProperty('--tekton-bg-primary');
        expect(preset.values).toHaveProperty('--tekton-bg-primary-foreground');
      });
    });
  });

  describe('typographyPresets', () => {
    it('정확히 3개의 프리셋 존재', () => {
      expect(typographyPresets).toHaveLength(3);
    });

    it('모든 프리셋이 typography 카테고리', () => {
      typographyPresets.forEach((preset) => {
        expect(preset.category).toBe('typography');
      });
    });

    it('필수 프리셋 ID 존재', () => {
      const ids = typographyPresets.map((p) => p.id);
      expect(ids).toContain('typo-modern');
      expect(ids).toContain('typo-classic');
      expect(ids).toContain('typo-minimal');
    });

    it('각 프리셋에 폰트 패밀리 포함', () => {
      typographyPresets.forEach((preset) => {
        expect(preset.values).toHaveProperty('--tekton-font-family');
        expect(preset.values['--tekton-font-family']).toBeTruthy();
      });
    });
  });

  describe('spacingPresets', () => {
    it('정확히 3개의 프리셋 존재', () => {
      expect(spacingPresets).toHaveLength(3);
    });

    it('모든 프리셋이 spacing 카테고리', () => {
      spacingPresets.forEach((preset) => {
        expect(preset.category).toBe('spacing');
      });
    });

    it('필수 프리셋 ID 존재', () => {
      const ids = spacingPresets.map((p) => p.id);
      expect(ids).toContain('spacing-compact');
      expect(ids).toContain('spacing-comfortable');
      expect(ids).toContain('spacing-spacious');
    });

    it('각 프리셋에 spacing-unit 포함', () => {
      spacingPresets.forEach((preset) => {
        expect(preset.values).toHaveProperty('--tekton-spacing-unit');
      });
    });
  });

  describe('getPresetById', () => {
    it('유효한 ID로 프리셋 검색', () => {
      const preset = getPresetById('color-ocean');
      expect(preset).toBeDefined();
      expect(preset?.id).toBe('color-ocean');
      expect(preset?.category).toBe('color');
    });

    it('존재하지 않는 ID는 undefined 반환', () => {
      const preset = getPresetById('non-existent-id');
      expect(preset).toBeUndefined();
    });

    it('모든 카테고리에서 검색 가능', () => {
      expect(getPresetById('color-ocean')).toBeDefined();
      expect(getPresetById('typo-modern')).toBeDefined();
      expect(getPresetById('spacing-compact')).toBeDefined();
    });
  });

  describe('getPresetsByCategory', () => {
    it('color 카테고리 프리셋 반환', () => {
      const presets = getPresetsByCategory('color');
      expect(presets).toHaveLength(3);
      expect(presets).toEqual(colorPresets);
    });

    it('typography 카테고리 프리셋 반환', () => {
      const presets = getPresetsByCategory('typography');
      expect(presets).toHaveLength(3);
      expect(presets).toEqual(typographyPresets);
    });

    it('spacing 카테고리 프리셋 반환', () => {
      const presets = getPresetsByCategory('spacing');
      expect(presets).toHaveLength(3);
      expect(presets).toEqual(spacingPresets);
    });
  });

  describe('CSS Variable 키 규칙', () => {
    it('모든 프리셋 값 키가 --tekton- 으로 시작', () => {
      const allPresets = [
        ...colorPresets,
        ...typographyPresets,
        ...spacingPresets,
      ];

      allPresets.forEach((preset) => {
        Object.keys(preset.values).forEach((key) => {
          expect(key).toMatch(/^--tekton-/);
        });
      });
    });
  });
});
