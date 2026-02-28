/**
 * Explore Layout
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Theme: Square Minimalism
 * - Background: #F0F0F0
 * - Radius: 0
 * - Layout: Flex (Sidebar + Main)
 */

'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarProvider } from '../../contexts/SidebarContext';
import { ExploreLanguageProvider } from '../../contexts/ExploreLanguageContext';
import { Sidebar } from '../../components/explore/Sidebar';
import { Footer } from '../../components/shared/Footer';

interface ExploreLayoutProps {
  children: ReactNode;
}

function ExploreLayoutContent({ children }: ExploreLayoutProps) {
  const pathname = usePathname();
  const templateSlugs = [
    'neutral-workspace',
    'classic-magazine',
    'dark-boldness',
    'minimal-workspace',
    'pebble',
    'square-minimalism',
    'editorial-tech',
  ];
  const isDemoPage = templateSlugs.some((slug) => pathname?.startsWith(`/explore/${slug}`));

  return (
    <div className="flex h-screen overflow-hidden bg-white selection:bg-neutral-950 selection:text-white font-sans text-neutral-950">
      {/* Sidebar - Desktop Sidebar & Mobile Top Nav Dropdown */}
      {!isDemoPage && <Sidebar />}

      {/* Main Content */}
      <main className={`flex-1 overflow-auto bg-white ${!isDemoPage ? 'pt-16 md:pt-0' : ''}`}>
        <div className="min-h-full flex flex-col">
          <div className="flex-1">{children}</div>
          {!isDemoPage && <Footer className="bg-white" />}
        </div>
      </main>
    </div>
  );
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  // 모든 페이지에서 sidebar는 기본적으로 접힌 상태
  const defaultCollapsed = true;

  return (
    <ExploreLanguageProvider>
      <SidebarProvider defaultCollapsed={defaultCollapsed}>
        <ExploreLayoutContent>{children}</ExploreLayoutContent>
      </SidebarProvider>
    </ExploreLanguageProvider>
  );
}
