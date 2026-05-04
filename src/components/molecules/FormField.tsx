import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}

export const FormField = ({ label, htmlFor, error, className, children }: FormFieldProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      <label
        className="h-5 text-[14px] font-medium leading-5 tracking-[0] text-[#344054]"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-[14px] leading-5 tracking-[0] text-[#BA6262]">
          {error}
        </span>
      )}
    </div>
  );
};
