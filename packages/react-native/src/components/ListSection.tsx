import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { getSectionGapStyle, type SectionGapToken } from '../layout.js';
import { useTheme } from '../theme.js';
import { Section } from './Section.js';

export interface ListSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  gap?: SectionGapToken;
  style?: StyleProp<ViewStyle>;
}

export function ListSection({
  children,
  title,
  description,
  gap = 'tight',
  style,
}: ListSectionProps) {
  const theme = useTheme();

  return (
    <Section description={description} gap="default" title={title}>
      <View style={[styles.list, getSectionGapStyle(gap, theme), style]}>{children}</View>
    </Section>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});
