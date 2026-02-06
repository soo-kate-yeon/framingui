import fs from 'fs';
import path from 'path';

export type LegalSlug = 'terms-of-service' | 'privacy-policy' | 'refund-policy';
export type LegalLocale = 'en' | 'ko';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface LegalDocument {
  slug: LegalSlug;
  title: { en: string; ko: string };
  content: { en: string; ko: string };
  toc: { en: TocItem[]; ko: TocItem[] };
}

const LEGAL_DOCS_DIR = path.join(process.cwd(), '../../docs/legal');

const LEGAL_META: Record<LegalSlug, { en: string; ko: string }> = {
  'terms-of-service': { en: 'Terms of Service', ko: '이용약관' },
  'privacy-policy': { en: 'Privacy Policy', ko: '개인정보처리방침' },
  'refund-policy': { en: 'Refund Policy', ko: '환불정책' },
};

export const LEGAL_SLUGS: LegalSlug[] = [
  'terms-of-service',
  'privacy-policy',
  'refund-policy',
];

/**
 * 마크다운에서 ## 레벨 헤딩을 추출하여 TOC 생성
 */
function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match && match[1] && match[2]) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      toc.push({ id, title, level });
    }
  }

  return toc;
}

/**
 * 특정 slug의 법적 문서를 en/ko 모두 읽어 반환
 */
export function getLegalDocument(slug: LegalSlug): LegalDocument {
  const enPath = path.join(LEGAL_DOCS_DIR, 'en', `${slug}.md`);
  const koPath = path.join(LEGAL_DOCS_DIR, 'ko', `${slug}.md`);

  const enContent = fs.readFileSync(enPath, 'utf-8');
  const koContent = fs.readFileSync(koPath, 'utf-8');

  return {
    slug,
    title: LEGAL_META[slug],
    content: { en: enContent, ko: koContent },
    toc: { en: extractToc(enContent), ko: extractToc(koContent) },
  };
}

/**
 * 모든 법적 문서의 slug 목록 반환 (generateStaticParams용)
 */
export function getAllLegalSlugs(): LegalSlug[] {
  return LEGAL_SLUGS;
}
