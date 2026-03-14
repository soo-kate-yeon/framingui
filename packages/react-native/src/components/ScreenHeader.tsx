import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';

export interface ScreenHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  trailing?: ReactNode;
}

export function ScreenHeader({ title, description, eyebrow, trailing }: ScreenHeaderProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.base}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      gap: theme.spacing[4],
      justifyContent: 'space-between',
      width: '100%',
    },
    copy: {
      flex: 1,
      gap: theme.spacing[2],
    },
    eyebrow: {
      ...theme.typography.label,
      color: theme.colors.text.accent,
    },
    title: {
      ...theme.typography.title,
      color: theme.colors.text.primary,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.text.secondary,
    },
    trailing: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  })
);
