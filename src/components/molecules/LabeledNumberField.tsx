import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/atoms/Input';

interface LabeledNumberFieldProps {
  className?: string;
  id: string;
  label: string;
  helperText?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function LabeledNumberField({
  className,
  id,
  label,
  helperText,
  value,
  min = 1,
  max = 100,
  onChange,
}: LabeledNumberFieldProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex w-full flex-col gap-2 font-display-bn text-[14px] font-normal leading-[20px] text-[#475467]',
        className
      )}
    >
      {label}
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : 12}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-10 rounded-[8px] border border-[#D0D5DD] bg-white px-3 font-['Inter'] text-[14px] leading-[20px] text-[#101828] outline-none transition focus:border-[#7F56D9]"
      />
      {helperText ? (
        <span className="font-display-bn text-[12px] leading-4 text-[#667085]">{helperText}</span>
      ) : null}
    </label>
  );
}
