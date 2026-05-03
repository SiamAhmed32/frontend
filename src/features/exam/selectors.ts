import type { RootState } from '@/store/store';

export const selectExamSubjects = (state: RootState) => state.exam.subjects;
export const selectExamSetup = (state: RootState) => state.exam.setup;
export const selectExamAnswers = (state: RootState) => state.exam.answers;
export const selectExamResults = (state: RootState) => state.exam.results;
export const selectSubjectById = (state: RootState, subjectId: string) =>
  state.exam.subjects.find((subject) => subject.id === subjectId) ?? null;
export const selectResultBySubjectId = (state: RootState, subjectId: string) =>
  state.exam.results[subjectId] ?? null;
