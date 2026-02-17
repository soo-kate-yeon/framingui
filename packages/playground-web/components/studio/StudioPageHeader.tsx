/**
 * Studio Page Header Component
 * [SPEC-UI-003][TAG-UI003-I18N]
 *
 * Client Component로 i18n 지원
 */

'use client';

import { useStudioLanguage } from '../../contexts/StudioLanguageContext';

// ============================================================================
// Types
// ============================================================================

interface StudioPageHeaderProps {
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function StudioPageHeader({ className = '' }: StudioPageHeaderProps) {
  const { locale } = useStudioLanguage();

  const content = {
    en: {
      subtitle: 'Tekton Studio',
      title: 'Select Theme',
      description:
        'Choose a design system to activate the Agentic Styling engine. Every theme is loaded directly from the MCP knowledge base.',
    },
    ko: {
      subtitle: 'Tekton Studio',
      title: '테마 선택',
      description:
        '에이전틱 스타일링 엔진을 활성화할 디자인 시스템을 선택하세요. 모든 테마는 MCP 지식 베이스에서 직접 로드됩니다.',
    },
  };

  const t = content[locale];

  return (
    <header className={`mb-12 ${className}`}>
      <span className="text-sm font-medium text-neutral-500 mb-4 block">{t.subtitle}</span>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
        {t.title}
      </h1>
      <p className="text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
        {t.description}
      </p>
    </header>
  );
}
