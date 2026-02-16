import { Metadata } from 'next';
import { LandingPageWrapper } from '../components/landing/LandingPageWrapper';

export const metadata: Metadata = {
  title: 'TEKTON - Design Intelligence for AI Agents',
  description:
    'TEKTON is the first design system AI agents can actually understand. Structured tokens and layout logic let agents generate professional, production-ready UI—directly in your codebase. No Figma. No guesswork.',
  keywords: [
    'design system',
    'AI agents',
    'design tokens',
    'OKLCH',
    'Tailwind CSS',
    'React',
    'Next.js',
    'MCP',
  ],
  authors: [{ name: 'TEKTON Team' }],
  openGraph: {
    title: 'TEKTON - Design Intelligence for AI Agents',
    description:
      'The first design system AI agents can actually understand. Generate production-ready UI directly in your codebase.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TEKTON',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEKTON - Design Intelligence for AI Agents',
    description: 'The first design system AI agents can actually understand.',
  },
};

export default function HomePage() {
  return <LandingPageWrapper />;
}
