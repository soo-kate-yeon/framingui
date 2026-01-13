import {
  Environment,
  SkeletonPreset,
  ScreenIntent,
  INTENT_TO_COMPOUND_PATTERNS,
} from '@tekton/contracts';

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Auto-fix suggestion
 */
export interface AutoFixSuggestion {
  field: string;
  currentValue: any;
  suggestedValue: any;
  reason: string;
}

/**
 * Contract validation options
 */
export interface ContractValidationOptions {
  strict?: boolean;
  autoFix?: boolean;
  applyFixes?: boolean;
}

/**
 * Contract validation result
 */
export interface ContractValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  autoFixSuggestions?: AutoFixSuggestion[];
  fixed?: any;
}

/**
 * Screen contract interface
 */
export interface ScreenContract {
  name: string;
  environment: string;
  skeleton: string;
  intent: string;
  components: string[];
}

/**
 * Validate screen name format
 */
function validateScreenName(name: string): ValidationError | null {
  if (!name || name.trim().length === 0) {
    return {
      field: 'name',
      message: 'Screen name is required',
      code: 'NAME_REQUIRED',
    };
  }

  if (name.includes(' ')) {
    return {
      field: 'name',
      message: 'Screen name cannot contain spaces. Use PascalCase format (e.g., UserProfile)',
      code: 'NAME_INVALID_FORMAT',
    };
  }

  if (!/^[A-Z]/.test(name)) {
    return {
      field: 'name',
      message: 'Screen name must start with uppercase letter (PascalCase)',
      code: 'NAME_INVALID_CASE',
    };
  }

  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    return {
      field: 'name',
      message: 'Screen name must be PascalCase (letters and numbers only)',
      code: 'NAME_INVALID_PATTERN',
    };
  }

  return null;
}

/**
 * Validate environment value
 */
function validateEnvironment(environment: string): ValidationError | null {
  const validEnvironments = Object.values(Environment);

  if (!validEnvironments.includes(environment as any)) {
    return {
      field: 'environment',
      message: `Invalid environment "${environment}". Must be one of: ${validEnvironments.join(', ')}`,
      code: 'ENVIRONMENT_INVALID',
    };
  }

  return null;
}

/**
 * Validate skeleton value
 */
function validateSkeleton(skeleton: string): ValidationError | null {
  const validSkeletons = Object.values(SkeletonPreset);

  if (!validSkeletons.includes(skeleton as any)) {
    return {
      field: 'skeleton',
      message: `Invalid skeleton "${skeleton}". Must be one of: ${validSkeletons.join(', ')}`,
      code: 'SKELETON_INVALID',
    };
  }

  return null;
}

/**
 * Validate intent value
 */
function validateIntent(intent: string): ValidationError | null {
  const validIntents = Object.values(ScreenIntent);

  if (!validIntents.includes(intent as any)) {
    return {
      field: 'intent',
      message: `Invalid intent "${intent}". Must be one of: ${validIntents.join(', ')}`,
      code: 'INTENT_INVALID',
    };
  }

  return null;
}

/**
 * Generate auto-fix suggestions
 */
function generateAutoFixSuggestions(
  contract: ScreenContract,
  errors: ValidationError[]
): AutoFixSuggestion[] {
  const suggestions: AutoFixSuggestion[] = [];

  // Fix PascalCase name
  const nameError = errors.find((e) => e.field === 'name' && e.code === 'NAME_INVALID_CASE');
  if (nameError && contract.name) {
    const fixedName = contract.name.charAt(0).toUpperCase() + contract.name.slice(1);
    suggestions.push({
      field: 'name',
      currentValue: contract.name,
      suggestedValue: fixedName,
      reason: 'Convert to PascalCase',
    });
  }

  // Suggest components based on intent
  if (contract.components.length === 0 && contract.intent) {
    const intentMapping =
      INTENT_TO_COMPOUND_PATTERNS[contract.intent as keyof typeof INTENT_TO_COMPOUND_PATTERNS];
    if (intentMapping) {
      suggestions.push({
        field: 'components',
        currentValue: [],
        suggestedValue: intentMapping.primaryComponents,
        reason: `Suggested components for "${contract.intent}" intent`,
      });
    }
  }

  return suggestions;
}

/**
 * Apply auto-fix suggestions
 */
function applyAutoFixes(
  contract: ScreenContract,
  suggestions: AutoFixSuggestion[]
): ScreenContract {
  const fixed = { ...contract };

  for (const suggestion of suggestions) {
    if (suggestion.field === 'name') {
      fixed.name = suggestion.suggestedValue;
    } else if (suggestion.field === 'components') {
      fixed.components = suggestion.suggestedValue;
    }
  }

  return fixed;
}

/**
 * Validate screen contract
 */
export async function validateScreenContract(
  contract: ScreenContract,
  options: ContractValidationOptions = {}
): Promise<ContractValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Validate name
  const nameError = validateScreenName(contract.name);
  if (nameError) {
    errors.push(nameError);
  }

  // Validate environment
  const envError = validateEnvironment(contract.environment);
  if (envError) {
    errors.push(envError);
  }

  // Validate skeleton
  const skelError = validateSkeleton(contract.skeleton);
  if (skelError) {
    errors.push(skelError);
  }

  // Validate intent
  const intentError = validateIntent(contract.intent);
  if (intentError) {
    errors.push(intentError);
  }

  // Check for empty components (warning)
  if (contract.components.length === 0) {
    warnings.push({
      field: 'components',
      message: 'No components specified. Consider adding components based on screen intent.',
      code: 'COMPONENTS_EMPTY',
    });
  }

  // Generate auto-fix suggestions if requested
  let autoFixSuggestions: AutoFixSuggestion[] | undefined;
  let fixed: ScreenContract | undefined;

  if (options.autoFix) {
    autoFixSuggestions = generateAutoFixSuggestions(contract, errors);

    if (options.applyFixes && autoFixSuggestions.length > 0) {
      fixed = applyAutoFixes(contract, autoFixSuggestions);
    }
  }

  // In strict mode, warnings are treated as errors
  const allErrors = options.strict ? [...errors, ...warnings] : errors;

  return {
    valid: allErrors.length === 0,
    errors,
    warnings,
    autoFixSuggestions,
    fixed,
  };
}
