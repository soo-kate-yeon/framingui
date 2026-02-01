/**
 * @tekton/core - Screen Template Types
 * AI-Native ScreenTemplate interface system for 12 P0 Screen Templates
 * [SPEC-UI-002] [TAG-UI002-001]
 */

import type { TokenReference } from '../token-resolver.js';

/**
 * Minimal React type definitions for screen templates
 * Note: Full React types should be provided by the consuming application
 */
export type ComponentType<P = object> = (props: P) => unknown;
export type ReactNode = unknown;
export type FC<P = object> = (props: P) => unknown;

/**
 * JSX namespace declaration for template typing
 * 템플릿 타이핑을 위한 JSX namespace 선언
 */
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface Element {
      type?: string;
      props?: Record<string, unknown>;
      children?: unknown[];
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

// ============================================================================
// Screen Template Types
// ============================================================================

/**
 * Screen Category - Template classification
 * 템플릿을 카테고리별로 분류
 */
export type ScreenCategory =
  | 'auth' // 인증 화면 (login, signup, forgot-password, verification)
  | 'dashboard' // 대시보드
  | 'content' // 컨텐츠
  | 'form' // 폼
  | 'feedback' // 피드백 (loading, error, empty, confirmation, success)
  | 'marketing'; // 마케팅 페이지

/**
 * Layout Type - Template layout patterns
 * 템플릿의 레이아웃 타입
 */
export type TemplateLayoutType =
  | 'full' // 전체 너비
  | 'centered' // 중앙 정렬 (Auth 화면)
  | 'split' // 좌우 분할
  | 'sidebar'; // 사이드바 레이아웃 (Dashboard, Settings)

/**
 * Max Width Options - Container maximum width
 * 컨테이너 최대 너비 옵션
 */
export type MaxWidthOption = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// ============================================================================
// Section Template Types
// ============================================================================

/**
 * Section Template - Layout section definition
 * 템플릿 내 섹션 정의
 *
 * @example
 * ```typescript
 * const headerSection: SectionTemplate = {
 *   id: 'header',
 *   name: 'Header',
 *   required: true,
 *   allowedComponents: ['Logo', 'Navigation'],
 *   defaultComponent: 'Logo'
 * };
 * ```
 */
export interface SectionTemplate {
  /** 섹션 ID (예: 'header', 'main', 'footer') */
  id: string;

  /** 섹션 이름 */
  name: string;

  /** 필수 여부 - true면 반드시 포함되어야 함 */
  required: boolean;

  /** 허용 컴포넌트 타입 (optional) */
  allowedComponents?: string[];

  /** 기본 컴포넌트 (optional) */
  defaultComponent?: string;
}

// ============================================================================
// Responsive Layout Types
// ============================================================================

/**
 * Responsive Layout - Breakpoint-specific layout configuration
 * 반응형 레이아웃 설정 (Desktop, Tablet, Mobile)
 *
 * [TAG-UI002-005] - 항상 반응형 breakpoint 지원
 */
export interface ResponsiveLayout {
  /** 패딩 토큰 (예: 'atomic.spacing.64') */
  padding?: TokenReference;

  /** 간격 토큰 (예: 'atomic.spacing.32') */
  gap?: TokenReference;

  /** 그리드 컬럼 수 */
  columns?: number;

  /** 레이아웃 방향 */
  direction?: 'row' | 'column';
}

/**
 * Template Layout - Complete layout configuration
 * 템플릿 레이아웃 전체 설정
 *
 * [TAG-UI002-002] - 항상 Tekton 레이아웃 토큰 사용
 * [TAG-UI002-005] - 반응형 breakpoint 지원
 */
export interface TemplateLayout {
  /** 레이아웃 타입 */
  type: TemplateLayoutType;

  /** 최대 너비 (선택적) */
  maxWidth?: MaxWidthOption;

  /** 반응형 breakpoint별 레이아웃 */
  responsive: {
    /** Desktop (≥1024px) */
    desktop: ResponsiveLayout;

    /** Tablet (768px~1024px) */
    tablet: ResponsiveLayout;

    /** Mobile (<768px) */
    mobile: ResponsiveLayout;
  };
}

// ============================================================================
// AI Customization Types
// ============================================================================

/**
 * Customizable Configuration - AI modification boundaries
 * AI가 수정 가능한 영역 정의
 *
 * [TAG-UI002-003] - 항상 AI 커스터마이징 가능 영역 명시
 */
export interface CustomizableConfig {
  /** 수정 가능한 텍스트 키 배열 (예: ['title', 'subtitle', 'button_label']) */
  texts: string[];

  /** 선택적 기능 배열 (예: ['social_login', 'remember_me']) */
  optional: string[];

  /** 커스터마이징 가능한 슬롯 배열 (예: ['header', 'footer', 'sidebar']) */
  slots: string[];
}

// ============================================================================
// Screen Template Props
// ============================================================================

/**
 * ScreenTemplate Props - Component props interface
 * ScreenTemplate 컴포넌트가 받는 props
 */
export interface ScreenTemplateProps {
  /** 슬롯 컨텐츠 (예: { header: <Logo />, footer: <Footer /> }) */
  slots?: Record<string, ReactNode>;

  /** 커스텀 클래스 */
  className?: string;

  /** 테마 오버라이드 (테마 ID) */
  theme?: string;

  /** 커스터마이징 가능한 텍스트 */
  texts?: Record<string, string>;
}

// ============================================================================
// Main ScreenTemplate Interface
// ============================================================================

/**
 * ScreenTemplate - AI-Native screen template definition
 * AI가 이해하고 수정 가능한 화면 템플릿 인터페이스
 *
 * [TAG-UI002-001] - 항상 ScreenTemplate 인터페이스 준수
 *
 * @example
 * ```typescript
 * const loginTemplate: ScreenTemplate = {
 *   id: 'auth.login',
 *   name: 'Login',
 *   category: 'auth',
 *   description: 'User login screen with email/password authentication',
 *   skeleton: {
 *     shell: 'shell.web.app',
 *     page: 'page.auth',
 *     sections: [
 *       { id: 'logo', name: 'Logo', required: true },
 *       { id: 'form', name: 'Login Form', required: true },
 *       { id: 'footer', name: 'Footer Links', required: false }
 *     ]
 *   },
 *   customizable: {
 *     texts: ['title', 'subtitle', 'button_label'],
 *     optional: ['social_login', 'remember_me'],
 *     slots: ['header', 'footer']
 *   },
 *   requiredComponents: ['Button', 'Input', 'Form', 'Card', 'Label'],
 *   layout: {
 *     type: 'centered',
 *     maxWidth: 'sm',
 *     responsive: {
 *       desktop: { padding: 'atomic.spacing.64', gap: 'atomic.spacing.32' },
 *       tablet: { padding: 'atomic.spacing.32', gap: 'atomic.spacing.24' },
 *       mobile: { padding: 'atomic.spacing.16', gap: 'atomic.spacing.16' }
 *     }
 *   },
 *   Component: LoginComponent
 * };
 * ```
 */
export interface ScreenTemplate {
  /** 템플릿 고유 ID (예: 'auth.login', 'dashboard.overview') */
  id: string;

  /** 템플릿 이름 */
  name: string;

  /** 카테고리 */
  category: ScreenCategory;

  /** 설명 - AI에게 제공되는 컨텍스트 */
  description: string;

  /** 골격 - AI가 수정 가능한 범위 명시 */
  skeleton: {
    /** 쉘 타입 (전체 페이지 레이아웃) */
    shell: 'shell.web.app' | 'shell.web.landing' | 'shell.mobile';

    /** 페이지 레이아웃 타입 */
    page: 'page.auth' | 'page.dashboard' | 'page.content' | 'page.form';

    /** 섹션 템플릿 배열 */
    sections: SectionTemplate[];
  };

  /** AI 커스터마이징 가능 영역 [TAG-UI002-003] */
  customizable: CustomizableConfig;

  /** 필수 컴포넌트 [TAG-UI002-004] */
  requiredComponents: string[];

  /** 레이아웃 설정 [TAG-UI002-002, TAG-UI002-005] */
  layout: TemplateLayout;

  /** 토큰 바인딩 (선택적) */
  tokenBindings?: Record<string, TokenReference>;

  /** React 컴포넌트 */
  Component: ComponentType<ScreenTemplateProps>;
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Template Validation Error - Template validation error details
 * 템플릿 검증 오류 상세 정보
 */
export interface TemplateValidationError {
  /** 오류 타입 */
  type: 'missing_component' | 'invalid_layout' | 'invalid_token' | 'missing_section';

  /** 오류 메시지 */
  message: string;

  /** 관련 필드 (선택적) */
  field?: string;
}

/**
 * Template Validation Result - Template validation result
 * 템플릿 검증 결과
 *
 * [TAG-UI002-004] - 필수 컴포넌트 검증
 */
export interface TemplateValidationResult {
  /** 검증 성공 여부 */
  valid: boolean;

  /** 오류 목록 (검증 실패 시) */
  errors?: TemplateValidationError[];
}
