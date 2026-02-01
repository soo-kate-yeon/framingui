/**
 * Theme System Types for WebView Studio
 * [SPEC-UI-003][TAG-UI003-058]
 */

/**
 * 테마 프리셋 인터페이스
 */
export interface ThemePreset {
  /** 고유 ID (kebab-case) */
  id: string;
  /** 표시 이름 */
  name: string;
  /** 프리셋 카테고리 */
  category: 'color' | 'typography' | 'spacing';
  /** CSS Variable 값들 */
  values: Record<string, string>;
}

/**
 * 테마 상태 인터페이스
 */
export interface ThemeState {
  /** 선택된 컬러 프리셋 ID */
  colorPreset: string;
  /** 선택된 타이포그래피 프리셋 ID */
  typographyPreset: string;
  /** 선택된 spacing 프리셋 ID */
  spacingPreset: string;
  /** 커스텀 오버라이드 값들 */
  customOverrides: Record<string, string>;
}

/**
 * MCP 형식 테마 설정 JSON
 * [TAG-UI003-013]
 */
export interface ThemeConfigJSON {
  /** 버전 */
  version: string;
  /** 프리셋 선택 */
  presets: {
    color: string;
    typography: string;
    spacing: string;
  };
  /** 커스텀 오버라이드 */
  overrides: Record<string, string>;
  /** 내보낸 시각 (ISO 8601) */
  exportedAt: string;
}

/**
 * 저장된 테마 인터페이스
 */
export interface SavedTheme {
  /** 고유 ID */
  id: string;
  /** 템플릿 ID */
  templateId: string;
  /** 테마 이름 */
  name: string;
  /** 테마 설정 */
  config: ThemeConfigJSON;
  /** 생성 시각 */
  createdAt: Date;
  /** 수정 시각 */
  updatedAt: Date;
}

/**
 * 디바이스 타입
 * [TAG-UI003-023~025]
 */
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

/**
 * 디바이스별 너비 설정
 */
export interface DeviceWidths {
  desktop: number;
  tablet: number;
  mobile: number;
}
