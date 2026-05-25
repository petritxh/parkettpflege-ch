'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  markdown?: string;
}

export default function TableOfContents({ markdown }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (!markdown) return;
    
    // Simple regex to extract markdown headers (## and ###)
    const matches = Array.from(markdown.matchAll(/^(#{2,3})\s+(.+)$/gm));
    const items = matches.map(match => {
      const text = match[2];
      // Generate ID same way as rehype-slug does (github-slugger equivalent)
      const id = text.toLowerCase()
        .replace(/[^a-z0-9äöüß]+/g, '-') // Replace non-alphanumeric with hyphen
        .replace(/(^-|-$)/g, ''); // Remove leading and trailing hyphens
      return {
        level: match[1].length,
        text,
        id
      };
    });
    setHeadings(items);
  }, [markdown]);

  useEffect(() => {
    // Add small delay to ensure elements are rendered
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '0px 0px -80% 0px' }
      );

      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto hidden lg:block w-64 pr-6">
      <h4 className="font-headline-sm text-lg mb-4 text-on-surface">Inhalt</h4>
      <ul className="space-y-3 border-l-2 border-surface-variant">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === 3 ? 'ml-4' : 'ml-0'}`}
          >
            <a
              href={`#${heading.id}`}
              className={`block -ml-[2px] pl-4 border-l-2 py-1 text-sm transition-colors ${
                activeId === heading.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
