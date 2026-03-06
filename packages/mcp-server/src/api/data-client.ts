/**
 * MCP 서버 API 데이터 클라이언트
 * 로컬 파일 시스템 읽기를 framingui.com API fetch로 대체
 *
 * 기존 인프라 재사용:
 * - resolveFraminguiApiUrl(): base URL 결정
 * - getAuthData(): API key 가져오기
 * - MemoryCache: 인메모리 캐시 (TTL: 10분)
 */

import { resolveFraminguiApiUrl } from '../utils/api-url.js';
import { getAuthData, getRawApiKey } from '../auth/state.js';
import { MemoryCache } from '../auth/cache.js';
import { info, error as logError } from '../utils/logger.js';

// 캐시 TTL: 10분
const CACHE_TTL_MS = 10 * 60 * 1000;

// 테마 메타데이터 타입 (API 응답에서 사용)
export interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  brandTone: string;
  schemaVersion: string;
}

// 아이콘 라이브러리 메타데이터 타입
export interface IconLibMeta {
  id: string;
  name: string;
  description: string;
  version: string;
  license: string;
  totalIcons: number;
  categories: string[];
}

// 컴포넌트 메타데이터 타입
export interface ComponentMeta {
  id: string;
  name: string;
  category: string;
  tier: number;
  description: string;
  variantsCount: number;
  hasSubComponents: boolean;
}

// 컴포넌트 상세 타입
export interface ComponentDetail extends ComponentMeta {
  props?: any[];
  variants?: any[];
  subComponents?: string[];
  importStatement?: string;
  dependencies?: { internal: string[]; external: string[] };
  examples?: any[];
  accessibility?: string;
}

// 템플릿 메타데이터 타입
export interface TemplateMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  requiredComponentsCount: number;
  layoutType?: string;
  version?: string;
  tags?: string[];
}

// 토큰 응답 타입
export interface TokenListResponse {
  shells?: any[];
  pages?: any[];
  sections?: any[];
  metadata: { total: number };
}

// 스크린 예제 타입
export interface ScreenExample {
  name: string;
  description: string;
  definition: any;
}

// 인메모리 캐시 인스턴스
const themeListCache = new MemoryCache<ThemeMeta[]>();
const themeCache = new MemoryCache<any>(); // ThemeV2 전체 JSON
const iconLibListCache = new MemoryCache<IconLibMeta[]>();
const iconLibCache = new MemoryCache<any>(); // IconLibrary 전체 JSON

// SPEC-MCP-007: 신규 캐시 인스턴스
const templateListCache = new MemoryCache<TemplateMeta[]>();
const templateCache = new MemoryCache<any>();
const componentListCache = new MemoryCache<ComponentMeta[]>();
const componentCache = new MemoryCache<ComponentDetail>();
const tokenCache = new MemoryCache<TokenListResponse>();
const cssCache = new MemoryCache<string>();
const screenExamplesCache = new MemoryCache<ScreenExample[]>();

/**
 * API 요청 공통 헬퍼
 */
