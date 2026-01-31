/**
 * @tekton/ui - Templates Module
 * SPEC-UI-001 Phase 3: Screen Template System
 */

// Types
export * from './types';

// Registry
export { TemplateRegistry, templateRegistry } from './registry';

// Auth Templates
export { LoginTemplate, LoginTemplateComponent } from './auth/login';

// Dashboard Templates
export { DashboardTemplate, DashboardTemplateComponent } from './dashboard/overview';

// Auto-register templates
import { templateRegistry } from './registry';
import { LoginTemplate } from './auth/login';
import { DashboardTemplate } from './dashboard/overview';

// Register all built-in templates
templateRegistry.registerMany([LoginTemplate, DashboardTemplate]);
