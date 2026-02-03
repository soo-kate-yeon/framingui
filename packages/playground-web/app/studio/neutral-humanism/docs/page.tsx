"use client";


import { ArrowLeft, Palette, Box, Layout } from "lucide-react";

/**
 * Neutral Humanism Documentation
 * Theme: Clean, Professional, Warm
 */
export default function NeutralHumanismDocs() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-neutral-900 font-sans selection:bg-neutral-200">

            <div className="max-w-5xl mx-auto px-6 py-12">
                <a href="/studio/neutral-humanism" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Demo
                </a>

                <header className="mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Neutral Humanism</h1>
                    <p className="text-xl text-neutral-600 max-w-2xl">
                        A design system that balances professional cleanliness with human warmth.
                        Built on warm neutrals, soft geometry, and legible typography.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Sidebar Nav */}
                    <aside className="md:col-span-3">
                        <nav className="sticky top-12 space-y-1">
                            <a href="#colors" className="block px-3 py-2 text-sm font-medium text-neutral-900 bg-white border border-neutral-200 rounded-lg shadow-sm">Colors</a>
                            <a href="#radius" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg">Radius & Spacing</a>
                            <a href="#components" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg">Components</a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="md:col-span-9 space-y-24">

                        {/* Colors Section */}
                        <section id="colors">
                            <div className="flex items-center gap-2 mb-6">
                                <Palette className="text-neutral-400" size={20} />
                                <h2 className="text-2xl font-bold">Color System</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Neutral Scale (Warm)</h3>
                                    <div className="grid grid-cols-10 gap-2">
                                        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => (
                                            <div key={step} className="space-y-1.5">
                                                <div className={`h-12 w-full rounded-lg bg-neutral-${step} border border-black/5`}></div>
                                                <div className="text-[10px] text-neutral-500 font-medium text-center">{step}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Semantic Usage</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-white border border-neutral-200 rounded-xl">
                                            <div className="text-xs text-neutral-500 mb-1">Surface / Default</div>
                                            <div className="font-medium">White</div>
                                        </div>
                                        <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
                                            <div className="text-xs text-neutral-500 mb-1">Canvas</div>
                                            <div className="font-medium">Neutral 50</div>
                                        </div>
                                        <div className="p-4 bg-neutral-900 rounded-xl text-white">
                                            <div className="text-xs text-neutral-400 mb-1">Primary Action</div>
                                            <div className="font-medium">Neutral 900</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Radius Section */}
                        <section id="radius">
                            <div className="flex items-center gap-2 mb-6">
                                <Box className="text-neutral-400" size={20} />
                                <h2 className="text-2xl font-bold">Shape & Radius</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { name: "Small (sm)", value: "6px", cls: "rounded-md" },
                                    { name: "Medium (md)", value: "8px", cls: "rounded-lg" },
                                    { name: "Large (lg)", value: "12px", cls: "rounded-xl" },
                                    { name: "Extra Large (xl)", value: "16px", cls: "rounded-2xl" },
                                ].map((r) => (
                                    <div key={r.name} className="flex flex-col items-center">
                                        <div className={`w-24 h-24 bg-neutral-100 border border-neutral-200 shadow-sm ${r.cls} mb-3 flex items-center justify-center text-neutral-400`}>
                                            <Box size={24} />
                                        </div>
                                        <div className="text-sm font-medium">{r.name}</div>
                                        <div className="text-xs text-neutral-500 text-center">{r.value}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Components Section */}
                        <section id="components">
                            <div className="flex items-center gap-2 mb-6">
                                <Layout className="text-neutral-400" size={20} />
                                <h2 className="text-2xl font-bold">Component Recipes</h2>
                            </div>

                            <div className="space-y-8 border-l border-neutral-200 pl-8">

                                {/* Buttons */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500 mb-4">Buttons</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <button className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg h-10 px-4 text-sm font-medium transition-colors">
                                            Primary Button
                                        </button>
                                        <button className="bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-lg h-10 px-4 text-sm font-medium transition-colors">
                                            Secondary
                                        </button>
                                        <button className="text-neutral-600 hover:bg-neutral-100 rounded-lg h-10 px-4 text-sm font-medium transition-colors">
                                            Ghost
                                        </button>
                                    </div>
                                </div>

                                {/* Cards */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500 mb-4">Cards</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                                            <div className="font-semibold mb-2">Default Card</div>
                                            <p className="text-sm text-neutral-500">bg-white border border-neutral-200 rounded-xl shadow-sm</p>
                                        </div>
                                        <div className="bg-neutral-100 rounded-xl p-6">
                                            <div className="font-semibold mb-2">Flat Card</div>
                                            <p className="text-sm text-neutral-500">bg-neutral-100 rounded-xl (No border)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-500 mb-4">Inputs</h3>
                                    <div className="max-w-md space-y-4">
                                        <input
                                            type="text"
                                            className="w-full bg-white border border-neutral-200 rounded-lg h-10 px-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-900"
                                            placeholder="Default Input..."
                                        />
                                        <input
                                            type="text"
                                            className="w-full bg-neutral-100 border-none rounded-lg h-10 px-4 text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                                            placeholder="Search Input (No border)..."
                                        />
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
