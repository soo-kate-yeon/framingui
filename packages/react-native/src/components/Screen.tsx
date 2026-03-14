import type { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  getContentWidthStyle,
  getSafeAreaPaddingStyle,
  getScreenInsetStyle,
  type ContentWidthToken,
  type SafeAreaPresetToken,
  type ScreenInsetToken,
} from '../layout.js';
import { createThemedStyles, useTheme } from '../theme.js';

export interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  centered?: boolean;
  padded?: boolean;
  width?: 'full' | 'narrow';
  inset?: ScreenInsetToken;
  safeArea?: SafeAreaPresetToken;
  contentWidth?: ContentWidthToken;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = true,
  centered = false,
  padded = true,
  width = 'full',
  inset,
  safeArea = 'none',
  contentWidth,
  style,
  contentStyle,
}: ScreenProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const insetStyle = getScreenInsetStyle(inset ?? (padded ? 'default' : 'none'), theme);
  const contentWidthStyle = getContentWidthStyle(
    contentWidth ?? (width === 'narrow' ? 'form' : 'full')
  );
  const safeAreaStyle = getSafeAreaPaddingStyle(safeArea, theme);

  const content = (
    <View
      style={[
        styles.content,
        centered && styles.centered,
        insetStyle,
        contentWidthStyle,
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  if (!scroll) {
    return <View style={[styles.base, safeAreaStyle, style]}>{content}</View>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={[styles.base, safeAreaStyle, style]}
    >
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
  })
);
