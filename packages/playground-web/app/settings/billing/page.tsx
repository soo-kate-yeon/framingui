/**
 * Billing Settings Page
 * Minimal Workspace Theme Applied
 */

'use client';

export default function BillingPage() {
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
            Manage your subscription plan and payment methods
          </p>
        </div>
        <div className="mw-card-content">
          <p className="mw-text-secondary">Billing information coming soon...</p>
        </div>
      </div>
    </div>
  );
}
