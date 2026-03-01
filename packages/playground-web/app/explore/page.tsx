/**
 * Explore Page (Explore Home)
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * Function: Lists ACTUAL themes from .moai/themes/generated via @framingui/core
 * Uses Server Action for safe filesystem access
 */

import { TemplateGallery } from '../../components/explore/TemplateGallery';
import { FeedbackFloatingButton } from '../../components/explore/FeedbackFloatingButton';
import { ExplorePageClient } from '../../components/explore/ExplorePageClient';
import { loadThemes } from './actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Select Theme',
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
    <ExplorePageClient>
      {galleryItems && galleryItems.length > 0 ? (
        <TemplateGallery templates={galleryItems} selectionMode={selectionMode} />
      ) : (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-16">
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
      <FeedbackFloatingButton />
    </ExplorePageClient>
  );
}
