'use client';

import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { StepProgress } from '@/components/atoms/StepProgress';
import { LabeledNumberField } from '@/components/molecules/LabeledNumberField';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { TopicSelectionCard } from '@/components/organisms/TopicSelectionCard';
import { selectSubject, setQuestionCount, setSelectedTopics } from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import {
  ALL_PHYSICS_TOPIC_SELECTION_IDS,
  firstPaperTopics,
  secondPaperTopics,
  type TopicNode,
} from '@/features/exam/topicTree';
import { collectTopicIds } from '@/features/exam/topicSelectionUtils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const allTopicIds = ALL_PHYSICS_TOPIC_SELECTION_IDS;

export function ExamTopicSelectContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));
  const [expandedIds, setExpandedIds] = useState(['first-vector']);

  useEffect(() => {
    // Always reset selection when entering step-1 route.
    dispatch(selectSubject(subjectId));
  }, [dispatch, subjectId]);

  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';
  const selectedTopicIds = setup.selectedTopicIds.filter((topicId) => allTopicIds.includes(topicId));

  const setTopics = (topicIds: string[]) => {
    const nextTopicIds = Array.from(new Set(topicIds.filter((topicId) => allTopicIds.includes(topicId))));
    dispatch(setSelectedTopics(nextTopicIds));
  };

  const toggleTopic = (topic: TopicNode) => {
    const ids = topic.children ? collectTopicIds(topic.children) : [topic.id];
    const selected = ids.every((topicId) => selectedTopicIds.includes(topicId));

    setTopics(
      selected
        ? selectedTopicIds.filter((topicId) => !ids.includes(topicId))
        : [...selectedTopicIds, ...ids]
    );
  };

  const togglePaper = (topics: TopicNode[]) => {
    const ids = collectTopicIds(topics);
    const selected = ids.every((topicId) => selectedTopicIds.includes(topicId));

    setTopics(
      selected
        ? selectedTopicIds.filter((topicId) => !ids.includes(topicId))
        : [...selectedTopicIds, ...ids]
    );
  };

  const toggleExpand = (topicId: string) => {
    setExpandedIds((currentIds) =>
      currentIds.includes(topicId)
        ? currentIds.filter((currentId) => currentId !== topicId)
        : [...currentIds, topicId]
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-[142px] pt-8 sm:px-8 lg:px-12 lg:pt-[55px]">
      <div className="relative mx-auto w-full max-w-[997px] lg:mx-0">
        <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
          <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">
            পরীক্ষা দাও
          </span>
          <ChevronRight className="size-5 text-[#242424]" />
          <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
            {subjectTitle}
          </span>
        </div>

        <section className="mt-4">
          <div className="flex min-h-[25px] items-start justify-between gap-4">
            <h1 className="font-display-bn text-[18px] font-semibold leading-[140%] text-[#101828]">
              কোন কোন টপিকের উপর পরীক্ষা দিতে চাও ?
            </h1>
            <span className="shrink-0 font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
              ১/৩ স্টেপ
            </span>
          </div>
          <StepProgress activeCount={1} />
        </section>

        <div className="mt-4 grid gap-6 xl:grid-cols-2 xl:px-10 xl:py-5">
          <TopicSelectionCard
            title="১ম পত্র"
            topics={firstPaperTopics}
            selectedTopicIds={selectedTopicIds}
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
            onTogglePaper={togglePaper}
            onToggleTopic={toggleTopic}
            className="xl:min-h-[861px]"
          />
          <TopicSelectionCard
            title="২য় পত্র"
            topics={secondPaperTopics}
            selectedTopicIds={selectedTopicIds}
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
            onTogglePaper={togglePaper}
            onToggleTopic={toggleTopic}
            className="xl:min-h-[545px]"
          />
        </div>
      </div>

      <FixedBottomActionBar
        className="lg:left-[283px]"
        left={
          <LabeledNumberField
            id="question-count"
            label="প্রশ্ন সংখ্যা"
            value={setup.questionCount ?? 12}
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
            এগিয়ে যাও
          </Button>
        }
      />
    </main>
  );
}

