'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import {
  selectExamAnswers,
  selectResultBySubjectId,
  selectSubjectById,
} from '@/features/exam/selectors';
import { useAppSelector } from '@/store/hooks';

export default function ExamResultPage() {
  const params = useParams<{ id: string }>();
  const subject = useAppSelector((state) => selectSubjectById(state, params.id));
  const result = useAppSelector((state) => selectResultBySubjectId(state, params.id));
  const answers = useAppSelector(selectExamAnswers);

  if (!subject || !result) {
    return (
      <AuthGuard>
        <DashboardLayout>
          <p>No result found.</p>
          <Link href="/exams">Back to exams</Link>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <h1>চক পরীক্ষা ({subject.title})</h1>
        <dl>
          <dt>সঠিক উত্তর</dt>
          <dd>{result.correct}</dd>
          <dt>ভুল উত্তর</dt>
          <dd>{result.wrong}</dd>
          <dt>উত্তর দেয়নি</dt>
          <dd>{result.unanswered}</dd>
          <dt>স্কোর</dt>
          <dd>
            {result.score}/{result.totalQuestions}
          </dd>
        </dl>
        <h2>সঠিক/ভুল উত্তর দেখে নাও</h2>
        {subject.questions.map((question, index) => {
          const selectedOptionId = answers[question.id];
          const selectedOption = question.options.find((option) => option.id === selectedOptionId);
          const correctOption = question.options.find(
            (option) => option.id === question.correctOptionId
          );

          return (
            <section key={question.id}>
              <h3>
                {index + 1}. {question.text}
              </h3>
              <p>Your answer: {selectedOption?.label ?? 'Not answered'}</p>
              <p>Correct answer: {correctOption?.label}</p>
            </section>
          );
        })}
        <Link href="/exams">আরেকটি পরীক্ষা দাও</Link>
      </DashboardLayout>
    </AuthGuard>
  );
}
