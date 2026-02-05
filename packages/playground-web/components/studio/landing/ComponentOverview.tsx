/**
 * ComponentOverview Component
 * SPEC-STUDIO-001: TAG-STUDIO-001-U004 (Responsive Design)
 *
 * Responsive grid layout for component previews
 */

'use client';

import { clsx } from 'clsx';

export interface Component {
  id: string;
  name: string;
  category: 'core' | 'auth' | 'user' | 'admin';
}

export interface ComponentOverviewProps {
  /** List of components to display */
  components: Component[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * ComponentOverview - Responsive grid layout for component previews
 * [TAG-STUDIO-001-U004] Responsive: Mobile (1 col), Tablet (2 cols), Desktop (3 cols)
 */
export function ComponentOverview({ components, className }: ComponentOverviewProps) {
  if (components.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className="text-neutral-500">No components available</p>
      </div>
    );
  }

  return (
    <div className={clsx('py-8', className)}>
      {/* Responsive Grid [TAG-STUDIO-001-U004] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <div
            key={component.id}
            data-testid="component-card"
            data-component-id={component.id}
            className="group relative p-6 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
          >
            {/* Component Preview Placeholder */}
            <div className="aspect-video bg-neutral-100 rounded mb-4 flex items-center justify-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                Preview
              </span>
            </div>

            {/* Component Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900">{component.name}</h3>
              <span className="inline-block px-2 py-1 text-xs uppercase tracking-wider text-neutral-600 bg-neutral-100 rounded">
                {component.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
