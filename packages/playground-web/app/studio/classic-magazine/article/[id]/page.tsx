/**
 * Classic Magazine - Article Detail Page
 *
 * 동적 라우팅을 통한 개별 기사 상세 페이지
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { getArticleById, getRelatedArticles } from '@/lib/data/articles';
import { ArticleHero } from '@/components/classic-magazine/ArticleHero';
import { ArticleContent } from '@/components/classic-magazine/ArticleContent';
import { AuthorProfile } from '@/components/classic-magazine/AuthorProfile';
import { RelatedArticles } from '@/components/classic-magazine/RelatedArticles';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | The Tekton Times`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author.name],
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  // 404 처리
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(id);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Fixed Header */}
      <header className="border-b-4 border-black sticky top-0 bg-white z-50">
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
            <button className="hover:text-black">Subscribe</button>
            <button className="hover:text-black">Log In</button>
          </div>
        </div>

        {/* Main Masthead */}
        <div className="py-6 md:py-8 text-center relative px-6">
          <Link
            href="/studio/classic-magazine"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 transition-colors group flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden lg:inline font-sans text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Back
            </span>
          </Link>

          <Link href="/studio/classic-magazine">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none scale-y-90 hover:opacity-80 transition-opacity px-12 sm:px-16 md:px-20">
              The Tekton Times
            </h1>
          </Link>

          <button className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 transition-colors">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="border-t border-black py-3 flex justify-center gap-8 md:gap-12 overflow-x-auto px-6 scrollbar-hide">
          {['World', 'Technology', 'Design', 'Culture', 'Business', 'Opinion', 'Travel'].map(
            (item) => (
              <button
                key={item}
                className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 whitespace-nowrap"
              >
                {item}
              </button>
            )
          )}
        </nav>
      </header>

      {/* Main Article Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* Article Hero */}
        <ArticleHero
          title={article.title}
          subtitle={article.subtitle}
          category={article.category}
          author={article.author}
          readTime={article.readTime}
          publishDate={article.publishDate}
        />

        {/* Article Content (Main Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <ArticleContent content={article.content} />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-600 px-3 py-2 border border-neutral-200 hover:border-neutral-900 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile */}
            <AuthorProfile author={article.author} />

            {/* Related Articles */}
            {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
          </div>
        </div>
      </main>

      {/* Footer */}
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
              Documentation
            </Link>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest hover:underline">
              Terms of Service
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
