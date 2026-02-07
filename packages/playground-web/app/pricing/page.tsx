import type { Metadata } from 'next';
import { PricingPage } from '../../components/pricing/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing | Tekton',
  description:
    'Choose the right plan for your project. Premium React templates with AI-powered design system.',
};

export default function Page() {
  return <PricingPage />;
}
