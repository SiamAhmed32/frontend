import React from 'react';
import { Info } from 'lucide-react';

export function SummaryCard({
  icon,
  title,
  value,
  iconBg,
  valueColor = '#1C1C1C',
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
  valueColor?: string;
}) {
  return (
    <div className="flex min-h-[71px] items-center justify-between gap-4 border border-[#F2F4F7] bg-white px-6 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-4">
        <span className="flex size-8 items-center justify-center rounded-full" style={{ backgroundColor: iconBg }}>
          {icon}
        </span>

        <div>
          <p className="font-['Hind_Siliguri',sans-serif] text-[15px] font-medium leading-5 text-[#575757]">
            {title}
          </p>
          <p className="font-display-bn text-[16px] font-bold leading-6" style={{ color: valueColor }}>
            {value}
          </p>
        </div>
      </div>

      <Info className="size-4 text-[#98A2B3]" />
    </div>
  );
}

