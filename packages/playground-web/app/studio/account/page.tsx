/**
 * Account Page
 * [SPEC-UI-003][TAG-UI003-038]
 * [SPEC-DEPLOY-001][TAG-DEPLOY-001-U008]
 *
 * 라이선스 관리, 좋아요 목록 페이지
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Widest
 * - Border: Neutral-200
 */

'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { Key, Heart } from 'lucide-react';

// ============================================================================
// Tab Component
// ============================================================================

interface TabButtonProps {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}

function TabButton({ id, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={() => onClick(id)}
      data-state={active ? 'active' : 'inactive'}
      className="pb-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 border-b-2 border-transparent data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 transition-colors"
    >
      {label}
    </button>
  );
}

// ============================================================================
// Component
// ============================================================================

export default function AccountPage() {
  const { user, userData } = useAuth();
  const [activeTab, setActiveTab] = useState('licenses');

  // [TAG-UI003-016] 로그인 필수
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2">
          My Account
        </h1>
        <p className="text-2xl font-bold text-neutral-900 leading-tight">
          Manage licenses and saved templates
        </p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-neutral-200 mb-12">
        <TabButton
          id="licenses"
          label="Licenses"
          active={activeTab === 'licenses'}
          onClick={setActiveTab}
        />
        <TabButton
          id="saved"
          label="Saved"
          active={activeTab === 'saved'}
          onClick={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      <div>
        {/* Licenses Tab */}
        {activeTab === 'licenses' && (
          <section>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Key size={20} aria-hidden="true" className="text-neutral-900" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
                  My Licenses
                </h2>
              </div>
              <p className="text-xs text-neutral-500">
                View and manage your purchased template licenses
              </p>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              {userData?.licenses && userData.licenses.length > 0 ? (
                <ul className="space-y-3">
                  {userData.licenses.map((license) => (
                    <li
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
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs uppercase tracking-wider text-neutral-400 text-center py-8">
                  No licenses yet
                </p>
              )}
            </div>
          </section>
        )}

        {/* Saved Templates Tab */}
        {activeTab === 'saved' && (
          <section>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Heart size={20} aria-hidden="true" className="text-neutral-900" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
                  Saved Templates
                </h2>
              </div>
              <p className="text-xs text-neutral-500">
                Templates you&apos;ve liked and saved for later
              </p>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              {userData?.likedTemplates && userData.likedTemplates.length > 0 ? (
                <ul className="space-y-3">
                  {userData.likedTemplates.map((templateId) => (
                    <li
                      key={templateId}
                      className="p-4 bg-neutral-50 border border-neutral-200 hover:border-neutral-900 transition-colors"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                        {templateId}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs uppercase tracking-wider text-neutral-400 text-center py-8">
                  No saved templates yet
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
