"use client";

import { Search, Menu } from "lucide-react";

/**
 * [VERIFICATION] Agentic Styling output simulation
 * Theme: "Classic Magazine"
 * 
 * Rules applied by Agent:
 * 1. Radius: 0px (Absolute)
 * 2. Typography: Serif Headlines (Merriweather), Sans Meta
 * 3. Borders: Divider lines (border-b, border-t), High contrast
 */
export default function ClassicMagazineDemo() {
    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
            {/* Header (Newsstand Style) */}
            <header className="border-b-4 border-black sticky top-0 bg-white z-50">
                {/* Top Utility Bar */}
                <div className="border-b border-neutral-200 py-2 px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    <div className="flex gap-4">
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="text-neutral-300">|</span>
                        <span>Vol. 132, No. 42</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="hover:text-black">Subscribe</button>
                        <button className="hover:text-black">Log In</button>
                    </div>
                </div>

                {/* Main Masthead */}
                <div className="py-8 text-center relative px-6 group">
                    <button className="absolute left-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>

                    <h1 className="font-serif text-5xl md:text-8xl font-black tracking-tight leading-none scale-y-90">
                        The Tekton Times
                    </h1>

                    <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-100 transition-colors">
                        <Search className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="border-t border-black py-3 flex justify-center gap-8 md:gap-12 overflow-x-auto px-6 scrollbar-hide">
                    {["World", "Technology", "Design", "Culture", "Business", "Opinion", "Travel"].map(item => (
                        <button key={item} className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 whitespace-nowrap">
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
                        {/* Recipe: card.article (Hero) */}
                        <article className="mb-12 border-b border-neutral-200 pb-12">
                            <div className="flex flex-col md:flex-row gap-8 mb-6">
                                <div className="flex-1">
                                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 mb-3 block">
                                        Breaking News
                                    </span>
                                    <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4 hover:underline decoration-4 underline-offset-4 cursor-pointer">
                                        The Return of the Serif: Why Print Sensitivity Matters in UI
                                    </h2>
                                    <p className="font-serif text-xl text-neutral-600 leading-relaxed mb-6">
                                        As digital interfaces mature, designers are looking back to centuries of print tradition.
                                        Absolute legibility, structured grids, and the total absence of rounded corners define the new "Classic" aesthetic.
                                    </p>
                                    <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-widest text-neutral-400">
                                        <span className="text-black font-bold">By Sooyeon Kim</span>
                                        <span>•</span>
                                        <span>5 Min Read</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 aspect-[3/4] bg-neutral-100 border border-neutral-200 relative">
                                    {/* Image Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-300 font-serif italic text-2xl bg-neutral-100">
                                        (Image)
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Sub Stories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                            {[1, 2].map((i) => (
                                <article key={i} className="border-b border-neutral-200 pb-8">
                                    <div className="aspect-video bg-neutral-100 mb-4 border border-neutral-200" />
                                    <h3 className="font-serif text-2xl font-bold leading-tight mb-2 hover:underline decoration-2 cursor-pointer">
                                        Typography as Architecture: Building without Containers
                                    </h3>
                                    <p className="font-serif text-neutral-600 leading-relaxed text-sm line-clamp-3">
                                        Stop using cards for everything. Let the whitespace and type hierarchy do the work.
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (Sidebar / Feed) */}
                    <div className="lg:col-span-4 pl-0 lg:pl-12 lg:border-l border-neutral-200">
                        {/* Section Header */}
                        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-8">
                            <h3 className="font-sans text-sm font-bold uppercase tracking-widest">
                                Editor's Picks
                            </h3>
                            <button className="text-xs font-bold uppercase hover:underline">View All</button>
                        </div>

                        {/* List Items (Recipe: card.compact) */}
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <article key={i} className="flex gap-4 group cursor-pointer group">
                                    <span className="font-serif text-4xl font-bold text-neutral-200 group-hover:text-black transition-colors">
                                        {i}
                                    </span>
                                    <div className="flex-1 border-b border-neutral-100 pb-6 group-last:border-none">
                                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1 block">
                                            Opinion
                                        </span>
                                        <h4 className="font-serif text-lg font-bold leading-snug group-hover:underline decoration-2">
                                            Why 0px Radius is the Ultimate Sophistication
                                        </h4>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Ad / Promo Area */}
                        <div className="mt-12 bg-neutral-900 text-white p-8 text-center border-4 border-double border-neutral-700">
                            <h4 className="font-serif text-2xl font-bold mb-4 font-italic">
                                "Timeless Design"
                            </h4>
                            <p className="font-serif text-sm text-neutral-400 mb-6 italic">
                                Subscribe to the digital edition for unlimited access to our archives.
                            </p>
                            <button className="w-full bg-white text-black h-12 uppercase font-bold tracking-widest text-xs hover:bg-neutral-200 transition-colors">
                                Subscribe Now
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="bg-neutral-100 border-t border-neutral-200 py-24 mt-24">
                <div className="max-w-[1400px] mx-auto px-6 text-center">
                    <h2 className="font-serif text-4xl font-black tracking-tighter mb-8 scale-y-90">The Tekton Times</h2>
                    <div className="flex justify-center gap-8 mb-12">
                        <a href="/studio/classic-magazine/docs" className="text-xs font-bold uppercase tracking-widest hover:underline">Documentation</a>
                        <a href="#" className="text-xs font-bold uppercase tracking-widest hover:underline">Privacy Policy</a>
                        <a href="#" className="text-xs font-bold uppercase tracking-widest hover:underline">Terms of Service</a>
                    </div>
                    <p className="font-serif text-sm text-neutral-500 italic">
                        © 2026 Tekton Design System. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
