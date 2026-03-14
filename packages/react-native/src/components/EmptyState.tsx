import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function EmptyState({ title, description, action, icon, style }: EmptyStateProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.base, style]}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.copy}>
        <Text variant="sectionTitle">{title}</Text>
        {description ? (
          <Text tone="secondary" variant="body">
            {description}
          </Text>
        ) : null}
      </View>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      backgroundColor: theme.colors.background.subtle,
      borderColor: theme.colors.border.subtle,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      gap: theme.spacing[4],
      padding: theme.spacing[5],
      width: '100%',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    copy: {
      alignItems: 'center',
      gap: theme.spacing[2],
    },
    action: {
      minWidth: 200,
    },
  })
);
