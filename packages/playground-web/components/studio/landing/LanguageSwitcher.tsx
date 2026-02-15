/**
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Language switcher component for locale switching
 */

'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '../../../i18n/config';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params.locale as Locale) || 'en';

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      // Replace the locale in the pathname
      const segments = pathname.split('/').filter(Boolean);
      const localeIndex = locales.includes(segments[0] as Locale) ? 0 : -1;

      if (localeIndex === 0) {
        segments[0] = newLocale;
      } else {
        segments.unshift(newLocale);
      }

      router.push(`/${segments.join('/')}`);
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        disabled={isPending}
        className="px-3 py-1.5 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
