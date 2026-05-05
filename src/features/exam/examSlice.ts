import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { examListCards, examSubjects } from './examData';
import type { ExamListCard, ExamResult, ExamSubject } from './examTypes';
import { getAvailableQuestionCount, getSessionQuestionPool } from './sessionQuestions';

interface ExamSetup {
  subjectId: string | null;
  selectedTopicIds: string[];
  standard: 'engineering' | 'main-book' | 'varsity' | 'medical';
  questionType: 'mcq' | 'written';
  questionCount: number;
  durationMinutes: number;
  startedAt: string | null;
}

interface ExamState {
  subjects: ExamSubject[];
  listCards: ExamListCard[];
  setup: ExamSetup;
  answers: Record<string, string>;
  results: Record<string, ExamResult>;
}

const initialState: ExamState = {
  subjects: examSubjects,
  listCards: examListCards,
  setup: {
    subjectId: null,
    selectedTopicIds: [],
    standard: 'engineering',
    questionType: 'mcq',
    questionCount: 12,
    durationMinutes: 30,
    startedAt: null,
  },
  answers: {},
  results: {},
};

const MIN_QUESTION_COUNT = 5;

const clampQuestionCount = (value: number, max: number) => {
  const nextCount = Number.isFinite(value) ? Math.floor(value) : MIN_QUESTION_COUNT;
  return Math.min(Math.max(nextCount, MIN_QUESTION_COUNT), Math.max(max, MIN_QUESTION_COUNT));
};

const getSelectedSubject = (state: ExamState) =>
  state.subjects.find((item) => item.id === state.setup.subjectId) ?? null;

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    selectSubject: (state, action: PayloadAction<string>) => {
      const subject = state.subjects.find((item) => item.id === action.payload);

      state.setup.subjectId = action.payload;
      // Start empty so user explicitly selects topics on step-1.
      state.setup.selectedTopicIds = [];
      state.setup.questionCount = clampQuestionCount(12, subject?.questions.length ?? 12);
      state.setup.durationMinutes = subject?.durationMinutes ?? 30;
      state.setup.startedAt = null;
      state.answers = {};
    },
    startExamSession: (state) => {
      if (!state.setup.startedAt) {
        state.setup.startedAt = new Date().toISOString();
      }
    },
    toggleTopic: (state, action: PayloadAction<string>) => {
      const isSelected = state.setup.selectedTopicIds.includes(action.payload);

      state.setup.selectedTopicIds = isSelected
        ? state.setup.selectedTopicIds.filter((topicId) => topicId !== action.payload)
        : [...state.setup.selectedTopicIds, action.payload];
    },
    setSelectedTopics: (state, action: PayloadAction<string[]>) => {
      state.setup.selectedTopicIds = action.payload;
      const subject = getSelectedSubject(state);
      if (subject) {
        const maxCount = getAvailableQuestionCount(
          subject,
          state.setup.selectedTopicIds
        );
        state.setup.questionCount = clampQuestionCount(state.setup.questionCount, maxCount);
      }
    },
    setExamStandard: (state, action: PayloadAction<ExamSetup['standard']>) => {
      state.setup.standard = action.payload;
      const subject = getSelectedSubject(state);
      if (subject) {
        const maxCount = getAvailableQuestionCount(subject, state.setup.selectedTopicIds, action.payload);
        state.setup.questionCount = clampQuestionCount(state.setup.questionCount, maxCount);
      }
    },
    setQuestionType: (state, action: PayloadAction<ExamSetup['questionType']>) => {
      state.setup.questionType = action.payload;
    },
    setQuestionCount: (state, action: PayloadAction<number>) => {
      const subject = getSelectedSubject(state);
      const maxCount = subject
        ? getAvailableQuestionCount(subject, state.setup.selectedTopicIds)
        : 100;
      state.setup.questionCount = clampQuestionCount(action.payload, maxCount);
    },
    setDurationMinutes: (state, action: PayloadAction<number>) => {
      state.setup.durationMinutes = action.payload;
    },
    answerQuestion: (
      state,
      action: PayloadAction<{ questionId: string; optionId: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.optionId;
    },
    submitExam: (state, action: PayloadAction<string>) => {
      const subject = state.subjects.find((item) => item.id === action.payload);

      if (!subject) {
        return;
      }

      const sessionQuestions = getSessionQuestionPool(subject, state.setup);
      const questionIds = sessionQuestions.map((question) => question.id);

      const correct = sessionQuestions.filter(
        (question) => state.answers[question.id] === question.correctOptionId
      ).length;
      const answered = sessionQuestions.filter((question) => state.answers[question.id]).length;
      const totalQuestions = sessionQuestions.length;
      const unanswered = totalQuestions - answered;
      const wrong = answered - correct;
      const submittedAt = new Date().toISOString();
      const startedAt = state.setup.startedAt ? new Date(state.setup.startedAt).getTime() : null;
      const submittedAtTime = new Date(submittedAt).getTime();
      const fallbackSeconds = (state.setup.durationMinutes || subject.durationMinutes || 30) * 60;
      const timeTakenSeconds =
        startedAt && submittedAtTime > startedAt
          ? Math.max(1, Math.round((submittedAtTime - startedAt) / 1000))
          : fallbackSeconds;

      state.results[subject.id] = {
        subjectId: subject.id,
        totalQuestions,
        correct,
        wrong,
        unanswered,
        score: correct,
        timeTakenSeconds,
        submittedAt,
        questionIds,
      };
    },
    resetExamSession: (state) => {
      state.answers = {};
      state.setup.startedAt = null;
    },
  },
});

export const {
  answerQuestion,
  resetExamSession,
  setExamStandard,
  selectSubject,
  startExamSession,
  setQuestionCount,
  setDurationMinutes,
  setSelectedTopics,
  setQuestionType,
  submitExam,
  toggleTopic,
} = examSlice.actions;
export default examSlice.reducer;
