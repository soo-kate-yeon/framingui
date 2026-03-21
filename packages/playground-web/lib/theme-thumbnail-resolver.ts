/**
 * Theme Thumbnail Resolver
 *
 * Resolves theme JSON files into a flat CSS variable map for TemplateThumbnail.
 * Handles the wildly different structures across our 7 themes:
 * - Some use tokens.semantic with OKLCh references (pebble, dark-boldness, etc.)
 * - Some have no semantic tokens at all (square-minimalism, classic-magazine)
 * - Border/text structures vary per theme
 */

// Static JSON imports
import pebble from './themes/pebble.json';
import darkBoldness from './themes/dark-boldness.json';
import editorialTech from './themes/editorial-tech.json';
import neutralWorkspace from './themes/neutral-workspace.json';
import minimalWorkspace from './themes/minimal-workspace.json';
import squareMinimalism from './themes/square-minimalism.json';
import classicMagazine from './themes/classic-magazine.json';
import boldLine from './themes/bold-line.json';

interface OKLCh {
  l: number;
  c: number;
  h: number;
}

function oklchToCSS(color: OKLCh): string {
  return `oklch(${color.l} ${color.c} ${color.h})`;
}

/**
 * Safely traverse a nested object using a dot-path like "atomic.color.neutral.white"
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

/**
 * Resolve a semantic token reference like "atomic.color.neutral.cool.50"
 * into a CSS color string
 */
function resolveRef(ref: string, tokens: any): string | null {
  const value = getNestedValue(tokens, ref);
  if (!value) {
    return null;
  }
  if (typeof value === 'object' && 'l' in value) {
    return oklchToCSS(value as OKLCh);
  }
  if (typeof value === 'string') {
    return value;
  }
  return null;
}

export interface ThumbnailVars {
  '--bg-canvas': string;
  '--bg-surface': string;
  '--bg-secondary': string;
  '--text-primary': string;
  '--text-secondary': string;
  '--text-tertiary': string;
  '--action-primary': string;
  '--action-primary-text': string;
  '--border-default': string;
  '--border-emphasis': string;
  [key: string]: string; // for radius tokens
}

/**
 * Resolve an OKLCh object from an atomic ref path.
 * Returns the raw OKLCh if found, null otherwise.
 */
function resolveOKLCh(ref: string, tokens: any): OKLCh | null {
  if (!ref || !ref.startsWith('atomic.')) {
    return null;
  }
  const value = getNestedValue(tokens, ref);
  if (value && typeof value === 'object' && 'l' in value) {
    return value as OKLCh;
  }
  return null;
}

