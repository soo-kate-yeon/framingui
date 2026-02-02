/**
 * @tekton/core - Advanced Section Pattern Token Tests
 * Comprehensive tests for 4 HIGH priority advanced section tokens
 * [SPEC-LAYOUT-005] [PHASE-1]
 *
 * Tests cover:
 * 1. section.masonry - Pinterest-style waterfall grid
 * 2. section.sticky-header - Sticky header with shadow
 * 3. section.sticky-footer - Sticky footer
 * 4. section.collapsible-sidebar - Collapsible sidebar
 */

import { describe, it, expect, test } from 'vitest';
import {
  SECTION_MASONRY,
  SECTION_STICKY_HEADER,
  SECTION_STICKY_FOOTER,
  SECTION_COLLAPSIBLE_SIDEBAR,
  getAdvancedSectionPatternToken,
  getAllAdvancedSectionPatternTokens,
  getAdvancedSectionsByType,
  getAdvancedSectionCSS,
  getAdvancedSectionStateCSS,
  isAdvancedSectionPattern,
  getAdvancedSectionPatternIds,
  combineWithBaseSections,
} from '../src/layout-tokens/sections-advanced.js';
import { getAllSectionPatternTokens } from '../src/layout-tokens/sections.js';
import type {
  AdvancedSectionPatternToken,
  MasonrySectionCSS,
  StickySectionCSS,
  CollapsibleSectionCSS,
} from '../src/layout-tokens/types.js';

// ============================================================================
// Token Definition Tests - All 4 Advanced Tokens
// ============================================================================

describe('Advanced Section Pattern Tokens - Token Definitions', () => {
  const advancedPatternIds = [
    'section.masonry',
    'section.sticky-header',
    'section.sticky-footer',
    'section.collapsible-sidebar',
  ];

  test.each(advancedPatternIds)('token %s exists and has correct structure', patternId => {
    const pattern = getAdvancedSectionPatternToken(patternId);

    // Token existence
    expect(pattern).toBeDefined();
    expect(pattern!.id).toBe(patternId);

    // Required properties
    expect(pattern!.type).toBeDefined();
    expect(pattern!.description).toBeDefined();
    expect(pattern!.description.length).toBeGreaterThan(10);
    expect(pattern!.css).toBeDefined();
    expect(pattern!.responsive).toBeDefined();
    expect(pattern!.tokenBindings).toBeDefined();
  });

  test.each(advancedPatternIds)('token %s has valid type', patternId => {
    const pattern = getAdvancedSectionPatternToken(patternId);
    expect(['masonry', 'sticky', 'collapsible']).toContain(pattern!.type);
  });

  test.each(advancedPatternIds)('token %s has css property with required fields', patternId => {
    const pattern = getAdvancedSectionPatternToken(patternId);
    expect(pattern!.css.display).toBeDefined();
    expect(['grid', 'flex']).toContain(pattern!.css.display);
  });

  test.each(advancedPatternIds)(
    'token %s has responsive config for all breakpoints',
    patternId => {
      const pattern = getAdvancedSectionPatternToken(patternId);

      // default는 필수
      expect(pattern!.responsive.default).toBeDefined();
      expect(pattern!.responsive.default.display).toBeDefined();

      // 다른 breakpoint는 선택적이지만 존재해야 함
      expect(pattern!.responsive.sm).toBeDefined();
      expect(pattern!.responsive.md).toBeDefined();
      expect(pattern!.responsive.lg).toBeDefined();
      expect(pattern!.responsive.xl).toBeDefined();
      expect(pattern!.responsive['2xl']).toBeDefined();
    }
  );

  test.each(advancedPatternIds)('token %s has tokenBindings', patternId => {
    const pattern = getAdvancedSectionPatternToken(patternId);
    expect(pattern!.tokenBindings).toBeDefined();
    expect(Object.keys(pattern!.tokenBindings).length).toBeGreaterThan(0);
  });
});

// ============================================================================
// SECTION_MASONRY Tests
// ============================================================================

