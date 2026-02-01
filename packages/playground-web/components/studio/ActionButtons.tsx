/**
 * Action Buttons Component
 * [SPEC-UI-003][TAG-UI003-052]
 *
 * Save/Export 버튼 (Edit Mode 전용) [TAG-UI003-022]
 */

'use client';

import { Save, Download } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// ============================================================================
// Types
// ============================================================================

interface ActionButtonsProps {
  /** Edit Mode 여부 (false이면 버튼 숨김) [TAG-UI003-021] */
  isEditMode: boolean;
  /** Save 콜백 */
  onSave?: () => void | Promise<void>;
  /** Export 콜백 (없으면 기본 동작) */
  onExport?: () => void;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function ActionButtons({
  isEditMode,
  onSave,
  onExport,
  className = '',
}: ActionButtonsProps) {
  const { exportTheme } = useTheme();

  // Preview Mode에서는 완전히 숨김 [TAG-UI003-021]
  if (!isEditMode) {
    return null;
  }

  const handleSave = async () => {
    if (onSave) {
      await onSave();
    } else {
      // 기본 동작: localStorage에 저장
      const theme = exportTheme();
      localStorage.setItem('tekton-studio-theme', JSON.stringify(theme));
      console.log('Theme saved to localStorage:', theme);
      // 실제 구현 시: 백엔드 API 호출
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // 기본 동작: JSON 파일 다운로드 [TAG-UI003-013]
      const theme = exportTheme();
      const blob = new Blob([JSON.stringify(theme, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tekton-theme-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={`action-buttons ${className}`}
      style={{
        display: 'flex',
        gap: 'var(--tekton-spacing-sm, 8px)',
      }}
    >
      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--tekton-spacing-xs, 4px)',
          padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-md, 12px)',
          backgroundColor: 'var(--tekton-bg-primary, #3b82f6)',
          color: 'var(--tekton-bg-primary-foreground, #ffffff)',
          border: 'none',
          borderRadius: 'var(--tekton-radius-md, 6px)',
          fontSize: 'var(--tekton-font-size-sm, 14px)',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <Save size={16} aria-hidden="true" />
        <span>Save</span>
      </button>

      {/* Export Button */}
      <button
        type="button"
        onClick={handleExport}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--tekton-spacing-xs, 4px)',
          padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-md, 12px)',
          backgroundColor: 'var(--tekton-bg-secondary, #6b7280)',
          color: 'var(--tekton-bg-secondary-foreground, #ffffff)',
          border: 'none',
          borderRadius: 'var(--tekton-radius-md, 6px)',
          fontSize: 'var(--tekton-font-size-sm, 14px)',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <Download size={16} aria-hidden="true" />
        <span>Export</span>
      </button>
    </div>
  );
}
