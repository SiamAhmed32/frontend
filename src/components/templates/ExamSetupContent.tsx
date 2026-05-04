'use client';

import { ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { selectSubject, setExamStandard } from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type StandardId = 'engineering' | 'main-book' | 'varsity' | 'medical';

const STANDARD_OPTIONS: Array<{ id: StandardId; label: string }> = [
  { id: 'engineering', label: 'ইঞ্জিনিয়ারিং' },
  { id: 'main-book', label: 'মেইন বই' },
  { id: 'varsity', label: 'ভার্সিটি' },
  { id: 'medical', label: 'মেডিকেল' },
];

function StepProgress() {
  return (
    <div className="mt-[13px] grid h-[5px] grid-cols-3 gap-5">
      <span className="h-[5px] rounded-[200px] bg-[#7F56D9]" />
      <span className="h-[5px] rounded-[200px] bg-[#7F56D9]" />
      <span className="h-[5px] rounded-[200px] bg-white/90" />
    </div>
  );
}

function StandardRadioCard({
  checked,
  label,
  onSelect,
}: {
  checked: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={checked}
      className={cn(
        'flex min-h-16 w-full items-center justify-between rounded-2xl border border-white bg-white px-4 py-5 text-left shadow-[0_2px_20.6px_rgba(24,34,41,0.04)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2'
      )}
    >
      <span className="min-w-0 truncate font-display-bn text-[16px] font-medium leading-[140%] text-[#101828]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'relative ml-4 flex size-5 shrink-0 items-center justify-center rounded-full border',
          checked ? 'border-[#7F56D9]' : 'border-[#D0D5DD] bg-white'
        )}
      >
        {checked ? <span className="size-2 rounded-full bg-[#7F56D9]" /> : null}
      </span>
    </button>
  );
}

export default function ExamSetupContent() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-[128px] pt-8 sm:px-8 lg:px-12 lg:pt-[55px]">
      <div className="relative mx-auto w-full max-w-[891px] lg:mx-0">
        <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
          <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">
            পরীক্ষা দাও
          </span>
          <ChevronRight className="size-5 text-[#242424]" />
          <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
            {subjectTitle}
          </span>
        </div>

        <section className="mt-4">
          <div className="flex min-h-[25px] items-center justify-between gap-4">
            <h1 className="font-display-bn text-[18px] font-semibold leading-[140%] text-[#101828]">
              প্রশ্নের স্ট্যান্ডার্ড?
            </h1>
            <span className="shrink-0 font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
              ২/৩ স্টেপ
            </span>
          </div>
          <StepProgress />
        </section>

        <section className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {STANDARD_OPTIONS.map((option) => (
            <StandardRadioCard
              key={option.id}
              label={option.label}
              checked={setup.standard === option.id}
              onSelect={() => dispatch(setExamStandard(option.id))}
            />
          ))}
        </section>
      </div>

      <FixedBottomActionBar
        className="lg:left-[283px]"
        right={
          <Button
            type="button"
            size="full"
            onClick={() => router.push(`/exams/${subjectId}/confirm`)}
            className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#7311A0] px-5 py-4 font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#681091] sm:w-[251px]"
          >
            এগিয়ে যাও
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        }
      />
    </main>
  );
}
