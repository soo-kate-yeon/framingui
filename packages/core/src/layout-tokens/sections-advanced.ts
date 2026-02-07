/**
 * @tekton/core - Advanced Section Pattern Token Definitions
 * HIGH Priority Advanced Layout Patterns for SPEC-LAYOUT-005
 *
 * Implements 4 advanced section patterns:
 * 1. section.masonry - Pinterest-style waterfall grid
 * 2. section.sticky-header - Header that sticks to viewport top
 * 3. section.sticky-footer - Footer that sticks to viewport bottom
 * 4. section.collapsible-sidebar - Sidebar with expand/collapse toggle
 *
 * [SPEC-LAYOUT-005] [PHASE-1]
 */

import type {
  AdvancedSectionPatternToken,
  MasonrySectionCSS,
  StickySectionCSS,
  CollapsibleSectionCSS,
  ScrollSectionCSS,
  MultiPaneSectionCSS,
  FoldableSectionCSS,
  SectionPatternToken,
} from './types.js';
import type { TokenReference } from '../token-resolver.js';

// ============================================================================
// Masonry Pattern Token
// ============================================================================

/**
 * Pinterest-style waterfall grid layout using CSS columns
 *
 * Uses CSS multi-column layout for broad browser support (IE10+).
 * Items flow vertically within columns, creating the classic masonry effect.
 *
 * Responsive behavior:
 * - default (mobile): 2 columns
 * - sm: 2 columns
 * - md: 3 columns
 * - lg: 4 columns
 * - xl: 5 columns
 * - 2xl: 6 columns
 *
 * @example
 * ```tsx
 * // React usage
 * <div style={{ ...getMasonryStyles(breakpoint) }}>
 *   {items.map(item => (
 *     <div key={item.id} style={{ breakInside: 'avoid' }}>
 *       {item.content}
 *     </div>
 *   ))}
 * </div>
 * ```
 */
export const SECTION_MASONRY: AdvancedSectionPatternToken = {
  id: 'section.masonry',
  type: 'masonry',
  description: 'Pinterest-style waterfall grid using CSS columns for broad browser support',
  css: {
    display: 'grid', // Fallback for CSS columns
    columnCount: '4',
    columnGap: 'atomic.spacing.4' as TokenReference,
    breakInside: 'avoid',
    columnFill: 'balance',
  } as MasonrySectionCSS,
  responsive: {
    default: {
      display: 'grid',
      columnCount: '2',
      columnGap: 'atomic.spacing.2' as TokenReference,
      breakInside: 'avoid',
      columnFill: 'auto',
    } as MasonrySectionCSS,
    sm: {
      columnCount: '2',
      columnGap: 'atomic.spacing.3' as TokenReference,
    } as Partial<MasonrySectionCSS>,
    md: {
      columnCount: '3',
      columnGap: 'atomic.spacing.4' as TokenReference,
    } as Partial<MasonrySectionCSS>,
    lg: {
      columnCount: '4',
      columnGap: 'atomic.spacing.4' as TokenReference,
    } as Partial<MasonrySectionCSS>,
    xl: {
      columnCount: '5',
      columnGap: 'atomic.spacing.5' as TokenReference,
    } as Partial<MasonrySectionCSS>,
    '2xl': {
      columnCount: '6',
      columnGap: 'atomic.spacing.6' as TokenReference,
    } as Partial<MasonrySectionCSS>,
  },
  tokenBindings: {
    gap: 'atomic.spacing.4',
    columnGap: 'atomic.spacing.4',
    itemBackground: 'semantic.background.surface',
    itemBorderRadius: 'atomic.radius.md',
    itemShadow: 'atomic.shadow.sm',
    columns: 'responsive',
  },
};

// ============================================================================
// Sticky Header Pattern Token
// ============================================================================

/**
 * Header that sticks to the viewport top during scroll
 *
 * Uses CSS `position: sticky` for native scroll-aware behavior.
 * Includes shadow and z-index for proper layering when stuck.
 *
 * Features:
 * - Sticks to top of viewport (top: 0)
 * - High z-index (100) to stay above content
 * - Optional shadow when stuck for visual separation
 * - Full-width with transparent background option
 *
 * Responsive behavior:
 * - Consistent sticky behavior across all breakpoints
 * - Padding adjusts for different screen sizes
 *
 * @example
 * ```tsx
 * // React usage with intersection observer for stuck state
 * const [isStuck, setIsStuck] = useState(false);
 *
 * <header style={{
 *   position: 'sticky',
 *   top: 0,
 *   zIndex: 100,
 *   boxShadow: isStuck ? 'var(--shadow-md)' : 'none'
 * }}>
 *   {children}
 * </header>
 * ```
 */
