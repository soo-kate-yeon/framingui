/**
 * @framingui/core - Template Registry
 * Singleton pattern for managing screen templates
 * [SPEC-UI-002] [TAG-UI002-004]
 */

import type {
  ScreenTemplate,
  ScreenCategory,
  TemplateValidationResult,
  TemplateValidationError,
} from './types.js';

/**
 * TemplateRegistry - Singleton registry for screen templates
 * 화면 템플릿을 관리하는 싱글톤 레지스트리
 *
 * @example
 * ```typescript
 * const registry = TemplateRegistry.getInstance();
 * registry.register(loginTemplate);
 *
 * const template = registry.get('auth.login');
 * const authTemplates = registry.getByCategory('auth');
 * ```
 */
export class TemplateRegistry {
  private static instance: TemplateRegistry;
  private templates: Map<string, ScreenTemplate> = new Map();

  /**
   * Private constructor to enforce singleton pattern
   * 싱글톤 패턴을 위한 private 생성자
   */
  private constructor() {}

  /**
   * Get singleton instance
   * 싱글톤 인스턴스 반환
   *
   * @returns TemplateRegistry instance
   */
  static getInstance(): TemplateRegistry {
    if (!TemplateRegistry.instance) {
      TemplateRegistry.instance = new TemplateRegistry();
    }
    return TemplateRegistry.instance;
  }

  /**
   * Register a screen template
   * 화면 템플릿 등록
   *
   * [TAG-UI002-004] - 필수 컴포넌트 검증
   * [TAG-UI002-007] - 템플릿 로드 시 필수 컴포넌트 검증
   *
   * @param template - ScreenTemplate to register
   * @throws Error if template validation fails
   *
   * @example
   * ```typescript
   * registry.register(loginTemplate);
   * ```
   */
  register(template: ScreenTemplate): void {
    // Validate template before registration
    const validationResult = this.validateTemplate(template);
    if (!validationResult.valid) {
      const errors = validationResult.errors?.map(e => e.message).join(', ');
      throw new Error(`Template validation failed for ${template.id}: ${errors}`);
    }

    this.templates.set(template.id, template);
  }

  /**
   * Register multiple templates at once
   * 여러 템플릿을 한 번에 등록
   *
   * @param templates - Array of ScreenTemplates to register
   * @throws Error if any template validation fails
   */
  registerAll(templates: ScreenTemplate[]): void {
    templates.forEach(template => this.register(template));
  }

  /**
   * Get a template by ID
   * ID로 템플릿 조회
   *
   * @param id - Template ID (e.g., 'auth.login')
   * @returns ScreenTemplate if found, undefined otherwise
   *
   * @example
   * ```typescript
   * const loginTemplate = registry.get('auth.login');
   * ```
   */
  get(id: string): ScreenTemplate | undefined {
    return this.templates.get(id);
  }

  /**
   * Get templates by category
   * 카테고리별 템플릿 조회
   *
   * @param category - ScreenCategory
   * @returns Array of templates in the category
   *
   * @example
   * ```typescript
   * const authTemplates = registry.getByCategory('auth');
   * ```
   */
  getByCategory(category: ScreenCategory): ScreenTemplate[] {
    return Array.from(this.templates.values()).filter(template => template.category === category);
  }

  /**
   * Get all registered templates
   * 등록된 모든 템플릿 조회
   *
   * @returns Array of all templates
   */
  getAll(): ScreenTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Find templates by required components
   * 필수 컴포넌트로 템플릿 검색
   *
   * @param components - Array of required component names
   * @returns Array of templates that require all specified components
   *
   * @example
   * ```typescript
   * const templatesNeedingButton = registry.findByRequiredComponents(['Button', 'Form']);
   * ```
   */
  findByRequiredComponents(components: string[]): ScreenTemplate[] {
    return Array.from(this.templates.values()).filter(template =>
      components.every(comp => template.requiredComponents.includes(comp))
    );
  }

