import type { ExamQuestion, ExamSubject } from './examTypes';

export interface SessionSetupSlice {
  selectedTopicIds: string[];
  questionCount: number;
}

export function getSessionQuestionPool(
  subject: ExamSubject,
  setup: SessionSetupSlice
): ExamQuestion[] {
  const selected = setup.selectedTopicIds;
  const tagged = subject.questions.filter((question) => {
    if (!question.topicSelectionIds?.length) {
      return true;
    }
    if (!selected.length) {
      return true;
    }
    return question.topicSelectionIds.some((id) => selected.includes(id));
  });

  const pool = tagged.length > 0 ? tagged : [...subject.questions];
  const cap = Number.isFinite(setup.questionCount) ? Math.floor(setup.questionCount) : 12;
  const n = Math.min(Math.max(cap, 1), pool.length);
  return pool.slice(0, n);
}
