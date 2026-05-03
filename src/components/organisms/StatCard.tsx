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
    correct: '',
    wrong: '',
    skipped: '',
    time: '',
  };

  return (
    <div className={cn(
      'flex items-center gap-2 border',
      variants[variant]
    )}>
      <div>
        {icon}
      </div>
      <div>
        <p>{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};
