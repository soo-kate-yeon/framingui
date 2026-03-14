import { StyleSheet, Text, View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';

export type InlineMessageTone = 'error' | 'info' | 'success';

export interface InlineMessageProps {
  message: string;
  tone?: InlineMessageTone;
}

export function InlineMessage({ message, tone = 'info' }: InlineMessageProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.base, tone === 'error' && styles.error]}>
      <Text style={[styles.text, tone === 'error' && styles.errorText]}>{message}</Text>
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.colors.background.subtle,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[3],
    },
    error: {
      backgroundColor: theme.colors.surface.danger,
      borderColor: theme.colors.border.danger,
      borderWidth: 1,
    },
    text: {
      ...theme.typography.caption,
      color: theme.colors.text.primary,
    },
    errorText: {
      color: theme.colors.text.danger,
    },
  })
);
