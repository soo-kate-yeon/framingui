"use client";

import React from "react";
import { ArrowRight, Search, Menu } from "lucide-react";

/**
 * [VERIFICATION] Agentic Styling output simulation
 * Theme: "Square Minimalism"
 * 
 * Rules applied by Agent:
 * 1. Radius: 0px (Strict)
 * 2. Spacing: Layout Gutter 24px, Section 120px
 * 3. Typography: Hero (-0.03em), Eyebrow (Uppercase + Wide)
 */
export default function SquareMinimalismDemo() {
    return (
        <div className="min-h-screen bg-[#F0F0F0] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
            {/* Navigation (Transparent, Architectural) */}
            <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-6 border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl">
                <div className="text-xl font-bold tracking-tighter">TEKTON</div>
                <div className="flex items-center gap-8">
                    <button className="text-xs font-medium uppercase tracking-widest hover:text-neutral-500 transition-colors">Work</button>
                    <button className="text-xs font-medium uppercase tracking-widest hover:text-neutral-500 transition-colors">Studio</button>
                    <button className="text-xs font-medium uppercase tracking-widest hover:text-neutral-500 transition-colors">About</button>
                </div>
                <button className="p-2 hover:bg-neutral-100 transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
            </nav>

            {/* Hero Section */}
            <section className="pt-48 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-8">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-6 block">
                        Agentic Design System
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-neutral-900 leading-[0.9] mb-12">
                        SQUARE<br />MINIMALISM
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed mb-12">
                        A demonstration of agent-generated UI that strictly adheres to the "Radius 0" architectural principle.
                        No rounded corners. Just pure structure.
                    </p>

                    <div className="flex gap-0">
                        {/* Button: Primary (Recipe: button.primary) */}
                        <button className="bg-neutral-900 text-white rounded-none px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-neutral-800 transition-all flex items-center gap-3 active:translate-y-px">
                            Start Building <ArrowRight className="w-4 h-4" />
                        </button>
                        {/* Button: Secondary (Recipe: button.secondary) - Link to Documentation */}
                        <a
                            href="/studio/square-minimalism/docs"
                            className="bg-white text-neutral-900 border border-l-0 border-neutral-200 rounded-none px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-neutral-50 transition-all flex items-center justify-center"
                        >
                            Documentation
                        </a>
                    </div>
                </div>
            </section>

            {/* Components Showcase */}
            <section className="py-24 px-6 border-t border-neutral-200 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Component Recipes</h2>
                        <p className="text-neutral-500">The Agent uses these exact tailwind classes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        {/* Card: Glass (Recipe: card.glass) */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 block">Recipe: Glass</span>
                                    <h3 className="text-2xl font-bold mb-4 tracking-tight">Translucent Depth</h3>
                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                        Uses `backdrop-blur-xl` and semi-transparent white background to create a premium, architectural feel.
                                    </p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-neutral-100 flex justify-between items-center">
                                    <span className="text-xs text-neutral-400 font-mono">01</span>
                                    <ArrowRight className="w-4 h-4 text-neutral-900" />
                                </div>
                            </div>
                        </div>

                        {/* Card: Outlined (Recipe: card.outlined) */}
                        <div className="h-full bg-transparent border border-neutral-200 p-8 flex flex-col justify-between hover:border-neutral-900 transition-colors duration-300">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">Recipe: Outlined</span>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">Structured Lines</h3>
                                <p className="text-neutral-600 leading-relaxed text-sm">
                                    Reflects the "Wireframe" aesthetic. High construct, zero distraction.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-neutral-100 flex justify-between items-center">
                                <span className="text-xs text-neutral-400 font-mono">02</span>
                                <ArrowRight className="w-4 h-4 text-neutral-900" />
                            </div>
                        </div>

                        {/* Card: Minimal (Recipe: card.minimal) */}
                        <div className="h-full bg-neutral-50 border-none p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">Recipe: Minimal</span>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">Solid Foundation</h3>
                                <p className="text-neutral-600 leading-relaxed text-sm">
                                    Uses `bg-neutral-50` for a subtle, sunken effect.
                                </p>
                            </div>

                            {/* Input Simulation (Recipe: input.architectural) */}
                            <div className="mt-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Email Address"
                                        className="w-full bg-transparent border-b border-neutral-300 p-0 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none rounded-none transition-colors text-sm"
                                    />
                                    <button className="absolute right-0 top-3 text-xs font-bold uppercase tracking-widest hover:text-blue-600">
                                        Sub
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
