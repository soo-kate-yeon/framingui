/**
 * Components Overview
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Components | tekton/ui',
  description: 'Browse all tekton/ui components with examples.',
};

const COMPONENTS = [
  { name: 'Button', href: '/docs/components/button', description: 'Primary actions and CTAs' },
  { name: 'Card', href: '/docs/components/card', description: 'Content containers' },
  { name: 'Input', href: '/docs/components/input', description: 'Text input fields' },
  { name: 'Dialog', href: '/docs/components/dialog', description: 'Modal dialogs' },
  { name: 'Select', href: '/docs/components/select', description: 'Dropdown selection' },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Components
        </h1>
        <p className="text-xl text-neutral-600">
          30+ accessible React components. Each page includes multiple examples, 
          variants, and copy-paste code.
        </p>
      </header>

      <section className="grid gap-3">
        {COMPONENTS.map((comp) => (
          <Link
            key={comp.href}
            href={comp.href}
            className="group flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:border-neutral-400 transition-all"
          >
            <div>
              <h3 className="font-mono font-semibold text-neutral-900">{comp.name}</h3>
              <p className="text-sm text-neutral-500">{comp.description}</p>
            </div>
            <span className="text-neutral-400 group-hover:text-neutral-600 transition-colors">→</span>
          </Link>
        ))}
      </section>

      <p className="text-sm text-neutral-500">
        More components coming soon. Check the{' '}
        <Link href="/docs/api/ui" className="underline hover:no-underline">
          API Reference
        </Link>{' '}
        for the full list.
      </p>
    </div>
  );
}
