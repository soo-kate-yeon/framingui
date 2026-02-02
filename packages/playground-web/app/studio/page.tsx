/**
 * Explore Page (Studio Home)
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Theme: Square Minimalism
 * Function: Lists ACTUAL themes from .moai/themes/generated via @tekton/core
 */

import { listThemes } from '@tekton/core';
import { TemplateGallery } from '../../components/studio/TemplateGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Select Theme | Tekton Studio',
  description: 'Choose a design system theme to start building.',
};

interface GalleryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
}

export default function ExplorePage() {
  // Fetch real themes from the connected MCP core (FileSystem)
  let themes;
  let galleryItems: GalleryItem[];

  try {
    themes = listThemes();

    // Map themes to TemplateGallery format
    galleryItems = themes.map(theme => ({
      id: theme.id,
      name: theme.name,
      description: theme.description || `A ${theme.brandTone || 'Modern'} design system.`,
      category: 'Design System',
      thumbnail: undefined
    }));
  } catch (error) {
    console.error('[Studio Page] Error loading themes:', error);
    galleryItems = [];
  }

  return (
    <div className="p-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="mb-24">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-4 block">
          Tekton Studio
        </span>
        <h1 className="text-6xl font-bold tracking-tighter text-neutral-900 mb-6">
          SELECT THEME
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
          Choose a design system to activate the Agentic Styling engine.
          Every theme is loaded directly from the MCP knowledge base.
        </p>
      </header>

      {/* Real Theme Gallery */}
      <div className="border-t border-neutral-200 pt-12">
        {galleryItems && galleryItems.length > 0 ? (
          <TemplateGallery templates={galleryItems} />
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">No themes found or error loading themes</p>
            <p className="text-xs text-neutral-400">Check browser console and server terminal for errors</p>
          </div>
        )}
      </div>
    </div>
  );
}
