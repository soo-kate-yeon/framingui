"use client";


import { ArrowLeft, Box, Circle } from "lucide-react";

/**
 * Round Minimal Documentation (Revised)
 */
export default function RoundMinimalDocs() {
    return (
        <div className="min-h-screen bg-[#F3F5F7] text-neutral-900 font-sans">

            <div className="max-w-6xl mx-auto px-6 py-12">
                <a href="/studio/round-minimal" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 mb-12 bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
                    <ArrowLeft size={16} /> Back to Demo
                </a>

                <header className="mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Round Minimal</h1>
                    <p className="text-2xl text-neutral-500 max-w-2xl font-medium leading-relaxed">
                        A friendly, tactile design system inspired by modern mobility apps.
                        High radius, chunky padding, and a cool gray canvas.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Sidebar */}
                    <aside className="md:col-span-3">
                        <nav className="sticky top-12 space-y-2">
                            <a href="#principles" className="block px-4 py-3 text-sm font-bold text-neutral-900 bg-white rounded-[16px] shadow-sm">Principles</a>
                            <a href="#radius" className="block px-4 py-3 text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-white/50 rounded-[16px] transition-colors">Shape & Radius</a>
                            <a href="#components" className="block px-4 py-3 text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-white/50 rounded-[16px] transition-colors">Components</a>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="md:col-span-9 space-y-24">

                        {/* Principles */}
                        <section id="principles">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Circle size={28} className="text-blue-600 fill-blue-600" />
                                Design DNA
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-[32px] p-8 shadow-sm">
                                    <h3 className="text-xl font-bold mb-3">Surface over Border</h3>
                                    <p className="text-neutral-500">
                                        We avoid borders. Instead, we use white surfaces on a cool gray background to create structure.
                                    </p>
                                </div>
                                <div className="bg-white rounded-[32px] p-8 shadow-sm">
                                    <h3 className="text-xl font-bold mb-3">Chunky & Tactile</h3>
                                    <p className="text-neutral-500">
                                        Elements are sized for touch. 64px height inputs, 56px buttons. Everything feels clickable.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Radius */}
                        <section id="radius">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Circle size={28} className="text-neutral-900" />
                                Radius Scale
                            </h2>
                            <div className="bg-white rounded-[48px] p-10 shadow-sm flex flex-wrap gap-8 items-end justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-blue-600 rounded-[24px] mb-3 mx-auto shadow-lg shadow-blue-600/20" />
                                    <code className="bg-neutral-100 px-2 py-1 rounded-md text-xs font-bold text-neutral-500">lg (24px)</code>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-neutral-900 rounded-[32px] mb-3 mx-auto" />
                                    <code className="bg-neutral-100 px-2 py-1 rounded-md text-xs font-bold text-neutral-500">xl (32px)</code>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-neutral-200 rounded-[40px] mb-3 mx-auto" />
                                    <code className="bg-neutral-100 px-2 py-1 rounded-md text-xs font-bold text-neutral-500">2xl (40px)</code>
                                </div>
                            </div>
                        </section>

                        {/* Components */}
                        <section id="components">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Box size={28} className="text-neutral-900" />
                                Component Recipes
                            </h2>

                            <div className="space-y-8">
                                {/* Input */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Chunky Input</h3>
                                    <input
                                        type="text"
                                        placeholder="I'm 64px tall..."
                                        className="w-full bg-white h-16 pl-8 rounded-[32px] text-lg font-bold shadow-sm border-none outline-none focus:ring-4 focus:ring-blue-100 placeholder:text-neutral-300"
                                    />
                                </div>

                                {/* Buttons */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Pill Buttons</h3>
                                    <div className="flex gap-4">
                                        <button className="bg-blue-600 text-white rounded-full h-14 px-8 text-lg font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-transform">
                                            Primary Action
                                        </button>
                                        <button className="bg-white text-neutral-900 rounded-full h-14 px-8 text-lg font-bold shadow-sm hover:bg-neutral-50 transition-colors">
                                            Secondary
                                        </button>
                                    </div>
                                </div>

                                {/* Menu List */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Fat List Items</h3>
                                    <div className="bg-white rounded-[32px] p-4 shadow-sm">
                                        {['Profile', 'Settings', 'Support'].map((item) => (
                                            <div key={item} className="flex items-center justify-between p-4 hover:bg-neutral-50 rounded-[20px] cursor-pointer transition-colors">
                                                <div className="font-bold text-lg text-neutral-900">{item}</div>
                                                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                                                    <ArrowLeft size={16} className="rotate-180" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>

                    </div>
                </div>
            </div>

        </div>
    );
}
