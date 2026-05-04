import React from 'react';
import { cn } from '@/lib/utils';

export function ExamOptionButton({
  active,
  label,
  onSelect,
}: {
  active: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex min-h-[44px] w-full items-center gap-4 rounded-[14px] border border-white bg-white px-6 py-3 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2',
        active ? 'ring-1 ring-[#12B76A]/20' : 'hover:border-[#EAECF0]'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border',
          active ? 'border-[#12B76A]' : 'border-[#101828]'
        )}
      >
        {active ? <span className="size-2.5 rounded-full bg-[#12B76A]" /> : null}
      </span>
      <span className="font-['Inter',sans-serif] text-[16px] font-normal leading-6 text-[#344054]">
        {label}
      </span>
    </button>
  );
}

