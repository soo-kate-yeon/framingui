/**
 * Template Editor Page (Default)
 * [SPEC-UI-003][TAG-UI003-040]
 *
 * 기본 템플릿(round-minimal-v1)의 편집 모드
 * 토큰 및 프리셋 커스터마이징 UI 제공
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { colorPresets, typographyPresets, spacingPresets } from '../../../lib/presets';

// ============================================================================
// Default Template Configuration
// ============================================================================

const DEFAULT_TEMPLATE_ID = 'round-minimal-v1';

// ============================================================================
// Component
// ============================================================================

export default function TemplateEditorPage() {
  const router = useRouter();
  const { hasLicense } = useAuth();
  const { theme, setColorPreset, setTypographyPreset, setSpacingPreset, applyTheme, exportTheme } = useTheme();
  const [showExportModal, setShowExportModal] = useState(false);

  // 개발 모드에서는 라이선스 체크 우회
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasValidLicense = isDevelopment || hasLicense(DEFAULT_TEMPLATE_ID);

  // [TAG-UI003-017] 라이선스 없으면 Preview Mode로 리디렉션
  if (!hasValidLicense) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">License Required</h2>
          <p className="text-gray-600 mb-4">
            유효한 라이선스가 필요합니다. 라이선스를 구매하거나 Preview Mode를 사용하세요.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/studio/template/${DEFAULT_TEMPLATE_ID}`)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Preview Mode
            </button>
            <button
              onClick={() => router.push('/studio/account')}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Get License
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    const themeConfig = exportTheme();
    const dataStr = JSON.stringify(themeConfig, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${DEFAULT_TEMPLATE_ID}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{DEFAULT_TEMPLATE_ID}</h1>
            <p className="text-sm text-gray-600">Theme Editor - Customize tokens and presets</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={applyTheme}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Apply Changes
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
            >
              Export Theme
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Color Presets */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Preset</h2>
            <div className="space-y-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setColorPreset(preset.id);
                    applyTheme();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-md border-2 transition-all ${
                    theme.colorPreset === preset.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-500">ID: {preset.id}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Typography Presets */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Typography Preset</h2>
            <div className="space-y-3">
              {typographyPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setTypographyPreset(preset.id);
                    applyTheme();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-md border-2 transition-all ${
                    theme.typographyPreset === preset.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-500">ID: {preset.id}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Spacing Presets */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Spacing Preset</h2>
            <div className="space-y-3">
              {spacingPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSpacingPreset(preset.id);
                    applyTheme();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-md border-2 transition-all ${
                    theme.spacingPreset === preset.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{preset.name}</div>
                  <div className="text-sm text-gray-500">ID: {preset.id}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Theme Info */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Theme Configuration</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(theme, null, 2)}
          </pre>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Theme</h3>
            <p className="text-gray-600 mb-4">
              테마 설정을 MCP 형식 JSON 파일로 내보냅니다.
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-xs mb-4 max-h-60">
              {JSON.stringify(exportTheme(), null, 2)}
            </pre>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download JSON
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
