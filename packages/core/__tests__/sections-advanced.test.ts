/**
 * @tekton/core - Advanced Section Pattern Token Tests
 * 10개 고급 섹션 토큰에 대한 포괄적 테스트
 * [SPEC-LAYOUT-005] [PHASE-1, PHASE-2, PHASE-3]
 *
 * 테스트 범위:
 * Phase 1 (4개 기존):
 * 1. section.masonry - Pinterest 스타일 워터폴 그리드
 * 2. section.sticky-header - 스크롤 시 고정 헤더
 * 3. section.sticky-footer - 스크롤 시 고정 푸터
 * 4. section.collapsible-sidebar - 접을 수 있는 사이드바
 *
 * Phase 2/3 (6개 신규):
 * 5. section.scroll-collapse-header - 스크롤 시 축소 헤더
 * 6. section.scroll-reveal-footer - 스크롤 시 노출 푸터
 * 7. section.multipane-master-detail - 마스터-디테일 2패널
 * 8. section.multipane-three-pane - 3패널 레이아웃
 * 9. section.foldable-split - 폴더블 분할
 * 10. section.foldable-span - 폴더블 스팬
 */

import { describe, it, expect, test } from 'vitest';
import {
  SECTION_MASONRY,
  SECTION_STICKY_HEADER,
  SECTION_STICKY_FOOTER,
  SECTION_COLLAPSIBLE_SIDEBAR,
  SECTION_SCROLL_COLLAPSE_HEADER,
  SECTION_SCROLL_REVEAL_FOOTER,
  SECTION_MULTIPANE_MASTER_DETAIL,
  SECTION_MULTIPANE_THREE_PANE,
  SECTION_FOLDABLE_SPLIT,
  SECTION_FOLDABLE_SPAN,
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
// Token Definition Tests - All 10 Advanced Tokens
// ============================================================================

describe('Advanced Section Pattern Tokens - Token Definitions', () => {
  const advancedPatternIds = [
    'section.masonry',
    'section.sticky-header',
    'section.sticky-footer',
    'section.collapsible-sidebar',
    'section.scroll-collapse-header',
    'section.scroll-reveal-footer',
    'section.multipane-master-detail',
    'section.multipane-three-pane',
    'section.foldable-split',
    'section.foldable-span',
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
    expect(['masonry', 'sticky', 'collapsible', 'scroll', 'multipane', 'foldable']).toContain(
      pattern!.type
    );
  });

  test.each(advancedPatternIds)('token %s has css property with required fields', patternId => {
    const pattern = getAdvancedSectionPatternToken(patternId);
    expect(pattern!.css.display).toBeDefined();
    expect(['grid', 'flex']).toContain(pattern!.css.display);
  });

  test.each(advancedPatternIds)('token %s has responsive config for all breakpoints', patternId => {
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
  });

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
// SECTION_SCROLL_COLLAPSE_HEADER Tests
// ============================================================================

describe('SECTION_SCROLL_COLLAPSE_HEADER', () => {
  it('should have correct id and type', () => {
    expect(SECTION_SCROLL_COLLAPSE_HEADER.id).toBe('section.scroll-collapse-header');
    expect(SECTION_SCROLL_COLLAPSE_HEADER.type).toBe('scroll');
  });

  it('should have sticky positioning for collapse behavior', () => {
    const css = SECTION_SCROLL_COLLAPSE_HEADER.css as any;
    expect(css.position).toBe('sticky');
    expect(css.top).toBe('atomic.spacing.0');
    expect(css.zIndex).toBe(100);
  });

  it('should have height and minHeight for collapse', () => {
    const css = SECTION_SCROLL_COLLAPSE_HEADER.css as any;
    expect(css.height).toBe('atomic.spacing.20');
    expect(css.minHeight).toBe('atomic.spacing.14');
  });

  it('should have transition for smooth collapse', () => {
    const css = SECTION_SCROLL_COLLAPSE_HEADER.css as any;
    expect(css.transition).toContain('height');
    expect(css.transition).toContain('200ms');
  });

  it('should have overflow hidden for collapse', () => {
    const css = SECTION_SCROLL_COLLAPSE_HEADER.css as any;
    expect(css.overflow).toBe('hidden');
  });

  it('should have collapsed state', () => {
    expect(SECTION_SCROLL_COLLAPSE_HEADER.states?.collapsed).toBeDefined();
    const collapsed = SECTION_SCROLL_COLLAPSE_HEADER.states!.collapsed as any;
    expect(collapsed.height).toBe('atomic.spacing.14');
  });

  it('should have default state', () => {
    expect(SECTION_SCROLL_COLLAPSE_HEADER.states?.default).toBeDefined();
    const defaultState = SECTION_SCROLL_COLLAPSE_HEADER.states!.default as any;
    expect(defaultState.height).toBe('atomic.spacing.20');
  });

  it('should have all 6 breakpoints', () => {
    expect(SECTION_SCROLL_COLLAPSE_HEADER.responsive.default).toBeDefined();
    expect(SECTION_SCROLL_COLLAPSE_HEADER.responsive.md).toBeDefined();
    expect(SECTION_SCROLL_COLLAPSE_HEADER.responsive.lg).toBeDefined();
  });

  it('should have relevant tokenBindings', () => {
    const bindings = SECTION_SCROLL_COLLAPSE_HEADER.tokenBindings;
    expect(bindings.expandedHeight).toBeDefined();
    expect(bindings.collapsedHeight).toBeDefined();
    expect(bindings.collapseThreshold).toBeDefined();
    expect(bindings.transitionDuration).toBeDefined();
  });
});

// ============================================================================
// SECTION_SCROLL_REVEAL_FOOTER Tests
// ============================================================================

describe('SECTION_SCROLL_REVEAL_FOOTER', () => {
  it('should have correct id and type', () => {
    expect(SECTION_SCROLL_REVEAL_FOOTER.id).toBe('section.scroll-reveal-footer');
    expect(SECTION_SCROLL_REVEAL_FOOTER.type).toBe('scroll');
  });

  it('should use fixed positioning', () => {
    const css = SECTION_SCROLL_REVEAL_FOOTER.css as any;
    expect(css.position).toBe('fixed');
    expect(css.bottom).toBe('atomic.spacing.0');
    expect(css.zIndex).toBe(100);
  });

  it('should be initially hidden with transform', () => {
    const css = SECTION_SCROLL_REVEAL_FOOTER.css as any;
    expect(css.transform).toBe('translateY(100%)');
  });

  it('should have transition for smooth reveal', () => {
    const css = SECTION_SCROLL_REVEAL_FOOTER.css as any;
    expect(css.transition).toContain('transform');
    expect(css.transition).toContain('200ms');
  });

  it('should have revealed state', () => {
    expect(SECTION_SCROLL_REVEAL_FOOTER.states?.revealed).toBeDefined();
    const revealed = SECTION_SCROLL_REVEAL_FOOTER.states!.revealed as any;
    expect(revealed.transform).toBe('translateY(0)');
  });

  it('should have relevant tokenBindings', () => {
    const bindings = SECTION_SCROLL_REVEAL_FOOTER.tokenBindings;
    expect(bindings.height).toBeDefined();
    expect(bindings.revealThreshold).toBeDefined();
    expect(bindings.revealDirection).toBeDefined();
  });
});

// ============================================================================
// SECTION_MULTIPANE_MASTER_DETAIL Tests
// ============================================================================

describe('SECTION_MULTIPANE_MASTER_DETAIL', () => {
  it('should have correct id and type', () => {
    expect(SECTION_MULTIPANE_MASTER_DETAIL.id).toBe('section.multipane-master-detail');
    expect(SECTION_MULTIPANE_MASTER_DETAIL.type).toBe('multipane');
  });

  it('should use grid layout', () => {
    const css = SECTION_MULTIPANE_MASTER_DETAIL.css as any;
    expect(css.display).toBe('grid');
    expect(css.height).toBe('100%');
    expect(css.overflow).toBe('hidden');
  });

  it('should be stacked on mobile (flex column)', () => {
    const defaultResp = SECTION_MULTIPANE_MASTER_DETAIL.responsive.default as any;
    expect(defaultResp.display).toBe('flex');
    expect(defaultResp.flexDirection).toBe('column');
  });

  it('should be side-by-side on md+ with grid', () => {
    const mdResp = SECTION_MULTIPANE_MASTER_DETAIL.responsive.md as any;
    expect(mdResp.display).toBe('grid');
    expect(mdResp.gridTemplateColumns).toContain('320px');
    expect(mdResp.gridTemplateColumns).toContain('1fr');
  });

  it('should have wider master on lg', () => {
    const lgResp = SECTION_MULTIPANE_MASTER_DETAIL.responsive.lg as any;
    expect(lgResp.gridTemplateColumns).toContain('384px');
  });

  it('should have relevant tokenBindings', () => {
    const bindings = SECTION_MULTIPANE_MASTER_DETAIL.tokenBindings;
    expect(bindings.masterWidth).toBeDefined();
    expect(bindings.detailWidth).toBeDefined();
    expect(bindings.dividerWidth).toBeDefined();
    expect(bindings.dividerColor).toBeDefined();
  });
});

// ============================================================================
// SECTION_MULTIPANE_THREE_PANE Tests
// ============================================================================

describe('SECTION_MULTIPANE_THREE_PANE', () => {
  it('should have correct id and type', () => {
    expect(SECTION_MULTIPANE_THREE_PANE.id).toBe('section.multipane-three-pane');
    expect(SECTION_MULTIPANE_THREE_PANE.type).toBe('multipane');
  });

  it('should be stacked on mobile', () => {
    const defaultResp = SECTION_MULTIPANE_THREE_PANE.responsive.default as any;
    expect(defaultResp.display).toBe('flex');
    expect(defaultResp.flexDirection).toBe('column');
  });

  it('should show 2 panes on md', () => {
    const mdResp = SECTION_MULTIPANE_THREE_PANE.responsive.md as any;
    expect(mdResp.display).toBe('grid');
    expect(mdResp.gridTemplateColumns).toContain('320px');
  });

  it('should show full 3 panes on lg', () => {
    const lgResp = SECTION_MULTIPANE_THREE_PANE.responsive.lg as any;
    expect(lgResp.display).toBe('grid');
    expect(lgResp.gridTemplateColumns).toContain('256px');
    expect(lgResp.gridTemplateColumns).toContain('320px');
    expect(lgResp.gridTemplateColumns).toContain('1fr');
  });

  it('should have relevant tokenBindings', () => {
    const bindings = SECTION_MULTIPANE_THREE_PANE.tokenBindings;
    expect(bindings.navWidth).toBeDefined();
    expect(bindings.listWidth).toBeDefined();
    expect(bindings.contentWidth).toBeDefined();
  });
});

// ============================================================================
// SECTION_FOLDABLE_SPLIT Tests
// ============================================================================

describe('SECTION_FOLDABLE_SPLIT', () => {
  it('should have correct id and type', () => {
    expect(SECTION_FOLDABLE_SPLIT.id).toBe('section.foldable-split');
    expect(SECTION_FOLDABLE_SPLIT.type).toBe('foldable');
  });

  it('should use 2-column grid', () => {
    const css = SECTION_FOLDABLE_SPLIT.css as any;
    expect(css.display).toBe('grid');
    expect(css.gridTemplateColumns).toBe('1fr 1fr');
  });

  it('should be stacked on mobile', () => {
    const defaultResp = SECTION_FOLDABLE_SPLIT.responsive.default as any;
    expect(defaultResp.display).toBe('flex');
    expect(defaultResp.flexDirection).toBe('column');
  });

  it('should have split state for foldable devices', () => {
    expect(SECTION_FOLDABLE_SPLIT.states?.split).toBeDefined();
    const split = SECTION_FOLDABLE_SPLIT.states!.split as any;
    expect(split.gridTemplateColumns).toContain('env(fold-width');
  });

  it('should have relevant tokenBindings', () => {
    const bindings = SECTION_FOLDABLE_SPLIT.tokenBindings;
    expect(bindings.hingeDetection).toBeDefined();
    expect(bindings.hingeGap).toBeDefined();
    expect(bindings.fallbackBehavior).toBeDefined();
  });
});

// ============================================================================
// SECTION_FOLDABLE_SPAN Tests
// ============================================================================

describe('SECTION_FOLDABLE_SPAN', () => {
  it('should have correct id and type', () => {
    expect(SECTION_FOLDABLE_SPAN.id).toBe('section.foldable-span');
    expect(SECTION_FOLDABLE_SPAN.type).toBe('foldable');
  });

  it('should use single column grid', () => {
    const css = SECTION_FOLDABLE_SPAN.css as any;
    expect(css.display).toBe('grid');
    expect(css.gridTemplateColumns).toBe('1fr');
  });

  it('should be flex on mobile', () => {
    const defaultResp = SECTION_FOLDABLE_SPAN.responsive.default as any;
    expect(defaultResp.display).toBe('flex');
  });

  it('should have relevant tokenBindings', () => {
    const bindings = SECTION_FOLDABLE_SPAN.tokenBindings;
    expect(bindings.spanContent).toBeDefined();
    expect(bindings.hingeOverlay).toBeDefined();
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
        'section.scroll-collapse-header',
        'section.scroll-reveal-footer',
        'section.multipane-master-detail',
        'section.multipane-three-pane',
        'section.foldable-split',
        'section.foldable-span',
      ];

      ids.forEach(id => {
        const token = getAdvancedSectionPatternToken(id);
        expect(token).toBeDefined();
        expect(token?.id).toBe(id);
      });
    });
  });

  describe('getAllAdvancedSectionPatternTokens', () => {
    it('should return all 10 tokens', () => {
      const tokens = getAllAdvancedSectionPatternTokens();
      expect(tokens).toHaveLength(10);
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
      expect(ids).toContain('section.scroll-collapse-header');
      expect(ids).toContain('section.scroll-reveal-footer');
      expect(ids).toContain('section.multipane-master-detail');
      expect(ids).toContain('section.multipane-three-pane');
      expect(ids).toContain('section.foldable-split');
      expect(ids).toContain('section.foldable-span');
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

    it('should filter by type - scroll', () => {
      const scroll = getAdvancedSectionsByType('scroll');
      expect(scroll).toHaveLength(2);

      scroll.forEach(token => {
        expect(token.type).toBe('scroll');
      });
    });

    it('should filter by type - multipane', () => {
      const multipane = getAdvancedSectionsByType('multipane');
      expect(multipane).toHaveLength(2);

      multipane.forEach(token => {
        expect(token.type).toBe('multipane');
      });
    });

    it('should filter by type - foldable', () => {
      const foldable = getAdvancedSectionsByType('foldable');
      expect(foldable).toHaveLength(2);

      foldable.forEach(token => {
        expect(token.type).toBe('foldable');
      });
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
      expect(isAdvancedSectionPattern('section.scroll-collapse-header')).toBe(true);
      expect(isAdvancedSectionPattern('section.scroll-reveal-footer')).toBe(true);
      expect(isAdvancedSectionPattern('section.multipane-master-detail')).toBe(true);
      expect(isAdvancedSectionPattern('section.multipane-three-pane')).toBe(true);
      expect(isAdvancedSectionPattern('section.foldable-split')).toBe(true);
      expect(isAdvancedSectionPattern('section.foldable-span')).toBe(true);
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
    it('should return array of 10 IDs', () => {
      const ids = getAdvancedSectionPatternIds();
      expect(ids).toHaveLength(10);
    });

    it('should return all advanced pattern IDs', () => {
      const ids = getAdvancedSectionPatternIds();
      expect(ids).toContain('section.masonry');
      expect(ids).toContain('section.sticky-header');
      expect(ids).toContain('section.sticky-footer');
      expect(ids).toContain('section.collapsible-sidebar');
      expect(ids).toContain('section.scroll-collapse-header');
      expect(ids).toContain('section.scroll-reveal-footer');
      expect(ids).toContain('section.multipane-master-detail');
      expect(ids).toContain('section.multipane-three-pane');
      expect(ids).toContain('section.foldable-split');
      expect(ids).toContain('section.foldable-span');
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

      // Base: 13, Advanced: 10
      expect(combined.length).toBe(baseSections.length + 10);
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
      expect(ids).toContain('section.scroll-collapse-header');
      expect(ids).toContain('section.scroll-reveal-footer');
      expect(ids).toContain('section.multipane-master-detail');
      expect(ids).toContain('section.multipane-three-pane');
      expect(ids).toContain('section.foldable-split');
      expect(ids).toContain('section.foldable-span');
    });

    it('should work with empty base sections array', () => {
      const combined = combineWithBaseSections([]);
      expect(combined).toHaveLength(10);
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
    // CSS 리터럴 값 (토큰 참조가 아닌 설정 값들)
    const cssLiteralValues = [
      'responsive',
      'sticky',
      '100',
      '200ms',
      'ease-in-out',
      '50',
      'up',
      'md',
      'lg',
      'css-env',
      'equal',
      'side-by-side',
      'true',
      'image,video,map',
      'shadow',
      'env(fold-width, 0px)',
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

  describe('Scroll patterns should have states', () => {
    it('scroll-collapse-header has default and collapsed states', () => {
      expect(SECTION_SCROLL_COLLAPSE_HEADER.states).toBeDefined();
      expect(SECTION_SCROLL_COLLAPSE_HEADER.states?.default).toBeDefined();
      expect(SECTION_SCROLL_COLLAPSE_HEADER.states?.collapsed).toBeDefined();
    });

    it('scroll-reveal-footer has default and revealed states', () => {
      expect(SECTION_SCROLL_REVEAL_FOOTER.states).toBeDefined();
      expect(SECTION_SCROLL_REVEAL_FOOTER.states?.default).toBeDefined();
      expect(SECTION_SCROLL_REVEAL_FOOTER.states?.revealed).toBeDefined();
    });
  });

  describe('Foldable patterns should have states', () => {
    it('foldable-split has default and split states', () => {
      expect(SECTION_FOLDABLE_SPLIT.states).toBeDefined();
      expect(SECTION_FOLDABLE_SPLIT.states?.default).toBeDefined();
      expect(SECTION_FOLDABLE_SPLIT.states?.split).toBeDefined();
    });

    it('foldable-span has default state', () => {
      expect(SECTION_FOLDABLE_SPAN.states).toBeDefined();
      expect(SECTION_FOLDABLE_SPAN.states?.default).toBeDefined();
    });
  });

  describe('Masonry should not have states', () => {
    it('masonry does not have states property', () => {
      // Masonry는 정적 레이아웃으로 상태가 불필요
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
    const scrollCount = allSections.filter(s => s.type === 'scroll').length;
    const multipaneCount = allSections.filter(s => s.type === 'multipane').length;
    const foldableCount = allSections.filter(s => s.type === 'foldable').length;

    expect(masonryCount).toBe(1);
    expect(stickyCount).toBe(2); // header, footer
    expect(collapsibleCount).toBe(1);
    expect(scrollCount).toBe(2); // scroll-collapse-header, scroll-reveal-footer
    expect(multipaneCount).toBe(2); // master-detail, three-pane
    expect(foldableCount).toBe(2); // split, span
    expect(
      masonryCount + stickyCount + collapsibleCount + scrollCount + multipaneCount + foldableCount
    ).toBe(10);
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

  it('scroll sections have transition property', () => {
    const scrollSections = getAdvancedSectionsByType('scroll');

    scrollSections.forEach(section => {
      const css = section.css as any;
      expect(css.transition).toBeDefined();
      expect(css.transition).toContain('200ms');
    });
  });

  it('multipane sections use grid display', () => {
    const multipaneSections = getAdvancedSectionsByType('multipane');

    multipaneSections.forEach(section => {
      const css = section.css as any;
      expect(css.display).toBe('grid');
      expect(css.height).toBe('100%');
    });
  });

  it('foldable sections use grid display', () => {
    const foldableSections = getAdvancedSectionsByType('foldable');

    foldableSections.forEach(section => {
      const css = section.css as any;
      expect(css.display).toBe('grid');
      expect(css.height).toBe('100%');
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
      expect(
        section.tokenBindings.shadowDefault || section.tokenBindings.shadowStuck
      ).toBeDefined();
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

    expect(parseInt(defaultCSS.columnCount ?? '0')).toBeLessThan(
      parseInt(lgCSS?.columnCount ?? '0')
    );
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
