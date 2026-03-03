'use client';

import { FreeTrialBanner } from '@/components/shared/FreeTrialBanner';
import { useRouter } from 'next/navigation';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <FreeTrialBanner onStartFreeTrial={() => router.push('/explore')} />
      {children}
    </>
  );
}
