/**
 * @tekton-ui/core API Reference
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '@tekton-ui/core API | tekton/ui',
  description: 'API reference for @tekton-ui/core package.',
};

export default function CoreAPIPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">API Reference</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 font-mono">
          @tekton-ui/core
        </h1>
        <p className="text-xl text-neutral-600">
          Token generation, OKLCH color utilities, and theme parsing.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Installation</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          <code>npm install @tekton-ui/core</code>
        </pre>
      </section>

      {/* generateTokens */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">generateTokens</h2>
        <p className="text-neutral-600">
          Generate CSS custom properties from a theme configuration.
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { generateTokens } from '@tekton-ui/core';

const tokens = generateTokens({
  theme: 'editorial-tech',
  format: 'css', // 'css' | 'scss' | 'json'
});

// Returns CSS custom properties:
// --color-brand-500: oklch(0.55 0.00 0);
// --spacing-md: 1rem;
// ...`}
        </pre>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Parameter</th>
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Type</th>
                <th className="text-left py-3 font-semibold text-neutral-900">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">theme</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3">Theme identifier</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">format</td>
                <td className="py-3 pr-4 font-mono text-sm">&apos;css&apos; | &apos;scss&apos; | &apos;json&apos;</td>
                <td className="py-3">Output format</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* parseTheme */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">parseTheme</h2>
        <p className="text-neutral-600">
          Parse a theme JSON file and validate its structure.
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { parseTheme } from '@tekton-ui/core';

const theme = parseTheme(themeJson);

// Returns validated theme object with:
// - tokens.atomic.color
// - tokens.atomic.typography
// - tokens.atomic.spacing
// - tokens.semantic.*`}
        </pre>
      </section>

      {/* oklchToHex */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">oklchToHex</h2>
        <p className="text-neutral-600">
          Convert OKLCH color values to hex format.
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { oklchToHex } from '@tekton-ui/core';

const hex = oklchToHex({ l: 0.55, c: 0.15, h: 250 });
// Returns: '#4a6fd4'`}
        </pre>
      </section>

      {/* validateWCAG */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">validateWCAG</h2>
        <p className="text-neutral-600">
          Check color contrast ratio for WCAG compliance.
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { validateWCAG } from '@tekton-ui/core';

const result = validateWCAG({
  foreground: { l: 0.2, c: 0, h: 0 },
  background: { l: 0.98, c: 0, h: 0 },
  level: 'AA', // 'AA' | 'AAA'
});

// Returns:
// { 
//   pass: true, 
//   ratio: 12.5,
//   level: 'AAA'
// }`}
        </pre>
      </section>

      {/* Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Types</h2>
        <pre className="bg-neutral-100 text-neutral-700 p-4 rounded-lg overflow-x-auto text-sm">
{`interface OKLCHColor {
  l: number; // Lightness: 0-1
  c: number; // Chroma: 0-0.4
  h: number; // Hue: 0-360
}

interface ThemeConfig {
  id: string;
  name: string;
  schemaVersion: string;
  brandTone: 'mono' | 'warm' | 'cool' | 'vibrant';
  tokens: {
    atomic: AtomicTokens;
    semantic: SemanticTokens;
  };
}`}
        </pre>
      </section>
    </div>
  );
}
