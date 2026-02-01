/**
 * 테마 프리셋 정의 (Platform Minimal 기반)
 * SPEC-UI-003: Theme Preset System
 * [TAG-UI003-055]
 *
 * Tekton MCP platform-minimal 테마를 기반으로 재구성
 */

export interface ThemePreset {
  id: string;
  name: string;
  category: 'color' | 'typography' | 'spacing';
  values: Record<string, string>;
}

/**
 * Color Presets (3개) - Platform Minimal 기반
 * [TAG-UI003-007] 프리셋 선택 시 CSS Variables 즉시 업데이트
 */
export const colorPresets: ThemePreset[] = [
  {
    id: 'color-platform-minimal',
    name: 'Platform Minimal',
    category: 'color',
    values: {
      // Brand Color (보라색 계열)
      '--tekton-color-brand': 'oklch(0.6 0.16 260)',

      // Background
      '--tekton-bg-canvas': 'oklch(0.98 0.005 150)',
      '--tekton-bg-surface': 'oklch(1 0 0)',
      '--tekton-bg-surface-subtle': 'oklch(0.98 0.005 150)',
      '--tekton-bg-emphasis': 'oklch(0.2 0.005 150)',

      // Border
      '--tekton-border-subtle': 'oklch(0.95 0.005 150)',
      '--tekton-border-default': 'oklch(0.89 0.005 150)',
      '--tekton-border-emphasis': 'oklch(0.75 0.005 150)',

      // Text
      '--tekton-text-primary': 'oklch(0.2 0.005 150)',
      '--tekton-text-secondary': 'oklch(0.5 0.005 150)',
      '--tekton-text-brand': 'oklch(0.6 0.16 260)',
      '--tekton-text-inverse': 'oklch(1 0 0)',

      // Icon
      '--tekton-icon-default': 'oklch(0.2 0.005 150)',
      '--tekton-icon-secondary': 'oklch(0.5 0.005 150)',
      '--tekton-icon-brand': 'oklch(0.6 0.16 260)',

      // Action (Button)
      '--tekton-action-primary': 'oklch(0.2 0.005 150)',
      '--tekton-action-primary-text': 'oklch(1 0 0)',
      '--tekton-action-disabled': 'oklch(0.75 0.005 150)',
      '--tekton-action-disabled-text': 'oklch(0.5 0.005 150)',
    },
  },
  {
    id: 'color-platform-warm',
    name: 'Platform Warm',
    category: 'color',
    values: {
      // Brand Color (따뜻한 주황색 계열)
      '--tekton-color-brand': 'oklch(0.65 0.18 40)',

      // Background (따뜻한 톤)
      '--tekton-bg-canvas': 'oklch(0.98 0.01 50)',
      '--tekton-bg-surface': 'oklch(1 0 0)',
      '--tekton-bg-surface-subtle': 'oklch(0.98 0.01 50)',
      '--tekton-bg-emphasis': 'oklch(0.25 0.02 40)',

      // Border
      '--tekton-border-subtle': 'oklch(0.95 0.01 50)',
      '--tekton-border-default': 'oklch(0.89 0.01 50)',
      '--tekton-border-emphasis': 'oklch(0.75 0.02 50)',

      // Text
      '--tekton-text-primary': 'oklch(0.25 0.02 40)',
      '--tekton-text-secondary': 'oklch(0.5 0.02 40)',
      '--tekton-text-brand': 'oklch(0.65 0.18 40)',
      '--tekton-text-inverse': 'oklch(1 0 0)',

      // Icon
      '--tekton-icon-default': 'oklch(0.25 0.02 40)',
      '--tekton-icon-secondary': 'oklch(0.5 0.02 40)',
      '--tekton-icon-brand': 'oklch(0.65 0.18 40)',

      // Action
      '--tekton-action-primary': 'oklch(0.65 0.18 40)',
      '--tekton-action-primary-text': 'oklch(1 0 0)',
      '--tekton-action-disabled': 'oklch(0.75 0.02 50)',
      '--tekton-action-disabled-text': 'oklch(0.5 0.02 40)',
    },
  },
  {
    id: 'color-platform-cool',
    name: 'Platform Cool',
    category: 'color',
    values: {
      // Brand Color (차가운 파란색 계열)
      '--tekton-color-brand': 'oklch(0.6 0.16 220)',

      // Background (차가운 톤)
      '--tekton-bg-canvas': 'oklch(0.98 0.008 220)',
      '--tekton-bg-surface': 'oklch(1 0 0)',
      '--tekton-bg-surface-subtle': 'oklch(0.98 0.008 220)',
      '--tekton-bg-emphasis': 'oklch(0.2 0.01 220)',

      // Border
      '--tekton-border-subtle': 'oklch(0.95 0.008 220)',
      '--tekton-border-default': 'oklch(0.89 0.008 220)',
      '--tekton-border-emphasis': 'oklch(0.75 0.01 220)',

      // Text
      '--tekton-text-primary': 'oklch(0.2 0.01 220)',
      '--tekton-text-secondary': 'oklch(0.5 0.01 220)',
      '--tekton-text-brand': 'oklch(0.6 0.16 220)',
      '--tekton-text-inverse': 'oklch(1 0 0)',

      // Icon
      '--tekton-icon-default': 'oklch(0.2 0.01 220)',
      '--tekton-icon-secondary': 'oklch(0.5 0.01 220)',
      '--tekton-icon-brand': 'oklch(0.6 0.16 220)',

      // Action
      '--tekton-action-primary': 'oklch(0.6 0.16 220)',
      '--tekton-action-primary-text': 'oklch(1 0 0)',
      '--tekton-action-disabled': 'oklch(0.75 0.01 220)',
      '--tekton-action-disabled-text': 'oklch(0.5 0.01 220)',
    },
  },
];

