import React from 'react';
import { cn } from '@/lib/utils';

export function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-14 flex-1 items-center justify-center rounded-2xl font-["Inter",sans-serif] text-[16px] font-semibold leading-6 outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2',
        active ? 'bg-[#7F56D9] text-white' : 'bg-transparent text-[#98A2B3]'
      )}
    >
      {children}
    </button>
  );
}

