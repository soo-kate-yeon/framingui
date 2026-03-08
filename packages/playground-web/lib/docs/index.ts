import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import * as yaml from 'js-yaml';
import { docsFrontmatterSchema, type DocsFrontmatter } from './schema';
import { createHeadingIdFactory } from '../heading';

export type { DocsFrontmatter };

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface DocsGuide {
  slug: string;
  frontmatter: DocsFrontmatter;
  content: string;
  toc: TocItem[];
}

const GUIDES_DIR = path.join(process.cwd(), 'content', 'docs', 'en', 'guides');

/**
 * 마크다운에서 ## / ### 헤딩을 추출하여 TOC 생성
 */
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];
  const nextHeadingId = createHeadingIdFactory();

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match && match[1] && match[2]) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = nextHeadingId(title);
      toc.push({ id, title, level });
    }
  }

  return toc;
}

/**
 * 개별 가이드 읽기
 */
export function getDocsGuide(slug: string): DocsGuide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw, {
    engines: {
      yaml: (s: string) => yaml.load(s) as Record<string, unknown>,
    },
  });

  const frontmatter = docsFrontmatterSchema.parse(data);

  if (!frontmatter.published) {
    return null;
  }

  return {
    slug,
    frontmatter,
    content,
    toc: extractToc(content),
  };
}

/**
 * 모든 가이드 slug (generateStaticParams용)
 */
export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/**
 * 전체 가이드 목록 (order 오름차순)
 */
export function getAllGuides(): DocsGuide[] {
  const slugs = getAllGuideSlugs();
  const guides: DocsGuide[] = [];

  for (const slug of slugs) {
    const guide = getDocsGuide(slug);
    if (guide) {
      guides.push(guide);
    }
  }

  return guides.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999;
    const orderB = b.frontmatter.order ?? 999;
    return orderA - orderB;
  });
}
