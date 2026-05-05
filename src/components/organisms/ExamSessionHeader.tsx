import { BookCopy, Clock3, FileText } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { ExamProgressBar } from '@/components/atoms/ExamProgressBar';
import { ExamMetaPill } from '@/components/molecules/ExamMetaPill';
import { toBengaliDigits } from '@/lib/bengaliDigits';

export function ExamSessionHeader({
  subjectTitle,
  questionCount,
  timeLabel,
  progress,
  showClockAsset,
  onClockError,
  onSubmit,
}: {
  subjectTitle: string;
  questionCount: number;
  timeLabel: string;
  progress: number;
  showClockAsset: boolean;
  onClockError: () => void;
  onSubmit: () => void;
}) {
  return (
    <header>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="font-display-bn text-[20px] font-bold leading-[140%] text-[#101828]">মক পরীক্ষা ({subjectTitle})</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ExamMetaPill icon={<FileText className="size-4" strokeWidth={2} />} label="কুইজ" />
            <ExamMetaPill icon={<BookCopy className="size-4" strokeWidth={2} />} label={`${toBengaliDigits(questionCount)} টি প্রশ্ন`} />
            <ExamMetaPill icon={<Clock3 className="size-4" strokeWidth={2} />} label={timeLabel} />
          </div>
        </div>

        <Button
          type="button"
          className="h-12 rounded-[12px] bg-[#7F56D9] px-8 font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#7047CE] lg:min-w-[193px]"
          onClick={onSubmit}
        >
          সাবমিট কর
        </Button>
      </div>

      <ExamProgressBar progress={progress} showClockAsset={showClockAsset} onClockError={onClockError} />
    </header>
  );
}
