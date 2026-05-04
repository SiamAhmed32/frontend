import type { RootState } from '@/store/store';
import { getSessionQuestionPool } from './sessionQuestions';

export const selectExamSubjects = (state: RootState) => state.exam.subjects;
export const selectExamListCards = (state: RootState) => state.exam.listCards;
export const selectExamSetup = (state: RootState) => state.exam.setup;
export const selectExamAnswers = (state: RootState) => state.exam.answers;
export const selectExamResults = (state: RootState) => state.exam.results;
export const selectSubjectById = (state: RootState, subjectId: string) =>
  state.exam.subjects.find((subject) => subject.id === subjectId) ?? null;
export const selectResultBySubjectId = (state: RootState, subjectId: string) =>
  state.exam.results[subjectId] ?? null;

export const selectSessionQuestions = (state: RootState, subjectId: string) => {
  const subject = selectSubjectById(state, subjectId);
  if (!subject) {
    return [];
  }
  return getSessionQuestionPool(subject, state.exam.setup);
};
