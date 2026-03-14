import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}: ButtonProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isDisabled = disabled || loading;
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isSecondary ? styles.secondary : styles.primary,
        pressed && !isDisabled && (isSecondary ? styles.secondaryPressed : styles.primaryPressed),
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isSecondary ? theme.colors.text.primary : theme.colors.text.inverse}
        />
      ) : (
        <Text style={[styles.text, isSecondary && styles.secondaryText]}>{label}</Text>
      )}
    </Pressable>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      borderRadius: theme.radius.md,
      justifyContent: 'center',
      minHeight: 52,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
    },
    primary: {
      backgroundColor: theme.colors.action.primary,
    },
    secondary: {
      backgroundColor: theme.colors.surface.muted,
      borderColor: theme.colors.border.default,
      borderWidth: 1,
    },
    primaryPressed: {
      backgroundColor: theme.colors.action.primaryPressed,
    },
    secondaryPressed: {
      backgroundColor: theme.colors.background.subtle,
    },
    disabled: {
      backgroundColor: theme.colors.action.primaryDisabled,
      borderColor: theme.colors.action.primaryDisabled,
    },
    text: {
      ...theme.typography.button,
      color: theme.colors.text.inverse,
    },
    secondaryText: {
      color: theme.colors.text.primary,
    },
  })
);
