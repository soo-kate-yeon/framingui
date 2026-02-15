/**
 * @tekton-ui/core - Layout CSS Generator
 * Generates CSS from layout tokens (shells, pages, sections)
 * [SPEC-LAYOUT-001] [PHASE-8]
 */

import type {
  ShellToken,
  PageLayoutToken,
  SectionPatternToken,
  SectionCSS,
  ContainerQueryConfig,
  OrientationConfig,
  FullResponsiveConfig,
  ResponsiveConfig,
  AdvancedSectionPatternToken,
  MasonrySectionCSS,
  StickySectionCSS,
  CollapsibleSectionCSS,
} from './layout-tokens/types.js';
import { resolveTokenReference } from './layout-resolver.js';
import { getAllShellTokens } from './layout-tokens/shells.js';
import { getAllPageLayoutTokens } from './layout-tokens/pages.js';
import { getAllSectionPatternTokens } from './layout-tokens/sections.js';
import { getAllAdvancedSectionPatternTokens } from './layout-tokens/sections-advanced.js';
import { BREAKPOINT_VALUES } from './layout-tokens/responsive.js';

// ============================================================================
// Types
// ============================================================================

/**
 * Layout token union type - can be shell, page, section, or advanced section
 */
export type LayoutToken =
  | ShellToken
  | PageLayoutToken
  | SectionPatternToken
  | AdvancedSectionPatternToken;

/**
 * CSS generation options
 */
