'use client';

import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { StepProgress } from '@/components/atoms/StepProgress';
import { LabeledNumberField } from '@/components/molecules/LabeledNumberField';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { TopicSelectionCard } from '@/components/organisms/TopicSelectionCard';
import { selectSubject, setQuestionCount } from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { getAvailableQuestionCount } from '@/features/exam/sessionQuestions';
import { getDefaultTopicSelectionForSubject, getTopicTreeForSubject } from '@/features/exam/topicTree';
import { useTopicSelection } from '@/features/exam/useTopicSelection';
import { toBengaliDigits } from '@/lib/bengaliDigits';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const paperTitle = (groupCount: number, index: number, fallback: string) => {
  if (groupCount === 1) return fallback;
  return index === 0 ? '১ম পত্র' : '২য় পত্র';
};

export function ExamTopicSelectContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';
  const topicGroups = getTopicTreeForSubject(subjectId);
  const allTopicIds = getDefaultTopicSelectionForSubject(subjectId);
  const selectedTopicIds = setup.selectedTopicIds.filter((topicId) => allTopicIds.includes(topicId));
  const availableQuestionCount = subject
    ? getAvailableQuestionCount(subject, selectedTopicIds)
    : 1;
  const { expandedIds, toggleTopic, togglePaper, toggleExpand } = useTopicSelection(allTopicIds, selectedTopicIds);

  useEffect(() => {
    if (setup.questionCount > availableQuestionCount) {
      dispatch(setQuestionCount(availableQuestionCount));
    }
  }, [availableQuestionCount, dispatch, setup.questionCount]);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-[142px] pt-8 sm:px-8 lg:px-12 lg:pt-[55px]">
      <div className="relative mx-auto w-full max-w-[997px]">
        <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
          <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">পরীক্ষা দাও</span>
          <ChevronRight className="size-5 text-[#242424]" />
          <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">{subjectTitle}</span>
        </div>

        <section className="mt-4">
          <div className="flex min-h-[25px] items-start justify-between gap-4">
            <h1 className="font-display-bn text-[18px] font-semibold leading-[140%] text-[#101828]">
              কোন কোন টপিকের উপর পরীক্ষা দিতে চাও ?
            </h1>
            <span className="shrink-0 font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">১/৩ স্টেপ</span>
          </div>
          <StepProgress activeCount={1} />
        </section>

        <div className="mt-4 grid gap-6 xl:grid-cols-2 xl:px-10 xl:py-5">
          {topicGroups.map((topics, index) => (
            <TopicSelectionCard
              key={`${subjectId}-${index}`}
              title={paperTitle(topicGroups.length, index, subjectTitle)}
              topics={topics}
              selectedTopicIds={selectedTopicIds}
              expandedIds={expandedIds}
              onToggleExpand={toggleExpand}
              onTogglePaper={togglePaper}
              onToggleTopic={toggleTopic}
              className="xl:min-h-[545px]"
            />
          ))}
        </div>
      </div>

      <FixedBottomActionBar
        className="lg:left-[283px]"
        left={
          <LabeledNumberField
            id="question-count"
            label="প্রশ্ন সংখ্যা"
            helperText={`৫ থেকে সর্বোচ্চ ${toBengaliDigits(availableQuestionCount)}টি প্রশ্ন নেওয়া যাবে`}
            value={setup.questionCount ?? 12}
            min={5}
            max={availableQuestionCount}
            onChange={(value) => dispatch(setQuestionCount(value))}
          />
        }
        right={
          <Button
            type="button"
            size="full"
            className="h-[54px] rounded-[10px] bg-[#7311A0] px-5 py-4 font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#681091] sm:w-[251px]"
            onClick={() => router.push(`/exams/${subjectId}/standard`)}
          >
            এগিয়ে যাও
          </Button>
        }
      />
    </main>
  );
}