export const SECTION_STICKY_HEADER: AdvancedSectionPatternToken = {
  id: 'section.sticky-header',
  type: 'sticky',
  description: 'Header that sticks to viewport top during scroll with shadow when stuck',
  css: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 'atomic.spacing.0' as TokenReference,
    zIndex: 100,
    padding: 'atomic.spacing.4' as TokenReference,
    backgroundColor: 'semantic.background.surface' as TokenReference,
    boxShadow: 'atomic.shadow.none' as TokenReference,
  } as StickySectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 'atomic.spacing.0' as TokenReference,
      zIndex: 100,
      padding: 'atomic.spacing.3' as TokenReference,
      backgroundColor: 'semantic.background.surface' as TokenReference,
    } as StickySectionCSS,
    sm: {
      padding: 'atomic.spacing.3' as TokenReference,
    } as Partial<StickySectionCSS>,
    md: {
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<StickySectionCSS>,
    lg: {
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<StickySectionCSS>,
    xl: {
      padding: 'atomic.spacing.5' as TokenReference,
    } as Partial<StickySectionCSS>,
    '2xl': {
      padding: 'atomic.spacing.6' as TokenReference,
    } as Partial<StickySectionCSS>,
  },
  states: {
    default: {
      boxShadow: 'atomic.shadow.none' as TokenReference,
    },
    stuck: {
      boxShadow: 'atomic.shadow.md' as TokenReference,
      backgroundColor: 'semantic.background.surface' as TokenReference,
    },
  },
  tokenBindings: {
    position: 'sticky',
    top: 'atomic.spacing.0',
    zIndex: '100',
    padding: 'atomic.spacing.4',
    background: 'semantic.background.surface',
    shadowDefault: 'atomic.shadow.none',
    shadowStuck: 'atomic.shadow.md',
    borderBottom: 'semantic.border.default',
  },
};

// ============================================================================
// Sticky Footer Pattern Token
// ============================================================================

/**
 * Footer that sticks to the viewport bottom during scroll
 *
 * Uses CSS `position: sticky` with `bottom: 0` for bottom-stuck behavior.
 * Ideal for action bars, navigation bars, or persistent CTAs.
 *
 * Features:
 * - Sticks to bottom of viewport (bottom: 0)
 * - High z-index (100) to stay above content
 * - Top shadow for visual separation from content
 * - Safe area padding support for mobile devices
 *
 * Responsive behavior:
 * - Consistent sticky behavior across all breakpoints
 * - Padding adjusts for different screen sizes
 * - Mobile: considers safe area for home indicator
 *
 * @example
 * ```tsx
 * // React usage for action bar
 * <footer style={{
 *   position: 'sticky',
 *   bottom: 0,
 *   zIndex: 100,
 *   paddingBottom: 'env(safe-area-inset-bottom)'
 * }}>
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </footer>
 * ```
 */
export const SECTION_STICKY_FOOTER: AdvancedSectionPatternToken = {
  id: 'section.sticky-footer',
  type: 'sticky',
  description: 'Footer that sticks to viewport bottom with top shadow',
  css: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'atomic.spacing.4' as TokenReference,
    position: 'sticky',
    bottom: 'atomic.spacing.0' as TokenReference,
    zIndex: 100,
    padding: 'atomic.spacing.4' as TokenReference,
    backgroundColor: 'semantic.background.surface' as TokenReference,
    boxShadow: 'atomic.shadow.lg' as TokenReference,
  } as StickySectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'atomic.spacing.2' as TokenReference,
      position: 'sticky',
      bottom: 'atomic.spacing.0' as TokenReference,
      zIndex: 100,
      padding: 'atomic.spacing.3' as TokenReference,
      backgroundColor: 'semantic.background.surface' as TokenReference,
      boxShadow: 'atomic.shadow.md' as TokenReference,
    } as StickySectionCSS,
    sm: {
      padding: 'atomic.spacing.3' as TokenReference,
      gap: 'atomic.spacing.3' as TokenReference,
    } as Partial<StickySectionCSS>,
    md: {
      padding: 'atomic.spacing.4' as TokenReference,
      gap: 'atomic.spacing.4' as TokenReference,
      boxShadow: 'atomic.shadow.lg' as TokenReference,
    } as Partial<StickySectionCSS>,
    lg: {
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<StickySectionCSS>,
    xl: {
      padding: 'atomic.spacing.5' as TokenReference,
    } as Partial<StickySectionCSS>,
    '2xl': {
      padding: 'atomic.spacing.6' as TokenReference,
    } as Partial<StickySectionCSS>,
  },
  states: {
    default: {
      boxShadow: 'atomic.shadow.lg' as TokenReference,
    },
    stuck: {
      boxShadow: 'atomic.shadow.xl' as TokenReference,
    },
  },
  tokenBindings: {
    position: 'sticky',
    bottom: 'atomic.spacing.0',
    zIndex: '100',
    padding: 'atomic.spacing.4',
    gap: 'atomic.spacing.4',
    background: 'semantic.background.surface',
    shadowDefault: 'atomic.shadow.lg',
    borderTop: 'semantic.border.default',
    safeAreaBottom: 'atomic.spacing.0', // Override with env(safe-area-inset-bottom) on mobile
  },
};

