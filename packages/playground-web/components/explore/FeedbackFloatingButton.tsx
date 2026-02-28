/**
 * Feedback Floating Button
 *
 * Fixed button in bottom-right corner that links to feedback page
 * Icon-only for mobile-friendly design
 */

'use client';

import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function FeedbackFloatingButton() {
  return (
    <Link
      href="/explore/feedback"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-neutral-950 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-all hover:scale-110 flex items-center justify-center group"
      aria-label="Share Feedback"
    >
      <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
    </Link>
  );
}
