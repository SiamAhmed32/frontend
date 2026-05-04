'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { CheckToggle } from '@/components/atoms/CheckToggle';
import { LabeledNumberField } from '@/components/molecules/LabeledNumberField';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { selectSubject, setQuestionCount, setSelectedTopics } from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import {
  ALL_PHYSICS_TOPIC_SELECTION_IDS,
  firstPaperTopics,
  secondPaperTopics,
  type TopicNode,
} from '@/features/exam/topicTree';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const cardSurface = {
  background:
    'linear-gradient(rgba(255, 255, 255, 0.29), rgba(255, 255, 255, 0.29)) padding-box, linear-gradient(5.34deg, #FFFFFF 17.54%, rgba(255, 255, 255, 0.3) 45.99%, #FFFFFF 80.02%) border-box',
  border: '1.03px solid transparent',
  backdropFilter: 'blur(20px)',
} satisfies CSSProperties;

const collectTopicIds = (topics: TopicNode[]): string[] =>
  topics.flatMap((topic) => [
    topic.id,
    ...(topic.children ? collectTopicIds(topic.children) : []),
  ]);

const allTopicIds = ALL_PHYSICS_TOPIC_SELECTION_IDS;

function StepProgress() {
  return (
    <div className="mt-[13px] grid h-[5px] grid-cols-3 gap-5">
      <span className="h-[5px] rounded-[200px] bg-[#7F56D9]" />
      <span className="h-[5px] rounded-[200px] bg-white/90" />
      <span className="h-[5px] rounded-[200px] bg-white/90" />
    </div>
  );
}

function TopicRow({
  depth = 0,
  expandedIds,
  onToggleExpand,
  onToggleTopic,
  selectedTopicIds,
  topic,
}: {
  depth?: number;
  expandedIds: string[];
  onToggleExpand: (topicId: string) => void;
  onToggleTopic: (topic: TopicNode) => void;
  selectedTopicIds: string[];
  topic: TopicNode;
}) {
  const childIds = topic.children ? collectTopicIds(topic.children) : [];
  const hasChildren = childIds.length > 0;
  const checked = hasChildren
    ? childIds.every((topicId) => selectedTopicIds.includes(topicId))
    : selectedTopicIds.includes(topic.id);
  const expanded = hasChildren ? expandedIds.includes(topic.id) : false;

  return (
    <div>
      <div className="flex min-h-[43px] w-full items-center justify-between gap-3 border-b border-[#EAECF0]/70 px-4">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 py-2 text-left font-display-bn text-[14px] font-semibold leading-[140%] text-[#101828] outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
          style={{ paddingLeft: depth ? 24 : 0 }}
          onClick={() => (hasChildren ? onToggleExpand(topic.id) : onToggleTopic(topic))}
          aria-expanded={hasChildren ? expanded : undefined}
        >
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="size-4 shrink-0 text-[#242424]" />
            ) : (
              <ChevronRight className="size-4 shrink-0 text-[#242424]" />
            )
          ) : (
            <ChevronDown className="size-4 shrink-0 text-[#242424]" />
          )}
          <span className="min-w-0 truncate">{topic.label}</span>
        </button>
        <span aria-hidden="true">
          <CheckToggle checked={checked} onClick={() => onToggleTopic(topic)} />
        </span>
      </div>
      {expanded
        ? topic.children?.map((child) => (
            <TopicRow
              key={child.id}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onToggleTopic={onToggleTopic}
              selectedTopicIds={selectedTopicIds}
              topic={child}
            />
          ))
        : null}
    </div>
  );
}

function TopicCard({
  className,
  expandedIds,
  onToggleExpand,
  onTogglePaper,
  onToggleTopic,
  selectedTopicIds,
  title,
  topics,
}: {
  className?: string;
  expandedIds: string[];
  onToggleExpand: (topicId: string) => void;
  onTogglePaper: (topics: TopicNode[]) => void;
  onToggleTopic: (topic: TopicNode) => void;
  selectedTopicIds: string[];
  title: string;
  topics: TopicNode[];
}) {
  const paperTopicIds = useMemo(() => collectTopicIds(topics), [topics]);
  const checked = paperTopicIds.every((topicId) => selectedTopicIds.includes(topicId));

  return (
    <section
      className={cn(
        'w-full rounded-[20px] px-0 pb-5 pt-5 shadow-[0_2px_20.6px_rgba(24,34,41,0.04)]',
        className
      )}
      style={cardSurface}
    >
      <div className="flex h-[25px] items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2">
          <ChevronDown className="size-4 shrink-0 text-[#242424]" aria-hidden="true" />
          <h2 className="truncate font-display-bn text-[16px] font-bold leading-[140%] text-[#101828]">
            {title}
          </h2>
        </div>
        <span aria-hidden="true">
          <CheckToggle checked={checked} onClick={() => onTogglePaper(topics)} />
        </span>
      </div>
      <div className="mt-[18px]">
        {topics.map((topic) => (
          <TopicRow
            key={topic.id}
            expandedIds={expandedIds}
            onToggleExpand={onToggleExpand}
            onToggleTopic={onToggleTopic}
            selectedTopicIds={selectedTopicIds}
            topic={topic}
          />
        ))}
      </div>
    </section>
  );
}

export function ExamTopicSelectContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));
  const [expandedIds, setExpandedIds] = useState(['first-vector']);

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

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
          <StepProgress />
        </section>

        <div className="mt-4 grid gap-6 xl:grid-cols-2 xl:px-10 xl:py-5">
          <TopicCard
            title="১ম পত্র"
            topics={firstPaperTopics}
            selectedTopicIds={selectedTopicIds}
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
            onTogglePaper={togglePaper}
            onToggleTopic={toggleTopic}
            className="xl:min-h-[861px]"
          />
          <TopicCard
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

