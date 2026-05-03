'use client';

import { useParams, useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { answerQuestion, submitExam } from '@/features/exam/examSlice';
import { selectExamAnswers, selectSubjectById } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function ExamStartPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const subject = useAppSelector((state) => selectSubjectById(state, params.id));
  const answers = useAppSelector(selectExamAnswers);
  const dispatch = useAppDispatch();

  if (!subject) {
    return (
      <AuthGuard>
        <DashboardLayout>
          <p>Subject not found.</p>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  const handleSubmit = () => {
    dispatch(submitExam(subject.id));
    router.push(`/exams/${subject.id}/result`);
  };

  return (
    <AuthGuard>
      <DashboardLayout>
        <h1>মক পরীক্ষা ({subject.title})</h1>
        <p>
          {subject.questions.length} কুইজ | {subject.durationMinutes} মিনিট
        </p>
        {subject.questions.map((question, index) => (
          <section key={question.id}>
            <h2>
              {index + 1}. {question.text}
            </h2>
            {question.options.map((option) => (
              <label key={option.id}>
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option.id}
                  onChange={() =>
                    dispatch(answerQuestion({ questionId: question.id, optionId: option.id }))
                  }
                />
                {option.label}
              </label>
            ))}
          </section>
        ))}
        <button type="button" onClick={handleSubmit}>
          সাবমিট কর
        </button>
      </DashboardLayout>
    </AuthGuard>
  );
}
