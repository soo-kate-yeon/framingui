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
import { Menu, X } from 'lucide-react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import { StudioLanguageProvider } from '../../contexts/StudioLanguageContext';
import { Sidebar } from '../../components/studio/Sidebar';
import { Footer } from '../../components/shared/Footer';

interface StudioLayoutProps {
  children: ReactNode;
}

function StudioLayoutContent({ children }: StudioLayoutProps) {
  const { isMobileOpen, toggleMobileMenu, closeMobileMenu } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 selection:bg-neutral-900 selection:text-white font-sans text-neutral-900">
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-neutral-900/50 z-40" onClick={closeMobileMenu} />
      )}

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
