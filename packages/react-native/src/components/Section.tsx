import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { getSectionGapStyle, type SectionGapToken } from '../layout.js';
import { createThemedStyles, useTheme } from '../theme.js';

export interface SectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  gap?: SectionGapToken;
  style?: StyleProp<ViewStyle>;
}

export function Section({ children, title, description, gap = 'default', style }: SectionProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.base, getSectionGapStyle(gap, theme), style]}>
      {title || description ? (
        <View style={styles.copy}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      width: '100%',
    },
    copy: {
      gap: theme.spacing[1],
      width: '100%',
    },
    title: {
      ...theme.typography.sectionTitle,
      color: theme.colors.text.primary,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.text.secondary,
    },
  })
);
