'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { ScrollReveal } from '../explore/landing/ScrollReveal';
import { trackHeroInitPromptCopied } from '../../lib/analytics';

interface HowItWorksSectionProps {
  content: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  initPrompt: string;
}

function CopyableCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    trackHeroInitPromptCopied();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-3 bg-neutral-900 rounded-lg p-3 flex items-center justify-between gap-2">
      <code className="font-mono text-sm text-neutral-100 truncate">{code}</code>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-1.5 rounded-md text-neutral-400 hover:text-neutral-100 transition-colors"
        aria-label="Copy command"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export function HowItWorksSection({ content, initPrompt }: HowItWorksSectionProps) {
  const { title, subtitle, steps } = content;

  return (
    <ScrollReveal>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-neutral-950 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              {index === 0 && <CopyableCodeBlock code={initPrompt} />}
            </motion.div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
