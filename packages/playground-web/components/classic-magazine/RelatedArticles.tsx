/**
 * RelatedArticles Component
 *
 * 관련 기사 그리드
 */

import Link from 'next/link';
import type { Article } from '@/lib/data/articles';

export interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="my-16 py-12 border-t-2 border-neutral-900">
      <div className="max-w-6xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-neutral-900">
            Related Articles
          </h3>
          <Link
            href="/studio/classic-magazine"
            className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <Link href={`/studio/classic-magazine/article/${article.id}`}>
                {/* Thumbnail Placeholder */}
                <div className="aspect-[4/3] bg-neutral-100 border border-neutral-200 mb-4 relative group-hover:border-neutral-900 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif italic text-2xl text-neutral-300">(Image)</span>
                  </div>
                </div>

                {/* Category */}
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-red-700 mb-2 block">
                  {article.category}
                </span>

                {/* Title */}
                <h4 className="font-serif text-xl font-bold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">
                  {article.title}
                </h4>

                {/* Subtitle */}
                <p className="font-serif text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-3">
                  {article.subtitle}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-neutral-400">
                  <span className="text-neutral-900 font-bold">{article.author.name}</span>
                  <span>•</span>
                  <span>{article.readTime} Min Read</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
