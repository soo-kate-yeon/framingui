"use client";

import { ArrowLeft, Type, Layout, MousePointer } from "lucide-react";

/**
 * Classic Magazine Documentation
 * Theme: Editorial, Strict, Scholarly
 */

export default function ClassicMagazineDocs() {
    return (
        <div className="min-h-screen bg-white font-serif text-neutral-900 selection:bg-neutral-900 selection:text-white">

            {/* Sidebar / Navigation */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-neutral-200 bg-neutral-50 p-8 hidden lg:block overflow-y-auto">
                <div className="mb-12">
                    <a href="/studio/classic-magazine" className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest hover:underline mb-8">
                        <ArrowLeft size={12} /> Back to Demo
                    </a>
                    <h1 className="font-serif text-2xl font-bold leading-none mb-2">Classic Magazine</h1>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">v1.0 Documentation</span>
                </div>

                <nav className="space-y-8 font-sans text-xs font-bold tracking-widest uppercase">
                    <div>
                        <span className="text-neutral-400 block mb-4">Foundation</span>
                        <ul className="space-y-3">
                            <li><a href="#typography" className="hover:text-black hover:underline">Typography</a></li>
                            <li><a href="#borders" className="hover:text-black hover:underline">Borders & Spacing</a></li>
                            <li><a href="#radius" className="hover:text-black hover:underline">Radius (0px)</a></li>
                        </ul>
                    </div>
                    <div>
                        <span className="text-neutral-400 block mb-4">Components</span>
                        <ul className="space-y-3">
                            <li><a href="#article-card" className="hover:text-black hover:underline">Article Card</a></li>
                            <li><a href="#buttons" className="hover:text-black hover:underline">Buttons</a></li>
                            <li><a href="#masthead" className="hover:text-black hover:underline">Masthead</a></li>
                        </ul>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 max-w-4xl mx-auto p-8 md:p-24">

                {/* Intro */}
                <section className="mb-24 border-b-4 border-black pb-12">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-red-700 mb-4 block">Design Language</span>
                    <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
                        Legibility first.<br />
                        Content is King.
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed text-neutral-600">
                        <p>
                            The Classic Magazine theme rejects the "app-ification" of content.
                            It returns to the principles of print design: hierarchy established through type size and weight,
                            structure defined by clear lines, and an absolute refusal of decorative rounded corners.
                        </p>
                        <p>
                            It combines the authority of serif headings (Merriweather/Georgia) with the utility of sans-serif meta data,
                            creating a rhythm that feels both intellectual and urgent.
                        </p>
                    </div>
                </section>

                {/* Typography System */}
                <section id="typography" className="mb-24 scroll-mt-24">
                    <div className="flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest mb-8 text-neutral-400">
                        <Type size={16} /> 01. Typography
                    </div>

                    <div className="space-y-12 border-l border-neutral-200 pl-8">
                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block">Display / H1</span>
                            <div className="font-serif text-6xl md:text-8xl font-black tracking-tight leading-none scale-y-90">
                                The Tekton Times
                            </div>
                        </div>

                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block">Headline / H2</span>
                            <div className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                                Democracy Dies in Darkness
                            </div>
                        </div>

                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block">Body Text</span>
                            <div className="font-serif text-xl leading-relaxed text-neutral-700 max-w-2xl">
                                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                                Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                            </div>
                        </div>

                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block">Meta / UI</span>
                            <div className="font-sans text-xs font-bold uppercase tracking-widest text-black">
                                By John Doe • Oct 24, 2026 • 5 Min Read
                            </div>
                        </div>
                    </div>
                </section>

                {/* Radius & Border System */}
                <section id="radius" className="mb-24 scroll-mt-24">
                    <div className="flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest mb-8 text-neutral-400">
                        <Layout size={16} /> 02. The "No Radius" Rule
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-neutral-100 p-12 border border-neutral-200">
                            <div className="bg-black text-white w-32 h-32 flex items-center justify-center text-4xl font-bold font-serif mb-4">
                                0px
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">Absolute Corners</h3>
                            <p className="font-serif text-sm text-neutral-600">
                                We do not smooth edges. Sharp corners convey precision, seriousness, and a connection to physical paper.
                            </p>
                        </div>

                        <div className="bg-white p-12 border-t-4 border-black">
                            <div className="h-8 border-b border-black mb-4"></div>
                            <div className="h-8 border-b border-neutral-200 mb-4"></div>
                            <div className="h-8 border-b-2 border-neutral-900 mb-4"></div>
                            <h3 className="font-serif text-xl font-bold mb-2">Meaningful Borders</h3>
                            <p className="font-serif text-sm text-neutral-600">
                                Borders are used to separate content, not just decorate. We use varying weights (1px, 2px, 4px) to denote hierarchy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <section id="buttons" className="mb-24 scroll-mt-24">
                    <div className="flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest mb-8 text-neutral-400">
                        <MousePointer size={16} /> 03. Interactive Elements
                    </div>

                    <div className="bg-neutral-50 p-12 border border-neutral-200 flex flex-wrap gap-6 items-center">
                        <button className="bg-black text-white h-12 px-8 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                            Primary Action
                        </button>
                        <button className="bg-white text-black border border-black h-12 px-8 text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors">
                            Secondary
                        </button>
                        <button className="text-red-700 font-bold uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-4">
                            Text Link
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
}
