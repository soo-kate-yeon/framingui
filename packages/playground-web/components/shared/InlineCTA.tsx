'use client';

import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import { trackFunnelPrimaryCtaClick } from '@/lib/analytics';

const BETA_SIGNUP_URL = 'https://tally.so/r/7R2kz6';

interface InlineCTAProps {
  variant?: 'minimal' | 'card';
  heading?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

const defaultContent = {
  heading: 'Ready to build with FramingUI?',
  description:
    'Join the beta and get early access to agentic design systems that adapt to your needs.',
  buttonText: 'Join Beta',
};

export function InlineCTA({
  variant = 'card',
  heading = defaultContent.heading,
  description = defaultContent.description,
  buttonText = defaultContent.buttonText,
  href = BETA_SIGNUP_URL,
}: InlineCTAProps) {
  const handleBetaClick = () => {
    trackFunnelPrimaryCtaClick({
      cta_id: 'inline_beta_signup',
      cta_label: buttonText,
      location: `inline_cta_${variant}`,
      destination: href,
      cta_variant: 'beta',
    });
  };

  if (variant === 'minimal') {
    return (
      <div className="my-8 py-4 border-t border-b border-neutral-200 dark:border-neutral-700">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
          {description}{' '}
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBetaClick}
            className="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            {buttonText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    );
  }

  // card variant
  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {heading}
            </h3>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
            {description}
          </p>
        </div>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleBetaClick}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
