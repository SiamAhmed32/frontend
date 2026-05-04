import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CheckToggle } from '@/components/atoms/CheckToggle';
import { collectTopicIds } from '@/features/exam/topicSelectionUtils';
import type { TopicNode } from '@/features/exam/topicTree';

export function TopicTreeRow({
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
            <TopicTreeRow
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

