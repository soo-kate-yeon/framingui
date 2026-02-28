/**
 * Explore Page Header Component
 * [SPEC-UI-003][TAG-UI003-I18N]
 *
 * Client Component로 i18n 지원
 */

'use client';

import { useExploreLanguage } from '../../contexts/ExploreLanguageContext';

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

  const content = {
    en: {
      subtitle: 'tekton/explore',
      title: 'Select Theme',
      description:
        'Choose a design system to activate the Agentic Styling engine. Every theme is loaded directly from the MCP knowledge base.',
    },
    ko: {
      subtitle: 'tekton/explore',
      title: '테마 선택',
      description:
        '에이전틱 스타일링 엔진을 활성화할 디자인 시스템을 선택하세요. 모든 테마는 MCP 지식 베이스에서 직접 로드됩니다.',
    },
  };

  const selectionContent = {
    en: {
      subtitle: 'tekton/explore',
      title: 'Pick 2 Templates',
      description: 'Choose 2 templates for your Double Package.',
    },
    ko: {
      subtitle: 'tekton/explore',
      title: '템플릿 2개 고르기',
      description: '더블 패키지에 포함할 템플릿 2개를 선택하세요.',
    },
  };

  const t = selectionMode ? selectionContent[locale] : content[locale];

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
