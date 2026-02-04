"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Palette, Layout, Type } from "lucide-react";
import { sendMcpRequest } from "@/lib/mcp-client";

// Theme Data Interface
interface ThemeResponse {
    success: boolean;
    theme?: {
        tokens: {
            atomic: Record<string, string>;
            semantic: Record<string, string>;
            component: Record<string, string>;
        };
    };
    error?: string;
}

export default function NeutralHumanismDocs() {
    const [themeLoaded, setThemeLoaded] = useState(false);

    // Fetch Theme
    useEffect(() => {
        async function loadTheme() {
            try {
                const response = await sendMcpRequest<ThemeResponse>({
                    method: 'preview-theme',
                    params: { themeId: 'neutral-humanism' }
                });

                if (response.result?.success && response.result.theme) {
                    const { tokens } = response.result.theme;
                    const root = document.documentElement;
                    // Apply tokens
                    const allTokens = {
                        ...tokens.atomic,
                        ...tokens.semantic,
                        ...tokens.component
                    };

                    Object.entries(allTokens).forEach(([key, value]) => {
                        if (typeof value === 'string') {
                            root.style.setProperty(key, value);
                        }
                    });
                } else {
                    // Fallback
                    const root = document.documentElement;
                    root.style.setProperty('--tekton-bg-canvas', '#FDFCFB');
                    root.style.setProperty('--tekton-bg-surface', '#FFFFFF');
                    root.style.setProperty('--tekton-text-primary', '#171717');
                    root.style.setProperty('--tekton-text-secondary', '#525252');
                    root.style.setProperty('--tekton-border-default', '#E5E5E5');
                    root.style.setProperty('--tekton-action-primary', '#171717');
                    root.style.setProperty('--tekton-action-primary-text', '#FFFFFF');
                    root.style.setProperty('--tekton-radius-sm', '6px');
                    root.style.setProperty('--tekton-radius-md', '8px');
                    root.style.setProperty('--tekton-radius-lg', '12px');
                    root.style.setProperty('--tekton-font-family', 'Inter, sans-serif');
                }
            } catch (e) {
                console.error("Failed to load theme", e);
            } finally {
                setThemeLoaded(true);
            }
        }

        loadTheme();
    }, []);

    return (
        <div className={`min-h-full bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans selection:bg-neutral-200 p-8 transition-opacity duration-500 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-5xl mx-auto">
                <a href="/studio/neutral-humanism" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </a>

                <header className="mb-16 border-b border-[var(--tekton-border-default)] pb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Neutral Humanism</h1>
                    <p className="text-xl text-[var(--tekton-text-secondary)] max-w-2xl">
                        A design system that balances professional cleanliness with human warmth.
                        Built on warm neutrals, soft geometry, and legible typography.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Sidebar Nav (Nextra Style) */}
                    <aside className="md:col-span-3">
                        <nav className="sticky top-12 space-y-1">
                            <p className="px-3 pb-2 text-xs font-bold text-[var(--tekton-text-secondary)] uppercase tracking-wider">Contents</p>
                            <a href="#philosophy" className="block px-3 py-1.5 text-sm font-medium text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-surface-subtle)] rounded-lg transition-colors">Philosophy</a>
                            <a href="#colors" className="block px-3 py-1.5 text-sm font-medium text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-surface-subtle)] rounded-lg transition-colors">Colors</a>
                            <a href="#typography" className="block px-3 py-1.5 text-sm font-medium text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-surface-subtle)] rounded-lg transition-colors">Typography</a>
                            <a href="#components" className="block px-3 py-1.5 text-sm font-medium text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-surface-subtle)] rounded-lg transition-colors">Components</a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="md:col-span-9 space-y-24">

                        {/* Philosophy Section */}
                        <section id="philosophy" className="scroll-mt-8">
                            <h2 className="text-2xl font-bold mb-6">Philosophy</h2>
                            <div className="prose prose-neutral max-w-none text-[var(--tekton-text-secondary)]">
                                <p className="leading-relaxed">
                                    Neutral Humanism minimizes visual noise to maximize focus. It avoids harsh contrasts (pure black on pure white) in favor of softer, organic tones found in paper and ink.
                                    The "Humanism" aspect comes from the geometry—avoiding sharp 90-degree corners for more friendly, approachable radii.
                                </p>
                            </div>
                        </section>

                        {/* Colors Section */}
                        <section id="colors" className="scroll-mt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <Palette className="text-[var(--tekton-text-secondary)]" size={20} />
                                <h2 className="text-2xl font-bold">Color System</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">Core Palette</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-xl">
                                            <div className="text-xs text-[var(--tekton-text-secondary)] mb-1">Surface</div>
                                            <div className="font-medium">White</div>
                                        </div>
                                        <div className="p-4 bg-[var(--tekton-bg-canvas)] border border-[var(--tekton-border-default)] rounded-xl">
                                            <div className="text-xs text-[var(--tekton-text-secondary)] mb-1">Canvas</div>
                                            <div className="font-medium">Warm Neutral</div>
                                        </div>
                                        <div className="p-4 bg-[var(--tekton-action-primary)] rounded-xl text-[var(--tekton-action-primary-text)]">
                                            <div className="text-xs opacity-70 mb-1">Primary</div>
                                            <div className="font-medium">Black</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Typography Section */}
                        <section id="typography" className="scroll-mt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <Type className="text-[var(--tekton-text-secondary)]" size={20} />
                                <h2 className="text-2xl font-bold">Typography</h2>
                            </div>
                            <div className="p-6 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-lg)]">
                                <div className="space-y-8">
                                    <div>
                                        <div className="text-4xl font-bold tracking-tight mb-2">Display Heading</div>
                                        <div className="text-xs text-[var(--tekton-text-secondary)] font-mono">Inter Display / Bold / Tracking: -0.02em</div>
                                    </div>
                                    <div className="w-full h-px bg-[var(--tekton-border-default)]" />
                                    <div>
                                        <div className="text-base leading-relaxed max-w-lg">
                                            Body text should be legible, comfortable, and have optimal line length.
                                            The color is never pure black, but a softer dark grey.
                                        </div>
                                        <div className="text-xs text-[var(--tekton-text-secondary)] font-mono mt-2">Inter / Regular / 16px</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Components Section */}
                        <section id="components" className="scroll-mt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <Layout className="text-[var(--tekton-text-secondary)]" size={20} />
                                <h2 className="text-2xl font-bold">Component Recipes</h2>
                            </div>

                            <div className="space-y-8 border-l border-[var(--tekton-border-default)] pl-8">

                                {/* Buttons */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--tekton-text-secondary)] mb-4">Buttons</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <button className="bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] hover:opacity-90 rounded-[var(--tekton-radius-md)] h-10 px-4 text-sm font-medium transition-opacity">
                                            Primary Button
                                        </button>
                                        <button className="bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] border border-[var(--tekton-border-default)] hover:bg-[var(--tekton-bg-canvas)] rounded-[var(--tekton-radius-md)] h-10 px-4 text-sm font-medium transition-colors">
                                            Secondary
                                        </button>
                                    </div>
                                </div>

                                {/* Cards */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--tekton-text-secondary)] mb-4">Cards</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-lg)] p-6 shadow-sm">
                                            <div className="font-semibold mb-2">Default Card</div>
                                            <p className="text-sm text-[var(--tekton-text-secondary)]">Standard container with subtle border and shadow.</p>
                                        </div>
                                        <div className="bg-[var(--tekton-bg-canvas)] rounded-[var(--tekton-radius-lg)] p-6">
                                            <div className="font-semibold mb-2">Flat Card</div>
                                            <p className="text-sm text-[var(--tekton-text-secondary)]">Useful for secondary content areas.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--tekton-text-secondary)] mb-4">Inputs</h3>
                                    <div className="max-w-md space-y-4">
                                        <input
                                            type="text"
                                            className="w-full bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] h-10 px-3 text-[var(--tekton-text-primary)] placeholder:text-[var(--tekton-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--tekton-border-default)] shadow-sm"
                                            placeholder="Default Input..."
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
