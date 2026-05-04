'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  selectSubject,
  setQuestionCount,
  setSelectedTopics,
} from '@/features/exam/examSlice';
import { selectExamSetup } from '@/features/exam/selectors';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type TopicNode = {
  id: string;
  label: string;
  children?: TopicNode[];
};

const firstPaperTopics: TopicNode[] = [
  { id: 'first-measurement', label: 'ভৌতজগত ও পরিমাপ' },
  {
    id: 'first-vector',
    label: 'ভেক্টর',
    children: [
      { id: 'vector-types', label: 'ভেক্টরের প্রকারভেদ ও সূত্রাবলী' },
      { id: 'vector-value', label: 'লম্ব ও মান নির্ণয়' },
      { id: 'vector-angle', label: 'কোণ ও দিক নির্ণয়' },
      { id: 'relative-velocity', label: 'আপেক্ষিক বেগ' },
    ],
  },
  { id: 'first-motion', label: 'গতিবিদ্যা' },
  { id: 'first-newtonian', label: 'নিউটনিয়ান বলবিদ্যা' },
  { id: 'projection', label: 'উপাংশ, বিভাজন ও অভিক্ষেপ' },
  { id: 'work-power-energy', label: 'কাজ, ক্ষমতা, ও শক্তি' },
  { id: 'vector-calculus', label: 'ভেক্টর ক্যালকুলাস, গ্রেডিয়েন্ট' },
  { id: 'divergence-curl', label: 'ডাইভারজেন্স ও কার্ল' },
  { id: 'circular-motion', label: 'মহাকর্ষ ও অভিকর্ষ' },
];

const secondPaperTopics: TopicNode[] = [
  { id: 'second-measurement', label: 'ভৌতজগত ও পরিমাপ' },
  { id: 'second-vector', label: 'ভেক্টর' },
  { id: 'second-motion', label: 'গতিবিদ্যা' },
  { id: 'second-newtonian-a', label: 'নিউটনিয়ান বলবিদ্যা' },
  { id: 'second-newtonian-b', label: 'নিউটনিয়ান বলবিদ্যা' },
  { id: 'second-work-power-energy', label: 'কাজ, ক্ষমতা, ও শক্তি' },
  { id: 'gravity', label: 'মহাকর্ষ ও অভিকর্ষ' },
  { id: 'material-structure', label: 'পদার্থের গাঠনিক ধর্ম' },
];

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

const allTopicIds = collectTopicIds([...firstPaperTopics, ...secondPaperTopics]);

function TopicCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
        checked ? 'border-[#7F56D9] bg-[#7F56D9]' : 'border-[#D0D5DD] bg-white/70'
      )}
      aria-hidden="true"
    >
      {checked ? (
        <svg className="size-3 text-white" viewBox="0 0 12 12" fill="none">
          <path
            d="M10 3L4.75 8.25L2 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      ) : null}
    </span>
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
        <button
          type="button"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
          onClick={() => onToggleTopic(topic)}
          aria-label={`${topic.label} নির্বাচন`}
          aria-pressed={checked}
        >
          <TopicCheckbox checked={checked} />
        </button>
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
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
        >
          <ChevronDown className="size-4 shrink-0 text-[#242424]" />
          <h2 className="truncate font-display-bn text-[16px] font-bold leading-[140%] text-[#101828]">
            {title}
          </h2>
        </button>
        <button
          type="button"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
          onClick={() => onTogglePaper(topics)}
          aria-label={`${title} নির্বাচন`}
          aria-pressed={checked}
        >
          <TopicCheckbox checked={checked} />
        </button>
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

export default function ExamSetupContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const setup = useAppSelector(selectExamSetup);
  const [expandedIds, setExpandedIds] = useState(['first-vector']);

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
      dispatch(setSelectedTopics([]));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  const selectedTopicIds = setup.selectedTopicIds.filter((topicId) =>
    allTopicIds.includes(topicId)
  );

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
    <main className="relative min-h-screen overflow-hidden px-5 pb-[142px] pt-8 sm:px-8 lg:px-10 lg:pb-[126px] lg:pt-14">
      <div
        className="pointer-events-none absolute left-[23px] top-[-12px] h-[696px] w-[928px] opacity-20 blur-[2.19px] sm:left-[120px] lg:left-[306px]"
        style={{
          backgroundColor: '#1C1C1C',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 0%, #000 0%, transparent 76%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[997px]">
        <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
          <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">
            পরীক্ষা দাও
          </span>
          <ChevronRight className="size-5 text-[#242424]" />
          <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
            পদার্থবিজ্ঞান
          </span>
        </div>

        <div className="mt-4">
          <div className="flex min-h-[25px] items-start justify-between gap-4">
            <h1 className="font-display-bn text-[18px] font-semibold leading-[140%] text-[#101828]">
              কোন কোন টপিকের উপর পরীক্ষা দিতে চাও ?
            </h1>
            <span className="shrink-0 font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
              ১/২ স্টেপ
            </span>
          </div>
          <div className="mt-[13px] flex h-[5px] gap-5">
            <span className="h-[5px] flex-1 rounded-[200px] bg-[#7F56D9]" />
            <span className="h-[5px] flex-1 rounded-[200px] bg-white/85" />
            <span className="h-[5px] flex-1 rounded-[200px] bg-white/85" />
          </div>
        </div>

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

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-[0_-4px_4px_-1px_rgba(12,12,13,0.05)] lg:left-[283px]">
        <div className="mx-auto flex max-w-[997px] flex-col gap-5 px-5 py-5 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <label className="flex w-full max-w-[309px] flex-col gap-2 font-display-bn text-[14px] font-normal leading-[20px] text-[#475467]">
            প্রশ্ন সংখ্যা
            <input
              type="number"
              min={1}
              max={100}
              value={setup.questionCount ?? 12}
              onChange={(event) => dispatch(setQuestionCount(Number(event.target.value)))}
              className="h-10 rounded-[8px] border border-[#D0D5DD] bg-white px-3 font-['Inter'] text-[14px] leading-[20px] text-[#101828] outline-none transition focus:border-[#7F56D9]"
            />
          </label>

          <button
            type="button"
            className="h-[54px] w-full rounded-[10px] bg-[#7311A0] px-5 py-4 text-center font-display-bn text-[16px] font-bold leading-6 text-white transition hover:bg-[#681091] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2 sm:w-[251px]"
          >
            এগিয়ে যাও
          </button>
        </div>
      </div>
    </main>
  );
}
