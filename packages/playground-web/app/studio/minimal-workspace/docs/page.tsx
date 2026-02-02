"use client";


import { ArrowLeft, Type, Box, Layers } from "lucide-react";

/**
 * Minimal Workspace Documentation
 */
export default function MinimalWorkspaceDocs() {
    return (
        <div className="min-h-screen bg-white text-neutral-950 font-sans">

            <nav className="border-b border-neutral-200 px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10 flex items-center gap-4">
                <a href="/studio/minimal-workspace" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors">
                    <ArrowLeft size={16} /> Back to Demo
                </a>
                <div className="h-4 w-[1px] bg-neutral-200"></div>
                <span className="font-semibold text-sm">Documentation</span>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">

                {/* Sidebar */}
                <aside className="w-64 hidden md:block shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div>
                            <h4 className="mb-2 text-sm font-semibold tracking-tight">Getting Started</h4>
                            <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                                <a href="#introduction" className="px-2 py-1.5 text-neutral-900 font-medium">Introduction</a>
                                <a href="#typography" className="px-2 py-1.5 text-neutral-500 hover:text-neutral-900 hover:underline hover:underline-offset-4">Typography</a>
                                <a href="#colors" className="px-2 py-1.5 text-neutral-500 hover:text-neutral-900 hover:underline hover:underline-offset-4">Colors</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-2 text-sm font-semibold tracking-tight">Components</h4>
                            <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                                <a href="#buttons" className="px-2 py-1.5 text-neutral-500 hover:text-neutral-900 hover:underline hover:underline-offset-4">Buttons</a>
                                <a href="#inputs" className="px-2 py-1.5 text-neutral-500 hover:text-neutral-900 hover:underline hover:underline-offset-4">Inputs</a>
                                <a href="#cards" className="px-2 py-1.5 text-neutral-500 hover:text-neutral-900 hover:underline hover:underline-offset-4">Cards</a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 space-y-12">

                    <section id="introduction">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Minimal Workspace</h1>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-xl text-neutral-600">
                            A collection of re-usable components built with Radix UI and Tailwind CSS.
                            Clean, robust, and accessible.
                        </p>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex flex-col items-center justify-center w-32 h-32 rounded-xl border border-neutral-200 bg-neutral-50">
                                <span className="text-3xl font-bold">Aa</span>
                                <span className="text-xs text-neutral-500 mt-2">Inter</span>
                            </div>
                            <div className="flex flex-col items-center justify-center w-32 h-32 rounded-xl border border-neutral-200 bg-neutral-50">
                                <div className="w-12 h-12 rounded-lg border border-dashed border-neutral-400"></div>
                                <span className="text-xs text-neutral-500 mt-2">0.5rem Radius</span>
                            </div>
                        </div>
                    </section>

                    <div className="my-12 h-[1px] bg-neutral-200"></div>

                    <section id="typography" className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Type className="h-5 w-5" />
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-full">Typography</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    The Joke Tax Chronicles
                                </h1>
                                <span className="text-xs text-neutral-400">h1</span>
                            </div>
                            <div>
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    The People of the Kingdom
                                </h2>
                                <span className="text-xs text-neutral-400">h2</span>
                            </div>
                            <div>
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
                                </p>
                                <span className="text-xs text-neutral-400">p / body</span>
                            </div>
                        </div>
                    </section>

                    <div className="my-12 h-[1px] bg-neutral-200"></div>

                    <section id="buttons" className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Box className="h-5 w-5" />
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-full">Buttons</h2>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 shadow hover:bg-neutral-900/90 transition-colors">
                                Primary
                            </button>
                            <button className="inline-flex items-center justify-center rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-100/80 transition-colors">
                                Secondary
                            </button>
                            <button className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
                                Outline
                            </button>
                            <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
                                Ghost
                            </button>
                        </div>
                    </section>

                    <div className="my-12 h-[1px] bg-neutral-200"></div>

                    <section id="cards" className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Layers className="h-5 w-5" />
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-full">Cards</h2>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm max-w-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="text-2xl font-semibold leading-none tracking-tight">Create project</h3>
                                <p className="text-sm text-neutral-500">Deploy your new project in one-click.</p>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                                        <input className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950" placeholder="Name of your project" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-6 pt-0">
                                <button className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-100 hover:text-neutral-900 transition-colors w-full mr-2">Cancel</button>
                                <button className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 shadow hover:bg-neutral-900/90 transition-colors w-full">Deploy</button>
                            </div>
                        </div>

                    </section>

                </main>
            </div>

        </div>
    );
}
