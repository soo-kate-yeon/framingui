/**
 * MCP Integration Guide
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP Integration | framingui',
  description: 'Integrate framingui with Claude Code, Cursor, and other MCP tools.',
};

export default function MCPPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          MCP Integration
        </h1>
        <p className="text-xl text-neutral-600">
          Connect framingui with Claude Code, Cursor, Windsurf, and other MCP-compatible tools.
        </p>
      </header>

      {/* What is MCP */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">What is MCP?</h2>
        <p className="text-neutral-600 leading-relaxed">
          MCP (Model Context Protocol) is a standard for connecting AI tools with external 
          data sources and capabilities. framingui provides an MCP server that gives AI 
          agents access to design tokens, components, and theme information.
        </p>
      </section>

      {/* Supported Tools */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Supported Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Claude Code', status: '✅ Full Support' },
            { name: 'Cursor', status: '✅ Full Support' },
            { name: 'Windsurf', status: '✅ Full Support' },
            { name: 'OpenAI Codex', status: '🔄 Coming Soon' },
          ].map((tool) => (
            <div key={tool.name} className="p-4 bg-white border border-neutral-200 rounded-lg">
              <div className="font-semibold text-neutral-900">{tool.name}</div>
              <div className="text-sm text-neutral-500">{tool.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Setup</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-700">1. Run the init command</h3>
            <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
              <code>npx @framingui/mcp-server init</code>
            </pre>
            <p className="text-sm text-neutral-500">
              This creates a .mcp.json file in your project root.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-700">2. Restart your AI tool</h3>
            <p className="text-neutral-600">
              The MCP server will be automatically loaded on restart.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-neutral-700">3. Verify connection</h3>
            <p className="text-neutral-600">
              Ask your AI: &quot;List available tekton themes&quot; — it should return 7 themes.
            </p>
          </div>
        </div>
      </section>

      {/* Available Tools */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Available MCP Tools</h2>
        <p className="text-neutral-600">
          The tekton MCP server exposes 16 tools:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Tool</th>
                <th className="text-left py-3 font-semibold text-neutral-900">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">list-themes</td>
                <td className="py-3">List all available themes</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">preview-theme</td>
                <td className="py-3">Get theme tokens and CSS variables</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">list-components</td>
                <td className="py-3">Browse 30+ UI components</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">generate-blueprint</td>
                <td className="py-3">Create UI from natural language</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">export-production</td>
                <td className="py-3">Generate production-ready code</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example Prompts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Example Prompts</h2>
        <div className="space-y-3">
          {[
            'Create a login page using the pebble theme',
            'Build a dashboard with the square-minimalism design tokens',
            'Add a pricing section with 3 tiers, editorial-tech style',
            'Generate a contact form using neutral-workspace colors',
          ].map((prompt, i) => (
            <div key={i} className="p-4 bg-neutral-100 border border-neutral-200 rounded-lg">
              <p className="text-neutral-700 italic">&quot;{prompt}&quot;</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
