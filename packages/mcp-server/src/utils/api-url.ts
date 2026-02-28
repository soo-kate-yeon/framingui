/**
 * Framingui API URL resolver
 * - 기본 URL 적용
 * - 레거시 도메인 자동 마이그레이션
 * - 불필요한 path/query/hash 제거
 */

export const DEFAULT_API_URL = 'https://framingui.com';

const LEGACY_HOSTS = new Set(['tekton-ui.com', 'www.tekton-ui.com']);

export interface ApiUrlResolution {
  apiUrl: string;
  wasNormalized: boolean;
  reason?: string;
}

/**
 * FRAMINGUI_API_URL을 안전한 API 베이스 URL로 정규화
 */
export function resolveFraminguiApiUrl(rawApiUrl?: string | null): ApiUrlResolution {
  if (!rawApiUrl || rawApiUrl.trim().length === 0) {
    return {
      apiUrl: DEFAULT_API_URL,
      wasNormalized: false,
    };
  }

  const raw = rawApiUrl.trim();

  try {
    const parsed = new URL(raw);
    const normalizedHost = parsed.hostname.toLowerCase();

    // legacy 도메인에서 신규 도메인으로 자동 교체
    if (LEGACY_HOSTS.has(normalizedHost)) {
      return {
        apiUrl: DEFAULT_API_URL,
        wasNormalized: true,
        reason: `Legacy API host "${parsed.hostname}" was detected and migrated to "${DEFAULT_API_URL}".`,
      };
    }

    const normalizedOrigin = parsed.origin;
    if (normalizedOrigin !== raw) {
      return {
        apiUrl: normalizedOrigin,
        wasNormalized: true,
        reason: `API URL "${raw}" was normalized to origin "${normalizedOrigin}".`,
      };
    }

    return {
      apiUrl: normalizedOrigin,
      wasNormalized: false,
    };
  } catch {
    return {
      apiUrl: DEFAULT_API_URL,
      wasNormalized: true,
      reason: `Invalid API URL "${raw}" was replaced with default "${DEFAULT_API_URL}".`,
    };
  }
}
