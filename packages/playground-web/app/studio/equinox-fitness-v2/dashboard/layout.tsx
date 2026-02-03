"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Dumbbell, Calendar, Trophy, Settings, Search, Bell, User } from 'lucide-react';

/**
 * Equinox Fitness V2 Dashboard Layout
 * Theme: Elite luxury night gym - True Black canvas, 0px radius, Typography hierarchy
 */
export default function EquinoxDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black flex">

            {/* Sidebar - True Black with sharp edges */}
            <aside className="w-[280px] bg-black border-r border-neutral-800 flex flex-col fixed h-full z-20">
                <div className="p-8 border-b border-neutral-800">
                    <div className="text-xl font-bold tracking-tighter text-white uppercase">EQUINOX</div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-1 block">Member Portal</span>
                </div>

                <nav className="flex-1 p-6 space-y-1">
                    <NavItem
                        href="/studio/equinox-fitness-v2/dashboard"
                        icon={<LayoutDashboard size={18} />}
                        label="Performance"
                        active={pathname === '/studio/equinox-fitness-v2/dashboard'}
                    />
                    <NavItem
                        href="#"
                        icon={<Dumbbell size={18} />}
                        label="Workouts"
                    />
                    <NavItem
                        href="#"
                        icon={<Calendar size={18} />}
                        label="Schedule"
                    />
                    <NavItem
                        href="#"
                        icon={<Trophy size={18} />}
                        label="Achievements"
                    />
                    <NavItem
                        href="/studio/equinox-fitness-v2/dashboard/settings"
                        icon={<Settings size={18} />}
                        label="Settings"
                    />
                </nav>

                {/* Membership Status */}
                <div className="p-6 border-t border-neutral-800">
                    <div className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Membership</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wide mb-3">Elite Access</div>
                        <div className="h-[2px] bg-neutral-800 w-full">
                            <div className="h-full bg-white w-full"></div>
                        </div>
                        <div className="text-[10px] text-neutral-500 mt-2">Renews Mar 15, 2026</div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-[280px]">

                {/* Top Header - Glass effect on black */}
                <header className="h-[80px] bg-neutral-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-neutral-500 text-[10px] uppercase tracking-[0.2em]">Dashboard</span>
                        <span className="text-neutral-700">/</span>
                        <span className="text-white font-bold uppercase tracking-wide text-xs">
                            {pathname?.split('/').pop()}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-neutral-600" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-6 bg-transparent border-b border-neutral-800 focus:border-white focus:outline-none py-1 text-sm w-48 transition-colors placeholder:text-neutral-600 text-white"
                            />
                        </div>
                        <button className="relative">
                            <Bell className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-white"></span>
                        </button>
                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-xs font-bold">
                            <User size={16} />
                        </div>
                    </div>
                </header>

                {children}

            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${active
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}
