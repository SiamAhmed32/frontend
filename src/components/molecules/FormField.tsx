import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}

export const FormField = ({ label, error, className, children }: FormFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <label>
        {label}
      </label>
      {children}
      {error && (
        <span>
          {error}
        </span>
      )}
    </div>
  );
};
