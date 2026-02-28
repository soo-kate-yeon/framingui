/**
 * LandingTopNav Component
 * SPEC-STUDIO-001: TAG-STUDIO-001-U002, TAG-STUDIO-001-E001, TAG-STUDIO-001-E002
 *
 * Top navigation for template landing page with anchor links and CTA buttons
 */

'use client';

import { trackFunnelPrimaryCtaClick } from '@/lib/analytics';

export interface LandingTopNavProps {
  /** Template name to display in logo */
  templateName?: string;
  /** Callback when DEMO button is clicked [TAG-STUDIO-001-E001] */
  onDemoClick?: () => void;
  /** Callback when BUY button is clicked [TAG-STUDIO-001-E002] */
  onBuyClick?: () => void;
}

/**
 * LandingTopNav - Top navigation with anchor links and CTA buttons
 * [TAG-STUDIO-001-U002] Anchor links: About, How to use, Documentation
 * [TAG-STUDIO-001-E001] DEMO button scrolls to MCP Guide section
 * [TAG-STUDIO-001-E002] BUY button scrolls to Pricing section
 */
export function LandingTopNav({
  templateName = 'Template',
  onDemoClick,
  onBuyClick,
}: LandingTopNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Template landing page navigation"
      className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200"
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold uppercase tracking-wider text-neutral-900">
          {templateName}
        </h1>
      </div>

      {/* Navigation Links [TAG-STUDIO-001-U002] */}
      <div className="hidden md:flex items-center space-x-6">
        <a
          href="#about"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          About
        </a>
        <a
          href="#how-to-use"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          How to use
        </a>
        <a
          href="#documentation"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          Documentation
        </a>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center space-x-3">
        {/* DEMO Button [TAG-STUDIO-001-E001] */}
        <button
          type="button"
          onClick={() => {
            trackFunnelPrimaryCtaClick({
              cta_id: 'nav_demo',
              cta_label: 'DEMO',
              location: 'top_nav',
              cta_variant: 'secondary',
            });
            onDemoClick?.();
          }}
          className="px-4 py-2 text-sm font-medium text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded"
        >
          DEMO
        </button>

        {/* BUY Button [TAG-STUDIO-001-E002] */}
        <button
          type="button"
          onClick={() => {
            trackFunnelPrimaryCtaClick({
              cta_id: 'nav_buy',
              cta_label: 'BUY',
              location: 'top_nav',
              destination: 'pricing',
              cta_variant: 'primary',
            });
            onBuyClick?.();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded"
        >
          BUY
        </button>
      </div>
    </nav>
  );
}