/**
 * Typography Presets (3개) - Platform Minimal 기반
 */
export const typographyPresets: ThemePreset[] = [
  {
    id: 'typo-platform-sans',
    name: 'Platform Sans',
    category: 'typography',
    values: {
      '--tekton-font-family': 'Inter, sans-serif',
      '--tekton-font-family-display': 'Inter Display, sans-serif',
      '--tekton-font-size-base': '16px',
      '--tekton-font-weight-regular': '400',
      '--tekton-font-weight-medium': '500',
      '--tekton-font-weight-bold': '700',
      '--tekton-line-height': '1.5',
    },
  },
  {
    id: 'typo-platform-serif',
    name: 'Platform Serif',
    category: 'typography',
    values: {
      '--tekton-font-family': 'Georgia, Times, serif',
      '--tekton-font-family-display': 'Georgia, serif',
      '--tekton-font-size-base': '16px',
      '--tekton-font-weight-regular': '400',
      '--tekton-font-weight-medium': '500',
      '--tekton-font-weight-bold': '700',
      '--tekton-line-height': '1.6',
    },
  },
  {
    id: 'typo-platform-mono',
    name: 'Platform Mono',
    category: 'typography',
    values: {
      '--tekton-font-family': 'JetBrains Mono, monospace',
      '--tekton-font-family-display': 'JetBrains Mono, monospace',
      '--tekton-font-size-base': '14px',
      '--tekton-font-weight-regular': '400',
      '--tekton-font-weight-medium': '500',
      '--tekton-font-weight-bold': '700',
      '--tekton-line-height': '1.5',
    },
  },
];

/**
 * Spacing Presets (3개) - Platform Minimal 기반
 */
