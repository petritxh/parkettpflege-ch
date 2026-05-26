'use client';

import { TerminalSquare, Loader2, Trash2, RefreshCw, Cpu, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AgentLog } from '@/lib/logger';
import { motion, AnimatePresence } from 'motion/react';

export default function AgentLogsPage() {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/agent-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = async () => {
    if (!confirm('Möchten Sie wirklich alle Agenten-Logs löschen?')) return;
    try {
      setIsClearing(true);
      const res = await fetch('/api/admin/agent-logs', { method: 'DELETE' });
      if (res.ok) {
        setLogs([]);
      }
    } catch (error) {
      console.error('Failed to clear logs:', error);
    } finally {
      setIsClearing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchLogs, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: AgentLog['status']) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'running': return 'text-blue-400 bg-blue-400/10 border-blue-400/20 animate-pulse';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: AgentLog['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'running': return <Loader2 className="w-4 h-4 animate-spin" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-secondary" />
            KI-Agenten Zentrale
          </h1>
          <p className="text-on-surface-variant font-body-md">Live-Überwachung aller autonomen Aktionen der Künstlichen Intelligenz im Hintergrund.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchLogs} 
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg font-label-md text-sm hover:bg-surface-variant transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary' : ''}`} />
            Aktualisieren
          </button>
          <button 
            onClick={clearLogs}
            disabled={isClearing || logs.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error border border-error/20 rounded-lg font-label-md text-sm hover:bg-error/20 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Logs leeren
          </button>
        </div>
      </div>

      <div className="bg-[#0D1117] rounded-2xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col flex-grow relative font-mono">
        {/* Terminal Header */}
        <div className="bg-[#161B22] border-b border-[#30363D] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 text-xs text-gray-400 uppercase tracking-widest font-bold">antigravity@parkett-pflege ~ /var/log/ai-agents</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 font-bold">SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar relative">
          {isLoading && logs.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50 gap-4">
              <TerminalSquare className="w-16 h-16" />
              <p>System wartet auf KI-Aktivitäten...</p>
            </div>
          ) : (
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 hover:bg-[#161B22] rounded-lg transition-colors border border-transparent hover:border-[#30363D]"
                >
                  <div className="text-gray-500 text-xs shrink-0 pt-1">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1.5 ${getStatusColor(log.status)}`}>
                        {getStatusIcon(log.status)} {log.status}
                      </span>
                      <span className="text-blue-400 font-bold text-sm">@{log.agentName}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{log.action}</p>
                    
                    {log.details && (
                      <p className="text-gray-500 text-xs break-all mt-1 bg-[#161B22] p-2 rounded border border-[#30363D] font-mono">
                        {log.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div className="pt-4 text-green-500/50 flex items-center gap-2 animate-pulse">
            <span className="font-bold">&gt;</span> <span className="w-2 h-4 bg-green-500/50 inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
