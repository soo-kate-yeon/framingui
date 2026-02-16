'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Locale = 'en' | 'ko';

interface StudioLanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const StudioLanguageContext = createContext<StudioLanguageContextValue | undefined>(undefined);

export function StudioLanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('studioLocale');
    if (saved === 'en' || saved === 'ko') {
      setLocale(saved);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('studioLocale', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

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
