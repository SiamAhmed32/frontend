import type { TopicNode } from './topicTree';

export const collectTopicIds = (topics: TopicNode[]): string[] =>
  topics.flatMap((topic) => (topic.children ? collectTopicIds(topic.children) : [topic.id]));
