/**
 * Device Switcher Component
 * [SPEC-UI-003][TAG-UI003-049]
 *
 * Desktop/Tablet/Mobile 디바이스 전환 토글
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Wider
 * - Active State: Black/White High Contrast
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
      className={`inline-flex gap-1 p-1 bg-neutral-50 border border-neutral-200 ${className}`}
      role="toolbar"
      aria-label="Device selector"
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
            className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-bold transition-all ${
              isSelected
                ? 'bg-neutral-900 text-white'
                : 'bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Icon size={14} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
