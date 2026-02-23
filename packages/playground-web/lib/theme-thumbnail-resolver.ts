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
  '--tekton-bg-canvas': string;
  '--tekton-bg-surface': string;
  '--tekton-bg-secondary': string;
  '--tekton-text-primary': string;
  '--tekton-text-secondary': string;
  '--tekton-text-tertiary': string;
  '--tekton-action-primary': string;
  '--tekton-action-primary-text': string;
  '--tekton-border-default': string;
  '--tekton-border-emphasis': string;
  [key: string]: string; // for radius tokens
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
    // If it starts with "atomic.", resolve from the atomic object inside tokens
    if (ref.startsWith('atomic.')) {
      return resolveRef(ref, tokens);
    }
    return null;
  };

  // ---- Background ----
  let bgCanvas = '#ffffff';
  let bgSurface = '#ffffff';
  let bgSecondary = '#f5f5f5';

  if (semantic?.background) {
    const bg = semantic.background;
    // canvas
    if (typeof bg.canvas === 'string' && bg.canvas.startsWith('atomic.')) {
      bgCanvas = resolve(bg.canvas) ?? bgCanvas;
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

  // ---- Text ----
  let textPrimary = '#171717';
  let textSecondary = '#737373';
  let textTertiary = '#a3a3a3';

  if (semantic?.text) {
    const t = semantic.text;
    if (typeof t.primary === 'string' && t.primary.startsWith('atomic.')) {
      textPrimary = resolve(t.primary) ?? textPrimary;
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
    // Could be  border.default.default  or  border.default  or  border.subtle
    const bDefault = b.default?.default ?? b.default?.subtle ?? b.default ?? b.subtle;
    if (typeof bDefault === 'string' && bDefault.startsWith('atomic.')) {
      borderDefault = resolve(bDefault) ?? borderDefault;
    }
    const bEmphasis = b.default?.emphasis ?? b.strong ?? b.focus;
    if (typeof bEmphasis === 'string' && bEmphasis.startsWith('atomic.')) {
      borderEmphasis = resolve(bEmphasis) ?? borderEmphasis;
    }
  }

  // ---- Action primary ----
  const actionPrimary = textPrimary;
  let actionPrimaryText = '#ffffff';

  // If we can find neutral.white, use it for action text
  const neutralWhite = atomic.color?.neutral?.white;
  if (neutralWhite && typeof neutralWhite === 'object' && 'l' in neutralWhite) {
    actionPrimaryText = oklchToCSS(neutralWhite as OKLCh);
  }

  // ---- Radius ----
  const radiusVars: Record<string, string> = {};
  if (radius && typeof radius === 'object') {
    for (const [k, v] of Object.entries(radius)) {
      if (typeof v === 'string') {
        radiusVars[`--tekton-radius-${k}`] = v;
      }
    }
  }

  return {
    '--tekton-bg-canvas': bgCanvas,
    '--tekton-bg-surface': bgSurface,
    '--tekton-bg-secondary': bgSecondary,
    '--tekton-text-primary': textPrimary,
    '--tekton-text-secondary': textSecondary,
    '--tekton-text-tertiary': textTertiary,
    '--tekton-action-primary': actionPrimary,
    '--tekton-action-primary-text': actionPrimaryText,
    '--tekton-border-default': borderDefault,
    '--tekton-border-emphasis': borderEmphasis,
    ...radiusVars,
  };
}

// ============================================================================
// Hardcoded fallbacks for themes with non-standard structures
// ============================================================================

const SQUARE_MINIMALISM_VARS: ThumbnailVars = {
  '--tekton-bg-canvas': '#ffffff',
  '--tekton-bg-surface': '#ffffff',
  '--tekton-bg-secondary': '#fafafa',
  '--tekton-text-primary': '#0a0a0a',
  '--tekton-text-secondary': '#737373',
  '--tekton-text-tertiary': '#a3a3a3',
  '--tekton-action-primary': '#0a0a0a',
  '--tekton-action-primary-text': '#ffffff',
  '--tekton-border-default': '#e5e5e5',
  '--tekton-border-emphasis': '#171717',
  '--tekton-radius-none': '0px',
  '--tekton-radius-sm': '0px',
  '--tekton-radius-md': '0px',
  '--tekton-radius-lg': '0px',
  '--tekton-radius-full': '0px',
  '--tekton-radius-circle': '50%',
};

const CLASSIC_MAGAZINE_VARS: ThumbnailVars = {
  '--tekton-bg-canvas': '#ffffff',
  '--tekton-bg-surface': '#ffffff',
  '--tekton-bg-secondary': '#fafafa',
  '--tekton-text-primary': '#000000',
  '--tekton-text-secondary': '#525252',
  '--tekton-text-tertiary': '#a3a3a3',
  '--tekton-action-primary': '#000000',
  '--tekton-action-primary-text': '#ffffff',
  '--tekton-border-default': '#e5e5e5',
  '--tekton-border-emphasis': '#000000',
  '--tekton-radius-none': '0px',
  '--tekton-radius-sm': '0px',
  '--tekton-radius-md': '0px',
  '--tekton-radius-lg': '0px',
  '--tekton-radius-xl': '0px',
  '--tekton-radius-2xl': '0px',
  '--tekton-radius-3xl': '0px',
  '--tekton-radius-full': '0px',
};

// ============================================================================
// Theme Registry (pre-resolved at import time)
// ============================================================================

const THEME_REGISTRY: Record<string, ThumbnailVars> = {
  'square-minimalism': SQUARE_MINIMALISM_VARS,
  'classic-magazine': CLASSIC_MAGAZINE_VARS,
  pebble: resolveTheme(pebble),
  'dark-boldness': resolveTheme(darkBoldness),
  'editorial-tech': resolveTheme(editorialTech),
  'neutral-workspace': resolveTheme(neutralWorkspace),
  'minimal-workspace': resolveTheme(minimalWorkspace),
};

/**
 * Get pre-resolved CSS variables for a given theme ID.
 * Returns undefined if theme is not found.
 */
export function getThemeThumbnailVars(themeId: string): ThumbnailVars | undefined {
  return THEME_REGISTRY[themeId];
}
