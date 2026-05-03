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
    primary: 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]',
    secondary: 'bg-[#F3E8FF] text-[#7C3AED] hover:bg-[#E9D5FF]',
    outline: 'border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#F3E8FF]',
    ghost: 'hover:bg-gray-100 text-gray-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3 text-lg',
    full: 'w-full py-3',
  };

  return (
    <button
      className={cn(
        'rounded-xl font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
