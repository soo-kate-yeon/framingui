import type { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { createThemedStyles, useTheme } from '../theme.js';
import { Text } from './Text.js';

export interface ListItemProps {
  title: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ListItem({ title, description, leading, trailing, onPress, style }: ListItemProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const Container = onPress ? Pressable : View;

  return (
    <Container
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={[styles.base, onPress && styles.pressable, style as ViewStyle]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.copy}>
        <Text variant="bodyStrong">{title}</Text>
        {description ? (
          <Text tone="secondary" variant="caption">
            {description}
          </Text>
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </Container>
  );
}

const getStyles = createThemedStyles(theme =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing[3],
      width: '100%',
    },
    pressable: {
      borderRadius: theme.radius.md,
      paddingVertical: theme.spacing[1],
    },
    leading: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    copy: {
      flex: 1,
      gap: theme.spacing[1],
    },
    trailing: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  })
);
