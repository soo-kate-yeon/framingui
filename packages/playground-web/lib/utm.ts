/**
 * UTM Attribution Utilities
 *
 * WHY: 유입 채널(UTM) 데이터를 일관되게 저장/전달하기 위함
 * IMPACT: 퍼널 이벤트에서 first-touch 및 세션 단위 유입 정보를 함께 분석 가능
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;
export type InflowChannel = 'llms' | 'mcp' | 'x' | 'other';

interface StoredUtmPayload {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface UtmSnapshot {
  latest: UtmParams | null;
  firstTouch: UtmParams | null;
  sessionFirstTouch: UtmParams | null;
}

const FIRST_TOUCH_STORAGE_KEY = 'framingui.utm.first_touch';
const SESSION_TOUCH_STORAGE_KEY = 'framingui.utm.session_first_touch';

const DEFAULT_INFLOW_UTM: Record<'llms' | 'mcp' | 'x', Required<UtmParams>> = {
  llms: {
    utm_source: 'llms',
    utm_medium: 'referral',
    utm_campaign: 'agentic-discovery',
    utm_content: 'assistant-response',
    utm_term: 'framingui',
  },
  mcp: {
    utm_source: 'mcp',
    utm_medium: 'integration',
    utm_campaign: 'agentic-discovery',
    utm_content: 'mcp-tooling',
    utm_term: 'framingui',
  },
  x: {
    utm_source: 'x',
    utm_medium: 'social',
    utm_campaign: 'agentic-discovery',
    utm_content: 'post',
    utm_term: 'framingui',
  },
};

const isBrowser = (): boolean => typeof window !== 'undefined';

const readStoredUtm = (storage: Storage, key: string): UtmParams | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredUtmPayload;
    const result: UtmParams = {};

    for (const utmKey of UTM_KEYS) {
      const value = parsed[utmKey];
      if (typeof value === 'string' && value.length > 0) {
        result[utmKey] = value;
      }
    }

    return hasAnyUtm(result) ? result : null;
  } catch {
    return null;
  }
};

const writeStoredUtm = (storage: Storage, key: string, params: UtmParams): void => {
  try {
    storage.setItem(key, JSON.stringify(params));
  } catch {
    // 저장 실패 시에도 앱 동작은 계속되어야 함
  }
};

export const hasAnyUtm = (params: UtmParams | null): params is UtmParams => {
  if (!params) {
    return false;
  }
  return UTM_KEYS.some((key) => typeof params[key] === 'string' && (params[key] ?? '').length > 0);
};

export const extractUtmParams = (searchParams: URLSearchParams): UtmParams | null => {
  const result: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value && value.trim().length > 0) {
      result[key] = value.trim();
    }
  }

  return hasAnyUtm(result) ? result : null;
};

export const persistUtmAttribution = (searchParams: URLSearchParams): UtmSnapshot => {
  const latest = extractUtmParams(searchParams);

  if (!isBrowser()) {
    return {
      latest,
      firstTouch: null,
      sessionFirstTouch: null,
    };
  }

  const existingFirstTouch = readStoredUtm(window.localStorage, FIRST_TOUCH_STORAGE_KEY);
  const existingSessionTouch = readStoredUtm(window.sessionStorage, SESSION_TOUCH_STORAGE_KEY);

  const firstTouch = existingFirstTouch ?? latest;
  const sessionFirstTouch = existingSessionTouch ?? latest;

  if (!existingFirstTouch && latest) {
    writeStoredUtm(window.localStorage, FIRST_TOUCH_STORAGE_KEY, latest);
  }

  if (!existingSessionTouch && latest) {
    writeStoredUtm(window.sessionStorage, SESSION_TOUCH_STORAGE_KEY, latest);
  }

  return {
    latest,
    firstTouch,
    sessionFirstTouch,
  };
};

export const getPersistedUtmSnapshot = (): UtmSnapshot => {
  if (!isBrowser()) {
    return {
      latest: null,
      firstTouch: null,
      sessionFirstTouch: null,
    };
  }

  const latest = extractUtmParams(new URLSearchParams(window.location.search));
  const firstTouch = readStoredUtm(window.localStorage, FIRST_TOUCH_STORAGE_KEY);
  const sessionFirstTouch = readStoredUtm(window.sessionStorage, SESSION_TOUCH_STORAGE_KEY);

  return {
    latest,
    firstTouch,
    sessionFirstTouch,
  };
};

export const classifyInflowChannel = (source: string | null | undefined): InflowChannel => {
  if (!source) {
    return 'other';
  }

  const normalizedSource = source.trim().toLowerCase();

  if (normalizedSource === 'x' || normalizedSource === 'twitter') {
    return 'x';
  }

  if (normalizedSource.includes('mcp')) {
    return 'mcp';
  }

  if (
    normalizedSource.includes('llm') ||
    normalizedSource.includes('chatgpt') ||
    normalizedSource.includes('claude') ||
    normalizedSource.includes('gemini') ||
    normalizedSource.includes('perplexity') ||
    normalizedSource.includes('cursor') ||
    normalizedSource.includes('copilot')
  ) {
    return 'llms';
  }

  return 'other';
};

const applyUtmQuery = (url: URL, params: UtmParams): URL => {
  for (const key of UTM_KEYS) {
    const value = params[key];
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  return url;
};

export const buildInflowUtmLink = (
  target: string,
  channel: 'llms' | 'mcp' | 'x',
  overrides: UtmParams = {}
): string => {
  const defaults = DEFAULT_INFLOW_UTM[channel];
  const mergedParams: UtmParams = { ...defaults, ...overrides };
  const isAbsoluteTarget = /^https?:\/\//i.test(target);
  const fallbackOrigin = isBrowser() ? window.location.origin : 'https://framingui.com';
  const resolvedUrl = new URL(target, fallbackOrigin);

  const url = applyUtmQuery(resolvedUrl, mergedParams);

  if (isAbsoluteTarget) {
    return url.toString();
  }

  return `${url.pathname}${url.search}${url.hash}`;
};

export const getUtmEventProperties = (): Record<string, string> => {
  const snapshot = getPersistedUtmSnapshot();
  const properties: Record<string, string> = {};

  const effectiveLatest = snapshot.latest ?? snapshot.sessionFirstTouch ?? snapshot.firstTouch;

  for (const key of UTM_KEYS) {
    const latestValue = effectiveLatest?.[key];
    const firstTouchValue = snapshot.firstTouch?.[key];
    const sessionValue = snapshot.sessionFirstTouch?.[key];

    if (latestValue) {
      properties[key] = latestValue;
    }
    if (firstTouchValue) {
      properties[`first_${key}`] = firstTouchValue;
    }
    if (sessionValue) {
      properties[`session_${key}`] = sessionValue;
    }
  }

  const source =
    properties.utm_source ?? properties.first_utm_source ?? properties.session_utm_source;
  properties.inflow_channel = classifyInflowChannel(source);

  return properties;
};
