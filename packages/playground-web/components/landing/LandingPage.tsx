'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Accordion } from './Accordion';
import { Button } from '@tekton-ui/ui';
import { Footer } from '../shared/Footer';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';
import { getLandingContent } from '../../data/i18n/landing';
import { HeroUniverse } from '../marketing/HeroUniverse';
import {
  ColorTokenAsset,
  LayoutTokenAsset,
  ComponentGalleryAsset,
} from '../marketing/Section1Assets';
import {
  MCPVersatilityAsset,
  DesignSystemCoreAsset,
  TSCodeExportAsset,
} from '../marketing/Section2Assets';
import {
  ConstraintReliabilityAsset,
  TemplateEfficiencyAsset,
  VerificationLogicAsset,
} from '../marketing/Section3Assets';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
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

  // Section active indices
  const [s1Active, setS1Active] = useState(0);
  const [s2Active, setS2Active] = useState(0);
  const [s3Active, setS3Active] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Beta Open Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-neutral-950 text-white flex items-center justify-between px-4 sm:px-6">
        <p className="text-xs sm:text-sm font-medium flex-1">
          <span className="sm:hidden">Beta Open — 지금 신청하세요</span>
          <span className="hidden sm:inline">
            🎉 Beta Open — tekton/ui 베타 서비스를 시작합니다. 지금 신청하세요.
          </span>
        </p>
        <a
          href="https://tally.so/r/7R2kz6"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-3 sm:px-4 py-1.5 text-xs font-bold bg-white text-neutral-950 rounded-full hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0"
        >
          베타 신청
        </a>
      </div>

      {/* Top Nav Bar */}
      <nav
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
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
              onClick={() => router.push('/pricing')}
              className="hidden md:flex h-9 px-4 rounded-full text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
            >
              {content.nav.pricing}
            </Button>
            <Button
              onClick={() => router.push('/studio')}
              className="hidden md:flex h-9 px-4 rounded-full text-sm font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-none"
            >
              {content.nav.tryStudio || 'Try Studio'}
            </Button>
            <Button
              onClick={() => router.push('/auth/signup')}
              className="h-9 px-4 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800"
            >
              {content.nav.getStarted}
            </Button>
          </div>
        </div>
      </nav>

      {/* Header / Hero Section */}
      <header className="container mx-auto px-6 md:px-8 pt-28 pb-20 md:pt-40 md:pb-32 text-center max-w-5xl">
        <FadeIn delay={0.1}>
          <div className="mb-8 flex justify-center items-center gap-4">
            <div className="text-2xl font-bold tracking-tighter">{content.hero.brandName}</div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 leading-[1.1] tracking-tight text-neutral-950">
            {content.hero.title.part1} <br className="hidden md:block" />
            <span className="text-neutral-500">{content.hero.title.part2}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg md:text-2xl text-neutral-600 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            {content.hero.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => router.push('/studio')}
              className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              {content.hero.buttons.tryStudio || 'Try Studio Free'}
            </Button>
            <Button
              onClick={() => router.push('/auth/signup')}
              className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-none transition-colors"
            >
              {content.hero.buttons.getStarted}
            </Button>
          </div>
        </FadeIn>
      </header>

      {/* Main Image -> Hero Universe */}
      <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <FadeIn delay={0.5}>
          <HeroUniverse />
        </FadeIn>
      </section>

      {/* Feature Section 1 */}
      <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <FadeIn className="order-2 md:order-1">
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s1Active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {s1Active === 0 && <ColorTokenAsset />}
                  {s1Active === 1 && <LayoutTokenAsset />}
                  {s1Active === 2 && <ComponentGalleryAsset />}
                  {s1Active === 3 && <TemplateEfficiencyAsset />}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
          <FadeIn className="order-1 md:order-2" delay={0.2}>
            <h2 className="text-3xl font-bold mb-8">{content.feature1.title}</h2>
            <Accordion
              items={content.feature1.accordionItems}
              onChange={(i) => i !== -1 && setS1Active(i)}
              defaultIndex={0}
            />
          </FadeIn>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <FadeIn className="order-1">
            <h2 className="text-3xl font-bold mb-8">{content.feature2.title}</h2>
            <Accordion
              items={content.feature2.accordionItems}
              onChange={(i) => i !== -1 && setS2Active(i)}
              defaultIndex={0}
            />
          </FadeIn>
          <FadeIn className="order-2" delay={0.2}>
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s2Active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {s2Active === 0 && <MCPVersatilityAsset />}
                  {s2Active === 1 && <DesignSystemCoreAsset />}
                  {s2Active === 2 && <TSCodeExportAsset />}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature Section 3 */}
      <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <FadeIn className="order-2 md:order-1">
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s3Active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {s3Active === 0 && <ConstraintReliabilityAsset />}
                  {s3Active === 1 && <VerificationLogicAsset />}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
          <FadeIn className="order-1 md:order-2" delay={0.2}>
            <h2 className="text-3xl font-bold mb-8">{content.feature3.title}</h2>
            <Accordion
              items={content.feature3.accordionItems}
              onChange={(i) => i !== -1 && setS3Active(i)}
              defaultIndex={0}
            />
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 md:px-8 mb-32">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold mb-4">{content.faq.title}</h2>
              <p className="text-lg text-neutral-600">{content.faq.subtitle}</p>
            </div>
            <div className="md:col-span-8">
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
