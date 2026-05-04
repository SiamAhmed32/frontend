import React from 'react';

export function ResultMetaPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[#667085]">
      <span className="shrink-0 text-[#667085]">{icon}</span>
      <span className="font-['Hind_Siliguri',sans-serif] text-[15px] font-medium leading-5">{label}</span>
    </div>
  );
}

