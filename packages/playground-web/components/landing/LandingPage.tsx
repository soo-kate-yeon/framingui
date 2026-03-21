'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@framingui/ui';
import { User, Settings, LogOut } from 'lucide-react';
import { Footer } from '../shared/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';
import { getLandingContent } from '../../data/i18n/landing';
import { HeroSection } from './HeroSection';
import { UseCasesSection } from './UseCasesSection';
import { TemplateCarousel } from './TemplateCarousel';
import { HowItWorksSection } from './HowItWorksSection';
import { FAQSection } from './FAQSection';
import { trackFunnelPrimaryCtaClick, trackFunnelHomeEntered } from '../../lib/analytics';

interface Template {
  id: string;
  name: string;
  description: string;
  descriptionKo?: string;
  category: string;
  thumbnail?: string;
  price?: number;
}

interface LandingPageProps {
  templates: Template[];
}

function AvatarDropdown() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Button
        onClick={() => {
          const returnUrl =
            typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
          router.push(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`);
        }}
        className="h-9 px-4 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
      >
        Sign Up
      </Button>
    );
  }

  const initials = (user.email?.[0] || 'U').toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium hover:bg-neutral-700 transition-colors"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-neutral-100">
            <p className="text-sm font-medium text-neutral-900 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push('/explore/account');
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <User size={16} />
            Account
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push('/settings');
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Settings size={16} />
            Settings
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export function LandingPage({ templates }: LandingPageProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale } = useGlobalLanguage();
  const content = getLandingContent(locale);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    trackFunnelHomeEntered();
  }, []);

  const handleNavigateWithTracking = (
    destination: string,
    ctaId: string,
    ctaLabel: string,
    location: string,
    ctaVariant: 'primary' | 'secondary' | 'beta' | 'free-start' = 'primary'
  ) => {
    trackFunnelPrimaryCtaClick({
      cta_id: ctaId,
      cta_label: ctaLabel,
      location,
      destination,
      cta_variant: ctaVariant,
    });
    router.push(destination);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Nav Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between gap-4">
          <div
            className="text-base sm:text-lg font-bold tracking-tighter cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {content.nav.brandName || content.hero.brandName}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={() =>
                handleNavigateWithTracking(
                  '/pricing',
                  'home_nav_pricing',
                  content.nav.pricing,
                  'home_top_nav',
                  'secondary'
                )
              }
              className="hidden md:flex h-8 px-3.5 rounded-full text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
            >
              {content.nav.pricing}
            </Button>
            <Button
              onClick={() =>
                handleNavigateWithTracking(
                  '/docs',
                  'home_nav_docs',
                  content.nav.docs,
                  'home_top_nav',
                  'secondary'
                )
              }
              className="hidden md:flex h-8 px-3.5 rounded-full text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
            >
              {content.nav.docs}
            </Button>
            <AvatarDropdown />
          </div>
        </div>
      </nav>

      {/* Hero: Title + Textbox (2-col) */}
      <HeroSection content={content} />

      {/* Use Cases — Live Demo Scroll */}
      <UseCasesSection content={content.useCases} />

      {/* Template Carousel */}
      <TemplateCarousel content={content.templateCarousel} templates={templates} />

      {/* How It Works */}
      <HowItWorksSection content={content.howItWorks} initPrompt={content.hero.initPrompt} />

      {/* FAQ */}
      <FAQSection content={content.faq} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
