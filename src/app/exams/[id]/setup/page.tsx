'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import {
  selectSubject,
  setDurationMinutes,
  setQuestionType,
  toggleTopic,
} from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function ExamSetupPage() {
  const params = useParams<{ id: string }>();
  const subject = useAppSelector((state) => selectSubjectById(state, params.id));
  const setup = useAppSelector(selectExamSetup);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subject && setup.subjectId !== subject.id) {
      dispatch(selectSubject(subject.id));
    }
  }, [dispatch, setup.subjectId, subject]);

  if (!subject) {
    return (
      <AuthGuard>
        <DashboardLayout>
          <p>Subject not found.</p>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <h1>মক টেস্ট &gt; {subject.title}</h1>
        <section>
          <h2>কোন কোন টপিকের উপর পরীক্ষা দিতে চাও?</h2>
          {subject.topics.map((topic) => (
            <label key={topic.id}>
              <input
                type="checkbox"
                checked={setup.selectedTopicIds.includes(topic.id)}
                onChange={() => dispatch(toggleTopic(topic.id))}
              />
              {topic.title}
            </label>
          ))}
        </section>
        <section>
          <h2>প্রশ্নের ধরন</h2>
          <label>
            <input
              type="radio"
              name="questionType"
              checked={setup.questionType === 'mcq'}
              onChange={() => dispatch(setQuestionType('mcq'))}
            />
            MCQ
          </label>
          <label>
            <input
              type="radio"
              name="questionType"
              checked={setup.questionType === 'written'}
              onChange={() => dispatch(setQuestionType('written'))}
            />
            Written
          </label>
        </section>
        <label>
          মোট সময়
          <input
            type="number"
            min={1}
            value={setup.durationMinutes}
            onChange={(event) => dispatch(setDurationMinutes(Number(event.target.value)))}
          />
        </label>
        <Link href={`/exams/${subject.id}/start`}>পরীক্ষা শুরু কর</Link>
      </DashboardLayout>
    </AuthGuard>
  );
}
