/**
 * Screen Selector Component
 * [SPEC-UI-003][TAG-UI003-051]
 *
 * Preview Mode (2개 화면) vs Edit Mode (12개 화면) 선택기
 */

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface Screen {
  id: string;
  name: string;
  category: 'auth' | 'core' | 'feedback';
}

interface ScreenSelectorProps {
  /** 전체 화면 목록 */
  screens: Screen[];
  /** 현재 선택된 화면 ID */
  selectedScreenId: string;
  /** 화면 변경 콜백 */
  onScreenChange: (screenId: string) => void;
  /** Preview Mode 여부 [TAG-UI003-019~020] */
  isPreviewMode: boolean;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function ScreenSelector({
  screens,
  selectedScreenId,
  onScreenChange,
  isPreviewMode,
  className = '',
}: ScreenSelectorProps) {
  const currentIndex = screens.findIndex((s) => s.id === selectedScreenId);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onScreenChange(screens[currentIndex - 1]!.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      onScreenChange(screens[currentIndex + 1]!.id);
    }
  };

  return (
    <div
      className={`screen-selector ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--tekton-spacing-md, 12px)',
        padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-md, 12px)',
        backgroundColor: 'var(--tekton-bg-background, #ffffff)',
        border: '1px solid var(--tekton-border-default, #e5e7eb)',
        borderRadius: 'var(--tekton-radius-lg, 8px)',
      }}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        aria-label="Previous screen"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--tekton-spacing-xs, 4px)',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: 'var(--tekton-radius-sm, 4px)',
          cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          opacity: currentIndex === 0 ? 0.5 : 1,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (currentIndex > 0) {
            e.currentTarget.style.backgroundColor = 'var(--tekton-bg-muted, #f9fafb)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Screen Dropdown */}
      <select
        value={selectedScreenId}
        onChange={(e) => onScreenChange(e.target.value)}
        aria-label="Select screen"
        style={{
          flex: 1,
          minWidth: '200px',
          padding: 'var(--tekton-spacing-sm, 8px)',
          backgroundColor: 'var(--tekton-bg-background, #ffffff)',
          border: '1px solid var(--tekton-border-default, #e5e7eb)',
          borderRadius: 'var(--tekton-radius-md, 6px)',
          fontSize: 'var(--tekton-font-size-sm, 14px)',
          fontWeight: '500',
          color: 'var(--tekton-text-foreground, #111827)',
          cursor: 'pointer',
        }}
      >
        {screens.map((screen) => (
          <option key={screen.id} value={screen.id}>
            {screen.name}
          </option>
        ))}
      </select>

      {/* Screen Counter */}
      <span
        style={{
          fontSize: 'var(--tekton-font-size-sm, 14px)',
          color: 'var(--tekton-text-muted-foreground, #6b7280)',
          whiteSpace: 'nowrap',
        }}
      >
        {currentIndex + 1} / {screens.length}
      </span>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex === screens.length - 1}
        aria-label="Next screen"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--tekton-spacing-xs, 4px)',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: 'var(--tekton-radius-sm, 4px)',
          cursor: currentIndex === screens.length - 1 ? 'not-allowed' : 'pointer',
          opacity: currentIndex === screens.length - 1 ? 0.5 : 1,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (currentIndex < screens.length - 1) {
            e.currentTarget.style.backgroundColor = 'var(--tekton-bg-muted, #f9fafb)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Mode Badge */}
      {isPreviewMode && (
        <span
          style={{
            padding: 'var(--tekton-spacing-xs, 4px) var(--tekton-spacing-sm, 8px)',
            backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
            color: 'var(--tekton-text-muted-foreground, #6b7280)',
            fontSize: 'var(--tekton-font-size-xs, 12px)',
            fontWeight: '500',
            borderRadius: 'var(--tekton-radius-sm, 4px)',
            whiteSpace: 'nowrap',
          }}
        >
          Preview
        </span>
      )}
    </div>
  );
}
