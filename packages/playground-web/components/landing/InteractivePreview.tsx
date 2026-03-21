'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractivePreviewProps {
  src: string;
  isActive: boolean;
  className?: string;
}

export default function InteractivePreview({
  src,
  isActive,
  className = '',
}: InteractivePreviewProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 shadow-2xl ${className}`}
    >
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 animate-pulse bg-neutral-100"
          />
        )}
      </AnimatePresence>

      <motion.iframe
        src={src}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{
          opacity: loaded ? 1 : 0,
          scale: isActive ? 1 : 0.98,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`h-full w-full ${
          isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-80'
        }`}
        style={{ border: 'none' }}
      />
    </div>
  );
}
