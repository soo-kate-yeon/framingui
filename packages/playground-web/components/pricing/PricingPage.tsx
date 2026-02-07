/**
 * Pricing Page - SaaS 스타일 가격 플랜 페이지
 *
 * ChatGPT pricing 페이지 레퍼런스:
 * - Hero + 3 cards + Feature comparison + FAQ
 * - ROSCA 준수: Creator Pass 자동갱신 고지
 */

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { Accordion } from '../landing/Accordion';
import { Footer } from '../shared/Footer';

/* ─── 애니메이션 ─── */
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
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 타입 ─── */
interface PlanFeature {
  label: string;
  single: boolean | string;
  double: boolean | string;
  creator: boolean | string;
}

/* ─── 데이터 ─── */
const PLANS = [
  {
    id: 'single',
    name: 'Single Template',
    description: 'Start with the perfect template for your project.',
    price: null, // 템플릿별 상이
    priceLabel: 'See templates',
    priceSub: 'Price varies by template',
    cta: 'Browse Templates',
    ctaHref: '/studio',
    featured: false,
    badge: null,
    features: [
      '1 template of your choice',
      '1 year of updates',
      'Commercial use',
      'Email support (72h)',
    ],
  },
  {
    id: 'double',
    name: 'Double Package',
    description: 'Best value for developers who need more.',
    price: 99,
    priceLabel: '$99',
    priceSub: 'one-time payment',
    cta: 'Get Started',
    ctaHref: '/auth/signup',
    featured: true,
    badge: 'Most Popular',
    features: [
      '2 templates of your choice',
      '1 year of updates',
      'Commercial use',
      'Email support (72h)',
      'Save vs. buying separately',
    ],
  },
  {
    id: 'creator',
    name: 'Creator Pass',
    description: 'Unlimited access for prolific builders.',
    price: 149,
    priceLabel: '$149',
    priceSub: '/year',
    cta: 'Subscribe',
    ctaHref: '/auth/signup',
    featured: false,
    badge: 'Best Value',
    features: [
      'All current templates',
      'All future templates included',
      'Updates during subscription',
      'Priority email support (48h)',
      'Priority support queue',
    ],
    // ROSCA 준수: 자동갱신 고지
    renewalNotice: true,
  },
] as const;

const COMPARISON_FEATURES: PlanFeature[] = [
  { label: 'Templates included', single: '1', double: '2', creator: 'All' },
  { label: 'Future templates', single: false, double: false, creator: true },
  { label: 'Update duration', single: '1 year', double: '1 year', creator: 'Subscription' },
  { label: 'Commercial use', single: true, double: true, creator: true },
  { label: 'Email support', single: '72h', double: '72h', creator: '48h' },
  { label: 'Priority queue', single: false, double: false, creator: true },
  { label: 'Community Discord', single: true, double: true, creator: true },
  { label: 'Documentation', single: true, double: true, creator: true },
];

const FAQ_ITEMS = [
  {
    title: 'What happens after my update period ends?',
    content:
      "You keep full access to the templates you downloaded. You just won't receive new updates. You can renew anytime to get the latest versions.",
  },
  {
    title: 'Can I use templates in client projects?',
    content:
      'Yes! All plans include a commercial license. You can use templates in unlimited personal and client projects. The only restriction is you cannot resell or redistribute the templates themselves.',
  },
  {
    title: 'How does Creator Pass auto-renewal work?',
    content:
      'Creator Pass renews automatically every year at $149/year. You can cancel anytime from your account settings — cancellation takes effect at the end of your current billing period, and you keep access until then.',
  },
  {
    title: 'What is your refund policy?',
    content:
      'Since templates are digital products, refunds are available before download within 7 days of purchase. Technical defects and duplicate purchases are always eligible for refund. See our full refund policy for details.',
  },
  {
    title: 'Do you offer team or education discounts?',
    content:
      'Team licenses and education discounts are coming soon. Contact us at soo.kate.yeon@gmail.com for early access or custom pricing.',
  },
];

/* ─── 컴포넌트 ─── */
export function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* 네비게이션 */}
      <nav className="border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
          >
            TEKTON
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="h-9 px-5 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">
            Choose your plan
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            Premium React templates with AI-powered design system.
            <br className="hidden sm:block" />
            Start building production-ready interfaces today.
          </p>
        </FadeIn>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 md:px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.1}>
              <div
                className={`relative flex flex-col h-full p-6 md:p-8 rounded-2xl border transition-shadow hover:shadow-lg ${
                  plan.featured
                    ? 'border-neutral-900 ring-2 ring-neutral-900'
                    : 'border-neutral-200'
                }`}
              >
                {/* 배지 */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full ${
                      plan.featured
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                    }`}
                  >
                    {plan.badge === 'Best Value' && (
                      <Sparkles className="w-3 h-3 inline mr-1 -mt-0.5" />
                    )}
                    {plan.badge}
                  </div>
                )}

                {/* 플랜 이름 + 설명 */}
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-neutral-500 mb-6">{plan.description}</p>

                {/* 가격 */}
                <div className="mb-6">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-bold tracking-tight">
                        {plan.priceLabel}
                      </span>
                      <span className="text-neutral-500 text-sm">{plan.priceSub}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl md:text-3xl font-bold text-neutral-400">
                        {plan.priceLabel}
                      </span>
                      <p className="text-sm text-neutral-400 mt-1">{plan.priceSub}</p>
                    </div>
                  )}
                </div>

                {/* CTA 버튼 */}
                <button
                  onClick={() => router.push(plan.ctaHref)}
                  className={`w-full py-3 px-6 rounded-full text-sm font-semibold transition-colors mb-6 flex items-center justify-center gap-2 ${
                    plan.featured
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* ROSCA 자동갱신 고지 */}
                {'renewalNotice' in plan && plan.renewalNotice && (
                  <p className="text-xs text-neutral-400 mb-4 -mt-3 text-center">
                    Auto-renews at $149/year. Cancel anytime.
                  </p>
                )}

                {/* 구분선 */}
                <div className="border-t border-neutral-100 mb-6" />

                {/* 기능 목록 */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Compare plans</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 pr-4 font-medium text-neutral-500 w-1/4">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-neutral-900">Single</th>
                    <th className="text-center py-4 px-4 font-bold text-neutral-900">
                      <span className="inline-flex items-center gap-1">Double</span>
                    </th>
                    <th className="text-center py-4 pl-4 font-bold text-neutral-900">
                      Creator Pass
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature) => (
                    <tr
                      key={feature.label}
                      className="border-b border-neutral-100 last:border-none"
                    >
                      <td className="py-4 pr-4 text-neutral-700">{feature.label}</td>
                      {(['single', 'double', 'creator'] as const).map((plan) => {
                        const value = feature[plan];
                        return (
                          <td key={plan} className="py-4 px-4 text-center">
                            {value === true ? (
                              <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                            ) : value === false ? (
                              <X className="w-4 h-4 text-neutral-300 mx-auto" />
                            ) : (
                              <span className="text-neutral-700 font-medium">{value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 md:px-8 py-16 md:py-24 max-w-5xl">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-neutral-500">
                Everything you need to know about our pricing and plans.
              </p>
            </div>
            <div className="md:col-span-8">
              <Accordion items={FAQ_ITEMS} allowMultiple />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
