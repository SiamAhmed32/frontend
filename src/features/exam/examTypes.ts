export interface ExamOption {
  id: string;
  label: string;
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: ExamOption[];
  correctOptionId: string;
}

export interface ExamTopic {
  id: string;
  title: string;
}

export interface ExamSubject {
  id: string;
  title: string;
  iconLabel: string;
  durationMinutes: number;
  topics: ExamTopic[];
  questions: ExamQuestion[];
}

export interface ExamResult {
  subjectId: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  submittedAt: string;
}
