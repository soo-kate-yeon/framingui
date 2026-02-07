/**
 * Settings Main Page
 * Redirects to API Keys page by default
 */

import { redirect } from 'next/navigation';

export default function SettingsPage() {
  redirect('/settings/api-keys');
}
