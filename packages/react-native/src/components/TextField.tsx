import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  message?: string;
  invalid?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export function TextField({
  label,
  message,
  invalid = false,
  containerStyle,
  inputStyle,
  ...props
}: TextFieldProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={theme.colors.text.tertiary}
        style={[styles.input, invalid && styles.inputInvalid, inputStyle]}
        {...props}
      />
      {message ? (
        <Text style={[styles.message, invalid && styles.messageInvalid]}>{message}</Text>
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
    label: {
      ...theme.typography.label,
      color: theme.colors.text.primary,
    },
    input: {
      ...theme.typography.body,
      backgroundColor: theme.colors.surface.muted,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      color: theme.colors.text.primary,
      minHeight: 52,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
    },
    inputInvalid: {
      borderColor: theme.colors.border.danger,
    },
    message: {
      ...theme.typography.caption,
      color: theme.colors.text.secondary,
    },
    messageInvalid: {
      color: theme.colors.text.danger,
    },
  })
);
