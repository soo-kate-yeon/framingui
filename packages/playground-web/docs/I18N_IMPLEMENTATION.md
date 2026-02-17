# 국제화(i18n) 구현 가이드

## 개요

공통 컴포넌트(Header, Footer)와 랜딩 페이지에 영어/한국어 국제화를 적용했습니다.

## 아키텍처

### 컨텍스트 분리

프로젝트는 두 가지 독립적인 언어 컨텍스트를 사용합니다:

1. **GlobalLanguageContext** (새로 추가)
   - 용도: 메인 페이지, 랜딩, Footer 등 전역 컴포넌트
   - 저장소: `localStorage` (`globalLocale` 키)
   - 파일: `contexts/GlobalLanguageContext.tsx`

2. **StudioLanguageContext** (기존)
   - 용도: /studio 페이지 전용
   - 저장소: `localStorage` (`studioLocale` 키)
   - 파일: `contexts/StudioLanguageContext.tsx`

### 파일 구조

```
packages/playground-web/
├── contexts/
│   ├── GlobalLanguageContext.tsx       # 전역 언어 컨텍스트 (새로 추가)
│   └── StudioLanguageContext.tsx       # Studio 언어 컨텍스트 (기존)
│
├── data/i18n/
│   ├── landing.ts                      # 랜딩 페이지 콘텐츠 (새로 추가)
│   └── footer.ts                       # Footer 콘텐츠 (새로 추가)
│
├── components/
│   ├── landing/
│   │   └── LandingPage.tsx             # i18n 적용 완료
│   │
│   └── shared/
│       ├── Footer.tsx                  # i18n 적용 완료
│       └── GlobalLanguageSwitcher.tsx  # 언어 전환 컴포넌트 (새로 추가)
│
└── app/
    └── providers.tsx                   # GlobalLanguageProvider 추가됨
```

## 구현된 기능

### 1. 전역 언어 컨텍스트

**파일:** `contexts/GlobalLanguageContext.tsx`

```tsx
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';

function MyComponent() {
  const { locale, setLocale, toggleLocale } = useGlobalLanguage();
  // locale: 'en' | 'ko'
}
```

### 2. 언어 전환 컴포넌트

**파일:** `components/shared/GlobalLanguageSwitcher.tsx`

사용법:

```tsx
import { GlobalLanguageSwitcher } from '@/components/shared/GlobalLanguageSwitcher';

<GlobalLanguageSwitcher className="your-custom-class" />;
```

### 3. 랜딩 페이지 i18n

**콘텐츠 파일:** `data/i18n/landing.ts`

구조:

- Navigation (Pricing, Preview, Get Started)
- Hero Section (Title, Description, Buttons)
- Main Image
- Feature Sections (3개 섹션, 각각 제목 + Accordion 아이템)
- FAQ Section (제목 + 4개 질문)

사용 예시:

```tsx
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getLandingContent } from '@/data/i18n/landing';

function LandingPage() {
  const { locale } = useGlobalLanguage();
  const content = getLandingContent(locale);

  return <h1>{content.hero.title.part1}</h1>;
}
```

### 4. Footer i18n

**콘텐츠 파일:** `data/i18n/footer.ts`

구조:

- Brand Name
- Copyright
- Links (Pricing, Blog, Terms, Privacy, Refund)
- Business Info (Operated By, Representative, Address, Email)

사용 예시:

```tsx
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getFooterContent } from '@/data/i18n/footer';

function Footer() {
  const { locale } = useGlobalLanguage();
  const content = getFooterContent(locale);

  return <p>{content.copyright}</p>;
}
```

## 사용 방법

### Provider 설정 (이미 완료됨)

`app/providers.tsx`에 GlobalLanguageProvider가 추가되어 있습니다:

```tsx
export function Providers({ children }: ProvidersProps) {
  return (
    <GlobalLanguageProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </GlobalLanguageProvider>
  );
}
```

### 컴포넌트에서 사용

1. **언어 상태 가져오기:**

```tsx
import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';

function MyComponent() {
  const { locale, setLocale } = useGlobalLanguage();

  // 현재 언어: locale ('en' | 'ko')
  // 언어 변경: setLocale('ko')
}
```

2. **콘텐츠 가져오기:**

```tsx
import { getLandingContent } from '@/data/i18n/landing';

const content = getLandingContent(locale);
console.log(content.hero.title.part1);
```

3. **언어 전환 UI:**

```tsx
import { GlobalLanguageSwitcher } from '@/components/shared/GlobalLanguageSwitcher';

<GlobalLanguageSwitcher />;
```

## 테스트 방법

### 로컬 개발 서버 실행

```bash
cd packages/playground-web
pnpm run dev
```

### 확인 사항

1. **랜딩 페이지 (`/`):**
   - [ ] Hero 섹션 제목이 언어별로 표시되는가?
   - [ ] Navigation 버튼 텍스트가 변경되는가?
   - [ ] Feature 섹션 콘텐츠가 번역되는가?
   - [ ] FAQ 섹션이 번역되는가?

2. **Footer:**
   - [ ] Copyright 텍스트가 번역되는가?
   - [ ] Navigation 링크가 번역되는가?
   - [ ] Business Info가 번역되는가?

3. **언어 전환:**
   - [ ] GlobalLanguageSwitcher 드롭다운이 표시되는가?
   - [ ] 언어 변경 시 페이지 전체 콘텐츠가 즉시 업데이트되는가?
   - [ ] 새로고침 후에도 선택한 언어가 유지되는가? (localStorage)

