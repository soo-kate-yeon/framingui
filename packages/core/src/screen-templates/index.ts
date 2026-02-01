/**
 * @tekton/core - Screen Templates Module
 * AI-Native Design Library - 12 P0 Screen Templates
 * [SPEC-UI-002]
 *
 * Exports:
 * - Types: ScreenTemplate, ScreenCategory, TemplateLayout, etc.
 * - Registry: TemplateRegistry singleton
 * - Templates: 12 screen templates
 *   - Auth (4): login, signup, forgot-password, verification
 *   - Core (3): landing, preferences, profile
 *   - Feedback (5): loading, error, empty, confirmation, success
 */

// ============================================================================
// Core Types and Registry
// ============================================================================

export * from './types.js';
export * from './registry.js';
import { TemplateRegistry } from './registry.js';

// ============================================================================
// Templates by Category
// ============================================================================

// Auth Templates (4)
export {
  loginTemplate,
  LoginComponent,
  signupTemplate,
  SignupComponent,
  forgotPasswordTemplate,
  ForgotPasswordComponent,
  verificationTemplate,
  VerificationComponent,
} from './templates/auth/index.js';

// Home Templates (1)
export { landingTemplate, LandingComponent } from './templates/home/index.js';

// Settings Templates (1)
export { preferencesTemplate, PreferencesComponent } from './templates/settings/index.js';

// Account Templates (1)
export { profileTemplate, ProfileComponent } from './templates/account/index.js';

// Feedback Templates (5)
export {
  loadingTemplate,
  LoadingComponent,
  errorTemplate,
  ErrorComponent,
  emptyTemplate,
  EmptyComponent,
  confirmationTemplate,
  ConfirmationComponent,
  successTemplate,
  SuccessComponent,
} from './templates/feedback/index.js';

// ============================================================================
// Template Collection (for easy registration)
// ============================================================================

import { loginTemplate, signupTemplate, forgotPasswordTemplate, verificationTemplate } from './templates/auth/index.js';
import { landingTemplate } from './templates/home/index.js';
import { preferencesTemplate } from './templates/settings/index.js';
import { profileTemplate } from './templates/account/index.js';
import {
  loadingTemplate,
  errorTemplate,
  emptyTemplate,
  confirmationTemplate,
  successTemplate,
} from './templates/feedback/index.js';

/**
 * All 12 P0 Screen Templates
 * 전체 12개 P0 화면 템플릿 배열
 */
export const allTemplates = [
  // Auth (4)
  loginTemplate,
  signupTemplate,
  forgotPasswordTemplate,
  verificationTemplate,

  // Core (3)
  landingTemplate,
  preferencesTemplate,
  profileTemplate,

  // Feedback (5)
  loadingTemplate,
  errorTemplate,
  emptyTemplate,
  confirmationTemplate,
  successTemplate,
] as const;

/**
 * Register all templates to the registry
 * 모든 템플릿을 레지스트리에 등록하는 헬퍼 함수
 *
 * @example
 * ```typescript
 * import { registerAllTemplates } from '@tekton/core/screen-templates';
 *
 * registerAllTemplates();
 * ```
 */
export function registerAllTemplates(): void {
  const registry = TemplateRegistry.getInstance();
  registry.registerAll([...allTemplates]);
}

// Re-export TemplateRegistry for convenience
export { TemplateRegistry } from './registry.js';
