/**
 * Template Preview Page
 * [SPEC-UI-003][TAG-UI003-039]
 *
 * 미리보기 모드 (라이선스 없이 2개 대표 화면 표시)
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import { DevicePreview } from '../../../../components/studio/DevicePreview';
import { DeviceSwitcher } from '../../../../components/studio/DeviceSwitcher';
import { ScreenSelector } from '../../../../components/studio/ScreenSelector';
import type { DeviceType } from '../../../../lib/types/theme';
import { Lock } from 'lucide-react';

// ============================================================================
// Preview Mode Screens (2개만) [TAG-UI003-019]
// ============================================================================

const PREVIEW_SCREENS = [
  { id: 'dashboard', name: 'Dashboard', category: 'core' as const },
  { id: 'login', name: 'Login', category: 'auth' as const },
];

// ============================================================================
// Component
// ============================================================================

interface TemplatePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default function TemplatePreviewPage({ params }: TemplatePreviewPageProps) {
  const router = useRouter();
  const { hasLicense } = useAuth();
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [selectedScreenId, setSelectedScreenId] = useState(PREVIEW_SCREENS[0]!.id);
  const [templateId, setTemplateId] = useState<string>('');

  // Next.js 16: params는 Promise
  useEffect(() => {
    params.then((p) => setTemplateId(p.id));
  }, [params]);

  const hasValidLicense = hasLicense(templateId);

  // [TAG-UI003-018] 유효한 라이선스가 있으면 Edit Mode로 리디렉션
  useEffect(() => {
    if (hasValidLicense) {
      router.push(`/studio/template/${templateId}/edit`);
    }
  }, [hasValidLicense, templateId, router]);

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
            Preview Mode - 2 screens available
          </p>
        </div>

        <DeviceSwitcher selectedDevice={device} onDeviceChange={setDevice} />
      </header>

      {/* Screen Selector */}
      <div
        style={{
          padding: 'var(--tekton-spacing-md, 12px) var(--tekton-spacing-lg, 16px)',
          backgroundColor: 'var(--tekton-bg-background, #ffffff)',
          borderBottom: '1px solid var(--tekton-border-default, #e5e7eb)',
        }}
      >
        <ScreenSelector
          screens={PREVIEW_SCREENS}
          selectedScreenId={selectedScreenId}
          onScreenChange={setSelectedScreenId}
          isPreviewMode={true}
        />
      </div>

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
              flexDirection: 'column',
              gap: 'var(--tekton-spacing-lg, 16px)',
            }}
          >
            {/* Preview Content Placeholder */}
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--tekton-spacing-xl, 24px)',
                backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
                borderRadius: 'var(--tekton-radius-lg, 8px)',
                border: '2px dashed var(--tekton-border-default, #e5e7eb)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto var(--tekton-spacing-md, 12px)',
                  backgroundColor: 'var(--tekton-bg-accent, #f3f4f6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Lock size={32} color="var(--tekton-text-muted-foreground, #6b7280)" />
              </div>
              <h2
                style={{
                  fontSize: 'var(--tekton-font-size-lg, 18px)',
                  fontWeight: '600',
                  color: 'var(--tekton-text-foreground, #111827)',
                  marginBottom: 'var(--tekton-spacing-sm, 8px)',
                }}
              >
                {selectedScreenId === 'dashboard' ? 'Dashboard Preview' : 'Login Preview'}
              </h2>
              <p
                style={{
                  fontSize: 'var(--tekton-font-size-sm, 14px)',
                  color: 'var(--tekton-text-muted-foreground, #6b7280)',
                  marginBottom: 'var(--tekton-spacing-lg, 16px)',
                }}
              >
                Purchase a license to unlock full access and customization
              </p>
              <button
                type="button"
                onClick={() => router.push('/studio/account')}
                style={{
                  padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-lg, 16px)',
                  backgroundColor: 'var(--tekton-bg-primary, #3b82f6)',
                  color: 'var(--tekton-bg-primary-foreground, #ffffff)',
                  border: 'none',
                  borderRadius: 'var(--tekton-radius-md, 6px)',
                  fontSize: 'var(--tekton-font-size-sm, 14px)',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Get License
              </button>
            </div>
          </div>
        </DevicePreview>
      </div>
    </div>
  );
}
