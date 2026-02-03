/**
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 * i18n configuration for next-intl
 */

export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
};
