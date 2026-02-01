/**
 * Template Card Component
 * [SPEC-UI-003][TAG-UI003-047]
 *
 * 템플릿 갤러리용 카드 컴포넌트
 */

'use client';

import { Heart, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// ============================================================================
// Types
// ============================================================================

interface TemplateCardProps {
  /** 템플릿 ID */
  id: string;
  /** 템플릿 이름 */
  name: string;
  /** 템플릿 설명 */
  description: string;
  /** 썸네일 이미지 URL (선택적) */
  thumbnail?: string;
  /** 카테고리 */
  category: string;
  /** 클릭 콜백 [TAG-UI003-008] */
  onClick?: () => void;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function TemplateCard({
  id,
  name,
  description,
  thumbnail,
  category,
  onClick,
  className = '',
}: TemplateCardProps) {
  const { user, hasLicense, toggleLike, userData } = useAuth();

  const isLiked = userData?.likedTemplates.includes(id) ?? false;
  const hasValidLicense = hasLicense(id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      toggleLike(id);
    }
  };

  return (
    <article
      className={`template-card ${className}`}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--tekton-bg-background, #ffffff)',
        border: '1px solid var(--tekton-border-default, #e5e7eb)',
        borderRadius: 'var(--tekton-radius-lg, 8px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--tekton-bg-primary, #3b82f6)';
        e.currentTarget.style.boxShadow =
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--tekton-border-default, #e5e7eb)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
          overflow: 'hidden',
        }}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${name} preview`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--tekton-font-size-sm, 14px)',
              color: 'var(--tekton-text-muted-foreground, #6b7280)',
            }}
          >
            No Preview
          </div>
        )}

        {/* License Badge */}
        {!hasValidLicense && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--tekton-spacing-sm, 8px)',
              right: 'var(--tekton-spacing-sm, 8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--tekton-spacing-xs, 4px)',
              padding: 'var(--tekton-spacing-xs, 4px) var(--tekton-spacing-sm, 8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#ffffff',
              borderRadius: 'var(--tekton-radius-sm, 4px)',
              fontSize: 'var(--tekton-font-size-xs, 12px)',
              fontWeight: '500',
            }}
          >
            <Lock size={12} aria-hidden="true" />
            <span>Preview</span>
          </div>
        )}

        {/* Like Button */}
        {user && (
          <button
            type="button"
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Unlike template' : 'Like template'}
            style={{
              position: 'absolute',
              top: 'var(--tekton-spacing-sm, 8px)',
              left: 'var(--tekton-spacing-sm, 8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Heart
              size={16}
              fill={isLiked ? '#ef4444' : 'none'}
              color={isLiked ? '#ef4444' : '#6b7280'}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: 'var(--tekton-spacing-md, 12px)',
        }}
      >
        {/* Category Badge */}
        <span
          style={{
            display: 'inline-block',
            padding: 'var(--tekton-spacing-xs, 4px) var(--tekton-spacing-sm, 8px)',
            backgroundColor: 'var(--tekton-bg-accent, #f3f4f6)',
            color: 'var(--tekton-text-accent-foreground, #374151)',
            fontSize: 'var(--tekton-font-size-xs, 12px)',
            fontWeight: '500',
            borderRadius: 'var(--tekton-radius-sm, 4px)',
            marginBottom: 'var(--tekton-spacing-sm, 8px)',
            textTransform: 'capitalize',
          }}
        >
          {category}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize: 'var(--tekton-font-size-base, 16px)',
            fontWeight: '600',
            color: 'var(--tekton-text-foreground, #111827)',
            marginBottom: 'var(--tekton-spacing-xs, 4px)',
          }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--tekton-font-size-sm, 14px)',
            color: 'var(--tekton-text-muted-foreground, #6b7280)',
            lineHeight: 'var(--tekton-line-height-base, 1.5)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