function resolveTheme(themeJson: any): ThumbnailVars {
  const tokens = themeJson.tokens ?? themeJson;
  const atomic = tokens.atomic ?? tokens;
  const semantic = tokens.semantic ?? themeJson.semantic;
  const radius = atomic.radius ?? tokens.radius ?? {};

  // ---- Helper to resolve a semantic color ref ----
  const resolve = (ref: string): string | null => {
    if (!ref) {
      return null;
    }
    if (ref.startsWith('atomic.')) {
      return resolveRef(ref, tokens);
    }
    return null;
  };

  // ---- Background ----
  let bgCanvas = '#ffffff';
  let bgCanvasL = 1; // track lightness for dark-theme detection
  let bgSurface = '#ffffff';
  let bgSecondary = '#f5f5f5';

  if (semantic?.background) {
    const bg = semantic.background;
    // canvas
    if (typeof bg.canvas === 'string' && bg.canvas.startsWith('atomic.')) {
      const oklch = resolveOKLCh(bg.canvas, tokens);
      if (oklch) {
        bgCanvas = oklchToCSS(oklch);
        bgCanvasL = oklch.l;
      }
    }
    // surface
    const surfDefault = bg.surface?.default ?? bg.surface;
    if (typeof surfDefault === 'string' && surfDefault.startsWith('atomic.')) {
      bgSurface = resolve(surfDefault) ?? bgSurface;
    }
    // emphasis / secondary
    const surfEmphasis = bg.surface?.emphasis ?? bg.surface?.subtle;
    if (typeof surfEmphasis === 'string' && surfEmphasis.startsWith('atomic.')) {
      bgSecondary = resolve(surfEmphasis) ?? bgSecondary;
    }
  }

  const isDarkCanvas = bgCanvasL < 0.3;

  // ---- Text ----
  let textPrimary = '#171717';
  let textPrimaryL = 0.1;
  let textSecondary = '#737373';
  let textTertiary = '#a3a3a3';

  if (semantic?.text) {
    const t = semantic.text;
    if (typeof t.primary === 'string' && t.primary.startsWith('atomic.')) {
      const oklch = resolveOKLCh(t.primary, tokens);
      if (oklch) {
        textPrimary = oklchToCSS(oklch);
        textPrimaryL = oklch.l;
      }
    }
    if (typeof t.secondary === 'string' && t.secondary.startsWith('atomic.')) {
      textSecondary = resolve(t.secondary) ?? textSecondary;
    }
    const muted = t.muted ?? t.tertiary;
    if (typeof muted === 'string' && muted.startsWith('atomic.')) {
      textTertiary = resolve(muted) ?? textTertiary;
    }
  }

  // ---- Border ----
  let borderDefault = '#e5e5e5';
  let borderEmphasis = '#d4d4d4';

  if (semantic?.border) {
    const b = semantic.border;
    // For dark themes, prefer subtle border (less prominent on dark bg).
    // For light themes, use the standard default.
    const bDefault = isDarkCanvas
      ? (b.default?.subtle ?? b.default?.default ?? b.default ?? b.subtle)
      : (b.default?.default ?? b.default?.subtle ?? b.default ?? b.subtle);
    if (typeof bDefault === 'string' && bDefault.startsWith('atomic.')) {
      borderDefault = resolve(bDefault) ?? borderDefault;
    }
    const bEmphasis = b.default?.emphasis ?? b.strong ?? b.focus;
    if (typeof bEmphasis === 'string' && bEmphasis.startsWith('atomic.')) {
      borderEmphasis = resolve(bEmphasis) ?? borderEmphasis;
    }
  }

  // ---- Action primary ----
  // Strategy: use brand.500 if it's a distinctly chromatic color with
  // suitable lightness for a button background. Otherwise fall back to textPrimary.
  let actionPrimary = textPrimary;
  let actionPrimaryL = textPrimaryL;

  const brand500 = atomic.color?.brand?.['500'];
  if (brand500 && typeof brand500 === 'object' && 'l' in brand500) {
    const { l, c } = brand500 as OKLCh;
    // Distinct brand: high chroma (c > 0.2) and suitable button-bg lightness
    if (c > 0.2 && l > 0.2 && l < 0.8) {
      actionPrimary = oklchToCSS(brand500 as OKLCh);
      actionPrimaryL = l;
    }
  }

  // Determine contrasting text for the action-primary background
  let actionPrimaryText: string;
  if (actionPrimaryL > 0.6) {
    // Light action bg → dark text
    const neutralBlack = atomic.color?.neutral?.black;
    actionPrimaryText =
      neutralBlack && typeof neutralBlack === 'object' && 'l' in neutralBlack
        ? oklchToCSS(neutralBlack as OKLCh)
        : '#000000';
  } else {
    // Dark action bg → light text
    const neutralWhite = atomic.color?.neutral?.white;
    actionPrimaryText =
      neutralWhite && typeof neutralWhite === 'object' && 'l' in neutralWhite
        ? oklchToCSS(neutralWhite as OKLCh)
        : '#ffffff';
  }

  // ---- Radius ----
  const radiusVars: Record<string, string> = {};
  if (radius && typeof radius === 'object') {
    for (const [k, v] of Object.entries(radius)) {
      if (typeof v === 'string') {
        radiusVars[`--radius-${k}`] = v;
      }
    }
  }

  return {
    '--bg-canvas': bgCanvas,
    '--bg-surface': bgSurface,
    '--bg-secondary': bgSecondary,
    '--text-primary': textPrimary,
    '--text-secondary': textSecondary,
    '--text-tertiary': textTertiary,
    '--action-primary': actionPrimary,
    '--action-primary-text': actionPrimaryText,
    '--border-default': borderDefault,
    '--border-emphasis': borderEmphasis,
    ...radiusVars,
  };
}

// ============================================================================
// Theme Registry (pre-resolved at import time)
// ============================================================================

const THEME_REGISTRY: Record<string, ThumbnailVars> = {
  'square-minimalism': resolveTheme(squareMinimalism),
  'classic-magazine': resolveTheme(classicMagazine),
  pebble: resolveTheme(pebble),
  'dark-boldness': resolveTheme(darkBoldness),
  'editorial-tech': resolveTheme(editorialTech),
  'neutral-workspace': resolveTheme(neutralWorkspace),
  'minimal-workspace': resolveTheme(minimalWorkspace),
  'bold-line': resolveTheme(boldLine),
};

/**
 * Get pre-resolved CSS variables for a given theme ID.
 * Returns undefined if theme is not found.
 */
export function getThemeThumbnailVars(themeId: string): ThumbnailVars | undefined {
  return THEME_REGISTRY[themeId];
}
