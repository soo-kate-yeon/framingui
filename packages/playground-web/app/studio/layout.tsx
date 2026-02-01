/**
 * Studio Layout
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Midjourney 스타일 레이아웃 (왼쪽 사이드바 + 메인 영역)
 */

import type { ReactNode } from 'react';
import { Sidebar } from '../../components/studio/Sidebar';

interface StudioLayoutProps {
  children: ReactNode;
}

export default function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      <main
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--tekton-bg-background, #ffffff)',
        }}
      >
        {children}
      </main>
    </div>
  );
}
