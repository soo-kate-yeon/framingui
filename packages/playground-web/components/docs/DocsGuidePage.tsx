'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createHeadingIdFactory } from '@/lib/heading';
import type { DocsGuide } from '@/lib/docs';

interface DocsGuidePageProps {
  guide: DocsGuide;
}

export function DocsGuidePage({ guide }: DocsGuidePageProps) {
  const { frontmatter, content, toc } = guide;
  const nextHeadingId = createHeadingIdFactory();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="text-xl text-neutral-600">{frontmatter.description}</p>
        )}
      </header>

      {/* Table of Contents (optional, if toc has items) */}
      {toc.length > 0 && (
        <nav className="border-l-2 border-neutral-200 pl-4 space-y-2">
          <div className="text-sm font-semibold text-neutral-900 mb-2">On this page</div>
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm text-neutral-600 hover:text-neutral-900 transition-colors ${
                item.level === 3 ? 'pl-4' : ''
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      )}

      {/* Content */}
      <article className="prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => {
              const id = nextHeadingId(children?.toString() ?? '');
              return <h1 id={id}>{children}</h1>;
            },
            h2: ({ children }) => {
              const id = nextHeadingId(children?.toString() ?? '');
              return <h2 id={id}>{children}</h2>;
            },
            h3: ({ children }) => {
              const id = nextHeadingId(children?.toString() ?? '');
              return <h3 id={id}>{children}</h3>;
            },
            code: ({ className, children, ...props }) => {
              const inline = !className;
              if (inline) {
                return (
                  <code
                    className="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => {
              return (
                <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                  {children}
                </pre>
              );
            },
            a: ({ href, children }) => {
              return (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-800 underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
