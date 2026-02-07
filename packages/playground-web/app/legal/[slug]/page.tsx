import { notFound } from 'next/navigation';
import { getLegalDocument, getAllLegalSlugs, type LegalSlug } from '../../../lib/legal';
import { LegalPageLayout } from '../../../components/legal/LegalPageLayout';

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

const VALID_SLUGS = new Set<string>(getAllLegalSlugs());

export function generateStaticParams() {
  return getAllLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegalPageProps) {
  const { slug } = await params;
  if (!VALID_SLUGS.has(slug)) {
    return {};
  }

  const doc = getLegalDocument(slug as LegalSlug);
  return {
    title: `${doc.title.en} | Tekton`,
    description: `${doc.title.en} - Tekton by Morak`,
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;

  if (!VALID_SLUGS.has(slug)) {
    notFound();
  }

  const doc = getLegalDocument(slug as LegalSlug);

  return <LegalPageLayout title={doc.title} content={doc.content} toc={doc.toc} />;
}
