/**
 * Template Gallery Component
 * [SPEC-UI-003][TAG-UI003-046]
 *
 * 템플릿 그리드 레이아웃 갤러리
 */

'use client';

import { TemplateCard } from './TemplateCard';

// ============================================================================
// Types
// ============================================================================

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  category: string;
}

interface TemplateGalleryProps {
  /** 템플릿 목록 */
  templates: Template[];
  /** 템플릿 클릭 콜백 */
  onTemplateClick?: (templateId: string) => void;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function TemplateGallery({
  templates,
  onTemplateClick,
  className = '',
}: TemplateGalleryProps) {
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
        No templates found
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
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          name={template.name}
          description={template.description}
          thumbnail={template.thumbnail}
          category={template.category}
          onClick={() => onTemplateClick?.(template.id)}
        />
      ))}
    </div>
  );
}
