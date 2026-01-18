'use client';

/**
 * Project Editor Page - SaaS Dashboard Style
 * 
 * Design-TAG: SPEC-STUDIO-WEB-001 SaaS Dashboard editor
 * Function-TAG: 3-pane editor layout (Navigation | Canvas | Properties)
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    Loader2,
    Layers,
    Palette,
    Smartphone,
    Monitor,
    Tablet,
    Settings,
    ZoomIn,
    ZoomOut,
    Play,
    Box,
    Grid
} from 'lucide-react';
import { useProject, useUpdateProject } from '@/hooks/useProjects';
import { usePresets } from '@/hooks/usePresets';
import { Button } from '@/components/ui/Button';

// Editor sections
type LeftSidebarTab = 'layers' | 'assets' | 'pages';
type RightSidebarTab = 'properties' | 'interaction' | 'theme';
type ViewportMode = 'mobile' | 'tablet' | 'desktop';

interface EditorState {
    leftTab: LeftSidebarTab;
    rightTab: RightSidebarTab;
    viewport: ViewportMode;
    zoom: number;
    hasUnsavedChanges: boolean;
    lastSaved: Date | null;
}

function formatSaveStatus(lastSaved: Date | null, hasChanges: boolean): string {
    if (hasChanges) {
        return 'Unsaved changes';
    }
    if (!lastSaved) {
        return 'Not saved';
    }

    const diffMs = Date.now() - lastSaved.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) {
        return 'Saved just now';
    }
    if (diffMins < 60) {
        return `Saved ${diffMins}m ago`;
    }
    return `Saved ${Math.floor(diffMins / 60)}h ago`;
}

export default function ProjectEditorPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = Number(params.id);

    const { data: project, isLoading, error } = useProject(projectId);
    const { data: presetsData } = usePresets({ limit: 100 });
    const updateProject = useUpdateProject();

    const [editorState, setEditorState] = useState<EditorState>({
        leftTab: 'layers',
        rightTab: 'properties',
        viewport: 'desktop',
        zoom: 100,
        hasUnsavedChanges: false,
        lastSaved: null,
    });

    const [projectName, setProjectName] = useState('');
    const [tokenConfig, setTokenConfig] = useState<Record<string, unknown>>({});

    // Initialize state from project data
    useEffect(() => {
        if (project) {
            setProjectName(project.name);
            setTokenConfig(project.token_config);
            setEditorState((prev) => ({ ...prev, lastSaved: new Date(project.updated_at) }));
        }
    }, [project]);

    const handleSave = async () => {
        if (!project) {
            return;
        }

        await updateProject.mutateAsync({
            projectId: project.id,
            data: {
                name: projectName,
                token_config: tokenConfig,
            },
        });

        setEditorState((prev) => ({
            ...prev,
            hasUnsavedChanges: false,
            lastSaved: new Date(),
        }));
    };

    const handleNameChange = (name: string) => {
        setProjectName(name);
        setEditorState((prev) => ({ ...prev, hasUnsavedChanges: true }));
    };

    const handleSelectPreset = async (presetId: number) => {
        if (!project) {
            return;
        }

        const preset = presetsData?.items.find((p) => p.id === presetId);
        if (preset) {
            setTokenConfig(preset.config);
            await updateProject.mutateAsync({
                projectId: project.id,
                data: {
                    active_template_id: presetId,
                    token_config: preset.config,
                },
            });
            setEditorState((prev) => ({
                ...prev,
                hasUnsavedChanges: false,
                lastSaved: new Date(),
            }));
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 bg-background">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Project Not Found</h2>
                    <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/workspace')}>Back to Workspace</Button>
                </div>
            </div>
        );
    }

    if (isLoading || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden" data-theme="saas-dashboard">
            {/* 1. Global Toolbar */}
            <header className="h-[48px] border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/workspace')}
                        className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        title="Back to Workspace"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs uppercase">
                            {projectName.charAt(0)}
                        </div>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0 text-foreground w-48 hover:bg-muted/50 rounded px-1 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Viewport Controls */}
                    <div className="flex items-center bg-muted/50 rounded-md p-0.5 border border-border mr-4">
                        <ViewportButton
                            active={editorState.viewport === 'desktop'}
                            icon={<Monitor className="w-3.5 h-3.5" />}
                            onClick={() => setEditorState(p => ({ ...p, viewport: 'desktop' }))}
                        />
                        <ViewportButton
                            active={editorState.viewport === 'tablet'}
                            icon={<Tablet className="w-3.5 h-3.5" />}
                            onClick={() => setEditorState(p => ({ ...p, viewport: 'tablet' }))}
                        />
                        <ViewportButton
                            active={editorState.viewport === 'mobile'}
                            icon={<Smartphone className="w-3.5 h-3.5" />}
                            onClick={() => setEditorState(p => ({ ...p, viewport: 'mobile' }))}
                        />
                    </div>

                    <span className="text-xs text-muted-foreground mr-2">
                        {formatSaveStatus(editorState.lastSaved, editorState.hasUnsavedChanges)}
                    </span>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSave}
                        disabled={updateProject.isPending || !editorState.hasUnsavedChanges}
                        className={editorState.hasUnsavedChanges ? "text-primary hover:text-primary/80 hover:bg-primary/10" : "text-muted-foreground"}
                    >
                        {updateProject.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save
                    </Button>

                    <Button size="sm" className="btn-primary h-8">
                        <Play className="w-3 h-3 mr-2 fill-current" />
                        Preview
                    </Button>
                </div>
            </header>

            {/* 2. Main Workspace (3-Pane Layout) */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Pane: Navigation & Assets */}
                <aside className="w-[240px] border-r border-border bg-card flex flex-col shrink-0">
                    <div className="flex border-b border-border">
                        <PanelTab
                            active={editorState.leftTab === 'layers'}
                            icon={<Layers className="w-4 h-4" />}
                            label="Layers"
                            onClick={() => setEditorState(p => ({ ...p, leftTab: 'layers' }))}
                        />
                        <PanelTab
                            active={editorState.leftTab === 'assets'}
                            icon={<Grid className="w-4 h-4" />}
                            label="Assets"
                            onClick={() => setEditorState(p => ({ ...p, leftTab: 'assets' }))}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {editorState.leftTab === 'layers' && (
                            <div className="space-y-4">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Structure</div>
                                <div className="space-y-1">
                                    <LayerItem label="Homepage" type="page" depth={0} active />
                                    <LayerItem label="Navigation" type="component" depth={1} />
                                    <LayerItem label="Hero Section" type="component" depth={1} />
                                    <LayerItem label="Features" type="component" depth={1} />
                                    <LayerItem label="Pricing" type="component" depth={1} />
                                    <LayerItem label="Footer" type="component" depth={1} />
                                </div>
                            </div>
                        )}
                        {editorState.leftTab === 'assets' && (
                            <div className="text-center py-8 text-muted-foreground text-xs">
                                No assets imported yet.
                            </div>
                        )}
                    </div>
                </aside>

                {/* Center Pane: Canvas */}
                <main className="flex-1 bg-muted/20 relative overflow-hidden flex flex-col">
                    {/* Quick Tools */}
                    <div className="h-10 border-b border-border bg-background/50 backdrop-blur-sm flex items-center px-4 gap-2 justify-between">
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Page: /home</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <IconButton icon={<ZoomOut className="w-3.5 h-3.5" />} />
                            <span className="text-xs w-10 text-center">{editorState.zoom}%</span>
                            <IconButton icon={<ZoomIn className="w-3.5 h-3.5" />} />
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                        <div
                            className={`bg-white shadow-lg transition-all duration-300 border border-border/50 relative ${editorState.viewport === 'mobile' ? 'w-[375px] h-[667px]' :
                                editorState.viewport === 'tablet' ? 'w-[768px] h-[1024px]' :
                                    'w-[1280px] h-[800px]'
                                }`}
                        >
                            {/* Iframe placeholder for actual preview */}
                            <div className="w-full h-full flex flex-col">
                                <div className="h-12 border-b flex items-center justify-between px-4 bg-white">
                                    <div className="w-24 h-4 bg-muted rounded"></div>
                                    <div className="flex gap-2">
                                        <div className="w-16 h-4 bg-muted rounded"></div>
                                        <div className="w-16 h-4 bg-muted rounded"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-8">
                                    <div className="w-2/3 h-8 bg-muted rounded mb-4"></div>
                                    <div className="w-full h-32 bg-secondary/30 rounded mb-8 border border-secondary">
                                        <div className="w-full h-full flex items-center justify-center text-secondary-foreground text-sm font-medium">
                                            Canvas Preview
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-24 bg-muted rounded"></div>
                                        <div className="h-24 bg-muted rounded"></div>
                                        <div className="h-24 bg-muted rounded"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Overlay Hints */}
                            <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5"></div>
                        </div>
                    </div>
                </main>

                {/* Right Pane: Properties & Settings */}
                <aside className="w-[280px] border-l border-border bg-card flex flex-col shrink-0">
                    <div className="flex border-b border-border">
                        <PanelTab
                            active={editorState.rightTab === 'properties'}
                            icon={<Settings className="w-4 h-4" />}
                            label="Properties"
                            onClick={() => setEditorState(p => ({ ...p, rightTab: 'properties' }))}
                        />
                        <PanelTab
                            active={editorState.rightTab === 'theme'}
                            icon={<Palette className="w-4 h-4" />}
                            label="Theme"
                            onClick={() => setEditorState(p => ({ ...p, rightTab: 'theme' }))}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-0">
                        {editorState.rightTab === 'properties' && (
                            <div className="p-4 space-y-6">
                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Selection</div>
                                    <div className="p-3 bg-muted/50 rounded border border-border text-sm">
                                        Hero Section
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layout</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 border border-border rounded text-center text-xs hover:bg-muted cursor-pointer">Flex</div>
                                        <div className="p-2 border border-border rounded text-center text-xs bg-primary/10 border-primary text-primary font-medium cursor-pointer">Grid</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Spacing</div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center justify-between p-2 border border-border rounded">
                                            <span className="text-muted-foreground">Gap</span>
                                            <span>24px</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 border border-border rounded">
                                            <span className="text-muted-foreground">Padding</span>
                                            <span>16px</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {editorState.rightTab === 'theme' && (
                            <div className="p-4 space-y-6">
                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Applied Preset</div>
                                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
                                        <div className="text-sm font-medium text-primary mb-1">
                                            {presetsData?.items.find(p => p.id === project.active_template_id)?.name || 'Custom Theme'}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {presetsData?.items.find(p => p.id === project.active_template_id)?.description?.substring(0, 60)}...
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Design System</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {presetsData?.items.map((preset) => (
                                            <button
                                                key={preset.id}
                                                onClick={() => handleSelectPreset(preset.id)}
                                                className={`text-left p-2 rounded border text-xs transition-colors ${project.active_template_id === preset.id
                                                    ? 'border-primary bg-primary/10 text-primary'
                                                    : 'border-border hover:border-sidebar-foreground'
                                                    }`}
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

// UI Helper Components

function ViewportButton({ active, icon, onClick }: { active: boolean, icon: React.ReactNode, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`p-1.5 rounded-sm transition-colors ${active ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
            {icon}
        </button>
    );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            {icon}
        </button>
    );
}

function PanelTab({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium border-b-2 transition-colors ${active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function LayerItem({ label, type, depth, active }: { label: string, type: 'page' | 'component', depth: number, active?: boolean }) {
    return (
        <div
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-xs ${active
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-foreground hover:bg-muted'
                }`}
            style={{ paddingLeft: `${(depth * 12) + 8}px` }}
        >
            {type === 'page' ? <Smartphone className="w-3.5 h-3.5" /> : <Box className="w-3.5 h-3.5 text-muted-foreground" />}
            {label}
        </div>
    );
}
