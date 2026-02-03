/**
 * Template Preview Page
 * [SPEC-UI-003][TAG-UI003-039]
 *
 * 미리보기 모드 (라이선스 없이 2개 대표 화면 표시)
 * Theme: Square Minimalism
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
  // templateId가 설정된 후에만 리디렉션 체크
  useEffect(() => {
    if (templateId && hasValidLicense) {
      router.push(`/studio/template/${templateId}/edit`);
    }
  }, [hasValidLicense, templateId, router]);

  // templateId 로딩 중
  if (!templateId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xs uppercase tracking-wider text-neutral-400">Loading...</div>
      </div>
    );
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
                Preview Mode - 2 screens available
              </p>
            </div>

            <DeviceSwitcher selectedDevice={device} onDeviceChange={setDevice} />
          </header>

          {/* Screen Selector */}
          <div className="px-6 py-3 bg-white border-b border-neutral-200">
            <ScreenSelector
              screens={PREVIEW_SCREENS}
              selectedScreenId={selectedScreenId}
              onScreenChange={setSelectedScreenId}
              isPreviewMode={true}
            />
          </div>

          {/* Preview Area */}
          <div className="flex-1 overflow-auto bg-neutral-50">
            <DevicePreview device={device}>
              <div className="p-12 min-h-[600px] flex items-center justify-center">
                {/* Preview Content Placeholder - Square Minimalism */}
                <div className="text-center p-12 bg-white border-2 border-dashed border-neutral-200">
                  <div className="w-16 h-16 mx-auto mb-6 bg-neutral-100 flex items-center justify-center">
                    <Lock size={32} className="text-neutral-400" />
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    {selectedScreenId === 'dashboard' ? 'Dashboard Preview' : 'Login Preview'}
                  </h2>
                  <p className="text-xs uppercase tracking-wide text-neutral-400 mb-6">
                    Purchase a license to unlock full access
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push('/studio/account')}
                    className="bg-neutral-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
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
