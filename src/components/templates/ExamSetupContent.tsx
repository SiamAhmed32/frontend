'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { ExamStepHeader } from '@/components/organisms/ExamStepHeader';
import { StandardSelectionGrid } from '@/components/organisms/StandardSelectionGrid';
import { selectSubject, setExamStandard } from '@/features/exam/examSlice';
import type { StandardId } from '@/features/exam/standards';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function ExamSetupContent() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-[128px] pt-8 sm:px-8 lg:px-12 lg:pt-[55px]">
      <div className="relative mx-auto w-full max-w-[891px] lg:mx-0">
        <ExamStepHeader
          sectionLabel="পরীক্ষা দাও"
          subjectTitle={subjectTitle}
          title="প্রশ্নের স্ট্যান্ডার্ড?"
          stepLabel="২/৩ স্টেপ"
          activeStepCount={2}
        />
        <StandardSelectionGrid
          value={setup.standard as StandardId}
          onChange={(value) => dispatch(setExamStandard(value))}
        />
      </div>

      <FixedBottomActionBar
        className="lg:left-[283px]"
        right={
          <Button
            type="button"
            size="full"
            onClick={() => router.push(`/exams/${subjectId}/confirm`)}
            className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#7311A0] px-5 py-4 font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#681091] sm:w-[251px]"
          >
            এগিয়ে যাও
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        }
      />
    </main>
  );
}
