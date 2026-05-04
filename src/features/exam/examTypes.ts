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

/**
 * Fallback tile art when raster under `emojiFile` is missing or fails to load.
 * Matches Mock Test PNG order (ক, A, calculator, ruler/set square, atom, flask, DNA, chip).
 */
export type ExamSubjectTilePreset =
  | 'bengali-ka'
  | 'latin-a'
  | 'calculator'
  | 'geometry'
  | 'atom'
  | 'flask'
  | 'dna'
  | 'chip';

export interface ExamListCard {
  id: string;
  subjectId: string;
  title: string;
  iconBg: string;
  /** Foreground stroke / glyph color inside the emoji tile */
  iconFg: string;
  tilePreset: ExamSubjectTilePreset;
  /** Filename only, served from `/mockeTest/emojis/{emojiFile}` */
  emojiFile?: string | null;
}

export interface ExamResult {
  subjectId: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  timeTakenSeconds: number;
  submittedAt: string;
}
