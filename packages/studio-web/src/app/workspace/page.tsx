'use client';

/**
 * Workspace Page - SaaS Dashboard Style
 * 
 * Design-TAG: SPEC-STUDIO-WEB-001 SaaS Dashboard workspace
 * Function-TAG: Main dashboard showing projects, system status, and recent activity
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Search,
    Trash2,
    LayoutGrid,
    List,
    Activity,
    Settings,
    BarChart3,
    Home,
    Folder,
    Users,
    Bell,
    CheckCircle2
} from 'lucide-react';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/useProjects';
import { Button } from '@/components/ui/Button';

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) { return 'Just now'; }
    if (diffMins < 60) { return `${diffMins}m ago`; }
    if (diffHours < 24) { return `${diffHours}h ago`; }
    if (diffDays < 7) { return `${diffDays}d ago`; }
    return date.toLocaleDateString();
}

export default function WorkspacePage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const { data, isLoading } = useProjects({ include_archived: false });
    const createProject = useCreateProject();
    const deleteProject = useDeleteProject();

    const handleCreateProject = async () => {
        setIsCreating(true);
        try {
            const project = await createProject.mutateAsync({
                name: 'New SaaS Project',
                description: '',
            });
            router.push(`/project/${project.id}`);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteProject = async (projectId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project?')) {
            await deleteProject.mutateAsync({ projectId });
        }
    };

    const handleProjectClick = (projectId: number) => {
        router.push(`/project/${projectId}`);
    };

    const filteredProjects = data?.items.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Dashboard Mock Metrics
    const activeProjects = filteredProjects.length;
    const totalDeployments = filteredProjects.reduce((acc, p) => acc + (p.id % 5), 0) + 12; // Mock data
    const systemHealth = 98.5;

    return (
        <div className="min-h-screen bg-background flex text-sm" data-theme="saas-dashboard">
            {/* Sidebar Navigation */}
            <aside className="w-[var(--sidebar-width)] border-r border-border bg-card flex flex-col fixed inset-y-0 left-0 z-10">
                {/* Logo Area */}
                <div className="h-[var(--header-height)] flex items-center px-6 border-b border-border">
                    <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold mr-3">
                        T
                    </div>
                    <span className="font-semibold tracking-tight text-lg">Tekton</span>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Platform</div>
                    <NavItem icon={<Home className="w-4 h-4" />} label="Overview" active />
                    <NavItem icon={<Activity className="w-4 h-4" />} label="Activity" />
                    <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Analytics" />

                    <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-2">Workspace</div>
                    <NavItem icon={<Folder className="w-4 h-4" />} label="Projects" />
                    <NavItem icon={<Users className="w-4 h-4" />} label="Team" />
                    <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">Jane Doe</div>
                            <div className="text-xs text-muted-foreground truncate">jane@example.com</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col ml-[var(--sidebar-width)]">
                {/* Header */}
                <header className="h-[var(--header-height)] border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <h1 className="font-semibold text-lg">Dashboard</h1>
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            System Operational
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 h-9 pl-9 pr-4 rounded-md border border-input bg-background/50 focus:bg-background transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
                            <Bell className="w-4 h-4 text-muted-foreground" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <MetricCard
                            label="Active Projects"
                            value={String(activeProjects)}
                            trend="+2.5%"
                            trendUp
                            icon={<Folder className="w-4 h-4 text-primary" />}
                        />
                        <MetricCard
                            label="Total Deployments"
                            value={String(totalDeployments)}
                            trend="+12%"
                            trendUp
                            icon={<Activity className="w-4 h-4 text-blue-500" />}
                        />
                        <MetricCard
                            label="Avg. Response Time"
                            value="124ms"
                            trend="-4%"
                            trendUp
                            icon={<Activity className="w-4 h-4 text-purple-500" />}
                        />
                        <MetricCard
                            label="System Health"
                            value={`${systemHealth}%`}
                            trend="Stable"
                            icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}
                        />
                    </div>

                    {/* Projects Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-base font-semibold">Recent Projects</h2>
                                <p className="text-muted-foreground text-xs mt-1">Manage and monitor your active projects</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center bg-muted rounded-md p-1 border border-border">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                </div>
                                <Button onClick={handleCreateProject} disabled={isCreating} className="btn-primary">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Project
                                </Button>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="space-y-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="h-16 w-full bg-muted/50 animate-pulse rounded-md" />
                                ))}
                            </div>
                        )}

                        {!isLoading && filteredProjects.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-lg bg-muted/10">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <Folder className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <h3 className="font-medium mb-1">No projects found</h3>
                                <p className="text-muted-foreground text-xs mb-4">Get started by creating your first project</p>
                                <Button onClick={handleCreateProject} disabled={isCreating} size="sm">
                                    Create Project
                                </Button>
                            </div>
                        )}

                        {!isLoading && filteredProjects.length > 0 && (
                            viewMode === 'list' ? (
                                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="w-[40%] pl-6">Project Name</th>
                                                <th>Status</th>
                                                <th>Last Updated</th>
                                                <th>Version</th>
                                                <th className="text-right pr-6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProjects.map((project) => (
                                                <tr
                                                    key={project.id}
                                                    onClick={() => handleProjectClick(project.id)}
                                                    className="group hover:bg-muted/50 cursor-pointer transition-colors border-b last:border-0 border-border"
                                                >
                                                    <td className="pl-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                                                {project.name.substring(0, 2)}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium group-hover:text-primary transition-colors">{project.name}</div>
                                                                <div className="text-xs text-muted-foreground">{project.description || 'No description'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-success">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="text-muted-foreground text-xs">
                                                        {formatRelativeTime(project.updated_at)}
                                                    </td>
                                                    <td className="text-mono text-xs text-muted-foreground">v1.2.0</td>
                                                    <td className="text-right pr-6">
                                                        <button
                                                            onClick={(e) => handleDeleteProject(project.id, e)}
                                                            className="text-muted-foreground hover:text-destructive p-2 rounded-md hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {filteredProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => handleProjectClick(project.id)}
                                            className="card p-4 hover:border-primary transition-colors cursor-pointer group flex flex-col h-full"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                                                    {project.name.substring(0, 2)}
                                                </div>
                                                <button
                                                    onClick={(e) => handleDeleteProject(project.id, e)}
                                                    className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                                                {project.description || 'No description provided for this project.'}
                                            </p>
                                            <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                                                <span className="badge badge-success">Active</span>
                                                <span className="text-xs text-muted-foreground">{formatRelativeTime(project.updated_at)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors mb-0.5 ${active
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}>
            {icon}
            {label}
        </button>
    );
}

function MetricCard({ label, value, trend, trendUp, icon }: { label: string, value: string, trend?: string, trendUp?: boolean, icon: React.ReactNode }) {
    return (
        <div className="card p-5">
            <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                <div className="p-1.5 bg-muted rounded-md">{icon}</div>
            </div>
            <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight">{value}</span>
                {trend && (
                    <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
