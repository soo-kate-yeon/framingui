import type { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';

export interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  centered?: boolean;
  padded?: boolean;
  width?: 'full' | 'narrow';
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = true,
  centered = false,
  padded = true,
  width = 'full',
  style,
  contentStyle,
}: ScreenProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const content = (
    <View
      style={[
        styles.content,
        centered && styles.centered,
        padded && styles.padded,
        width === 'narrow' && styles.narrow,
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  if (!scroll) {
    return <View style={[styles.base, style]}>{content}</View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={[styles.base, style]}>
      {content}
    </ScrollView>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.colors.background.canvas,
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      width: '100%',
    },
    centered: {
      justifyContent: 'center',
    },
    padded: {
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[8],
    },
    narrow: {
      alignSelf: 'center',
      maxWidth: 480,
    },
  })
);
