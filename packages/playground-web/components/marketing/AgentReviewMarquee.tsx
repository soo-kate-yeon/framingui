'use client';

import { motion } from 'framer-motion';

const reviews = [
  'It generated a fully responsive dashboard on the first try.',
  'The tokens are perfectly synced with our brand language.',
  'No more translating UI into CSS. Just give commands.',
  'Easily adopted 30+ shadcn/ui components instantly.',
  "I don't need Figma anymore. I just build.",
  'The layout tokens are incredibly smart for responsive design.',
];

// Duplicate to ensure we have enough content to fill the screen twice for the 50% translation
const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

export function AgentReviewMarquee() {
  return (
    <div className="w-full overflow-hidden py-16 md:py-24 border-y border-neutral-200/60 bg-neutral-50/50 flex flex-col items-center">
      <p className="text-xs md:text-sm font-bold text-neutral-400 uppercase tracking-[0.2em] mb-10 md:mb-16">
        framingui로 디자인해본 에이전트의 후기
      </p>
      <div className="relative flex w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex flex-nowrap gap-6 md:gap-8 pr-6 md:pr-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 60,
          }}
        >
          {duplicatedReviews.map((review, i) => (
            <div
              key={i}
              className="shrink-0 px-6 py-4 md:px-8 md:py-5 bg-white border border-neutral-200/80 rounded-2xl shadow-sm text-neutral-800 font-medium text-[15px] md:text-lg tracking-tight"
            >
              "{review}"
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
