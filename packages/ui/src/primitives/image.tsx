/**
 * @framingui - Image Component
 * [SPEC-COMPONENT-001-C] [PRIMITIVE]
 *
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 *
 * WHY: 코드 품질 및 추적성을 보장
 * IMPACT: TAG 누락 시 요구사항 추적 불가
 */

import * as React from 'react';
import { cn } from '../lib/utils';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Show loading skeleton
   */
  loading?: 'lazy' | 'eager';
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, loading = 'lazy', ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        loading={loading}
        className={cn(
          'rounded-[var(--radius-md)]',
          'bg-[var(--image-placeholder-background)]',
          className
        )}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';

export { Image };
