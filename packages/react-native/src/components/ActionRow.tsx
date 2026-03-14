import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { getSectionGapStyle, type SectionGapToken } from '../layout.js';
import { useTheme } from '../theme.js';

export interface ActionRowProps {
  children: ReactNode;
  gap?: SectionGapToken;
  align?: ViewStyle['justifyContent'];
  style?: StyleProp<ViewStyle>;
}

export function ActionRow({
  children,
  gap = 'tight',
  align = 'flex-start',
  style,
}: ActionRowProps) {
  const theme = useTheme();
  const gapStyle = getSectionGapStyle(gap, theme);

  return <View style={[styles.base, gapStyle, { justifyContent: align }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
