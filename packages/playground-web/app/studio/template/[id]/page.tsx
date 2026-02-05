/**
 * Template Landing Page (Redesigned)
 *
 * Framer.com 마켓플레이스 스타일 랜딩 페이지
 * - Hero: 템플릿 이름 + 3개 버튼 (Preview, Buy for $XX, Documentation)
 * - 2x2 이미지 그리드 (대표 화면 4개)
 * - Features 섹션
 * - Recommended to use for 섹션
 * - How to use 섹션
 * - Footer 제거
 * - Framer Motion 스크롤 애니메이션 (Subtle)
 * - Mobile-optimized responsive design
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../../../../components/studio/landing';
import { CodeBlock } from '../../../../components/studio/landing/CodeBlock';
import { getTemplateData, type TemplateData } from '../../../../data/templates';

interface TemplatePageProps {
  params: Promise<{ id: string }>;
}

export default function TemplateLandingPage({ params }: TemplatePageProps) {
  const router = useRouter();
  const [templateId, setTemplateId] = useState<string>('');
  const [template, setTemplate] = useState<TemplateData | null>(null);

  // Next.js 16: params is a Promise
  useEffect(() => {
    params.then((p) => {
      setTemplateId(p.id);
      const data = getTemplateData(p.id);
      setTemplate(data);
    });
  }, [params]);

  const handlePreviewClick = () => {
    // Open demo in new window
    window.open(`/studio/${templateId}`, '_blank');
  };

  const handleBuyClick = () => {
    // Navigate to purchase page
    router.push(`/studio/checkout/${templateId}`);
  };

  const handleDocumentationClick = () => {
    // Navigate to documentation (anchor or external)
    window.open('https://docs.tekton.studio', '_blank');
  };

  // Loading state
  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-sm text-neutral-600">Loading template...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              {/* Template Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-neutral-900 mb-4 sm:mb-6">
                {template.name}
              </h1>

              {/* Description (통합된 소개글) */}
              <p className="text-base sm:text-lg text-neutral-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                {template.description}
              </p>

              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
                <button
                  type="button"
                  onClick={handlePreviewClick}
                  className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded flex items-center justify-center gap-2"
                >
                  Preview
                  <ExternalLink size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleBuyClick}
                  className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded"
                >
                  Buy for ${template.price}
                </button>

                <button
                  type="button"
                  onClick={handleDocumentationClick}
                  className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-900 transition-colors rounded flex items-center justify-center gap-2"
                >
                  Documentation
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Image Grid Section (2x2) - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {template.screenshots.slice(0, 4).map((screenshot, index) => (
                <div
                  key={index}
                  className="aspect-video bg-neutral-200 rounded overflow-hidden border border-neutral-300"
                >
                  <img
                    src={screenshot}
                    alt={`${template.name} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-neutral-100">
                          <span class="text-xs text-neutral-400 uppercase tracking-wider">Screenshot ${index + 1}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-8 sm:mb-12 text-center">
              Features
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {template.features.map((feature, index) => (
              <ScrollReveal key={index} delay={0.25 + index * 0.05}>
                <div className="p-5 sm:p-6 bg-neutral-50 border border-neutral-200 rounded">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended to use for Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.3}>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-6 sm:mb-8">
              Recommended to use for
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <ul className="space-y-3 sm:space-y-4">
              {template.recommendedFor.map((useCase, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-base sm:text-lg text-neutral-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* How to use Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.4}>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-8 sm:mb-12">
              How to use
            </h2>
          </ScrollReveal>

          <div className="space-y-6 sm:space-y-8">
            {template.howToUse.map((step, index) => (
              <ScrollReveal key={index} delay={0.45 + index * 0.05}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Step Number - Mobile Optimized */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-base sm:text-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Step Content - Mobile Optimized */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4">
                      {step.description}
                    </p>

                    {step.code && (
                      <div className="overflow-x-auto">
                        <CodeBlock code={step.code} language="bash" />
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0.5}>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-neutral-900 mb-4 sm:mb-6">
              Ready to start?
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 px-2">
              Purchase now and start building your next project with {template.name}.
            </p>
            <button
              type="button"
              onClick={handleBuyClick}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded"
            >
              Buy for ${template.price}
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
