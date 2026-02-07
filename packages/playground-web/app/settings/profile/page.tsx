/**
 * Profile Settings Page
 * Minimal Workspace Theme Applied
 */

'use client';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mw-heading-3">Profile</h2>
        <p className="mw-text-secondary mt-2">
          Manage your personal information and account details
        </p>
      </div>

      <div className="mw-card">
        <div className="mw-card-header">
          <h3 className="mw-card-title">Personal Information</h3>
          <p className="mw-card-description">
            Update your profile details and preferences
          </p>
        </div>
        <div className="mw-card-content">
          <p className="mw-text-secondary">Profile settings coming soon...</p>
        </div>
      </div>
    </div>
  );
}
