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

import { useState } from 'react';
import { Heart, ArrowRight, ExternalLink, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStudioLanguage } from '../../contexts/StudioLanguageContext';

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
  onClick,
  className = '',
  selectionMode = false,
  isSelected = false,
  selectionDisabled = false,
}: TemplateCardProps) {
  const { user, toggleLike, userData } = useAuth();
  const { locale } = useStudioLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const isLiked = userData?.likedTemplates.includes(id) ?? false;

  // 현재 언어에 맞는 설명 텍스트
  const displayDescription = locale === 'ko' && descriptionKo ? descriptionKo : description;

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
      ? 'border-neutral-950 ring-2 ring-neutral-950 shadow-md'
      : selectionDisabled
        ? 'opacity-50 cursor-not-allowed border-neutral-200 shadow-sm'
        : 'border-transparent hover:border-neutral-300 cursor-pointer'
    : 'border-transparent hover:border-neutral-300 cursor-pointer';

  return (
    <article
      className={`group relative flex flex-col gap-6 w-full bg-transparent transition-all ${className}`}
      onClick={onClick}
    >
      {/* 선택 모드: 체크마크 아이콘 */}
      {selectionMode && (
        <div
          className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${
            isSelected ? 'bg-neutral-950 border-neutral-950' : 'bg-white border-neutral-300'
          }`}
        >
          {isSelected && <Check size={16} className="text-white" />}
        </div>
      )}

      {/* Thumbnail Area */}
      <div
        className={`relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden rounded-2xl transition-all duration-500 group-hover:shadow-lg border ${selectionStyles}`}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            className="absolute bottom-4 right-4 px-5 py-2.5 flex items-center gap-2 bg-neutral-950 text-white text-sm font-medium rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 hover:bg-neutral-800 shadow-sm"
          >
            Live Demo
            <ExternalLink size={14} />
          </button>
        )}
      </div>

      {/* Content Area - Editorial Style (Detached) */}
      <div className="flex flex-col gap-2 relative">
        <h3 className="text-2xl font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-brand-600 pr-8">
          {name}
        </h3>

        <div
          className="relative cursor-pointer group/desc"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <p
            className="text-base text-neutral-600 leading-relaxed pr-6"
            style={
              isExpanded
                ? undefined
                : {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }
            }
          >
            {displayDescription}
          </p>

          {/* 하단 화살표 토글 버튼 */}
          <button
            className="absolute bottom-1 right-0 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label={isExpanded ? 'Collapse text' : 'Expand text'}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Arrow Icon with Hover Effect */}
        <div className="absolute top-1 right-0 flex justify-end">
          <ArrowRight
            size={24}
            className="text-neutral-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand-600 transition-all duration-300"
          />
        </div>
      </div>
    </article>
  );
}
