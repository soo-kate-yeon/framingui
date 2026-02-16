# Blog i18n Quick Guide

## 🎯 What Changed

The Blog system now uses **GlobalLanguageContext** for consistent language management across the entire application.

### Before (독립적인 blogLocale)

```typescript
// ❌ 각 블로그 컴포넌트가 독립적인 언어 상태 관리
const [locale, setLocale] = useState<Locale>('ko');
localStorage.setItem('blogLocale', locale);
```

### After (통합된 GlobalLanguageContext)

```typescript
// ✅ 전역 언어 컨텍스트 사용
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
const { locale, toggleLocale } = useGlobalLanguage();
```

## 📁 New Files

### `data/i18n/blog.ts`

모든 블로그 UI 텍스트를 중앙 집중식으로 관리하는 content file:

```typescript
export const blogContent: Record<GlobalLocale, BlogContent> = {
  en: {
    header: { title: 'Blog', backToHome: 'Go home', ... },
    list: { latestPosts: 'Latest Posts', noPosts: 'No posts found.', ... },
    post: { relatedPosts: 'Related Posts', onThisPage: 'On This Page', ... },
    meta: { readingTime: 'min read', ... },
  },
  ko: {
    header: { title: '블로그', backToHome: '홈으로', ... },
    list: { latestPosts: '최신 글', noPosts: '게시글이 없습니다.', ... },
    post: { relatedPosts: '관련 글', onThisPage: '목차', ... },
    meta: { readingTime: '분 소요', ... },
  },
};
```

## 🔄 Updated Components

| Component           | Changes                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| **BlogListPage**    | ✅ GlobalLanguageContext 통합<br/>✅ Hardcoded strings → `content.list.*`      |
| **BlogPostPage**    | ✅ GlobalLanguageContext 통합<br/>✅ Hardcoded strings → `blogContent.post.*`  |
| **BlogCard**        | ✅ `useGlobalLanguage()` 추가<br/>✅ `"min read"` → `content.meta.readingTime` |
| **BlogHero**        | ✅ `locale` prop 제거<br/>✅ `useGlobalLanguage()` 사용                        |
| **RelatedPosts**    | ✅ `locale` prop 제거<br/>✅ Context에서 locale 가져오기                       |
| **TableOfContents** | ✅ `locale` prop 제거<br/>✅ TOC 헤더 i18n 적용                                |

## 🚀 Usage Example

### Component Implementation

```typescript
'use client';

import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getBlogContent } from '@/data/i18n/blog';

export function MyBlogComponent() {
  const { locale, toggleLocale } = useGlobalLanguage();
  const content = getBlogContent(locale);

  return (
    <div>
      <h1>{content.header.title}</h1>
      <button onClick={toggleLocale}>
        {locale === 'en' ? 'KO' : 'EN'}
      </button>
    </div>
  );
}
```

## ✅ Benefits

### 1. 일관된 언어 경험

- 랜딩 페이지와 블로그 간 언어 설정 동기화
- 단일 `globalLocale` localStorage 키 사용
- 페이지 전환 시 언어 유지

### 2. 유지보수성 향상

- 모든 UI 텍스트가 `data/i18n/blog.ts`에 중앙 집중
- 번역 업데이트 시 단일 파일만 수정
- TypeScript 타입 안전성 보장

### 3. 확장성

- 새로운 언어 추가 용이
- UI 텍스트 재사용 가능
- 일관된 패턴으로 다른 섹션 확장 가능

## 📝 Content Strategy

### Blog Posts: Bilingual MDX Files

```
content/blog/
├── en/
│   └── post-slug.mdx
└── ko/
    └── post-slug.mdx
```

**각 언어별 독립적인 MDX 파일 유지:**

- ✅ 완전한 콘텐츠 분리
- ✅ 언어별 다른 구조 허용
- ✅ SEO 최적화 (언어별 URL)

## 🔍 Testing Checklist

**언어 전환 테스트:**

- [ ] 언어 토글 버튼이 EN ↔ KO 전환 동작
- [ ] 페이지 새로고침 시 언어 유지
- [ ] 모든 UI 요소에 언어 변경 즉시 적용

**블로그 리스트 페이지:**

- [ ] 헤더 제목: "Blog" (EN) / "블로그" (KO)
- [ ] 히어로 제목: "Latest Posts" (EN) / "최신 글" (KO)
- [ ] 빈 상태 메시지: "No posts found." (EN) / "게시글이 없습니다." (KO)

**블로그 포스트 페이지:**

- [ ] 읽기 시간: "5 min read" (EN) / "5분 소요" (KO)
- [ ] 관련 글 제목: "Related Posts" (EN) / "관련 글" (KO)
- [ ] TOC 헤더: "On This Page" (EN) / "목차" (KO)

**전체 앱 일관성:**

- [ ] 랜딩 페이지와 블로그 언어 동기화
- [ ] localStorage에 `globalLocale`만 존재 (이전 `blogLocale` 제거)

## 🛠️ Troubleshooting

### 문제: 언어가 동기화되지 않음

**증상:** 블로그는 영어, 랜딩은 한국어 (또는 반대)

**해결:**

```javascript
// localStorage 초기화
localStorage.clear();
// 페이지 새로고침
location.reload();
```

### 문제: 일부 텍스트가 번역되지 않음

**증상:** 언어 전환 시 일부 텍스트가 그대로 유지

**확인 사항:**

1. 컴포넌트가 `useGlobalLanguage()` 사용하는지 확인
2. `getBlogContent(locale)` 호출하는지 확인
3. `data/i18n/blog.ts`에 해당 텍스트가 존재하는지 확인

## 📚 Related Documentation

- **Full Implementation Guide:** [blog-i18n-implementation.md](./blog-i18n-implementation.md)
- **GlobalLanguageContext:** `/contexts/GlobalLanguageContext.tsx`
- **Blog Content File:** `/data/i18n/blog.ts`
- **Landing i18n Example:** `/data/i18n/landing.ts`

## 🎓 For Content Creators

### 새 블로그 포스트 작성하기

1. **양쪽 언어 파일 생성:**

   ```bash
   touch content/blog/en/my-post.mdx
   touch content/blog/ko/my-post.mdx
   ```

2. **Frontmatter 일관성 유지:**
   - 동일한 `slug`, `date`, `tags` 사용
   - 양쪽 모두 `published: true` 설정

3. **번역 워크플로우:**
   - 주 언어로 먼저 작성
   - 번역 작성
   - 양쪽 버전 검토
   - 언어 전환하며 테스트

---

**Implementation Date:** 2024-01-19
**Status:** ✅ Production Ready
**Maintained By:** Frontend Team
