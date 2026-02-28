/**
 * TAG: TAG-STUDIO-001-U004 (Responsive Design)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Component overview grid with responsive layout and i18n support
 */

'use client';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';

export interface Component {
  id: string;
  name: string;
  category: 'core' | 'auth' | 'user' | 'admin';
}

export interface ComponentOverviewI18nProps {
  components: Component[];
  className?: string;
}

export function ComponentOverviewI18n({ components, className }: ComponentOverviewI18nProps) {
  const t = useTranslations('studio.landing.componentOverview');

  if (components.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className="text-neutral-600">{t('noComponents')}</p>
      </div>
    );
  }

  return (
    <div className={clsx('py-8', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <div
            key={component.id}
            data-testid="component-card"
            data-component-id={component.id}
            className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-neutral-100 rounded mb-4 flex items-center justify-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                {t('preview')}
              </span>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">{component.name}</h3>
            <span className="inline-block px-2 py-1 text-xs uppercase tracking-wider text-neutral-600 bg-neutral-100 rounded">
              {component.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
