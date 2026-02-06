'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Accordion } from './Accordion';
import { Button } from '@tekton/ui';

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function LandingPage() {
    const router = useRouter();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
            {/* Sticky Nav Bar */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200"
                    >
                        <div className="container mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
                            <div className="text-xl font-bold tracking-tighter" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                TEKTON
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={() => router.push('/studio/templates')}
                                    className="hidden md:flex h-9 px-4 rounded-full text-sm font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-none"
                                >
                                    Preview
                                </Button>
                                <Button
                                    onClick={() => router.push('/auth/signup')}
                                    className="h-9 px-4 rounded-full text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Header / Hero Section */}
            <header className="container mx-auto px-6 md:px-8 pt-20 pb-20 md:pt-32 md:pb-32 text-center max-w-5xl">
                <FadeIn delay={0.1}>
                    <div className="mb-8 flex justify-center">
                        <div className="text-2xl font-bold tracking-tighter">TEKTON</div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 leading-[1.1] tracking-tight text-neutral-950">
                        Design Intelligence <br className="hidden md:block" />
                        <span className="text-neutral-500">for AI Agents</span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-lg md:text-2xl text-neutral-600 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                        Tekton is the most advanced design system for building agentic interfaces.
                        Generate, preview, and deploy production-ready UI with AI.
                    </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={() => router.push('/studio/templates')}
                            className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-none transition-colors"
                        >
                            Preview Demo
                        </Button>
                        <Button
                            onClick={() => router.push('/auth/signup')}
                            className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                        >
                            Get Started
                        </Button>
                    </div>
                </FadeIn>
            </header>

            {/* Main Image */}
            <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
                <FadeIn delay={0.5}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-neutral-100 border border-neutral-200 shadow-2xl">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-neutral-400 font-medium">Main Dashboard Preview</span>
                        </div>
                        {/* Placeholder for Main Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-50/50 to-neutral-200/50" />
                    </div>
                </FadeIn>
            </section>

            {/* Feature Section 1 */}
            <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
                <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <FadeIn className="order-2 md:order-1">
                        <div className="bg-neutral-100 rounded-2xl aspect-square flex items-center justify-center border border-neutral-200">
                            <span className="text-neutral-400">Feature Image 1</span>
                        </div>
                    </FadeIn>
                    <FadeIn className="order-1 md:order-2" delay={0.2}>
                        <h2 className="text-3xl font-bold mb-8">AI-Driven UI Generation</h2>
                        <Accordion
                            items={[
                                {
                                    title: "Natural Language to UI",
                                    content: "Describe your interface in plain English and let Tekton generate production-ready React code instantly. No more starting from scratch."
                                },
                                {
                                    title: "Context-Aware Components",
                                    content: "The AI understands your project context and selects the most appropriate components from the Tekton design system."
                                },
                                {
                                    title: "Smart Layouts",
                                    content: "Automatically handles responsive layouts, spacing, and alignment based on best practices and design tokens."
                                }
                            ]}
                        />
                    </FadeIn>
                </div>
            </section>

            {/* Feature Section 2 */}
            <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
                <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <FadeIn className="order-1">
                        <h2 className="text-3xl font-bold mb-8">Production-Grade Code</h2>
                        <Accordion
                            items={[
                                {
                                    title: "Clean React & TypeScript",
                                    content: "Generated code is clean, semantic, and fully typed. It looks and behaves exactly like code written by a senior engineer."
                                },
                                {
                                    title: "Tailwind CSS Styling",
                                    content: "Uses utility-first styling with Tailwind CSS, making it easy to customize and maintain without complex CSS files."
                                },
                                {
                                    title: "Accessibility Built-in",
                                    content: "All components follow WAI-ARIA standards, ensuring your application is accessible to all users by default."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn className="order-2" delay={0.2}>
                        <div className="bg-neutral-100 rounded-2xl aspect-square flex items-center justify-center border border-neutral-200">
                            <span className="text-neutral-400">Feature Image 2</span>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Feature Section 3 */}
            <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
                <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <FadeIn className="order-2 md:order-1">
                        <div className="bg-neutral-100 rounded-2xl aspect-square flex items-center justify-center border border-neutral-200">
                            <span className="text-neutral-400">Feature Image 3</span>
                        </div>
                    </FadeIn>
                    <FadeIn className="order-1 md:order-2" delay={0.2}>
                        <h2 className="text-3xl font-bold mb-8">Seamless Integration</h2>
                        <Accordion
                            items={[
                                {
                                    title: "MCP Protocol Support",
                                    content: "Connects directly to your AI agents via the Model Context Protocol, enabling real-time UI generation and modification."
                                },
                                {
                                    title: "Themeable Architecture",
                                    content: "Switch between different themes (OKLCH-based) instantly. Create your own brand identity with a comprehensive token system."
                                },
                                {
                                    title: "Developer Tools",
                                    content: "Includes a powerful CLI and VS Code extension to streamline your workflow and boost productivity."
                                }
                            ]}
                        />
                    </FadeIn>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-6 md:px-8 mb-32">
                <FadeIn>
                    <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-4">
                            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-lg text-neutral-600">Everything you need to know about Tekton.</p>
                        </div>
                        <div className="md:col-span-8">
                            <Accordion
                                items={[
                                    {
                                        title: "What is Tekton?",
                                        content: "Tekton is a comprehensive design system and AI-powered toolset for building modern web applications with speed and precision."
                                    },
                                    {
                                        title: "Is it free to use?",
                                        content: "Tekton Core is open source. The AI features and hosted studio have a free tier for individual developers."
                                    },
                                    {
                                        title: "Can I use it with Next.js?",
                                        content: "Yes, Tekton is optimized for Next.js and the React ecosystem, offering seamless integration with App Router."
                                    },
                                    {
                                        title: "How does the AI generation work?",
                                        content: "We use advanced LLMs and the Model Context Protocol to understand your requirements and generate code using our component library."
                                    }
                                ]}
                                allowMultiple
                            />
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-200 py-12">
                <div className="container mx-auto px-6 md:px-8 text-center text-neutral-500 text-sm">
                    <p>© 2026 Tekton. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
