'use client';

import { KanbanBoardView } from '@/components/explore/workspace/KanbanBoardView';
import { useTektonTheme } from '@/hooks/useTektonTheme';
import { PreviewBanner } from '@/components/explore/PreviewBanner';

const MINIMAL_WORKSPACE_FALLBACK: Record<string, string> = {
  '--tekton-bg-canvas': '#FFFFFF',
  '--tekton-bg-surface': '#FFFFFF',
  '--tekton-text-primary': '#09090B',
  '--tekton-text-secondary': '#71717A',
  '--tekton-text-tertiary': '#A1A1AA',
  '--tekton-border-default': '#E4E4E7',
  '--tekton-border-emphasis': '#D4D4D8',
  '--tekton-action-primary': '#18181B',
  '--tekton-action-primary-text': '#FAFAFA',
  '--tekton-radius-sm': '6px',
  '--tekton-radius-md': '6px',
  '--tekton-radius-lg': '8px',
  '--tekton-radius-xl': '12px',
};

export default function MinimalWorkspaceKanbanPage() {
  const { loaded } = useTektonTheme('minimal-workspace', {
    fallback: MINIMAL_WORKSPACE_FALLBACK,
  });

  return (
    <div
      className={`h-screen flex flex-col bg-[var(--tekton-bg-canvas)] transition-opacity duration-500 pt-12 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <PreviewBanner templateId="minimal-workspace" templateName="Minimal Workspace" />
      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-10">
        <KanbanBoardView themeName="minimal-workspace" />
      </main>
    </div>
  );
}
