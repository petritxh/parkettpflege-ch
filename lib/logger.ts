import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface AgentLog {
  id: string;
  timestamp: string;
  agentName: string;
  action: string;
  status: 'running' | 'success' | 'error' | 'warning';
  details?: string;
}

const getLogFilePath = () => path.join(process.cwd(), 'data', 'agent-logs.json');

export const logger = {
  log: (agentName: string, action: string, status: AgentLog['status'], details?: string) => {
    try {
      const filePath = getLogFilePath();
      let logs: AgentLog[] = [];
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent) {
           logs = JSON.parse(fileContent);
        }
      }
      
      const newLog: AgentLog = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        agentName,
        action,
        status,
        details
      };
      
      logs.unshift(newLog); // Add to beginning
      if (logs.length > 1000) logs = logs.slice(0, 1000); // Keep max 1000
      
      fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
      return newLog;
    } catch (error) {
      console.error('Failed to write agent log:', error);
      return null;
    }
  },
  
  getLogs: (): AgentLog[] => {
    try {
      const filePath = getLogFilePath();
      if (!fs.existsSync(filePath)) return [];
      const content = fs.readFileSync(filePath, 'utf8');
      return content ? JSON.parse(content) : [];
    } catch (error) {
      console.error('Failed to read agent logs:', error);
      return [];
    }
  },
  
  clearLogs: () => {
    try {
      fs.writeFileSync(getLogFilePath(), JSON.stringify([], null, 2));
    } catch (error) {
      console.error('Failed to clear agent logs:', error);
    }
  }
};
