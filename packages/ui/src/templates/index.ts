/**
 * @tekton-ui/ui - Templates Module
 * SPEC-UI-001 Phase 3: Screen Template System
 *
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 * [TAG-UI002-001] ScreenTemplate interface 준수
 * [TAG-UI002-004] 필수 컴포넌트 검증 시스템
 *
 * WHY: 템플릿 모듈이 스크린 템플릿 시스템을 통합
 * IMPACT: 모듈 오류 시 템플릿 사용 불가
 */

// Types
export * from './types';

// Registry
export { TemplateRegistry, templateRegistry } from './registry';

// Auth Templates
export { LoginTemplate, LoginTemplateComponent } from './auth/login';
export { SignupTemplate, SignupTemplateComponent } from './auth/signup';
export { ForgotPasswordTemplate, ForgotPasswordTemplateComponent } from './auth/forgot-password';
export { VerificationTemplate, VerificationTemplateComponent } from './auth/verification';

// Core Templates
export { LandingTemplate, LandingTemplateComponent } from './core/landing';
export { PreferencesTemplate, PreferencesTemplateComponent } from './core/preferences';
export { ProfileTemplate, ProfileTemplateComponent } from './core/profile';

// Feedback Templates
export { LoadingTemplate, LoadingTemplateComponent } from './feedback/loading';
export { ErrorTemplate, ErrorTemplateComponent } from './feedback/error';
export { EmptyTemplate, EmptyTemplateComponent } from './feedback/empty';
export { ConfirmationTemplate, ConfirmationTemplateComponent } from './feedback/confirmation';
export { SuccessTemplate, SuccessTemplateComponent } from './feedback/success';

// Dashboard Templates
export { DashboardTemplate, DashboardTemplateComponent } from './dashboard/overview';

// Auto-register templates
import { templateRegistry } from './registry';
import { LoginTemplate } from './auth/login';
import { SignupTemplate } from './auth/signup';
import { ForgotPasswordTemplate } from './auth/forgot-password';
import { VerificationTemplate } from './auth/verification';
import { LandingTemplate } from './core/landing';
import { PreferencesTemplate } from './core/preferences';
import { ProfileTemplate } from './core/profile';
import { LoadingTemplate } from './feedback/loading';
import { ErrorTemplate } from './feedback/error';
import { EmptyTemplate } from './feedback/empty';
import { ConfirmationTemplate } from './feedback/confirmation';
import { SuccessTemplate } from './feedback/success';
import { DashboardTemplate } from './dashboard/overview';

// Register all built-in templates
templateRegistry.registerMany([
  // Auth
  LoginTemplate,
  SignupTemplate,
  ForgotPasswordTemplate,
  VerificationTemplate,
  // Core
  LandingTemplate,
  PreferencesTemplate,
  ProfileTemplate,
  // Feedback
  LoadingTemplate,
  ErrorTemplate,
  EmptyTemplate,
  ConfirmationTemplate,
  SuccessTemplate,
  // Dashboard
  DashboardTemplate,
]);
