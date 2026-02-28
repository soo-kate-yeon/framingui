'use client';

import { Clock, Calendar, User } from 'lucide-react';
import { TagList } from './TagList';
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';
import type { BlogFrontmatter } from '@/lib/blog';

interface BlogHeroProps {
  frontmatter: BlogFrontmatter;
  readingTime: number;
}

export function BlogHero({ frontmatter, readingTime }: BlogHeroProps) {
  const { locale } = useGlobalLanguage();
  const content = getBlogContent(locale);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    locale === 'ko' ? 'ko-KR' : locale === 'ja' ? 'ja-JP' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <header className="mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800">
      {/* 카테고리 */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full">
          {frontmatter.category}
        </span>
      </div>

      {/* 제목 */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4 leading-tight">
        {frontmatter.title}
      </h1>

      {/* 설명 */}
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 max-w-3xl">
        {frontmatter.description}
      </p>

      {/* 메타 정보 */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          {frontmatter.author.name}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <time dateTime={frontmatter.date}>{formattedDate}</time>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {readingTime} {content.meta.readingTime}
        </span>
      </div>

      {/* 태그 */}
      <TagList tags={frontmatter.tags} />
    </header>
  );
}
