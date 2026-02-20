import { Metadata } from 'next';
import { LandingPageWrapper } from '../components/landing/LandingPageWrapper';

export const metadata: Metadata = {
  title: 'tekton/ui - Agent-first Design System',
  description:
    'tekton/ui is the first design system built specifically for AI agents. Structured tokens and layout logic let agents generate professional, production-ready UI—directly in your codebase.',
  keywords: [
    'design system',
    'AI agents',
    'Agent-first',
    'design tokens',
    'OKLCH',
    'Tailwind CSS',
    'React',
    'Next.js',
    'MCP',
  ],
  authors: [{ name: 'tekton/ui Team' }],
  openGraph: {
    title: 'tekton/ui - Agent-first Design System',
    description:
      'The first design system built specifically for AI agents. Generate production-ready UI directly in your codebase.',
    type: 'website',
    locale: 'en_US',
    siteName: 'tekton/ui',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tekton/ui - Agent-first Design System',
    description: 'The first design system built specifically for AI agents.',
  },
};

export default function HomePage() {
  return <LandingPageWrapper />;
}
