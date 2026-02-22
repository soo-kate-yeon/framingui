/**
 * Template Gallery Component
 * [SPEC-UI-003][TAG-UI003-046]
 *
 * 템플릿 그리드 레이아웃 갤러리 (i18n 지원)
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateCard } from './TemplateCard';
import { SelectionBar } from './SelectionBar';
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
  /** 선택 모드 (double 패키지) */
  selectionMode?: 'double';
}

// ============================================================================
// Component
// ============================================================================

export function TemplateGallery({
  templates,
  className = '',
  selectionMode,
}: TemplateGalleryProps) {
  const router = useRouter();
  const { locale } = useStudioLanguage();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const maxSelection = selectionMode === 'double' ? 2 : 0;
  const isSelectionMode = !!selectionMode;

  // 선택 모드: 카드 클릭 = 선택/해제 토글
  const handleCardClick = (templateId: string) => {
    if (!isSelectionMode) {
      router.push(`/studio/template/${templateId}`);
      return;
    }

    setSelectedIds((prev) => {
      if (prev.includes(templateId)) {
        return prev.filter((id) => id !== templateId);
      }
      if (prev.length >= maxSelection) {
        return prev;
      }
      return [...prev, templateId];
    });
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

  // 선택된 템플릿 이름 목록
  const selectedNames = selectedIds
    .map((id) => templates.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <>
      <div
        className={`template-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 ${isSelectionMode ? 'pb-24' : ''} ${className}`}
      >
        {templates.map((template) => {
          const description =
            locale === 'ko' && template.descriptionKo
              ? template.descriptionKo
              : template.description;

          const isSelected = selectedIds.includes(template.id);
          const selectionDisabled = !isSelected && selectedIds.length >= maxSelection;

          return (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              description={description}
              thumbnail={template.thumbnail}
              category={template.category}
              price={template.price}
              onClick={() => handleCardClick(template.id)}
              selectionMode={isSelectionMode}
              isSelected={isSelected}
              selectionDisabled={selectionDisabled}
            />
          );
        })}
      </div>

      {/* 선택 모드일 때만 하단 바 표시 */}
      {isSelectionMode && (
        <SelectionBar
          selectedTemplates={selectedIds}
          selectedNames={selectedNames}
          maxSelection={maxSelection}
        />
      )}
    </>
  );
}
