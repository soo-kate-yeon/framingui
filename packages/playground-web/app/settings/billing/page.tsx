/**
 * Billing Settings Page
 * SPEC-DEPLOY-001 Phase 3: 라이선스 및 결제 관리
 *
 * WHY: 사용자가 보유한 라이선스와 구독 상태를 확인하고 관리
 * IMPACT: 결제 투명성 및 사용자 셀프서비스 제공
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserLicense } from '@/lib/db/types';

export default function BillingPage() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<UserLicense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    async function fetchLicenses() {
      try {
        const res = await fetch('/api/user/licenses');
        if (res.ok) {
          const data = await res.json();
          setLicenses(data.licenses ?? []);
        }
      } catch (err) {
        console.error('라이선스 조회 실패:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLicenses();
  }, [user]);

  const activeLicenses = licenses.filter((l) => l.is_active);
  const expiredLicenses = licenses.filter((l) => !l.is_active);

  // 결제 기능 비활성화 시
  if (process.env.NEXT_PUBLIC_ENABLE_PAYMENTS !== 'true') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="mw-heading-3">Billing</h2>
          <p className="mw-text-secondary mt-2">
            View your subscription details and payment history
          </p>
        </div>
        <div className="mw-card">
          <div className="mw-card-header">
            <h3 className="mw-card-title">Subscription & Billing</h3>
            <p className="mw-card-description">
              Payment features are not currently enabled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="mw-heading-3">Billing</h2>
          <p className="mw-text-secondary mt-2">
            Please sign in to view your billing information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mw-heading-3">Billing</h2>
        <p className="mw-text-secondary mt-2">
          View your subscription details and payment history
        </p>
      </div>

      {/* 활성 라이선스 */}
      <div className="mw-card">
        <div className="mw-card-header">
          <h3 className="mw-card-title">Active Licenses</h3>
          <p className="mw-card-description">
            Your current active licenses and subscriptions
          </p>
        </div>
        <div className="mw-card-content">
          {isLoading ? (
            <p className="mw-text-secondary">Loading...</p>
          ) : activeLicenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="mw-text-secondary mb-4">No active licenses yet.</p>
              <a
                href="/#pricing"
                className="inline-block px-6 py-2 text-sm font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded"
              >
                View Pricing
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {activeLicenses.map((license) => (
                <LicenseRow key={license.id} license={license} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 만료/비활성 라이선스 */}
      {expiredLicenses.length > 0 && (
        <div className="mw-card">
          <div className="mw-card-header">
            <h3 className="mw-card-title">Expired / Inactive Licenses</h3>
          </div>
          <div className="mw-card-content">
            <div className="space-y-4">
              {expiredLicenses.map((license) => (
                <LicenseRow key={license.id} license={license} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LicenseRow({ license }: { license: UserLicense }) {
  const tierLabels: Record<string, string> = {
    single: 'Single',
    double: 'Double',
    creator: 'Creator Pass',
  };

  const purchasedAt = new Date(license.purchased_at).toLocaleDateString();
  const expiresAt = license.expires_at
    ? new Date(license.expires_at).toLocaleDateString()
    : 'Lifetime';

  return (
    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="font-medium text-neutral-900">
            {license.theme_id}
          </span>
          <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 rounded">
            {tierLabels[license.tier] ?? license.tier}
          </span>
          {license.is_active ? (
            <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 rounded">
              Active
            </span>
          ) : (
            <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 rounded">
              Inactive
            </span>
          )}
        </div>
        <div className="mt-1 text-sm text-neutral-500">
          Purchased: {purchasedAt} | Expires: {expiresAt}
        </div>
      </div>
    </div>
  );
}
