const DEFAULT_APP_ORIGIN = 'https://framingui.com';
const LEGACY_HOSTS = new Set(['tekton-ui.com', 'www.tekton-ui.com']);

interface NormalizeResult {
  origin: string | null;
  reason?: string;
}

export interface ResolvedAppOrigin {
  origin: string;
  source: 'configured' | 'request' | 'default';
  reasons: string[];
}

function normalizeOrigin(rawUrl: string | null | undefined, label: string): NormalizeResult {
  if (!rawUrl || rawUrl.trim().length === 0) {
    return { origin: null };
  }

  const raw = rawUrl.trim();

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();

    if (LEGACY_HOSTS.has(host)) {
      return {
        origin: DEFAULT_APP_ORIGIN,
        reason: `${label} host "${parsed.hostname}" is legacy and was migrated to "${DEFAULT_APP_ORIGIN}".`,
      };
    }

    const origin = parsed.origin;
    if (origin !== raw) {
      return {
        origin,
        reason: `${label} URL "${raw}" was normalized to origin "${origin}".`,
      };
    }

    return { origin };
  } catch {
    return {
      origin: null,
      reason: `${label} URL "${raw}" is invalid and was ignored.`,
    };
  }
}

function isLocalhostOrigin(origin: string | null): boolean {
  if (!origin) {
    return false;
  }

  try {
    const parsed = new URL(origin);
    return (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === '::1'
    );
  } catch {
    return false;
  }
}

/**
 * OAuth redirectTo로 사용할 앱 origin을 결정한다.
 *
 * 우선순위:
 * 1) request origin이 localhost면 request origin (로컬 개발 보존)
 * 2) NEXT_PUBLIC_APP_URL
 * 3) request origin
 * 4) 기본값 https://framingui.com
 */
export function resolveAppOrigin(
  requestOrigin: string,
  configuredAppUrl?: string
): ResolvedAppOrigin {
  const reasons: string[] = [];
  const requestNormalized = normalizeOrigin(requestOrigin, 'request');
  const configuredNormalized = normalizeOrigin(configuredAppUrl, 'configured');

  if (requestNormalized.reason) {
    reasons.push(requestNormalized.reason);
  }
  if (configuredNormalized.reason) {
    reasons.push(configuredNormalized.reason);
  }

  if (isLocalhostOrigin(requestNormalized.origin)) {
    return {
      origin: requestNormalized.origin!,
      source: 'request',
      reasons,
    };
  }

  if (configuredNormalized.origin) {
    return {
      origin: configuredNormalized.origin,
      source: 'configured',
      reasons,
    };
  }

  if (requestNormalized.origin) {
    return {
      origin: requestNormalized.origin,
      source: 'request',
      reasons,
    };
  }

  reasons.push(`No valid origin detected. Falling back to "${DEFAULT_APP_ORIGIN}".`);
  return {
    origin: DEFAULT_APP_ORIGIN,
    source: 'default',
    reasons,
  };
}
