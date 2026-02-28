/**
 * McpGuideSection Component
 * SPEC-STUDIO-001: MCP installation guide section
 */

'use client';

import { CodeBlock } from './CodeBlock';

export function McpGuideSection() {
  return (
    <section id="how-to-use" className="py-16 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-8">
          How to Use
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Installation</h3>
            <CodeBlock code="npx @claude/mcp-client install @studio/templates" language="bash" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Usage</h3>
            <p className="text-neutral-600 leading-relaxed">
              Once installed, the template will be available in your Claude Desktop MCP settings.
              Configure your preferred theme and start building.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
