/**
 * CSS Generator Wrapper for MCP Server
 * SPEC-COMPONENT-001-D: Hybrid Export System
 *
 * Wraps @tekton/core CSS generation for MCP tool integration
 */

import {
  generateThemeCSS as coreGenerateThemeCSS,
  type ThemeWithTokens,
} from '@tekton/core';

/**
 * CSS 생성 결과 타입
 */
export interface CSSGenerationResult {
  success: boolean;
  css?: string;
  error?: string;
}

/**
 * ThemeWithTokens에서 CSS Variables 생성
 * @tekton/core의 generateThemeCSS를 래핑하여 에러 처리 추가
 *
 * @param theme - ThemeWithTokens 객체
 * @returns CSS 생성 결과
 *
 * @example
 * ```typescript
 * const result = generateCSS(themeWithTokens);
 * if (result.success) {
 *   console.log(result.css);
 * }
 * ```
 */
export function generateCSS(theme: ThemeWithTokens): CSSGenerationResult {
  try {
    const css = coreGenerateThemeCSS(theme);
    return {
      success: true,
      css,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during CSS generation',
    };
  }
}

/**
 * CSS Variables만 추출 (전체 CSS 대신)
 *
 * @param theme - ThemeWithTokens 객체
 * @returns CSS Variables 객체 (key-value 쌍)
 */
export function extractCSSVariables(
  theme: ThemeWithTokens
): Record<string, string> {
  const result = generateCSS(theme);
  if (!result.success || !result.css) {
    return {};
  }

  const variables: Record<string, string> = {};
  const variableRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;

  while ((match = variableRegex.exec(result.css)) !== null) {
    if (match[1] && match[2]) {
      variables[`--${match[1]}`] = match[2].trim();
    }
  }

  return variables;
}

// Re-export types for convenience
export type { ThemeWithTokens };
