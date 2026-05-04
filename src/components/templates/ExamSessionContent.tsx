'use client';

import { BookCopy, Clock3, FileText } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { answerQuestion, selectSubject, startExamSession, submitExam } from '@/features/exam/examSlice';
import { selectExamAnswers, selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const toBengaliDigits = (value: number) =>
  value.toString().replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[Number(digit)] ?? digit);

function MetaPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[#667085]">
      <span className="shrink-0 text-[#667085]">{icon}</span>
      <span className="font-display-bn text-[14px] font-normal leading-5">{label}</span>
    </div>
  );
}

function ExamProgressBar({ progress }: { progress: number }) {
  const clamped = Math.max(0, Math.min(progress, 100));

  return (
    <div className="relative mt-6 h-[5px] w-full rounded-[200px] bg-[#D0D5DD]">
      <div
        className="h-[5px] rounded-[200px] bg-[#7F56D9] transition-[width]"
        style={{ width: `${clamped}%` }}
      />
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7F56D9] p-1 shadow-[0_2px_10px_rgba(127,86,217,0.35)]"
        style={{ left: `${clamped}%` }}
      >
        <Clock3 className="size-4 text-white" strokeWidth={2.4} />
      </div>
    </div>
  );
}

function OptionButton({
  active,
  label,
  onSelect,
}: {
  active: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex min-h-[44px] w-full items-center gap-4 rounded-[14px] border border-white bg-white px-6 py-3 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2',
        active ? 'ring-1 ring-[#12B76A]/20' : 'hover:border-[#EAECF0]'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border',
          active ? 'border-[#12B76A]' : 'border-[#101828]'
        )}
      >
        {active ? <span className="size-2.5 rounded-full bg-[#12B76A]" /> : null}
      </span>
      <span className="font-['Inter',sans-serif] text-[16px] font-normal leading-6 text-[#344054]">
        {label}
      </span>
    </button>
  );
}

export function ExamSessionContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));
  const answers = useAppSelector(selectExamAnswers);

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  useEffect(() => {
    if (setup.subjectId === subjectId && !setup.startedAt) {
      dispatch(startExamSession());
    }
  }, [dispatch, setup.startedAt, setup.subjectId, subjectId]);

  const questions = subject?.questions ?? [];

  const answeredCount = questions.filter((question) => Boolean(answers[question.id])).length;
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;
  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';

  return (
    <main className="min-h-screen w-full overflow-y-auto px-7 pb-14 pt-8 sm:px-8 lg:px-12 lg:pt-10">
      <div className="mx-auto w-full max-w-[880px] lg:mx-0">
        <header>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1 className="font-display-bn text-[20px] font-bold leading-[140%] text-[#101828]">
                মক পরীক্ষা ({subjectTitle})
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                <MetaPill icon={<FileText className="size-4" strokeWidth={2} />} label="কুইজ" />
                <MetaPill
                  icon={<BookCopy className="size-4" strokeWidth={2} />}
                  label={`${toBengaliDigits(questions.length)} টি প্রশ্ন`}
                />
                <MetaPill
                  icon={<Clock3 className="size-4" strokeWidth={2} />}
                  label={`${toBengaliDigits(setup.durationMinutes ?? 30)} মিনিট`}
                />
              </div>
            </div>

            <Button
              type="button"
              className="h-12 rounded-[12px] bg-[#7F56D9] px-8 font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#7047CE] lg:min-w-[193px]"
              onClick={() => {
                dispatch(submitExam(subjectId));
                router.push(`/exams/${subjectId}/result`);
              }}
            >
              সাবমিট কর
            </Button>
          </div>

          <ExamProgressBar progress={progress || 55} />
        </header>

        <section className="mt-8 space-y-10">
          {questions.map((question, idx) => (
            <article key={question.id}>
              <p className="font-display-bn text-[16px] font-semibold leading-[160%] text-[#101828]">
                {toBengaliDigits(idx + 1)}. {question.text}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                {question.options.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    label={opt.label}
                    active={answers[question.id] === opt.id}
                    onSelect={() => dispatch(answerQuestion({ questionId: question.id, optionId: opt.id }))}
                  />
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
