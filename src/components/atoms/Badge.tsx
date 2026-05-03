import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: BadgeProps) => {
  const variants = {
    success: 'bg-green-50 text-green-600 border-green-100',
    danger: 'bg-red-50 text-red-600 border-red-100',
    warning: 'bg-orange-50 text-orange-600 border-orange-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
    neutral: 'bg-gray-50 text-gray-600 border-gray-100',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
