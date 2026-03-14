import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface CheckboxProps {
  label: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Checkbox({
  label,
  description,
  checked = false,
  disabled = false,
  onPress,
  style,
}: CheckboxProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.base, disabled && styles.disabled, style]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? (
          <Text tone={checked ? 'inverse' : 'primary'} variant="label">
            ✓
          </Text>
        ) : null}
      </View>
      <View style={styles.copy}>
        <Text variant="bodyStrong">{label}</Text>
        {description ? (
          <Text tone="secondary" variant="caption">
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: theme.spacing[3],
      width: '100%',
    },
    disabled: {
      opacity: 0.6,
    },
    box: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface.base,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      height: 24,
      justifyContent: 'center',
      marginTop: 2,
      width: 24,
    },
    boxChecked: {
      backgroundColor: theme.colors.action.primary,
      borderColor: theme.colors.action.primary,
    },
    copy: {
      flex: 1,
      gap: theme.spacing[1],
    },
  })
);
