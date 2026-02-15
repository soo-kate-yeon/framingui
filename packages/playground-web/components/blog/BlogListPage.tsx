'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, Moon, Sun } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { TagList } from './TagList';
import type { BlogPostSummary } from '@/lib/blog';

type Locale = 'en' | 'ko';

interface BlogListPageProps {
  posts: { en: BlogPostSummary[]; ko: BlogPostSummary[] };
  allTags: { en: { tag: string; count: number }[]; ko: { tag: string; count: number }[] };
  activeTag?: string;
}

export function BlogListPage({ posts, allTags, activeTag }: BlogListPageProps) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('ko');
  const [darkMode, setDarkMode] = useState(false);

  const currentPosts = posts[locale];
  const currentTags = allTags[locale];

  // 다크모드 persistence
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 언어 설정 persistence
  useEffect(() => {
    const saved = localStorage.getItem('blogLocale');
    if (saved === 'en' || saved === 'ko') setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('blogLocale', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ko' : 'en'));
  };

  const tagNames = useMemo(() => currentTags.map((t) => t.tag), [currentTags]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label="Go home"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
              )}
            </button>
          </div>

          <h1 className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {locale === 'en' ? 'Blog' : '블로그'}
          </h1>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{locale === 'en' ? 'KO' : 'EN'}</span>
          </button>
        </div>
      </header>

      {/* 메인 */}
      <main className="bg-white dark:bg-neutral-900 transition-colors min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* 히어로 */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
              {activeTag
                ? `#${activeTag}`
                : locale === 'en'
                  ? 'Latest Posts'
                  : '최신 글'}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {locale === 'en'
                ? 'Insights on AI-powered development, design systems, and modern web engineering.'
                : 'AI 기반 개발, 디자인 시스템, 모던 웹 엔지니어링에 대한 인사이트.'}
            </p>
          </div>

          {/* 태그 필터 */}
          {tagNames.length > 0 && (
            <div className="mb-8">
              <TagList tags={tagNames} activeTag={activeTag} />
            </div>
          )}

          {/* 포스트 그리드 */}
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  frontmatter={post.frontmatter}
                  readingTime={post.readingTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
              <p className="text-lg">
                {locale === 'en' ? 'No posts found.' : '게시글이 없습니다.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