  /**
   * Check if a template is registered
   * 템플릿 등록 여부 확인
   *
   * @param id - Template ID
   * @returns true if template is registered, false otherwise
   */
  has(id: string): boolean {
    return this.templates.has(id);
  }

  /**
   * Unregister a template
   * 템플릿 등록 해제
   *
   * @param id - Template ID to unregister
   * @returns true if template was found and removed, false otherwise
   */
  unregister(id: string): boolean {
    return this.templates.delete(id);
  }

  /**
   * Clear all registered templates
   * 모든 등록된 템플릿 삭제
   */
  clear(): void {
    this.templates.clear();
  }

  /**
   * Get total number of registered templates
   * 등록된 템플릿 총 개수 조회
   *
   * @returns Number of registered templates
   */
  count(): number {
    return this.templates.size;
  }

  /**
   * Validate a template
   * 템플릿 검증
   *
   * [TAG-UI002-004] - 필수 컴포넌트 검증
   * [TAG-UI002-019] - 필수 컴포넌트 없이 렌더링 금지
   *
   * @param template - ScreenTemplate to validate
   * @returns TemplateValidationResult
   */
  validateTemplate(template: ScreenTemplate): TemplateValidationResult {
    const errors: TemplateValidationError[] = [];

    // Validate required components
    if (!template.requiredComponents || template.requiredComponents.length === 0) {
      errors.push({
        type: 'missing_component',
        message: 'Template must specify at least one required component',
        field: 'requiredComponents',
      });
    }

    // Validate skeleton sections
    if (!template.skeleton.sections || template.skeleton.sections.length === 0) {
      errors.push({
        type: 'missing_section',
        message: 'Template must have at least one section',
        field: 'skeleton.sections',
      });
    }

    // Validate required sections
    const requiredSections = template.skeleton.sections.filter(s => s.required);
    if (requiredSections.length === 0) {
      errors.push({
        type: 'missing_section',
        message: 'Template must have at least one required section',
        field: 'skeleton.sections',
      });
    }

    // Validate layout responsive configuration
    if (!template.layout.responsive) {
      errors.push({
        type: 'invalid_layout',
        message: 'Template must have responsive layout configuration',
        field: 'layout.responsive',
      });
    } else {
      // Validate all breakpoints are present
      const { desktop, tablet, mobile } = template.layout.responsive;
      if (!desktop || !tablet || !mobile) {
        errors.push({
          type: 'invalid_layout',
          message: 'Template must have desktop, tablet, and mobile responsive layouts',
          field: 'layout.responsive',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Get template IDs by category
   * 카테고리별 템플릿 ID 목록 조회
   *
   * @param category - ScreenCategory
   * @returns Array of template IDs
   */
  getIdsByCategory(category: ScreenCategory): string[] {
    return this.getByCategory(category).map(t => t.id);
  }

  /**
   * Export all templates as JSON
   * 모든 템플릿을 JSON으로 내보내기
   *
   * Note: This does not export the Component field
   *
   * @returns JSON string of all templates (without Component field)
   */
  exportToJSON(): string {
    const exportData = this.getAll().map(template => {
      const { Component: _Component, ...rest } = template;
      return rest;
    });
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Get template metadata (without Component)
   * 템플릿 메타데이터 조회 (Component 제외)
   *
   * @param id - Template ID
   * @returns Template metadata without Component field
   */
  getMetadata(id: string): Omit<ScreenTemplate, 'Component'> | undefined {
    const template = this.get(id);
    if (!template) {
      return undefined;
    }

    const { Component: _Component, ...metadata } = template;
    return metadata;
  }
}

/**
 * Get default registry instance
 * 기본 레지스트리 인스턴스 반환
 *
 * @returns TemplateRegistry singleton instance
 */
export function getRegistry(): TemplateRegistry {
  return TemplateRegistry.getInstance();
}
