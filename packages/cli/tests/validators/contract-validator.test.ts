import { describe, it, expect } from 'vitest';
import {
  validateScreenContract,
  type ContractValidationOptions,
  type ContractValidationResult,
} from '../../src/validators/contract-validator.js';

describe('contract-validator', () => {
  describe('validateScreenContract', () => {
    it('should pass validation for valid contract', async () => {
      const contract = {
        name: 'UserProfile',
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-detail',
        components: ['Card', 'Button'],
      };

      const result = await validateScreenContract(contract);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid environment', async () => {
      const contract = {
        name: 'TestScreen',
        environment: 'invalid-env',
        skeleton: 'with-header',
        intent: 'data-detail',
        components: [],
      };

      const result = await validateScreenContract(contract);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].field).toBe('environment');
    });

    it('should detect invalid skeleton', async () => {
      const contract = {
        name: 'TestScreen',
        environment: 'web',
        skeleton: 'invalid-skeleton',
        intent: 'data-detail',
        components: [],
      };

      const result = await validateScreenContract(contract);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'skeleton')).toBe(true);
    });

    it('should detect invalid intent', async () => {
      const contract = {
        name: 'TestScreen',
        environment: 'web',
        skeleton: 'with-header',
        intent: 'invalid-intent',
        components: [],
      };

      const result = await validateScreenContract(contract);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'intent')).toBe(true);
    });

    it('should validate in < 1 second', async () => {
      const startTime = Date.now();

      const contract = {
        name: 'FastValidation',
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-list',
        components: ['Table'],
      };

      await validateScreenContract(contract);

      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Auto-fix suggestions', () => {
    it('should suggest auto-fix for common violations', async () => {
      const contract = {
        name: 'test', // lowercase, should be TestScreen
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-list',
        components: [],
      };

      const options: ContractValidationOptions = {
        autoFix: true,
      };

      const result = await validateScreenContract(contract, options);

      expect(result.autoFixSuggestions).toBeDefined();
      expect(result.autoFixSuggestions?.length).toBeGreaterThan(0);
    });

    it('should auto-fix PascalCase screen names', async () => {
      const contract = {
        name: 'userProfile', // should be UserProfile
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-detail',
        components: [],
      };

      const options: ContractValidationOptions = {
        autoFix: true,
        applyFixes: true,
      };

      const result = await validateScreenContract(contract, options);

      expect(result.fixed).toBeDefined();
      expect(result.fixed?.name).toBe('UserProfile');
    });

    it('should suggest component additions based on intent', async () => {
      const contract = {
        name: 'ProductList',
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-list',
        components: [], // Missing suggested components
      };

      const options: ContractValidationOptions = {
        autoFix: true,
      };

      const result = await validateScreenContract(contract, options);

      expect(result.autoFixSuggestions).toBeDefined();
      expect(result.autoFixSuggestions?.some((s) => s.field === 'components')).toBe(true);
    });
  });

  describe('Strict mode', () => {
    it('should fail validation on warnings in strict mode', async () => {
      const contract = {
        name: 'TestScreen',
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-list',
        components: [], // Warning: no components specified
      };

      const options: ContractValidationOptions = {
        strict: true,
      };

      const result = await validateScreenContract(contract, options);

      // In strict mode, warnings should be treated as errors
      expect(result.valid).toBe(false);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('should pass validation on warnings in non-strict mode', async () => {
      const contract = {
        name: 'TestScreen',
        environment: 'web',
        skeleton: 'with-header',
        intent: 'data-list',
        components: [], // Warning but not error
      };

      const options: ContractValidationOptions = {
        strict: false,
      };

      const result = await validateScreenContract(contract, options);

      expect(result.valid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('Clear error messages', () => {
    it('should provide actionable error messages', async () => {
      const contract = {
        name: 'test screen', // Space in name
        environment: 'desktop', // Invalid environment
        skeleton: 'with-header',
        intent: 'data-list',
        components: [],
      };

      const result = await validateScreenContract(contract);

      expect(result.errors.length).toBeGreaterThan(0);
      result.errors.forEach((error) => {
        expect(error.message).toBeDefined();
        expect(error.message.length).toBeGreaterThan(10);
        expect(error.field).toBeDefined();
      });
    });

    it('should include field location in error messages', async () => {
      const contract = {
        name: 'TestScreen',
        environment: 'invalid',
        skeleton: 'with-header',
        intent: 'data-list',
        components: [],
      };

      const result = await validateScreenContract(contract);

      const envError = result.errors.find((e) => e.field === 'environment');
      expect(envError).toBeDefined();
      expect(envError?.message).toContain('environment');
    });
  });

  describe('Multiple validation errors', () => {
    it('should report all validation errors at once', async () => {
      const contract = {
        name: 'test',
        environment: 'invalid',
        skeleton: 'invalid',
        intent: 'invalid',
        components: [],
      };

      const result = await validateScreenContract(contract);

      expect(result.errors.length).toBeGreaterThanOrEqual(4);
      expect(result.errors.some((e) => e.field === 'name')).toBe(true);
      expect(result.errors.some((e) => e.field === 'environment')).toBe(true);
      expect(result.errors.some((e) => e.field === 'skeleton')).toBe(true);
      expect(result.errors.some((e) => e.field === 'intent')).toBe(true);
    });
  });
});
