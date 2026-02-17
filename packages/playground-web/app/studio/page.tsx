/**
 * Explore Page (Studio Home)
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Function: Lists ACTUAL themes from .moai/themes/generated via @tekton-ui/core
 * Uses Server Action for safe filesystem access
 */

import { TemplateGallery } from '../../components/studio/TemplateGallery';
import { StudioPageHeader } from '../../components/studio/StudioPageHeader';
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
      {/* Header with i18n support */}
      <StudioPageHeader />

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