// ============================================================================
// Collapsible Sidebar Pattern Token
// ============================================================================

/**
 * Sidebar with expand/collapse toggle capability
 *
 * Provides a collapsible navigation sidebar with smooth CSS transitions.
 * Supports both icon-only collapsed state and full-width expanded state.
 *
 * Features:
 * - Expanded width: 256px (atomic.spacing.64)
 * - Collapsed width: 64px (atomic.spacing.16)
 * - Smooth 200ms transition animation
 * - Icon-only mode when collapsed
 * - Full content when expanded
 *
 * Responsive behavior:
 * - default/sm: Hidden by default (overlay mode recommended)
 * - md: Collapsed by default
 * - lg+: Expanded by default
 *
 * @example
 * ```tsx
 * // React usage with state management
 * const [isCollapsed, setIsCollapsed] = useState(false);
 *
 * <aside style={{
 *   width: isCollapsed ? '64px' : '256px',
 *   transition: 'width 200ms ease-in-out',
 *   overflow: 'hidden'
 * }}>
 *   <button onClick={() => setIsCollapsed(!isCollapsed)}>
 *     {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
 *   </button>
 *   <nav>
 *     {menuItems.map(item => (
 *       <MenuItem
 *         key={item.id}
 *         icon={item.icon}
 *         label={isCollapsed ? '' : item.label}
 *       />
 *     ))}
 *   </nav>
 * </aside>
 * ```
 */
export const SECTION_COLLAPSIBLE_SIDEBAR: AdvancedSectionPatternToken = {
  id: 'section.collapsible-sidebar',
  type: 'collapsible',
  description: 'Sidebar with expand/collapse toggle capability and smooth transitions',
  css: {
    display: 'flex',
    flexDirection: 'column',
    width: 'atomic.spacing.64' as TokenReference, // 256px expanded
    minWidth: 'atomic.spacing.16' as TokenReference, // 64px collapsed
    transition: 'width 200ms ease-in-out',
    overflow: 'hidden',
    willChange: 'width',
    padding: 'atomic.spacing.4' as TokenReference,
  } as CollapsibleSectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'column',
      width: 'atomic.spacing.0' as TokenReference, // Hidden on mobile (use overlay)
      minWidth: 'atomic.spacing.0' as TokenReference,
      transition: 'width 200ms ease-in-out, transform 200ms ease-in-out',
      overflow: 'hidden',
      padding: 'atomic.spacing.0' as TokenReference,
    } as CollapsibleSectionCSS,
    sm: {
      width: 'atomic.spacing.0' as TokenReference, // Hidden on small screens
      padding: 'atomic.spacing.0' as TokenReference,
    } as Partial<CollapsibleSectionCSS>,
    md: {
      width: 'atomic.spacing.16' as TokenReference, // 64px collapsed on tablet
      minWidth: 'atomic.spacing.16' as TokenReference,
      padding: 'atomic.spacing.2' as TokenReference,
    } as Partial<CollapsibleSectionCSS>,
    lg: {
      width: 'atomic.spacing.64' as TokenReference, // 256px expanded on desktop
      minWidth: 'atomic.spacing.16' as TokenReference,
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<CollapsibleSectionCSS>,
    xl: {
      width: 'atomic.spacing.64' as TokenReference,
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<CollapsibleSectionCSS>,
    '2xl': {
      width: 'atomic.spacing.80' as TokenReference, // 320px expanded on large screens
      padding: 'atomic.spacing.5' as TokenReference,
    } as Partial<CollapsibleSectionCSS>,
  },
  states: {
    default: {
      width: 'atomic.spacing.64' as TokenReference,
      overflow: 'hidden',
    },
    collapsed: {
      width: 'atomic.spacing.16' as TokenReference,
      minWidth: 'atomic.spacing.16' as TokenReference,
      overflow: 'hidden',
    },
  },
  tokenBindings: {
    expandedWidth: 'atomic.spacing.64', // 256px
    collapsedWidth: 'atomic.spacing.16', // 64px
    transitionDuration: '200ms',
    transitionEasing: 'ease-in-out',
    padding: 'atomic.spacing.4',
    background: 'semantic.background.surface',
    borderRight: 'semantic.border.default',
    iconSize: 'atomic.spacing.6', // 24px icons
    itemGap: 'atomic.spacing.2',
    itemPadding: 'atomic.spacing.3',
    itemBorderRadius: 'atomic.radius.md',
    itemHoverBackground: 'semantic.background.muted',
    itemActiveBackground: 'semantic.foreground.accent',
  },
};

