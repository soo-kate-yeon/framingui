import type { ReactNode } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Text, type TextTone } from './Text.js';

export type HeadingLevel = 'display' | 'title' | 'sectionTitle';

export interface HeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  tone?: TextTone;
  style?: StyleProp<TextStyle>;
}

export function Heading({ children, level = 'title', tone = 'primary', style }: HeadingProps) {
  return (
    <Text accessibilityRole="header" style={style} tone={tone} variant={level}>
      {children}
    </Text>
  );
}
