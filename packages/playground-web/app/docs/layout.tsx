/**
 * Docs Layout
 * Editorial Tech theme - airy, typography-first, grayscale
 */

import Link from 'next/link';
import { Book, Rocket, Download, Cpu, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/docs', label: 'Overview', icon: Book },
  { href: '/docs/quick-start', label: 'Quick Start', icon: Rocket },
  { href: '/docs/installation', label: 'Installation', icon: Download },
  { href: '/docs/mcp', label: 'MCP Integration', icon: Cpu },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-neutral-900">
              tekton<span className="text-neutral-400">/docs</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              href="https://tally.so/r/7R2kz6" 
              target="_blank"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Get Beta Access
            </Link>
            <Link 
              href="/studio" 
              className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Open Studio
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white min-h-[calc(100vh-65px)] p-6">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors group"
              >
                <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
                {item.label}
                <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-12 py-10">
          <article className="prose prose-neutral max-w-3xl">
            {children}
          </article>
        </main>
      </div>
    </div>
  );
}
