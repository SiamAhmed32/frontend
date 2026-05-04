import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { examListCards, examSubjects } from './examData';
import type { ExamListCard, ExamResult, ExamSubject } from './examTypes';

interface ExamSetup {
  subjectId: string | null;
  selectedTopicIds: string[];
  questionType: 'mcq' | 'written';
  questionCount: number;
  durationMinutes: number;
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
    questionType: 'mcq',
    questionCount: 12,
    durationMinutes: 30,
  },
  answers: {},
  results: {},
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    selectSubject: (state, action: PayloadAction<string>) => {
      const subject = state.subjects.find((item) => item.id === action.payload);

      state.setup.subjectId = action.payload;
      state.setup.selectedTopicIds = subject?.topics.map((topic) => topic.id) ?? [];
      state.setup.questionCount = 12;
      state.setup.durationMinutes = subject?.durationMinutes ?? 30;
      state.answers = {};
    },
    toggleTopic: (state, action: PayloadAction<string>) => {
      const isSelected = state.setup.selectedTopicIds.includes(action.payload);

      state.setup.selectedTopicIds = isSelected
        ? state.setup.selectedTopicIds.filter((topicId) => topicId !== action.payload)
        : [...state.setup.selectedTopicIds, action.payload];
    },
    setSelectedTopics: (state, action: PayloadAction<string[]>) => {
      state.setup.selectedTopicIds = action.payload;
    },
    setQuestionType: (state, action: PayloadAction<ExamSetup['questionType']>) => {
      state.setup.questionType = action.payload;
    },
    setQuestionCount: (state, action: PayloadAction<number>) => {
      const nextCount = Number.isFinite(action.payload) ? Math.floor(action.payload) : 12;
      state.setup.questionCount = Math.min(Math.max(nextCount, 1), 100);
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

      const correct = subject.questions.filter(
        (question) => state.answers[question.id] === question.correctOptionId
      ).length;
      const answered = subject.questions.filter((question) => state.answers[question.id]).length;
      const totalQuestions = subject.questions.length;
      const unanswered = totalQuestions - answered;
      const wrong = answered - correct;

      state.results[subject.id] = {
        subjectId: subject.id,
        totalQuestions,
        correct,
        wrong,
        unanswered,
        score: correct,
        submittedAt: new Date().toISOString(),
      };
    },
    resetExamSession: (state) => {
      state.answers = {};
    },
  },
});

export const {
  answerQuestion,
  resetExamSession,
  selectSubject,
  setQuestionCount,
  setDurationMinutes,
  setSelectedTopics,
  setQuestionType,
  submitExam,
  toggleTopic,
} = examSlice.actions;
export default examSlice.reducer;
