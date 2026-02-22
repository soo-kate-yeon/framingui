'use client';

import { useEffect, useState } from 'react';
import { previewTheme } from '@/lib/mcp-client';

interface UseTektonThemeOptions {
  /** MCP 서버 연결 실패 시 적용할 폴백 CSS 변수 */
  fallback?: Record<string, string>;
}

interface UseTektonThemeResult {
  /** 테마 로딩 완료 여부 (폴백 적용 포함) */
  loaded: boolean;
  /** 에러 메시지 (성공 시 null) */
  error: string | null;
}

/**
 * Tekton MCP 서버에서 테마를 로드하고 CSS 변수로 적용하는 훅
 *
 * @example
 * ```tsx
 * const { loaded, error } = useTektonTheme("neutral-workspace", {
 *   fallback: {
 *     "--tekton-bg-canvas": "#FDFCFB",
 *     "--tekton-text-primary": "#171717",
 *   },
 * });
 * ```
 */
export function useTektonTheme(
  themeId: string,
  options?: UseTektonThemeOptions
): UseTektonThemeResult {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTheme() {
      try {
        const response = await previewTheme(themeId);

        if (cancelled) {
          return;
        }

        if (response.result?.success && response.result.theme) {
          const { tokens } = response.result.theme;
          const root = document.documentElement;
          const allTokens: Record<string, unknown> = {
            ...(tokens.atomic as Record<string, unknown>),
            ...(tokens.semantic as Record<string, unknown>),
            ...((tokens.component as Record<string, unknown>) ?? {}),
          };

          Object.entries(allTokens).forEach(([key, value]) => {
            if (typeof value === 'string') {
              root.style.setProperty(key, value);
            }
          });
        } else {
          applyFallback();
          setError(response.result?.error ?? response.error?.message ?? '테마 로드 실패');
        }
      } catch (e) {
        if (cancelled) {
          return;
        }
        applyFallback();
        setError(e instanceof Error ? e.message : '테마 로드 실패');
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    }

    function applyFallback() {
      if (!options?.fallback) {
        return;
      }
      const root = document.documentElement;
      Object.entries(options.fallback).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    loadTheme();

    return () => {
      cancelled = true;
    };
  }, [themeId, options?.fallback]);

  return { loaded, error };
}
