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
    <div className={`action-buttons flex gap-2 ${className}`}>
      {/* Save Button - Square Minimalism Primary */}
      <button
        type="button"
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
      >
        <Save size={14} aria-hidden="true" />
        <span>Save</span>
      </button>

      {/* Export Button - Square Minimalism Secondary */}
      <button
        type="button"
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-900 border border-neutral-200 text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 hover:border-neutral-900 transition-colors"
      >
        <Download size={14} aria-hidden="true" />
        <span>Export</span>
      </button>
    </div>
  );
}
