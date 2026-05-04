'use client';

import {
  ChevronRight,
  Clock3,
  FileText,
} from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResultMetaPill } from '@/components/molecules/ResultMetaPill';
import { ResultSummaryGrid } from '@/components/organisms/ResultSummaryGrid';
import { ResultReviewList } from '@/components/organisms/ResultReviewList';
import { ResultActionButtons } from '@/components/organisms/ResultActionButtons';
import { resetExamSession, selectSubject } from '@/features/exam/examSlice';
import {
  selectExamAnswers,
  selectExamSetup,
  selectResultBySubjectId,
  selectSessionQuestions,
  selectSubjectById,
} from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toBengaliDigits } from '@/lib/bengaliDigits';

const formatMinutes = (seconds: number) => {
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  return `${toBengaliDigits(totalMinutes)} মিনিট`;
};

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
              <ResultMetaPill icon={<FileText className="size-4" strokeWidth={2} />} label="কুইজ" />
              <ResultMetaPill
                icon={<FileText className="size-4" strokeWidth={2} />}
                label={`${toBengaliDigits(totalCount)} প্রশ্ন`}
              />
              <ResultMetaPill
                icon={<Clock3 className="size-4" strokeWidth={2} />}
                label={formatMinutes(timeTaken)}
              />
            </div>
          </header>

          <ResultSummaryGrid
            correctCount={correctCount}
            wrongCount={wrongCount}
            unansweredCount={unansweredCount}
            timeLabel={formatMinutes(timeTaken)}
          />
          <ResultReviewList questions={reviewQuestions} answers={answers} />
          <ResultActionButtons
            onGoDashboard={() => router.push('/dashboard')}
            onRetake={() => {
              dispatch(resetExamSession());
              router.push(`/exams/${subjectId}`);
            }}
          />
        </section>
      </div>
    </main>
  );
}
