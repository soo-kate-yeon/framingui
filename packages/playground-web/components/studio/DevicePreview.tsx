/**
 * Device Preview Component
 * [SPEC-UI-003][TAG-UI003-048]
 *
 * Container Queries 기반 반응형 미리보기 컨테이너
 */

'use client';

import type { ReactNode } from 'react';
import type { DeviceType } from '../../lib/types/theme';

// ============================================================================
// Types
// ============================================================================

interface DevicePreviewProps {
  /** 디바이스 타입 */
  device: DeviceType;
  /** 미리보기할 컨텐츠 */
  children: ReactNode;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Device Widths [TAG-UI003-023~025]
// ============================================================================

const DEVICE_WIDTHS: Record<DeviceType, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
};

// ============================================================================
// Component
// ============================================================================

export function DevicePreview({ device, children, className = '' }: DevicePreviewProps) {
  const width = DEVICE_WIDTHS[device];

  return (
    <div
      className={`device-preview-wrapper ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 'var(--tekton-spacing-lg, 16px)',
        overflow: 'auto',
      }}
    >
      <div
        className="device-preview-container"
        style={{
          width: `${width}px`,
          maxWidth: '100%',
          minHeight: '100%',
          backgroundColor: 'var(--tekton-bg-background, #ffffff)',
          border: '1px solid var(--tekton-border-default, #e5e7eb)',
          borderRadius: 'var(--tekton-radius-lg, 8px)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          // Container Query 지원 [TAG-UI003-009]
          containerType: 'inline-size',
          containerName: 'device-preview',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Device Widths Export (외부에서 사용 가능)
 */
export { DEVICE_WIDTHS };
