"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react";

/**
 * Equinox Fitness V2 Documentation Page
 * Nextra-style 3-column layout with elite luxury aesthetics
 * Theme: True Black Canvas, 0px Radius, Typography Hierarchy
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

export default function EquinoxFitnessV2Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark for Equinox
  const [activeSection, setActiveSection] = useState("introduction");

  // Dark mode persistence
  useEffect(() => {
    const saved = localStorage.getItem("equinox-darkMode");
    if (saved) {
      setDarkMode(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("equinox-darkMode", darkMode.toString());
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
      if (element) {
        observer.observe(element);
      }
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
          className="fixed inset-0 bg-black/80 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main container */}
      <div className="flex min-h-screen bg-white dark:bg-black transition-colors">
        {/* Center Content */}
        <main className="flex-1 max-w-5xl mx-auto">
          {/* Header with mobile menu */}
          <header className="sticky top-0 z-30 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
            {/* Left: Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-neutral-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-600" />
              )}
            </button>

            {/* Center: Title */}
            <h1 className="text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
              Equinox Fitness V2
            </h1>

            {/* Right: TOC toggle (mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle table of contents"
            >
              <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>

            {/* Spacer for desktop (when menu button is hidden) */}
            <div className="hidden xl:block w-9" />
          </header>

          {/* Documentation content */}
          <article className="px-6 py-12 text-neutral-900 dark:text-white selection:bg-white selection:text-black">
            {/* Introduction */}
            <section id="introduction" className="mb-24 scroll-mt-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 mb-4 block">
                Getting Started
              </span>
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">Introduction</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Equinox Fitness V2는 엘리트 피트니스 경험을 위한 프리미엄 디자인 시스템입니다.
                True Black 캔버스, 완벽한 기하학, 그리고 강력한 타이포그래피 계층 구조로 탁월함을 표현합니다.
              </p>
              <div className="bg-neutral-900/50 dark:bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  <strong className="text-neutral-900 dark:text-white">핵심 원칙:</strong> True Black (#000000), 0px Radius, Typography as Hierarchy
                </p>
              </div>
            </section>

            {/* Design Principles */}
            <section id="design-principles" className="mb-24 scroll-mt-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 mb-4 block">
                Core Concepts
              </span>
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">Design Principles</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">1. True Black Canvas</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    순수한 #000000 배경은 최대 대비를 생성하며 모든 요소가 시선을 사로잡습니다.
                    화이트와의 극적인 대비로 프리미엄 감성을 표현합니다.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">✓ Correct</div>
                      <div className="w-full h-16 bg-black dark:bg-white"></div>
                      <div className="text-xs text-neutral-500 mt-2 font-mono">#000000</div>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">✗ Wrong</div>
                      <div className="w-full h-16 bg-neutral-800"></div>
                      <div className="text-xs text-neutral-500 mt-2 font-mono">#262626</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">2. 0px Radius (Absolute Precision)</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    둥근 모서리는 일체 사용하지 않습니다. 날카로운 엣지는 힘, 규율, 엘리트 미학을 전달합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">3. Typography Hierarchy</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    볼드 대문자 헤드라인, 타이트한 트래킹, 의도적인 간격으로 명확한 시각적 계층을 구축합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Component Recipes */}
            <section id="component-recipes" className="mb-24 scroll-mt-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 mb-4 block">
                UI Components
              </span>
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">Component Recipes</h2>

              <div className="space-y-12">
                {/* Button */}
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Button</h3>
                  <div className="flex gap-4 flex-wrap mb-4">
                    <button className="bg-white dark:bg-white text-black h-14 px-10 uppercase tracking-widest text-xs font-bold hover:bg-neutral-200 transition-colors">
                      Primary
                    </button>
                    <button className="bg-transparent border border-white/30 text-neutral-900 dark:text-white h-14 px-10 uppercase tracking-widest text-xs font-bold hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
                      Secondary
                    </button>
                    <button className="bg-transparent text-neutral-600 dark:text-neutral-500 px-6 py-3 uppercase tracking-widest text-xs font-medium hover:text-neutral-900 dark:hover:text-white">
                      Ghost
                    </button>
                  </div>
                  <pre className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-4 overflow-x-auto text-sm">
                    <code>{`className="bg-white text-black h-14 px-10 uppercase tracking-widest text-xs font-bold"`}</code>
                  </pre>
                </div>

                {/* Card */}
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="bg-neutral-900/50 dark:bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-6 hover:bg-neutral-900/80 transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Glass Elite</div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Premium depth</p>
                    </div>
                    <div className="bg-transparent border border-neutral-200 dark:border-neutral-800 p-6">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Outlined</div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Structured power</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-900 border-none p-6">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Solid</div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">Bold foundation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Typography System */}
            <section id="typography-system" className="mb-24 scroll-mt-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 mb-4 block">
                Text Styles
              </span>
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">Typography System</h2>

              <div className="space-y-8">
                <div>
                  <div className="text-7xl font-bold uppercase tracking-tighter text-neutral-900 dark:text-white leading-none mb-2">
                    Elite
                  </div>
                  <code className="text-sm text-neutral-500 dark:text-neutral-400">text-7xl font-bold uppercase tracking-tighter</code>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Eyebrow Label
                  </div>
                  <code className="text-sm text-neutral-500 dark:text-neutral-400">text-[10px] font-bold uppercase tracking-[0.2em]</code>
                </div>

                <div>
                  <div className="text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                    Body text with relaxed leading for premium reading experience.
                  </div>
                  <code className="text-sm text-neutral-500 dark:text-neutral-400">text-lg font-normal leading-relaxed</code>
                </div>
              </div>
            </section>

            {/* Layout System */}
            <section id="layout-system" className="mb-24 scroll-mt-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 mb-4 block">
                Structure
              </span>
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">Layout System</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">Section Spacing</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    섹션 간격: <code className="bg-neutral-100 dark:bg-neutral-900 px-2 py-1">py-24</code> (96px vertical padding)
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">Border Treatment</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Bottom borders only: <code className="bg-neutral-100 dark:bg-neutral-900 px-2 py-1">border-b border-white/10</code>
                  </p>
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-12 bg-neutral-900/50 dark:bg-neutral-900/50 border-b border-white/10"></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Usage Examples */}
            <section id="usage-examples" className="mb-24 scroll-mt-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 mb-4 block">
                Implementation
              </span>
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6">Usage Examples</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Elite Card Component</h3>
                  <pre className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-4 overflow-x-auto text-sm">
                    <code>{`<div className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-6">
  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-2">
    Label
  </span>
  <div className="text-3xl font-bold tracking-tight">
    Value
  </div>
</div>`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Previous/Next Navigation */}
            <nav className="border-t border-neutral-200 dark:border-neutral-800 pt-12 mt-24">
              <div className="flex justify-between items-center">
                <a
                  href="/studio/equinox-fitness-v2"
                  className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Previous</div>
                    <div className="text-sm font-semibold">Landing Page</div>
                  </div>
                </a>

                <a
                  href="/studio/equinox-fitness-v2/dashboard"
                  className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-right"
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Next</div>
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
            fixed xl:sticky top-0 right-0 h-screen w-64 bg-white dark:bg-black
            border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto z-50
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"}
          `}
        >
          <div className="p-6">
            {/* Close button (mobile only) */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
                On This Page
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="xl:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
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
                        text-sm text-left w-full py-1 transition-all uppercase tracking-tight
                        ${
                          activeSection === id
                            ? "text-neutral-900 dark:text-white font-bold border-l-2 border-neutral-900 dark:border-white pl-3"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white pl-3"
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
