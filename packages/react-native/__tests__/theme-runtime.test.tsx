import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Pressable, Text, View } from 'react-native';
import { describe, expect, it } from 'vitest';
import {
  Button,
  Screen,
  ThemeProvider,
  createTheme,
  createThemedStyles,
  defaultTheme,
  useTheme,
} from '../src/index.js';

function flattenStyle(style: unknown): Record<string, unknown> {
  if (typeof style === 'function') {
    return flattenStyle(style({ pressed: false }));
  }

  if (Array.isArray(style)) {
    return style.filter(Boolean).reduce<Record<string, unknown>>((acc, item) => {
      if (item && typeof item === 'object') {
        Object.assign(acc, item as Record<string, unknown>);
      }
      return acc;
    }, {});
  }

  return (style as Record<string, unknown>) ?? {};
}

describe('@framingui/react-native theme runtime', () => {
  it('creates a resolved runtime theme from partial input overrides', () => {
    const theme = createTheme({
      id: 'sunset',
      colors: {
        action: {
          primary: '#FF5A36',
        },
      },
      spacing: {
        4: 18,
      },
    });

    expect(theme.id).toBe('sunset');
    expect(theme.colors.action.primary).toBe('#FF5A36');
    expect(theme.spacing[4]).toBe(18);
    expect(theme.colors.text.primary).toBe(defaultTheme.colors.text.primary);
  });

  it('provides runtime theme values through ThemeProvider and useTheme', () => {
    const theme = createTheme({
      id: 'forest',
      colors: {
        background: {
          canvas: '#E7FFF1',
        },
      },
    });

    function Probe() {
      const currentTheme = useTheme();
      return (
        <View
          testID="probe"
          themeId={currentTheme.id}
          style={{ backgroundColor: currentTheme.colors.background.canvas }}
        />
      );
    }

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <Probe />
      </ThemeProvider>
    );

    const probe = tree.root.findByProps({ testID: 'probe' });
    expect(probe.props.themeId).toBe('forest');
    expect(probe.props.style.backgroundColor).toBe('#E7FFF1');
  });

  it('creates StyleSheet-friendly themed styles from resolved theme values', () => {
    const theme = createTheme({
      colors: {
        background: {
          canvas: '#F0F4FF',
        },
      },
      spacing: {
        6: 28,
      },
    });

    const getStyles = createThemedStyles(currentTheme => ({
      container: {
        backgroundColor: currentTheme.colors.background.canvas,
        paddingHorizontal: currentTheme.spacing[6],
      },
    }));

    expect(getStyles(theme).container).toEqual({
      backgroundColor: '#F0F4FF',
      paddingHorizontal: 28,
    });
  });

  it('applies provider theme values to base primitives', () => {
    const theme = createTheme({
      colors: {
        action: {
          primary: '#FF5A36',
        },
        text: {
          inverse: '#101010',
        },
        background: {
          canvas: '#FFF5F0',
        },
      },
      typography: {
        button: {
          fontSize: 18,
          lineHeight: 22,
          fontWeight: '700',
        },
      },
    });

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <Screen scroll={false}>
          <Button label="Continue" />
        </Screen>
      </ThemeProvider>
    );

    const screenView = tree.root.findAllByType(View)[0];
    const pressable = tree.root.findByType(Pressable);
    const textNode = tree.root.findByType(Text);

    expect(flattenStyle(screenView.props.style).backgroundColor).toBe('#FFF5F0');
    expect(flattenStyle(pressable.props.style).backgroundColor).toBe('#FF5A36');
    expect(flattenStyle(textNode.props.style).color).toBe('#101010');
    expect(flattenStyle(textNode.props.style).fontSize).toBe(18);
  });
});
