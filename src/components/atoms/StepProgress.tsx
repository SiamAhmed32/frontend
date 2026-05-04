import React from 'react';
import { cn } from '@/lib/utils';

export function StepProgress({
  total = 3,
  activeCount,
  className,
}: {
  total?: number;
  activeCount: number;
  className?: string;
}) {
  return (
    <div className={cn('mt-[13px] grid h-[5px] gap-5', className)} style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
      {Array.from({ length: total }).map((_, idx) => (
        <span
          key={idx}
          className={cn(
            'h-[5px] rounded-[200px]',
            idx < activeCount ? 'bg-[#7F56D9]' : 'bg-white/90'
          )}
        />
      ))}
    </div>
  );
}

