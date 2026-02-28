/**
 * ArticleContent Component
 *
 * 기사 본문 콘텐츠 렌더러 (텍스트, 이미지, 인용구, 헤딩)
 */

import type { ContentSection } from '@/lib/data/articles';
import { createHeadingIdFactory } from '@/lib/heading';

export interface ArticleContentProps {
  content: ContentSection[];
}

export function ArticleContent({ content }: ArticleContentProps) {
  const nextHeadingId = createHeadingIdFactory();

  return (
    <div className="article-content max-w-3xl">
      {content.map((section, index) => {
        switch (section.type) {
          case 'heading': {
            const headingId = nextHeadingId(section.content);
            const HeadingTag = section.level === 2 ? 'h2' : 'h3';
            const headingClass =
              section.level === 2
                ? 'font-sans text-2xl md:text-3xl font-bold uppercase tracking-wide text-neutral-900 mb-6 mt-12 first:mt-0'
                : 'font-sans text-xl md:text-2xl font-bold text-neutral-800 mb-4 mt-8';

            return (
              <HeadingTag key={index} id={headingId} className={headingClass}>
                {section.content}
              </HeadingTag>
            );
          }

          case 'text':
            return (
              <p
                key={index}
                className="font-serif text-lg md:text-xl leading-relaxed text-neutral-700 mb-8 first-of-type:first-letter:text-7xl first-of-type:first-letter:font-bold first-of-type:first-letter:float-left first-of-type:first-letter:mr-2 first-of-type:first-letter:leading-none"
              >
                {section.content}
              </p>
            );

          case 'quote':
            return (
              <blockquote key={index} className="my-12 pl-8 border-l-4 border-neutral-900">
                <p className="font-serif text-2xl md:text-3xl leading-snug text-neutral-900 italic mb-4">
                  "{section.content}"
                </p>
                {section.author && (
                  <cite className="font-sans text-sm font-bold uppercase tracking-widest text-neutral-600 not-italic">
                    — {section.author}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
