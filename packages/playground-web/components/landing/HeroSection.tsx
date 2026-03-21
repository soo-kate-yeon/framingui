'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import type { LandingContent } from '../../data/i18n/landing';
import { trackHeroInitPromptCopied, trackFunnelPrimaryCtaClick } from '../../lib/analytics';

interface HeroSectionProps {
  content: LandingContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const router = useRouter();
  const { hero, nav } = content;
  const [copied, setCopied] = useState(false);

  const handleCopyInit = useCallback(async () => {
    await navigator.clipboard.writeText(hero.initPrompt);
    setCopied(true);
    trackHeroInitPromptCopied();
    setTimeout(() => setCopied(false), 2000);
  }, [hero.initPrompt]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-6 sm:pt-24 md:pt-28 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight text-neutral-950 max-w-3xl">
          {hero.title.part1}
          <br className="hidden sm:block" />{' '}
          <span className="text-neutral-400">{hero.title.part2}</span>
        </h1>

        {/* npx box + Docs — pill style, inline */}
        <div className="mt-5 flex items-center gap-2.5 overflow-x-auto">
          <div className="bg-neutral-900 rounded-full px-4 py-2 flex items-center gap-2.5 shrink-0">
            <code className="font-mono text-xs sm:text-sm text-neutral-100 whitespace-nowrap">
              {hero.initPrompt}
            </code>
            <button
              onClick={handleCopyInit}
              className="shrink-0 p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
              aria-label="Copy init command"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <button
            onClick={() => {
              trackFunnelPrimaryCtaClick({
                cta_id: 'hero_docs',
                cta_label: nav.docs,
                location: 'hero',
                destination: '/docs',
                cta_variant: 'secondary',
              });
              router.push('/docs');
            }}
            className="h-9 px-5 rounded-full text-sm font-medium border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors shrink-0"
          >
            {nav.docs}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
