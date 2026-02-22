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

import { Heart, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// ============================================================================
// Demo App Routes (데모 앱이 있는 테마만 정의)
// ============================================================================

const DEMO_ROUTES: Record<string, string> = {
  'square-minimalism': '/studio/square-minimalism',
  'dark-boldness': '/studio/dark-boldness',
  pebble: '/studio/pebble',
  'classic-magazine': '/studio/classic-magazine',
  'neutral-workspace': '/studio/neutral-workspace',
  'minimal-workspace': '/studio/minimal-workspace',
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
  /** 썸네일 이미지 URL (선택적) */
  thumbnail?: string;
  /** 카테고리 */
  category: string;
  /** 가격 (선택적) */
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
  thumbnail,
  category,
  price,
  onClick,
  className = '',
  selectionMode = false,
  isSelected = false,
  selectionDisabled = false,
}: TemplateCardProps) {
  const { user, toggleLike, userData } = useAuth();
  const isLiked = userData?.likedTemplates.includes(id) ?? false;

  // 데모 앱 라우트 확인
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

  // 선택 모드 스타일 계산
  const selectionStyles = selectionMode
    ? isSelected
      ? 'border-neutral-900 ring-2 ring-neutral-900'
      : selectionDisabled
        ? 'opacity-50 cursor-not-allowed border-neutral-200'
        : 'border-neutral-200 hover:border-neutral-300 hover:shadow-lg cursor-pointer'
    : 'border-neutral-200 hover:border-neutral-300 hover:shadow-lg cursor-pointer';

  return (
    <article
      className={`group relative flex flex-col bg-white border rounded-2xl transition-all ${selectionStyles} ${className}`}
      onClick={onClick}
    >
      {/* 선택 모드: 체크마크 아이콘 */}
      {selectionMode && (
        <div
          className={`absolute top-3 right-3 z-20 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-neutral-300'
          }`}
        >
          {isSelected && <Check size={14} className="text-white" />}
        </div>
      )}

      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full bg-neutral-50 overflow-hidden rounded-t-2xl border-b border-neutral-100 group-hover:border-neutral-200 transition-colors">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Empty placeholder */}
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors" />

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

        {/* Live Demo Button */}
        {hasDemoApp && (
          <button
            onClick={handleLiveDemoClick}
            className="absolute bottom-3 right-3 px-4 py-2 flex items-center gap-2 bg-neutral-900 text-white text-xs font-medium rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 hover:bg-neutral-800"
          >
            Live Demo
            <ExternalLink size={12} />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-neutral-100 text-xs font-medium text-neutral-700 mb-3 rounded-full">
            {category}
          </span>
          <h3 className="text-lg font-bold text-neutral-900 mb-1">{name}</h3>
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-200 flex justify-between items-center group-hover:border-neutral-300 transition-colors">
          {price && <span className="text-lg font-bold text-neutral-900">${price}</span>}
          <ArrowRight
            size={18}
            className="text-neutral-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neutral-900 transition-all duration-300 ml-auto"
          />
        </div>
      </div>
    </article>
  );
}
