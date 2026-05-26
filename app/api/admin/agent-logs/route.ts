import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function GET() {
  const logs = logger.getLogs();
  return NextResponse.json(logs);
}

export async function DELETE() {
  logger.clearLogs();
  return NextResponse.json({ success: true });
}
