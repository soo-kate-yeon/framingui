/**
 * 사용자 데이터 타입 정의
 * SPEC-UI-003: WebView Studio MVP User Data Model
 * [TAG-UI003-057]
 */

/**
 * 기본 사용자 정보
 */
export interface User {
  /** 사용자 고유 ID */
  id: string;

  /** 이메일 주소 */
  email: string;

  /** 사용자 이름 */
  name: string;

  /** 프로필 이미지 URL (선택적) */
  image?: string;

  /** OAuth 제공자 */
  provider: 'google' | 'github';

  /** 계정 생성 일시 */
  createdAt: Date;

  /** 최종 업데이트 일시 */
  updatedAt: Date;
}

/**
 * 사용자 데이터 (라이선스, 저장된 테마 등)
 */
export interface UserData {
  /** 사용자 ID */
  userId: string;

  /** 구매한 템플릿 라이선스 배열 */
  licenses: License[];

  /** 좋아요한 템플릿 ID 배열 */
  likedTemplates: string[];

  /** 저장된 테마 설정 배열 */
  savedThemes: SavedTheme[];
}

/**
 * 템플릿 라이선스 정보
 */
export interface License {
  /** 라이선스 고유 ID */
  id: string;

  /** 템플릿 ID */
  templateId: string;

  /** 라이선스 키 (암호화 저장) */
  key: string;

  /** 구매 일시 */
  purchasedAt: Date;

  /** 만료 일시 (선택적, 영구 라이선스는 undefined) */
  expiresAt?: Date;

  /** 라이선스 상태 */
  status: 'active' | 'expired' | 'revoked';
}

/**
 * 저장된 테마 설정
 */
export interface SavedTheme {
  /** 테마 고유 ID */
  id: string;

  /** 템플릿 ID */
  templateId: string;

  /** 테마 이름 (사용자 정의) */
  name: string;

  /** 테마 설정 JSON */
  config: ThemeConfigJSON;

  /** 생성 일시 */
  createdAt: Date;

  /** 최종 업데이트 일시 */
  updatedAt: Date;
}

/**
 * 테마 설정 JSON 포맷
 * MCP 도구 연동용 [TAG-UI003-013]
 */
export interface ThemeConfigJSON {
  /** 스키마 버전 */
  version: string;

  /** 선택된 프리셋 */
  presets: {
    /** Color Preset ID */
    color: string;

    /** Typography Preset ID */
    typography: string;

    /** Spacing Preset ID */
    spacing: string;
  };

  /** 사용자 정의 오버라이드 (CSS Variable 이름 → 값) */
  overrides: Record<string, string>;

  /** 내보내기 일시 (ISO 8601) */
  exportedAt: string;
}

/**
 * NextAuth 세션 확장
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      licenses: License[];
      likedTemplates: string[];
      savedThemes: SavedTheme[];
      userId: string;
    };
  }
}
