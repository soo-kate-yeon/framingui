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
  title: 'Select Theme | tekton/studio',
  description: 'Choose a design system theme to start building.',
};

interface ExplorePageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const selectionMode = params.plan === 'double' ? ('double' as const) : undefined;

  // Load themes using Server Action for safe filesystem access
  const galleryItems = await loadThemes();

  return (
    <>
      {galleryItems && galleryItems.length > 0 ? (
        <TemplateGallery templates={galleryItems} selectionMode={selectionMode} />
      ) : (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-16">
          {/* empty state에서만 StudioPageHeader 직접 렌더링 */}
          <StudioPageHeader selectionMode={selectionMode} />
          <div className="text-center py-24">
            <p className="text-lg font-medium text-neutral-600 mb-4">
              No themes found or error loading themes
            </p>
            <p className="text-sm text-neutral-400">
              Check browser console and server terminal for errors
            </p>
          </div>
        </div>
      )}
    </>
  );
}
