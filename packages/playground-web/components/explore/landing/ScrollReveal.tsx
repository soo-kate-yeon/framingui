/**
 * ScrollReveal Component
 *
 * Framer Motion 기반 스크롤 애니메이션 래퍼
 * - Subtle fade-in + slide-up animation (0.3-0.5s)
 * - Intersection Observer 기반 트리거
 */

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface ScrollRevealProps {
  /** 애니메이션할 컨텐츠 */
  children: ReactNode;
  /** 애니메이션 지연 (초) */
  delay?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 애니메이션 방향 */
  direction?: 'up' | 'down' | 'left' | 'right';
}

// ============================================================================
// Animation Variants
// ============================================================================

const getVariants = (direction: 'up' | 'down' | 'left' | 'right') => {
  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };
};

// ============================================================================
// Component
// ============================================================================

/**
 * ScrollReveal - 스크롤 시 부드럽게 나타나는 애니메이션 래퍼
 *
 * @example
 * ```tsx
 * <ScrollReveal delay={0.1}>
 *   <h2>This will fade in when scrolled into view</h2>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // 한 번만 트리거
    margin: '-50px', // 뷰포트 진입 50px 전에 트리거
  });

  return (
    <motion.div
      ref={ref}
      variants={getVariants(direction)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
