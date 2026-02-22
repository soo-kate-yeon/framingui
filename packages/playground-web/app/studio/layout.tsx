/**
 * Studio Layout
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Theme: Square Minimalism
 * - Background: #F0F0F0
 * - Radius: 0
 * - Layout: Flex (Sidebar + Main)
 */

'use client';

import type { ReactNode } from 'react';
import { SidebarProvider } from '../../contexts/SidebarContext';
import { StudioLanguageProvider } from '../../contexts/StudioLanguageContext';
import { Sidebar } from '../../components/studio/Sidebar';
import { Footer } from '../../components/shared/Footer';

interface StudioLayoutProps {
  children: ReactNode;
}

function StudioLayoutContent({ children }: StudioLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white selection:bg-neutral-950 selection:text-white font-sans text-neutral-950">
      {/* Sidebar - Desktop Sidebar & Mobile Top Nav Dropdown */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white pt-16 md:pt-0">
        <div className="min-h-full flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer className="bg-white" />
        </div>
      </main>
    </div>
  );
}

export default function StudioLayout({ children }: StudioLayoutProps) {
  // 모든 페이지에서 sidebar는 기본적으로 접힌 상태
  const defaultCollapsed = true;

  return (
    <StudioLanguageProvider>
      <SidebarProvider defaultCollapsed={defaultCollapsed}>
        <StudioLayoutContent>{children}</StudioLayoutContent>
      </SidebarProvider>
    </StudioLanguageProvider>
  );
}
