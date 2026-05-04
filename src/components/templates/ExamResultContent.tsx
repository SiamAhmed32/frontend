'use client';

import {
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  FileText,
  Info,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { resetExamSession, selectSubject } from '@/features/exam/examSlice';
import {
  selectExamAnswers,
  selectExamSetup,
  selectResultBySubjectId,
  selectSessionQuestions,
  selectSubjectById,
} from '@/features/exam/selectors';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const toBengaliDigits = (value: number) =>
  value.toString().replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] ?? digit);

const formatMinutes = (seconds: number) => {
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  return `${toBengaliDigits(totalMinutes)} মিনিট`;
};

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
      <span className="font-['Hind_Siliguri',sans-serif] text-[15px] font-medium leading-5">{label}</span>
    </div>
  );
}

function SummaryCard({
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

function ReviewedOption({
  label,
  isCorrect,
  isWrongSelection,
}: {
  label: string;
  isCorrect: boolean;
  isWrongSelection: boolean;
}) {
  const isHighlighted = isCorrect || isWrongSelection;

  return (
    <div
      className={cn(
        'flex min-h-[48px] items-center gap-4 rounded-[16px] border bg-white px-5 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
        isCorrect && 'border-[#079455] bg-[#ECFDF3]',
        isWrongSelection && 'border-[#FDA29B] bg-[#FEF3F2]',
        !isHighlighted && 'border-white'
      )}
    >
      {isCorrect ? (
        <span className="flex size-5 items-center justify-center rounded-full bg-[#079455] text-white">
          <CheckCircle2 className="size-4" strokeWidth={2.5} />
        </span>
      ) : isWrongSelection ? (
        <span className="flex size-5 items-center justify-center rounded-full bg-[#F04438] text-white">
          <XCircle className="size-4" strokeWidth={2.5} />
        </span>
      ) : (
        <Circle className="size-5 text-[#101828]" strokeWidth={1.7} />
      )}

      <span className="font-['Inter',sans-serif] text-[16px] font-normal leading-6 text-[#344054]">{label}</span>
    </div>
  );
}

export function ExamResultContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));
  const result = useAppSelector((state) => selectResultBySubjectId(state, subjectId));
  const answers = useAppSelector(selectExamAnswers);
  const sessionQuestions = useAppSelector((state) => selectSessionQuestions(state, subjectId));

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  const questions = subject?.questions ?? [];
  const reviewQuestions = result?.questionIds?.length
    ? questions.filter((q) => result.questionIds?.includes(q.id))
    : sessionQuestions.length
      ? sessionQuestions
      : questions;
  const correctCount = reviewQuestions.filter(
    (question) => answers[question.id] === question.correctOptionId
  ).length;
  const answeredCount = reviewQuestions.filter((question) => Boolean(answers[question.id])).length;
  const wrongCount = answeredCount - correctCount;
  const unansweredCount = reviewQuestions.length - answeredCount;
  const totalCount = reviewQuestions.length;
  const timeTaken = result?.timeTakenSeconds ?? (setup.durationMinutes || 30) * 60;

  return (
    <main className="min-h-screen w-full overflow-y-auto px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-[55px]">
      <div className="mx-auto w-full max-w-[891px]">
        <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
          <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">মক পরীক্ষা</span>
          <ChevronRight className="size-5 text-[#242424]" />
          <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
            {subject?.title ?? 'পদার্থবিজ্ঞান'}
          </span>
        </div>

        <section className="mt-6 rounded-[20px] border border-white bg-[rgba(246,246,246,0.8)] px-[30px] py-6 shadow-[0_2px_20.6px_rgba(24,34,41,0.04)] backdrop-blur-[10px]">
          <header>
            <h1 className="font-display-bn text-[20px] font-bold leading-[150%] text-[#1C1C1C]">
              মক পরীক্ষা ({subject?.title ?? 'পদার্থবিজ্ঞান'})
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
              <MetaPill icon={<FileText className="size-4" strokeWidth={2} />} label="কুইজ" />
              <MetaPill
                icon={<FileText className="size-4" strokeWidth={2} />}
                label={`${toBengaliDigits(totalCount)} প্রশ্ন`}
              />
              <MetaPill
                icon={<Clock3 className="size-4" strokeWidth={2} />}
                label={formatMinutes(timeTaken)}
              />
            </div>
          </header>

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
              value={formatMinutes(timeTaken)}
              iconBg="#D1E9FF"
            />
          </div>

          <div className="mt-6">
            <h2 className="font-display-bn text-[18px] font-bold leading-[150%] text-[#1C1C1C]">
              সঠিক/ভুল উত্তর দেখে নাও
            </h2>

            <div className="mt-4 space-y-8">
              {reviewQuestions.map((question, index) => {
                const selectedOptionId = answers[question.id];

                return (
                  <article key={question.id}>
                    <p className="font-display-bn text-[16px] font-semibold leading-[160%] text-[#1C1C1C]">
                      {toBengaliDigits(index + 1)}. {question.text}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => (
                        <ReviewedOption
                          key={option.id}
                          label={option.label}
                          isCorrect={option.id === question.correctOptionId}
                          isWrongSelection={
                            selectedOptionId === option.id && option.id !== question.correctOptionId
                          }
                        />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              size="full"
              className="h-11 rounded-[10px] bg-[#7311A0] font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#681091] sm:w-[220px]"
              onClick={() => router.push('/dashboard')}
            >
              ড্যাশবোর্ডে যাও
            </Button>

            <Button
              type="button"
              size="full"
              className="h-11 rounded-[10px] border border-[#D0D5DD] bg-white font-display-bn text-[16px] font-bold leading-6 text-[#101828] hover:bg-[#F9FAFB] sm:w-[220px]"
              onClick={() => {
                dispatch(resetExamSession());
                router.push(`/exams/${subjectId}`);
              }}
            >
              <RotateCcw className="size-4" />
              আবার দাও
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
