/**
 * Recipe Resolver Module
 * SPEC-MCP-004 Phase 3.5: Extract theme recipes for component styling
 *
 * Resolves and flattens theme recipe definitions into a usable format
 * for screen generation and component styling.
 */

import { loadTheme } from '@tekton/core';

/**
 * Flatten nested recipe object into dot-notation paths
 * Converts { card: { glass: "className" } } to { "recipes.card.glass": "className" }
 *
 * @param obj - Nested recipe object
 * @param prefix - Path prefix for recursion
 * @returns Flattened recipe map with dot-notation paths
 */
function flattenRecipes(
  obj: Record<string, any>,
  prefix: string = 'recipes'
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const path = `${prefix}.${key}`;

    if (typeof value === 'string') {
      // Leaf node: className string
      result[path] = value;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Nested object: recurse
      const nested = flattenRecipes(value, path);
      Object.assign(result, nested);
    }
    // Skip non-object, non-string values (arrays, null, etc.)
  }

  return result;
}

/**
 * Get all recipes from a theme
 * Extracts and flattens recipe definitions for component styling
 *
 * @param themeId - Theme identifier (e.g., "square-minimalism", "blue-bottle-v2")
 * @returns Flattened recipe map with paths like "recipes.card.glass" -> className
 *
 * @example
 * const recipes = getAllRecipes("square-minimalism");
 * // Returns:
 * // {
 * //   "recipes.card.glass": "bg-white/80 backdrop-blur-xl ...",
 * //   "recipes.button.primary": "bg-neutral-900 text-white ...",
 * //   ...
 * // }
 */
export function getAllRecipes(themeId: string): Record<string, string> {
  try {
    // Load theme from .moai/themes/generated/
    const theme = loadTheme(themeId);

    if (!theme) {
      return {};
    }

    // Check if theme has recipes in tokens
    // Theme v2.1 structure: theme.tokens.recipes
    const recipes = (theme.tokens as any)?.recipes;

    if (!recipes || typeof recipes !== 'object') {
      return {};
    }

    // Flatten nested recipe structure
    return flattenRecipes(recipes);
  } catch (error) {
    // Theme loading failed or recipes not available
    console.warn(`Failed to load recipes for theme "${themeId}":`, error);
    return {};
  }
}

/**
 * Get recipes for a specific component type
 *
 * @param themeId - Theme identifier
 * @param componentType - Component type (e.g., "card", "button", "input")
 * @returns Map of variant names to classNames
 *
 * @example
 * const cardRecipes = getComponentRecipes("square-minimalism", "card");
 * // Returns: { glass: "bg-white/80 ...", outlined: "bg-transparent ...", ... }
 */
export function getComponentRecipes(
  themeId: string,
  componentType: string
): Record<string, string> {
  const allRecipes = getAllRecipes(themeId);
  const prefix = `recipes.${componentType}.`;
  const result: Record<string, string> = {};

  for (const [path, className] of Object.entries(allRecipes)) {
    if (path.startsWith(prefix)) {
      const variantName = path.slice(prefix.length);
      result[variantName] = className;
    }
  }

  return result;
}

/**
 * Get a specific recipe by full path
 *
 * @param themeId - Theme identifier
 * @param recipePath - Full recipe path (e.g., "recipes.card.glass" or "card.glass")
 * @returns ClassName string or undefined if not found
 *
 * @example
 * const className = getRecipe("square-minimalism", "card.glass");
 * // Returns: "bg-white/80 backdrop-blur-xl ..."
 */
export function getRecipe(themeId: string, recipePath: string): string | undefined {
  const allRecipes = getAllRecipes(themeId);

  // Normalize path: add "recipes." prefix if not present
  const normalizedPath = recipePath.startsWith('recipes.')
    ? recipePath
    : `recipes.${recipePath}`;

  return allRecipes[normalizedPath];
}

/**
 * Check if a theme has recipes defined
 *
 * @param themeId - Theme identifier
 * @returns True if theme has at least one recipe
 */
export function hasRecipes(themeId: string): boolean {
  const recipes = getAllRecipes(themeId);
  return Object.keys(recipes).length > 0;
}

/**
 * Get list of all component types that have recipes in a theme
 *
 * @param themeId - Theme identifier
 * @returns Array of component type names
 *
 * @example
 * const types = getRecipeComponentTypes("square-minimalism");
 * // Returns: ["card", "button", "input", "table", "badge", ...]
 */
export function getRecipeComponentTypes(themeId: string): string[] {
  const allRecipes = getAllRecipes(themeId);
  const types = new Set<string>();

  for (const path of Object.keys(allRecipes)) {
    // Extract component type from path: "recipes.card.glass" -> "card"
    const parts = path.replace('recipes.', '').split('.');
    if (parts.length >= 1 && parts[0]) {
      types.add(parts[0]);
    }
  }

  return Array.from(types).sort();
}
