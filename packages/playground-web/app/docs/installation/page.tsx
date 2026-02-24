/**
 * Installation Guide
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Installation | tekton/ui',
  description: 'Install tekton/ui with npm, pnpm, or yarn.',
};

export default function InstallationPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Installation
        </h1>
        <p className="text-xl text-neutral-600">
          Install tekton/ui packages with your preferred package manager.
        </p>
      </header>

      {/* Packages Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Packages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Package</th>
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">@tekton-ui/core</td>
                <td className="py-3">Token generation, theme parsing, OKLCH utilities</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">@tekton-ui/ui</td>
                <td className="py-3">30+ React components with theme support</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">@tekton-ui/tokens</td>
                <td className="py-3">Raw design tokens (colors, typography, spacing)</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">@tekton-ui/mcp-server</td>
                <td className="py-3">MCP server for AI tool integration</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Install */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Quick Install (Recommended)</h2>
        <p className="text-neutral-600">
          Use the MCP init command to automatically set up everything:
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          <code>npx @tekton-ui/mcp-server init</code>
        </pre>
      </section>

      {/* Manual Install */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Manual Installation</h2>
        
        <div className="space-y-6">
          {/* npm */}
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-700">npm</h3>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
              <code>npm install @tekton-ui/ui @tekton-ui/core</code>
            </pre>
          </div>

          {/* pnpm */}
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-700">pnpm</h3>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
              <code>pnpm add @tekton-ui/ui @tekton-ui/core</code>
            </pre>
          </div>

          {/* yarn */}
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-700">yarn</h3>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
              <code>yarn add @tekton-ui/ui @tekton-ui/core</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Tailwind Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Tailwind CSS Setup</h2>
        <p className="text-neutral-600">
          Add tekton to your Tailwind config:
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tekton-ui/ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;`}
        </pre>
      </section>

      {/* CSS Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import Styles</h2>
        <p className="text-neutral-600">
          Add the tekton styles to your global CSS:
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
{`/* globals.css */
@import '@tekton-ui/ui/styles';`}
        </pre>
      </section>

      {/* Peer Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Peer Dependencies</h2>
        <p className="text-neutral-600">
          @tekton-ui/ui requires these peer dependencies:
        </p>
        <pre className="bg-neutral-100 text-neutral-700 p-4 rounded-lg overflow-x-auto text-sm">
{`react >= 18.0.0
react-dom >= 18.0.0
tailwind-merge >= 2.0.0
class-variance-authority >= 0.7.0
clsx >= 2.0.0
lucide-react >= 0.400.0`}
        </pre>
      </section>
    </div>
  );
}
