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

import { Heart, ArrowRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// ============================================================================
// Demo App Routes (데모 앱이 있는 테마만 정의)
// ============================================================================

const DEMO_ROUTES: Record<string, string> = {
  'square-minimalism': '/studio/square-minimalism',
  'equinox-fitness-v2': '/studio/equinox-fitness-v2',
  'round-minimal-v1': '/studio/round-minimal',
  'classic-magazine-v1': '/studio/classic-magazine',
  'neutral-humanism-v1': '/studio/neutral-humanism',
  'minimal-workspace-v3': '/studio/minimal-workspace',
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
  /** 클릭 콜백 */
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

  return (
    <article
      className={`group relative flex flex-col bg-white border border-neutral-200 transition-colors hover:border-neutral-900 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full bg-neutral-50 overflow-hidden border-b border-neutral-100 group-hover:border-neutral-900 transition-colors">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 group-hover:text-neutral-900 transition-colors">
              {id}
            </span>
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors" />

        {/* Like Button */}
        {user && (
          <button
            onClick={handleLikeClick}
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors z-10"
          >
            <Heart
              size={14}
              className={isLiked ? "fill-red-500 stroke-red-500" : "stroke-neutral-500"}
            />
          </button>
        )}

        {/* Live Demo Button */}
        {hasDemoApp && (
          <button
            onClick={handleLiveDemoClick}
            className="absolute bottom-3 right-3 px-3 py-1.5 flex items-center gap-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 hover:bg-neutral-800"
          >
            Live Demo
            <ExternalLink size={10} />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <span className="inline-block px-2 py-1 bg-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-3">
            {category}
          </span>
          <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight mb-1">
            {name}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center group-hover:border-neutral-900/10 transition-colors">
          <span className="text-[10px] font-mono text-neutral-300 group-hover:text-neutral-900 transition-colors">
            ID: {id}
          </span>
          <ArrowRight
            size={16}
            className="text-neutral-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neutral-900 transition-all duration-300"
          />
        </div>
      </div>
    </article>
  );
}
