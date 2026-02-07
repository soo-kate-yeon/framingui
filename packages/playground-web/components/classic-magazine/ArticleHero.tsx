/**
 * ArticleHero Component
 *
 * 기사 상단 히어로 섹션 (제목, 부제, 카테고리, 작가 정보, 피처 이미지)
 */

import type { Author } from '@/lib/data/articles';

export interface ArticleHeroProps {
  title: string;
  subtitle: string;
  category: string;
  author: Author;
  readTime: number;
  publishDate: string;
}

export function ArticleHero({
  title,
  subtitle,
  category,
  author,
  readTime,
  publishDate,
}: ArticleHeroProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="mb-12 pb-12 border-b-2 border-neutral-900">
      {/* Category Badge */}
      <div className="mb-6">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 px-4 py-2 bg-red-50 border border-red-200">
          {category}
        </span>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          {title}
        </h1>
        <p className="font-serif text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-4xl">
          {subtitle}
        </p>
      </div>

      {/* Author Info and Meta */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-neutral-200">
        {/* Author Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-neutral-200 border border-neutral-300 flex items-center justify-center">
            <span className="font-serif text-xl text-neutral-400">
              {author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
          <div>
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-neutral-900">
              {author.name}
            </p>
            <p className="font-serif text-sm text-neutral-500 italic">Contributing Writer</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-neutral-200" />

        {/* Meta Info */}
        <div className="flex items-center gap-4 font-sans text-xs uppercase tracking-widest text-neutral-500">
          <span className="text-neutral-900 font-bold">{formattedDate}</span>
          <span>•</span>
          <span>{readTime} Min Read</span>
        </div>
      </div>

      {/* Featured Image Placeholder */}
      <div className="aspect-[16/9] md:aspect-[21/9] bg-neutral-100 border border-neutral-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif italic text-4xl text-neutral-300">(Featured Image)</span>
        </div>
      </div>
    </article>
  );
}
