/**
 * Screen Selector Component
 * [SPEC-UI-003][TAG-UI003-051]
 *
 * Preview Mode (2개 화면) vs Edit Mode (12개 화면) 선택기
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Wider
 * - Border: Neutral-200
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
      className={`flex items-center gap-3 px-3 py-2 bg-white border border-neutral-200 ${className}`}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        aria-label="Previous screen"
        className={`flex items-center justify-center p-1 bg-transparent border-none transition-all ${
          currentIndex === 0
            ? 'opacity-50 cursor-not-allowed text-neutral-300'
            : 'cursor-pointer text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Screen Dropdown */}
      <select
        value={selectedScreenId}
        onChange={(e) => onScreenChange(e.target.value)}
        aria-label="Select screen"
        className="flex-1 min-w-[200px] px-2 py-1 bg-white border border-neutral-200 rounded-none text-xs uppercase tracking-wider font-bold text-neutral-900 cursor-pointer hover:border-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
      >
        {screens.map((screen) => (
          <option key={screen.id} value={screen.id}>
            {screen.name}
          </option>
        ))}
      </select>

      {/* Screen Counter */}
      <span className="text-[10px] uppercase tracking-widest text-neutral-400 whitespace-nowrap font-mono">
        {currentIndex + 1} / {screens.length}
      </span>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex === screens.length - 1}
        aria-label="Next screen"
        className={`flex items-center justify-center p-1 bg-transparent border-none transition-all ${
          currentIndex === screens.length - 1
            ? 'opacity-50 cursor-not-allowed text-neutral-300'
            : 'cursor-pointer text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
        }`}
      >
        <ChevronRight size={18} />
      </button>

      {/* Mode Badge */}
      {isPreviewMode && (
        <span className="inline-flex items-center rounded-none border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] uppercase font-bold text-neutral-600 tracking-wide whitespace-nowrap">
          Preview
        </span>
      )}
    </div>
  );
}
