/**
 * Template Card Component
 * [SPEC-UI-003][TAG-UI003-047]
 *
 * Theme: Square Minimalism
 * - Radius: 0
 * - Border: 1px Solid Neutral-200
 * - Hover: Border Neutral-900 (High Contrast)
 */

'use client';

import { Heart, ExternalLink, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useExploreLanguage } from '../../contexts/ExploreLanguageContext';
import { TemplateThumbnail } from './TemplateThumbnail';
import { getExploreContent, getTemplatePriceLabel } from '../../data/i18n/explore';
import { getLocalizedTemplateText } from '../../data/templates';

// ============================================================================
// Demo App Routes (데모 앱이 있는 테마만 정의)
// ============================================================================

const DEMO_ROUTES: Record<string, string> = {
  'square-minimalism': '/explore/square-minimalism',
  'dark-boldness': '/explore/dark-boldness',
  'editorial-tech': '/explore/editorial-tech',
  pebble: '/explore/pebble',
  'classic-magazine': '/explore/classic-magazine',
  'neutral-workspace': '/explore/neutral-workspace',
  'minimal-workspace': '/explore/minimal-workspace',
  'bold-line': '/explore/bold-line',
};

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
  /** 한국어 설명 (선택적) */
  descriptionKo?: string;
  /** 썸네일 이미지 URL (선택적) */
  thumbnail?: string;
  /** 카테고리 (deprecated: 블로그 레이아웃에서는 사용하지 않음) */
  category?: string;
  /** 가격 (deprecated: 블로그 레이아웃에서는 사용하지 않음) */
  price?: number;
  /** 클릭 콜백 */
  onClick?: () => void;
  /** 추가 className */
  className?: string;
  /** 선택 모드 여부 */
  selectionMode?: boolean;
  /** 선택된 상태 */
  isSelected?: boolean;
  /** 선택 불가 상태 (이미 최대 선택) */
  selectionDisabled?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function TemplateCard({
  id,
  name,
  description,
  descriptionKo,
  thumbnail,
  price,
  onClick,
  className = '',
  selectionMode = false,
  isSelected = false,
  selectionDisabled = false,
}: TemplateCardProps) {
  const { user, toggleLike, userData } = useAuth();
  const { locale } = useExploreLanguage();
  const i18n = getExploreContent(locale);

  const isLiked = userData?.likedTemplates.includes(id) ?? false;

  const displayDescription = getLocalizedTemplateText(locale, description, descriptionKo);

  const demoRoute = DEMO_ROUTES[id];
  const hasDemoApp = !!demoRoute;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      toggleLike(id);
    }
  };

  const handleLiveDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (demoRoute) {
      window.open(demoRoute, '_blank');
    }
  };

  const thumbnailBorderStyles = selectionMode
    ? isSelected
      ? 'border-neutral-950 ring-2 ring-neutral-950'
      : selectionDisabled
        ? 'opacity-50 border-neutral-200'
        : 'border-neutral-200'
    : 'border-neutral-200';

  return (
    <article
      data-testid="template-card"
      className={`group relative flex flex-col md:flex-row items-start gap-6 md:gap-10 p-6 md:p-8 w-full bg-neutral-50 hover:bg-neutral-100/70 rounded-2xl transition-all cursor-pointer ${selectionDisabled ? 'cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Left: Text Content */}
      <div className="flex flex-col flex-1 min-w-0 gap-4">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-neutral-600">
          {name}
        </h3>

        <p className="text-base text-neutral-600 leading-relaxed">{displayDescription}</p>

        {/* Price + Live Demo Row */}
        <div className="flex items-center gap-4 pt-2">
          {price !== undefined && (
            <span className="text-sm font-medium text-neutral-500">
              {getTemplatePriceLabel(locale, price)}
            </span>
          )}
          {hasDemoApp && (
            <button
              onClick={handleLiveDemoClick}
              className="flex items-center gap-1.5 px-4 py-1.5 border border-neutral-300 rounded-full text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
            >
              {i18n.templateCard.liveDemo}
              <ExternalLink size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Right: Thumbnail */}
      <div
        className={`relative md:w-[45%] w-full flex-shrink-0 aspect-[1440/900] bg-neutral-100 overflow-hidden rounded-xl border transition-all duration-300 group-hover:shadow-md ${thumbnailBorderStyles}`}
      >
        {/* 선택 모드: 체크마크 */}
        {selectionMode && (
          <div
            className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${
              isSelected ? 'bg-neutral-950 border-neutral-950' : 'bg-white border-neutral-300'
            }`}
          >
            {isSelected && <Check size={16} className="text-white" />}
          </div>
        )}

        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full">
            <TemplateThumbnail templateId={id} />
          </div>
        )}

        {/* Like Button */}
        {user && (
          <button
            onClick={handleLikeClick}
            className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors z-10 shadow-sm"
          >
            <Heart
              size={16}
              className={isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-neutral-500'}
            />
          </button>
        )}
      </div>
    </article>
  );
}
