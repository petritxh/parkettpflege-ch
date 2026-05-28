import React from 'react';

interface SeoSectionCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function SeoSectionCard({ title, children, action, className = "" }: SeoSectionCardProps) {
  return (
    <div className={`bg-surface rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest flex justify-between items-center">
        <h3 className="font-headline-sm text-lg font-bold text-on-surface">
          {title}
        </h3>
        {action && (
          <div>{action}</div>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
