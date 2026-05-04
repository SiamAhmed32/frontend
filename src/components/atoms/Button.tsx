import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'rounded-lg border-2 border-white/10 bg-[#7F56D9] text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05),inset_0_-2px_0_0_rgba(16,24,40,0.05),inset_0_0_0_1px_rgba(16,24,40,0.18)]',
    secondary: '',
    outline: 'border',
    ghost: '',
  };

  const sizes = {
    sm: '',
    md: '',
    lg: 'h-11 px-4 py-2.5 text-[16px] font-semibold leading-[24px] tracking-[0]',
    full: 'h-11 w-full px-4 py-2.5 text-[16px] font-semibold leading-[24px] tracking-[0]',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
