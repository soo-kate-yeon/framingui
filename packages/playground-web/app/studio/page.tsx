/**
 * Explore Page (Studio Home)
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Function: Lists ACTUAL themes from .moai/themes/generated via @tekton-ui/core
 * Uses Server Action for safe filesystem access
 */

import { TemplateGallery } from '../../components/studio/TemplateGallery';
import { loadThemes } from './actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Select Theme | Tekton Studio',
  description: 'Choose a design system theme to start building.',
};

export default async function ExplorePage() {
  // Load themes using Server Action for safe filesystem access
  const galleryItems = await loadThemes();

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <span className="text-sm font-medium text-neutral-500 mb-4 block">
          Tekton Studio
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
          Select Theme
        </h1>
        <p className="text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
          Choose a design system to activate the Agentic Styling engine. Every theme is loaded
          directly from the MCP knowledge base.
        </p>
      </header>

      {/* Real Theme Gallery */}
      <div className="border-t border-neutral-200 pt-12">
        {galleryItems && galleryItems.length > 0 ? (
          <TemplateGallery templates={galleryItems} />
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">No themes found or error loading themes</p>
            <p className="text-xs text-neutral-400">
              Check browser console and server terminal for errors
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
