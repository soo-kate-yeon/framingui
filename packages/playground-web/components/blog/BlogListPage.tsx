'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Moon, Sun, SlidersHorizontal } from 'lucide-react';
import { Checkbox } from '@framingui/ui';
import { BlogCard } from './BlogCard';
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';
import { GlobalLanguageSwitcher } from '@/components/shared/GlobalLanguageSwitcher';
import type { BlogPostSummary } from '@/lib/blog';

const POSTS_PER_PAGE = 12;
const CATEGORIES = ['How-to', 'Concept', 'Deep Dive', 'Comparison'];

interface BlogListPageProps {
  posts: { en: BlogPostSummary[]; ko: BlogPostSummary[] };
  allTags: {
    en: { tag: string; count: number }[];
    ko: { tag: string; count: number }[];
  };
  activeTag?: string;
}

export function BlogListPage({ posts, allTags, activeTag }: BlogListPageProps) {
  const router = useRouter();
  const { locale } = useGlobalLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    activeTag ? new Set([activeTag]) : new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const content = getBlogContent(locale);
  const currentPosts = posts[locale];
  const currentTags = allTags[locale];

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
    setCurrentPage(1);
  };

  const filteredPosts = useMemo(() => {
    return currentPosts.filter((post) => {
      const catMatch =
        selectedCategories.size === 0 || selectedCategories.has(post.frontmatter.category);
      const tagMatch =
        selectedTags.size === 0 ||
        post.frontmatter.tags.some((t) => selectedTags.has(t.toLowerCase()));
      return catMatch && tagMatch;
    });
  }, [currentPosts, selectedCategories, selectedTags]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const activeFiltersCount = selectedCategories.size + selectedTags.size;

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedTags(new Set());
    setCurrentPage(1);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header
        className="sticky z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800"
        style={{ top: 'var(--banner-h, 0px)' }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label={content.header.backToHome}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label={content.header.toggleDarkMode}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="lg:hidden relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neutral-950 text-white text-[10px] rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          <h1 className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {content.header.title}
          </h1>

          <GlobalLanguageSwitcher compact className="font-serif" />
        </div>
      </header>

      <main className="bg-white dark:bg-neutral-900 transition-colors min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
              {content.list.latestPosts}
            </h2>
            <p className="text-base text-neutral-500 dark:text-neutral-400">
              {content.list.description}
            </p>
          </div>

          <div className="flex gap-12">
            {/* Sidebar */}
            <aside
              className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-48 shrink-0 lg:sticky lg:self-start`}
              style={{ top: 'calc(var(--banner-h, 0px) + 57px)' }}
            >
              {/* Category */}
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                  Category
                </p>
                <div className="flex flex-col gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <Checkbox
                        checked={selectedCategories.has(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      <span className="text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors select-none">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-5" />

              {/* Tags */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                  Tags
                </p>
                <div className="flex flex-col gap-2.5">
                  {currentTags.map(({ tag }) => (
                    <label key={tag} className="flex items-center gap-2.5 cursor-pointer group">
                      <Checkbox
                        checked={selectedTags.has(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      <span className="text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors select-none">
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-5 text-xs text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors underline underline-offset-2"
                >
                  Clear all ({activeFiltersCount})
                </button>
              )}
            </aside>

            {/* Posts */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </p>

              {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedPosts.map((post) => (
                    <BlogCard
                      key={post.slug}
                      slug={post.slug}
                      frontmatter={post.frontmatter}
                      readingTime={post.readingTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-neutral-400 dark:text-neutral-500">
                  <p className="text-base">{content.list.noPosts}</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 text-sm font-medium rounded-full transition-colors ${
                        page === currentPage
                          ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
