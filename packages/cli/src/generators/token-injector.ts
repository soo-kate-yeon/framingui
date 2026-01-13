import type { ExtendedTokenPreset } from '@tekton/preset';

/**
 * Token injection options
 */
export interface TokenInjectionOptions {
  tokens: ExtendedTokenPreset;
  platform: 'web' | 'react-native';
  outputFormat: 'tailwind' | 'stylesheet' | 'css';
}

/**
 * Token injection result
 */
export interface TokenInjectionResult {
  success: boolean;
  code: string;
  format: string;
  error?: string;
}

/**
 * Generate Tailwind CSS tokens
 */
export function generateTailwindTokens(tokens: ExtendedTokenPreset): string {
  const lines: string[] = [];

  lines.push(':root {');
  lines.push('  /* Brand Colors */');

  // Brand tokens
  for (const [colorName, levels] of Object.entries(tokens.brand)) {
    lines.push(`  --color-${colorName}-base: oklch(${levels.base.l} ${levels.base.c} ${levels.base.h});`);
    lines.push(`  --color-${colorName}-light: oklch(${levels.light.l} ${levels.light.c} ${levels.light.h});`);
    lines.push(`  --color-${colorName}-dark: oklch(${levels.dark.l} ${levels.dark.c} ${levels.dark.h});`);
    lines.push(`  --color-${colorName}-contrast: oklch(${levels.contrast.l} ${levels.contrast.c} ${levels.contrast.h});`);
  }

  lines.push('');
  lines.push('  /* Semantic Colors */');

  // Semantic tokens
  for (const [semanticName, color] of Object.entries(tokens.semantic)) {
    lines.push(`  --color-${semanticName}: oklch(${color.l} ${color.c} ${color.h});`);
  }

  lines.push('');
  lines.push('  /* Neutral Colors */');

  // Neutral tokens
  for (const [level, color] of Object.entries(tokens.neutral)) {
    lines.push(`  --color-neutral-${level}: oklch(${color.l} ${color.c} ${color.h});`);
  }

  lines.push('}');
  lines.push('');
  lines.push('/* Tailwind utilities */');
  lines.push('.bg-primary { background-color: var(--color-primary-base); }');
  lines.push('.text-primary { color: var(--color-primary-base); }');
  lines.push('.bg-success { background-color: var(--color-success); }');
  lines.push('.text-success { color: var(--color-success); }');
  lines.push('.bg-error { background-color: var(--color-error); }');
  lines.push('.text-error { color: var(--color-error); }');

  return lines.join('\n');
}

/**
 * Generate React Native StyleSheet tokens
 */
export function generateStyleSheetTokens(tokens: ExtendedTokenPreset): string {
  const lines: string[] = [];

  lines.push("import { StyleSheet } from 'react-native';");
  lines.push('');
  lines.push('export const colors = {');

  // Brand colors
  for (const [colorName, levels] of Object.entries(tokens.brand)) {
    lines.push(`  ${colorName}Base: 'oklch(${levels.base.l} ${levels.base.c} ${levels.base.h})',`);
    lines.push(`  ${colorName}Light: 'oklch(${levels.light.l} ${levels.light.c} ${levels.light.h})',`);
    lines.push(`  ${colorName}Dark: 'oklch(${levels.dark.l} ${levels.dark.c} ${levels.dark.h})',`);
  }

  // Semantic colors
  for (const [semanticName, color] of Object.entries(tokens.semantic)) {
    lines.push(`  ${semanticName}: 'oklch(${color.l} ${color.c} ${color.h})',`);
  }

  // Neutral colors
  for (const [level, color] of Object.entries(tokens.neutral)) {
    lines.push(`  neutral${level}: 'oklch(${color.l} ${color.c} ${color.h})',`);
  }

  lines.push('};');
  lines.push('');
  lines.push('export const styles = StyleSheet.create({');
  lines.push('  container: {');
  lines.push('    backgroundColor: colors.neutral50,');
  lines.push('  },');
  lines.push('  text: {');
  lines.push('    color: colors.neutral900,');
  lines.push('  },');
  lines.push('});');

  return lines.join('\n');
}

/**
 * Inject tokens based on platform
 */
export async function injectTokens(
  options: TokenInjectionOptions
): Promise<TokenInjectionResult> {
  try {
    let code: string;
    let format: string;

    if (options.platform === 'web' || options.outputFormat === 'tailwind') {
      code = generateTailwindTokens(options.tokens);
      format = 'tailwind';
    } else if (options.platform === 'react-native' || options.outputFormat === 'stylesheet') {
      code = generateStyleSheetTokens(options.tokens);
      format = 'stylesheet';
    } else {
      code = generateTailwindTokens(options.tokens);
      format = 'css';
    }

    return {
      success: true,
      code,
      format,
    };
  } catch (error) {
    return {
      success: false,
      code: '',
      format: '',
      error: error instanceof Error ? error.message : 'Token injection failed',
    };
  }
}
