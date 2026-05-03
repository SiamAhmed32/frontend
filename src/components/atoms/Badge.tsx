import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: BadgeProps) => {
  const variants = {
    success: 'border',
    danger: 'border',
    warning: 'border',
    info: 'border',
    neutral: 'border',
  };

  return (
    <span
      className={cn(
        'inline-flex',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
