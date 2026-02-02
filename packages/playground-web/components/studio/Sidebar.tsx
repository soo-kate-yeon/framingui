/**
 * Sidebar Component
 * [SPEC-UI-003][TAG-UI003-045]
 *
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Widest
 * - Active State: Black/White High Contrast
 * - 접힌 상태: 아이콘만 표시
 * - 펼친 상태: 전체 메뉴 표시
 */

'use client';

import { Layout, User, LogIn, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';

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
    requireAuth: true,
  },
];

// ============================================================================
// Component
// ============================================================================

export function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isCollapsed, toggleSidebar } = useSidebar();

  // 로그인 상태에 따라 네비게이션 필터링
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.requireAuth && !user) {
      return false;
    }
    return true;
  });

  return (
    <aside
      className={`sidebar h-full bg-white border-r border-neutral-200 flex flex-col overflow-hidden z-10 transition-all duration-300 ${
        isCollapsed ? 'w-[64px] min-w-[64px]' : 'w-[240px] min-w-[240px]'
      } ${className}`}
    >
      {/* Header */}
      <div className={`border-b border-neutral-100 ${isCollapsed ? 'p-4' : 'p-6'}`}>
        {isCollapsed ? (
          // 접힌 상태: 로고 + 토글 버튼 세로 배치
          <div className="flex flex-col items-center gap-3">
            <div className="text-lg font-bold tracking-tighter">T</div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-2 hover:bg-neutral-100 transition-colors border border-neutral-200"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        ) : (
          // 펼친 상태: 로고 + 토글 버튼 가로 배치
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold tracking-tighter">TEKTON</div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 block">
                Studio
              </span>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-2 hover:bg-neutral-100 transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'}`} aria-label="Main navigation">
        <ul className="space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} text-xs font-bold uppercase tracking-wider transition-all
                    ${isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                    }
                  `}
                >
                  <Icon size={16} aria-hidden="true" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer (User Info / Login) */}
      <div className={`border-t border-neutral-100 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {user ? (
          <div className={`flex flex-col ${isCollapsed ? 'items-center gap-2' : 'gap-3'}`}>
            {/* User Avatar */}
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                title={isCollapsed ? user.name : undefined}
                className="w-8 h-8 rounded-none object-cover grayscale"
              />
            ) : (
              <div
                className="w-8 h-8 bg-neutral-900 text-white flex items-center justify-center text-xs font-bold"
                title={isCollapsed ? user.name : undefined}
              >
                {user.name.charAt(0)}
              </div>
            )}

            {/* User Info - 펼친 상태에서만 */}
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-bold text-neutral-900 truncate uppercase tracking-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-neutral-400 truncate font-mono">
                  {user.email}
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              title={isCollapsed ? 'Logout' : undefined}
              className={`flex items-center justify-center bg-transparent border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors ${
                isCollapsed
                  ? 'p-2'
                  : 'gap-2 w-full py-2 text-[10px] uppercase font-bold tracking-widest'
              }`}
            >
              <LogOut size={isCollapsed ? 14 : 12} aria-hidden="true" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            title={isCollapsed ? 'Login' : undefined}
            className={`flex items-center justify-center bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors ${
              isCollapsed ? 'p-3' : 'gap-2 w-full py-3'
            }`}
          >
            <LogIn size={14} aria-hidden="true" />
            {!isCollapsed && <span>Login</span>}
          </Link>
        )}
      </div>
    </aside>
  );
}