4. **반응형:**
   - [ ] 모바일에서 언어 전환 버튼이 올바르게 표시되는가?
   - [ ] 데스크톱에서 sticky nav에 언어 전환이 표시되는가?

## 추가할 페이지

다음 페이지들도 같은 패턴으로 i18n을 적용할 수 있습니다:

1. **Pricing Page** (`/pricing`)
   - 파일: `components/pricing/PricingPage.tsx`
   - 콘텐츠 파일 생성: `data/i18n/pricing.ts`

2. **Blog Page** (`/blog`)
   - 파일: `app/blog/page.tsx`
   - 콘텐츠 파일 생성: `data/i18n/blog.ts`

3. **Legal Pages** (`/legal/*`)
   - Terms of Service
   - Privacy Policy
   - Refund Policy

## 패턴 예시: 새 페이지에 i18n 적용하기

### Step 1: 콘텐츠 파일 생성

`data/i18n/pricing.ts`:

```tsx
import type { GlobalLocale } from '@/contexts/GlobalLanguageContext';

export interface PricingContent {
  hero: {
    title: string;
    description: string;
  };
  plans: {
    single: { name: string; description: string };
    double: { name: string; description: string };
    creator: { name: string; description: string };
  };
}

export const pricingContent: Record<GlobalLocale, PricingContent> = {
  en: {
    hero: {
      title: 'Choose Your Plan',
      description: 'Select the perfect option for your needs',
    },
    plans: {
      single: { name: 'Single Template', description: '...' },
      double: { name: 'Double Package', description: '...' },
      creator: { name: 'Creator Pass', description: '...' },
    },
  },
  ko: {
    hero: {
      title: '플랜 선택',
      description: '필요에 맞는 완벽한 옵션을 선택하세요',
    },
    plans: {
      single: { name: '단일 템플릿', description: '...' },
      double: { name: '더블 패키지', description: '...' },
      creator: { name: '크리에이터 패스', description: '...' },
    },
  },
};

export function getPricingContent(locale: GlobalLocale): PricingContent {
  return pricingContent[locale];
}
```

### Step 2: 컴포넌트에 적용

```tsx
'use client';

import { useGlobalLanguage } from '@/contexts/GlobalLanguageContext';
import { getPricingContent } from '@/data/i18n/pricing';

export function PricingPage() {
  const { locale } = useGlobalLanguage();
  const content = getPricingContent(locale);

  return (
    <div>
      <h1>{content.hero.title}</h1>
      <p>{content.hero.description}</p>
      {/* ... */}
    </div>
  );
}
```

## TypeScript 타입 안전성

모든 콘텐츠는 TypeScript 인터페이스로 정의되어 타입 안전성을 보장합니다:

```tsx
// ✅ 올바른 사용
content.hero.title.part1;

// ❌ 컴파일 에러 (존재하지 않는 속성)
content.hero.title.part3;
```

## 주의사항

1. **StudioLanguageContext와 분리:**
   - `/studio` 페이지는 `StudioLanguageContext` 사용
   - 나머지 페이지는 `GlobalLanguageContext` 사용
   - 두 컨텍스트는 독립적으로 작동

2. **localStorage 키:**
   - Global: `globalLocale`
   - Studio: `studioLocale`

3. **기본 언어:**
   - 둘 다 `'en'`으로 기본 설정됨

4. **Server Components:**
   - 언어 컨텍스트는 Client Component에서만 사용 가능
   - `'use client'` 디렉티브 필요

## 향후 개선 사항

1. **Next.js i18n 라우팅:**
   - `/en/pricing`, `/ko/pricing` 같은 URL 기반 언어 전환
   - `next-intl` 또는 Next.js 13+ App Router i18n 고려

2. **자동 언어 감지:**
   - 브라우저 언어 설정 자동 감지
   - `navigator.language` 활용

3. **더 많은 언어 지원:**
   - 일본어 (ja)
   - 중국어 (zh)
   - 등등

4. **번역 관리:**
   - JSON 파일로 분리
   - Crowdin, Lokalise 같은 번역 관리 도구 연동

## 관련 파일

- `contexts/GlobalLanguageContext.tsx` - 전역 언어 상태 관리
- `data/i18n/landing.ts` - 랜딩 페이지 콘텐츠
- `data/i18n/footer.ts` - Footer 콘텐츠
- `components/shared/GlobalLanguageSwitcher.tsx` - 언어 전환 UI
- `components/landing/LandingPage.tsx` - i18n 적용된 랜딩 페이지
- `components/shared/Footer.tsx` - i18n 적용된 Footer
- `app/providers.tsx` - GlobalLanguageProvider 통합

## 문제 해결

### 언어가 변경되지 않아요

1. GlobalLanguageProvider가 app/providers.tsx에 올바르게 추가되었는지 확인
2. 브라우저 개발자 도구 > Application > Local Storage에서 `globalLocale` 키 확인
3. 컴포넌트에서 `useGlobalLanguage()` 훅을 올바르게 사용하고 있는지 확인

### TypeScript 에러가 발생해요

1. 콘텐츠 인터페이스와 실제 데이터 구조가 일치하는지 확인
2. `GlobalLocale` 타입을 올바르게 import했는지 확인
3. `getLandingContent(locale)` 같은 헬퍼 함수를 사용하고 있는지 확인

### localStorage가 작동하지 않아요

1. Server Component에서 사용하고 있지 않은지 확인 (`'use client'` 필요)
2. useEffect 내부에서만 localStorage 접근하는지 확인
3. 프라이빗 브라우징 모드가 아닌지 확인

---

**작성일:** 2026-02-16
**작성자:** Claude Code
**버전:** 1.0.0
