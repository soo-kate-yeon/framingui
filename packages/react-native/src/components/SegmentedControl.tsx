import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface SegmentOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onValueChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedControl({ options, value, onValueChange, style }: SegmentedControlProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.base, style]}>
      {options.map(option => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option.value}
            onPress={() => onValueChange?.(option.value)}
            style={[styles.segment, selected && styles.segmentSelected]}
          >
            <Text tone={selected ? 'primary' : 'secondary'} variant="label">
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.colors.background.subtle,
      borderRadius: theme.radius.full,
      flexDirection: 'row',
      gap: theme.spacing[1],
      padding: theme.spacing[1],
      width: '100%',
    },
    segment: {
      alignItems: 'center',
      borderRadius: theme.radius.full,
      flex: 1,
      justifyContent: 'center',
      minHeight: 40,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
    },
    segmentSelected: {
      backgroundColor: theme.colors.surface.base,
      borderColor: theme.colors.border.default,
      borderWidth: 1,
    },
  })
);
