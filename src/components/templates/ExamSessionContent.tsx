'use client';

import { BookCopy, Clock3, FileText } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { ExamProgressBar } from '@/components/atoms/ExamProgressBar';
import { ExamMetaPill } from '@/components/molecules/ExamMetaPill';
import { ExamOptionButton } from '@/components/molecules/ExamOptionButton';
import { answerQuestion, selectSubject, startExamSession, submitExam } from '@/features/exam/examSlice';
import { selectExamAnswers, selectExamSetup, selectSessionQuestions, selectSubjectById } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toBengaliDigits } from '@/lib/bengaliDigits';

export function ExamSessionContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));
  const questions = useAppSelector((state) => selectSessionQuestions(state, subjectId));
  const answers = useAppSelector(selectExamAnswers);
  const [clockAssetAvailable, setClockAssetAvailable] = useState(true);
  const [tick, setTick] = useState(0);
  const didSubmit = useRef(false);

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

  const answeredCount = questions.filter((question) => Boolean(answers[question.id])).length;
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;
  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';
  const durationSeconds = (setup.durationMinutes ?? subject?.durationMinutes ?? 30) * 60;

  const remainingSeconds = useMemo(() => {
    if (!setup.startedAt) {
      return durationSeconds;
    }
    const elapsed = Math.max(0, Math.floor((Date.now() - new Date(setup.startedAt).getTime()) / 1000));
    return Math.max(durationSeconds - elapsed, 0);
  }, [durationSeconds, setup.startedAt, tick]);

  useEffect(() => {
    if (!setup.startedAt) return;
    if (remainingSeconds > 0) return;
    if (didSubmit.current) return;
    didSubmit.current = true;
    dispatch(submitExam(subjectId));
    router.replace(`/exams/${subjectId}/result`);
  }, [dispatch, remainingSeconds, router, setup.startedAt, subjectId]);

  useEffect(() => {
    if (!setup.startedAt) return;
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [setup.startedAt]);

  const timeLabel = `${toBengaliDigits(Math.max(0, Math.ceil(remainingSeconds / 60)))} মিনিট`;

  return (
    <main className="min-h-screen w-full overflow-y-auto px-7 pb-10 pt-6 sm:px-8 lg:px-12 lg:pt-8">
      <div className="mx-auto w-full max-w-[880px] lg:mx-0">
        <header>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1 className="font-display-bn text-[20px] font-bold leading-[140%] text-[#101828]">
                মক পরীক্ষা ({subjectTitle})
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ExamMetaPill icon={<FileText className="size-4" strokeWidth={2} />} label="কুইজ" />
                <ExamMetaPill
                  icon={<BookCopy className="size-4" strokeWidth={2} />}
                  label={`${toBengaliDigits(questions.length)} টি প্রশ্ন`}
                />
                <ExamMetaPill
                  icon={<Clock3 className="size-4" strokeWidth={2} />}
                  label={timeLabel}
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

          <ExamProgressBar
            progress={progress}
            showClockAsset={clockAssetAvailable}
            onClockError={() => setClockAssetAvailable(false)}
          />
        </header>

        <section className="mt-6 space-y-7">
          {questions.map((question, idx) => (
            <article key={question.id}>
              <p className="font-display-bn text-[16px] font-semibold leading-[160%] text-[#101828]">
                {toBengaliDigits(idx + 1)}. {question.text}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                {question.options.map((opt) => (
                  <ExamOptionButton
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
