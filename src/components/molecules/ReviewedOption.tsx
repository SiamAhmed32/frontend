import React from 'react';
import { CheckCircle2, Circle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ReviewedOption({
  label,
  isCorrect,
  isWrongSelection,
}: {
  label: string;
  isCorrect: boolean;
  isWrongSelection: boolean;
}) {
  const isHighlighted = isCorrect || isWrongSelection;

  return (
    <div
      className={cn(
        'flex min-h-[48px] items-center gap-4 rounded-[16px] border bg-white px-5 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
        isCorrect && 'border-[#079455] bg-[#ECFDF3]',
        isWrongSelection && 'border-[#FDA29B] bg-[#FEF3F2]',
        !isHighlighted && 'border-white'
      )}
    >
      {isCorrect ? (
        <span className="flex size-5 items-center justify-center rounded-full bg-[#079455] text-white">
          <CheckCircle2 className="size-4" strokeWidth={2.5} />
        </span>
      ) : isWrongSelection ? (
        <span className="flex size-5 items-center justify-center rounded-full bg-[#F04438] text-white">
          <XCircle className="size-4" strokeWidth={2.5} />
        </span>
      ) : (
        <Circle className="size-5 text-[#101828]" strokeWidth={1.7} />
      )}

      <span className="font-['Inter',sans-serif] text-[16px] font-normal leading-6 text-[#344054]">{label}</span>
    </div>
  );
}

