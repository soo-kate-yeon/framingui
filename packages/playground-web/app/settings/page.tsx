/**
 * Settings Main Page
 * Redirects to Profile page by default
 */

import { redirect } from 'next/navigation';

export default function SettingsPage() {
  redirect('/settings/profile');
}