describe('SECTION_MASONRY', () => {
  it('should have correct id and type', () => {
    expect(SECTION_MASONRY.id).toBe('section.masonry');
    expect(SECTION_MASONRY.type).toBe('masonry');
  });

  it('should have CSS columns configuration', () => {
    const css = SECTION_MASONRY.css as MasonrySectionCSS;
    expect(css.columnCount).toBeDefined();
    expect(css.columnGap).toBeDefined();
    expect(css.breakInside).toBe('avoid');
  });

  it('should have columnFill property', () => {
    const css = SECTION_MASONRY.css as MasonrySectionCSS;
    expect(css.columnFill).toBeDefined();
    expect(['auto', 'balance']).toContain(css.columnFill);
  });

  it('should have responsive column counts', () => {
    const responsive = SECTION_MASONRY.responsive;
    const defaultCSS = responsive.default as MasonrySectionCSS;
    const mdCSS = responsive.md as Partial<MasonrySectionCSS>;
    const lgCSS = responsive.lg as Partial<MasonrySectionCSS>;
    const xlCSS = responsive.xl as Partial<MasonrySectionCSS>;
    const xxlCSS = responsive['2xl'] as Partial<MasonrySectionCSS>;

    expect(defaultCSS.columnCount).toBe('2');
    expect(mdCSS?.columnCount).toBe('3');
    expect(lgCSS?.columnCount).toBe('4');
    expect(xlCSS?.columnCount).toBe('5');
    expect(xxlCSS?.columnCount).toBe('6');
  });

  it('should have responsive columnGap values', () => {
    const responsive = SECTION_MASONRY.responsive;
    const defaultCSS = responsive.default as MasonrySectionCSS;
    const smCSS = responsive.sm as Partial<MasonrySectionCSS>;

    expect(defaultCSS.columnGap).toContain('atomic.spacing');
    expect(smCSS?.columnGap).toContain('atomic.spacing');
  });

  it('should have description mentioning Pinterest-style', () => {
    expect(SECTION_MASONRY.description.toLowerCase()).toContain('pinterest');
  });

  it('should have token bindings for gap and columns', () => {
    expect(SECTION_MASONRY.tokenBindings.gap).toBeDefined();
    expect(SECTION_MASONRY.tokenBindings.columnGap).toBeDefined();
    expect(SECTION_MASONRY.tokenBindings.columns).toBe('responsive');
  });

  it('should have item styling token bindings', () => {
    expect(SECTION_MASONRY.tokenBindings.itemBackground).toBeDefined();
    expect(SECTION_MASONRY.tokenBindings.itemBorderRadius).toBeDefined();
    expect(SECTION_MASONRY.tokenBindings.itemShadow).toBeDefined();
  });
});

// ============================================================================
// SECTION_STICKY_HEADER Tests
// ============================================================================

describe('SECTION_STICKY_HEADER', () => {
  it('should have correct id and type', () => {
    expect(SECTION_STICKY_HEADER.id).toBe('section.sticky-header');
    expect(SECTION_STICKY_HEADER.type).toBe('sticky');
  });

  it('should have sticky positioning', () => {
    const css = SECTION_STICKY_HEADER.css as StickySectionCSS;
    expect(css.position).toBe('sticky');
    expect(css.top).toBeDefined();
    expect(css.zIndex).toBe(100);
  });

  it('should have top position set to 0', () => {
    const css = SECTION_STICKY_HEADER.css as StickySectionCSS;
    expect(css.top).toContain('atomic.spacing.0');
  });

  it('should have flex layout for header content', () => {
    const css = SECTION_STICKY_HEADER.css as StickySectionCSS;
    expect(css.display).toBe('flex');
    expect(css.flexDirection).toBe('row');
    expect(css.alignItems).toBe('center');
    expect(css.justifyContent).toBe('space-between');
  });

  it('should have states for default and stuck', () => {
    expect(SECTION_STICKY_HEADER.states).toBeDefined();
    expect(SECTION_STICKY_HEADER.states?.default).toBeDefined();
    expect(SECTION_STICKY_HEADER.states?.stuck).toBeDefined();
  });

  it('should have boxShadow defined in stuck state', () => {
    expect(SECTION_STICKY_HEADER.states?.stuck?.boxShadow).toBeDefined();
    expect(SECTION_STICKY_HEADER.states?.stuck?.boxShadow).toContain('atomic.shadow');
  });

  it('should have no shadow in default state', () => {
    expect(SECTION_STICKY_HEADER.states?.default?.boxShadow).toContain('atomic.shadow.none');
  });

  it('should have background color in css', () => {
    const css = SECTION_STICKY_HEADER.css as StickySectionCSS;
    expect(css.backgroundColor).toBeDefined();
    expect(css.backgroundColor).toContain('semantic.background');
  });

  it('should have responsive padding values', () => {
    const responsive = SECTION_STICKY_HEADER.responsive;
    expect(responsive.default.padding).toBeDefined();
    expect(responsive.md?.padding).toBeDefined();
    expect(responsive.xl?.padding).toBeDefined();
  });

  it('should have token bindings for sticky behavior', () => {
    expect(SECTION_STICKY_HEADER.tokenBindings.position).toBe('sticky');
    expect(SECTION_STICKY_HEADER.tokenBindings.top).toBeDefined();
    expect(SECTION_STICKY_HEADER.tokenBindings.zIndex).toBe('100');
    expect(SECTION_STICKY_HEADER.tokenBindings.shadowDefault).toBeDefined();
    expect(SECTION_STICKY_HEADER.tokenBindings.shadowStuck).toBeDefined();
  });
});

