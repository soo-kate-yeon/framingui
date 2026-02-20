/**
 * Global Language Switcher
 *
 * 전역 언어 전환 컴포넌트 (메인 페이지, 랜딩, Footer 등)
 */

'use client';

import { useGlobalLanguage, type GlobalLocale } from '../../contexts/GlobalLanguageContext';

interface GlobalLanguageSwitcherProps {
  className?: string;
}

const localeNames: Record<GlobalLocale, string> = {
  en: 'English',
  ko: '한국어',
};

export function GlobalLanguageSwitcher({ className = '' }: GlobalLanguageSwitcherProps) {
  const { locale, toggleLocale } = useGlobalLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`px-3 py-1.5 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors ${className}`}
      aria-label={`Switch to ${locale === 'en' ? '한국어' : 'English'}`}
    >
      {localeNames[locale === 'en' ? 'ko' : 'en']}
    </button>
  );
}
