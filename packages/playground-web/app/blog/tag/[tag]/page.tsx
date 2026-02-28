import { getBlogPostsByTag, getAllTags } from '@/lib/blog';
import { BlogListPage } from '@/components/blog/BlogListPage';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const enTags = getAllTags('en');
  return enTags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} | Tekton Blog`,
    description: `Posts tagged with "${tag}" on the Tekton Blog.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;

  const enPosts = getBlogPostsByTag(tag, 'en');
  const koPosts = getBlogPostsByTag(tag, 'ko');
  const jaPosts = getBlogPostsByTag(tag, 'ja');
  const enTags = getAllTags('en');
  const koTags = getAllTags('ko');
  const jaTags = getAllTags('ja');

  return (
    <BlogListPage
      posts={{ en: enPosts, ko: koPosts, ja: jaPosts }}
      allTags={{ en: enTags, ko: koTags, ja: jaTags }}
      activeTag={tag}
    />
  );
}
