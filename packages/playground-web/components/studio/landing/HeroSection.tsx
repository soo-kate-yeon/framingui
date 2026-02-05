/**
 * HeroSection Component
 * SPEC-STUDIO-001: TAG-STUDIO-001-E003
 *
 * Hero section with title, subtitle, and CTA buttons
 */

'use client';

import { clsx } from 'clsx';

export interface HeroSectionProps {
  /** Main title */
  title: string;
  /** Subtitle description */
  subtitle: string;
  /** Callback when Open Full Demo button is clicked [TAG-STUDIO-001-E003] */
  onOpenDemoClick?: () => void;
  /** Callback when Buy Now button is clicked */
  onBuyClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * HeroSection - Main hero area for landing page
 * [TAG-STUDIO-001-E003] Open Full Demo button opens live demo in new tab
 */
export function HeroSection({
  title,
  subtitle,
  onOpenDemoClick,
  onBuyClick,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={clsx(
        'py-12 px-6 md:py-16 lg:py-20 bg-white',
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-neutral-900 mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-neutral-600 mb-8">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Open Full Demo Button [TAG-STUDIO-001-E003] */}
          <button
            type="button"
            onClick={onOpenDemoClick}
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded"
          >
            Open Full Demo
          </button>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={onBuyClick}
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
