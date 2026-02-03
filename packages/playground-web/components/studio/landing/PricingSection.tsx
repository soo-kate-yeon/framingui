/**
 * PricingSection Component
 * SPEC-STUDIO-001: 3 pricing tiers display
 */

'use client';

import { PricingCard } from './PricingCard';

const PRICING_TIERS = [
  {
    tier: 'Single' as const,
    price: 59,
    features: ['1 template license', '1 year of updates', 'Email support'],
  },
  {
    tier: 'Double' as const,
    price: 99,
    features: ['2 template licenses', '1 year of updates', '16% discount', 'Priority support'],
    featured: true,
  },
  {
    tier: 'Creator Pass' as const,
    price: 149,
    features: ['All current templates', 'All future templates', 'Lifetime updates', 'VIP support'],
  },
];

export interface PricingSectionProps {
  /** User's owned licenses */
  ownedLicenses?: string[];
  /** Purchase callback */
  onPurchase?: (tier: string) => void;
  /** Manage callback */
  onManage?: () => void;
}

export function PricingSection({ ownedLicenses = [], onPurchase, onManage }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-neutral-900 text-center mb-12">
          Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.tier}
              {...tier}
              hasLicense={ownedLicenses.includes(tier.tier)}
              onPurchase={onPurchase}
              onManage={onManage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
