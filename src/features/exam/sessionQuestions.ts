import type { ExamQuestion, ExamSubject } from './examTypes';
import type { StandardId } from './standards';

export interface SessionSetupSlice {
  selectedTopicIds: string[];
  questionCount: number;
  standard: StandardId;
}

export function getAvailableQuestionPool(
  subject: ExamSubject,
  selectedTopicIds: string[],
  standard?: StandardId
): ExamQuestion[] {
  const tagged = subject.questions.filter((question) => {
    const standardMatch = !standard || !question.standardIds?.length || question.standardIds.includes(standard);
    if (!standardMatch) {
      return false;
    }
    if (!question.topicSelectionIds?.length) {
      return true;
    }
    if (!selectedTopicIds.length) {
      return true;
    }
    return question.topicSelectionIds.some((id) => selectedTopicIds.includes(id));
  });

  return tagged.length > 0 ? tagged : [...subject.questions];
}

export function getAvailableQuestionCount(
  subject: ExamSubject,
  selectedTopicIds: string[],
  standard?: StandardId
): number {
  return getAvailableQuestionPool(subject, selectedTopicIds, standard).length;
}

export function getSessionQuestionPool(
  subject: ExamSubject,
  setup: SessionSetupSlice
): ExamQuestion[] {
  const pool = getAvailableQuestionPool(subject, setup.selectedTopicIds, setup.standard);
  const cap = Number.isFinite(setup.questionCount) ? Math.floor(setup.questionCount) : 12;
  const n = Math.min(Math.max(cap, 1), pool.length);
  return pool.slice(0, n);
}
