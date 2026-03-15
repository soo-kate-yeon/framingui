'use client';

import { FreeTrialBanner } from '@/components/shared/FreeTrialBanner';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FreeTrialBanner />
      {children}
    </>
  );
}
