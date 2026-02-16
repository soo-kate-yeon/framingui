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
  const { locale, setLocale } = useGlobalLanguage();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as GlobalLocale)}
      className={`px-3 py-1.5 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 ${className}`}
      aria-label="Select language"
    >
      {Object.entries(localeNames).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