// ============================================================================
// Scroll-Collapse Header Token
// ============================================================================

/**
 * 스크롤 시 축소되는 헤더 섹션 토큰
 * 스크롤 다운 시 컴팩트 높이로 축소되고, 스크롤 업 시 원래 크기로 복원
 *
 * @example
 * ```typescript
 * const token = getAdvancedSectionPatternToken('section.scroll-collapse-header');
 * // tokenBindings의 collapseThreshold로 Intersection Observer 설정
 * ```
 */
export const SECTION_SCROLL_COLLAPSE_HEADER: AdvancedSectionPatternToken = {
  id: 'section.scroll-collapse-header',
  type: 'scroll',
  description: 'Header that collapses to compact height on scroll down with smooth transition',
  css: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 'atomic.spacing.0' as TokenReference,
    zIndex: 100,
    height: 'atomic.spacing.20' as TokenReference,
    minHeight: 'atomic.spacing.14' as TokenReference,
    transition: 'height 200ms ease-in-out',
    overflow: 'hidden',
    padding: 'atomic.spacing.4' as TokenReference,
    backgroundColor: 'semantic.background.surface' as TokenReference,
    boxShadow: 'atomic.shadow.none' as TokenReference,
  } as ScrollSectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'atomic.spacing.16' as TokenReference,
      minHeight: 'atomic.spacing.12' as TokenReference,
      padding: 'atomic.spacing.3' as TokenReference,
    } as ScrollSectionCSS,
    sm: {
      height: 'atomic.spacing.16' as TokenReference,
      minHeight: 'atomic.spacing.12' as TokenReference,
      padding: 'atomic.spacing.3' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    md: {
      height: 'atomic.spacing.20' as TokenReference,
      minHeight: 'atomic.spacing.14' as TokenReference,
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    lg: {
      height: 'atomic.spacing.20' as TokenReference,
      minHeight: 'atomic.spacing.14' as TokenReference,
      padding: 'atomic.spacing.4' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    xl: {
      height: 'atomic.spacing.24' as TokenReference,
      minHeight: 'atomic.spacing.16' as TokenReference,
      padding: 'atomic.spacing.5' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    '2xl': {
      height: 'atomic.spacing.24' as TokenReference,
      minHeight: 'atomic.spacing.16' as TokenReference,
      padding: 'atomic.spacing.6' as TokenReference,
    } as Partial<ScrollSectionCSS>,
  },
  states: {
    default: {
      height: 'atomic.spacing.20' as TokenReference,
      boxShadow: 'atomic.shadow.none' as TokenReference,
    },
    collapsed: {
      height: 'atomic.spacing.14' as TokenReference,
      minHeight: 'atomic.spacing.14' as TokenReference,
      boxShadow: 'atomic.shadow.md' as TokenReference,
    },
  },
  tokenBindings: {
    expandedHeight: 'atomic.spacing.20',
    collapsedHeight: 'atomic.spacing.14',
    collapseThreshold: '100',
    transitionDuration: '200ms',
    background: 'semantic.background.surface',
    borderBottom: 'semantic.border.default',
    shadowExpanded: 'atomic.shadow.none',
    shadowCollapsed: 'atomic.shadow.md',
  },
};

// ============================================================================
// Scroll-Reveal Footer Token
// ============================================================================

/**
 * 스크롤 시 노출되는 푸터 섹션 토큰
 * 뷰포트 아래에 숨어있다가 스크롤 업 시 노출
 *
 * @example
 * ```typescript
 * const token = getAdvancedSectionPatternToken('section.scroll-reveal-footer');
 * // tokenBindings의 revealThreshold로 스크롤 방향 감지 설정
 * ```
 */
export const SECTION_SCROLL_REVEAL_FOOTER: AdvancedSectionPatternToken = {
  id: 'section.scroll-reveal-footer',
  type: 'scroll',
  description: 'Footer that reveals when scrolling up with transform animation',
  css: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'atomic.spacing.4' as TokenReference,
    position: 'fixed',
    bottom: 'atomic.spacing.0' as TokenReference,
    zIndex: 100,
    height: 'atomic.spacing.14' as TokenReference,
    transition: 'transform 200ms ease-in-out',
    transform: 'translateY(100%)',
    padding: 'atomic.spacing.4' as TokenReference,
    backgroundColor: 'semantic.background.surface' as TokenReference,
    boxShadow: 'atomic.shadow.lg' as TokenReference,
  } as ScrollSectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'atomic.spacing.12' as TokenReference,
      padding: 'atomic.spacing.3' as TokenReference,
      gap: 'atomic.spacing.2' as TokenReference,
    } as ScrollSectionCSS,
    sm: {
      height: 'atomic.spacing.12' as TokenReference,
      padding: 'atomic.spacing.3' as TokenReference,
      gap: 'atomic.spacing.2' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    md: {
      height: 'atomic.spacing.14' as TokenReference,
      padding: 'atomic.spacing.4' as TokenReference,
      gap: 'atomic.spacing.4' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    lg: {
      height: 'atomic.spacing.14' as TokenReference,
      padding: 'atomic.spacing.4' as TokenReference,
      gap: 'atomic.spacing.4' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    xl: {
      height: 'atomic.spacing.16' as TokenReference,
      padding: 'atomic.spacing.5' as TokenReference,
      gap: 'atomic.spacing.5' as TokenReference,
    } as Partial<ScrollSectionCSS>,
    '2xl': {
      height: 'atomic.spacing.16' as TokenReference,
      padding: 'atomic.spacing.6' as TokenReference,
      gap: 'atomic.spacing.6' as TokenReference,
    } as Partial<ScrollSectionCSS>,
  },
  states: {
    default: { transform: 'translateY(100%)', boxShadow: 'atomic.shadow.none' as TokenReference },
    revealed: { transform: 'translateY(0)', boxShadow: 'atomic.shadow.lg' as TokenReference },
  },
  tokenBindings: {
    height: 'atomic.spacing.14',
    revealThreshold: '50',
    revealDirection: 'up',
    transitionDuration: '200ms',
    background: 'semantic.background.surface',
    borderTop: 'semantic.border.default',
    shadow: 'atomic.shadow.lg',
  },
};

// ============================================================================
// Multi-Pane Master-Detail Token
// ============================================================================

/**
 * 마스터-디테일 (2패널) 섹션 토큰
 * 생산성 앱을 위한 좌우 분할 마스터-디테일 레이아웃
 *
 * @example
 * ```typescript
 * const token = getAdvancedSectionPatternToken('section.multipane-master-detail');
 * // 모바일: 스택형, 태블릿+: 좌우 분할 + 드래그 가능한 디바이더
 * ```
 */
export const SECTION_MULTIPANE_MASTER_DETAIL: AdvancedSectionPatternToken = {
  id: 'section.multipane-master-detail',
  type: 'multipane',
  description: '2-pane master-detail layout for productivity apps with optional draggable divider',
  css: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '100%',
    overflow: 'hidden',
  } as MultiPaneSectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'column',
    },
    sm: {
      display: 'flex',
      flexDirection: 'column',
    },
    md: {
      display: 'grid',
      gridTemplateColumns: '320px 1px 1fr',
    },
    lg: {
      display: 'grid',
      gridTemplateColumns: '384px 1px 1fr',
    },
    xl: {
      display: 'grid',
      gridTemplateColumns: '384px 1px 1fr',
    },
    '2xl': {
      display: 'grid',
      gridTemplateColumns: '448px 1px 1fr',
    },
  },
  states: {
    default: {},
  },
  tokenBindings: {
    masterWidth: 'atomic.spacing.80',
    detailWidth: 'atomic.spacing.flex-1',
    dividerWidth: 'atomic.spacing.px',
    dividerColor: 'semantic.border.default',
    masterBackground: 'semantic.background.surface',
    detailBackground: 'semantic.background.surface',
    masterBorderRight: 'semantic.border.default',
    splitBreakpoint: 'md',
    masterScrollable: 'true',
    detailScrollable: 'true',
  },
};