async function apiFetch<T>(path: string): Promise<T | null> {
  const authData = getAuthData();
  if (!authData?.valid) {
    logError(`[data-client] Not authenticated, cannot fetch ${path}`);
    return null;
  }

  const apiKey = getRawApiKey();
  if (!apiKey) {
    logError('[data-client] No raw API key available');
    return null;
  }

  const { apiUrl } = resolveFraminguiApiUrl(process.env.FRAMINGUI_API_URL);
  const url = `${apiUrl}${path}`;

  try {
    info(`[data-client] Fetching: ${url}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      logError(`[data-client] API error: ${response.status} ${response.statusText} for ${path}`);
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logError(`[data-client] Network error for ${path}: ${msg}`);
    return null;
  }
}

/**
 * 테마 목록 조회 (라이선스 보유 테마만)
 */
export async function fetchThemeList(): Promise<ThemeMeta[]> {
  // 캐시 확인
  const cached = themeListCache.get('list');
  if (cached) {
    info('[data-client] Using cached theme list');
    return cached;
  }

  const data = await apiFetch<{ success: boolean; themes?: ThemeMeta[]; error?: string }>(
    '/api/mcp/themes'
  );

  if (!data?.success || !data.themes) {
    logError(`[data-client] Failed to fetch theme list: ${data?.error || 'unknown'}`);
    return [];
  }

  themeListCache.set('list', data.themes, CACHE_TTL_MS);
  info(`[data-client] Cached ${data.themes.length} themes`);
  return data.themes;
}

/**
 * 단일 테마 상세 조회 (전체 ThemeV2 JSON)
 */
export async function fetchTheme(themeId: string): Promise<any | null> {
  // 캐시 확인
  const cached = themeCache.get(themeId);
  if (cached) {
    info(`[data-client] Using cached theme: ${themeId}`);
    return cached;
  }

  const data = await apiFetch<{ success: boolean; theme?: any; error?: string }>(
    `/api/mcp/themes/${encodeURIComponent(themeId)}`
  );

  if (!data?.success || !data.theme) {
    logError(`[data-client] Failed to fetch theme "${themeId}": ${data?.error || 'unknown'}`);
    return null;
  }

  themeCache.set(themeId, data.theme, CACHE_TTL_MS);
  info(`[data-client] Cached theme: ${themeId}`);
  return data.theme;
}

/**
 * 아이콘 라이브러리 목록 조회
 */
export async function fetchIconLibraryList(): Promise<IconLibMeta[]> {
  const cached = iconLibListCache.get('list');
  if (cached) {
    info('[data-client] Using cached icon library list');
    return cached;
  }

  const data = await apiFetch<{ success: boolean; libraries?: IconLibMeta[]; error?: string }>(
    '/api/mcp/icon-libraries'
  );

  if (!data?.success || !data.libraries) {
    logError(`[data-client] Failed to fetch icon library list: ${data?.error || 'unknown'}`);
    return [];
  }

  iconLibListCache.set('list', data.libraries, CACHE_TTL_MS);
  info(`[data-client] Cached ${data.libraries.length} icon libraries`);
  return data.libraries;
}

/**
 * 단일 아이콘 라이브러리 상세 조회 (전체 IconLibrary JSON)
 */
export async function fetchIconLibrary(libraryId: string): Promise<any | null> {
  const cached = iconLibCache.get(libraryId);
  if (cached) {
    info(`[data-client] Using cached icon library: ${libraryId}`);
    return cached;
  }

  const data = await apiFetch<{ success: boolean; library?: any; error?: string }>(
    `/api/mcp/icon-libraries/${encodeURIComponent(libraryId)}`
  );

  if (!data?.success || !data.library) {
    logError(
      `[data-client] Failed to fetch icon library "${libraryId}": ${data?.error || 'unknown'}`
    );
    return null;
  }

  iconLibCache.set(libraryId, data.library, CACHE_TTL_MS);
  info(`[data-client] Cached icon library: ${libraryId}`);
  return data.library;
}

// ============================================================================
// SPEC-MCP-007: Phase 2 - 추가 데이터 소스 API 함수
// ============================================================================

/**
 * 스크린 템플릿 목록 조회
 * [SPEC-MCP-007:E-001]
 */
export async function fetchTemplateList(params?: {
  category?: string;
  search?: string;
}): Promise<TemplateMeta[]> {
  const cacheKey = params?.category
    ? `list:${params.category}${params.search ? `:${params.search}` : ''}`
    : 'list';

  const cached = templateListCache.get(cacheKey);
  if (cached) {
    info('[data-client] Using cached template list');
    return cached;
  }

  const queryParams = new URLSearchParams();
  if (params?.category) {
    queryParams.set('category', params.category);
  }
  if (params?.search) {
    queryParams.set('search', params.search);
  }
  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

  const data = await apiFetch<{ success: boolean; templates?: TemplateMeta[]; error?: string }>(
    `/api/mcp/templates${query}`
  );

  if (!data?.success || !data.templates) {
    logError(`[data-client] Failed to fetch template list: ${data?.error || 'unknown'}`);
    // stale 캐시 fallback [SPEC-MCP-007:S-004]
    const stale = templateListCache.getStale(cacheKey);
    if (stale) {
      info('[data-client] Using stale template list cache as fallback');
      return stale;
    }
    return [];
  }

  templateListCache.set(cacheKey, data.templates, CACHE_TTL_MS);
  info(`[data-client] Cached ${data.templates.length} templates`);
  return data.templates;
}

/**
 * 단일 스크린 템플릿 상세 조회
 * [SPEC-MCP-007:E-002]
 */
export async function fetchTemplate(templateId: string): Promise<any | null> {
  const cached = templateCache.get(templateId);
  if (cached) {
    info(`[data-client] Using cached template: ${templateId}`);
    return cached;
  }

  const data = await apiFetch<{ success: boolean; template?: any; error?: string }>(
    `/api/mcp/templates/${encodeURIComponent(templateId)}`
  );

  if (!data?.success || !data.template) {
    logError(`[data-client] Failed to fetch template "${templateId}": ${data?.error || 'unknown'}`);
    const stale = templateCache.getStale(templateId);
    if (stale) {
      info(`[data-client] Using stale template cache as fallback: ${templateId}`);
      return stale;
    }
    return null;
  }

  templateCache.set(templateId, data.template, CACHE_TTL_MS);
  info(`[data-client] Cached template: ${templateId}`);
  return data.template;
}

/**
 * UI 컴포넌트 목록 조회 (전체 카탈로그)
 * [SPEC-MCP-007:E-003]
 */
export async function fetchComponentList(): Promise<ComponentMeta[]> {
  const cached = componentListCache.get('list');
  if (cached) {
    info('[data-client] Using cached component list');
    return cached;
  }

  const data = await apiFetch<{ success: boolean; components?: ComponentMeta[]; error?: string }>(
    '/api/mcp/components'
  );

  if (!data?.success || !data.components) {
    logError(`[data-client] Failed to fetch component list: ${data?.error || 'unknown'}`);
    const stale = componentListCache.getStale('list');
    if (stale) {
      info('[data-client] Using stale component list cache as fallback');
      return stale;
    }
    return [];
  }

  componentListCache.set('list', data.components, CACHE_TTL_MS);
  info(`[data-client] Cached ${data.components.length} components`);
  return data.components;
}

/**
 * 단일 컴포넌트 상세 정보 조회 (props + variants + examples 포함)
 * [SPEC-MCP-007:E-004]
 */
export async function fetchComponent(componentId: string): Promise<ComponentDetail | null> {
  const cached = componentCache.get(componentId);
  if (cached) {
    info(`[data-client] Using cached component: ${componentId}`);
    return cached;
  }

  const data = await apiFetch<{ success: boolean; component?: ComponentDetail; error?: string }>(
    `/api/mcp/components/${encodeURIComponent(componentId)}`
  );

  if (!data?.success || !data.component) {
    logError(
      `[data-client] Failed to fetch component "${componentId}": ${data?.error || 'unknown'}`
    );
    const stale = componentCache.getStale(componentId);
    if (stale) {
      info(`[data-client] Using stale component cache as fallback: ${componentId}`);
      return stale;
    }
    return null;
  }

  componentCache.set(componentId, data.component, CACHE_TTL_MS);
  info(`[data-client] Cached component: ${componentId}`);
  return data.component;
}

/**
 * 레이아웃 토큰 목록 조회 (shell / page / section)
 * [SPEC-MCP-007:E-005]
 */
export async function fetchTokenList(
  tokenType?: 'shell' | 'page' | 'section' | 'all'
): Promise<TokenListResponse> {
  const type = tokenType ?? 'all';
  const cached = tokenCache.get(type);
  if (cached) {
    info(`[data-client] Using cached token list: ${type}`);
    return cached;
  }

  const data = await apiFetch<{ success: boolean; error?: string } & Partial<TokenListResponse>>(
    `/api/mcp/tokens?type=${type}`
  );

  if (!data?.success) {
    logError(`[data-client] Failed to fetch token list: ${data?.error || 'unknown'}`);
    const stale = tokenCache.getStale(type);
    if (stale) {
      info('[data-client] Using stale token list cache as fallback');
      return stale;
    }
    return { metadata: { total: 0 } };
  }

  const result: TokenListResponse = {
    shells: data.shells,
    pages: data.pages,
    sections: data.sections,
    metadata: data.metadata ?? { total: 0 },
  };

  tokenCache.set(type, result, CACHE_TTL_MS);
  info(`[data-client] Cached token list: ${type} (total: ${result.metadata.total})`);
  return result;
}

/**
 * 테마 CSS 변수 문자열 조회
 * [SPEC-MCP-007:E-006]
 */
export async function fetchCSSVariables(themeId: string): Promise<string | null> {
  const cached = cssCache.get(themeId);
  if (cached) {
    info(`[data-client] Using cached CSS variables: ${themeId}`);
    return cached;
  }

  const data = await apiFetch<{ success: boolean; css?: string; error?: string }>(
    `/api/mcp/themes/${encodeURIComponent(themeId)}/css`
  );

  if (!data?.success || !data.css) {
    logError(
      `[data-client] Failed to fetch CSS variables for "${themeId}": ${data?.error || 'unknown'}`
    );
    const stale = cssCache.getStale(themeId);
    if (stale) {
      info(`[data-client] Using stale CSS cache as fallback: ${themeId}`);
      return stale;
    }
    return null;
  }

  cssCache.set(themeId, data.css, CACHE_TTL_MS);
  info(`[data-client] Cached CSS variables: ${themeId}`);
  return data.css;
}

/**
 * 스크린 예제 정의 목록 조회
 * [SPEC-MCP-007:E-007]
 */
export async function fetchScreenExamples(): Promise<ScreenExample[]> {
  const cached = screenExamplesCache.get('list');
  if (cached) {
    info('[data-client] Using cached screen examples');
    return cached;
  }

  const data = await apiFetch<{ success: boolean; examples?: ScreenExample[]; error?: string }>(
    '/api/mcp/examples/screens'
  );

  if (!data?.success || !data.examples) {
    logError(`[data-client] Failed to fetch screen examples: ${data?.error || 'unknown'}`);
    const stale = screenExamplesCache.getStale('list');
    if (stale) {
      info('[data-client] Using stale screen examples cache as fallback');
      return stale;
    }
    return [];
  }

  screenExamplesCache.set('list', data.examples, CACHE_TTL_MS);
  info(`[data-client] Cached ${data.examples.length} screen examples`);
  return data.examples;
}
