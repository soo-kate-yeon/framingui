/**
 * Template Gallery Component
 * [SPEC-UI-003][TAG-UI003-046]
 *
 * 템플릿 그리드 레이아웃 갤러리 (i18n 지원)
 */

'use client';

import { useRouter } from 'next/navigation';
import { TemplateCard } from './TemplateCard';
import { useStudioLanguage } from '../../contexts/StudioLanguageContext';

// ============================================================================
// Types
// ============================================================================

interface Template {
  id: string;
  name: string;
  description: string;
  descriptionKo?: string;
  thumbnail?: string;
  category: string;
  price?: number;
}

interface TemplateGalleryProps {
  /** 템플릿 목록 */
  templates: Template[];
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function TemplateGallery({ templates, className = '' }: TemplateGalleryProps) {
  const router = useRouter();
  const { locale } = useStudioLanguage();

  // Handle template card click - navigate to template detail page
  const handleTemplateClick = (templateId: string) => {
    router.push(`/studio/template/${templateId}`);
  };

  // i18n messages
  const messages = {
    en: {
      noTemplates: 'No templates found',
    },
    ko: {
      noTemplates: '템플릿을 찾을 수 없습니다',
    },
  };

  const t = messages[locale];

  if (templates.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          fontSize: 'var(--tekton-font-size-base, 16px)',
          color: 'var(--tekton-text-muted-foreground, #6b7280)',
        }}
      >
        {t.noTemplates}
      </div>
    );
  }

  return (
    <div
      className={`template-gallery ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 'var(--tekton-spacing-lg, 16px)',
        padding: 'var(--tekton-spacing-lg, 16px)',
      }}
    >
      {templates.map((template) => {
        // 언어에 맞는 description 선택
        const description =
          locale === 'ko' && template.descriptionKo ? template.descriptionKo : template.description;

        return (
          <TemplateCard
            key={template.id}
            id={template.id}
            name={template.name}
            description={description}
            thumbnail={template.thumbnail}
            category={template.category}
            price={template.price}
            onClick={() => handleTemplateClick(template.id)}
          />
        );
      })}
    </div>
  );
}