// ============================================================================
// Multi-Pane Three-Pane Token
// ============================================================================

/**
 * 3패널 섹션 토큰
 * 네비게이션, 리스트, 콘텐츠 영역의 복합 애플리케이션 레이아웃
 *
 * @example
 * ```typescript
 * const token = getAdvancedSectionPatternToken('section.multipane-three-pane');
 * // 모바일: 스택형, 태블릿: 2패널, 데스크탑: 전체 3패널
 * ```
 */
export const SECTION_MULTIPANE_THREE_PANE: AdvancedSectionPatternToken = {
  id: 'section.multipane-three-pane',
  type: 'multipane',
  description: '3-pane layout for complex applications with nav, list, and content areas',
  css: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '100%',
    overflow: 'hidden',
  } as MultiPaneSectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'column',
    },
    sm: {
      display: 'flex',
      flexDirection: 'column',
    },
    md: {
      display: 'grid',
      gridTemplateColumns: '320px 1px 1fr',
    },
    lg: {
      display: 'grid',
      gridTemplateColumns: '256px 1px 320px 1px 1fr',
    },
    xl: {
      display: 'grid',
      gridTemplateColumns: '288px 1px 320px 1px 1fr',
    },
    '2xl': {
      display: 'grid',
      gridTemplateColumns: '320px 1px 384px 1px 1fr',
    },
  },
  states: {
    default: {},
  },
  tokenBindings: {
    navWidth: 'atomic.spacing.64',
    listWidth: 'atomic.spacing.80',
    contentWidth: 'atomic.spacing.flex-1',
    dividerWidth: 'atomic.spacing.px',
    dividerColor: 'semantic.border.default',
    navBackground: 'semantic.background.muted',
    listBackground: 'semantic.background.surface',
    contentBackground: 'semantic.background.surface',
    navBorderRight: 'semantic.border.subtle',
    listBorderRight: 'semantic.border.default',
    fullBreakpoint: 'lg',
  },
};

