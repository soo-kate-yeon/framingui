/**
 * Global Language Context
 *
 * 메인 페이지, 랜딩, Footer 등 전역 컴포넌트를 위한 언어 컨텍스트
 * StudioLanguageContext와 독립적으로 동작
 */

'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type GlobalLocale = 'en' | 'ko' | 'ja';

interface GlobalLanguageContextValue {
  locale: GlobalLocale;
  setLocale: (locale: GlobalLocale) => void;
  toggleLocale: () => void;
}

const GlobalLanguageContext = createContext<GlobalLanguageContextValue | undefined>(undefined);

export function GlobalLanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<GlobalLocale>('en');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('globalLocale');
    if (saved === 'en' || saved === 'ko' || saved === 'ja') {
      setLocale(saved);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('globalLocale', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  return (
    <GlobalLanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </GlobalLanguageContext.Provider>
  );
}

export function useGlobalLanguage() {
  const context = useContext(GlobalLanguageContext);
  if (!context) {
    throw new Error('useGlobalLanguage must be used within GlobalLanguageProvider');
  }
  return context;
}
