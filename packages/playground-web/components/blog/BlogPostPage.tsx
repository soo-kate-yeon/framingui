'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ReadingProgressBar } from './ReadingProgressBar';
import { Breadcrumbs } from './Breadcrumbs';
import { BlogHero } from './BlogHero';
import { TableOfContents } from './TableOfContents';
import { ShareButtons } from './ShareButtons';
import { RelatedPosts } from './RelatedPosts';
import { InlineCTA } from '@/components/shared/InlineCTA';
import { GlobalLanguageSwitcher } from '@/components/shared/GlobalLanguageSwitcher';
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';
import { createHeadingIdFactory } from '@/lib/heading';
import type { BlogPost, BlogPostSummary } from '@/lib/blog';

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: { en: BlogPostSummary[]; ko: BlogPostSummary[]; ja: BlogPostSummary[] };
}

export function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const router = useRouter();
  const { locale } = useGlobalLanguage();
  const [darkMode, setDarkMode] = useState(false);

  const blogContent = getBlogContent(locale);
  const fm = post.frontmatter[locale];
  const content = post.content[locale];
  const toc = post.toc[locale];
  const rt = post.readingTime[locale];
  const related = relatedPosts[locale];
  const nextHeadingId = createHeadingIdFactory();

  // 다크모드 persistence
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

  const goBack = () => {
    router.push('/blog');
  };

  const postUrl = `https://framingui.com/blog/${post.slug}`;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <ReadingProgressBar />

      {/* 헤더 */}
      <header className="sticky top-1 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={goBack}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label={blogContent.post.backToBlog}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label={blogContent.header.toggleDarkMode}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
              )}
            </button>
          </div>

          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate mx-4 hidden sm:block">
            {fm.title}
          </span>

          <GlobalLanguageSwitcher compact className="font-serif" />
        </div>
      </header>

      {/* 메인 */}
      <div className="flex min-h-screen bg-white dark:bg-neutral-900 transition-colors max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="flex-1 max-w-4xl w-full">
          <div className="py-8 sm:py-12 pr-0 xl:pr-8">
            {/* 브레드크럼 */}
            <Breadcrumbs
              items={[
                { label: 'Blog', href: '/blog' },
                { label: fm.category, href: `/blog/tag/${fm.tags[0]?.toLowerCase() || ''}` },
                { label: fm.title },
              ]}
            />

            {/* 히어로 */}
            <BlogHero frontmatter={fm} readingTime={rt} />

            {/* 본문 */}
            <article className="blog-article-content">
              <div className="blog-prose">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => {
                      const text = String(children);
                      const id = nextHeadingId(text);
                      return (
                        <h2
                          id={id}
                          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-12 sm:mt-16 mb-4 sm:mb-6 scroll-mt-20"
                        >
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => {
                      const text = String(children);
                      const id = nextHeadingId(text);
                      return (
                        <h3
                          id={id}
                          className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-3 scroll-mt-20"
                        >
                          {children}
                        </h3>
                      );
                    },
                    p: ({ children }) => (
                      <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {children}
                      </strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-outside pl-6 space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-outside pl-6 space-y-2 mb-4 text-neutral-700 dark:text-neutral-300">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 py-2 my-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full text-sm border-collapse">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-neutral-50 dark:bg-neutral-800">{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="text-left px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 border-b border-neutral-100 dark:border-neutral-800">
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="my-8 sm:my-12 border-neutral-200 dark:border-neutral-800" />
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-neutral-900 dark:text-neutral-100 underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    img: ({ src, alt }) => (
                      <figure className="my-6">
                        <img
                          src={src}
                          alt={alt || ''}
                          className="w-full rounded-lg"
                          loading="lazy"
                        />
                        {alt && (
                          <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    ),
                    pre: ({ children }) => (
                      <pre className="relative my-6 overflow-x-auto rounded-lg bg-neutral-950 dark:bg-neutral-800 p-4 text-sm">
                        {children}
                      </pre>
                    ),
                    code: ({ className, children }) => {
                      const isBlock = className?.includes('language-');
                      if (isBlock) {
                        return (
                          <code className="text-neutral-100 font-mono text-sm">{children}</code>
                        );
                      }
                      return (
                        <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200 font-mono">
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Beta CTA */}
            <InlineCTA variant="card" />

            {/* 공유 버튼 */}
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <ShareButtons url={postUrl} title={fm.title} />
            </div>

            {/* 관련 포스트 */}
            <RelatedPosts posts={related} />
          </div>
        </main>

        {/* TOC 사이드바 */}
        <TableOfContents toc={toc} />
      </div>
    </div>
  );
}
