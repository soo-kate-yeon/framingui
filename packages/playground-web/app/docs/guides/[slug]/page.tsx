import { notFound } from 'next/navigation';
import { getDocsGuide, getAllGuideSlugs } from '@/lib/docs';
import type { Metadata } from 'next';
import { DocsGuidePage } from '@/components/docs/DocsGuidePage';

interface DocsGuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocsGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDocsGuide(slug);

  if (!guide) {
    return {};
  }

  const { frontmatter } = guide;
  const url = `https://framingui.com/docs/guides/${slug}`;

  return {
    title: `${frontmatter.title} | FramingUI Docs`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function GuideSlugPage({ params }: DocsGuidePageProps) {
  const { slug } = await params;
  const guide = getDocsGuide(slug);

  if (!guide) {
    notFound();
  }

  return <DocsGuidePage guide={guide} />;
}
