import React from 'react';
import SeoEngineNav from './SeoEngineNav';

export default function SeoEngineShell({ children, title, description }: { children: React.ReactNode, title: string, description?: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-screen">
      {/* Sidebar Nav */}
      <div className="w-full md:w-64 shrink-0">
        <SeoEngineNav />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm overflow-x-auto">
        <div className="mb-6 border-b border-outline-variant/30 pb-4">
          <h1 className="font-headline-md text-2xl text-on-surface font-bold">{title}</h1>
          {description && <p className="text-on-surface-variant mt-2 font-body-md">{description}</p>}
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
