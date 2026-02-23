'use client';

import { motion } from 'framer-motion';

interface TemplateThumbnailProps {
  templateId: string;
}

export function TemplateThumbnail({ templateId }: TemplateThumbnailProps) {
  return (
    <div
      className={`${templateId} relative w-full h-full min-h-[300px] lg:min-h-0 aspect-[4/3] rounded-2xl border border-neutral-200 overflow-hidden group bg-[var(--tekton-bg-canvas)] flex items-center justify-center perspective-[2000px]`}
    >
      {/* Container for 3D Transform */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center transform-style-3d origin-center"
        initial={{ rotateX: 20, rotateY: -25, rotateZ: 5, scale: 0.85 }}
        whileHover={{ rotateX: 10, rotateY: -15, rotateZ: 2, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Main Dashboard Canvas */}
        <div className="absolute w-[110%] md:w-[600px] aspect-[4/3] bg-[var(--tekton-bg-surface)] rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] shadow-2xl shadow-black/10 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="h-12 border-b border-[var(--tekton-border-default)] flex items-center px-4 gap-4 bg-[var(--tekton-bg-surface)]">
            <div className="w-6 h-6 rounded flex-shrink-0 bg-[var(--tekton-action-primary)]" />
            <div className="h-4 w-24 bg-[var(--tekton-text-tertiary)] opacity-20 rounded-full" />
            <div className="ml-auto w-8 h-8 rounded-full bg-[var(--tekton-bg-secondary)] border border-[var(--tekton-border-default)]" />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-16 md:w-48 border-r border-[var(--tekton-border-default)] p-4 flex flex-col gap-3 bg-[var(--tekton-bg-canvas)]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-8 rounded-[var(--tekton-radius-sm)] flex-shrink-0 ${
                    i === 1
                      ? 'bg-[var(--tekton-bg-secondary)] border border-[var(--tekton-border-default)]'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 flex flex-col gap-6 bg-[var(--tekton-bg-canvas)]">
              <div className="h-8 w-1/3 bg-[var(--tekton-text-primary)] opacity-10 rounded-[var(--tekton-radius-sm)]" />

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] p-4 flex flex-col gap-2"
                  >
                    <div className="h-4 w-1/2 bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full" />
                    <div className="h-6 w-3/4 bg-[var(--tekton-text-primary)] opacity-80 rounded-[var(--tekton-radius-sm)] mt-auto" />
                  </div>
                ))}
              </div>

              <div className="flex-1 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-lg)] p-4 flex flex-col gap-3">
                <div className="h-4 w-1/4 bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full mb-2" />
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-full border-b border-[var(--tekton-border-default)] flex items-center px-2"
                  >
                    <div className="h-3 w-1/2 bg-[var(--tekton-text-secondary)] opacity-40 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Card 1 (Top Left Overlay) */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-48 p-4 bg-[var(--tekton-bg-surface)] rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col gap-3"
          initial={{ z: 40 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--tekton-action-primary)] opacity-20" />
            <div className="flex-1 h-3 bg-[var(--tekton-text-primary)] opacity-50 rounded-full" />
          </div>
          <div className="w-full h-2 bg-[var(--tekton-border-default)] rounded-full overflow-hidden mt-2">
            <div className="w-3/4 h-full bg-[var(--tekton-action-primary)]" />
          </div>
        </motion.div>

        {/* Floating Card 2 (Bottom Right Overlay) */}
        <motion.div
          className="absolute -bottom-[5%] -right-[5%] w-56 p-5 bg-[var(--tekton-bg-surface)] rounded-[var(--tekton-radius-xl)] border border-[var(--tekton-border-emphasis)] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.3)] flex flex-col gap-4"
          initial={{ z: 60 }}
        >
          <div className="h-5 w-2/3 bg-[var(--tekton-text-primary)] opacity-90 rounded-[var(--tekton-radius-sm)]" />
          <div className="h-3 w-full bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full" />
          <div className="h-3 w-4/5 bg-[var(--tekton-text-tertiary)] opacity-30 rounded-full" />

          <div className="mt-2 flex gap-2">
            <div className="h-8 flex-1 bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] rounded-[var(--tekton-radius-md)] flex items-center justify-center text-[10px] font-bold">
              Confirm
            </div>
            <div className="h-8 flex-[0.5] bg-[var(--tekton-bg-secondary)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] text-[var(--tekton-text-secondary)] flex items-center justify-center text-[10px] font-bold">
              Cancel
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
