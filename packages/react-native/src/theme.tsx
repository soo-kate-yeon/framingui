import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import {
  baseColors,
  baseRadius,
  baseShadows,
  baseSpacing,
  baseTypography,
  type ShadowToken,
  type SpacingToken,
  type TypographyToken,
} from './tokens.js';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface ReactNativeTheme {
  id: string;
  colors: typeof baseColors;
  spacing: typeof baseSpacing;
  radius: typeof baseRadius;
  typography: typeof baseTypography;
  shadows: typeof baseShadows;
}

export interface ReactNativeThemeInput {
  id?: string;
  colors?: DeepPartial<typeof baseColors>;
  spacing?: DeepPartial<typeof baseSpacing>;
  radius?: DeepPartial<typeof baseRadius>;
  typography?: DeepPartial<typeof baseTypography>;
  shadows?: DeepPartial<typeof baseShadows>;
}

function mergeRecord<T extends Record<string, any>>(base: T, input?: DeepPartial<T>): T {
  if (!input) {
    return { ...base };
  }

  const mergedEntries = Object.entries(base).map(([key, value]) => {
    const nextValue = input[key as keyof T];

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      nextValue !== null &&
      typeof nextValue === 'object' &&
      !Array.isArray(nextValue)
    ) {
      return [key, mergeRecord(value, nextValue as DeepPartial<typeof value>)];
    }

    return [key, nextValue ?? value];
  });

  return Object.fromEntries(mergedEntries) as T;
}

export function createTheme(input: ReactNativeThemeInput = {}): ReactNativeTheme {
  return {
    id: input.id ?? 'default',
    colors: mergeRecord(baseColors, input.colors),
    spacing: mergeRecord(baseSpacing, input.spacing),
    radius: mergeRecord(baseRadius, input.radius),
    typography: mergeRecord(baseTypography, input.typography),
    shadows: mergeRecord(baseShadows, input.shadows),
  };
}

export const defaultTheme = createTheme();

const ThemeContext = createContext<ReactNativeTheme>(defaultTheme);

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: ReactNativeTheme;
}

export function ThemeProvider({ children, theme = defaultTheme }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ReactNativeTheme {
  return useContext(ThemeContext);
}

type NamedStyles<T> = { [K in keyof T]: ViewStyle | TextStyle };

export function createThemedStyles<T extends NamedStyles<T>>(
  factory: (theme: ReactNativeTheme) => T
) {
  return (theme: ReactNativeTheme = defaultTheme): T => StyleSheet.create(factory(theme));
}

export function getThemeTextStyle(theme: ReactNativeTheme, token: TypographyToken): TextStyle {
  return theme.typography[token];
}

export function getThemeShadowStyle(theme: ReactNativeTheme, token: ShadowToken): ViewStyle {
  return theme.shadows[token];
}

export function getThemeSpacing(theme: ReactNativeTheme, token: SpacingToken): number {
  return theme.spacing[token];
}