// ============================================================================
// SECTION_STICKY_FOOTER Tests
// ============================================================================

describe('SECTION_STICKY_FOOTER', () => {
  it('should have correct id and type', () => {
    expect(SECTION_STICKY_FOOTER.id).toBe('section.sticky-footer');
    expect(SECTION_STICKY_FOOTER.type).toBe('sticky');
  });

  it('should have bottom sticky positioning', () => {
    const css = SECTION_STICKY_FOOTER.css as StickySectionCSS;
    expect(css.position).toBe('sticky');
    expect(css.bottom).toBeDefined();
    expect(css.zIndex).toBe(100);
  });

  it('should have bottom position set to 0', () => {
    const css = SECTION_STICKY_FOOTER.css as StickySectionCSS;
    expect(css.bottom).toContain('atomic.spacing.0');
  });

  it('should have flex layout for footer content', () => {
    const css = SECTION_STICKY_FOOTER.css as StickySectionCSS;
    expect(css.display).toBe('flex');
    expect(css.flexDirection).toBe('row');
    expect(css.alignItems).toBe('center');
    expect(css.justifyContent).toBe('center');
  });

  it('should have gap for spacing between items', () => {
    const css = SECTION_STICKY_FOOTER.css as StickySectionCSS;
    expect(css.gap).toBeDefined();
    expect(css.gap).toContain('atomic.spacing');
  });

  it('should have states for default and stuck', () => {
    expect(SECTION_STICKY_FOOTER.states).toBeDefined();
    expect(SECTION_STICKY_FOOTER.states?.default).toBeDefined();
    expect(SECTION_STICKY_FOOTER.states?.stuck).toBeDefined();
  });

  it('should have shadow in default state (top shadow)', () => {
    expect(SECTION_STICKY_FOOTER.states?.default?.boxShadow).toBeDefined();
    expect(SECTION_STICKY_FOOTER.states?.default?.boxShadow).toContain('atomic.shadow');
  });

  it('should have token bindings for sticky footer behavior', () => {
    expect(SECTION_STICKY_FOOTER.tokenBindings.position).toBe('sticky');
    expect(SECTION_STICKY_FOOTER.tokenBindings.bottom).toBeDefined();
    expect(SECTION_STICKY_FOOTER.tokenBindings.zIndex).toBe('100');
    expect(SECTION_STICKY_FOOTER.tokenBindings.gap).toBeDefined();
  });

  it('should have safe area bottom token binding', () => {
    expect(SECTION_STICKY_FOOTER.tokenBindings.safeAreaBottom).toBeDefined();
  });

  it('should have responsive gap values', () => {
    const responsive = SECTION_STICKY_FOOTER.responsive;
    expect(responsive.default.gap).toBeDefined();
    expect(responsive.sm?.gap).toBeDefined();
    expect(responsive.md?.gap).toBeDefined();
  });
});

// ============================================================================
// SECTION_COLLAPSIBLE_SIDEBAR Tests
// ============================================================================

