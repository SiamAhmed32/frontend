import React from 'react';
import { cn } from '@/lib/utils';

interface FixedBottomActionBarProps {
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function FixedBottomActionBar({ className, left, right }: FixedBottomActionBarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-20 bg-white shadow-[0_-4px_4px_-1px_rgba(12,12,13,0.05)] lg:left-[283px]',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[997px] flex-col gap-5 px-5 py-5 sm:flex-row sm:items-end lg:px-10',
          left ? 'sm:justify-between' : 'sm:justify-end'
        )}
      >
        {left ? <div className="w-full sm:max-w-[309px]">{left}</div> : null}
        {right ? <div className="w-full sm:w-auto">{right}</div> : null}
      </div>
    </div>
  );
}
