/**
 * Token Selection Panel Component
 * [SPEC-UI-003]
 *
 * Theme: Square Minimalism
 * - Radius: 0
 * - Typography: Uppercase, Tracking Widest
 * - Color/Typography/Spacing/Radius 토큰 선택
 */

'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface TokenSelectionPanelProps {
  /** 테마 ID (동적 로딩용) */
  themeId: string;
  /** 추가 className */
  className?: string;
}

interface TokenCategory {
  id: string;
  name: string;
  tokens: TokenItem[];
}

interface TokenItem {
  id: string;
  name: string;
  value: string;
  preview?: React.ReactNode;
}

interface ThemeTokens {
  atomic?: {
    radius?: Record<string, string>;
    [key: string]: any;
  };
  recipes?: {
    [key: string]: any;
  };
}

// ============================================================================
// Component
// ============================================================================

export function TokenSelectionPanel({ themeId, className = '' }: TokenSelectionPanelProps) {
  const [selectedTokens, setSelectedTokens] = useState<Record<string, string>>({});
  const [themeData, setThemeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 테마 동적 로드
  useEffect(() => {
    async function loadTheme() {
      if (!themeId) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/themes/${themeId}`);

        if (!response.ok) {
          throw new Error(`Failed to load theme: ${response.statusText}`);
        }

        const data = await response.json();
        setThemeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Theme loading error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTheme();
  }, [themeId]);

  const handleTokenSelect = (categoryId: string, tokenId: string) => {
    setSelectedTokens((prev) => ({
      ...prev,
      [categoryId]: tokenId,
    }));
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className={`token-selection-panel h-full overflow-auto bg-white border-l border-neutral-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">Loading</div>
          <div className="text-xs text-neutral-500">Loading theme tokens...</div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !themeData) {
    return (
      <div className={`token-selection-panel h-full overflow-auto bg-white border-l border-neutral-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <div className="text-xs uppercase tracking-wider text-red-500 mb-2">Error</div>
          <div className="text-xs text-neutral-500">{error || 'Failed to load theme'}</div>
        </div>
      </div>
    );
  }

  const tokens = themeData.tokens as ThemeTokens;

  // Parse tokens into categories
  const categories: TokenCategory[] = [
    // Color Tokens (from recipes)
    {
      id: 'color',
      name: 'Color',
      tokens: [
        {
          id: 'primary',
          name: 'Primary',
          value: '#171717', // neutral-900
          preview: <div className="w-6 h-6 bg-neutral-900" />,
        },
        {
          id: 'secondary',
          name: 'Secondary',
          value: '#ffffff',
          preview: <div className="w-6 h-6 bg-white border border-neutral-200" />,
        },
        {
          id: 'accent',
          name: 'Accent',
          value: '#f5f5f5', // neutral-100
          preview: <div className="w-6 h-6 bg-neutral-100 border border-neutral-200" />,
        },
        {
          id: 'border',
          name: 'Border',
          value: '#e5e5e5', // neutral-200
          preview: <div className="w-6 h-6 border-2 border-neutral-200" />,
        },
      ],
    },
    // Typography Tokens
    {
      id: 'typography',
      name: 'Typography',
      tokens: [
        {
          id: 'hero',
          name: 'Hero',
          value: 'text-5xl font-bold tracking-tight',
          preview: (
            <span className="text-xs font-bold tracking-tight text-neutral-900">Hero</span>
          ),
        },
        {
          id: 'eyebrow',
          name: 'Eyebrow',
          value: 'text-xs uppercase tracking-[0.15em]',
          preview: (
            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">
              EYEBROW
            </span>
          ),
        },
        {
          id: 'body',
          name: 'Body',
          value: 'text-base font-normal',
          preview: <span className="text-xs font-normal text-neutral-600">Body</span>,
        },
        {
          id: 'label',
          name: 'Label',
          value: 'text-xs uppercase tracking-wide',
          preview: (
            <span className="text-[10px] uppercase tracking-wide text-neutral-500">LABEL</span>
          ),
        },
      ],
    },
    // Spacing Tokens
    {
      id: 'spacing',
      name: 'Spacing',
      tokens: [
        {
          id: 'xs',
          name: 'XS',
          value: '0.25rem (4px)',
          preview: <div className="w-1 h-6 bg-neutral-900" />,
        },
        {
          id: 'sm',
          name: 'SM',
          value: '0.5rem (8px)',
          preview: <div className="w-2 h-6 bg-neutral-900" />,
        },
        {
          id: 'md',
          name: 'MD',
          value: '0.75rem (12px)',
          preview: <div className="w-3 h-6 bg-neutral-900" />,
        },
        {
          id: 'lg',
          name: 'LG',
          value: '1rem (16px)',
          preview: <div className="w-4 h-6 bg-neutral-900" />,
        },
        {
          id: 'xl',
          name: 'XL',
          value: '1.5rem (24px)',
          preview: <div className="w-6 h-6 bg-neutral-900" />,
        },
      ],
    },
    // Radius Tokens (Square Minimalism = 0)
    {
      id: 'radius',
      name: 'Radius',
      tokens: tokens.atomic?.radius
        ? Object.entries(tokens.atomic.radius).map(([key, value]) => ({
            id: key,
            name: key.toUpperCase(),
            value: String(value),
            preview: (
              <div
                className="w-8 h-8 border-2 border-neutral-900 bg-neutral-100"
                style={{ borderRadius: String(value) }}
              />
            ),
          }))
        : [],
    },
  ];

  return (
    <div
      className={`token-selection-panel h-full overflow-auto bg-white border-l border-neutral-200 ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
          Design Tokens
        </h2>
        <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1">
          {themeData?.name || themeId}
        </p>
      </div>

      {/* Categories */}
      <div className="p-6 space-y-8">
        {categories.map((category) => (
          <TokenCategorySection
            key={category.id}
            category={category}
            selectedTokenId={selectedTokens[category.id]}
            onTokenSelect={(tokenId) => handleTokenSelect(category.id, tokenId)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Token Category Section
// ============================================================================

interface TokenCategorySectionProps {
  category: TokenCategory;
  selectedTokenId?: string;
  onTokenSelect: (tokenId: string) => void;
}

function TokenCategorySection({
  category,
  selectedTokenId,
  onTokenSelect,
}: TokenCategorySectionProps) {
  return (
    <div className="token-category">
      {/* Category Title */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
        {category.name}
      </h3>

      {/* Token List */}
      <div className="space-y-2">
        {category.tokens.map((token) => {
          const isSelected = selectedTokenId === token.id;

          return (
            <button
              key={token.id}
              type="button"
              onClick={() => onTokenSelect(token.id)}
              className={`w-full flex items-center justify-between p-3 border transition-all ${
                isSelected
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50'
              }`}
              aria-pressed={isSelected}
            >
              {/* Token Info */}
              <div className="flex items-center gap-3">
                {/* Preview */}
                {token.preview && <div className="flex-shrink-0">{token.preview}</div>}

                {/* Name & Value */}
                <div className="text-left">
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isSelected ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {token.name}
                  </div>
                  <div
                    className={`text-[10px] font-mono mt-0.5 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-400'
                    }`}
                  >
                    {token.value}
                  </div>
                </div>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="flex-shrink-0">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
