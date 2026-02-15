'use client';

import { BlogCard } from './BlogCard';
import type { BlogPostSummary } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPostSummary[];
  locale: 'en' | 'ko';
}

export function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
        {locale === 'en' ? 'Related Posts' : '관련 글'}
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
