"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react";

/**
 * Square Minimalism Documentation Page
 * Nextra-style 3-column layout with mobile responsive design
 */

// Table of Contents data
const TOC_SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "design-principles", title: "Design Principles" },
  { id: "component-recipes", title: "Component Recipes" },
  { id: "typography-system", title: "Typography System" },
  { id: "layout-system", title: "Layout System" },
  { id: "usage-examples", title: "Usage Examples" },
];

export default function SquareMinimalismDocs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  // Dark mode persistence
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setDarkMode(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
      { rootMargin: "-20% 0px -70% 0px" }
    );

    TOC_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main container */}
      <div className="flex min-h-screen bg-white dark:bg-neutral-900 transition-colors">
        {/* Center Content */}
        <main className="flex-1 max-w-5xl mx-auto">
          {/* Header with mobile menu */}
          <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
            {/* Left: Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-neutral-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-600" />
              )}
            </button>

            {/* Center: Title */}
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Square Minimalism
            </h1>

            {/* Right: TOC toggle (mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors"
              aria-label="Toggle table of contents"
            >
              <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>

            {/* Spacer for desktop (when menu button is hidden) */}
            <div className="hidden xl:block w-9" />
          </header>

          {/* Documentation content */}
          <article className="px-6 py-12 text-neutral-900 dark:text-neutral-100">
            {/* Introduction */}
            <section id="introduction" className="mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-4 block">
                Getting Started
              </span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Introduction</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Square Minimalism은 "모서리를 없애면 본질이 드러난다"는 철학을 기반으로 한 디자인 시스템입니다.
                모든 컴포넌트에서 둥근 모서리를 완전히 제거하고, 타이포그래피와 여백을 통해 구조를 표현합니다.
              </p>
              <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 rounded-none">
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  <strong className="text-neutral-900 dark:text-neutral-100">핵심 원칙:</strong> Radius 0, Whitespace as Divider, Typography as Graphic
                </p>
              </div>
            </section>

            {/* Design Principles */}
            <section id="design-principles" className="mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-4 block">
                Core Concepts
              </span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Design Principles</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-3">1. Radius 0 (No Rounded Corners)</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    모든 요소에서 둥근 모서리를 제거합니다. 이는 디자인의 정체성을 정의하는 가장 중요한 규칙입니다.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-none">
                      <div className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">✓ Correct</div>
                      <div className="w-full h-16 bg-neutral-900 dark:bg-white rounded-none"></div>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-none">
                      <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">✗ Wrong</div>
                      <div className="w-full h-16 bg-neutral-400 rounded-lg"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">2. Whitespace as Divider</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    구분선 대신 여백을 사용하여 섹션을 나눕니다. 여백 자체가 시각적 요소가 됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">3. Typography as Graphic</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    타이포그래피를 그래픽 요소로 활용합니다. Uppercase, wide tracking으로 강조합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Component Recipes */}
            <section id="component-recipes" className="mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-4 block">
                UI Components
              </span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Component Recipes</h2>

              <div className="space-y-12">
                {/* Button */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Button</h3>
                  <div className="flex gap-4 flex-wrap mb-4">
                    <button className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-none px-8 py-3 uppercase tracking-wider text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                      Primary
                    </button>
                    <button className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-none px-8 py-3 uppercase tracking-wider text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                      Secondary
                    </button>
                    <button className="bg-transparent text-neutral-600 dark:text-neutral-400 rounded-none px-6 py-3 uppercase tracking-wider text-sm font-medium hover:text-neutral-900 dark:hover:text-neutral-100">
                      Ghost
                    </button>
                  </div>
                  <pre className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-none overflow-x-auto text-sm">
                    <code>{`className="bg-neutral-900 text-white rounded-none px-8 py-3 uppercase tracking-wider text-sm font-semibold"`}</code>
                  </pre>
                </div>

                {/* Card */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 rounded-none">
                      <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Glass</div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Translucent depth</p>
                    </div>
                    <div className="bg-transparent border border-neutral-200 dark:border-neutral-700 p-6 rounded-none">
                      <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Outlined</div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Structured lines</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border-none p-6 rounded-none">
                      <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Minimal</div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Solid foundation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Typography System */}
            <section id="typography-system" className="mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-4 block">
                Text Styles
              </span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Typography System</h2>

              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight mb-2">
                    Hero Title
                  </div>
                  <code className="text-sm text-neutral-500 dark:text-neutral-400">text-5xl font-bold tracking-tight</code>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                    Eyebrow Label
                  </div>
                  <code className="text-sm text-neutral-500 dark:text-neutral-400">text-xs font-bold uppercase tracking-[0.15em]</code>
                </div>

                <div>
                  <div className="text-base font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                    Body text with relaxed leading for comfortable reading experience.
                  </div>
                  <code className="text-sm text-neutral-500 dark:text-neutral-400">text-base font-normal leading-relaxed</code>
                </div>
              </div>
            </section>

            {/* Layout System */}
            <section id="layout-system" className="mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-4 block">
                Structure
              </span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Layout System</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Section Spacing</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    섹션 간격: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-none">py-24</code> (96px vertical padding)
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3">Grid System</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    12컬럼 그리드: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-none">grid-cols-12 gap-x-8</code>
                  </p>
                  <div className="grid grid-cols-12 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded-none"></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Usage Examples */}
            <section id="usage-examples" className="mb-24 scroll-mt-20">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-4 block">
                Implementation
              </span>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Usage Examples</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Basic Page Structure</h3>
                  <pre className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-none overflow-x-auto text-sm">
                    <code>{`<section className="py-24 px-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
    <div className="col-span-8">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-4 block">
        Eyebrow
      </span>
      <h1 className="text-5xl font-bold tracking-tight mb-6">
        Title
      </h1>
      <p className="text-base text-neutral-600 leading-relaxed">
        Body text
      </p>
    </div>
  </div>
</section>`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Previous/Next Navigation */}
            <nav className="border-t border-neutral-200 dark:border-neutral-800 pt-12 mt-24">
              <div className="flex justify-between items-center">
                <a
                  href="/studio/square-minimalism"
                  className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Previous</div>
                    <div className="text-sm font-semibold">Demo Page</div>
                  </div>
                </a>

                <a
                  href="/studio/square-minimalism/dashboard"
                  className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-right"
                >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Next</div>
                    <div className="text-sm font-semibold">Dashboard</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </article>
        </main>

        {/* Right Sidebar - On This Page */}
        <aside
          className={`
            fixed xl:sticky top-0 right-0 h-screen w-64 bg-white dark:bg-neutral-900
            border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto z-50
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"}
          `}
        >
          <div className="p-6">
            {/* Close button (mobile only) */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                On This Page
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            <nav>
              <ul className="space-y-2">
                {TOC_SECTIONS.map(({ id, title }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`
                        text-sm text-left w-full py-1 transition-all
                        ${
                          activeSection === id
                            ? "text-neutral-900 dark:text-neutral-100 font-semibold border-l-2 border-neutral-900 dark:border-white pl-3"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 pl-3"
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
