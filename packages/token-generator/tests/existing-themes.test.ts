import { describe, it, expect } from 'vitest';
import { parseArchetypeFromFile } from '../src/parser/archetype-parser.js';
import { readdir } from 'fs/promises';
import { join } from 'path';

const THEMES_DIR = '/Users/asleep/Developer/tekton/packages/studio-mcp/src/theme/themes';

describe('Existing Themes Validation', () => {
  it('should successfully parse all 13 existing theme files', async () => {
    // Get all JSON files from themes directory
    const files = await readdir(THEMES_DIR);
    const themeFiles = files.filter(f => f.endsWith('.json'));

    // Ensure we have at least 13 themes
    expect(themeFiles.length).toBeGreaterThanOrEqual(13);

    // Track results
    const results = [];

    // Parse each theme file
    for (const file of themeFiles) {
      const filePath = join(THEMES_DIR, file);
      const result = await parseArchetypeFromFile(filePath);

      results.push({
        file,
        success: result.success,
        error: result.success ? null : result.error,
      });

      // Log failure details
      if (!result.success) {
        console.error(`Failed to parse ${file}:`, result.error);
      }
    }

    // All should succeed
    const failures = results.filter(r => !r.success);
    expect(failures).toHaveLength(0);

    // Log success summary
    console.log(`Successfully parsed ${results.length} themes:`);
    results.forEach(r => {
      if (r.success) {
        console.log(`  ✓ ${r.file}`);
      }
    });
  });

  it('should parse premium-editorial.json with correct structure', async () => {
    const filePath = join(THEMES_DIR, 'premium-editorial.json');
    const result = await parseArchetypeFromFile(filePath);

    expect(result.success).toBe(true);
    if (result.success) {
      const theme = result.data;
      expect(theme.id).toBe('premium-editorial');
      expect(theme.name).toBe('Premium Editorial');
      expect(theme.colorPalette.primary.l).toBe(0.20);
      expect(theme.colorPalette.primary.c).toBe(0.00);
      expect(theme.colorPalette.primary.h).toBe(0);
    }
  });

  it('should parse calm-wellness.json with correct structure', async () => {
    const filePath = join(THEMES_DIR, 'calm-wellness.json');
    const result = await parseArchetypeFromFile(filePath);

    expect(result.success).toBe(true);
    if (result.success) {
      const theme = result.data;
      expect(theme.id).toBe('calm-wellness');
      expect(theme.colorPalette).toBeDefined();
      expect(theme.colorPalette.primary).toBeDefined();
      expect(theme.colorPalette.secondary).toBeDefined();
      expect(theme.colorPalette.accent).toBeDefined();
      expect(theme.colorPalette.neutral).toBeDefined();
    }
  });

  it('should parse korean-fintech.json with correct structure', async () => {
    const filePath = join(THEMES_DIR, 'korean-fintech.json');
    const result = await parseArchetypeFromFile(filePath);

    expect(result.success).toBe(true);
    if (result.success) {
      const theme = result.data;
      expect(theme.id).toBe('korean-fintech');
      expect(theme.stackInfo.framework).toMatch(/nextjs|vite|remix/);
      expect(theme.stackInfo.styling).toBe('tailwindcss');
      expect(theme.stackInfo.components).toBe('shadcn-ui');
    }
  });

  it('should extract valid OKLCH colors from all themes', async () => {
    const files = await readdir(THEMES_DIR);
    const themeFiles = files.filter(f => f.endsWith('.json'));

    for (const file of themeFiles) {
      const filePath = join(THEMES_DIR, file);
      const result = await parseArchetypeFromFile(filePath);

      expect(result.success).toBe(true);
      if (result.success) {
        const theme = result.data;

        // Validate all color palette entries
        for (const [key, color] of Object.entries(theme.colorPalette)) {
          expect(color.l).toBeGreaterThanOrEqual(0);
          expect(color.l).toBeLessThanOrEqual(1);
          expect(color.c).toBeGreaterThanOrEqual(0);
          expect(color.h).toBeGreaterThanOrEqual(0);
          expect(color.h).toBeLessThanOrEqual(360);
        }
      }
    }
  });
});
