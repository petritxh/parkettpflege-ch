import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SeoStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "gray";
}

export default function SeoStatCard({ title, value, icon: Icon, description, trend, color = "blue" }: SeoStatCardProps) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    gray: "bg-gray-50 text-gray-600",
  };

  return (
    <div className="bg-surface rounded-xl border border-outline-variant/30 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <div className="font-display-md text-3xl font-bold text-on-surface">
          {value}
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '+' : ''}{trend.value}
          </span>
        )}
      </div>
      
      {description && (
        <p className="mt-2 text-sm text-on-surface-variant font-body-sm">
          {description}
        </p>
      )}
    </div>
  );
}
