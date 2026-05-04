'use client';

import { useState } from 'react';
import { setSelectedTopics } from '@/features/exam/examSlice';
import { collectTopicIds } from '@/features/exam/topicSelectionUtils';
import type { TopicNode } from '@/features/exam/topicTree';
import { useAppDispatch } from '@/store/hooks';

export function useTopicSelection(allTopicIds: string[], selectedTopicIds: string[]) {
  const dispatch = useAppDispatch();
  const [expandedIds, setExpandedIds] = useState(['first-vector']);

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

  return { expandedIds, toggleTopic, togglePaper, toggleExpand };
}

