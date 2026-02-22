'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';
import { getFooterContent } from '../../data/i18n/footer';
import { GlobalLanguageSwitcher } from './GlobalLanguageSwitcher';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const { locale } = useGlobalLanguage();
  const content = useMemo(() => getFooterContent(locale), [locale]);

  const LEGAL_LINKS = useMemo(
    () => [
      { href: '/pricing', label: content.links.pricing },
      { href: '/blog', label: content.links.blog },
      { href: '/legal/terms-of-service', label: content.links.terms },
      { href: '/legal/privacy-policy', label: content.links.privacy },
      { href: '/legal/refund-policy', label: content.links.refund },
    ],
    [content]
  );

  return (
    <footer
      className={`border-t border-neutral-200 bg-white text-neutral-900 py-12 transition-colors ${className}`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Brand & Copyright */}
          <div>
            <div className="text-xl font-bold tracking-tighter mb-4">{content.brandName}</div>
            <p className="text-sm text-neutral-500 mb-2">
              &copy; {new Date().getFullYear()} {content.copyright}
            </p>
          </div>

          {/* Links + Language Toggle */}
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="transition-colors hover:text-neutral-900">
                {label}
              </Link>
            ))}
            <GlobalLanguageSwitcher className="bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50" />
          </nav>
        </div>

        {/* Business Info (Legal Requirement) */}
        <div className="pt-8 border-t border-neutral-100 text-xs text-neutral-400 space-y-1">
          <p className="font-semibold text-neutral-500">{content.businessInfo.operatedBy}</p>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
            <p>{content.businessInfo.representative}</p>
          </div>
          <p>{content.businessInfo.address}</p>
          <p>{content.businessInfo.email}</p>
        </div>
      </div>
    </footer>
  );
}
