/**
 * Sidebar Component
 * [SPEC-UI-003][TAG-UI003-045]
 *
 * Midjourney 스타일 사이드바 네비게이션 (Explore, Account 탭)
 */

'use client';

import { Layout, User, LogIn, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

// ============================================================================
// Types
// ============================================================================

interface SidebarProps {
  /** 추가 className */
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: typeof Layout;
  requireAuth: boolean;
}

// ============================================================================
// Navigation Items
// ============================================================================

const NAV_ITEMS: NavItem[] = [
  {
    id: 'explore',
    label: 'Explore',
    href: '/studio',
    icon: Layout,
    requireAuth: false,
  },
  {
    id: 'account',
    label: 'Account',
    href: '/studio/account',
    icon: User,
    requireAuth: true, // [TAG-UI003-016]
  },
];

// ============================================================================
// Component
// ============================================================================

export function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // 로그인 상태에 따라 네비게이션 필터링 [TAG-UI003-015~016]
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.requireAuth && !user) {
      return false; // [TAG-UI003-030] 비로그인 사용자에게 Account 탭 숨김
    }
    return true;
  });

  return (
    <aside
      className={`sidebar ${className}`}
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        backgroundColor: 'var(--tekton-bg-background, #ffffff)',
        borderRight: '1px solid var(--tekton-border-default, #e5e7eb)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--tekton-spacing-lg, 16px)',
          borderBottom: '1px solid var(--tekton-border-default, #e5e7eb)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--tekton-font-size-lg, 18px)',
            fontWeight: '600',
            color: 'var(--tekton-text-foreground, #111827)',
          }}
        >
          Tekton Studio
        </h1>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: 'var(--tekton-spacing-md, 12px)',
        }}
        aria-label="Main navigation"
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--tekton-spacing-xs, 4px)',
          }}
        >
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--tekton-spacing-sm, 8px)',
                    padding: 'var(--tekton-spacing-sm, 8px) var(--tekton-spacing-md, 12px)',
                    backgroundColor: isActive
                      ? 'var(--tekton-bg-accent, #f3f4f6)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--tekton-text-foreground, #111827)'
                      : 'var(--tekton-text-muted-foreground, #6b7280)',
                    borderRadius: 'var(--tekton-radius-md, 6px)',
                    fontSize: 'var(--tekton-font-size-sm, 14px)',
                    fontWeight: isActive ? '500' : '400',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--tekton-bg-muted, #f9fafb)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer (User Info / Login) */}
      <div
        style={{
          padding: 'var(--tekton-spacing-md, 12px)',
          borderTop: '1px solid var(--tekton-border-default, #e5e7eb)',
        }}
      >
        {user ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--tekton-spacing-sm, 8px)',
            }}
          >
            {/* User Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--tekton-spacing-sm, 8px)',
                padding: 'var(--tekton-spacing-sm, 8px)',
              }}
            >
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                  }}
                />
              )}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: 'var(--tekton-font-size-sm, 14px)',
                    fontWeight: '500',
                    color: 'var(--tekton-text-foreground, #111827)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    fontSize: 'var(--tekton-font-size-xs, 12px)',
                    color: 'var(--tekton-text-muted-foreground, #6b7280)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.email}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--tekton-spacing-xs, 4px)',
                padding: 'var(--tekton-spacing-sm, 8px)',
                backgroundColor: 'transparent',
                border: '1px solid var(--tekton-border-default, #e5e7eb)',
                borderRadius: 'var(--tekton-radius-md, 6px)',
                fontSize: 'var(--tekton-font-size-sm, 14px)',
                color: 'var(--tekton-text-muted-foreground, #6b7280)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--tekton-bg-muted, #f9fafb)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogOut size={16} aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--tekton-spacing-xs, 4px)',
              padding: 'var(--tekton-spacing-sm, 8px)',
              backgroundColor: 'var(--tekton-bg-primary, #3b82f6)',
              color: 'var(--tekton-bg-primary-foreground, #ffffff)',
              border: 'none',
              borderRadius: 'var(--tekton-radius-md, 6px)',
              fontSize: 'var(--tekton-font-size-sm, 14px)',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <LogIn size={16} aria-hidden="true" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
