import { ChevronDown } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="relative h-11 w-full">
        <select
          ref={ref}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 pr-10 text-[16px] leading-[24px] tracking-[0] text-[#667085] shadow-[0_1px_2px_0_rgba(16,24,40,0.05),inset_0_-2px_0_0_rgba(16,24,40,0.05),inset_0_0_0_1px_rgba(16,24,40,0.18)] outline-none',
            error && 'border-[#BA6262]',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-[14px] top-1/2 h-3 w-3 -translate-y-1/2 text-[#101828]"
          strokeWidth={2}
        />
      </div>
    );
  }
);

Select.displayName = 'Select';
