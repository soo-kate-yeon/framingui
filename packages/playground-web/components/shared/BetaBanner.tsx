'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

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
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base">
          <span className="shrink-0 inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full bg-white text-purple-600 shadow-md animate-pulse">
            BETA
          </span>
          <p className="text-center">
            <span className="font-bold text-base sm:text-lg">FramingUI is in Beta!</span>
            <span className="hidden sm:inline ml-2 font-medium">
              Get early access and shape the future of agentic design systems.
            </span>
          </p>
          <Link
            href={BETA_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-bold rounded-full bg-white text-purple-600 hover:bg-gray-50 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Trial →
          </Link>
          <button
            onClick={handleDismiss}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
