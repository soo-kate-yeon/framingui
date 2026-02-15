'use client';

import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const LEGAL_LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/legal/terms-of-service', label: 'Terms' },
  { href: '/legal/privacy-policy', label: 'Privacy' },
  { href: '/legal/refund-policy', label: 'Refund' },
];

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`border-t border-neutral-200 dark:border-neutral-800 py-12 ${className}`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Brand & Copyright */}
          <div>
            <div className="text-xl font-bold tracking-tighter mb-4">TEKTON</div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              &copy; {new Date().getFullYear()} Tekton. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium">
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

        {/* Business Info (Legal Requirement) */}
        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 space-y-1">
          <p className="font-semibold text-neutral-500">Operated by Morak</p>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
            <p>Representative: Sooyeon Kim</p>
            {/* <p>Business No: (If applicable)</p> */}
          </div>
          <p>Address: 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea</p>
          <p>Email: soo.kate.yeon@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
