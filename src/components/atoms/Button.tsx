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
    primary: '',
    secondary: '',
    outline: 'border',
    ghost: '',
  };

  const sizes = {
    sm: '',
    md: '',
    lg: '',
    full: 'w-full',
  };

  return (
    <button
      className={cn(
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
