import type { Metadata } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'tekton/ui - Agentic Styling Engine',
    template: '%s | tekton/ui',
  },
  description:
    'The first design system AI agents can actually understand. Structured tokens and layout logic for production-ready UI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
