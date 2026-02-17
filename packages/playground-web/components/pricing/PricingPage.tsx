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
import { GlobalLanguageSwitcher } from '../shared/GlobalLanguageSwitcher';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';
import { getPricingContent } from '../../data/i18n/pricing';

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

/* ─── 컴포넌트 ─── */
export function PricingPage() {
  const router = useRouter();
  const { locale } = useGlobalLanguage();
  const content = getPricingContent(locale);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* 네비게이션 */}
      <nav className="border-b border-neutral-200">
        <div className="container mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
          >
            {content.nav.brandName}
          </button>
          <div className="flex items-center gap-4">
            <GlobalLanguageSwitcher />
            <button
              onClick={() => router.push('/auth/signup')}
              className="h-9 px-5 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              {content.nav.getStarted}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">
            {content.hero.title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            {content.hero.description}
          </p>
        </FadeIn>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 md:px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {(['single', 'double', 'creator'] as const).map((planId, index) => {
            const planContent = content.plans[planId];
            const planData = PLANS.find((p) => p.id === planId)!;

            return (
              <FadeIn key={planId} delay={index * 0.1}>
                <div
                  className={`relative flex flex-col h-full p-6 md:p-8 rounded-2xl border transition-shadow hover:shadow-lg ${
                    planData.featured
                      ? 'border-neutral-900 ring-2 ring-neutral-900'
                      : 'border-neutral-200'
                  }`}
                >
                  {/* 배지 */}
                  {planData.badge && (
                    <div
                      className={`absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full ${
                        planData.featured
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                      }`}
                    >
                      {planData.badge === 'Best Value' && (
                        <Sparkles className="w-3 h-3 inline mr-1 -mt-0.5" />
                      )}
                      {'badge' in planContent && planContent.badge}
                    </div>
                  )}

                  {/* 플랜 이름 + 설명 */}
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{planContent.name}</h3>
                  <p className="text-sm text-neutral-500 mb-6">{planContent.description}</p>

                  {/* 가격 */}
                  <div className="mb-6">
                    {planData.price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-bold tracking-tight">
                          {planContent.priceLabel}
                        </span>
                        <span className="text-neutral-500 text-sm">{planContent.priceSub}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl md:text-3xl font-bold text-neutral-400">
                          {planContent.priceLabel}
                        </span>
                        <p className="text-sm text-neutral-400 mt-1">{planContent.priceSub}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA 버튼 */}
                  <button
                    onClick={() => router.push(planData.ctaHref)}
                    className={`w-full py-3 px-6 rounded-full text-sm font-semibold transition-colors mb-6 flex items-center justify-center gap-2 ${
                      planData.featured
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    {planContent.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* ROSCA 자동갱신 고지 */}
                  {'renewalNotice' in planContent && planContent.renewalNotice && (
                    <p className="text-xs text-neutral-400 mb-4 -mt-3 text-center">
                      {planContent.renewalNotice}
                    </p>
                  )}

                  {/* 구분선 */}
                  <div className="border-t border-neutral-100 mb-6" />

                  {/* 기능 목록 */}
                  <ul className="space-y-3 flex-1">
                    {planContent.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              {content.comparison.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 pr-4 font-medium text-neutral-500 w-1/4">
                      {content.comparison.tableHeaders.feature}
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-neutral-900">
                      {content.comparison.tableHeaders.single}
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-neutral-900">
                      <span className="inline-flex items-center gap-1">
                        {content.comparison.tableHeaders.double}
                      </span>
                    </th>
                    <th className="text-center py-4 pl-4 font-bold text-neutral-900">
                      {content.comparison.tableHeaders.creator}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Templates included */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.templatesIncluded}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.single.templatesIncluded}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.double.templatesIncluded}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.creator.templatesIncluded}
                      </span>
                    </td>
                  </tr>

                  {/* Future templates */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.futureTemplates}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                  </tr>

                  {/* Update duration */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.updateDuration}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.single.updateDuration}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.double.updateDuration}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.creator.updateDuration}
                      </span>
                    </td>
                  </tr>

                  {/* Commercial use */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.commercialUse}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                  </tr>

                  {/* Email support */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.emailSupport}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.single.emailSupport}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.double.emailSupport}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-neutral-700 font-medium">
                        {content.comparison.values.creator.emailSupport}
                      </span>
                    </td>
                  </tr>

                  {/* Priority queue */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.priorityQueue}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="w-4 h-4 text-neutral-300 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                  </tr>

                  {/* Community Discord */}
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.communityDiscord}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                  </tr>

                  {/* Documentation */}
                  <tr className="border-b border-neutral-100 last:border-none">
                    <td className="py-4 pr-4 text-neutral-700">
                      {content.comparison.features.documentation}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-4 h-4 text-neutral-900 mx-auto" />
                    </td>
                  </tr>
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
              <h2 className="text-3xl font-bold tracking-tight mb-4">{content.faq.title}</h2>
              <p className="text-lg text-neutral-500">{content.faq.subtitle}</p>
            </div>
            <div className="md:col-span-8">
              <Accordion items={content.faq.items} allowMultiple />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
