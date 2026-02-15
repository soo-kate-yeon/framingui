'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import type { TocItem } from '@/lib/blog';

interface TableOfContentsProps {
  toc: TocItem[];
  locale: 'en' | 'ko';
}

export function TableOfContents({ toc, locale }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

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

    const timer = setTimeout(() => {
      toc.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) { observer.observe(element); }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [toc]);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    },
    []
  );

  if (toc.length === 0) { return null; }

  const tocContent = (
    <nav>
      <ul className="space-y-1">
        {toc.map(({ id, title, level }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={`
                text-sm text-left w-full py-1.5 transition-all leading-snug
                ${level === 3 ? 'pl-6' : 'pl-3'}
                ${
                  activeSection === id
                    ? 'text-neutral-900 dark:text-neutral-100 font-semibold border-l-2 border-neutral-900 dark:border-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border-l-2 border-transparent'
                }
              `}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="hidden xl:block sticky top-16 w-64 max-h-[calc(100vh-5rem)] overflow-y-auto flex-shrink-0">
        <div className="py-6 pl-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
            {locale === 'en' ? 'On This Page' : '목차'}
          </h3>
          {tocContent}
        </div>
      </aside>

      {/* 모바일 TOC 토글 버튼 */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 p-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Open table of contents"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* 모바일 TOC 드로어 */}
      {mobileOpen && (
        <>
          <div
            className="xl:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="xl:hidden fixed top-0 right-0 h-full w-72 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  {locale === 'en' ? 'On This Page' : '목차'}
                </h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>
              {tocContent}
            </div>
          </div>
        </>
      )}
    </>
  );
}
