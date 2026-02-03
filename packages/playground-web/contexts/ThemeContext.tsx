/**
 * 테마 컨텍스트
 * SPEC-UI-003: Theme State Management
 * [TAG-UI003-053]
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  colorPresets,
  typographyPresets,
  spacingPresets,
  motionValues,
  elevationValues,
  stateLayerValues,
} from '@/lib/presets';
import type { ThemeConfigJSON } from '@/lib/types/user';

/**
 * 테마 상태 인터페이스
 */
interface ThemeState {
  /** 색상 프리셋 ID */
  colorPreset: string;

  /** 타이포그래피 프리셋 ID */
  typographyPreset: string;

  /** 간격 프리셋 ID */
  spacingPreset: string;

  /** 사용자 정의 오버라이드 */
  customOverrides: Record<string, string>;
}

/**
 * 테마 컨텍스트 값 인터페이스
 */
interface ThemeContextValue {
  /** 현재 테마 상태 */
  theme: ThemeState;

  /** 색상 프리셋 설정 */
  setColorPreset: (id: string) => void;

  /** 타이포그래피 프리셋 설정 */
  setTypographyPreset: (id: string) => void;

  /** 간격 프리셋 설정 */
  setSpacingPreset: (id: string) => void;

  /** 사용자 정의 오버라이드 설정 */
  setCustomOverride: (key: string, value: string) => void;

  /** 테마 적용 (CSS Variables 업데이트) [TAG-UI003-007] */
  applyTheme: () => void;

  /** 테마 MCP JSON 내보내기 [TAG-UI003-013] */
  exportTheme: () => ThemeConfigJSON;

  /** 테마 기본값으로 재설정 */
  resetTheme: () => void;
}

/**
 * 기본 테마 상태 (Round Minimal 기반)
 */
const DEFAULT_THEME: ThemeState = {
  colorPreset: 'color-round-minimal',
  typographyPreset: 'typo-round-minimal',
  spacingPreset: 'spacing-round-minimal',
  customOverrides: {},
};

/**
 * 테마 컨텍스트 생성
 */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * 테마 Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 테마 Provider 컴포넌트
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME);

  /**
   * 색상 프리셋 설정
   */
  const setColorPreset = useCallback((id: string) => {
    setTheme((prev) => ({ ...prev, colorPreset: id }));
  }, []);

  /**
   * 타이포그래피 프리셋 설정
   */
  const setTypographyPreset = useCallback((id: string) => {
    setTheme((prev) => ({ ...prev, typographyPreset: id }));
  }, []);

  /**
   * 간격 프리셋 설정
   */
  const setSpacingPreset = useCallback((id: string) => {
    setTheme((prev) => ({ ...prev, spacingPreset: id }));
  }, []);

  /**
   * 사용자 정의 오버라이드 설정
   */
  const setCustomOverride = useCallback((key: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      customOverrides: {
        ...prev.customOverrides,
        [key]: value,
      },
    }));
  }, []);

  /**
   * CSS Variables 즉시 적용
   * [TAG-UI003-007] WHEN 프리셋이 선택되면 THEN CSS Variables가 즉시 업데이트
   */
  const applyTheme = useCallback(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // 각 카테고리별 프리셋 값 가져오기
    const colorPresetValues =
      colorPresets.find((p) => p.id === theme.colorPreset)?.values || {};
    const typographyPresetValues =
      typographyPresets.find((p) => p.id === theme.typographyPreset)?.values || {};
    const spacingPresetValues =
      spacingPresets.find((p) => p.id === theme.spacingPreset)?.values || {};

    // 모든 CSS Variables 병합 (customOverrides가 최종 우선순위)
    const allVariables = {
      ...colorPresetValues,
      ...typographyPresetValues,
      ...spacingPresetValues,
      ...motionValues, // Platform Minimal 모션 시스템
      ...elevationValues, // Platform Minimal 그림자 시스템
      ...stateLayerValues, // Platform Minimal 상태 레이어
      ...theme.customOverrides,
    };

    // CSS Variables 적용
    Object.entries(allVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  /**
   * MCP 형식 JSON 내보내기
   * [TAG-UI003-013] WHEN Export 버튼이 클릭되면 THEN MCP 형식의 JSON이 생성
   */
  const exportTheme = useCallback((): ThemeConfigJSON => {
    return {
      version: '1.0.0',
      presets: {
        color: theme.colorPreset,
        typography: theme.typographyPreset,
        spacing: theme.spacingPreset,
      },
      overrides: theme.customOverrides,
      exportedAt: new Date().toISOString(),
    };
  }, [theme]);

  /**
   * 테마 기본값으로 재설정
   */
  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME);
  }, []);

  /**
   * 테마 변경 시 자동으로 CSS Variables 적용
   * [TAG-UI003-007] WHEN 프리셋이 선택되면 THEN CSS Variables가 즉시 업데이트
   */
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  const value: ThemeContextValue = {
    theme,
    setColorPreset,
    setTypographyPreset,
    setSpacingPreset,
    setCustomOverride,
    applyTheme,
    exportTheme,
    resetTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * 테마 컨텍스트 Hook
 *
 * @returns 테마 컨텍스트 값
 * @throws ThemeContext가 Provider 외부에서 사용된 경우
 *
 * @example
 * ```tsx
 * function EditorPanel() {
 *   const { theme, setColorPreset, applyTheme, exportTheme } = useTheme();
 *
 *   const handlePresetChange = (id: string) => {
 *     setColorPreset(id);
 *     applyTheme();
 *   };
 *
 *   return <PresetSelector onSelect={handlePresetChange} />;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
