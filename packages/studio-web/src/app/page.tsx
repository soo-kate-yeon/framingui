import Link from 'next/link';
import { ArrowRight, Palette, Eye, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border">
        <div className="max-w-[var(--content-max-width,720px)] mx-auto">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Design System Studio
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'var(--heading-font-family, Georgia, serif)' }}
          >
            Craft Beautiful
            <br />
            Design Systems
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8"
            style={{ lineHeight: 'var(--line-height-body, 1.7)' }}
          >
            A refined workspace for managing design tokens, previewing components,
            and exporting production-ready code. Built for designers and developers
            who value precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/presets">
                Explore Presets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/token-editor">Open Editor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[var(--content-max-width,720px)] mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-12 pb-4 border-b border-border"
            style={{ fontFamily: 'var(--heading-font-family, Georgia, serif)' }}
          >
            Core Features
          </h2>

          {/* Feature Grid - Editorial Layout */}
          <div className="space-y-12">
            {/* Feature 1 - Full Width */}
            <Link
              href="/token-editor"
              className="group block"
            >
              <article className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-muted group-hover:bg-accent/10 transition-colors">
                  <Palette className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    Design Token Management
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Define and organize your color palettes, typography scales, spacing systems,
                    and more. Real-time preview ensures your tokens work harmoniously together
                    before export.
                  </p>
                </div>
              </article>
            </Link>

            <hr className="border-border" />

            {/* Feature 2 */}
            <Link
              href="/component-preview"
              className="group block"
            >
              <article className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-muted group-hover:bg-accent/10 transition-colors">
                  <Eye className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    Component Preview
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Visualize headless components with your design tokens applied. Test interactive
                    states, accessibility compliance, and responsive behavior in an isolated environment.
                  </p>
                </div>
              </article>
            </Link>

            <hr className="border-border" />

            {/* Feature 3 */}
            <Link
              href="/export"
              className="group block"
            >
              <article className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-muted group-hover:bg-accent/10 transition-colors">
                  <Download className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    Multi-Format Export
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Generate production-ready output in CSS custom properties, JSON tokens,
                    Tailwind configuration, or React Native StyleSheets. One source of truth,
                    multiple platforms.
                  </p>
                </div>
              </article>
            </Link>

            <hr className="border-border" />

            {/* Feature 4 */}
            <Link
              href="/presets"
              className="group block"
            >
              <article className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-muted group-hover:bg-accent/10 transition-colors">
                  <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    Curated Presets
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Start with professionally designed token presets. From minimalist SaaS aesthetics
                    to warm humanist themes, find the foundation that matches your vision.
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-12">
        <div className="max-w-[var(--content-max-width,720px)] mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Tekton Design System. Powered by Antigravity.
          </p>
        </div>
      </footer>
    </div>
  );
}
