/**
 * Explore Page Header Component
 * [SPEC-UI-003][TAG-UI003-I18N]
 *
 * Client Component로 i18n 지원
 */

'use client';

import { useExploreLanguage } from '../../contexts/ExploreLanguageContext';
import { getExploreContent } from '../../data/i18n/explore';

// ============================================================================
// Types
// ============================================================================

interface ExplorePageHeaderProps {
  /** 추가 className */
  className?: string;
  /** 선택 모드 (double 패키지) */
  selectionMode?: 'double';
}

// ============================================================================
// Component
// ============================================================================

export function ExplorePageHeader({ className = '', selectionMode }: ExplorePageHeaderProps) {
  const { locale } = useExploreLanguage();
  const i18n = getExploreContent(locale);
  const t = selectionMode ? i18n.selectionHeader : i18n.header;

  return (
    <header className={className}>
      <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3 block">
        {t.subtitle}
      </span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950 mb-4">
        {t.title}
      </h1>
      <p className="text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
        {t.description}
      </p>
    </header>
  );
}
