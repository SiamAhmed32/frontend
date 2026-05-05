'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExamSessionHeader } from '@/components/organisms/ExamSessionHeader';
import { ExamQuestionList } from '@/components/organisms/ExamQuestionList';
import { answerQuestion, selectSubject, startExamSession, submitExam } from '@/features/exam/examSlice';
import { selectExamAnswers, selectExamSetup, selectSessionQuestions, selectSubjectById } from '@/features/exam/selectors';
import { useExamTimer } from '@/features/exam/useExamTimer';
import { formatBengaliCountdown } from '@/lib/bengaliDigits';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

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
  const { remainingSeconds } = useExamTimer({
    durationMinutes: setup.durationMinutes ?? subject?.durationMinutes ?? 30,
    startedAt: setup.startedAt,
    subjectId,
    onExpired: () => router.replace(`/exams/${subjectId}/result`),
  });

  return (
    <main className="min-h-screen w-full overflow-y-auto px-7 pb-10 pt-6 sm:px-8 lg:px-12 lg:pt-8">
      <div className="mx-auto w-full max-w-[880px]">
        <ExamSessionHeader
          subjectTitle={subject?.title ?? 'পদার্থবিজ্ঞান'}
          questionCount={questions.length}
          timeLabel={formatBengaliCountdown(remainingSeconds)}
          progress={progress}
          showClockAsset={clockAssetAvailable}
          onClockError={() => setClockAssetAvailable(false)}
          onSubmit={() => {
            dispatch(submitExam(subjectId));
            router.push(`/exams/${subjectId}/result`);
          }}
        />
        <ExamQuestionList questions={questions} answers={answers} onSelect={(questionId, optionId) => dispatch(answerQuestion({ questionId, optionId }))} />
      </div>
    </main>
  );
}
