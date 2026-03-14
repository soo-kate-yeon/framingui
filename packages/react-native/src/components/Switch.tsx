import { Switch as ReactNativeSwitch, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface SwitchProps {
  label: string;
  description?: string;
  value: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export function Switch({
  label,
  description,
  value,
  disabled = false,
  onValueChange,
  style,
}: SwitchProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.base, disabled && styles.disabled, style]}>
      <View style={styles.copy}>
        <Text variant="bodyStrong">{label}</Text>
        {description ? (
          <Text tone="secondary" variant="caption">
            {description}
          </Text>
        ) : null}
      </View>
      <ReactNativeSwitch
        disabled={disabled}
        onValueChange={onValueChange}
        thumbColor={value ? theme.colors.action.primary : theme.colors.surface.base}
        trackColor={{
          false: theme.colors.border.default,
          true: theme.colors.action.primaryDisabled,
        }}
        value={value}
      />
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing[3],
      justifyContent: 'space-between',
      width: '100%',
    },
    disabled: {
      opacity: 0.6,
    },
    copy: {
      flex: 1,
      gap: theme.spacing[1],
    },
  })
);
