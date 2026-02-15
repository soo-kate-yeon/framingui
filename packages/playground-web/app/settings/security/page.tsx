/**
 * Security Settings Page
 * Minimal Workspace Theme Applied
 */

'use client';

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mw-heading-3">Security</h2>
        <p className="mw-text-secondary mt-2">
          Manage your account security and authentication methods
        </p>
      </div>

      <div className="mw-card">
        <div className="mw-card-header">
          <h3 className="mw-card-title">Security Settings</h3>
          <p className="mw-card-description">
            Configure password, two-factor authentication, and security preferences
          </p>
        </div>
        <div className="mw-card-content">
          <p className="mw-text-secondary">Security settings coming soon...</p>
        </div>
      </div>
    </div>
  );
}
