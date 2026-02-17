'use client';

import { BlogCard } from './BlogCard';
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';
import type { BlogPostSummary } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPostSummary[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const { locale } = useGlobalLanguage();
  const content = getBlogContent(locale);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
        {content.post.relatedPosts}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            frontmatter={post.frontmatter}
            readingTime={post.readingTime}
          />
        ))}
      </div>
    </section>
  );
}