describe('SECTION_COLLAPSIBLE_SIDEBAR', () => {
  it('should have correct id and type', () => {
    expect(SECTION_COLLAPSIBLE_SIDEBAR.id).toBe('section.collapsible-sidebar');
    expect(SECTION_COLLAPSIBLE_SIDEBAR.type).toBe('collapsible');
  });

  it('should have width and transition', () => {
    const css = SECTION_COLLAPSIBLE_SIDEBAR.css as CollapsibleSectionCSS;
    expect(css.width).toBeDefined();
    expect(css.minWidth).toBeDefined();
    expect(css.transition).toBeDefined();
    expect(css.transition).toContain('200ms');
  });

  it('should have flex column layout', () => {
    const css = SECTION_COLLAPSIBLE_SIDEBAR.css as CollapsibleSectionCSS;
    expect(css.display).toBe('flex');
    expect(css.flexDirection).toBe('column');
  });

  it('should have overflow hidden for collapse animation', () => {
    const css = SECTION_COLLAPSIBLE_SIDEBAR.css as CollapsibleSectionCSS;
    expect(css.overflow).toBe('hidden');
  });

  it('should have willChange property for performance', () => {
    const css = SECTION_COLLAPSIBLE_SIDEBAR.css as CollapsibleSectionCSS;
    expect(css.willChange).toBe('width');
  });

  it('should have collapsed state', () => {
    expect(SECTION_COLLAPSIBLE_SIDEBAR.states?.collapsed).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.states?.collapsed?.width).toBe('atomic.spacing.16');
  });

  it('should have default state', () => {
    expect(SECTION_COLLAPSIBLE_SIDEBAR.states?.default).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.states?.default?.width).toBe('atomic.spacing.64');
  });

  it('should be hidden on mobile by default', () => {
    const defaultCSS = SECTION_COLLAPSIBLE_SIDEBAR.responsive.default as CollapsibleSectionCSS;
    expect(defaultCSS.width).toBe('atomic.spacing.0');
  });

  it('should be hidden on small screens', () => {
    const smCSS = SECTION_COLLAPSIBLE_SIDEBAR.responsive.sm as Partial<CollapsibleSectionCSS>;
    expect(smCSS?.width).toBe('atomic.spacing.0');
  });

  it('should be collapsed on tablet (md)', () => {
    const mdCSS = SECTION_COLLAPSIBLE_SIDEBAR.responsive.md as Partial<CollapsibleSectionCSS>;
    expect(mdCSS?.width).toBe('atomic.spacing.16');
    expect(mdCSS?.minWidth).toBe('atomic.spacing.16');
  });

  it('should be expanded on desktop (lg)', () => {
    const lgCSS = SECTION_COLLAPSIBLE_SIDEBAR.responsive.lg as Partial<CollapsibleSectionCSS>;
    expect(lgCSS?.width).toBe('atomic.spacing.64');
  });

  it('should have larger width on 2xl screens', () => {
    const xxlCSS = SECTION_COLLAPSIBLE_SIDEBAR.responsive['2xl'] as Partial<CollapsibleSectionCSS>;
    expect(xxlCSS?.width).toBe('atomic.spacing.80');
  });

  it('should have token bindings for collapse behavior', () => {
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.expandedWidth).toBe('atomic.spacing.64');
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.collapsedWidth).toBe('atomic.spacing.16');
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.transitionDuration).toBe('200ms');
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.transitionEasing).toBe('ease-in-out');
  });

  it('should have token bindings for sidebar item styling', () => {
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.iconSize).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.itemGap).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.itemPadding).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.itemBorderRadius).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.itemHoverBackground).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.itemActiveBackground).toBeDefined();
  });
});

// ============================================================================
// Utility Functions Tests
// ============================================================================

