import type { ReactNode } from 'react';
import {
  Text as ReactNativeText,
  type StyleProp,
  type TextProps as ReactNativeTextProps,
  type TextStyle,
} from 'react-native';
import { type TypographyToken } from '../tokens.js';
import { useTheme } from '../theme.js';

export type TextTone = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'danger' | 'inverse';

export interface TextProps extends ReactNativeTextProps {
  children: ReactNode;
  variant?: TypographyToken;
  tone?: TextTone;
  style?: StyleProp<TextStyle>;
}

function getToneColor(tone: TextTone, theme: ReturnType<typeof useTheme>): string {
  switch (tone) {
    case 'secondary':
      return theme.colors.text.secondary;
    case 'tertiary':
      return theme.colors.text.tertiary;
    case 'accent':
      return theme.colors.text.accent;
    case 'danger':
      return theme.colors.text.danger;
    case 'inverse':
      return theme.colors.text.inverse;
    case 'primary':
    default:
      return theme.colors.text.primary;
  }
}

export function Text({ children, variant = 'body', tone = 'primary', style, ...props }: TextProps) {
  const theme = useTheme();

  return (
    <ReactNativeText
      style={[theme.typography[variant], { color: getToneColor(tone, theme) }, style]}
      {...props}
    >
      {children}
    </ReactNativeText>
  );
}
