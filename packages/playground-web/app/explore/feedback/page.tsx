/**
 * Feedback Page
 *
 * Allows users to share feedback without login requirement
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Share Your Feedback | tekton/studio',
  description: 'Your honest feedback helps us make tekton better',
};

export default function FeedbackPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
            Share Your Feedback
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            Whether it's good or bad, your honest feedback helps us make tekton better.
          </p>
          <p className="text-base text-neutral-500 leading-relaxed">
            We'll select 20% of those who provide detailed feedback and give them a free 1-year
            Creator Pass after the beta period ends — unlimited access to all templates.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="https://tally.so/r/feedback-tekton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-950 text-white text-lg font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>Share Feedback</span>
            <ExternalLink size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
