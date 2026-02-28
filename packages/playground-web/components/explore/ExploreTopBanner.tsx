'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useExploreLanguage } from '@/contexts/ExploreLanguageContext';

interface ExploreTopBannerProps {
  onStartFreeTrial: () => void;
}

const DISMISSED_BANNER_STORAGE_KEY = 'dismissedExploreTopBanner';

const MESSAGES = {
  en: {
    eyebrow: 'Explore · Design System',
    message: 'Start your 3-day free trial',
    cta: 'Start free trial',
    dismissAriaLabel: 'Dismiss free trial banner',
  },
  ko: {
    eyebrow: 'Explore · 디자인 시스템',
    message: '3일 무료체험 시작하기',
    cta: '무료체험 시작',
    dismissAriaLabel: '무료체험 배너 닫기',
  },
} as const;

export function ExploreTopBanner({ onStartFreeTrial }: ExploreTopBannerProps) {
  const { locale } = useExploreLanguage();
  const t = MESSAGES[locale as keyof typeof MESSAGES] ?? MESSAGES.en;
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setIsVisible(localStorage.getItem(DISMISSED_BANNER_STORAGE_KEY) !== 'true');
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(DISMISSED_BANNER_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage write errors and only hide for this session.
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="w-full border-b border-neutral-200/80 bg-gradient-to-r from-neutral-50 via-white to-emerald-50/40">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 sm:px-8 sm:py-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            {t.eyebrow}
          </p>
          <p className="mt-1 text-sm font-semibold text-neutral-900 sm:text-base">{t.message}</p>
        </div>

        <button
          type="button"
          onClick={onStartFreeTrial}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:border-neutral-400 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          {t.cta}
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t.dismissAriaLabel}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <X size={16} />
        </button>
      </div>
    </section>
  );
}
