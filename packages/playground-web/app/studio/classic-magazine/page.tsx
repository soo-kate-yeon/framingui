'use client';

import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { articles } from '@/lib/data/articles';
import { PreviewBanner } from '@/components/studio/PreviewBanner';
import { useStudioLanguage } from '@/contexts/StudioLanguageContext';

/**
 * Classic Magazine - Main Page
 *
 * Theme: "Classic Magazine"
 *
 * Rules applied:
 * 1. Radius: 0px (Absolute)
 * 2. Typography: Serif Headlines (Merriweather), Sans Meta
 * 3. Borders: Divider lines (border-b, border-t), High contrast
 */
export default function ClassicMagazineDemo() {
  const { locale } = useStudioLanguage();

  // 메인 기사 (첫 번째) - 항상 존재한다고 가정
  const featuredArticle = articles[0]!;

  // 서브 기사들 (2-3번째)
  const subArticles = articles.slice(1, 3);

  // 사이드바 Editor's Picks (3-6번째)
  const editorsPicks = articles.slice(2, 6);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Preview Banner */}
      <PreviewBanner templateId="classic-magazine" templateName="Classic Magazine" />

      {/* Header (Newsstand Style) - Adjusted for banner */}
      <header className="border-b-4 border-black sticky top-12 bg-white z-40 mt-12">
        {/* Top Utility Bar */}
        <div className="border-b border-neutral-200 py-2 px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          <div className="flex gap-4">
            <span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="text-neutral-300">|</span>
            <span>Vol. 132, No. 42</span>
          </div>
          <div className="flex gap-4">
            <button className="hover:text-black">{locale === 'ko' ? '구독' : 'Subscribe'}</button>
            <button className="hover:text-black">{locale === 'ko' ? '로그인' : 'Log In'}</button>
          </div>
        </div>

        {/* Main Masthead */}
        <div className="py-6 md:py-8 text-center relative px-6 group">
          <button className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 transition-colors">
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none scale-y-90 px-12 sm:px-16 md:px-20">
            The Tekton Times
          </h1>

          <button className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 transition-colors">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="border-t border-black py-3 flex justify-center gap-8 md:gap-12 overflow-x-auto px-6 scrollbar-hide">
          {(locale === 'ko'
            ? ['세계', '기술', '디자인', '문화', '비즈니스', '오피니언', '여행']
            : ['World', 'Technology', 'Design', 'Culture', 'Business', 'Opinion', 'Travel']
          ).map((item) => (
            <button
              key={item}
              className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 whitespace-nowrap"
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-[1400px] mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Main Story) */}
          <div className="lg:col-span-8">
            {/* Featured Article (Hero) */}
            <article className="mb-12 border-b border-neutral-200 pb-12">
              <Link href={`/studio/classic-magazine/article/${featuredArticle.id}`}>
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  <div className="flex-1">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 mb-3 block">
                      {featuredArticle.category}
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4 hover:underline decoration-4 underline-offset-4 cursor-pointer">
                      {featuredArticle.title}
                    </h2>
                    <p className="font-serif text-xl text-neutral-600 leading-relaxed mb-6">
                      {featuredArticle.subtitle}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-neutral-400">
                      <span className="text-black font-bold">By {featuredArticle.author.name}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime} Min Read</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-neutral-100 border border-neutral-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif italic text-2xl text-neutral-300">(Image)</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* Sub Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {subArticles.map((article) => (
                <article key={article.id} className="border-b border-neutral-200 pb-8">
                  <Link href={`/studio/classic-magazine/article/${article.id}`}>
                    <div className="aspect-video bg-neutral-100 mb-4 border border-neutral-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif italic text-2xl text-neutral-300">(Image)</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl font-bold leading-tight mb-2 hover:underline decoration-2 cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="font-serif text-neutral-600 leading-relaxed text-sm line-clamp-3">
                      {article.subtitle}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column (Sidebar / Feed) */}
          <div className="lg:col-span-4 pl-0 lg:pl-12 lg:border-l border-neutral-200">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-8">
              <h3 className="font-sans text-sm font-bold uppercase tracking-widest">
                {locale === 'ko' ? '에디터 추천' : "Editor's Picks"}
              </h3>
              <button className="text-xs font-bold uppercase hover:underline">
                {locale === 'ko' ? '모두 보기' : 'View All'}
              </button>
            </div>

            {/* List Items (Recipe: card.compact) */}
            <div className="space-y-6">
              {editorsPicks.map((article, index) => (
                <article key={article.id} className="flex gap-4 group cursor-pointer group">
                  <Link
                    href={`/studio/classic-magazine/article/${article.id}`}
                    className="flex gap-4 w-full"
                  >
                    <span className="font-serif text-4xl font-bold text-neutral-200 group-hover:text-black transition-colors">
                      {index + 1}
                    </span>
                    <div className="flex-1 border-b border-neutral-100 pb-6 group-last:border-none">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1 block">
                        {article.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold leading-snug group-hover:underline decoration-2">
                        {article.title}
                      </h4>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Ad / Promo Area */}
            <div className="mt-12 bg-neutral-900 text-white p-8 text-center border-4 border-double border-neutral-700">
              <h4 className="font-serif text-2xl font-bold mb-4 font-italic">
                {locale === 'ko' ? '"시대를 초월한 디자인"' : '"Timeless Design"'}
              </h4>
              <p className="font-serif text-sm text-neutral-400 mb-6 italic">
                {locale === 'ko'
                  ? '디지털 에디션을 구독하고 아카이브에 무제한으로 액세스하세요.'
                  : 'Subscribe to the digital edition for unlimited access to our archives.'}
              </p>
              <button className="w-full bg-white text-black h-12 uppercase font-bold tracking-widest text-xs hover:bg-neutral-200 transition-colors">
                {locale === 'ko' ? '지금 구독하기' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-100 border-t border-neutral-200 py-24 mt-24">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-black tracking-tighter mb-8 scale-y-90">
            The Tekton Times
          </h2>
          <div className="flex justify-center gap-8 mb-12">
            <Link
              href="/studio/classic-magazine/docs"
              className="text-xs font-bold uppercase tracking-widest hover:underline"
            >
              {locale === 'ko' ? '문서' : 'Documentation'}
            </Link>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:underline">
              {locale === 'ko' ? '개인정보 보호정책' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:underline">
              {locale === 'ko' ? '이용약관' : 'Terms of Service'}
            </a>
          </div>
          <p className="font-serif text-sm text-neutral-500 italic">
            © 2026 Tekton Design System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
