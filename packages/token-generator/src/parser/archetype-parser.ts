/**
 * Parser for archetype theme files
 * Loads and validates theme JSON files from the studio-mcp themes directory
 *
 * @module parser/archetype-parser
 */

import { readFile } from 'fs/promises';
import { ArchetypeThemeSchema } from './schema-validator.js';
import type { ArchetypeTheme } from '../types/archetype.types.js';
import type { z } from 'zod';

/**
 * Result type for parse operations
 */
export type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: z.ZodError | Error };

/**
 * Parse archetype theme object with validation
 *
 * @param themeData - Raw theme data object
 * @returns Parse result with validated theme or error
 */
export function parseArchetypeTheme(themeData: unknown): ParseResult<ArchetypeTheme> {
  const result = ArchetypeThemeSchema.safeParse(themeData);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

/**
 * Parse archetype theme from JSON file
 *
 * @param filePath - Absolute path to theme JSON file
 * @returns Parse result with validated theme or error
 */
export async function parseArchetypeFromFile(
  filePath: string
): Promise<ParseResult<ArchetypeTheme>> {
  try {
    const fileContent = await readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return parseArchetypeTheme(jsonData);
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error };
    }
    return { success: false, error: new Error('Unknown error parsing file') };
  }
}