export interface CSSGenerationOptions {
  /** Include CSS custom properties in :root */
  includeVariables?: boolean;
  /** Include utility classes (.shell-*, .page-*, .section-*) */
  includeClasses?: boolean;
  /** Include responsive media queries */
  includeMediaQueries?: boolean;
  /** Indentation string for formatting */
  indent?: string;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Extract CSS variable references from token references in an object
 *
 * @param obj - Object to extract token references from
 * @returns Set of unique CSS variable names
 */
function extractCSSVariables(obj: unknown): Set<string> {
  const vars = new Set<string>();

  function traverse(value: unknown): void {
    if (typeof value === 'string' && /^[a-z]+\.[a-z-]+(\.[a-z0-9-]+)*$/.test(value)) {
      // This is a token reference - convert to CSS variable
      vars.add(resolveTokenReference(value));
    } else if (typeof value === 'object' && value !== null) {
      for (const prop of Object.values(value)) {
        traverse(prop);
      }
    }
  }

  traverse(obj);
  return vars;
}

/**
 * Convert token reference to CSS var() function call
 *
 * @param ref - Token reference (e.g., "atomic.spacing.16")
 * @returns CSS var() function (e.g., "var(--atomic-spacing-16)")
 */
function tokenRefToVar(ref: string): string {
  return `var(${resolveTokenReference(ref)})`;
}

/**
 * Validate CSS syntax (balanced braces)
 *
 * @param css - CSS string to validate
 * @returns true if valid, false otherwise
 */
export function validateCSS(css: string): boolean {
  const openBraces = (css.match(/{/g) || []).length;
  const closeBraces = (css.match(/}/g) || []).length;
  return openBraces === closeBraces;
}

/**
 * Format CSS with proper indentation
 *
 * @param css - CSS string to format
 * @param indent - Indentation string (default: 2 spaces)
 * @returns Formatted CSS
 */
export function formatCSS(css: string, indent = '  '): string {
  let formatted = '';
  let indentLevel = 0;
  let inMediaQuery = false;

  // Split by lines and process each
  const lines = css
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  for (const line of lines) {
    // Decrease indent for closing braces
    if (line === '}') {
      indentLevel--;
      if (inMediaQuery && indentLevel === 0) {
        inMediaQuery = false;
      }
    }

    // Add indented line
    formatted += indent.repeat(indentLevel) + line + '\n';

    // Increase indent for opening braces
    if (line.endsWith('{')) {
      indentLevel++;
      if (line.startsWith('@media')) {
        inMediaQuery = true;
      }
    }
  }

  return formatted;
}

// ============================================================================
// CSS Generation Functions
// ============================================================================

/**
 * Generate CSS custom properties in :root from layout tokens
 *
 * @param tokens - Array of layout tokens
 * @returns CSS :root block with custom properties
 */
export function generateCSSVariables(tokens: LayoutToken[]): string {
  const vars = new Set<string>();

  // Extract all CSS variables from all tokens
  for (const token of tokens) {
    const tokenVars = extractCSSVariables(token);
    tokenVars.forEach(v => vars.add(v));
  }

  if (vars.size === 0) {
    return '';
  }

  // Generate :root block
  let css = ':root {\n';

  // Sort variables for consistent output
  const sortedVars = Array.from(vars).sort();

  for (const cssVar of sortedVars) {
    // Extract original token reference from CSS variable name
    // --atomic-spacing-16 → atomic.spacing.16
    const tokenRef = cssVar.replace(/^--/, '').replace(/-/g, '.');
    css += `  ${cssVar}: ${tokenRef};\n`;
  }

  css += '}\n';

  return css;
}

/**
 * Generate utility classes for shell tokens
 *
 * @param shells - Array of shell tokens
 * @returns CSS classes for shells
 */
export function generateShellClasses(shells: ShellToken[]): string {
  let css = '';

  for (const shell of shells) {
    // Generate class name: .shell-{platform}-{name}
    // shell.web.dashboard → .shell-web-dashboard
    const className = shell.id.replace(/\./g, '-');

    css += `.${className} {\n`;
    css += `  display: grid;\n`;

    // Generate grid template areas based on regions
    const areas: string[] = [];
    const positions = new Map<string, string[]>();

    // Group regions by position
    for (const region of shell.regions) {
      const pos = region.position;
      if (!positions.has(pos)) {
        positions.set(pos, []);
      }
      positions.get(pos)!.push(region.name);
    }

    // Build grid template areas
    // Example: "header header" "sidebar main"
    if (positions.has('top')) {
      const topRegions = positions.get('top')!;
      areas.push(`"${topRegions.join(' ')}"`);
    }

    // Middle row with left, center, right
    const middleRow: string[] = [];
    if (positions.has('left')) {
      middleRow.push(...positions.get('left')!);
    }
    if (positions.has('center')) {
      middleRow.push(...positions.get('center')!);
    }
    if (positions.has('right')) {
      middleRow.push(...positions.get('right')!);
    }
    if (middleRow.length > 0) {
      areas.push(`"${middleRow.join(' ')}"`);
    }

    if (positions.has('bottom')) {
      const bottomRegions = positions.get('bottom')!;
      areas.push(`"${bottomRegions.join(' ')}"`);
    }

    if (areas.length > 0) {
      css += `  grid-template-areas:\n`;
      for (const area of areas) {
        css += `    ${area}\n`;
      }
    }

    css += `}\n\n`;
  }

  return css;
}

/**
 * Generate utility classes for page tokens
 *
 * @param pages - Array of page layout tokens
 * @returns CSS classes for pages
 */
export function generatePageClasses(pages: PageLayoutToken[]): string {
  let css = '';

  for (const page of pages) {
    // Generate class name: .page-{name}
    // page.dashboard → .page-dashboard
    const className = page.id.replace(/\./g, '-');

    css += `.${className} {\n`;
    css += `  display: flex;\n`;
    css += `  flex-direction: column;\n`;

    // Add gap if specified in tokenBindings
    if (page.tokenBindings.sectionSpacing) {
      const gapVar = tokenRefToVar(page.tokenBindings.sectionSpacing as string);
      css += `  gap: ${gapVar};\n`;
    }

    css += `}\n\n`;
  }

  return css;
}

/**
 * Generate utility classes for section pattern tokens
 *
 * @param sections - Array of section pattern tokens
 * @returns CSS classes for sections
 */
export function generateSectionClasses(sections: SectionPatternToken[]): string {
  let css = '';

  for (const section of sections) {
    // Generate class name: .section-{pattern}
    // section.grid-3 → .section-grid-3
    const className = section.id.replace(/\./g, '-');

    css += `.${className} {\n`;

    // Add CSS properties from section.css
    const sectionCSS = section.css;

    if (sectionCSS.display) {
      css += `  display: ${sectionCSS.display};\n`;
    }

    if (sectionCSS.gridTemplateColumns) {
      css += `  grid-template-columns: ${sectionCSS.gridTemplateColumns};\n`;
    }

    if (sectionCSS.gridTemplateRows) {
      css += `  grid-template-rows: ${sectionCSS.gridTemplateRows};\n`;
    }

    if (sectionCSS.gap) {
      const gapValue = tokenRefToVar(sectionCSS.gap);
      css += `  gap: ${gapValue};\n`;
    }

    if (sectionCSS.flexDirection) {
      css += `  flex-direction: ${sectionCSS.flexDirection};\n`;
    }

    if (sectionCSS.alignItems) {
      css += `  align-items: ${sectionCSS.alignItems};\n`;
    }

    if (sectionCSS.justifyContent) {
      css += `  justify-content: ${sectionCSS.justifyContent};\n`;
    }

    if (sectionCSS.maxWidth) {
      const maxWidthValue = tokenRefToVar(sectionCSS.maxWidth);
      css += `  max-width: ${maxWidthValue};\n`;
    }

    if (sectionCSS.padding) {
      const paddingValue = tokenRefToVar(sectionCSS.padding);
      css += `  padding: ${paddingValue};\n`;
    }

    css += `}\n\n`;
  }

  return css;
}

/**
 * Check if a token is an advanced section pattern
 *
 * @param token - Token to check
 * @returns true if the token is an advanced section pattern (masonry, sticky, collapsible)
 */
function isAdvancedSectionToken(token: LayoutToken): token is AdvancedSectionPatternToken {
  if (!('type' in token)) {
    return false;
  }
  const advancedTypes = ['masonry', 'sticky', 'collapsible'];
  return advancedTypes.includes((token as SectionPatternToken | AdvancedSectionPatternToken).type);
}

/**
 * Generate utility classes for advanced section pattern tokens
 * Handles masonry, sticky, and collapsible patterns
 *
 * @param sections - Array of advanced section pattern tokens
 * @returns CSS classes for advanced sections
 */
export function generateAdvancedSectionClasses(sections: AdvancedSectionPatternToken[]): string {
  let css = '';

  for (const section of sections) {
    // Generate class name: .section-{pattern}
    // section.masonry → .section-masonry
    const className = section.id.replace(/\./g, '-');

    css += `.${className} {\n`;

    const sectionCSS = section.css;

    // Handle based on section type
    if (section.type === 'masonry') {
      const masonryCSS = sectionCSS as MasonrySectionCSS;

      // Masonry-specific properties
      if (masonryCSS.columnCount) {
        css += `  column-count: ${masonryCSS.columnCount};\n`;
      }

      if (masonryCSS.columnGap) {
        const columnGapValue = tokenRefToVar(masonryCSS.columnGap);
        css += `  column-gap: ${columnGapValue};\n`;
      }

      if (masonryCSS.breakInside) {
        css += `  break-inside: ${masonryCSS.breakInside};\n`;
      }

      if (masonryCSS.columnFill) {
        css += `  column-fill: ${masonryCSS.columnFill};\n`;
      }
    } else if (section.type === 'sticky') {
      const stickyCSS = sectionCSS as StickySectionCSS;

      // Common flex properties first
      if (stickyCSS.display) {
        css += `  display: ${stickyCSS.display};\n`;
      }

      if (stickyCSS.flexDirection) {
        css += `  flex-direction: ${stickyCSS.flexDirection};\n`;
      }

      if (stickyCSS.alignItems) {
        css += `  align-items: ${stickyCSS.alignItems};\n`;
      }

      if (stickyCSS.justifyContent) {
        css += `  justify-content: ${stickyCSS.justifyContent};\n`;
      }

      if (stickyCSS.gap) {
        const gapValue = tokenRefToVar(stickyCSS.gap);
        css += `  gap: ${gapValue};\n`;
      }

      // Sticky-specific properties
      if (stickyCSS.position) {
        css += `  position: ${stickyCSS.position};\n`;
      }

      if (stickyCSS.top) {
        const topValue = tokenRefToVar(stickyCSS.top);
        css += `  top: ${topValue};\n`;
      }

      if (stickyCSS.bottom) {
        const bottomValue = tokenRefToVar(stickyCSS.bottom);
        css += `  bottom: ${bottomValue};\n`;
      }

      if (stickyCSS.zIndex !== undefined) {
        css += `  z-index: ${stickyCSS.zIndex};\n`;
      }

      if (stickyCSS.padding) {
        const paddingValue = tokenRefToVar(stickyCSS.padding);
        css += `  padding: ${paddingValue};\n`;
      }

      if (stickyCSS.backgroundColor) {
        const bgValue = tokenRefToVar(stickyCSS.backgroundColor);
        css += `  background-color: ${bgValue};\n`;
      }

      if (stickyCSS.boxShadow) {
        const shadowValue = tokenRefToVar(stickyCSS.boxShadow);
        css += `  box-shadow: ${shadowValue};\n`;
      }
    } else if (section.type === 'collapsible') {
      const collapsibleCSS = sectionCSS as CollapsibleSectionCSS;

      // Common flex properties first
      if (collapsibleCSS.display) {
        css += `  display: ${collapsibleCSS.display};\n`;
      }

      if (collapsibleCSS.flexDirection) {
        css += `  flex-direction: ${collapsibleCSS.flexDirection};\n`;
      }

      // Collapsible-specific properties
      if (collapsibleCSS.width) {
        const widthValue = tokenRefToVar(collapsibleCSS.width);
        css += `  width: ${widthValue};\n`;
      }

      if (collapsibleCSS.minWidth) {
        const minWidthValue = tokenRefToVar(collapsibleCSS.minWidth);
        css += `  min-width: ${minWidthValue};\n`;
      }

      if (collapsibleCSS.transition) {
        css += `  transition: ${collapsibleCSS.transition};\n`;
      }

      if (collapsibleCSS.overflow) {
        css += `  overflow: ${collapsibleCSS.overflow};\n`;
      }

      if (collapsibleCSS.willChange) {
        css += `  will-change: ${collapsibleCSS.willChange};\n`;
      }

      if (collapsibleCSS.padding) {
        const paddingValue = tokenRefToVar(collapsibleCSS.padding);
        css += `  padding: ${paddingValue};\n`;
      }

      if (collapsibleCSS.gap) {
        const gapValue = tokenRefToVar(collapsibleCSS.gap);
        css += `  gap: ${gapValue};\n`;
      }
    }

    css += `}\n\n`;
  }

  return css;
}

/**
 * Generate state classes for interactive advanced section patterns
 * Handles stuck states for sticky patterns and collapsed states for collapsible patterns
 *
 * @param sections - Array of advanced section pattern tokens
 * @returns CSS state classes for advanced sections
 */
export function generateAdvancedSectionStateClasses(
  sections: AdvancedSectionPatternToken[]
): string {
  let css = '';

  for (const section of sections) {
    if (!section.states) {
      continue;
    }

    const className = section.id.replace(/\./g, '-');

    // Generate stuck state for sticky patterns
    if (section.states.stuck) {
      css += `.${className}.is-stuck {\n`;

      const stuckCSS = section.states.stuck as Partial<StickySectionCSS>;

      if (stuckCSS.boxShadow) {
        const shadowValue = tokenRefToVar(stuckCSS.boxShadow);
        css += `  box-shadow: ${shadowValue};\n`;
      }

      if (stuckCSS.backgroundColor) {
        const bgValue = tokenRefToVar(stuckCSS.backgroundColor);
        css += `  background-color: ${bgValue};\n`;
      }

      if (stuckCSS.zIndex !== undefined) {
        css += `  z-index: ${stuckCSS.zIndex};\n`;
      }

      css += `}\n\n`;
    }

    // Generate collapsed state for collapsible patterns
    if (section.states.collapsed) {
      css += `.${className}.is-collapsed {\n`;

      const collapsedCSS = section.states.collapsed as Partial<CollapsibleSectionCSS>;

      if (collapsedCSS.width) {
        const widthValue = tokenRefToVar(collapsedCSS.width);
        css += `  width: ${widthValue};\n`;
      }

      if (collapsedCSS.minWidth) {
        const minWidthValue = tokenRefToVar(collapsedCSS.minWidth);
        css += `  min-width: ${minWidthValue};\n`;
      }

      if (collapsedCSS.overflow) {
        css += `  overflow: ${collapsedCSS.overflow};\n`;
      }

      if (collapsedCSS.padding) {
        const paddingValue = tokenRefToVar(collapsedCSS.padding);
        css += `  padding: ${paddingValue};\n`;
      }

      css += `}\n\n`;
    }
  }

  return css;
}

/**
 * Advanced section type union
 */
type AdvancedSectionType = 'masonry' | 'sticky' | 'collapsible';

/**
 * Generate media query CSS for advanced section patterns
 * Internal helper function for generateMediaQueries
 *
 * @param className - CSS class name for the section
 * @param type - Section type ('masonry', 'sticky', 'collapsible')
 * @param responsiveConfig - Responsive configuration for this breakpoint
 * @returns CSS string for the media query content
 */
function generateAdvancedSectionMediaQueryCSS(
  className: string,
  type: AdvancedSectionType,
  responsiveConfig: unknown
): string {
  let css = '';

  if (!responsiveConfig || Object.keys(responsiveConfig as object).length === 0) {
    return css;
  }

  css += `  .${className} {\n`;

  if (type === 'masonry') {
    const masonryConfig = responsiveConfig as Partial<MasonrySectionCSS>;

    if (masonryConfig.columnCount) {
      css += `    column-count: ${masonryConfig.columnCount};\n`;
    }

    if (masonryConfig.columnGap) {
      const columnGapValue = tokenRefToVar(masonryConfig.columnGap);
      css += `    column-gap: ${columnGapValue};\n`;
    }

    if (masonryConfig.breakInside) {
      css += `    break-inside: ${masonryConfig.breakInside};\n`;
    }

    if (masonryConfig.columnFill) {
      css += `    column-fill: ${masonryConfig.columnFill};\n`;
    }

    // Common section properties
    if (masonryConfig.display) {
      css += `    display: ${masonryConfig.display};\n`;
    }

    if (masonryConfig.gap) {
      const gapValue = tokenRefToVar(masonryConfig.gap);
      css += `    gap: ${gapValue};\n`;
    }
  } else if (type === 'sticky') {
    const stickyConfig = responsiveConfig as Partial<StickySectionCSS>;

    if (stickyConfig.display) {
      css += `    display: ${stickyConfig.display};\n`;
    }

    if (stickyConfig.flexDirection) {
      css += `    flex-direction: ${stickyConfig.flexDirection};\n`;
    }

    if (stickyConfig.alignItems) {
      css += `    align-items: ${stickyConfig.alignItems};\n`;
    }

    if (stickyConfig.justifyContent) {
      css += `    justify-content: ${stickyConfig.justifyContent};\n`;
    }

    if (stickyConfig.gap) {
      const gapValue = tokenRefToVar(stickyConfig.gap);
      css += `    gap: ${gapValue};\n`;
    }

    if (stickyConfig.position) {
      css += `    position: ${stickyConfig.position};\n`;
    }

    if (stickyConfig.top) {
      const topValue = tokenRefToVar(stickyConfig.top);
      css += `    top: ${topValue};\n`;
    }

    if (stickyConfig.bottom) {
      const bottomValue = tokenRefToVar(stickyConfig.bottom);
      css += `    bottom: ${bottomValue};\n`;
    }

    if (stickyConfig.zIndex !== undefined) {
      css += `    z-index: ${stickyConfig.zIndex};\n`;
    }

    if (stickyConfig.padding) {
      const paddingValue = tokenRefToVar(stickyConfig.padding);
      css += `    padding: ${paddingValue};\n`;
    }

    if (stickyConfig.backgroundColor) {
      const bgValue = tokenRefToVar(stickyConfig.backgroundColor);
      css += `    background-color: ${bgValue};\n`;
    }

    if (stickyConfig.boxShadow) {
      const shadowValue = tokenRefToVar(stickyConfig.boxShadow);
      css += `    box-shadow: ${shadowValue};\n`;
    }
  } else if (type === 'collapsible') {
    const collapsibleConfig = responsiveConfig as Partial<CollapsibleSectionCSS>;

    if (collapsibleConfig.display) {
      css += `    display: ${collapsibleConfig.display};\n`;
    }

    if (collapsibleConfig.flexDirection) {
      css += `    flex-direction: ${collapsibleConfig.flexDirection};\n`;
    }

    if (collapsibleConfig.width) {
      const widthValue = tokenRefToVar(collapsibleConfig.width);
      css += `    width: ${widthValue};\n`;
    }

    if (collapsibleConfig.minWidth) {
      const minWidthValue = tokenRefToVar(collapsibleConfig.minWidth);
      css += `    min-width: ${minWidthValue};\n`;
    }

    if (collapsibleConfig.transition) {
      css += `    transition: ${collapsibleConfig.transition};\n`;
    }

    if (collapsibleConfig.overflow) {
      css += `    overflow: ${collapsibleConfig.overflow};\n`;
    }

    if (collapsibleConfig.willChange) {
      css += `    will-change: ${collapsibleConfig.willChange};\n`;
    }

    if (collapsibleConfig.padding) {
      const paddingValue = tokenRefToVar(collapsibleConfig.padding);
      css += `    padding: ${paddingValue};\n`;
    }

    if (collapsibleConfig.gap) {
      const gapValue = tokenRefToVar(collapsibleConfig.gap);
      css += `    gap: ${gapValue};\n`;
    }
  }

  css += `  }\n\n`;

  return css;
}

/**
 * Generate responsive media queries for all breakpoints
 *
 * @param tokens - Array of layout tokens
 * @returns CSS media queries
 */
export function generateMediaQueries(tokens: LayoutToken[]): string {
  let css = '';

  // Breakpoint names in order
  const breakpoints: Array<'sm' | 'md' | 'lg' | 'xl' | '2xl'> = ['sm', 'md', 'lg', 'xl', '2xl'];

  for (const bp of breakpoints) {
    const minWidth = BREAKPOINT_VALUES[bp];
    let mediaQueryContent = '';

    // Process each token
    for (const token of tokens) {
      // Get responsive config for this breakpoint
      const responsiveConfig = token.responsive[bp];
      if (!responsiveConfig || Object.keys(responsiveConfig).length === 0) {
        continue;
      }

      // Generate class name based on token type
      let className = '';
      if ('platform' in token) {
        // ShellToken
        className = token.id.replace(/\./g, '-');
      } else if ('purpose' in token) {
        // PageLayoutToken
        className = token.id.replace(/\./g, '-');
      } else if ('type' in token) {
        // SectionPatternToken or AdvancedSectionPatternToken
        const sectionToken = token as SectionPatternToken | AdvancedSectionPatternToken;
        className = sectionToken.id.replace(/\./g, '-');

        // Check if this is an advanced section pattern
        if (isAdvancedSectionToken(token)) {
          const advancedToken = token as AdvancedSectionPatternToken;
          mediaQueryContent += generateAdvancedSectionMediaQueryCSS(
            className,
            advancedToken.type as AdvancedSectionType,
            responsiveConfig
          );
        } else {
          // Generate standard section CSS for this breakpoint
          const responsiveCss = responsiveConfig as Partial<SectionCSS>;

          if (Object.keys(responsiveCss).length > 0) {
            mediaQueryContent += `  .${className} {\n`;

            if (responsiveCss.display) {
              mediaQueryContent += `    display: ${responsiveCss.display};\n`;
            }

            if (responsiveCss.gridTemplateColumns) {
              mediaQueryContent += `    grid-template-columns: ${responsiveCss.gridTemplateColumns};\n`;
            }

            if (responsiveCss.gridTemplateRows) {
              mediaQueryContent += `    grid-template-rows: ${responsiveCss.gridTemplateRows};\n`;
            }

            if (responsiveCss.gap) {
              const gapValue = tokenRefToVar(responsiveCss.gap);
              mediaQueryContent += `    gap: ${gapValue};\n`;
            }

            if (responsiveCss.flexDirection) {
              mediaQueryContent += `    flex-direction: ${responsiveCss.flexDirection};\n`;
            }

            if (responsiveCss.alignItems) {
              mediaQueryContent += `    align-items: ${responsiveCss.alignItems};\n`;
            }

            if (responsiveCss.justifyContent) {
              mediaQueryContent += `    justify-content: ${responsiveCss.justifyContent};\n`;
            }

            if (responsiveCss.maxWidth) {
              const maxWidthValue = tokenRefToVar(responsiveCss.maxWidth);
              mediaQueryContent += `    max-width: ${maxWidthValue};\n`;
            }

            if (responsiveCss.padding) {
              const paddingValue = tokenRefToVar(responsiveCss.padding);
              mediaQueryContent += `    padding: ${paddingValue};\n`;
            }

            mediaQueryContent += `  }\n\n`;
          }
        }
      }
    }

    // Only add media query if there's content
    if (mediaQueryContent.trim().length > 0) {
      css += `@media (min-width: ${minWidth}px) {\n`;
      css += mediaQueryContent;
      css += `}\n\n`;
    }
  }

  return css;
}

/**
 * Generate complete CSS from layout tokens
 *
 * @param tokens - Array of layout tokens (shells, pages, sections)
 * @param options - CSS generation options
 * @returns Complete CSS string with variables, utilities, and media queries
 *
 * @example
 * ```typescript
 * import { getAllShellTokens, getAllPageLayoutTokens, getAllSectionPatternTokens } from './layout-tokens/index.js';
 *
 * const shells = getAllShellTokens();
 * const pages = getAllPageLayoutTokens();
 * const sections = getAllSectionPatternTokens();
 *
 * const css = generateLayoutCSS([...shells, ...pages, ...sections]);
 * console.log(css);
 * ```
 */
export function generateLayoutCSS(
  tokens: LayoutToken[],
  options: CSSGenerationOptions = {}
): string {
  const {
    includeVariables = true,
    includeClasses = true,
    includeMediaQueries = true,
    indent = '  ',
  } = options;

  let css = '';

  // Separate tokens by type
  const shells = tokens.filter(t => 'platform' in t) as ShellToken[];
  const pages = tokens.filter(t => 'purpose' in t) as PageLayoutToken[];

  // Separate standard sections from advanced sections
  const allSections = tokens.filter(t => 'type' in t) as (
    | SectionPatternToken
    | AdvancedSectionPatternToken
  )[];
  const advancedTypes = ['masonry', 'sticky', 'collapsible'];
  const standardSections = allSections.filter(
    t => !advancedTypes.includes(t.type)
  ) as SectionPatternToken[];
  const advancedSections = allSections.filter(t =>
    advancedTypes.includes(t.type)
  ) as AdvancedSectionPatternToken[];

  // 1. Generate CSS variables
  if (includeVariables) {
    const variablesCSS = generateCSSVariables(tokens);
    if (variablesCSS) {
      css += variablesCSS + '\n';
    }
  }

  // 2. Generate utility classes
  if (includeClasses) {
    // Shell classes
    if (shells.length > 0) {
      const shellCSS = generateShellClasses(shells);
      if (shellCSS) {
        css += shellCSS;
      }
    }

    // Page classes
    if (pages.length > 0) {
      const pageCSS = generatePageClasses(pages);
      if (pageCSS) {
        css += pageCSS;
      }
    }

    // Standard section classes
    if (standardSections.length > 0) {
      const sectionCSS = generateSectionClasses(standardSections);
      if (sectionCSS) {
        css += sectionCSS;
      }
    }

    // Advanced section classes (masonry, sticky, collapsible)
    if (advancedSections.length > 0) {
      const advancedCSS = generateAdvancedSectionClasses(advancedSections);
      if (advancedCSS) {
        css += advancedCSS;
      }

      // Generate state classes for interactive patterns
      const stateCSS = generateAdvancedSectionStateClasses(advancedSections);
      if (stateCSS) {
        css += stateCSS;
      }
    }
  }

  // 3. Generate responsive media queries (only if includeClasses is true)
  if (includeMediaQueries && includeClasses) {
    const mediaCSS = generateMediaQueries(tokens);
    if (mediaCSS) {
      css += mediaCSS;
    }
  }

  // 4. Format CSS with proper indentation
  const formatted = formatCSS(css, indent);

  // 5. Validate CSS syntax
  if (!validateCSS(formatted)) {
    throw new Error('Generated CSS has unbalanced braces');
  }

  return formatted;
}

/**
 * Generate CSS for all layout tokens in the system
 *
 * @param options - CSS generation options
 * @returns Complete CSS for all shells, pages, and sections
 *
 * @example
 * ```typescript
 * const css = generateAllLayoutCSS();
 * // Write to file or use in application
 * ```
 */
export function generateAllLayoutCSS(options: CSSGenerationOptions = {}): string {
  const shells = getAllShellTokens();
  const pages = getAllPageLayoutTokens();
  const sections = getAllSectionPatternTokens();
  const advancedSections = getAllAdvancedSectionPatternTokens();

  return generateLayoutCSS([...shells, ...pages, ...sections, ...advancedSections], options);
}

// ============================================================================
// Container Query CSS Generation (SPEC-LAYOUT-003 Phase 3)
// ============================================================================

/**
 * Generate CSS container queries with browser fallback
 * Uses @supports for progressive enhancement
 *
 * @param config - Container query configuration
 * @returns CSS string with container queries and fallback
 */
export function generateContainerQueryCSS(config: ContainerQueryConfig): string {
  const rules: string[] = [];

  // Container definition
  rules.push(`  container-type: ${config.type};`);
  rules.push(`  container-name: ${config.name};`);

  // Container query rules with @supports progressive enhancement
  const queryRules: string[] = [];

  for (const [_bp, bpConfig] of Object.entries(config.breakpoints)) {
    if (bpConfig) {
      const cssProps = Object.entries(bpConfig.css)
        .map(([prop, value]) => `    ${prop}: ${value};`)
        .join('\n');

      queryRules.push(`
  @container ${config.name} (min-width: ${bpConfig.minWidth}px) {
${cssProps}
  }`);
    }
  }

  // Wrap in @supports for browser compatibility
  if (queryRules.length > 0) {
    rules.push(`
@supports (container-type: inline-size) {
${queryRules.join('\n')}
}`);
  }

  return rules.join('\n');
}

/**
 * Generate fallback CSS for browsers without container query support
 * Uses viewport-based media queries as fallback
 *
 * @param config - Container query configuration
 * @returns CSS string with media query fallbacks
 */
export function generateContainerQueryFallback(config: ContainerQueryConfig): string {
  const fallbackRules: string[] = [];

  // Map container breakpoints to approximate viewport breakpoints
  const breakpointMapping: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  };

