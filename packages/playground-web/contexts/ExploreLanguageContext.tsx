'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useGlobalLanguage, type GlobalLocale } from './GlobalLanguageContext';

type Locale = GlobalLocale;

interface ExploreLanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const ExploreLanguageContext = createContext<ExploreLanguageContextValue | undefined>(undefined);

/**
 * ExploreLanguageProvider
 *
 * GlobalLanguageContext와 동기화되는 Explore 언어 Provider
 * Explore에서 언어를 변경하면 Footer 등 GlobalLanguageContext를 사용하는 컴포넌트도 함께 업데이트됨
 */
export function ExploreLanguageProvider({ children }: { children: ReactNode }) {
  const { locale, setLocale: setGlobalLocale } = useGlobalLanguage();

  // Explore에서 언어 변경 시 GlobalLanguageContext도 함께 업데이트
  const setLocale = (newLocale: Locale) => {
    setGlobalLocale(newLocale);
  };

  const toggleLocale = () => {
    setGlobalLocale(locale === 'en' ? 'ko' : 'en');
  };

  // GlobalLanguageContext의 locale을 exploreLocale에도 동기화 (선택적)
  useEffect(() => {
    localStorage.setItem('exploreLocale', locale);
  }, [locale]);

  return (
    <ExploreLanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </ExploreLanguageContext.Provider>
  );
}

export function useExploreLanguage() {
  const context = useContext(ExploreLanguageContext);
  if (!context) {
    throw new Error('useExploreLanguage must be used within ExploreLanguageProvider');
  }
  return context;
}
