import type { ViewStyle } from 'react-native';
import { defaultTheme, type ReactNativeTheme } from './theme.js';

export type ScreenInsetToken = 'none' | 'compact' | 'default' | 'roomy';
export type SectionGapToken = 'tight' | 'default' | 'loose';
export type ContentWidthToken = 'full' | 'form' | 'prose';
export type FormRhythmToken = 'compact' | 'default' | 'comfortable';
export type SafeAreaPresetToken = 'none' | 'compact' | 'default';

export interface ScreenInsetValue {
  horizontal: number;
  top: number;
  bottom: number;
}

export interface FormRhythmValue {
  fieldGap: number;
  helperGap: number;
  sectionGap: number;
}

export interface SafeAreaPresetValue {
  top: number;
  bottom: number;
  horizontal: number;
}

export interface ReactNativeLayoutTokens {
  screenInset: Record<ScreenInsetToken, ScreenInsetValue>;
  sectionGap: Record<SectionGapToken, number>;
  contentWidth: Record<ContentWidthToken, number | null>;
  formRhythm: Record<FormRhythmToken, FormRhythmValue>;
  safeArea: Record<SafeAreaPresetToken, SafeAreaPresetValue>;
}

export function resolveLayoutTokens(
  theme: ReactNativeTheme = defaultTheme
): ReactNativeLayoutTokens {
  return {
    screenInset: {
      none: { horizontal: 0, top: 0, bottom: 0 },
      compact: {
        horizontal: theme.spacing[4],
        top: theme.spacing[4],
        bottom: theme.spacing[5],
      },
      default: {
        horizontal: theme.spacing[6],
        top: theme.spacing[6],
        bottom: theme.spacing[8],
      },
      roomy: {
        horizontal: theme.spacing[8],
        top: theme.spacing[8],
        bottom: theme.spacing[10],
      },
    },
    sectionGap: {
      tight: theme.spacing[3],
      default: theme.spacing[4],
      loose: theme.spacing[6],
    },
    contentWidth: {
      full: null,
      form: 480,
      prose: 680,
    },
    formRhythm: {
      compact: {
        fieldGap: theme.spacing[2],
        helperGap: theme.spacing[1],
        sectionGap: theme.spacing[4],
      },
      default: {
        fieldGap: theme.spacing[3],
        helperGap: theme.spacing[2],
        sectionGap: theme.spacing[5],
      },
      comfortable: {
        fieldGap: theme.spacing[4],
        helperGap: theme.spacing[2],
        sectionGap: theme.spacing[6],
      },
    },
    safeArea: {
      none: { top: 0, bottom: 0, horizontal: 0 },
      compact: {
        top: theme.spacing[3],
        bottom: theme.spacing[4],
        horizontal: theme.spacing[4],
      },
      default: {
        top: theme.spacing[4],
        bottom: theme.spacing[6],
        horizontal: theme.spacing[6],
      },
    },
  };
}

export function getScreenInsetStyle(
  token: ScreenInsetToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'paddingHorizontal' | 'paddingTop' | 'paddingBottom'> {
  const value = resolveLayoutTokens(theme).screenInset[token];
  return {
    paddingHorizontal: value.horizontal,
    paddingTop: value.top,
    paddingBottom: value.bottom,
  };
}

export function getSectionGapStyle(
  token: SectionGapToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'gap'> {
  return { gap: resolveLayoutTokens(theme).sectionGap[token] };
}

export function getContentWidthStyle(
  token: ContentWidthToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'maxWidth' | 'width' | 'alignSelf'> {
  const maxWidth = resolveLayoutTokens(theme).contentWidth[token];
  return {
    alignSelf: maxWidth ? 'center' : 'auto',
    maxWidth: maxWidth ?? undefined,
    width: '100%',
  };
}

export function getFormRhythm(
  token: FormRhythmToken,
  theme: ReactNativeTheme = defaultTheme
): FormRhythmValue {
  return resolveLayoutTokens(theme).formRhythm[token];
}

export function getSafeAreaPaddingStyle(
  token: SafeAreaPresetToken,
  theme: ReactNativeTheme = defaultTheme
): Pick<ViewStyle, 'paddingTop' | 'paddingBottom' | 'paddingHorizontal'> {
  const value = resolveLayoutTokens(theme).safeArea[token];
  return {
    paddingBottom: value.bottom,
    paddingHorizontal: value.horizontal,
    paddingTop: value.top,
  };
}