// ============================================================================
// Foldable Split Token
// ============================================================================

/**
 * 폴더블 분할 섹션 토큰
 * 폴더블 디바이스 화면 간 콘텐츠 분할
 *
 * @example
 * ```typescript
 * const token = getAdvancedSectionPatternToken('section.foldable-split');
 * // 폴더블: 화면 분할, 일반 기기: 좌우 분할 폴백
 * ```
 */
export const SECTION_FOLDABLE_SPLIT: AdvancedSectionPatternToken = {
  id: 'section.foldable-split',
  type: 'foldable',
  description: 'Split content across foldable device screens with hinge-aware gap',
  css: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '0px',
    height: '100%',
    overflow: 'hidden',
  } as FoldableSectionCSS,
  responsive: {
    default: {
      display: 'flex',
      flexDirection: 'column',
    },
    sm: {
      display: 'flex',
      flexDirection: 'column',
    },
    md: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '0px',
    },
    lg: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '0px',
    },
    xl: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '0px',
    },
    '2xl': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '0px',
    },
  },
  states: {
    default: { gridTemplateColumns: '1fr 1fr', columnGap: '0px' },
    split: { gridTemplateColumns: '1fr env(fold-width, 0px) 1fr', columnGap: '0px' },
  },
  tokenBindings: {
    hingeDetection: 'css-env',
    distribution: 'equal',
    hingeGap: 'env(fold-width, 0px)',
    fallbackBehavior: 'side-by-side',
    leftPaneBackground: 'semantic.background.surface',
    rightPaneBackground: 'semantic.background.surface',
  },
};

// ============================================================================
// Foldable Span Token
// ============================================================================

/**
 * 폴더블 스팬 섹션 토큰
 * 시각적 연속성을 위해 폴더블 디바이스의 폴드를 가로질러 콘텐츠 확장
 *
 * @example
 * ```typescript
 * const token = getAdvancedSectionPatternToken('section.foldable-span');
 * // 콘텐츠가 폴드를 가로질러 이음새 없이 확장 + 선택적 힌지 오버레이
 * ```
 */
