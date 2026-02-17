# Blog System i18n Implementation

## Overview

The Blog system now uses GlobalLanguageContext for consistent language management across the application, with all UI text centralized in `data/i18n/blog.ts`.

## Architecture

### Language Management

**GlobalLanguageContext Integration:**

- ✅ Shares language state with other main pages (Landing, Footer)
- ✅ Persists language preference to `localStorage` as `globalLocale`
- ✅ Provides `useGlobalLanguage()` hook for consistent language access

**Previous Implementation (Removed):**

- ❌ Used independent `blogLocale` state
- ❌ Separate localStorage key causing language sync issues

### Content Management

**Blog Content File:** `data/i18n/blog.ts`

This file centralizes all blog UI text in a type-safe structure:

```typescript
export interface BlogContent {
  header: {
    title: string;
    backToHome: string;
    toggleDarkMode: string;
    toggleLanguage: string;
  };
  list: {
    latestPosts: string;
    tagPosts: string;
    description: string;
    noPosts: string;
  };
  post: {
    backToBlog: string;
    relatedPosts: string;
    onThisPage: string;
    openToc: string;
  };
  meta: {
    readingTime: string;
    minRead: string;
    minutesRequired: string;
  };
  // ... additional sections
}
```

**Usage Pattern:**

```typescript
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';

export function BlogComponent() {
  const { locale } = useGlobalLanguage();
  const content = getBlogContent(locale);

  return <h1>{content.header.title}</h1>;
}
```

## Updated Components

### BlogListPage

- ✅ Replaced local `locale` state with `useGlobalLanguage()`
- ✅ Replaced hardcoded strings with `content.list.*` and `content.header.*`
- ✅ Removed duplicate language persistence logic

### BlogPostPage

- ✅ Integrated `useGlobalLanguage()` for locale management
- ✅ Replaced hardcoded strings with `blogContent.post.*` and `blogContent.header.*`
- ✅ Updated `handleToggleLocale` to use context's `toggleLocale()`

### BlogCard

- ✅ Added `useGlobalLanguage()` for locale-aware date formatting
- ✅ Replaced `"min read"` with `content.meta.readingTime`

### BlogHero

- ✅ Integrated `useGlobalLanguage()` for locale detection
- ✅ Replaced hardcoded `"분 소요"` and `"min read"` with `content.meta.readingTime`
- ✅ Removed `locale` prop (now uses context)

### RelatedPosts

- ✅ Added `useGlobalLanguage()` for content fetching
- ✅ Replaced hardcoded `"Related Posts"` / `"관련 글"` with `content.post.relatedPosts`
- ✅ Removed `locale` prop (now uses context)

### TableOfContents

- ✅ Integrated `useGlobalLanguage()` for TOC header text
- ✅ Replaced hardcoded `"On This Page"` / `"목차"` with `content.post.onThisPage`
- ✅ Updated mobile TOC button aria-label with `content.post.openToc`
- ✅ Removed `locale` prop (now uses context)

## Content Strategy

### Blog Post Content

**Current Implementation: Bilingual MDX Files**

Blog posts are stored as separate MDX files per language:

```
content/blog/
├── en/
│   ├── post-slug.mdx
│   └── another-post.mdx
└── ko/
    ├── post-slug.mdx
    └── another-post.mdx
```

**Frontmatter Structure:**

```yaml
---
title: 'Post Title'
description: 'Post description'
date: '2024-01-15'
author:
  name: 'Author Name'
  avatar: '/avatars/author.jpg'
category: 'Development'
tags: ['React', 'TypeScript']
coverImage: '/blog/post-cover.jpg'
published: true
---
Post content in Markdown...
```

**Benefits:**

- ✅ Complete separation of language content
- ✅ Allows different content structure per language
- ✅ Easy to manage translations independently
- ✅ SEO-friendly with language-specific URLs

**Drawbacks:**

- ⚠️ Requires duplicate effort for bilingual posts
- ⚠️ No automatic content sync between languages
- ⚠️ Risk of translation drift over time

### Alternative Strategies (Not Implemented)

**Option A: Single MDX with Embedded Translations**

```mdx
---
title:
  en: 'English Title'
  ko: '한국어 제목'
---

<LocaleContent locale="en">English content here...</LocaleContent>

<LocaleContent locale="ko">한국어 콘텐츠...</LocaleContent>
```

**Option B: English-Only Posts with Translated UI**

Keep all blog posts in English, but translate UI elements (navigation, metadata, etc.). This reduces maintenance overhead but limits content accessibility.

## Recommendations for Content Creators

### Writing Bilingual Blog Posts

**1. Create Both Language Files:**

```bash
# Create English version
touch content/blog/en/my-new-post.mdx

# Create Korean version
touch content/blog/ko/my-new-post.mdx
```

**2. Use Consistent Frontmatter:**

