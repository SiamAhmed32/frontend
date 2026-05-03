'use client';

import Link from 'next/link';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { selectSubject } from '@/features/exam/examSlice';
import { selectExamSubjects } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function ExamsPage() {
  const subjects = useAppSelector(selectExamSubjects);
  const dispatch = useAppDispatch();

  return (
    <AuthGuard>
      <DashboardLayout>
        <h1>পরীক্ষা দাও</h1>
        <p>কি বিষয়ে পরীক্ষা দিতে চাও?</p>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id}>
              <Link href={`/exams/${subject.id}/setup`} onClick={() => dispatch(selectSubject(subject.id))}>
                {subject.iconLabel} {subject.title}
              </Link>
            </li>
          ))}
        </ul>
      </DashboardLayout>
    </AuthGuard>
  );
}
