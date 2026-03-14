import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ScrollView, View } from 'react-native';
import { describe, expect, it } from 'vitest';
import {
  Screen,
  ThemeProvider,
  createTheme,
  getContentWidthStyle,
  getFormRhythm,
  getSafeAreaPaddingStyle,
  getScreenInsetStyle,
  getSectionGapStyle,
  resolveLayoutTokens,
} from '../src/index.js';

function flattenStyle(style: unknown): Record<string, unknown> {
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

describe('@framingui/react-native layout tokens', () => {
  it('resolves reusable layout groups from theme spacing values', () => {
    const theme = createTheme({
      spacing: {
        3: 14,
        4: 18,
        5: 22,
        6: 30,
        8: 42,
        10: 52,
      },
    });

    const layout = resolveLayoutTokens(theme);

    expect(layout.screenInset.default).toEqual({
      horizontal: 30,
      top: 30,
      bottom: 42,
    });
    expect(layout.sectionGap.tight).toBe(14);
    expect(layout.formRhythm.comfortable.sectionGap).toBe(30);
    expect(layout.safeArea.default.horizontal).toBe(30);
  });

  it('exports style helpers for inset, width, gaps, and safe area presets', () => {
    const theme = createTheme({
      spacing: {
        3: 10,
        4: 16,
        6: 28,
      },
    });

    expect(getScreenInsetStyle('compact', theme)).toEqual({
      paddingBottom: theme.spacing[5],
      paddingHorizontal: 16,
      paddingTop: 16,
    });
    expect(getSectionGapStyle('loose', theme)).toEqual({ gap: theme.spacing[6] });
    expect(getContentWidthStyle('prose')).toEqual({
      alignSelf: 'center',
      maxWidth: 680,
      width: '100%',
    });
    expect(getSafeAreaPaddingStyle('compact', theme)).toEqual({
      paddingBottom: 16,
      paddingHorizontal: 16,
      paddingTop: 10,
    });
    expect(getFormRhythm('default', theme)).toEqual({
      fieldGap: 10,
      helperGap: 8,
      sectionGap: theme.spacing[5],
    });
  });

  it('applies layout tokens to screen composition instead of fixed screen padding', () => {
    const theme = createTheme({
      colors: {
        background: {
          canvas: '#FBFBFF',
        },
      },
      spacing: {
        3: 12,
        4: 18,
        5: 24,
        6: 28,
        8: 40,
        10: 56,
      },
    });

    const tree = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <Screen contentWidth="prose" inset="roomy" safeArea="compact">
          <View testID="body" />
        </Screen>
      </ThemeProvider>
    );

    const scrollView = tree.root.findByType(ScrollView);
    const contentContainer = tree.root.findAllByType(View)[0];

    expect(flattenStyle(scrollView.props.style)).toMatchObject({
      backgroundColor: '#FBFBFF',
      paddingBottom: 18,
      paddingHorizontal: 18,
      paddingTop: 12,
    });
    expect(flattenStyle(contentContainer.props.style)).toMatchObject({
      alignSelf: 'center',
      maxWidth: 680,
      paddingBottom: 56,
      paddingHorizontal: 40,
      paddingTop: 40,
      width: '100%',
    });
  });
});
