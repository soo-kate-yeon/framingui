/**
 * Blog i18n Content
 *
 * 블로그 시스템의 모든 UI 텍스트를 영어/한국어로 관리
 */

import type { GlobalLocale } from '../../contexts/GlobalLanguageContext';

export interface BlogContent {
  header: {
    title: string;
    backToHome: string;
    toggleDarkMode: string;
    toggleLanguage: string;
  };
  list: {
    latestPosts: string;
    tagPosts: string; // "#tag" 형태로 사용
    description: string;
    noPosts: string;
  };
  post: {
    backToBlog: string;
    relatedPosts: string;
    onThisPage: string; // TOC 제목
    openToc: string; // 모바일 TOC 버튼
  };
  meta: {
    readingTime: string; // "min read" or "분 소요"
    minRead: string; // 단독 사용 시 (예: "5 min read")
    minutesRequired: string; // 단독 사용 시 (예: "5분 소요")
  };
  card: {
    readMore: string;
  };
  share: {
    title: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    copyLink: string;
    copied: string;
  };
  search: {
    placeholder: string;
    noResults: string;
  };
  tags: {
    allPosts: string;
    filterByTag: string;
  };
  pagination: {
    previous: string;
    next: string;
    page: string;
    of: string;
  };
}

export const blogContent: Record<GlobalLocale, BlogContent> = {
  en: {
    header: {
      title: 'Blog',
      backToHome: 'Go home',
      toggleDarkMode: 'Toggle dark mode',
      toggleLanguage: 'Toggle language',
    },
    list: {
      latestPosts: 'Latest Posts',
      tagPosts: '#', // 태그 이름이 뒤에 붙음
      description:
        'Insights on AI-powered development, design systems, and modern web engineering.',
      noPosts: 'No posts found.',
    },
    post: {
      backToBlog: 'Go back to blog',
      relatedPosts: 'Related Posts',
      onThisPage: 'On This Page',
      openToc: 'Open table of contents',
    },
    meta: {
      readingTime: 'min read',
      minRead: 'min read',
      minutesRequired: 'min read',
    },
    card: {
      readMore: 'Read More',
    },
    share: {
      title: 'Share this post',
      twitter: 'Share on Twitter',
      facebook: 'Share on Facebook',
      linkedin: 'Share on LinkedIn',
      copyLink: 'Copy link',
      copied: 'Copied!',
    },
    search: {
      placeholder: 'Search posts...',
      noResults: 'No results found.',
    },
    tags: {
      allPosts: 'All Posts',
      filterByTag: 'Filter by tag',
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    },
  },
  ko: {
    header: {
      title: '블로그',
      backToHome: '홈으로',
      toggleDarkMode: '다크 모드 전환',
      toggleLanguage: '언어 전환',
    },
    list: {
      latestPosts: '최신 글',
      tagPosts: '#',
      description: 'AI 기반 개발, 디자인 시스템, 모던 웹 엔지니어링 인사이트를 공유해요.',
      noPosts: '아직 게시글이 없어요.',
    },
    post: {
      backToBlog: '블로그로 돌아가기',
      relatedPosts: '관련 글',
      onThisPage: '목차',
      openToc: '목차 열기',
    },
    meta: {
      readingTime: '분 소요',
      minRead: '분',
      minutesRequired: '분 소요',
    },
    card: {
      readMore: '더 읽기',
    },
    share: {
      title: '이 글 공유하기',
      twitter: 'Twitter에 공유',
      facebook: 'Facebook에 공유',
      linkedin: 'LinkedIn에 공유',
      copyLink: '링크 복사',
      copied: '복사됨!',
    },
    search: {
      placeholder: '게시글 검색...',
      noResults: '검색 결과가 없어요.',
    },
    tags: {
      allPosts: '전체 글',
      filterByTag: '태그로 필터링',
    },
    pagination: {
      previous: '이전',
      next: '다음',
      page: '페이지',
      of: '/',
    },
  },
};

/**
 * Helper function to get blog content by locale
 */
export function getBlogContent(locale: GlobalLocale): BlogContent {
  return blogContent[locale];
}
