/**
 * TAG: TAG-STUDIO-001-E005 (Installation Guide)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * MCP installation guide section with i18n support
 */

'use client';

import { useTranslations } from 'next-intl';
import { CodeBlockI18n } from './CodeBlock.i18n';

export function McpGuideSectionI18n() {
  const t = useTranslations('studio.landing.mcpGuide');

  return (
    <section id="how-to-use" className="py-16 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-8">
          {t('title')}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              {t('installation')}
            </h3>
            <CodeBlockI18n
              code="npx @claude/mcp-client install @studio/templates"
              language="bash"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">{t('usage')}</h3>
            <p className="text-neutral-600 leading-relaxed">
              {t('usageDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