  for (const [bp, bpConfig] of Object.entries(config.breakpoints)) {
    if (bpConfig) {
      const viewportWidth = breakpointMapping[bp] || bpConfig.minWidth * 2;
      const cssProps = Object.entries(bpConfig.css)
        .map(([prop, value]) => `    ${prop}: ${value};`)
        .join('\n');

      fallbackRules.push(`
@supports not (container-type: inline-size) {
  @media (min-width: ${viewportWidth}px) {
${cssProps}
  }
}`);
    }
  }

  return fallbackRules.join('\n');
}

// ============================================================================
// Orientation CSS Generation (SPEC-LAYOUT-003 Phase 3)
// ============================================================================

/**
 * Generate orientation-specific CSS media queries
 * Supports portrait (height >= width) and landscape (width > height)
 *
 * @param config - Orientation configuration
 * @param cssGenerator - Function to convert config to CSS properties
 * @returns CSS string with orientation media queries
 */
export function generateOrientationCSS<T>(
  config: OrientationConfig<T>,
  cssGenerator: (config: Partial<T>) => string
): string {
  const rules: string[] = [];

  if (config.portrait) {
    const portraitCSS = cssGenerator(config.portrait);
    if (portraitCSS) {
      rules.push(`
@media (orientation: portrait) {
${portraitCSS}
}`);
    }
  }

  if (config.landscape) {
    const landscapeCSS = cssGenerator(config.landscape);
    if (landscapeCSS) {
      rules.push(`
@media (orientation: landscape) {
${landscapeCSS}
}`);
    }
  }

  return rules.join('\n');
}

