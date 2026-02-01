/**
 * Explore Page (Studio Home)
 * [SPEC-UI-003][TAG-UI003-037]
 *
 * 템플릿 갤러리 메인 페이지
 */

'use client';

import { useRouter } from 'next/navigation';
import { TemplateGallery } from '../../components/studio/TemplateGallery';

// ============================================================================
// Mock Templates (실제로는 @tekton/core에서 가져옴)
// ============================================================================

const MOCK_TEMPLATES = [
  {
    id: 'linear-minimal-v1',
    name: 'Linear Minimal',
    description: 'Clean and minimal design system inspired by Linear',
    category: 'dashboard',
    thumbnail: '/templates/linear-minimal.png',
  },
  {
    id: 'login-modern',
    name: 'Modern Login',
    description: 'Contemporary authentication interface with glassmorphism',
    category: 'auth',
    thumbnail: '/templates/login-modern.png',
  },
  {
    id: 'dashboard-pro',
    name: 'Dashboard Pro',
    description: 'Professional dashboard with advanced charts and widgets',
    category: 'dashboard',
    thumbnail: '/templates/dashboard-pro.png',
  },
  {
    id: 'settings-clean',
    name: 'Clean Settings',
    description: 'Organized settings panel with clear hierarchy',
    category: 'settings',
    thumbnail: '/templates/settings-clean.png',
  },
  {
    id: 'profile-card',
    name: 'Profile Card',
    description: 'Beautiful user profile with social integration',
    category: 'profile',
    thumbnail: '/templates/profile-card.png',
  },
  {
    id: 'error-friendly',
    name: 'Friendly Error',
    description: 'User-friendly error pages with helpful actions',
    category: 'feedback',
    thumbnail: '/templates/error-friendly.png',
  },
];

// ============================================================================
// Component
// ============================================================================

export default function ExplorePage() {
  const router = useRouter();

  const handleTemplateClick = (templateId: string) => {
    // [TAG-UI003-008] 템플릿 클릭 시 Editor 페이지로 이동
    router.push(`/studio/template/${templateId}`);
  };

  return (
    <div
      style={{
        padding: 'var(--tekton-spacing-xl, 24px)',
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: 'var(--tekton-spacing-xl, 24px)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--tekton-font-size-2xl, 24px)',
            fontWeight: '600',
            color: 'var(--tekton-text-foreground, #111827)',
            marginBottom: 'var(--tekton-spacing-xs, 4px)',
          }}
        >
          Explore Templates
        </h1>
        <p
          style={{
            fontSize: 'var(--tekton-font-size-base, 16px)',
            color: 'var(--tekton-text-muted-foreground, #6b7280)',
          }}
        >
          Browse and preview professionally designed templates
        </p>
      </header>

      {/* Template Gallery */}
      <TemplateGallery templates={MOCK_TEMPLATES} onTemplateClick={handleTemplateClick} />
    </div>
  );
}
