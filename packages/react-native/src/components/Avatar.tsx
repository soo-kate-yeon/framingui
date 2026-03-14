import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({ initials, size = 'md', style }: AvatarProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        styles.base,
        size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : styles.md,
        style,
      ]}
    >
      <Text tone="accent" variant="label">
        {initials}
      </Text>
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      backgroundColor: theme.colors.background.subtle,
      borderRadius: theme.radius.full,
      justifyContent: 'center',
    },
    sm: {
      height: 32,
      width: 32,
    },
    md: {
      height: 44,
      width: 44,
    },
    lg: {
      height: 56,
      width: 56,
    },
  })
);
