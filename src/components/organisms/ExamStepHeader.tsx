import { ChevronRight } from 'lucide-react';
import { StepProgress } from '@/components/atoms/StepProgress';

export function ExamStepHeader({
  sectionLabel,
  subjectTitle,
  title,
  stepLabel,
  activeStepCount,
}: {
  sectionLabel: string;
  subjectTitle: string;
  title: string;
  stepLabel: string;
  activeStepCount: number;
}) {
  return (
    <>
      <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
        <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">{sectionLabel}</span>
        <ChevronRight className="size-5 text-[#242424]" />
        <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
          {subjectTitle}
        </span>
      </div>

      <section className="mt-4">
        <div className="flex min-h-[25px] items-center justify-between gap-4">
          <h1 className="font-display-bn text-[18px] font-semibold leading-[140%] text-[#101828]">{title}</h1>
          <span className="shrink-0 font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
            {stepLabel}
          </span>
        </div>
        <StepProgress activeCount={activeStepCount} />
      </section>
    </>
  );
}

