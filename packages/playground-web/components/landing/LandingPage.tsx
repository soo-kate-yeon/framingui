'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Accordion } from './Accordion';
import { Button } from '@framingui/ui';
import { Footer } from '../shared/Footer';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';
import { getLandingContent } from '../../data/i18n/landing';
import { AgentReviewMarquee } from '../marketing/AgentReviewMarquee';
import { trackFunnelPrimaryCtaClick } from '../../lib/analytics';

// Assets
import {
  ColorTokenAsset,
  LayoutTokenAsset,
  ComponentGalleryAsset,
} from '../marketing/Section1Assets';
import { TSCodeExportAsset } from '../marketing/Section2Assets';

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // Editorial ease
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale } = useGlobalLanguage();
  const content = getLandingContent(locale);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <div
            className="text-xl font-bold tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {content.nav.brandName || content.hero.brandName}
          </div>
          <div className="flex items-center gap-3">
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
              className="hidden md:flex h-9 px-4 rounded-full text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200 shadow-sm"
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
              className="hidden md:flex h-9 px-4 rounded-full text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200 shadow-sm"
            >
              {content.nav.docs}
            </Button>
            <Button
              onClick={() =>
                handleNavigateWithTracking(
                  '/explore',
                  'home_nav_explore',
                  content.hero.buttons.tryStudio,
                  'home_top_nav',
                  'primary'
                )
              }
              className="h-9 px-4 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
            >
              {content.hero.buttons.tryStudio}
            </Button>
          </div>
        </div>
      </nav>

      {/* Header / Hero Section */}
      <header className="container mx-auto px-6 md:px-8 pt-40 pb-24 md:pt-[240px] md:pb-40 text-center max-w-6xl">
        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-7xl md:text-[90px] font-bold mb-8 md:mb-12 leading-[1.05] tracking-tighter text-neutral-950">
            {content.hero.title.part1}{' '}
            <span className="text-neutral-400 block mt-2 md:mt-4">{content.hero.title.part2}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl md:text-[28px] text-neutral-600 mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed tracking-tight">
            {content.hero.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex justify-center">
            <Button
              onClick={() =>
                handleNavigateWithTracking(
                  '/explore',
                  'home_hero_try_studio',
                  content.hero.buttons.tryStudio,
                  'home_hero',
                  'primary'
                )
              }
              className="h-14 md:h-16 px-8 md:px-12 rounded-full text-lg md:text-xl font-medium bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-105 transition-all shadow-xl"
            >
              {content.hero.buttons.tryStudio}
            </Button>
          </div>
        </FadeIn>
      </header>

      {/* Marquee Section */}
      <FadeIn delay={0.4}>
        <AgentReviewMarquee />
      </FadeIn>

      {/* Main Sections - Editorial Tech Layout */}
      <main className="container mx-auto px-6 md:px-8 py-24 md:py-40 space-y-32 md:space-y-48">
        {/* Section 1: Tokens */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn className="order-2 md:order-1">
            <ColorTokenAsset />
          </FadeIn>
          <FadeIn className="order-1 md:order-2 flex flex-col justify-center">
            <div className="text-sm font-bold text-neutral-400 tracking-widest uppercase mb-4">
              Section 01
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.15] text-neutral-900">
              {content.sections.s1.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
              {content.sections.s1.description}
            </p>
          </FadeIn>
        </section>

        {/* Section 2: Layout */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn className="flex flex-col justify-center">
            <div className="text-sm font-bold text-neutral-400 tracking-widest uppercase mb-4">
              Section 02
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.15] text-neutral-900">
              {content.sections.s2.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
              {content.sections.s2.description}
            </p>
          </FadeIn>
          <FadeIn>
            <LayoutTokenAsset />
          </FadeIn>
        </section>

        {/* Section 3: Components */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn className="order-2 md:order-1">
            <ComponentGalleryAsset />
          </FadeIn>
          <FadeIn className="order-1 md:order-2 flex flex-col justify-center">
            <div className="text-sm font-bold text-neutral-400 tracking-widest uppercase mb-4">
              Section 03
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.15] text-neutral-900">
              {content.sections.s3.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
              {content.sections.s3.description}
            </p>
          </FadeIn>
        </section>

        {/* Section 4: MCP */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn className="flex flex-col justify-center">
            <div className="text-sm font-bold text-neutral-400 tracking-widest uppercase mb-4">
              Section 04
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.15] text-neutral-900">
              {content.sections.s4.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
              {content.sections.s4.description}
            </p>
          </FadeIn>
          <FadeIn>
            <TSCodeExportAsset />
          </FadeIn>
        </section>
      </main>

      {/* Section 5: Beta Offer (Reversed Background) */}
      <section className="w-full bg-neutral-950 text-white py-32 md:py-48 mt-12 px-6 md:px-8 text-center flex flex-col items-center justify-center">
        <FadeIn className="max-w-4xl flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs md:text-sm font-bold tracking-widest mb-10 uppercase">
            {content.section5.badge}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
            {content.section5.title}
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl leading-relaxed">
            {content.section5.description}
          </p>
          <Button
            onClick={() =>
              handleNavigateWithTracking(
                '/explore',
                'home_beta_offer_cta',
                content.section5.cta,
                'home_beta_offer',
                'beta'
              )
            }
            className="h-14 md:h-16 px-8 md:px-12 rounded-full text-lg md:text-xl font-bold bg-white text-neutral-950 hover:bg-neutral-200 hover:scale-105 transition-all shadow-2xl"
          >
            {content.section5.cta}
          </Button>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 md:px-8 py-32 md:py-40">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                {content.faq.title}
              </h2>
              <p className="text-xl text-neutral-500 leading-relaxed">{content.faq.subtitle}</p>
            </div>
            <div className="md:col-span-7">
              <Accordion items={content.faq.items} allowMultiple />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
