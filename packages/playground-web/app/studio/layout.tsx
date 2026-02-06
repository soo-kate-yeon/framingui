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
import { usePathname } from 'next/navigation';
import { SidebarProvider } from '../../contexts/SidebarContext';
import { Sidebar } from '../../components/studio/Sidebar';
import { Footer } from '../../components/shared/Footer';

interface StudioLayoutProps {
  children: ReactNode;
}

export default function StudioLayout({ children }: StudioLayoutProps) {
  const pathname = usePathname();

  // Template 페이지인지 확인 - 초기 접힘 상태 결정
  const isTemplatePage = pathname?.includes('/template/');

  return (
    <SidebarProvider defaultCollapsed={isTemplatePage}>
      <div className="flex h-screen overflow-hidden bg-[#F0F0F0] selection:bg-neutral-900 selection:text-white font-sans text-neutral-900">
        {/* Sidebar - 항상 동일한 컴포넌트 */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-full flex flex-col">
            <div className="flex-1">{children}</div>
            <Footer className="bg-white/50" />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
