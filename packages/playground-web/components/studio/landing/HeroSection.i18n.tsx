/**
 * TAG: TAG-STUDIO-001-E003 (Hero Section)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Hero section component with i18n support
 */

'use client';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';

export interface HeroSectionI18nProps {
  title: string;
  subtitle: string;
  onOpenDemoClick?: () => void;
  onBuyClick?: () => void;
  className?: string;
}

export function HeroSectionI18n({
  title,
  subtitle,
  onOpenDemoClick,
  onBuyClick,
  className,
}: HeroSectionI18nProps) {
  const t = useTranslations('studio.landing.hero');

  return (
    <section className={clsx('py-12 px-6 md:py-16 lg:py-20 bg-white', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-neutral-900 mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenDemoClick}
            className="px-6 py-3 text-base font-bold uppercase tracking-wider text-neutral-900 bg-white border-2 border-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            {t('openFullDemo')}
          </button>
          <button
            type="button"
            onClick={onBuyClick}
            className="px-6 py-3 text-base font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
          >
            {t('buyNow')}
          </button>
        </div>
      </div>
    </section>
  );
}
