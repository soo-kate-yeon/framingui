'use client';

import Link from 'next/link';

interface TagListProps {
  tags: string[];
  activeTag?: string;
}

export function TagList({ tags, activeTag }: TagListProps) {
  const normalizedTags = tags.filter((tag) => tag.trim().length > 0);

  return (
    <div className="flex flex-wrap gap-2">
      {normalizedTags.map((tag) => {
        const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
        return (
          <Link
            key={tag}
            href={`/blog/tag/${tag.toLowerCase()}`}
            className={`
              inline-block px-3 py-1 text-xs font-medium rounded-full border transition-colors
              ${
                isActive
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white'
                  : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700'
              }
            `}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
