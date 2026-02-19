'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingAssetProps {
  children: ReactNode;
  delay?: number;
  range?: number;
  duration?: number;
  rotateRange?: number;
  className?: string;
}

export const FloatingAsset = ({
  children,
  delay = 0,
  range = 10,
  duration = 5,
  rotateRange = 1,
  className = '',
}: FloatingAssetProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -range, 0],
        rotate: [0, rotateRange, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};
