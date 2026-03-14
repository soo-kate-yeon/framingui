import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';

export interface CardProps {
  children: ReactNode;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, elevated = true, style }: CardProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return <View style={[styles.base, elevated && styles.elevated, style]}>{children}</View>;
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.colors.surface.base,
      borderColor: theme.colors.border.subtle,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      gap: theme.spacing[3],
      padding: theme.spacing[4],
      width: '100%',
    },
    elevated: {
      ...theme.shadows.card,
    },
  })
);
