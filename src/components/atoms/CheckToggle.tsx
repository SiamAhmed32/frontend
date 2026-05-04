import React from 'react';
import { cn } from '@/lib/utils';

interface CheckToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  variant?: 'checkbox' | 'radio';
  size?: 'sm' | 'md';
}

export function CheckToggle({
  checked,
  className,
  variant = 'checkbox',
  size = 'md',
  ...props
}: CheckToggleProps) {
  const base =
    'flex items-center justify-center outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2';
  const sizes = {
    sm: 'size-4 rounded-[6px]',
    md: 'size-5 rounded-md',
  } as const;
  const shape = variant === 'radio' ? 'size-5 rounded-full' : sizes[size];

  return (
    <button
      type="button"
      aria-pressed={checked}
      className={cn(
        base,
        shape,
        checked ? 'border border-[#7F56D9] bg-[#7F56D9]' : 'border border-[#D0D5DD] bg-white/70',
        className
      )}
      {...props}
    >
      {checked ? (
        variant === 'radio' ? (
          <span className="size-2 rounded-full bg-white" aria-hidden="true" />
        ) : (
          <svg className={cn(size === 'sm' ? 'size-2.5' : 'size-3', 'text-white')} viewBox="0 0 12 12" fill="none">
            <path
              d="M10 3L4.75 8.25L2 5.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        )
      ) : null}
    </button>
  );
}

