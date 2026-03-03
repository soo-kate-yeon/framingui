'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getFreeTrialBannerContent } from '@/data/i18n/freeTrialBanner';

const STORAGE_KEY = 'framingui-beta-banner-dismissed';

interface FreeTrialBannerProps {
  onStartFreeTrial?: () => void;
}

export function FreeTrialBanner({ onStartFreeTrial }: FreeTrialBannerProps) {
  const { locale } = useGlobalLanguage();
  const content = getFreeTrialBannerContent(locale);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  // SSR hydration 안전하게
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div className="relative animate-gradient-vibrant text-white overflow-hidden shadow-sm">
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 relative z-10">
        {/* 텍스트는 flex-1로 줄바꿈, CTA + X는 shrink-0으로 우측 고정 */}
        <div className="flex items-center gap-3 text-sm sm:text-base">
          <p className="flex-1 min-w-0 font-medium tracking-tight opacity-95">
            {content.label}
          </p>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onStartFreeTrial}
              className="inline-flex items-center px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold rounded-full bg-white text-neutral-900 hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-sm whitespace-nowrap"
            >
              {content.cta}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
