/**
 * Account Page
 * [SPEC-UI-003][TAG-UI003-038]
 *
 * 라이선스 관리 및 좋아요 목록 페이지
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Widest
 * - Border: Neutral-200
 */

'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useStudioLanguage } from '../../../contexts/StudioLanguageContext';
import { TemplateCard } from '../../../components/studio/TemplateCard';
import { loadThemes } from '../actions';

interface GalleryItem {
  id: string;
  name: string;
  description: string;
  descriptionKo?: string;
  category: string;
  thumbnail?: string;
  price?: number;
}

// ============================================================================
// Translations
// ============================================================================

const TRANSLATIONS = {
  en: {
    subtitle: 'Tekton Studio',
    title: 'MY ACCOUNT',
    description: 'Manage your template licenses and saved designs',
    licenses: {
      title: 'Licenses',
      desc: 'Manage your purchased template licenses.',
      purchased: 'Purchased:',
      status: 'Status:',
      empty: 'No licenses yet',
    },
    likes: {
      title: 'Liked Templates',
      desc: "Templates you've saved for later.",
      defaultDesc: 'Added to your liked templates.',
      empty: 'No liked templates yet',
    },
  },
  ko: {
    subtitle: 'Tekton Studio',
    title: '내 계정',
    description: '템플릿 라이선스와 저장한 디자인을 관리하세요',
    licenses: {
      title: '라이선스',
      desc: '구매한 템플릿 라이선스를 관리합니다.',
      purchased: '구매일:',
      status: '상태:',
      empty: '보유한 라이선스가 없습니다',
    },
    likes: {
      title: '관심 템플릿',
      desc: '나중에 볼 수 있도록 저장한 템플릿입니다.',
      defaultDesc: '관심 템플릿에 추가되었습니다.',
      empty: '저장한 템플릿이 없습니다',
    },
  },
};

// ============================================================================
// Component
// ============================================================================

export default function AccountPage() {
  const { user, userData } = useAuth();
  const { locale } = useStudioLanguage();
  const [themes, setThemes] = useState<GalleryItem[]>([]);

  useEffect(() => {
    loadThemes().then(setThemes).catch(console.error);
  }, []);

  // [TAG-UI003-016] 로그인 필수
  if (!user) {
    redirect('/auth/login');
  }

  const getThemeData = (id: string) => themes.find((t) => t.id === id);
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-16">
      {/* Header */}
      <header className="mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3 block">
          {t.subtitle}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950 mb-4">
          {t.title}
        </h1>
        <p className="text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
          {t.description}
        </p>
      </header>

      {/* Content Area */}
      <div className="space-y-20">
        {/* API Keys / Licenses Section */}
        <section>
          <div className="mb-10">
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 mb-2">
              {t.licenses.title}
            </h3>
            <p className="text-base text-neutral-600">{t.licenses.desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData?.licenses && userData.licenses.length > 0 ? (
              userData.licenses.map((license) => {
                const theme = getThemeData(license.templateId);
                const purchaseDate = new Date(license.purchasedAt).toLocaleDateString();
                return (
                  <TemplateCard
                    key={license.id}
                    id={license.templateId}
                    name={theme?.name || license.templateId}
                    description={`${t.licenses.purchased} ${purchaseDate} • ${t.licenses.status} ${license.status.toUpperCase()}`}
                    thumbnail={theme?.thumbnail}
                  />
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-base text-neutral-500">{t.licenses.empty}</p>
              </div>
            )}
          </div>
        </section>

        {/* Liked Templates Section */}
        <section>
          <div className="mb-10 border-t border-neutral-200 pt-20">
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 mb-2">
              {t.likes.title}
            </h3>
            <p className="text-base text-neutral-600">{t.likes.desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData?.likedTemplates && userData.likedTemplates.length > 0 ? (
              userData.likedTemplates.map((templateId) => {
                const theme = getThemeData(templateId);
                return (
                  <TemplateCard
                    key={templateId}
                    id={templateId}
                    name={theme?.name || templateId}
                    description={theme?.description || t.likes.defaultDesc}
                    descriptionKo={theme?.descriptionKo}
                    thumbnail={theme?.thumbnail}
                  />
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-base text-neutral-500">{t.likes.empty}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
