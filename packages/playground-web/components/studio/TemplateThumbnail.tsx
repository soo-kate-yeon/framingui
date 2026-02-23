'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { previewTheme } from '../../lib/mcp-client';
import { resolveSemanticToken, oklchToCSS, type ThemeDefinition } from '@tekton-ui/ui';

interface TemplateThumbnailProps {
  templateId: string;
}

export function TemplateThumbnail({ templateId }: TemplateThumbnailProps) {
  const [scopedStyles, setScopedStyles] = useState<React.CSSProperties>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const res = await previewTheme(templateId);
        if (res.result?.success && res.result.theme) {
          const theme = res.result.theme as ThemeDefinition;
          const tokens = theme.tokens;

          const resolveColor = (ref: string) => {
            const resolved = resolveSemanticToken(ref, theme);
            if (typeof resolved === 'object' && 'l' in resolved) {
              return oklchToCSS(resolved as any);
            }
            return String(resolved);
          };

          const textPrimary = tokens.semantic.text
            ? resolveColor(tokens.semantic.text.primary)
            : tokens.atomic.color.neutral?.[900]
              ? oklchToCSS(tokens.atomic.color.neutral[900] as any)
              : oklchToCSS({ l: 0.12, c: 0.01, h: 0 });

          const textSecondary = tokens.semantic.text
            ? resolveColor(tokens.semantic.text.secondary)
            : tokens.atomic.color.neutral?.[500]
              ? oklchToCSS(tokens.atomic.color.neutral[500] as any)
              : oklchToCSS({ l: 0.58, c: 0.02, h: 0 });

          const textTertiary = tokens.semantic.text?.muted
            ? resolveColor(tokens.semantic.text.muted)
            : tokens.atomic.color.neutral?.[400]
              ? oklchToCSS(tokens.atomic.color.neutral[400] as any)
              : oklchToCSS({ l: 0.72, c: 0.02, h: 0 });

          const getWhite = () => {
            if (tokens.atomic.color.neutral && 'white' in tokens.atomic.color.neutral) {
              return tokens.atomic.color.neutral.white;
            }
            if ((tokens.atomic.color as any).white) {
              return (tokens.atomic.color as any).white;
            }
            return { l: 1, c: 0, h: 0 };
          };

          const vars: Record<string, string> = {
            '--tekton-bg-canvas': resolveColor(tokens.semantic.background.canvas),
            '--tekton-bg-surface': resolveColor(tokens.semantic.background.surface.default),
            '--tekton-text-primary': textPrimary,
            '--tekton-text-secondary': textSecondary,
            '--tekton-text-tertiary': textTertiary,
            '--tekton-action-primary': textPrimary,
            '--tekton-action-primary-text': oklchToCSS(getWhite() as any),
            '--tekton-border-default': resolveColor(tokens.semantic.border.default.default),
            '--tekton-border-emphasis': resolveColor(tokens.semantic.border.default.emphasis),
            '--tekton-bg-secondary': resolveColor(tokens.semantic.background.surface.emphasis),
          };

          Object.entries(tokens.atomic.radius).forEach(([k, v]) => {
            vars[`--tekton-radius-${k}`] = v;
          });

          setScopedStyles(vars as React.CSSProperties);
        }
      } catch (err) {
        console.error('Failed to load theme for thumbnail:', templateId, err);
      } finally {
        setLoaded(true);
      }
    }

    loadTheme();
  }, [templateId]);

  return (
    <div
      style={scopedStyles}
      className={`relative w-full h-full min-h-[260px] lg:min-h-0 aspect-[4/3] overflow-hidden group bg-[var(--tekton-bg-canvas)] flex items-center justify-center perspective-[2000px] transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Container for 3D Transform */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center transform-style-3d origin-center"
        initial={{ rotateX: 20, rotateY: -25, rotateZ: 5, scale: 0.75 }}
        whileHover={{ rotateX: 10, rotateY: -15, rotateZ: 2, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Main Dashboard Canvas */}
        <div className="absolute w-[110%] md:w-[600px] aspect-[4/3] bg-[var(--tekton-bg-surface)] rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] shadow-2xl shadow-black/10 overflow-hidden flex flex-col pointer-events-none">
          {/* Header */}
          <div className="h-10 md:h-12 border-b border-[var(--tekton-border-default)] flex items-center px-4 gap-4 bg-[var(--tekton-bg-surface)]">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded flex-shrink-0 bg-[var(--tekton-action-primary)]" />
            <div className="h-3 md:h-4 w-20 md:w-24 bg-[var(--tekton-text-tertiary)] opacity-20 rounded-full" />
            <div className="ml-auto w-6 h-6 md:w-8 md:h-8 rounded-full bg-[var(--tekton-bg-secondary)] border border-[var(--tekton-border-default)]" />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-12 md:w-48 border-r border-[var(--tekton-border-default)] p-3 md:p-4 flex flex-col gap-3 bg-[var(--tekton-bg-canvas)]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-6 md:h-8 rounded-[var(--tekton-radius-sm)] flex-shrink-0 ${
                    i === 1
                      ? 'bg-[var(--tekton-bg-secondary)] border border-[var(--tekton-border-default)]'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 md:gap-6 bg-[var(--tekton-bg-canvas)]">
              <div className="h-6 md:h-8 w-1/3 bg-[var(--tekton-text-primary)] opacity-10 rounded-[var(--tekton-radius-sm)]" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 md:h-24 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] p-3 flex flex-col gap-2"
                  >
                    <div className="h-3 w-1/2 bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full" />
                    <div className="h-4 md:h-6 w-3/4 bg-[var(--tekton-text-primary)] opacity-80 rounded-[var(--tekton-radius-sm)] mt-auto" />
                  </div>
                ))}
              </div>

              <div className="flex-1 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-lg)] p-3 md:p-4 flex flex-col gap-3">
                <div className="h-3 md:h-4 w-1/4 bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full mb-2" />
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 md:h-8 w-full border-b border-[var(--tekton-border-default)] flex items-center px-2"
                  >
                    <div className="h-2 md:h-3 w-1/2 bg-[var(--tekton-text-secondary)] opacity-40 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Card 1 (Top Left Overlay) */}
        <motion.div
          className="absolute top-[10%] -left-[15%] md:-left-[10%] w-36 md:w-48 p-3 md:p-4 bg-[var(--tekton-bg-surface)] rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col gap-3 pointer-events-none"
          initial={{ z: 40 }}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[var(--tekton-action-primary)] opacity-20" />
            <div className="flex-1 h-2 md:h-3 bg-[var(--tekton-text-primary)] opacity-50 rounded-full" />
          </div>
          <div className="w-full h-1.5 md:h-2 bg-[var(--tekton-border-default)] rounded-full overflow-hidden mt-1 md:mt-2">
            <div className="w-3/4 h-full bg-[var(--tekton-action-primary)]" />
          </div>
        </motion.div>

        {/* Floating Card 2 (Bottom Right Overlay) */}
        <motion.div
          className="absolute bottom-[5%] -right-[15%] md:-right-[5%] w-40 md:w-56 p-4 md:p-5 bg-[var(--tekton-bg-surface)] rounded-[var(--tekton-radius-xl)] border border-[var(--tekton-border-emphasis)] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.3)] flex flex-col gap-3 md:gap-4 pointer-events-none"
          initial={{ z: 60 }}
        >
          <div className="h-4 md:h-5 w-2/3 bg-[var(--tekton-text-primary)] opacity-90 rounded-[var(--tekton-radius-sm)]" />
          <div className="h-2 md:h-3 w-full bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full" />
          <div className="h-2 md:h-3 w-4/5 bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full" />

          <div className="mt-1 md:mt-2 flex gap-2">
            <div className="h-6 md:h-8 flex-1 bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] rounded-[var(--tekton-radius-md)] flex items-center justify-center text-[8px] md:text-[10px] font-bold">
              Confirm
            </div>
            <div className="h-6 md:h-8 flex-[0.5] bg-[var(--tekton-bg-secondary)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] text-[var(--tekton-text-secondary)] flex items-center justify-center text-[8px] md:text-[10px] font-bold">
              Cancel
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
