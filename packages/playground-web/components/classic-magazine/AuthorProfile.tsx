/**
 * AuthorProfile Component
 *
 * 작가 프로필 카드 (바이오, 아바타)
 */

import type { Author } from '@/lib/data/articles';

export interface AuthorProfileProps {
  author: Author;
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <section className="my-16 border-t border-b border-neutral-900 py-12">
      <div className="max-w-3xl">
        {/* Section Header */}
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-900 mb-8">
          About the Author
        </h3>

        {/* Author Card */}
        <div className="flex flex-col md:flex-row gap-8 bg-neutral-50 p-8 border border-neutral-200">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-neutral-200 border-2 border-neutral-900 flex items-center justify-center">
              <span className="font-serif text-4xl text-neutral-400">
                {author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h4 className="font-serif text-2xl font-bold text-neutral-900 mb-4">{author.name}</h4>
            <p className="font-serif text-base leading-relaxed text-neutral-700 mb-6">
              {author.bio}
            </p>

            {/* Social Links (Placeholder) */}
            <div className="flex gap-4 font-sans text-xs uppercase tracking-widest">
              <button className="text-neutral-600 hover:text-neutral-900 transition-colors font-bold">
                More Articles
              </button>
              <span className="text-neutral-300">•</span>
              <button className="text-neutral-600 hover:text-neutral-900 transition-colors font-bold">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
