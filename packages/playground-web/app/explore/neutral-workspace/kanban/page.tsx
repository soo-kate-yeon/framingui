'use client';

import { KanbanBoardView } from '@/components/explore/workspace/KanbanBoardView';
import { useTektonTheme } from '@/hooks/useTektonTheme';
import { PreviewBanner } from '@/components/explore/PreviewBanner';

const NEUTRAL_WORKSPACE_FALLBACK: Record<string, string> = {
  '--tekton-bg-canvas': '#F9F7F2',
  '--tekton-bg-surface': '#F9F7F2',
  '--tekton-text-primary': '#1F1D19',
  '--tekton-text-secondary': '#706C61',
  '--tekton-border-default': '#E4E2DC',
  '--tekton-radius-sm': '8px',
  '--tekton-radius-md': '8px',
  '--tekton-radius-lg': '12px',
  '--tekton-radius-xl': '16px',
};

export default function NeutralWorkspaceKanbanPage() {
  const { loaded } = useTektonTheme('neutral-workspace', {
    fallback: NEUTRAL_WORKSPACE_FALLBACK,
  });

  return (
    <div
      className={`h-screen flex flex-col bg-[var(--tekton-bg-canvas)] transition-opacity duration-500 pt-12 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <PreviewBanner templateId="neutral-workspace" templateName="Neutral Workspace" />
      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-10">
        <KanbanBoardView themeName="neutral-workspace" />
      </main>
    </div>
  );
}
