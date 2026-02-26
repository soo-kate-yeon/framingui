import { BetaBanner } from '@/components/shared/BetaBanner';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BetaBanner />
      {children}
    </>
  );
}
