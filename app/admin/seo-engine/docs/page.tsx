import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

function getDocsContent() {
  try {
    const filePath = path.join(process.cwd(), 'docs', 'SEO_CONTENT_ENGINE.md');
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return '# Dokumentation nicht gefunden\nDie Datei `docs/SEO_CONTENT_ENGINE.md` existiert nicht.';
  } catch (e) {
    return '# Fehler beim Laden\nDokumentation konnte nicht geladen werden.';
  }
}

export default function DocsPage() {
  const markdown = getDocsContent();

  return (
    <SeoEngineShell 
      title="SEO Engine Dokumentation" 
      description="Die offizielle Richtlinie und Blaupause für alle SEO-Inhalte."
    >
      <div className="bg-surface rounded-xl border border-outline-variant/30 p-8 shadow-sm mt-6">
        <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-on-surface prose-p:text-on-surface-variant prose-a:text-primary prose-code:text-secondary prose-code:bg-surface-variant prose-pre:bg-surface-container prose-pre:border prose-pre:border-outline-variant/30">
          <ReactMarkdown>
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </SeoEngineShell>
  );
}