describe('Utility Functions', () => {
  describe('getAdvancedSectionPatternToken', () => {
    it('should return token by id', () => {
      const token = getAdvancedSectionPatternToken('section.masonry');
      expect(token).toBeDefined();
      expect(token?.id).toBe('section.masonry');
    });

    it('should return undefined for unknown id', () => {
      const token = getAdvancedSectionPatternToken('section.unknown');
      expect(token).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const token = getAdvancedSectionPatternToken('');
      expect(token).toBeUndefined();
    });

    it('should return undefined for base section patterns', () => {
      const token = getAdvancedSectionPatternToken('section.grid-3');
      expect(token).toBeUndefined();
    });

    it('should return correct token for all advanced pattern IDs', () => {
      const ids = [
        'section.masonry',
        'section.sticky-header',
        'section.sticky-footer',
        'section.collapsible-sidebar',
      ];

      ids.forEach(id => {
        const token = getAdvancedSectionPatternToken(id);
        expect(token).toBeDefined();
        expect(token?.id).toBe(id);
      });
    });
  });

  describe('getAllAdvancedSectionPatternTokens', () => {
    it('should return all 4 tokens', () => {
      const tokens = getAllAdvancedSectionPatternTokens();
      expect(tokens).toHaveLength(4);
    });

    it('should return array of AdvancedSectionPatternToken', () => {
      const tokens = getAllAdvancedSectionPatternTokens();
      tokens.forEach(token => {
        expect(token.id).toBeDefined();
        expect(token.type).toBeDefined();
        expect(token.description).toBeDefined();
        expect(token.css).toBeDefined();
        expect(token.responsive).toBeDefined();
        expect(token.tokenBindings).toBeDefined();
      });
    });

    it('should include all expected token IDs', () => {
      const tokens = getAllAdvancedSectionPatternTokens();
      const ids = tokens.map(t => t.id);

      expect(ids).toContain('section.masonry');
      expect(ids).toContain('section.sticky-header');
      expect(ids).toContain('section.sticky-footer');
      expect(ids).toContain('section.collapsible-sidebar');
    });
  });

  describe('getAdvancedSectionsByType', () => {
    it('should filter by type - sticky', () => {
      const sticky = getAdvancedSectionsByType('sticky');
      expect(sticky).toHaveLength(2); // header and footer

      sticky.forEach(token => {
        expect(token.type).toBe('sticky');
      });
    });

    it('should filter by type - masonry', () => {
      const masonry = getAdvancedSectionsByType('masonry');
      expect(masonry).toHaveLength(1);
      expect(masonry[0].id).toBe('section.masonry');
    });

    it('should filter by type - collapsible', () => {
      const collapsible = getAdvancedSectionsByType('collapsible');
      expect(collapsible).toHaveLength(1);
      expect(collapsible[0].id).toBe('section.collapsible-sidebar');
    });

    it('should return empty array for non-existent type', () => {
      // @ts-expect-error Testing invalid type
      const result = getAdvancedSectionsByType('invalid');
      expect(result).toEqual([]);
    });
  });

  describe('isAdvancedSectionPattern', () => {
    it('should return true for advanced patterns', () => {
      expect(isAdvancedSectionPattern('section.masonry')).toBe(true);
      expect(isAdvancedSectionPattern('section.sticky-header')).toBe(true);
      expect(isAdvancedSectionPattern('section.sticky-footer')).toBe(true);
      expect(isAdvancedSectionPattern('section.collapsible-sidebar')).toBe(true);
    });

    it('should return false for base patterns', () => {
      expect(isAdvancedSectionPattern('section.grid-3')).toBe(false);
      expect(isAdvancedSectionPattern('section.split-50-50')).toBe(false);
      expect(isAdvancedSectionPattern('section.container')).toBe(false);
    });

    it('should return false for invalid patterns', () => {
      expect(isAdvancedSectionPattern('')).toBe(false);
      expect(isAdvancedSectionPattern('invalid')).toBe(false);
      expect(isAdvancedSectionPattern('section.unknown')).toBe(false);
    });
  });

  describe('getAdvancedSectionPatternIds', () => {
    it('should return array of 4 IDs', () => {
      const ids = getAdvancedSectionPatternIds();
      expect(ids).toHaveLength(4);
    });

    it('should return all advanced pattern IDs', () => {
      const ids = getAdvancedSectionPatternIds();
      expect(ids).toContain('section.masonry');
      expect(ids).toContain('section.sticky-header');
      expect(ids).toContain('section.sticky-footer');
      expect(ids).toContain('section.collapsible-sidebar');
    });

    it('should return unique IDs', () => {
      const ids = getAdvancedSectionPatternIds();
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('getAdvancedSectionCSS', () => {
    it('should return CSS for default breakpoint', () => {
      const css = getAdvancedSectionCSS('section.masonry');
      expect(css).toBeDefined();
      expect(css?.display).toBeDefined();
    });

    it('should return CSS for specific breakpoint', () => {
      const css = getAdvancedSectionCSS('section.masonry', 'md');
      expect(css).toBeDefined();
      // Should merge default with md
      expect(css?.display).toBe('grid');
      expect((css as MasonrySectionCSS)?.columnCount).toBe('3');
    });

    it('should return undefined for unknown pattern', () => {
      const css = getAdvancedSectionCSS('section.unknown');
      expect(css).toBeUndefined();
    });

    it('should return default CSS if breakpoint not defined', () => {
      const defaultCSS = getAdvancedSectionCSS('section.masonry', 'default');
      const smCSS = getAdvancedSectionCSS('section.masonry', 'sm');

      expect(defaultCSS).toBeDefined();
      expect(smCSS).toBeDefined();
    });

    it('should merge default with breakpoint-specific styles', () => {
      const lgCSS = getAdvancedSectionCSS('section.collapsible-sidebar', 'lg');
      expect(lgCSS).toBeDefined();
      // Should have merged properties
      expect(lgCSS?.display).toBe('flex');
      expect((lgCSS as CollapsibleSectionCSS)?.width).toBe('atomic.spacing.64');
    });
  });

  describe('getAdvancedSectionStateCSS', () => {
    it('should return collapsed state CSS for collapsible sidebar', () => {
      const css = getAdvancedSectionStateCSS('section.collapsible-sidebar', 'collapsed');
      expect(css).toBeDefined();
      expect((css as Partial<CollapsibleSectionCSS>)?.width).toBe('atomic.spacing.16');
    });

    it('should return stuck state CSS for sticky header', () => {
      const css = getAdvancedSectionStateCSS('section.sticky-header', 'stuck');
      expect(css).toBeDefined();
      expect((css as Partial<StickySectionCSS>)?.boxShadow).toBeDefined();
    });

    it('should return stuck state CSS for sticky footer', () => {
      const css = getAdvancedSectionStateCSS('section.sticky-footer', 'stuck');
      expect(css).toBeDefined();
      expect((css as Partial<StickySectionCSS>)?.boxShadow).toBeDefined();
    });

    it('should return default state CSS', () => {
      const css = getAdvancedSectionStateCSS('section.sticky-header', 'default');
      expect(css).toBeDefined();
    });

    it('should return undefined for unknown pattern', () => {
      const css = getAdvancedSectionStateCSS('section.unknown', 'default');
      expect(css).toBeUndefined();
    });

    it('should return undefined for pattern without states', () => {
      const css = getAdvancedSectionStateCSS('section.masonry', 'collapsed');
      expect(css).toBeUndefined();
    });
  });

  describe('combineWithBaseSections', () => {
    it('should combine base and advanced sections', () => {
      const baseSections = getAllSectionPatternTokens();
      const combined = combineWithBaseSections(baseSections);

      // Base: 13, Advanced: 4
      expect(combined.length).toBe(baseSections.length + 4);
    });

    it('should include all base section IDs', () => {
      const baseSections = getAllSectionPatternTokens();
      const combined = combineWithBaseSections(baseSections);
      const ids = combined.map(s => s.id);

      baseSections.forEach(section => {
        expect(ids).toContain(section.id);
      });
    });

    it('should include all advanced section IDs', () => {
      const baseSections = getAllSectionPatternTokens();
      const combined = combineWithBaseSections(baseSections);
      const ids = combined.map(s => s.id);

      expect(ids).toContain('section.masonry');
      expect(ids).toContain('section.sticky-header');
      expect(ids).toContain('section.sticky-footer');
      expect(ids).toContain('section.collapsible-sidebar');
    });

    it('should work with empty base sections array', () => {
      const combined = combineWithBaseSections([]);
      expect(combined).toHaveLength(4);
    });
  });
});

// ============================================================================
// Responsive Configuration Tests
// ============================================================================

describe('Responsive Configurations', () => {
  const allTokens = getAllAdvancedSectionPatternTokens();

  test.each(allTokens)('$id should have default responsive config', token => {
    expect(token.responsive.default).toBeDefined();
    expect(token.responsive.default.display).toBeDefined();
  });

  test.each(allTokens)('$id should have all breakpoints defined', token => {
    expect(token.responsive.sm).toBeDefined();
    expect(token.responsive.md).toBeDefined();
    expect(token.responsive.lg).toBeDefined();
    expect(token.responsive.xl).toBeDefined();
    expect(token.responsive['2xl']).toBeDefined();
  });

  test.each(allTokens)('$id should have tokenBindings', token => {
    expect(token.tokenBindings).toBeDefined();
    expect(Object.keys(token.tokenBindings).length).toBeGreaterThan(0);
  });

  it('all tokens use valid token reference format in bindings (where applicable)', () => {
    const tokenReferencePattern = /^[a-z]+\.[a-z-]+(\.[a-z0-9-]+)*$/;
    // CSS literal values that are not token references
    const cssLiteralValues = [
      'responsive',
      'sticky',
      '100',
      '200ms',
      'ease-in-out',
    ];

    allTokens.forEach(token => {
      Object.entries(token.tokenBindings).forEach(([key, value]) => {
        if (typeof value === 'string' && !cssLiteralValues.includes(value)) {
          expect(
            value.match(tokenReferencePattern),
            `Token binding "${key}" in "${token.id}" should be valid token reference: ${value}`
          ).toBeTruthy();
        }
      });
    });
  });
});

// ============================================================================
// States Configuration Tests
// ============================================================================

describe('States Configuration', () => {
  describe('Sticky patterns should have states', () => {
    it('sticky-header has default and stuck states', () => {
      expect(SECTION_STICKY_HEADER.states).toBeDefined();
      expect(SECTION_STICKY_HEADER.states?.default).toBeDefined();
      expect(SECTION_STICKY_HEADER.states?.stuck).toBeDefined();
    });

    it('sticky-footer has default and stuck states', () => {
      expect(SECTION_STICKY_FOOTER.states).toBeDefined();
      expect(SECTION_STICKY_FOOTER.states?.default).toBeDefined();
      expect(SECTION_STICKY_FOOTER.states?.stuck).toBeDefined();
    });
  });

  describe('Collapsible patterns should have states', () => {
    it('collapsible-sidebar has default and collapsed states', () => {
      expect(SECTION_COLLAPSIBLE_SIDEBAR.states).toBeDefined();
      expect(SECTION_COLLAPSIBLE_SIDEBAR.states?.default).toBeDefined();
      expect(SECTION_COLLAPSIBLE_SIDEBAR.states?.collapsed).toBeDefined();
    });
  });

  describe('Masonry should not have states', () => {
    it('masonry does not have states property', () => {
      // Masonry is a static layout, no states needed
      expect(SECTION_MASONRY.states).toBeUndefined();
    });
  });
});

// ============================================================================
// Type Distribution Tests
// ============================================================================

describe('Advanced Section Type Distribution', () => {
  it('correct number of sections per type', () => {
    const allSections = getAllAdvancedSectionPatternTokens();

    const masonryCount = allSections.filter(s => s.type === 'masonry').length;
    const stickyCount = allSections.filter(s => s.type === 'sticky').length;
    const collapsibleCount = allSections.filter(s => s.type === 'collapsible').length;

    expect(masonryCount).toBe(1);
    expect(stickyCount).toBe(2); // header and footer
    expect(collapsibleCount).toBe(1);
    expect(masonryCount + stickyCount + collapsibleCount).toBe(4);
  });

  it('all sticky sections have position: sticky', () => {
    const stickySections = getAdvancedSectionsByType('sticky');

    stickySections.forEach(section => {
      const css = section.css as StickySectionCSS;
      expect(css.position).toBe('sticky');
    });
  });

  it('all sticky sections have zIndex: 100', () => {
    const stickySections = getAdvancedSectionsByType('sticky');

    stickySections.forEach(section => {
      const css = section.css as StickySectionCSS;
      expect(css.zIndex).toBe(100);
    });
  });

  it('collapsible sections have transition property', () => {
    const collapsibleSections = getAdvancedSectionsByType('collapsible');

    collapsibleSections.forEach(section => {
      const css = section.css as CollapsibleSectionCSS;
      expect(css.transition).toBeDefined();
      expect(css.transition).toContain('200ms');
    });
  });

  it('masonry sections have columnCount property', () => {
    const masonrySections = getAdvancedSectionsByType('masonry');

    masonrySections.forEach(section => {
      const css = section.css as MasonrySectionCSS;
      expect(css.columnCount).toBeDefined();
    });
  });
});

// ============================================================================
// Token Binding Tests
// ============================================================================

describe('Token Bindings', () => {
  it('all sections have at least 5 token bindings', () => {
    const allSections = getAllAdvancedSectionPatternTokens();

    allSections.forEach(section => {
      expect(Object.keys(section.tokenBindings).length).toBeGreaterThanOrEqual(5);
    });
  });

  it('sticky sections have shadow-related token bindings', () => {
    const stickySections = getAdvancedSectionsByType('sticky');

    stickySections.forEach(section => {
      expect(section.tokenBindings.shadowDefault || section.tokenBindings.shadowStuck).toBeDefined();
    });
  });

  it('collapsible sidebar has width-related token bindings', () => {
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.expandedWidth).toBeDefined();
    expect(SECTION_COLLAPSIBLE_SIDEBAR.tokenBindings.collapsedWidth).toBeDefined();
  });

  it('masonry has column-related token bindings', () => {
    expect(SECTION_MASONRY.tokenBindings.gap).toBeDefined();
    expect(SECTION_MASONRY.tokenBindings.columnGap).toBeDefined();
  });
});

// ============================================================================
// Edge Cases and Error Handling
// ============================================================================

describe('Edge Cases', () => {
  it('section IDs follow naming convention', () => {
    const allSections = getAllAdvancedSectionPatternTokens();

    allSections.forEach(section => {
      expect(section.id).toMatch(/^section\.[a-z0-9-]+$/);
    });
  });

  it('section descriptions are descriptive', () => {
    const allSections = getAllAdvancedSectionPatternTokens();

    allSections.forEach(section => {
      expect(section.description.length).toBeGreaterThan(30);
      expect(section.description).not.toBe(section.id);
    });
  });

  it('responsive default config has display property', () => {
    const allSections = getAllAdvancedSectionPatternTokens();

    allSections.forEach(section => {
      expect(section.responsive.default.display).toBeDefined();
      expect(['grid', 'flex']).toContain(section.responsive.default.display);
    });
  });

  it('getAdvancedSectionPatternToken handles null-like values', () => {
    // @ts-expect-error Testing invalid input
    expect(getAdvancedSectionPatternToken(null)).toBeUndefined();
    // @ts-expect-error Testing invalid input
    expect(getAdvancedSectionPatternToken(undefined)).toBeUndefined();
  });
});

// ============================================================================
// Mobile-First Responsive Behavior Tests
// ============================================================================

describe('Mobile-First Responsive Behavior', () => {
  it('masonry starts with fewer columns on mobile', () => {
    const defaultCSS = SECTION_MASONRY.responsive.default as MasonrySectionCSS;
    const lgCSS = SECTION_MASONRY.responsive.lg as Partial<MasonrySectionCSS>;

    expect(parseInt(defaultCSS.columnCount ?? '0')).toBeLessThan(parseInt(lgCSS?.columnCount ?? '0'));
  });

  it('collapsible sidebar is hidden on mobile', () => {
    const defaultCSS = SECTION_COLLAPSIBLE_SIDEBAR.responsive.default as CollapsibleSectionCSS;
    expect(defaultCSS.width).toBe('atomic.spacing.0');
  });

  it('sticky header maintains sticky behavior across breakpoints', () => {
    const defaultCSS = SECTION_STICKY_HEADER.responsive.default as StickySectionCSS;
    expect(defaultCSS.position).toBe('sticky');
    expect(defaultCSS.zIndex).toBe(100);
  });

  it('sticky footer maintains sticky behavior across breakpoints', () => {
    const defaultCSS = SECTION_STICKY_FOOTER.responsive.default as StickySectionCSS;
    expect(defaultCSS.position).toBe('sticky');
    expect(defaultCSS.zIndex).toBe(100);
  });

  it('padding increases on larger screens', () => {
    const defaultPadding = SECTION_STICKY_HEADER.responsive.default.padding;
    const xlPadding = SECTION_STICKY_HEADER.responsive.xl?.padding;

    // Token numbers increase with screen size
    // e.g., atomic.spacing.3 -> atomic.spacing.5
    expect(defaultPadding).toBeDefined();
    expect(xlPadding).toBeDefined();

    const defaultNum = parseInt(defaultPadding!.split('.').pop()!);
    const xlNum = parseInt(xlPadding!.split('.').pop()!);
    expect(xlNum).toBeGreaterThanOrEqual(defaultNum);
  });
});
