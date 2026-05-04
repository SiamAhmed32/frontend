import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { CheckToggle } from '@/components/atoms/CheckToggle';
import { TopicTreeRow } from '@/components/molecules/TopicTreeRow';
import { collectTopicIds } from '@/features/exam/topicSelectionUtils';
import type { TopicNode } from '@/features/exam/topicTree';
import { cn } from '@/lib/utils';

const cardSurface = {
  background:
    'linear-gradient(rgba(255, 255, 255, 0.29), rgba(255, 255, 255, 0.29)) padding-box, linear-gradient(5.34deg, #FFFFFF 17.54%, rgba(255, 255, 255, 0.3) 45.99%, #FFFFFF 80.02%) border-box',
  border: '1.03px solid transparent',
  backdropFilter: 'blur(20px)',
} satisfies CSSProperties;

export function TopicSelectionCard({
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
  const paperTopicIds = collectTopicIds(topics);
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
          <TopicTreeRow
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

