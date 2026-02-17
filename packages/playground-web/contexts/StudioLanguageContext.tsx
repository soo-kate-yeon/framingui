'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useGlobalLanguage, type GlobalLocale } from './GlobalLanguageContext';

type Locale = 'en' | 'ko';

interface StudioLanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const StudioLanguageContext = createContext<StudioLanguageContextValue | undefined>(undefined);

/**
 * StudioLanguageProvider
 *
 * GlobalLanguageContext와 동기화되는 Studio 언어 Provider
 * Studio에서 언어를 변경하면 Footer 등 GlobalLanguageContext를 사용하는 컴포넌트도 함께 업데이트됨
 */
export function StudioLanguageProvider({ children }: { children: ReactNode }) {
  const { locale, setLocale: setGlobalLocale } = useGlobalLanguage();

  // Studio에서 언어 변경 시 GlobalLanguageContext도 함께 업데이트
  const setLocale = (newLocale: Locale) => {
    setGlobalLocale(newLocale as GlobalLocale);
  };

  const toggleLocale = () => {
    setGlobalLocale(locale === 'en' ? 'ko' : 'en');
  };

  // GlobalLanguageContext의 locale을 studioLocale에도 동기화 (선택적)
  useEffect(() => {
    localStorage.setItem('studioLocale', locale);
  }, [locale]);

  return (
    <StudioLanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </StudioLanguageContext.Provider>
  );
}

export function useStudioLanguage() {
  const context = useContext(StudioLanguageContext);
  if (!context) {
    throw new Error('useStudioLanguage must be used within StudioLanguageProvider');
  }
  return context;
}
