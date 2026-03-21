'use client';

import { ScrollReveal } from '../explore/landing/ScrollReveal';
import { Accordion } from './Accordion';

interface FAQSectionProps {
  content: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      content: string;
    }[];
  };
}

export function FAQSection({ content }: FAQSectionProps) {
  const { title, subtitle, items } = content;

  return (
    <ScrollReveal>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>
        </div>

        <Accordion items={items} />
      </section>
    </ScrollReveal>
  );
}
