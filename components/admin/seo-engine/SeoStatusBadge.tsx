import React from 'react';

type StatusType = "planned" | "in_progress" | "review" | "approved" | "published" | "needs_update" | "archived" | string;
type PriorityType = "very_high" | "high" | "medium" | "low" | string;

export default function SeoStatusBadge({ status, priority }: { status?: StatusType, priority?: PriorityType }) {
  if (status) {
    const styles: Record<string, string> = {
      planned: "bg-gray-100 text-gray-700 border-gray-200",
      in_progress: "bg-blue-100 text-blue-700 border-blue-200",
      review: "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      published: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold",
      needs_update: "bg-orange-100 text-orange-700 border-orange-200",
      archived: "bg-zinc-100 text-zinc-500 border-zinc-200",
    };
    
    const style = styles[status] || styles.planned;
    const label = status.replace('_', ' ').toUpperCase();
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`}>
        {label}
      </span>
    );
  }

  if (priority) {
    const styles: Record<string, string> = {
      very_high: "bg-red-100 text-red-700 border-red-200",
      high: "bg-orange-100 text-orange-700 border-orange-200",
      medium: "bg-blue-100 text-blue-700 border-blue-200",
      low: "bg-gray-100 text-gray-700 border-gray-200",
    };
    
    const style = styles[priority] || styles.low;
    const label = priority.replace('_', ' ').toUpperCase();
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`}>
        {label}
      </span>
    );
  }

  return null;
}
