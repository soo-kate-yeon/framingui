/**
 * TAG: TAG-STUDIO-001-U002 (Top Navigation)
 * TAG: TAG-STUDIO-001-E001 (Landing Page Layout)
 * TAG: TAG-STUDIO-001-E002 (Navigation System)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Top navigation component with i18n support
 */

'use client';

import { useTranslations } from 'next-intl';

export interface LandingTopNavI18nProps {
  templateName?: string;
  onDemoClick?: () => void;
  onBuyClick?: () => void;
}

export function LandingTopNavI18n({
  templateName = 'Template',
  onDemoClick,
  onBuyClick,
}: LandingTopNavI18nProps) {
  const t = useTranslations('studio.landing.nav');

  return (
    <nav
      role="navigation"
      className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200"
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold uppercase tracking-wider text-neutral-900">
          {templateName}
        </h1>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <a
          href="#about"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {t('about')}
        </a>
        <a
          href="#how-to-use"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {t('howToUse')}
        </a>
        <a
          href="#documentation"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {t('documentation')}
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onDemoClick}
          className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-neutral-900 bg-white border-2 border-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          {t('demo')}
        </button>
        <button
          type="button"
          onClick={onBuyClick}
          className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
        >
          {t('buy')}
        </button>
      </div>
    </nav>
  );
}
