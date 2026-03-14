import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function RadioGroup({
  label,
  options,
  value,
  onValueChange,
  disabled = false,
  style,
}: RadioGroupProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.base, style]}>
      {label ? <Text variant="label">{label}</Text> : null}
      <View style={styles.options}>
        {options.map(option => {
          const checked = option.value === value;
          const isDisabled = disabled || option.disabled;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked, disabled: isDisabled }}
              disabled={isDisabled}
              key={option.value}
              onPress={() => onValueChange?.(option.value)}
              style={[styles.option, isDisabled && styles.optionDisabled]}
            >
              <View style={[styles.control, checked && styles.controlChecked]}>
                {checked ? (
                  <Text tone={checked ? 'accent' : 'primary'} variant="label">
                    ●
                  </Text>
                ) : null}
              </View>
              <View style={styles.copy}>
                <Text variant="bodyStrong">{option.label}</Text>
                {option.description ? (
                  <Text tone="secondary" variant="caption">
                    {option.description}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      gap: theme.spacing[2],
      width: '100%',
    },
    options: {
      gap: theme.spacing[3],
      width: '100%',
    },
    option: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: theme.spacing[3],
      width: '100%',
    },
    optionDisabled: {
      opacity: 0.6,
    },
    control: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface.base,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      height: 24,
      justifyContent: 'center',
      marginTop: 2,
      width: 24,
    },
    controlChecked: {
      borderColor: theme.colors.border.accent,
    },
    copy: {
      flex: 1,
      gap: theme.spacing[1],
    },
  })
);
