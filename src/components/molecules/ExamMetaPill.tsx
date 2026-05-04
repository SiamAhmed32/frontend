import React from 'react';

export function ExamMetaPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[#667085]">
      <span className="shrink-0 text-[#667085]">{icon}</span>
      <span className="font-display-bn text-[14px] font-normal leading-5">{label}</span>
    </div>
  );
}

