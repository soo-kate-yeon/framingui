'use client';

import { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const article = document.querySelector('.blog-article-content');
      if (!article) return;

      const windowHeight = window.innerHeight;
      const articleRect = article.getBoundingClientRect();
      const articleHeight = article.scrollHeight;
      const articleTop = articleRect.top + window.scrollY;
      const scrollableHeight = articleHeight - windowHeight;

      if (scrollableHeight <= 0) {
        setProgress(100);
        return;
      }

      const scrolled = Math.max(0, window.scrollY - articleTop);
      const percent = (scrolled / scrollableHeight) * 100;
      setProgress(Math.max(0, Math.min(100, percent)));
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    calculateProgress();

    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-200 dark:bg-neutral-800">
      <div
        className="h-full bg-neutral-900 dark:bg-white transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
