'use client';

import { BetaBanner } from '@/components/shared/BetaBanner';
import { useRouter } from 'next/navigation';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <BetaBanner onStartFreeTrial={() => router.push('/explore')} />
      {children}
    </>
  );
}