export const SECTION_FOLDABLE_SPAN: AdvancedSectionPatternToken = {
  id: 'section.foldable-span',
  type: 'foldable',
  description: 'Span content across foldable device fold for visual continuity with hinge overlay',
  css: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: '100%',
    overflow: 'hidden',
  } as FoldableSectionCSS,
  responsive: {
    default: {
      display: 'flex',
    },
    sm: {
      display: 'flex',
    },
    md: {
      display: 'grid',
      gridTemplateColumns: '1fr',
    },
    lg: {
      display: 'grid',
      gridTemplateColumns: '1fr',
    },
    xl: {
      display: 'grid',
      gridTemplateColumns: '1fr',
    },
    '2xl': {
      display: 'grid',
      gridTemplateColumns: '1fr',
    },
  },
  states: {
    default: {},
  },
  tokenBindings: {
    spanContent: 'true',
    spannableContent: 'image,video,map',
    hingeOverlay: 'shadow',
    hingeOverlayColor: 'semantic.background.overlay',
    hingeOverlayWidth: 'env(fold-width, 0px)',
  },
};

// ============================================================================
// Internal Token Map
// ============================================================================

/**
 * 고급 섹션 패턴 토큰의 빠른 조회를 위한 내부 맵
 * getAdvancedSectionPatternToken()에서 O(1) 접근에 사용
 */
