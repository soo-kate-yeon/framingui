import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theme Guides | framingui Docs',
  description:
    'Theme-specific implementation guides for all framingui templates, including token strategy, layout patterns, and component usage.',
};

const THEMES = [
  {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    summary: 'Editorial hierarchy with expressive typography and rich content sections.',
  },
  {
    id: 'editorial-tech',
    name: 'Editorial Tech',
    summary: 'Airy, type-forward structure tuned for documentation and knowledge products.',
  },
  {
    id: 'dark-boldness',
    name: 'Dark Boldness',
    summary: 'High-contrast dark interface with assertive visual weight and clear CTA rhythm.',
  },
  {
    id: 'minimal-workspace',
    name: 'Minimal Workspace',
    summary: 'Low-noise productivity layout optimized for focused, task-dense screens.',
  },
  {
    id: 'neutral-workspace',
    name: 'Neutral Workspace',
    summary: 'Balanced grayscale workspace with predictable hierarchy and calm emphasis.',
  },
  {
    id: 'pebble',
    name: 'Pebble',
    summary: 'Soft, rounded visual system with friendly density and approachable tone.',
  },
  {
    id: 'square-minimalism',
    name: 'Square Minimalism',
    summary: 'Geometric, sharp-edge style emphasizing strict grids and compact information design.',
  },
] as const;

export default function ThemeGuidesPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Theme Guides</h1>
        <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
          Theme-specific implementation notes for each framingui template. Use this index to jump
          into token strategy, layout decisions, and component-level recommendations.
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Theme Index</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {THEMES.map((theme) => (
            <a
              key={theme.id}
              href={`#${theme.id}`}
              className="rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
            >
              {theme.name}
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {THEMES.map((theme) => (
          <article
            key={theme.id}
            id={theme.id}
            className="scroll-mt-24 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 space-y-4"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">{theme.name}</h3>
            <p className="text-neutral-600 leading-relaxed">{theme.summary}</p>
            <p className="text-sm text-neutral-500">
              Detailed guide coming soon: token map, recommended layout shells, component pairing,
              and AI prompt examples for this theme.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
