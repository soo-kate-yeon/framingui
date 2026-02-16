import { notFound } from 'next/navigation';
import { getLegalDocument, getAllLegalSlugs, type LegalSlug } from '../../../lib/legal';
import { LegalPageLayout } from '../../../components/legal/LegalPageLayout';
import { getLegalPageMeta } from '../../../data/i18n/legal';

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

  const metaEn = getLegalPageMeta(slug as LegalSlug, 'en');

  return {
    title: `${metaEn.title} | Tekton`,
    description: metaEn.description,
    alternates: {
      languages: {
        en: `/legal/${slug}?lang=en`,
        ko: `/legal/${slug}?lang=ko`,
      },
    },
    openGraph: {
      title: `${metaEn.title} | Tekton`,
      description: metaEn.description,
      locale: 'en_US',
      alternateLocale: 'ko_KR',
    },
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
