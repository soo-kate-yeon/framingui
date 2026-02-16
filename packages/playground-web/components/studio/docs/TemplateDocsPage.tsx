/**
 * Unified Template Documentation Page Component
 *
 * Nextra-style 3-column layout for template design system documentation
 * - Left: Empty (for future navigation)
 * - Center: Documentation content
 * - Right: Table of contents
 */

'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { TemplateDocsData } from '../../../data/template-docs';

interface TemplateDocsPageProps {
  data: TemplateDocsData;
}

export function TemplateDocsPage({ data }: TemplateDocsPageProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('philosophy');

  // Dark mode persistence
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

  // Intersection Observer for active section tracking
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

    data.tocSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [data.tocSections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  };

  const goBack = () => {
    router.push(`/studio/template/${data.id}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header - Full width across all columns */}
      <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Left: Back + Dark mode */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={goBack}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Back to template"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
              )}
            </button>
          </div>

          {/* Center: Title */}
          <h1 className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate mx-2 sm:mx-4">
            {data.name}
          </h1>

          {/* Right: TOC toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle table of contents"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400" />
          </button>

          {/* Spacer for desktop */}
          <div className="hidden xl:block w-9" />
        </div>
      </header>

      {/* Main container */}
      <div className="flex min-h-screen bg-white dark:bg-neutral-900 transition-colors">
        {/* Center Content */}
        <main className="flex-1 max-w-5xl mx-auto">
          {/* Documentation content */}
          <article className="px-4 sm:px-6 py-8 sm:py-12 text-neutral-900 dark:text-neutral-100">
            {/* Design Philosophy */}
            <section id="philosophy" className="mb-16 sm:mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4 block">
                Design System
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                Design Philosophy
              </h2>

              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 sm:mb-6 font-medium">
                {data.philosophy.tagline}
              </p>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 sm:mb-8">
                {data.philosophy.description}
              </p>

              <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-neutral-900 dark:text-neutral-100">
                  Core Principles
                </h3>
                <ul className="space-y-3">
                  {data.philosophy.principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Color Tokens */}
            <section id="color-tokens" className="mb-16 sm:mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4 block">
                Visual Language
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                Color Tokens
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {data.colorTokens.map((token, index) => (
                  <div
                    key={index}
                    className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                  >
                    <div className="h-24 sm:h-32 w-full" style={{ backgroundColor: token.hex }} />
                    <div className="p-3 sm:p-4 bg-white dark:bg-neutral-800">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                          {token.name}
                        </h3>
                        <code className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                          {token.hex}
                        </code>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                        {token.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography Tokens */}
            <section id="typography-tokens" className="mb-16 sm:mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4 block">
                Text Styles
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                Typography Tokens
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {data.typographyTokens.map((token, index) => (
                  <div
                    key={index}
                    className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 sm:p-6"
                  >
                    <div
                      className="mb-3 sm:mb-4 text-neutral-900 dark:text-neutral-100 break-words"
                      style={{
                        fontSize: `clamp(${parseInt(token.fontSize) * 0.7}px, 5vw, ${token.fontSize})`,
                        fontWeight: token.fontWeight,
                        lineHeight: token.lineHeight,
                        letterSpacing: token.letterSpacing,
                      }}
                    >
                      {token.name}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {token.usage}
                      </h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                        <code>size: {token.fontSize}</code>
                        <code>weight: {token.fontWeight}</code>
                        <code>line-height: {token.lineHeight}</code>
                        {token.letterSpacing && <code>spacing: {token.letterSpacing}</code>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Design Details */}
            <section id="design-details" className="mb-16 sm:mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4 block">
                Implementation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                Design Details
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {data.designDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 rounded-lg"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-neutral-900 dark:text-neutral-100">
                      {detail.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </main>

        {/* Right Sidebar - On This Page */}
        <aside
          className={`
            fixed xl:sticky xl:top-[57px] top-0 right-0 h-screen xl:h-[calc(100vh-57px)] w-64 bg-white dark:bg-neutral-900
            border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto z-50
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}
          `}
        >
          <div className="p-4 sm:p-6">
            {/* Close button (mobile only) */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                On This Page
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            <nav>
              <ul className="space-y-2">
                {data.tocSections.map(({ id, title }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`
                        text-sm text-left w-full py-1 transition-all
                        ${
                          activeSection === id
                            ? 'text-neutral-900 dark:text-neutral-100 font-semibold border-l-2 border-neutral-900 dark:border-white pl-3'
                            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 pl-3'
                        }
                      `}
                    >
                      {title}
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
