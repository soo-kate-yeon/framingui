import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import { BlogListPage } from '@/components/blog/BlogListPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Tekton',
  description:
    'Insights on AI-powered development, design systems, and modern web engineering from the Tekton team.',
  openGraph: {
    title: 'Blog | Tekton',
    description:
      'Insights on AI-powered development, design systems, and modern web engineering from the Tekton team.',
    type: 'website',
    url: 'https://tekton-ui.com/blog',
    images: [{ url: 'https://tekton-ui.com/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Tekton',
    description:
      'Insights on AI-powered development, design systems, and modern web engineering from the Tekton team.',
    images: ['https://tekton-ui.com/og-image.png'],
  },
  alternates: {
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
  },
};

export default function BlogPage() {
  const enPosts = getAllBlogPosts('en');
  const koPosts = getAllBlogPosts('ko');
  const enTags = getAllTags('en');
  const koTags = getAllTags('ko');

  return <BlogListPage posts={{ en: enPosts, ko: koPosts }} allTags={{ en: enTags, ko: koTags }} />;
}