Ensure both files use the same `slug`, `date`, `tags`, and `category` for proper cross-linking.

**3. Translation Workflow:**

- Write primary version (English or Korean)
- Translate to secondary language
- Review both for tone and accuracy
- Test language switching in preview

**4. Image and Asset Paths:**

Use absolute paths from `/public` for images to ensure consistency:

```markdown
![Diagram](/blog/my-post/diagram.png)
```

### Best Practices

**Frontmatter Consistency:**

- ✅ Use identical tags across languages
- ✅ Keep category names consistent
- ✅ Use ISO 8601 date format: `"2024-01-15"`
- ✅ Ensure `published: true` is set for both versions

**Content Structure:**

- ✅ Maintain similar heading hierarchy across languages
- ✅ Keep code examples language-agnostic
- ✅ Use semantic heading levels (H2, H3) for TOC generation

**SEO Optimization:**

- ✅ Write descriptive, unique meta descriptions per language
- ✅ Use relevant keywords in titles and descriptions
- ✅ Include appropriate Open Graph metadata

## Testing

### Manual Testing Checklist

**Language Switching:**

- [ ] Toggle language button switches between EN/KO
- [ ] Language preference persists on page reload
- [ ] Language change applies to all UI elements immediately

**Blog List Page:**

- [ ] Header shows correct language (Blog / 블로그)
- [ ] "Latest Posts" / "최신 글" displays correctly
- [ ] Description text matches language
- [ ] "No posts found" message works in both languages
- [ ] Tag filter shows correct posts per language

**Blog Post Page:**

- [ ] Back button aria-label matches language
- [ ] Reading time shows "min read" (EN) or "분 소요" (KO)
- [ ] "Related Posts" / "관련 글" section title is correct
- [ ] TOC header shows "On This Page" (EN) or "목차" (KO)
- [ ] Mobile TOC button has correct aria-label

**Cross-Page Consistency:**

- [ ] Language setting matches between landing page and blog
- [ ] GlobalLanguageContext state syncs correctly
- [ ] No conflicting localStorage keys

### Automated Testing

**Future Implementation:**

```typescript
// Example test structure
describe('Blog i18n', () => {
  it('should display Korean UI when locale is ko', () => {
    // Test implementation
  });

  it('should persist language preference', () => {
    // Test implementation
  });

  it('should sync language across components', () => {
    // Test implementation
  });
});
```

## Troubleshooting

### Language Not Syncing

**Issue:** Blog shows English but landing page shows Korean (or vice versa).

**Solution:**

- Clear localStorage: `localStorage.clear()`
- Refresh page
- Check GlobalLanguageProvider wraps entire app in root layout

### Hardcoded Text Still Visible

**Issue:** Some text not translating when language switches.

**Solution:**

- Check if component imports `getBlogContent()`
- Ensure component uses `useGlobalLanguage()` hook
- Verify content exists in `data/i18n/blog.ts` for both locales

### Missing Blog Posts in One Language

**Issue:** Posts appear in English but not Korean (or vice versa).

**Solution:**

- Check `content/blog/[locale]/` directory for missing MDX files
- Ensure both files have `published: true` in frontmatter
- Verify file naming matches exactly between languages

## Future Enhancements

### Planned Features

**1. Search Functionality:**

- Add search input with i18n placeholder
- Implement search across current language posts
- Show "No results found" message in correct language

**2. Pagination:**

- Add pagination controls with i18n labels
- Support "Previous" / "Next" buttons
- Display "Page X of Y" in correct language

**3. Category Pages:**

- Create category listing pages
- Implement category filters with i18n
- Add breadcrumb navigation

**4. RSS Feed Localization:**

- Generate separate RSS feeds per language
- Add language-specific feed URLs
- Support feed discovery tags

**5. Automatic Translation Suggestions:**

- Detect missing translations
- Suggest when content needs updating
- Track translation status per post

## Migration Notes

### Breaking Changes

**GlobalLanguageContext Integration:**

If you have custom code referencing `blogLocale`:

```typescript
// Before (❌ Deprecated)
const saved = localStorage.getItem('blogLocale');

// After (✅ Correct)
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
const { locale } = useGlobalLanguage();
```

**Component Props Removal:**

Several components no longer accept `locale` prop:

```typescript
// Before (❌ Deprecated)
<BlogHero frontmatter={fm} readingTime={rt} locale={locale} />

// After (✅ Correct)
<BlogHero frontmatter={fm} readingTime={rt} />
```

### Backward Compatibility

**localStorage Migration:**

The system automatically migrates from `blogLocale` to `globalLocale` on first load through GlobalLanguageContext.

## Credits

**Implementation Date:** 2024-01-19
**Developer:** Claude Code (expert-frontend agent)
**Architecture:** GlobalLanguageContext + Centralized Content File Pattern

---

For questions or issues, please refer to the main i18n documentation or contact the development team.
