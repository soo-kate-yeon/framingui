import { Metadata } from 'next';
import { LandingPageWrapper } from '../components/landing/LandingPageWrapper';

export const metadata: Metadata = {
  title: 'framingui - Agent-first Design System',
  description:
    'framingui is the first design system built specifically for AI agents. Structured tokens and layout logic let agents generate professional, production-ready UI—directly in your codebase.',
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
  authors: [{ name: 'framingui Team' }],
  openGraph: {
    title: 'framingui - Agent-first Design System',
    description:
      'The first design system built specifically for AI agents. Generate production-ready UI directly in your codebase.',
    url: 'https://framingui.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'framingui',
    images: [
      {
        url: '/og-image.png',
        width: 962,
        height: 422,
        alt: 'FramingUI - Agent-First Design System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'framingui - Agent-first Design System',
    description: 'The first design system built specifically for AI agents.',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  return <LandingPageWrapper />;
}
