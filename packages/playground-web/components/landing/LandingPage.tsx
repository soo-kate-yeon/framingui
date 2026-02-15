'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Accordion } from './Accordion';
import { Button } from '@tekton-ui/ui';
import { Footer } from '../shared/Footer';

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
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

  useMotionValueEvent(scrollY, 'change', (latest) => {
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
              <div
                className="text-xl font-bold tracking-tighter"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                TEKTON
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => router.push('/pricing')}
                  className="hidden md:flex h-9 px-4 rounded-full text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
                >
                  Pricing
                </Button>
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
            TEKTON is the first design system AI agents can actually understand. Structured tokens
            and layout logic let agents generate professional, production-ready UI—directly in your
            codebase. No Figma. No guesswork.
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
            <h2 className="text-3xl font-bold mb-8">High-Quality Themes. Zero Design Effort.</h2>
            <Accordion
              items={[
                {
                  title: 'Precision OKLCH Token System',
                  content:
                    'Every theme ships with a complete OKLCH-based token architecture — atomic colors, semantic layers, typography, spacing, elevation, motion, density, state layers, and dark mode. All WCAG AA compliant out of the box.',
                },
                {
                  title: 'Fully Responsive Layout Tokens',
                  content:
                    'Go beyond basic grids. TEKTON defines structured tokens for Shells (app frames), Pages (content layouts), and Sections (content blocks) that auto-adapt across Mobile, Tablet, and Desktop breakpoints. Your agent knows exactly how to scale.',
                },
                {
                  title: 'Built on 30+ shadcn/ui Components',
                  content:
                    'From Buttons and Cards to Dialogs, Tables, Sidebars, and Calendars — built on battle-tested shadcn/ui primitives organized into 3 tiers. Stable, consistent, and ready to ship.',
                },
              ]}
            />
          </FadeIn>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="container mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <FadeIn className="order-1">
            <h2 className="text-3xl font-bold mb-8">From Chat to Production. Instantly.</h2>
            <Accordion
              items={[
                {
                  title: 'Works Everywhere MCP Runs',
                  content:
                    'Not locked to one platform. Claude Code, Cursor, Windsurf, OpenAI Codex — if it supports MCP, TEKTON works. One npx command and your agent has full design capabilities.',
                },
                {
                  title: 'Import a System, Not Just a Screen',
                  content:
                    "Don't just generate one UI — import an entire design language. With tekton init, your agent sets up theme tokens, component libraries, and layout logic to design every flow in your product consistently.",
                },
                {
                  title: 'Production-Ready TypeScript Output',
                  content:
                    'Generated code is clean, fully typed, and uses Tailwind CSS with design tokens. It looks and behaves exactly like code written by a senior engineer — because the system enforces it.',
                },
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
            <h2 className="text-3xl font-bold mb-8">Deterministic UI. No Hallucinations.</h2>
            <Accordion
              items={[
                {
                  title: 'Reliable Code, Every Single Time',
                  content:
                    'Raw LLMs guess at styles and layouts — TEKTON eliminates that. A semantic scoring algorithm places components using weighted rules, producing code that follows strict design constraints instead of hallucinating CSS.',
                },
                {
                  title: '6 Curated Themes, Ready Now',
                  content:
                    'classic-magazine, equinox-fitness, minimal-workspace, neutral-humanism, round-minimal, square-minimalism — each handcrafted with 200+ tokens. Pick one, and your agent handles the rest.',
                },
                {
                  title: 'Safety Protocols Built In',
                  content:
                    'Multi-layer validation — threshold checks, hallucination detection, constraint enforcement, and automatic fallbacks — ensures your agent never ships broken UI.',
                },
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
                    title: 'Is TEKTON free?',
                    content:
                      'TEKTON requires a paid license. You need to purchase at least one theme to unlock MCP server access and start generating production UI with your agent.',
                  },
                  {
                    title: 'Can I use it for app development?',
                    content:
                      'Currently, TEKTON supports the React ecosystem — including Next.js and Vite projects. The init CLI auto-detects both frameworks. Native mobile design system support is coming soon.',
                  },
                  {
                    title: 'Can I apply it to an existing project?',
                    content:
                      'Yes! Run npx @tekton-ui/mcp-server init in your project root. It auto-detects your framework, installs dependencies, and configures everything — without breaking your existing code.',
                  },
                  {
                    title: 'Is there a Figma import feature?',
                    content:
                      "Not yet. We're building a Figma-to-Tekton bridge that will convert your custom designs into AI-native tokens. Stay tuned for updates.",
                  },
                ]}
                allowMultiple
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
