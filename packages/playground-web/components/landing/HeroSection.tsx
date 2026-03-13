'use client';

import { motion } from 'framer-motion';
import type { LandingContent } from '../../data/i18n/landing';

interface HeroSectionProps {
  content: LandingContent;
  onCtaClick?: () => void;
}

export function HeroSection({ content, onCtaClick }: HeroSectionProps) {
  const { hero } = content;

  return (
    <section className="container mx-auto px-6 md:px-8 pt-28 pb-12 md:pt-36 md:pb-16 max-w-7xl">
      {/* Title + CTA */}
      <motion.div
        className="text-center mb-10 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-[1.1] tracking-tighter text-neutral-950">
          {hero.title.part1} <span className="text-neutral-500">{hero.title.part2}</span>
        </h1>
        <p className="text-base md:text-lg text-neutral-500 leading-relaxed tracking-tight mb-7 max-w-xl mx-auto">
          {hero.description}
        </p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors shadow-sm"
        >
          {hero.buttons.browseThemes}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3L8 13M8 13L4 9M8 13L12 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>

      {/* Demo Video — desktop: 16:9, mobile: 2:3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 데스크탑 (md+): 16:9 */}
        <div className="hidden md:block aspect-video w-full bg-neutral-100 rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/video/landing_hero_demo.webm" type="video/webm" />
          </video>
        </div>

        {/* 모바일 (< md): 2:3 세로형 (비디오가 16:9일 경우 object-cover로 중앙 포커스) */}
        <div
          className="block md:hidden w-full bg-neutral-100 rounded-2xl shadow-xl border border-neutral-200 overflow-hidden"
          style={{ aspectRatio: '2/3' }}
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/video/landing_hero_demo_mobile.webm" type="video/webm" />
          </video>
        </div>
      </motion.div>
    </section>
  );
}
