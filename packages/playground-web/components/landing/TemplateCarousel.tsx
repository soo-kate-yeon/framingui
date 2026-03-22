'use client';

import { ScrollReveal } from '../explore/landing/ScrollReveal';
import { ThemeRecipeCard } from './ThemeRecipeCard';

// ============================================================================
// Types
// ============================================================================

interface TemplateCarouselProps {
  content: {
    title: string;
    subtitle: string;
    copyPromptLabel: string;
  };
  templates: {
    id: string;
    name: string;
    description: string;
    descriptionKo?: string;
    thumbnail?: string;
  }[];
}

// ============================================================================
// TemplateCarousel
// ============================================================================

export function TemplateCarousel({ content, templates }: TemplateCarouselProps) {
  return (
    <section className="py-12 md:py-16 overflow-x-hidden">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
            {content.title}
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500">{content.subtitle}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div
          className="scrollbar-hide flex gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-6 md:px-8 pb-2"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            touchAction: 'pan-x pan-y',
          }}
        >
          {templates.map((template) => (
            <ThemeRecipeCard
              key={template.id}
              template={template}
              copyPromptLabel={content.copyPromptLabel}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
