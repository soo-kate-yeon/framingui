import type { TextStyle, ViewStyle } from 'react-native';
import {
  defaultTheme,
  getThemeShadowStyle,
  getThemeSpacing,
  getThemeTextStyle,
  type ReactNativeTheme,
} from './theme.js';
import {
  shadows,
  spacing,
  type ShadowToken,
  type SpacingToken,
  type TypographyToken,
  typography,
} from './tokens.js';

export function getTextStyle(
  token: TypographyToken,
  theme: ReactNativeTheme = defaultTheme
): TextStyle {
  if (theme === defaultTheme) {
    return typography[token];
  }

  return getThemeTextStyle(theme, token);
}

export function getShadowStyle(
  token: ShadowToken,
  theme: ReactNativeTheme = defaultTheme
): ViewStyle {
  if (theme === defaultTheme) {
    return shadows[token];
  }

  return getThemeShadowStyle(theme, token);
}

export function insetX(
  token: SpacingToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'paddingHorizontal'> {
  return {
    paddingHorizontal: theme === defaultTheme ? spacing[token] : getThemeSpacing(theme, token),
  };
}

export function insetY(
  token: SpacingToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'paddingVertical'> {
  return {
    paddingVertical: theme === defaultTheme ? spacing[token] : getThemeSpacing(theme, token),
  };
}

export function stackGap(
  token: SpacingToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'gap'> {
  return { gap: theme === defaultTheme ? spacing[token] : getThemeSpacing(theme, token) };
}
