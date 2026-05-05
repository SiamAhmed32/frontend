import { examSubjects } from './examData';

export type TopicNode = {
  id: string;
  label: string;
  children?: TopicNode[];
};

export const firstPaperTopics: TopicNode[] = [
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

export const secondPaperTopics: TopicNode[] = [
  { id: 'second-measurement', label: 'ভৌতজগত ও পরিমাপ' },
  { id: 'second-vector', label: 'ভেক্টর' },
  { id: 'second-motion', label: 'গতিবিদ্যা' },
  { id: 'second-newtonian-a', label: 'নিউটনিয়ান বলবিদ্যা' },
  { id: 'second-newtonian-b', label: 'নিউটনিয়ান বলবিদ্যা' },
  { id: 'second-work-power-energy', label: 'কাজ, ক্ষমতা, ও শক্তি' },
  { id: 'gravity', label: 'মহাকর্ষ ও অভিকর্ষ' },
  { id: 'material-structure', label: 'পদার্থের গাঠনিক ধর্ম' },
];

const collectTopicIds = (topics: TopicNode[]): string[] =>
  topics.flatMap((topic) => (topic.children ? collectTopicIds(topic.children) : [topic.id]));

export const ALL_PHYSICS_TOPIC_SELECTION_IDS = collectTopicIds([...firstPaperTopics, ...secondPaperTopics]);

export function getTopicTreeForSubject(subjectId: string): TopicNode[][] {
  if (subjectId === 'physics') {
    return [firstPaperTopics, secondPaperTopics];
  }

  const subject = examSubjects.find((s) => s.id === subjectId);
  const subjectTopics = subject?.topics.map((topic) => ({
    id: topic.id,
    label: topic.title,
  }));

  return subjectTopics?.length ? [subjectTopics] : [[]];
}

export function getDefaultTopicSelectionForSubject(subjectId: string): string[] {
  if (subjectId === 'physics') {
    return [...ALL_PHYSICS_TOPIC_SELECTION_IDS];
  }
  const subject = examSubjects.find((s) => s.id === subjectId);
  return subject?.topics.map((t) => t.id) ?? [];
}
