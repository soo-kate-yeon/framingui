/**
 * Template Edit Page
 * [SPEC-UI-003][TAG-UI003-040]
 *
 * 편집 모드 (유효한 라이선스 보유 시 12개 전체 화면 + 커스터마이징)
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import { DevicePreview } from '../../../../../components/studio/DevicePreview';
import { DeviceSwitcher } from '../../../../../components/studio/DeviceSwitcher';
import { ScreenSelector } from '../../../../../components/studio/ScreenSelector';
import { PresetPanel } from '../../../../../components/studio/PresetPanel';
import { ActionButtons } from '../../../../../components/studio/ActionButtons';
import type { DeviceType } from '../../../../../lib/types/theme';

// ============================================================================
// Edit Mode Screens (12개 전체) [TAG-UI003-020]
// ============================================================================

const EDIT_SCREENS = [
  // Auth (4)
  { id: 'login', name: 'Login', category: 'auth' as const },
  { id: 'signup', name: 'Signup', category: 'auth' as const },
  { id: 'forgot-password', name: 'Forgot Password', category: 'auth' as const },
  { id: 'verification', name: 'Verification', category: 'auth' as const },
  // Core (3)
  { id: 'landing', name: 'Landing', category: 'core' as const },
  { id: 'preferences', name: 'Preferences', category: 'core' as const },
  { id: 'profile', name: 'Profile', category: 'core' as const },
  // Feedback (5)
  { id: 'loading', name: 'Loading', category: 'feedback' as const },
  { id: 'error', name: 'Error', category: 'feedback' as const },
  { id: 'empty', name: 'Empty State', category: 'feedback' as const },
  { id: 'confirmation', name: 'Confirmation', category: 'feedback' as const },
  { id: 'success', name: 'Success', category: 'feedback' as const },
];

// ============================================================================
// Component
// ============================================================================

interface TemplateEditPageProps {
  params: Promise<{ id: string }>;
}

export default function TemplateEditPage({ params }: TemplateEditPageProps) {
  const router = useRouter();
  const { hasLicense } = useAuth();
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [selectedScreenId, setSelectedScreenId] = useState(EDIT_SCREENS[0]!.id);
  const [showPresetPanel, setShowPresetPanel] = useState(true);
  const [templateId, setTemplateId] = useState<string>('');

  // Next.js 16: params는 Promise
  useEffect(() => {
    params.then((p) => setTemplateId(p.id));
  }, [params]);

  const hasValidLicense = hasLicense(templateId);

  // [TAG-UI003-017] 라이선스 없으면 Preview Mode로 리디렉션
  useEffect(() => {
    if (!hasValidLicense) {
      router.push(`/studio/template/${templateId}`);
    }
  }, [hasValidLicense, templateId, router]);

  if (!hasValidLicense) {
    return null; // 리디렉션 중
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--tekton-spacing-md, 12px) var(--tekton-spacing-lg, 16px)',
          backgroundColor: 'var(--tekton-bg-background, #ffffff)',
          borderBottom: '1px solid var(--tekton-border-default, #e5e7eb)',
          gap: 'var(--tekton-spacing-md, 12px)',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--tekton-font-size-lg, 18px)',
              fontWeight: '600',
              color: 'var(--tekton-text-foreground, #111827)',
            }}
          >
            {templateId}
          </h1>
          <p
            style={{
              fontSize: 'var(--tekton-font-size-sm, 14px)',
              color: 'var(--tekton-text-muted-foreground, #6b7280)',
            }}
          >
            Edit Mode - 12 screens available
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--tekton-spacing-md, 12px)' }}>
          <DeviceSwitcher selectedDevice={device} onDeviceChange={setDevice} />
          {/* [TAG-UI003-022] Edit Mode에서만 표시 */}
          <ActionButtons isEditMode={true} />
        </div>
      </header>

      {/* Screen Selector */}
      <div
        style={{
          padding: 'var(--tekton-spacing-md, 12px) var(--tekton-spacing-lg, 16px)',
          backgroundColor: 'var(--tekton-bg-background, #ffffff)',
          borderBottom: '1px solid var(--tekton-border-default, #e5e7eb)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--tekton-spacing-md, 12px)',
          }}
        >
          <ScreenSelector
            screens={EDIT_SCREENS}
            selectedScreenId={selectedScreenId}
            onScreenChange={setSelectedScreenId}
            isPreviewMode={false}
          />

          <button
            type="button"
            onClick={() => setShowPresetPanel(!showPresetPanel)}
            style={{
              padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-md, 12px)',
              backgroundColor: showPresetPanel
                ? 'var(--tekton-bg-primary, #3b82f6)'
                : 'var(--tekton-bg-secondary, #6b7280)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--tekton-radius-md, 6px)',
              fontSize: 'var(--tekton-font-size-sm, 14px)',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            {showPresetPanel ? 'Hide' : 'Show'} Presets
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Preview Area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
          }}
        >
          <DevicePreview device={device}>
            <div
              style={{
                padding: 'var(--tekton-spacing-xl, 24px)',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--tekton-font-size-lg, 18px)',
                color: 'var(--tekton-text-muted-foreground, #6b7280)',
              }}
            >
              {/* Actual screen template will be rendered here */}
              Template: {selectedScreenId}
              <br />
              Device: {device}
            </div>
          </DevicePreview>
        </div>

        {/* Preset Panel (Collapsible) */}
        {showPresetPanel && (
          <aside
            style={{
              width: '360px',
              minWidth: '360px',
              overflow: 'auto',
              backgroundColor: 'var(--tekton-bg-background, #ffffff)',
              borderLeft: '1px solid var(--tekton-border-default, #e5e7eb)',
              padding: 'var(--tekton-spacing-lg, 16px)',
            }}
          >
            <PresetPanel />
          </aside>
        )}
      </div>
    </div>
  );
}
