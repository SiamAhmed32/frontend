import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
