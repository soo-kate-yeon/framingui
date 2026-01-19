import React, {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { ThemeContext } from './ThemeContext.js';
import { loadTheme } from '../themes/theme-loader.js';
import { applyCSSVariables } from './apply-css-variables.js';
import type { ThemeName } from '../themes/types.js';
import type { SemanticToken, CompositionToken } from '../schemas/index.js';

/**
 * Theme Provider Props
 */
export interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Default theme to load */
  defaultTheme?: ThemeName;
  /** Default dark mode state */
  defaultDarkMode?: boolean;
  /** Detect system theme preference */
  enableSystemTheme?: boolean;
}

/**
 * Theme Provider Component
 * Manages dynamic theme state and provides tokens via context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'professional',
  defaultDarkMode = false,
  enableSystemTheme = true,
}) => {

  // If defaultDarkMode is explicitly true, use it. Otherwise check system preference.
  const initialDarkMode =
    defaultDarkMode ||
    (enableSystemTheme &&
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false);

  // State for theme name
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    try {
      loadTheme(defaultTheme);
      return defaultTheme;
    } catch {
      return 'professional';
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(initialDarkMode);

  // State for theme tokens and composition
  const [themeState, setThemeState] = useState<{
    tokens: SemanticToken | null;
    composition: CompositionToken | null;
  }>(() => {
    try {
      const loadedTheme = loadTheme(themeName);
      return {
        tokens: loadedTheme.tokens,
        composition: loadedTheme.composition,
      };
    } catch {
      const fallbackTheme = loadTheme('professional');
      return {
        tokens: fallbackTheme.tokens,
        composition: fallbackTheme.composition,
      };
    }
  });

  // Load tokens when themeName changes
  useEffect(() => {
    try {
      const loadedTheme = loadTheme(themeName);
      setThemeState({
        tokens: loadedTheme.tokens,
        composition: loadedTheme.composition,
      });
    } catch {
      const fallbackTheme = loadTheme('professional');
      setThemeState({
        tokens: fallbackTheme.tokens,
        composition: fallbackTheme.composition,
      });
    }
  }, [themeName]);

  // Stable callback for setting theme
  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeNameState(newTheme);
  }, []);

  // Stable callback for toggling dark mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // Apply CSS variables when tokens or dark mode changes
  useEffect(() => {
    if (themeState.tokens && themeState.composition) {
      applyCSSVariables(themeState.tokens, themeState.composition);
    }
  }, [themeState.tokens, themeState.composition]);

  // Apply dark mode class to document element
  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }, [darkMode]);

  // Context value
  const contextValue = useMemo(
    () => ({
      theme: themeName,
      setTheme,
      tokens: themeState.tokens,
      composition: themeState.composition,
      darkMode,
      toggleDarkMode,
    }),
    [themeName, setTheme, themeState, darkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
