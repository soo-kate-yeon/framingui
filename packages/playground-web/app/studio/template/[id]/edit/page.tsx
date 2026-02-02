/**
 * Template Edit Page
 * [SPEC-UI-003][TAG-UI003-040]
 *
 * 편집 모드 (유효한 라이선스 보유 시 12개 전체 화면 + 커스터마이징)
 * Theme: Square Minimalism
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import { DevicePreview } from '../../../../../components/studio/DevicePreview';
import { DeviceSwitcher } from '../../../../../components/studio/DeviceSwitcher';
import { ScreenSelector } from '../../../../../components/studio/ScreenSelector';
import { TokenSelectionPanel } from '../../../../../components/studio/TokenSelectionPanel';
import { ActionButtons } from '../../../../../components/studio/ActionButtons';
import type { DeviceType } from '../../../../../lib/types/theme';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [showTokenPanel, setShowTokenPanel] = useState(true);
  const [templateId, setTemplateId] = useState<string>('');

  // Next.js 16: params는 Promise
  useEffect(() => {
    params.then((p) => setTemplateId(p.id));
  }, [params]);

  const hasValidLicense = hasLicense(templateId);

  // [TAG-UI003-017] 라이선스 없으면 Preview Mode로 리디렉션
  // templateId가 설정된 후에만 리디렉션 체크
  useEffect(() => {
    if (templateId && !hasValidLicense) {
      router.push(`/studio/template/${templateId}`);
    }
  }, [hasValidLicense, templateId, router]);

  // templateId 로딩 중이거나 라이선스 없으면 대기
  if (!templateId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xs uppercase tracking-wider text-neutral-400">Loading...</div>
      </div>
    );
  }

  if (!hasValidLicense) {
    return null; // 리디렉션 중
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Square Minimalism Theme */}
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
            <div>
              <h1 className="text-lg font-bold uppercase tracking-wider text-neutral-900">
                {templateId}
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5">
                Edit Mode - 12 screens available
              </p>
            </div>

            <div className="flex gap-3">
              <DeviceSwitcher selectedDevice={device} onDeviceChange={setDevice} />
              {/* [TAG-UI003-022] Edit Mode에서만 표시 */}
              <ActionButtons isEditMode={true} />
            </div>
          </header>

          {/* Screen Selector */}
          <div className="px-6 py-3 bg-white border-b border-neutral-200">
            <div className="flex items-center justify-between gap-3">
              <ScreenSelector
                screens={EDIT_SCREENS}
                selectedScreenId={selectedScreenId}
                onScreenChange={setSelectedScreenId}
                isPreviewMode={false}
              />

              {/* Token Panel Toggle */}
              <button
                type="button"
                onClick={() => setShowTokenPanel(!showTokenPanel)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  showTokenPanel
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50'
                }`}
                aria-pressed={showTokenPanel}
              >
                {showTokenPanel ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                <span>{showTokenPanel ? 'Hide' : 'Show'} Tokens</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Preview Area */}
            <div className="flex-1 overflow-auto bg-neutral-50">
              <DevicePreview device={device}>
                <div className="p-12 min-h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">
                      Template Preview
                    </div>
                    <div className="text-2xl font-bold uppercase tracking-tight text-neutral-900 mb-4">
                      {selectedScreenId}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-neutral-500">
                      Device: {device}
                    </div>
                  </div>
                </div>
              </DevicePreview>
            </div>

            {/* Token Selection Panel (Collapsible) */}
            {showTokenPanel && templateId && (
              <aside className="w-[360px] min-w-[360px] overflow-auto">
                <TokenSelectionPanel themeId={templateId} />
              </aside>
            )}
          </div>
    </div>
  );
}
