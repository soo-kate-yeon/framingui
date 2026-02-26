/**
 * API Reference Landing
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { Box, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Reference | framingui',
  description: 'API documentation for framingui packages.',
};

const PACKAGES = [
  {
    href: '/docs/api/core',
    icon: Box,
    name: '@framingui/core',
    description: 'Token generation, OKLCH utilities, theme parsing',
  },
  {
    href: '/docs/api/ui',
    icon: Layers,
    name: '@framingui/ui',
    description: '30+ React components with theme support',
  },
];

export default function APIPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          API Reference
        </h1>
        <p className="text-xl text-neutral-600">
          Complete API documentation for framingui packages.
        </p>
      </header>

      <section className="grid gap-4">
        {PACKAGES.map((pkg) => (
          <Link
            key={pkg.href}
            href={pkg.href}
            className="group p-6 bg-white border border-neutral-200 rounded-xl hover:border-neutral-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neutral-100 rounded-lg group-hover:bg-neutral-200 transition-colors">
                <pkg.icon className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <h3 className="font-mono font-semibold text-neutral-900 group-hover:text-neutral-700">
                  {pkg.name}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  {pkg.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
