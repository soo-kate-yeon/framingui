"use client";

import {
    Sparkles,
    MessageSquare,
    Search,
    ArrowRight,
    Zap,
    Shield,
    Layout,
    Plus
} from "lucide-react";

/**
 * [VERIFICATION] Agentic Styling output simulation
 * Theme: "Neutral Humanism"
 * 
 * Rules applied by Agent:
 * 1. Palette: Warm Neutrals + Black Primary
 * 2. Radius: Friendly 8-12px
 * 3. Typography: Clean Sans (Inter)
 */
export default function NeutralHumanismDemo() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-neutral-900 font-sans selection:bg-neutral-200">

            {/* Navigation */}
            <nav className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
                            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center text-white">
                                <Sparkles size={14} fill="currentColor" />
                            </div>
                            Tekton AI
                        </div>

                        <div className="hidden md:flex items-center gap-1">
                            <button className="px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors">Workspace</button>
                            <button className="px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors">Templates</button>
                            <button className="px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors">Integrations</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="w-64 bg-neutral-100 h-9 pl-9 pr-3 rounded-lg text-sm placeholder:text-neutral-500 focus:bg-white focus:ring-2 focus:ring-neutral-200 focus:outline-none transition-all"
                            />
                        </div>
                        <button className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-600">
                            S
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 text-xs font-medium text-orange-800 mb-6">
                        <Zap size={12} fill="currentColor" />
                        <span>New: Tekton 3.0 is now available</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                        Your thoughts.<br />
                        <span className="text-neutral-400">Organized beautifully.</span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        A neutral, human-centric workspace designed to help you focus.
                        No distractions, just clean geometry and warm tones.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl h-12 px-6 text-sm font-bold transition-transform active:scale-95 shadow-sm">
                            Start Writing
                        </button>
                        <button className="bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 rounded-xl h-12 px-6 text-sm font-medium flex items-center gap-2 transition-colors">
                            <Layout size={16} />
                            View Demo
                        </button>
                    </div>
                </div>

                {/* Feature Grid (Cards Recipe) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {/* Project Card */}
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                            <MessageSquare size={20} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Smart Chat</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                            Collaborate with AI using a clean, conversational interface that feels natural.
                        </p>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <div className="w-6 h-6 rounded-full bg-neutral-100 flex-shrink-0" />
                                <div className="bg-neutral-50 rounded-lg rounded-tl-none p-3 text-xs text-neutral-600 flex-1">
                                    How can I improve this design?
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Secure by Default</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                            Your data is encrypted and stored locally. Security without the complexity.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg w-fit">
                            <Shield size={12} fill="currentColor" /> Encrypted
                        </div>
                    </div>

                    {/* List/Task Card */}
                    <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Focus Mode</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Eliminate ui clutter. The interface fades away when you start typing.
                        </p>
                        <div className="space-y-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
                                    <div className="w-4 h-4 border border-white/30 rounded-md" />
                                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interface Mockup Section */}
                <div className="rounded-3xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
                    <div className="border-b border-neutral-100 bg-neutral-50/50 p-4 flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-neutral-200" />
                            <div className="w-3 h-3 rounded-full bg-neutral-200" />
                            <div className="w-3 h-3 rounded-full bg-neutral-200" />
                        </div>
                        <div className="h-6 flex-1 bg-white border border-neutral-200 rounded-md mx-4 max-w-sm flex items-center px-3 text-xs text-neutral-400">
                            tekton.ai/workspace/project-alpha
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row h-[500px]">
                        {/* Sidebar */}
                        <div className="w-64 border-r border-neutral-100 bg-[#FAFAFA] p-4 hidden md:flex flex-col">
                            <button className="flex items-center gap-2 bg-white border border-neutral-200 shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 mb-6 hover:bg-neutral-50">
                                <Plus size={16} /> New Chat
                            </button>

                            <div className="mb-6">
                                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-2">Today</div>
                                <div className="space-y-1">
                                    <div className="px-2 py-2 rounded-lg bg-neutral-200/50 text-sm font-medium text-neutral-900">Project Planning</div>
                                    <div className="px-2 py-2 rounded-lg hover:bg-neutral-100 text-sm text-neutral-600">Marketing Visuals</div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 p-8 flex flex-col max-w-3xl mx-auto">
                            <div className="flex-1 space-y-8">
                                {/* AI Message */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                                        <Sparkles size={16} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm font-semibold text-neutral-900">Tekton AI</div>
                                        <div className="text-sm text-neutral-700 leading-relaxed bg-white p-4 border border-neutral-100 rounded-2xl rounded-tl-none shadow-sm">
                                            I've analyzed the mood board. The "Neutral Humanism" aesthetic relies on three key principles:
                                            <ul className="list-disc pl-4 mt-2 space-y-1">
                                                <li>Warm typography (Inter or Merriweather)</li>
                                                <li>Soft, approachable geometry (8-12px radius)</li>
                                                <li>Low contrast borders to reduce visual noise</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* User Message */}
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 flex-shrink-0">
                                        S
                                    </div>
                                    <div className="space-y-2 text-right">
                                        <div className="text-sm text-white leading-relaxed bg-neutral-900 p-3 px-4 rounded-2xl rounded-tr-none shadow-sm inline-block text-left">
                                            Can you generate some color tokens for this?
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="mt-8 relative">
                                <textarea
                                    className="w-full bg-white border border-neutral-200 rounded-xl p-4 pr-12 text-sm focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:outline-none resize-none shadow-sm"
                                    rows={1}
                                    placeholder="Reply to Tekton..."
                                />
                                <button className="absolute right-3 bottom-3 p-1.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <footer className="bg-white border-t border-neutral-200 py-12">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-neutral-900">
                        <div className="w-5 h-5 bg-neutral-900 rounded-md" />
                        Tekton AI
                    </div>
                    <div className="flex gap-8 text-sm text-neutral-500 font-medium">
                        <a href="/studio/neutral-humanism/docs" className="hover:text-neutral-900 transition-colors">Documentation</a>
                        <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-neutral-900 transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
