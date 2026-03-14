import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export type BadgeTone = 'neutral' | 'accent' | 'danger';

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
}

export function Badge({ children, tone = 'neutral', style }: BadgeProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        styles.base,
        tone === 'accent' ? styles.accent : tone === 'danger' ? styles.danger : styles.neutral,
        style,
      ]}
    >
      <Text
        tone={tone === 'danger' ? 'danger' : tone === 'accent' ? 'accent' : 'secondary'}
        variant="label"
      >
        {children}
      </Text>
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: theme.radius.full,
      justifyContent: 'center',
      minHeight: 28,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
    },
    neutral: {
      backgroundColor: theme.colors.background.subtle,
    },
    accent: {
      backgroundColor: theme.colors.background.subtle,
      borderColor: theme.colors.border.accent,
      borderWidth: 1,
    },
    danger: {
      backgroundColor: theme.colors.surface.danger,
      borderColor: theme.colors.border.danger,
      borderWidth: 1,
    },
  })
);
