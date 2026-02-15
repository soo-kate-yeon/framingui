/**
 * Tailwind Config Reader
 * SPEC-MCP-005: Tailwind CSS 설정 파일을 읽고 @tekton-ui/ui 호환성 검증
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Tailwind 설정 파일 읽기 결과
 */
export interface TailwindConfigReadResult {
  found: boolean;
  configPath?: string;
  hasUiContentPath: boolean;
  hasAnimatePlugin: boolean;
  rawContent?: string;
  error?: string;
}

/** 지원되는 Tailwind 설정 파일명 */
const TAILWIND_CONFIG_FILES = [
  'tailwind.config.ts',
  'tailwind.config.js',
  'tailwind.config.mjs',
  'tailwind.config.cjs',
];

/**
 * @tekton-ui/ui content 경로 패턴
 * monorepo: ../../packages/ui/src/ 또는 packages/ui/src/
 * standalone: node_modules/@tekton-ui/ui/
 * 직접 참조: @tekton-ui/ui
 */
const UI_CONTENT_PATTERNS = [/packages\/ui\/src\//, /node_modules\/@tekton\/ui\//, /@tekton\/ui/];

/**
 * tailwindcss-animate 플러그인 패턴
 * import animate from 'tailwindcss-animate'
 * require('tailwindcss-animate')
 * plugins: [require('tailwindcss-animate')]
 */
const ANIMATE_PLUGIN_PATTERNS = [/tailwindcss-animate/];

/**
 * Tailwind 설정 파일을 찾아서 읽고 @tekton-ui/ui 호환성을 검증
 *
 * @param projectPath - 프로젝트 루트 경로
 * @returns TailwindConfigReadResult
 */
export function readTailwindConfig(projectPath: string): TailwindConfigReadResult {
  try {
    // 프로젝트 루트 경로 정규화
    const resolvedPath = path.resolve(projectPath);

    // package.json 경로가 전달된 경우 디렉토리로 변환
    const projectDir = resolvedPath.endsWith('package.json')
      ? path.dirname(resolvedPath)
      : resolvedPath;

    // Tailwind 설정 파일 탐색
    let configPath: string | undefined;
    for (const configFile of TAILWIND_CONFIG_FILES) {
      const fullPath = path.join(projectDir, configFile);
      if (fs.existsSync(fullPath)) {
        configPath = fullPath;
        break;
      }
    }

    if (!configPath) {
      return {
        found: false,
        hasUiContentPath: false,
        hasAnimatePlugin: false,
      };
    }

    // 설정 파일 읽기
    const rawContent = fs.readFileSync(configPath, 'utf-8');

    // content 배열에서 @tekton-ui/ui 경로 확인
    const hasUiContentPath = UI_CONTENT_PATTERNS.some(pattern => pattern.test(rawContent));

    // tailwindcss-animate 플러그인 확인
    const hasAnimatePlugin = ANIMATE_PLUGIN_PATTERNS.some(pattern => pattern.test(rawContent));

    return {
      found: true,
      configPath,
      hasUiContentPath,
      hasAnimatePlugin,
      rawContent,
    };
  } catch (error) {
    return {
      found: false,
      hasUiContentPath: false,
      hasAnimatePlugin: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
