/**
 * Legal Document Page Layout
 *
 * Nextra 스타일 레이아웃 - TemplateDocsPage 기반
 * - 헤더: 뒤로가기 + 다크모드 + EN/KO 토글
 * - 중앙: 마크다운 렌더링
 * - 우측: TOC 사이드바
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Moon, Sun, ArrowLeft, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { TocItem } from '../../lib/legal';

type Locale = 'en' | 'ko';

interface LegalPageLayoutProps {
  title: { en: string; ko: string };
  content: { en: string; ko: string };
  toc: { en: TocItem[]; ko: TocItem[] };
}

export function LegalPageLayout({ title, content, toc }: LegalPageLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [locale, setLocale] = useState<Locale>('ko');
  const [activeSection, setActiveSection] = useState('');

  const currentToc = toc[locale];
  const currentContent = content[locale];
  const currentTitle = title[locale];

  // 다크모드 persistence
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(saved === 'true');
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

  // 언어 설정 persistence
  useEffect(() => {
    const saved = localStorage.getItem('legalLocale');
    if (saved === 'en' || saved === 'ko') {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('legalLocale', locale);
  }, [locale]);

  // Intersection Observer - 활성 섹션 추적
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    // 마크다운 렌더링 후 약간의 지연을 두고 observe
    const timer = setTimeout(() => {
      currentToc.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentToc, locale]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ko' : 'en'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* 모바일 사이드바 배경 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* 왼쪽: 뒤로가기 + 다크모드 */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={goBack}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              aria-label="Go back"
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

          {/* 중앙: 제목 */}
          <h1 className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate mx-2 sm:mx-4">
            {currentTitle}
          </h1>

          {/* 오른쪽: 언어 토글 + TOC 토글 */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{locale === 'en' ? 'KO' : 'EN'}</span>
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors flex-shrink-0"
              aria-label="Toggle table of contents"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            {/* 데스크탑용 spacer */}
            <div className="hidden xl:block w-9" />
          </div>
        </div>
      </header>

      {/* 메인 컨테이너 */}
      <div className="flex min-h-screen bg-white dark:bg-neutral-900 transition-colors">
        {/* 중앙 콘텐츠 */}
        <main className="flex-1 max-w-4xl mx-auto">
          <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* 마크다운 렌더링 */}
            <div className="legal-prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // h1 - 문서 제목 (첫번째만)
                  h1: ({ children }) => (
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                      {children}
                    </h1>
                  ),
                  // h2 - 섹션 헤딩 (TOC 연동)
                  h2: ({ children }) => {
                    const text = String(children);
                    const id = text
                      .toLowerCase()
                      .replace(/[^a-z0-9가-힣\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');
                    return (
                      <h2
                        id={id}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-12 sm:mt-16 mb-4 sm:mb-6 scroll-mt-20"
                      >
                        {children}
                      </h2>
                    );
                  },
                  // h3 - 서브섹션
                  h3: ({ children }) => {
                    const text = String(children);
                    const id = text
                      .toLowerCase()
                      .replace(/[^a-z0-9가-힣\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');
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
                  li: ({ children }) => (
                    <li className="text-base leading-relaxed">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 py-2 my-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-r">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full text-sm border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                      {children}
                    </thead>
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
                  code: ({ children }) => (
                    <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200">
                      {children}
                    </code>
                  ),
                }}
              >
                {currentContent}
              </ReactMarkdown>
            </div>
          </article>
        </main>

        {/* 우측 사이드바 - On This Page */}
        <aside
          className={`
            fixed xl:sticky xl:top-[57px] top-0 right-0 h-screen xl:h-[calc(100vh-57px)] w-64 bg-white dark:bg-neutral-900
            border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto z-50
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}
          `}
        >
          <div className="p-4 sm:p-6">
            {/* 닫기 버튼 (모바일) */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {locale === 'en' ? 'On This Page' : '목차'}
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            <nav>
              <ul className="space-y-1">
                {currentToc
                  .filter((item) => item.level === 2)
                  .map(({ id, title: tocTitle }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`
                          text-sm text-left w-full py-1.5 transition-all leading-snug
                          ${
                            activeSection === id
                              ? 'text-neutral-900 dark:text-neutral-100 font-semibold border-l-2 border-neutral-900 dark:border-white pl-3'
                              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 pl-3'
                          }
                        `}
                      >
                        {tocTitle}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