const ADVANCED_SECTION_PATTERN_TOKENS_MAP: Record<string, AdvancedSectionPatternToken> = {
  'section.masonry': SECTION_MASONRY,
  'section.sticky-header': SECTION_STICKY_HEADER,
  'section.sticky-footer': SECTION_STICKY_FOOTER,
  'section.collapsible-sidebar': SECTION_COLLAPSIBLE_SIDEBAR,
  'section.scroll-collapse-header': SECTION_SCROLL_COLLAPSE_HEADER,
  'section.scroll-reveal-footer': SECTION_SCROLL_REVEAL_FOOTER,
  'section.multipane-master-detail': SECTION_MULTIPANE_MASTER_DETAIL,
  'section.multipane-three-pane': SECTION_MULTIPANE_THREE_PANE,
  'section.foldable-split': SECTION_FOLDABLE_SPLIT,
  'section.foldable-span': SECTION_FOLDABLE_SPAN,
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get an advanced section pattern token by its ID
 *
 * @param patternId - Advanced section pattern token ID (e.g., "section.masonry")
 * @returns AdvancedSectionPatternToken if found, undefined otherwise
 *
 * @example
 * ```typescript
 * const masonry = getAdvancedSectionPatternToken('section.masonry');
 * if (masonry) {
 *   console.log(masonry.description);
 *   // "Pinterest-style waterfall grid using CSS columns for broad browser support"
 * }
 * ```
 */
export function getAdvancedSectionPatternToken(
  patternId: string
): AdvancedSectionPatternToken | undefined {
  return ADVANCED_SECTION_PATTERN_TOKENS_MAP[patternId];
}

/**
 * Get all available advanced section pattern tokens
 *
 * @returns Array of all AdvancedSectionPatternTokens
 *
 * @example
 * ```typescript
 * const allAdvanced = getAllAdvancedSectionPatternTokens();
 * console.log(`Available advanced sections: ${allAdvanced.length}`);
 * // "Available advanced sections: 4"
 *
 * allAdvanced.forEach(token => {
 *   console.log(`${token.id}: ${token.type}`);
 * });
 * ```
 */
export function getAllAdvancedSectionPatternTokens(): AdvancedSectionPatternToken[] {
  return Object.values(ADVANCED_SECTION_PATTERN_TOKENS_MAP);
}

/**
 * Get advanced section pattern tokens filtered by type
 *
 * @param type - Section type ('masonry', 'sticky', or 'collapsible')
 * @returns Array of AdvancedSectionPatternTokens with the specified type
 *
 * @example
 * ```typescript
 * const stickyTokens = getAdvancedSectionsByType('sticky');
 * console.log(`Sticky sections: ${stickyTokens.length}`);
 * // "Sticky sections: 2" (header and footer)
 * ```
 */
export function getAdvancedSectionsByType(
  type: 'masonry' | 'sticky' | 'collapsible' | 'scroll' | 'multipane' | 'foldable'
): AdvancedSectionPatternToken[] {
  return getAllAdvancedSectionPatternTokens().filter(section => section.type === type);
}

/**
 * Get CSS properties for an advanced section pattern at a specific breakpoint
 *
 * @param patternId - Advanced section pattern token ID
 * @param breakpoint - Breakpoint key ('default', 'sm', 'md', 'lg', 'xl', '2xl')
 * @returns CSS properties for the specified breakpoint, or undefined if not found
 *
 * @example
 * ```typescript
 * const masonryMd = getAdvancedSectionCSS('section.masonry', 'md');
 * if (masonryMd) {
 *   console.log(`Columns at md: ${masonryMd.columnCount}`);
 *   // "Columns at md: 3"
 * }
 * ```
 */
export function getAdvancedSectionCSS(
  patternId: string,
  breakpoint: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'default'
):
  | (
      | MasonrySectionCSS
      | StickySectionCSS
      | CollapsibleSectionCSS
      | ScrollSectionCSS
      | MultiPaneSectionCSS
      | FoldableSectionCSS
    )
  | undefined {
  const pattern = getAdvancedSectionPatternToken(patternId);
  if (!pattern) {
    return undefined;
  }

  if (breakpoint === 'default') {
    return pattern.responsive.default;
  }

  // Merge default with breakpoint-specific overrides
  const defaultCSS = pattern.responsive.default;
  const breakpointCSS = pattern.responsive[breakpoint];

  if (!breakpointCSS) {
    return defaultCSS;
  }

  return {
    ...defaultCSS,
    ...breakpointCSS,
  };
}

/**
 * Get state-specific CSS for collapsible or sticky patterns
 *
 * @param patternId - Advanced section pattern token ID
 * @param state - State name ('default', 'collapsed', 'stuck')
 * @returns CSS properties for the specified state, or undefined if not found
 *
 * @example
 * ```typescript
 * const collapsedCSS = getAdvancedSectionStateCSS('section.collapsible-sidebar', 'collapsed');
 * if (collapsedCSS) {
 *   console.log(`Collapsed width: ${collapsedCSS.width}`);
 *   // "Collapsed width: atomic.spacing.16"
 * }
 *
 * const stuckCSS = getAdvancedSectionStateCSS('section.sticky-header', 'stuck');
 * if (stuckCSS) {
 *   console.log(`Shadow when stuck: ${stuckCSS.boxShadow}`);
 *   // "Shadow when stuck: atomic.shadow.md"
 * }
 * ```
 */
export function getAdvancedSectionStateCSS(
  patternId: string,
  state: 'default' | 'collapsed' | 'stuck' | 'revealed' | 'expanded' | 'split'
):
  | Partial<
      | MasonrySectionCSS
      | StickySectionCSS
      | CollapsibleSectionCSS
      | ScrollSectionCSS
      | MultiPaneSectionCSS
      | FoldableSectionCSS
    >
  | undefined {
  const pattern = getAdvancedSectionPatternToken(patternId);
  if (!pattern?.states) {
    return undefined;
  }

  return pattern.states[state];
}

/**
 * Check if a pattern ID is an advanced section pattern
 *
 * @param patternId - Pattern ID to check
 * @returns true if the pattern is an advanced section pattern
 *
 * @example
 * ```typescript
 * isAdvancedSectionPattern('section.masonry'); // true
 * isAdvancedSectionPattern('section.grid-3'); // false
 * ```
 */
export function isAdvancedSectionPattern(patternId: string): boolean {
  return patternId in ADVANCED_SECTION_PATTERN_TOKENS_MAP;
}

/**
 * Get all advanced section pattern IDs
 *
 * @returns Array of all advanced section pattern IDs
 *
 * @example
 * ```typescript
 * const ids = getAdvancedSectionPatternIds();
 * // ['section.masonry', 'section.sticky-header', 'section.sticky-footer', 'section.collapsible-sidebar']
 * ```
 */
export function getAdvancedSectionPatternIds(): string[] {
  return Object.keys(ADVANCED_SECTION_PATTERN_TOKENS_MAP);
}

/**
 * Combine base section patterns with advanced section patterns
 * Useful for getting a complete list of all available section patterns
 *
 * @param baseSections - Array of base SectionPatternTokens from sections.ts
 * @returns Combined array of all section pattern tokens
 *
 * @example
 * ```typescript
 * import { getAllSectionPatternTokens } from './sections.js';
 *
 * const allSections = combineWithBaseSections(getAllSectionPatternTokens());
 * console.log(`Total sections: ${allSections.length}`);
 * ```
 */
export function combineWithBaseSections(
  baseSections: SectionPatternToken[]
): (SectionPatternToken | AdvancedSectionPatternToken)[] {
  return [...baseSections, ...getAllAdvancedSectionPatternTokens()];
}
