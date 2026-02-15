'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
