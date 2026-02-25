import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'tekton/ui - Agent-First Design System',
    template: '%s | tekton/ui',
  },
  description:
    'The first design system AI agents can actually understand. 0% hallucination, production-ready UI with structured tokens.',
  metadataBase: new URL('https://tekton-ui.com'),
  openGraph: {
    title: 'tekton/ui - Agent-First Design System',
    description:
      'The first design system AI agents can actually understand. 0% hallucination by design.',
    url: 'https://tekton-ui.com',
    siteName: 'tekton/ui',
    type: 'website',
    images: [
      {
        url: 'https://tekton-ui.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'tekton/ui - Agent-First Design System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tekton/ui - Agent-First Design System',
    description: 'The first design system AI agents can actually understand.',
    images: ['https://tekton-ui.com/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

// JSON-LD Structured Data for Search Results
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'tekton/ui',
  description: 'Agent-First Design System. 0% hallucination, production-ready UI.',
  url: 'https://tekton-ui.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://tekton-ui.com/docs?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  sameAs: ['https://github.com/soo-kate-yeon/tekton'],
};

const siteNavigation = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: 'Main Navigation',
  hasPart: [
    {
      '@type': 'WebPage',
      name: 'Pricing',
      url: 'https://tekton-ui.com/pricing',
    },
    {
      '@type': 'WebPage',
      name: 'See Demo',
      url: 'https://tekton-ui.com/studio',
    },
    {
      '@type': 'WebPage',
      name: 'Templates Gallery',
      url: 'https://tekton-ui.com/studio',
    },
    {
      '@type': 'WebPage',
      name: 'Documentation',
      url: 'https://tekton-ui.com/docs',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigation) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
