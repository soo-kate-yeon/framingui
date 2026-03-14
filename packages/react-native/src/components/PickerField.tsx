import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface PickerFieldProps {
  label?: string;
  placeholder: string;
  selectedLabel?: string;
  selected?: boolean;
  invalid?: boolean;
  focused?: boolean;
  disabled?: boolean;
  message?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function PickerField({
  label,
  placeholder,
  selectedLabel,
  selected = false,
  invalid = false,
  focused = false,
  disabled = false,
  message,
  onPress,
  style,
}: PickerFieldProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const hasSelection = selected || Boolean(selectedLabel);

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text variant="label">{label}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, selected: hasSelection }}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.field,
          focused && styles.fieldFocused,
          invalid && styles.fieldInvalid,
          disabled && styles.fieldDisabled,
        ]}
      >
        <Text tone={hasSelection ? 'primary' : 'tertiary'}>{selectedLabel ?? placeholder}</Text>
        <Text tone="tertiary" variant="label">
          ▾
        </Text>
      </Pressable>
      {message ? (
        <Text tone={invalid ? 'danger' : 'secondary'} variant="caption">
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    wrapper: {
      gap: theme.spacing[2],
      width: '100%',
    },
    field: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface.muted,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 52,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      width: '100%',
    },
    fieldFocused: {
      borderColor: theme.colors.border.accent,
      ...theme.shadows.focus,
    },
    fieldInvalid: {
      borderColor: theme.colors.border.danger,
    },
    fieldDisabled: {
      opacity: 0.6,
    },
  })
);
