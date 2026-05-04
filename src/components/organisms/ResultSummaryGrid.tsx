import { CheckCircle2, Circle, Clock3, XCircle } from 'lucide-react';
import { SummaryCard } from '@/components/molecules/SummaryCard';
import { toBengaliDigits } from '@/lib/bengaliDigits';

export function ResultSummaryGrid({
  correctCount,
  wrongCount,
  unansweredCount,
  timeLabel,
}: {
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  timeLabel: string;
}) {
  return (
    <div className="mt-6 grid gap-0 overflow-hidden rounded-[16px] border border-white bg-white sm:grid-cols-2">
      <SummaryCard
        icon={<CheckCircle2 className="size-4 text-[#079455]" strokeWidth={2.6} />}
        title="সঠিক উত্তর"
        value={`${toBengaliDigits(correctCount)} টি`}
        iconBg="#D1FADF"
      />
      <SummaryCard
        icon={<XCircle className="size-4 text-[#F04438]" strokeWidth={2.6} />}
        title="ভুল উত্তর"
        value={`${toBengaliDigits(wrongCount)} টি`}
        iconBg="#FEE4E2"
      />
      <SummaryCard
        icon={<Circle className="size-4 text-[#F79009]" strokeWidth={2.6} />}
        title="উত্তর দেয়নি"
        value={`${toBengaliDigits(unansweredCount)} টি`}
        iconBg="#FEF0C7"
      />
      <SummaryCard
        icon={<Clock3 className="size-4 text-[#2E90FA]" strokeWidth={2.6} />}
        title="সময় নিয়েছে"
        value={timeLabel}
        iconBg="#D1E9FF"
      />
    </div>
  );
}

