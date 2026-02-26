'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Rocket } from 'lucide-react';

const STORAGE_KEY = 'framingui-beta-banner-dismissed';
const BETA_SIGNUP_URL = 'https://tally.so/r/7R2kz6';

export function BetaBanner() {
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
    <div className="relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base">
          <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
          <p className="text-center">
            <span className="font-medium">FramingUI is in Beta!</span>
            <span className="hidden sm:inline"> Get early access and shape the future of agentic design systems.</span>
          </p>
          <Link
            href={BETA_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full bg-white text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            Join Beta
          </Link>
          <button
            onClick={handleDismiss}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
