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
      className={`border-t border-neutral-200 bg-white text-neutral-950 py-24 md:py-32 transition-colors ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand & Copyright */}
          <div>
            <div className="text-2xl font-bold tracking-tighter mb-4 text-neutral-950">
              {content.brandName}
            </div>
            <p className="text-base text-neutral-600 mb-2">
              &copy; {new Date().getFullYear()} {content.copyright}
            </p>
          </div>

          {/* Links + Language Toggle */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-base font-medium">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors text-neutral-600 hover:text-neutral-950"
              >
                {label}
              </Link>
            ))}
            <GlobalLanguageSwitcher className="bg-white border-neutral-300 text-neutral-950 hover:bg-neutral-50 rounded-full" />
          </nav>
        </div>

        {/* Business Info (Legal Requirement) */}
        <div className="pt-12 border-t border-neutral-200 text-sm text-neutral-500 space-y-2 leading-relaxed">
          <p className="font-medium text-neutral-600">{content.businessInfo.operatedBy}</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <p>{content.businessInfo.representative}</p>
          </div>
          <p>{content.businessInfo.address}</p>
          <p>{content.businessInfo.email}</p>
        </div>
      </div>
    </footer>
  );
}