export const spacingPresets: ThemePreset[] = [
  {
    id: 'spacing-platform-compact',
    name: 'Platform Compact',
    category: 'spacing',
    values: {
      '--tekton-spacing-unit': '4px',
      '--tekton-spacing-0': '0',
      '--tekton-spacing-1': '4px',
      '--tekton-spacing-2': '8px',
      '--tekton-spacing-3': '12px',
      '--tekton-spacing-4': '16px',
      '--tekton-spacing-5': '20px',
      '--tekton-spacing-6': '24px',
      '--tekton-spacing-8': '32px',
      '--tekton-spacing-10': '40px',
      '--tekton-spacing-12': '48px',
      '--tekton-radius-xs': '2px',
      '--tekton-radius-sm': '4px',
      '--tekton-radius-md': '8px',
      '--tekton-radius-lg': '8px',
      '--tekton-radius-xl': '12px',
    },
  },
  {
    id: 'spacing-platform-standard',
    name: 'Platform Standard',
    category: 'spacing',
    values: {
      '--tekton-spacing-unit': '4px',
      '--tekton-spacing-0': '0',
      '--tekton-spacing-1': '5px',
      '--tekton-spacing-2': '10px',
      '--tekton-spacing-3': '15px',
      '--tekton-spacing-4': '20px',
      '--tekton-spacing-5': '25px',
      '--tekton-spacing-6': '30px',
      '--tekton-spacing-8': '40px',
      '--tekton-spacing-10': '50px',
      '--tekton-spacing-12': '60px',
      '--tekton-radius-xs': '2px',
      '--tekton-radius-sm': '4px',
      '--tekton-radius-md': '8px',
      '--tekton-radius-lg': '12px',
      '--tekton-radius-xl': '16px',
    },
  },
  {
    id: 'spacing-platform-spacious',
    name: 'Platform Spacious',
    category: 'spacing',
    values: {
      '--tekton-spacing-unit': '4px',
      '--tekton-spacing-0': '0',
      '--tekton-spacing-1': '6px',
      '--tekton-spacing-2': '12px',
      '--tekton-spacing-3': '18px',
      '--tekton-spacing-4': '24px',
      '--tekton-spacing-5': '30px',
      '--tekton-spacing-6': '36px',
      '--tekton-spacing-8': '48px',
      '--tekton-spacing-10': '60px',
      '--tekton-spacing-12': '72px',
      '--tekton-radius-xs': '4px',
      '--tekton-radius-sm': '8px',
      '--tekton-radius-md': '12px',
      '--tekton-radius-lg': '16px',
      '--tekton-radius-xl': '24px',
    },
  },
];

/**
 * Motion Presets (Platform Minimal 모션 시스템)
 */
export const motionValues = {
  // Duration
  '--tekton-duration-instant': '0ms',
  '--tekton-duration-micro': '50ms',
  '--tekton-duration-quick': '100ms',
  '--tekton-duration-short': '150ms',
  '--tekton-duration-standard': '150ms',
  '--tekton-duration-moderate': '200ms',
  '--tekton-duration-medium': '300ms',
  '--tekton-duration-deliberate': '300ms',
  '--tekton-duration-slow': '400ms',
  '--tekton-duration-long': '450ms',
  '--tekton-duration-complex': '500ms',

  // Easing
  '--tekton-easing-linear': 'linear',
  '--tekton-easing-standard': 'cubic-bezier(0.2, 0, 0, 1)',
  '--tekton-easing-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
  '--tekton-easing-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
  '--tekton-easing-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
  '--tekton-easing-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

/**
 * Elevation Presets (Platform Minimal 그림자 시스템)
 */
export const elevationValues = {
  '--tekton-elevation-0': 'none',
  '--tekton-elevation-1': '0 2px 8px rgba(0,0,0,0.04)',
  '--tekton-elevation-2': '0 4px 16px rgba(0,0,0,0.08)',
  '--tekton-elevation-3': '0 8px 32px rgba(0,0,0,0.12)',
};

/**
 * State Layer (Platform Minimal 상태 레이어)
 */
export const stateLayerValues = {
  '--tekton-state-hover-opacity': '0.08',
  '--tekton-state-disabled-opacity': '0.38',
  '--tekton-state-disabled-content-opacity': '0.38',
};

/**
 * 프리셋 ID로 검색
 */
export function getPresetById(id: string): ThemePreset | undefined {
  const allPresets = [...colorPresets, ...typographyPresets, ...spacingPresets];
  return allPresets.find((preset) => preset.id === id);
}

/**
 * 카테고리별 프리셋 검색
 */
export function getPresetsByCategory(
  category: 'color' | 'typography' | 'spacing',
): ThemePreset[] {
  switch (category) {
    case 'color':
      return colorPresets;
    case 'typography':
      return typographyPresets;
    case 'spacing':
      return spacingPresets;
  }
}
