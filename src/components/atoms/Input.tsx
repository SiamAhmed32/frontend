import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  variant?: 'default' | 'auth';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'w-full border',
      auth: 'h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 text-[16px] font-normal leading-[24px] tracking-[0] text-[#667085] placeholder:text-[#667085] shadow-[0_1px_2px_0_rgba(16,24,40,0.05),inset_0_-2px_0_0_rgba(16,24,40,0.05),inset_0_0_0_1px_rgba(16,24,40,0.18)] outline-none',
    };

    return (
      <input
        ref={ref}
        className={cn(
          variants[variant],
          error && 'border-[#BA6262]',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
