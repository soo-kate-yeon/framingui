/**
 * Theme Context Definition
 * React Context for theme management
 */

import { createContext } from 'react';
import type { ThemeName } from '../themes/types.js';
import type { SemanticToken, CompositionToken } from '../schemas/index.js';

/**
 * Theme Context Value
 */
export interface ThemeContextValue {
  /** Current theme name */
  theme: ThemeName;
  /** Set the current theme */
  setTheme: (theme: ThemeName) => void;
  /** Current semantic tokens */
  tokens: SemanticToken | null;
  /** Current composition tokens */
  composition: CompositionToken | null;
  /** Dark mode enabled */
  darkMode: boolean;
  /** Toggle dark mode */
  toggleDarkMode: () => void;
}

/**
 * Theme Context
 * Provides theme state and actions to consuming components
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

ThemeContext.displayName = 'ThemeContext';
