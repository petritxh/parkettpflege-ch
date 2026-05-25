'use client';

import { TerminalSquare, Loader2 } from 'lucide-react';

export default function AgentLogsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">Agenten Logs</h1>
          <p className="text-on-surface-variant font-body-md">Chronologische Übersicht aller Aktionen, die von den internen AI-Agenten durchgeführt wurden.</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)] p-8">
        <div className="flex flex-col items-center justify-center h-full text-on-surface-variant gap-4">
           <TerminalSquare className="w-12 h-12 text-secondary opacity-50" />
           <p>Tracking der Agenten-Historie wird in Kürze aktiviert.</p>
        </div>
      </div>
    </div>
  );
}
