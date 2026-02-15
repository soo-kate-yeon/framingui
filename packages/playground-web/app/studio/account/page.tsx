/**
 * Account Page
 * [SPEC-UI-003][TAG-UI003-038]
 *
 * 라이선스 관리 및 좋아요 목록 페이지
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Widest
 * - Border: Neutral-200
 */

'use client';

import { redirect } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

// ============================================================================
// Component
// ============================================================================

export default function AccountPage() {
  const { user, userData } = useAuth();

  // [TAG-UI003-016] 로그인 필수
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="p-6 md:p-12 max-w-[1000px] mx-auto">
      {/* Header */}
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-4 block">
          Tekton Studio
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 mb-6">
          MY ACCOUNT
        </h1>
        <p className="text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed">
          Manage your API keys and saved templates
        </p>
      </header>

      {/* Content Area */}
      <div className="space-y-16">
        {/* API Keys Section */}
        <section>
          <div className="mb-8">
            <h3 className="text-lg font-bold tracking-tight mb-1">API Keys</h3>
            <p className="text-sm text-neutral-500">Manage your purchased template licenses.</p>
          </div>

          <div className="space-y-3">
            {userData?.licenses && userData.licenses.length > 0 ? (
              userData.licenses.map((license) => (
                <div
                  key={license.id}
                  className="p-4 bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      {license.templateId}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide border ${
                        license.status === 'active'
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {license.status}
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                    Purchased: {new Date(license.purchasedAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs uppercase tracking-wider text-neutral-400 text-center py-8">
                No API keys yet
              </p>
            )}
          </div>
        </section>

        {/* Liked Templates Section */}
        <section>
          <div className="mb-8 border-t border-neutral-100 pt-16">
            <h3 className="text-lg font-bold tracking-tight mb-1">Liked Templates</h3>
            <p className="text-sm text-neutral-500">Templates you've saved for later.</p>
          </div>

          <div className="space-y-3">
            {userData?.likedTemplates && userData.likedTemplates.length > 0 ? (
              userData.likedTemplates.map((templateId) => (
                <div
                  key={templateId}
                  className="p-4 bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {templateId}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs uppercase tracking-wider text-neutral-400 text-center py-8">
                No liked templates yet
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