/**
 * Generate complete responsive CSS with orientation support
 * Combines viewport breakpoints, container queries, and orientation
 *
 * @param config - Full responsive configuration
 * @param cssGenerator - Function to convert config to CSS properties
 * @param containerConfig - Optional container query configuration
 * @returns Complete CSS string
 */
export function generateAdvancedResponsiveCSS<T>(
  config: FullResponsiveConfig<T>,
  cssGenerator: (config: T | Partial<T>) => string,
  containerConfig?: ContainerQueryConfig
): string {
  const sections: string[] = [];

  // Base responsive CSS (viewport breakpoints)
  sections.push(cssGenerator(config.default));

  // Breakpoint overrides
  const breakpoints: Array<keyof ResponsiveConfig<T>> = ['sm', 'md', 'lg', 'xl', '2xl'];
  for (const bp of breakpoints) {
    const override = config[bp];
    if (override) {
      const css = cssGenerator(override);
      if (css) {
        sections.push(`
@media (min-width: ${BREAKPOINT_VALUES[bp]}px) {
${css}
}`);
      }
    }
  }

  // Container queries (if provided)
  if (containerConfig) {
    sections.push(generateContainerQueryCSS(containerConfig));
    sections.push(generateContainerQueryFallback(containerConfig));
  }

  // Orientation overrides
  if (config.orientation) {
    sections.push(generateOrientationCSS(config.orientation, cssGenerator));
  }

  return sections.join('\n');
}
