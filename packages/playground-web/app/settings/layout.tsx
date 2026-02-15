/**
 * Settings Layout with Sidebar Navigation
 * Minimal Workspace Theme Applied
 *
 * WHY: Provides consistent navigation structure for all settings pages
 * IMPACT: Users can easily navigate between different settings sections
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, Bell, Shield, CreditCard, Settings as SettingsIcon } from 'lucide-react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: User,
    description: 'Update your personal information',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
    description: 'Configure notification preferences',
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: Shield,
    description: 'Manage security and authentication',
  },
  {
    title: 'Billing',
    href: '/settings/billing',
    icon: CreditCard,
    description: 'View billing and subscription details',
  },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="mw-canvas">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="h-8 w-8 mw-text-primary" />
            <h1 className="mw-heading-1">Settings</h1>
          </div>
          <p className="mw-text-secondary">Manage your account settings and preferences</p>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <nav className="mw-card">
              <div className="p-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors',
                        'hover:bg-neutral-100 group',
                        isActive && 'bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 mt-0.5 flex-shrink-0',
                          isActive
                            ? 'text-neutral-50'
                            : 'text-neutral-500 group-hover:text-neutral-900'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            'font-medium text-sm',
                            isActive
                              ? 'text-neutral-50'
                              : 'text-neutral-950 group-hover:text-neutral-900'
                          )}
                        >
                          {item.title}
                        </div>
                        <div
                          className={cn(
                            'text-xs mt-0.5',
                            isActive ? 'text-neutral-300' : 'text-neutral-500'
                          )}
                        >
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
