/**
 * Sidebar Context
 * [SPEC-UI-003]
 *
 * 사이드바 접기/펼치기 상태 전역 관리
 */

'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// ============================================================================
// Context Types
// ============================================================================

interface SidebarContextValue {
  /** 사이드바 접힌 상태 */
  isCollapsed: boolean;

  /** 사이드바 토글 */
  toggleSidebar: () => void;

  /** 사이드바 접기 */
  collapseSidebar: () => void;

  /** 사이드바 펼치기 */
  expandSidebar: () => void;
}

// ============================================================================
// Context
// ============================================================================

const SidebarContext = createContext<SidebarContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

interface SidebarProviderProps {
  children: ReactNode;
  /** 초기 접힌 상태 (기본값: false) */
  defaultCollapsed?: boolean;
}

export function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const value: SidebarContextValue = {
    isCollapsed,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Sidebar Context 사용 Hook
 *
 * @throws {Error} SidebarProvider 외부에서 사용 시 에러
 */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
}
