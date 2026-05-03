import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}

export const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className={cn('w-full border overflow-hidden', className)}>
      <div 
        className="h-full bg-current"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
