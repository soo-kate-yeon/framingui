'use client';

/**
 * ReadingProgress Component
 *
 * 읽기 진행 표시기 (상단 고정 바) + Nextra 스타일 목차 사이드바
 */

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { ContentSection } from '@/lib/data/articles';
import { createHeadingIdFactory } from '@/lib/heading';

export interface ReadingProgressProps {
  articleTitle: string;
  content: ContentSection[];
}

interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

export function ReadingProgress({ articleTitle, content }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // 읽기 진행률 계산 (NaN 버그 수정)
  useEffect(() => {
    const calculateProgress = () => {
      const articleContent = document.querySelector('.article-content');
      if (!articleContent) {
        return;
      }

      const windowHeight = window.innerHeight;
      const articleRect = articleContent.getBoundingClientRect();
      const articleHeight = articleContent.scrollHeight;
      const articleTop = articleRect.top + window.scrollY;

      // 스크롤 가능한 높이 계산 (article content 기준)
      const scrollableHeight = articleHeight - windowHeight;

      // documentHeight가 0 이하인 경우 처리
      if (scrollableHeight <= 0) {
        setProgress(100);
        return;
      }

      // 현재 스크롤 위치 (article 시작점 기준)
      const scrolled = Math.max(0, window.scrollY - articleTop);

      // 진행률 계산 (0-100 범위로 제한)
      const progressPercent = (scrolled / scrollableHeight) * 100;
      setProgress(Math.max(0, Math.min(100, progressPercent)));
    };

    window.addEventListener('scroll', calculateProgress);
    calculateProgress();

    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  // DOM에서 heading 추출 (Nextra 스타일 TOC)
  useEffect(() => {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) {
      return;
    }

    const nextHeadingId = createHeadingIdFactory();
    const headings = articleContent.querySelectorAll('h2, h3');
    const toc: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id || nextHeadingId(heading.textContent || ''),
      text: heading.textContent || '',
      level: heading.tagName.toLowerCase() as 'h2' | 'h3',
    }));

    setTableOfContents(toc);
  }, [content]);

  // Scroll Spy - IntersectionObserver로 활성 섹션 추적
  useEffect(() => {
    if (tableOfContents.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px', // Nextra-style threshold
      }
    );

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  // 섹션으로 스크롤
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setIsTableOfContentsOpen(false);
  };

  return (
    <>
      {/* Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
        <div
          className="h-1 bg-neutral-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
              className="p-2 hover:bg-neutral-100 transition-colors lg:hidden"
              aria-label="Toggle table of contents"
            >
              {isTableOfContentsOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-600 truncate max-w-xs md:max-w-md">
              {articleTitle}
            </span>
          </div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Table of Contents Sidebar (Desktop) - Nextra Style */}
      <aside className="hidden lg:block fixed top-24 right-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="bg-white border border-neutral-200 p-6">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4 pb-2 border-b border-neutral-900">
            Table of Contents
          </h3>
          <nav>
            <ul className="space-y-2">
              {tableOfContents.map(({ id, text, level }) => (
                <li key={id} className={level === 'h3' ? 'pl-4' : ''}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className={`
                      block text-sm transition-colors
                      ${level === 'h2' ? 'font-bold' : 'font-normal'}
                      ${
                        activeId === id
                          ? 'text-neutral-900 border-l-2 border-neutral-900 pl-3'
                          : 'text-neutral-600 hover:text-neutral-900 pl-3 border-l-2 border-transparent'
                      }
                    `}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Table of Contents Mobile Drawer - Nextra Style */}
      {isTableOfContentsOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto"
          style={{ top: '57px' }}
        >
          <div className="p-6">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-900 mb-6 pb-2 border-b border-neutral-900">
              Table of Contents
            </h3>
            <nav>
              <ul className="space-y-3">
                {tableOfContents.map(({ id, text, level }) => (
                  <li key={id} className={level === 'h3' ? 'pl-4' : ''}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      className={`
                        block text-base transition-colors
                        ${level === 'h2' ? 'font-bold' : 'font-normal'}
                        ${
                          activeId === id
                            ? 'text-neutral-900 border-l-2 border-neutral-900 pl-3'
                            : 'text-neutral-600 hover:text-neutral-900 pl-3 border-l-2 border-transparent'
                        }
                      `}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for Fixed Header */}
      <div className="h-[57px]" />
    </>
  );
}
