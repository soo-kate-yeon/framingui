'use server';

/**
 * Server Actions for Studio Page
 * Provides safe filesystem access for theme loading
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { getTemplateData } from '../../data/templates';

interface GalleryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  price?: number;
}

interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  brandTone?: string;
  schemaVersion?: string;
}

/**
 * Load themes using Server Action
 * This runs in an isolated server context with proper filesystem access
 * Reads theme files directly to avoid process.cwd() issues
 */
export async function loadThemes(): Promise<GalleryItem[]> {
  try {
    // Calculate absolute path to project root
    const projectRoot = process.cwd();
    const actualRoot = projectRoot.includes('packages/playground-web')
      ? projectRoot.replace('/packages/playground-web', '')
      : projectRoot;

    const themesDir = join(actualRoot, '.moai', 'themes', 'generated');

    console.log('[Server Action] Process CWD:', projectRoot);
    console.log('[Server Action] Project root:', actualRoot);
    console.log('[Server Action] Themes dir:', themesDir);

    // Check if themes directory exists
    if (!existsSync(themesDir)) {
      console.warn('[Server Action] Themes directory not found:', themesDir);
      return [];
    }

    // Read theme files directly
    const files = readdirSync(themesDir).filter((f) => f.endsWith('.json'));
    console.log('[Server Action] Found theme files:', files.length);

    const galleryItems: GalleryItem[] = [];

    for (const file of files) {
      try {
        const themePath = join(themesDir, file);
        const themeContent = readFileSync(themePath, 'utf-8');
        const theme = JSON.parse(themeContent) as ThemeMeta;

        const templateData = getTemplateData(theme.id);

        galleryItems.push({
          id: theme.id,
          name: theme.name,
          description: theme.description || 'A modern design system.',
          category: 'Design System',
          thumbnail: undefined,
          price: templateData?.price,
        });
      } catch (err) {
        console.error(`[Server Action] Error loading theme ${file}:`, err);
      }
    }

    console.log('[Server Action] Successfully loaded themes:', galleryItems.length);
    return galleryItems;
  } catch (error) {
    console.error('[Server Action] Error loading themes:', error);
    // Return empty array instead of throwing to prevent page crash
    return [];
  }
}
