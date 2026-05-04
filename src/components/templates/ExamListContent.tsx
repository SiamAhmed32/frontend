'use client';

import { SubjectExamCard } from '@/components/molecules/SubjectExamCard';
import { ExamListHeader } from '@/components/organisms/ExamListHeader';
import { selectSubject } from '@/features/exam/examSlice';
import { selectExamListCards } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function ExamListContent() {
  const listCards = useAppSelector(selectExamListCards);
  const dispatch = useAppDispatch();

  return (
    <main className="min-h-screen w-full overflow-y-auto px-5 pb-12 pt-14 sm:px-8 lg:px-10 xl:px-[54px]">
      <div className="mx-auto w-full max-w-[885px] lg:mx-0">
        <ExamListHeader />

        <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-3 lg:gap-y-4">
          {listCards.map((card) => (
            <SubjectExamCard
              key={card.id}
              href={`/exams/${card.subjectId}/setup`}
              title={card.title}
              iconSrc={card.emojiFile}
              onSelect={() => dispatch(selectSubject(card.subjectId))}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
