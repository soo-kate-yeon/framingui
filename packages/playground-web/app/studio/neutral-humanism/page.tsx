"use client";

import { useEffect } from "react";
import Link from 'next/link';
import {
    ChevronRight,
    Search,
    Bell,
    BookOpen,
    Users,
    Activity,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { DataTable } from "@/components/studio/neutral-humanism/DataTable";
import { useTektonTheme } from "@/hooks/useTektonTheme";

const NEUTRAL_HUMANISM_FALLBACK: Record<string, string> = {
    '--tekton-bg-canvas': '#FDFCFB',
    '--tekton-bg-surface': '#FFFFFF',
    '--tekton-text-primary': '#171717',
    '--tekton-text-secondary': '#525252',
    '--tekton-border-default': '#E5E5E5',
    '--tekton-action-primary': '#171717',
    '--tekton-action-primary-text': '#FFFFFF',
    '--tekton-radius-md': '8px',
    '--tekton-radius-lg': '12px',
};

export default function NeutralSaasMetrics() {
    const { collapseSidebar } = useSidebar();
    const { loaded: themeLoaded } = useTektonTheme('neutral-humanism', {
        fallback: NEUTRAL_HUMANISM_FALLBACK,
    });

    useEffect(() => {
        collapseSidebar();
    }, [collapseSidebar]);

    return (
        <div className={`flex flex-col h-full bg-[var(--tekton-bg-canvas)] font-sans text-[var(--tekton-text-primary)] transition-opacity duration-500 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Header */}
            <header className="h-14 border-b border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] backdrop-blur-sm px-6 flex items-center justify-between z-10 sticky top-0">
                <div className="flex items-center gap-2 text-sm text-[var(--tekton-text-secondary)]">
                    <span className="font-medium text-[var(--tekton-text-primary)]">Studio</span>
                    <ChevronRight size={14} className="text-[var(--tekton-text-secondary)] opacity-50" />
                    <span>Neutral Humanism</span>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/studio/neutral-humanism/docs" className="flex items-center gap-2 px-3 py-1.5 bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] text-xs font-bold uppercase tracking-wide rounded-[var(--tekton-radius-md)] hover:opacity-90 transition-opacity">
                        <BookOpen size={14} />
                        Design Philosophy
                    </Link>
                    <div className="w-px h-4 bg-[var(--tekton-border-default)]" />
                    <button className="text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)]"><Search size={16} /></button>
                    <button className="text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)]"><Bell size={16} /></button>
                    <div className="w-8 h-8 rounded-full bg-neutral-200 border border-white shadow-sm" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
                            <p className="text-[var(--tekton-text-secondary)]">Key performance indicators for your service.</p>
                        </div>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        {/* DAU Card */}
                        <div className="bg-[var(--tekton-bg-surface)] p-6 rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm font-medium text-[var(--tekton-text-secondary)]">DAU</div>
                                <Users size={16} className="text-[var(--tekton-text-secondary)]" />
                            </div>
                            <div className="text-2xl font-bold mb-1">12,450</div>
                            <div className="flex items-center text-xs text-emerald-600 font-medium">
                                <ArrowUpRight size={12} className="mr-1" /> +12.5% from last month
                            </div>
                        </div>

                        {/* MAU Card */}
                        <div className="bg-[var(--tekton-bg-surface)] p-6 rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm font-medium text-[var(--tekton-text-secondary)]">MAU</div>
                                <Activity size={16} className="text-[var(--tekton-text-secondary)]" />
                            </div>
                            <div className="text-2xl font-bold mb-1">45,200</div>
                            <div className="flex items-center text-xs text-emerald-600 font-medium">
                                <ArrowUpRight size={12} className="mr-1" /> +8.2% from last month
                            </div>
                        </div>

                        {/* ARR Card */}
                        <div className="bg-[var(--tekton-bg-surface)] p-6 rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm font-medium text-[var(--tekton-text-secondary)]">ARR</div>
                                <DollarSign size={16} className="text-[var(--tekton-text-secondary)]" />
                            </div>
                            <div className="text-2xl font-bold mb-1">$1.2M</div>
                            <div className="flex items-center text-xs text-neutral-500 font-medium">
                                0% change
                            </div>
                        </div>

                        {/* User Retention Card */}
                        <div className="bg-[var(--tekton-bg-surface)] p-6 rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm font-medium text-[var(--tekton-text-secondary)]">Retention</div>
                                <TrendingUp size={16} className="text-[var(--tekton-text-secondary)]" />
                            </div>
                            <div className="text-2xl font-bold mb-1">68%</div>
                            <div className="flex items-center text-xs text-rose-600 font-medium">
                                <ArrowDownRight size={12} className="mr-1" /> -2.1% from last month
                            </div>
                        </div>

                    </div>

                    {/* Recent Projects Table */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold tracking-tight mb-4">Recent Projects</h2>
                        <DataTable />
                    </div>
                </div>
            </main>
        </div>
    );
}
