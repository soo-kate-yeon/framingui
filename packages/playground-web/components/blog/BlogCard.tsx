'use client';

import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';
import type { BlogFrontmatter } from '@/lib/blog';

interface BlogCardProps {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: number;
}

export function BlogCard({ slug, frontmatter, readingTime }: BlogCardProps) {
  const { locale } = useGlobalLanguage();
  const content = getBlogContent(locale);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    locale === 'ko' ? 'ko-KR' : locale === 'ja' ? 'ja-JP' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <article className="group">
      <Link href={`/blog/${slug}`} className="block">
        {/* 커버 이미지 */}
        {frontmatter.coverImage ? (
          <div className="aspect-[16/9] mb-4 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] mb-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <span className="text-4xl font-bold text-neutral-300 dark:text-neutral-600">
              {frontmatter.title.charAt(0)}
            </span>
          </div>
        )}

        {/* 카테고리 + 태그 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {frontmatter.category}
          </span>
        </div>

        {/* 제목 */}
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors line-clamp-2">
          {frontmatter.title}
        </h2>

        {/* 설명 */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
          {frontmatter.description}
        </p>

        {/* 메타 정보 */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} {content.meta.readingTime}
          </span>
        </div>
      </Link>
    </article>
  );
}
