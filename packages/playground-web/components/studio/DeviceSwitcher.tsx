/**
 * Device Switcher Component
 * [SPEC-UI-003][TAG-UI003-049]
 *
 * Desktop/Tablet/Mobile 디바이스 전환 토글
 */

'use client';

import { Monitor, Tablet, Smartphone } from 'lucide-react';
import type { DeviceType } from '../../lib/types/theme';

// ============================================================================
// Types
// ============================================================================

interface DeviceSwitcherProps {
  /** 현재 선택된 디바이스 */
  selectedDevice: DeviceType;
  /** 디바이스 변경 콜백 [TAG-UI003-009] */
  onDeviceChange: (device: DeviceType) => void;
  /** 추가 className */
  className?: string;
}

interface DeviceOption {
  type: DeviceType;
  icon: typeof Monitor;
  label: string;
}

// ============================================================================
// Device Options
// ============================================================================

const DEVICE_OPTIONS: DeviceOption[] = [
  { type: 'desktop', icon: Monitor, label: 'Desktop' },
  { type: 'tablet', icon: Tablet, label: 'Tablet' },
  { type: 'mobile', icon: Smartphone, label: 'Mobile' },
];

// ============================================================================
// Component
// ============================================================================

export function DeviceSwitcher({
  selectedDevice,
  onDeviceChange,
  className = '',
}: DeviceSwitcherProps) {
  return (
    <div
      className={`device-switcher ${className}`}
      role="toolbar"
      aria-label="Device selector"
      style={{
        display: 'inline-flex',
        gap: 'var(--tekton-spacing-xs, 4px)',
        padding: 'var(--tekton-spacing-xs, 4px)',
        backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
        borderRadius: 'var(--tekton-radius-md, 6px)',
        border: '1px solid var(--tekton-border-default, #e5e7eb)',
      }}
    >
      {DEVICE_OPTIONS.map(({ type, icon: Icon, label }) => {
        const isSelected = selectedDevice === type;

        return (
          <button
            key={type}
            type="button"
            onClick={() => onDeviceChange(type)}
            aria-label={`Switch to ${label} view`}
            aria-pressed={isSelected}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--tekton-spacing-xs, 4px)',
              padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-md, 12px)',
              backgroundColor: isSelected
                ? 'var(--tekton-bg-primary, #3b82f6)'
                : 'transparent',
              color: isSelected
                ? 'var(--tekton-bg-primary-foreground, #ffffff)'
                : 'var(--tekton-text-muted-foreground, #6b7280)',
              border: 'none',
              borderRadius: 'var(--tekton-radius-sm, 4px)',
              cursor: 'pointer',
              fontSize: 'var(--tekton-font-size-sm, 14px)',
              fontWeight: isSelected ? '500' : '400',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = 'var(--tekton-bg-accent, #f3f4f6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="device-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
