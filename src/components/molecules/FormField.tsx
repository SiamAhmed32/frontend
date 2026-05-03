import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}

export const FormField = ({ label, error, className, children }: FormFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <label className="text-sm font-semibold text-gray-700 ml-1">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs font-medium text-red-500 ml-1 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};
