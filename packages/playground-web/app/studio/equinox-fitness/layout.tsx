'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Settings, Bell, User, PlusCircle } from 'lucide-react';
import { PreviewBanner } from '@/components/studio/PreviewBanner';

/**
 * Equinox Fitness V2 Layout - Streaming Edition
 * Theme: Elite luxury night gym - True Black canvas, 0px radius
 * Width: w-[80px] hover:w-[200px] (최적화됨)
 */
export default function EquinoxLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black flex">
      {/* Preview Banner - 모든 equinox 하위 페이지에서 표시 */}
      <PreviewBanner templateId="equinox-fitness" templateName="Equinox Fitness" />

      {/* Sidebar - Desktop Only (Hidden on Mobile) — top-12로 배너 아래 시작 */}
      <aside className="hidden md:flex w-[80px] hover:w-[200px] bg-black border-r border-neutral-900 flex-col fixed top-12 bottom-0 z-30 transition-all duration-300 group overflow-hidden">
        <nav className="flex-1 px-4 pt-6 space-y-2">
          <NavItem
            href="/studio/equinox-fitness"
            icon={<Home size={20} />}
            label="Home"
            active={pathname === '/studio/equinox-fitness'}
            groupHover
          />
          <NavItem
            href="/studio/equinox-fitness/dashboard"
            icon={<Library size={20} />}
            label="My Library"
            active={pathname === '/studio/equinox-fitness/dashboard'}
            groupHover
          />
          <div className="py-4 overflow-hidden">
            <div className="h-[1px] bg-neutral-900 w-full" />
          </div>

          <NavItem
            href="/studio/equinox-fitness/dashboard/settings"
            icon={<Settings size={20} />}
            label="Settings"
            active={pathname?.includes('settings')}
            groupHover
          />
        </nav>

        <div className="p-6 border-t border-neutral-900 overflow-hidden">
          <button className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
            <PlusCircle size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Join Live
            </span>
          </button>
        </div>
      </aside>

      {/* Bottom Navigation - Mobile Only — z-40으로 배너(z-50) 아래 유지 */}
      <nav className="md:hidden fixed bottom-1 left-4 right-4 h-16 bg-neutral-900/90 backdrop-blur-xl border border-white/10 z-40 flex items-center justify-around px-4">
        <MobileNavItem
          href="/studio/equinox-fitness"
          icon={<Home size={20} />}
          active={pathname === '/studio/equinox-fitness'}
        />
        <MobileNavItem
          href="/studio/equinox-fitness/dashboard"
          icon={<Library size={20} />}
          active={pathname === '/studio/equinox-fitness/dashboard'}
        />
        <MobileNavItem
          href="/studio/equinox-fitness/dashboard/settings"
          icon={<Settings size={20} />}
          active={pathname?.includes('settings')}
        />
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[80px] min-w-0 pt-12">
        {/* Top Header - Immersive & Minimal — top-12로 배너 아래에 sticky */}
        <header className="h-[80px] bg-gradient-to-b from-black to-transparent sticky top-12 z-20 px-4 md:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="relative group/search flex-1 md:flex-none">
              <Search className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/search:text-white transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-6 bg-transparent border-b border-transparent focus:border-white focus:outline-none py-1 text-xs w-full md:w-64 transition-all placeholder:text-neutral-600 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="relative">
              <Bell className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-none border-2 border-black"></span>
            </button>

            <div className="hidden sm:flex items-center gap-3 group/user cursor-pointer">
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-tighter text-white">
                  Elite Member
                </div>
                <div className="text-[8px] uppercase tracking-widest text-neutral-500">
                  View Account
                </div>
              </div>
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center text-xs font-black">
                <User size={20} />
              </div>
            </div>
            <div className="sm:hidden flex items-center justify-center w-8 h-8 bg-white text-black">
              <User size={16} />
            </div>
          </div>
        </header>

        <div className="relative">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
  groupHover = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  groupHover?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative w-full flex items-center gap-6 px-4 py-3 transition-all duration-300 ${
        active ? 'text-white' : 'text-neutral-500 hover:text-white'
      }`}
    >
      <div
        className={`flex-shrink-0 transition-transform duration-300 ${active ? 'scale-110' : ''}`}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${groupHover ? 'opacity-0 group-hover:opacity-100' : ''}`}
      >
        {label}
      </span>
      {active && <div className="absolute left-0 w-[4px] h-6 bg-white" />}
    </Link>
  );
}

function MobileNavItem({
  href,
  icon,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-2 transition-colors ${active ? 'text-white' : 'text-neutral-500'}`}
    >
      {icon}
      {active && <div className="mt-1 w-1 h-1 bg-white rounded-full" />}
    </Link>
  );
}
