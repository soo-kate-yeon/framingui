import fs from 'fs';
import path from 'path';

export type LegalSlug = 'terms-of-service' | 'privacy-policy' | 'refund-policy';
export type LegalLocale = 'en' | 'ko' | 'ja';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface LegalDocument {
  slug: LegalSlug;
  title: Record<LegalLocale, string>;
  content: Record<LegalLocale, string>;
  toc: Record<LegalLocale, TocItem[]>;
}

// packages/playground-web에서 모노레포 루트까지 올라간 후 docs/legal로 이동
const LEGAL_DOCS_DIR = path.join(process.cwd(), '..', '..', 'docs', 'legal');

const LEGAL_META: Record<LegalSlug, Record<LegalLocale, string>> = {
  'terms-of-service': { en: 'Terms of Service', ko: '이용약관', ja: '利用規約' },
  'privacy-policy': { en: 'Privacy Policy', ko: '개인정보처리방침', ja: 'プライバシーポリシー' },
  'refund-policy': { en: 'Refund Policy', ko: '환불정책', ja: '返金ポリシー' },
};

export const LEGAL_SLUGS: LegalSlug[] = ['terms-of-service', 'privacy-policy', 'refund-policy'];

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
 * 특정 slug의 법적 문서를 en/ko/ja 모두 읽어 반환
 */
export function getLegalDocument(slug: LegalSlug): LegalDocument {
  const readContent = (locale: LegalLocale): string => {
    const localePath = path.join(LEGAL_DOCS_DIR, locale, `${slug}.md`);
    if (fs.existsSync(localePath)) {
      return fs.readFileSync(localePath, 'utf-8');
    }
    const enPath = path.join(LEGAL_DOCS_DIR, 'en', `${slug}.md`);
    return fs.readFileSync(enPath, 'utf-8');
  };

  const enContent = readContent('en');
  const koContent = readContent('ko');
  const jaContent = readContent('ja');

  return {
    slug,
    title: LEGAL_META[slug],
    content: { en: enContent, ko: koContent, ja: jaContent },
    toc: { en: extractToc(enContent), ko: extractToc(koContent), ja: extractToc(jaContent) },
  };
}

/**
 * 모든 법적 문서의 slug 목록 반환 (generateStaticParams용)
 */
export function getAllLegalSlugs(): LegalSlug[] {
  return LEGAL_SLUGS;
}
