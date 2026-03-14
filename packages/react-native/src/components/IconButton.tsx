import type { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface IconButtonProps {
  icon: ReactNode;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: IconButtonVariant;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  icon,
  label,
  onPress,
  disabled = false,
  variant = 'secondary',
  style,
}: IconButtonProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary'
          ? styles.primary
          : variant === 'ghost'
            ? styles.ghost
            : styles.secondary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        {label ? (
          <Text tone={variant === 'primary' ? 'inverse' : 'primary'} variant="label">
            {label}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      borderRadius: theme.radius.md,
      justifyContent: 'center',
      minHeight: 44,
      minWidth: 44,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
    },
    primary: {
      backgroundColor: theme.colors.action.primary,
    },
    secondary: {
      backgroundColor: theme.colors.surface.muted,
      borderColor: theme.colors.border.default,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    pressed: {
      opacity: 0.8,
    },
    disabled: {
      backgroundColor: theme.colors.background.subtle,
      borderColor: theme.colors.border.subtle,
      opacity: 0.6,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing[2],
      justifyContent: 'center',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
