import type { PlatformTarget, ProjectEnvironment } from './schemas/mcp-schemas.js';

export interface ActiveProjectContext {
  projectPath: string;
  packageJsonPath: string;
  platform: PlatformTarget;
  environment: ProjectEnvironment;
  detectedAt: string;
}

let activeProjectContext: ActiveProjectContext | null = null;

export function setActiveProjectContext(context: Omit<ActiveProjectContext, 'detectedAt'>): void {
  activeProjectContext = {
    ...context,
    detectedAt: new Date().toISOString(),
  };
}

export function getActiveProjectContext(): ActiveProjectContext | null {
  return activeProjectContext;
}

export function clearActiveProjectContext(): void {
  activeProjectContext = null;
}
