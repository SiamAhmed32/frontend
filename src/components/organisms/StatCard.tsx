import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant: 'correct' | 'wrong' | 'skipped' | 'time';
}

export const StatCard = ({ label, value, icon, variant }: StatCardProps) => {
  const variants = {
    correct: 'text-green-600 border-green-100 bg-white',
    wrong: 'text-red-600 border-red-100 bg-white',
    skipped: 'text-orange-600 border-orange-100 bg-white',
    time: 'text-blue-600 border-blue-100 bg-white',
  };

  return (
    <div className={cn(
      'flex items-center gap-4 p-4 rounded-2xl border shadow-sm transition-all hover:shadow-md',
      variants[variant]
    )}>
      <div className={cn(
        'p-3 rounded-xl',
        variant === 'correct' && 'bg-green-50',
        variant === 'wrong' && 'bg-red-50',
        variant === 'skipped' && 'bg-orange-50',
        variant === 'time' && 'bg-blue-50',
      )}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
