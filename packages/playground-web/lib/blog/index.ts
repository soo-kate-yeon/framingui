import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import * as yaml from 'js-yaml';
import readingTime from 'reading-time';
import { blogFrontmatterSchema, type BlogFrontmatter } from './schema';
import { createHeadingIdFactory } from '../heading';

export type { BlogFrontmatter };

export type BlogLocale = 'en' | 'ko' | 'ja';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: Record<BlogLocale, BlogFrontmatter>;
  content: Record<BlogLocale, string>;
  toc: Record<BlogLocale, TocItem[]>;
  readingTime: Record<BlogLocale, number>;
}

export interface BlogPostSummary {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

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
 * 단일 locale의 MDX 파일을 파싱
 */
function parseBlogFile(
  slug: string,
  locale: BlogLocale
): { frontmatter: BlogFrontmatter; content: string } | null {
  const directPath = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  const nestedPath = path.join(BLOG_DIR, slug, `${locale}.mdx`);
  const filePath = fs.existsSync(directPath) ? directPath : nestedPath;
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw, {
    engines: {
      yaml: (s: string) => yaml.load(s) as Record<string, unknown>,
    },
  });
  const parsed = blogFrontmatterSchema.parse({ ...data, slug });
  const normalizedTags = Array.from(
    new Set((parsed.tags ?? []).map((tag) => tag.trim()).filter((tag) => tag.length > 0))
  );
  const frontmatter: BlogFrontmatter = {
    ...parsed,
    tags: normalizedTags.length > 0 ? normalizedTags : ['general'],
  };

  return { frontmatter, content };
}

/**
 * 개별 포스트 읽기 (en/ko/ja)
 */
export function getBlogPost(slug: string): BlogPost | null {
  const en = parseBlogFile(slug, 'en');
  const ko = parseBlogFile(slug, 'ko');
  const ja = parseBlogFile(slug, 'ja');

  if (!en) {
    return null;
  }
  const koResolved = ko ?? en;
  const jaResolved = ja ?? en;

  return {
    slug,
    frontmatter: { en: en.frontmatter, ko: koResolved.frontmatter, ja: jaResolved.frontmatter },
    content: { en: en.content, ko: koResolved.content, ja: jaResolved.content },
    toc: {
      en: extractToc(en.content),
      ko: extractToc(koResolved.content),
      ja: extractToc(jaResolved.content),
    },
    readingTime: {
      en: Math.ceil(readingTime(en.content).minutes),
      ko: Math.ceil(readingTime(koResolved.content).minutes),
      ja: Math.ceil(readingTime(jaResolved.content).minutes),
    },
  };
}

/**
 * 전체 포스트 목록 (날짜 내림차순)
 */
export function getAllBlogPosts(locale: BlogLocale): BlogPostSummary[] {
  const slugs = getAllBlogSlugs();
  const posts: BlogPostSummary[] = [];

  for (const slug of slugs) {
    const parsed = parseBlogFile(slug, locale);
    const fallback = locale === 'en' ? null : parseBlogFile(slug, 'en');
    const resolved = parsed ?? fallback;
    if (resolved && resolved.frontmatter.published) {
      posts.push({
        slug,
        frontmatter: resolved.frontmatter,
        readingTime: Math.ceil(readingTime(resolved.content).minutes),
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * 모든 slug (generateStaticParams용)
 */
export function getAllBlogSlugs(): string[] {
  const enDir = path.join(BLOG_DIR, 'en');
  if (!fs.existsSync(enDir)) {
    return [];
  }

  return fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/**
 * 태그별 필터링
 */
export function getBlogPostsByTag(tag: string, locale: BlogLocale): BlogPostSummary[] {
  return getAllBlogPosts(locale).filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * 모든 태그 목록 (포스트 수 포함)
 */
export function getAllTags(locale: BlogLocale): { tag: string; count: number }[] {
  const posts = getAllBlogPosts(locale);
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 관련 포스트 (같은 태그, 최대 3개)
 */
export function getRelatedPosts(slug: string, locale: BlogLocale, limit = 3): BlogPostSummary[] {
  const current = parseBlogFile(slug, locale);
  if (!current) {
    return [];
  }

  const allPosts = getAllBlogPosts(locale).filter((p) => p.slug !== slug);
  const currentTags = new Set(current.frontmatter.tags.map((t) => t.toLowerCase()));

  const scored = allPosts.map((post) => {
    const overlap = post.frontmatter.tags.filter((t) => currentTags.has(t.toLowerCase())).length;
    return { post, overlap };
  });

  return scored
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((s) => s.post);
}
