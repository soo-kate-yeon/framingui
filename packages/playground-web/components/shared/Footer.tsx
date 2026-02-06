'use client';

import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const LEGAL_LINKS = [
  { href: '/legal/terms-of-service', label: 'Terms' },
  { href: '/legal/privacy-policy', label: 'Privacy' },
  { href: '/legal/refund-policy', label: 'Refund' },
];

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`border-t border-neutral-200 dark:border-neutral-800 py-8 sm:py-12 ${className}`}>
      <div className="container mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <p>&copy; {new Date().getFullYear()} Tekton. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          {LEGAL_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
