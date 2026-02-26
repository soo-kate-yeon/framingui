import { Feed } from 'feed';
import { getAllBlogPosts } from '@/lib/blog';

const SITE_URL = 'https://framingui.com';

export async function GET() {
  const posts = getAllBlogPosts('en');

  const feed = new Feed({
    title: 'Tekton Blog',
    description:
      'Insights on AI-powered development, design systems, and modern web engineering.',
    id: SITE_URL,
    link: `${SITE_URL}/blog`,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, Tekton by Morak`,
    feedLinks: {
      rss2: `${SITE_URL}/blog/feed.xml`,
    },
    author: {
      name: 'Tekton Team',
      link: SITE_URL,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
      author: [{ name: post.frontmatter.author.name }],
      category: post.frontmatter.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
