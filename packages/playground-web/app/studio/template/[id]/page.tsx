/**
 * Template Landing Page
 * TAG: TAG-STUDIO-001 (Template Landing Page Restructuring)
 * TAG: TAG-STUDIO-001-E001 (Landing Page Layout)
 * TAG: TAG-STUDIO-001-U002 (Top Navigation)
 * TAG: TAG-STUDIO-001-E003 (Hero Section)
 * TAG: TAG-STUDIO-001-E004 (Code Display)
 * TAG: TAG-STUDIO-001-E005 (Installation Guide)
 * TAG: TAG-STUDIO-001-E006 (Pricing Display)
 * TAG: TAG-STUDIO-001-S001 (License Management)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * SaaS-style landing page for template showcase and purchase
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import { usePaddle } from '../../../../hooks/usePaddle';
import { PADDLE_CONFIG, toPaddlePriceTier } from '../../../../lib/paddle/config';
import {
  LandingTopNav,
  HeroSection,
  ComponentOverview,
  McpGuideSection,
  PricingSection,
  type Component,
} from '../../../../components/studio/landing';

// Mock component data - in production, fetch from API based on template ID
const TEMPLATE_COMPONENTS: Component[] = [
  { id: 'login', name: 'Login', category: 'auth' },
  { id: 'signup', name: 'Signup', category: 'auth' },
  { id: 'forgot-password', name: 'Forgot Password', category: 'auth' },
  { id: 'verification', name: 'Verification', category: 'auth' },
  { id: 'landing', name: 'Landing', category: 'core' },
  { id: 'dashboard', name: 'Dashboard', category: 'core' },
  { id: 'preferences', name: 'Preferences', category: 'core' },
  { id: 'profile', name: 'Profile', category: 'user' },
  { id: 'account', name: 'Account Settings', category: 'user' },
  { id: 'loading', name: 'Loading', category: 'core' },
  { id: 'error', name: 'Error', category: 'core' },
  { id: 'empty', name: 'Empty State', category: 'core' },
];

interface TemplatePageProps {
  params: Promise<{ id: string }>;
}

export default function TemplateLandingPage({ params }: TemplatePageProps) {
  const router = useRouter();
  const { user, hasLicense } = useAuth();
  const { openCheckout, isReady: isPaddleReady } = usePaddle();
  const [templateId, setTemplateId] = useState<string>('');
  const [ownedLicenses, setOwnedLicenses] = useState<string[]>([]);

  // Next.js 16: params is a Promise
  useEffect(() => {
    params.then((p) => {
      setTemplateId(p.id);

      // Check user's licenses for this template
      // In production, fetch from API
      const hasValidLicense = hasLicense(p.id);
      if (hasValidLicense) {
        // User already owns this template - could show different UI
        setOwnedLicenses(['Single']);
      }
    });
  }, [params, hasLicense]);

  const handleDemoClick = () => {
    // Open demo in new window or navigate to demo route
    window.open(`/studio/demo/${templateId}`, '_blank');
  };

  const handleBuyClick = () => {
    // Navigate to purchase page
    router.push(`/studio/purchase/${templateId}`);
  };

  const handlePurchase = (tier: string) => {
    // Paddle 결제가 활성화되어 있고 사용자가 로그인된 경우 → Paddle Checkout Overlay
    if (isPaddleReady && user) {
      const priceTier = toPaddlePriceTier(tier);
      if (priceTier) {
        const priceId = PADDLE_CONFIG.prices[priceTier];
        openCheckout({
          priceId,
          userId: user.id,
          userEmail: user.email ?? '',
          themeId: templateId,
          tier: priceTier,
        });
        return;
      }
    }

    // Fallback: 기존 결제 페이지로 이동
    router.push(`/studio/checkout/${templateId}?tier=${tier.toLowerCase().replace(' ', '-')}`);
  };

  const handleManageLicense = () => {
    // Navigate to account/license management
    router.push('/studio/account');
  };

  // Loading state
  if (!templateId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-sm text-neutral-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <LandingTopNav
        templateName={templateId.replace(/-/g, ' ').toUpperCase()}
        onDemoClick={handleDemoClick}
        onBuyClick={handleBuyClick}
      />

      {/* Hero Section */}
      <HeroSection
        title="Professional Template"
        subtitle="Build stunning applications with our carefully crafted component library. Fully responsive, accessible, and production-ready."
        onOpenDemoClick={handleDemoClick}
        onBuyClick={handleBuyClick}
      />

      {/* Components Overview */}
      <section id="about" className="py-16 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-4">
            Components Included
          </h2>
          <p className="text-neutral-600 mb-8 max-w-3xl">
            {TEMPLATE_COMPONENTS.length} carefully designed components covering authentication,
            core features, user management, and feedback states. All components are fully responsive
            and follow accessibility best practices.
          </p>
          <ComponentOverview components={TEMPLATE_COMPONENTS} />
        </div>
      </section>

      {/* Installation Guide */}
      <McpGuideSection />

      {/* Pricing */}
      <PricingSection
        ownedLicenses={ownedLicenses}
        onPurchase={handlePurchase}
        onManage={handleManageLicense}
      />

      {/* Footer */}
      <footer id="documentation" className="py-16 px-6 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Documentation</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Component API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Customization
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    License Management
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    License Agreement
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
            © 2026 Studio Templates. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
