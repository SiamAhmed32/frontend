import type { ExamListCard, ExamQuestion, ExamSubject } from './examTypes';

const mcq = (
  subject: string,
  index: number,
  topicId: string,
  text: string,
  labels: string[],
  correctIndex: number
): ExamQuestion => {
  const questionId = `${subject}-${index}`;
  const optionIds = ['a', 'b', 'c', 'd'];

  return {
    id: questionId,
    topicSelectionIds: [topicId],
    text,
    correctOptionId: `${questionId}-${optionIds[correctIndex]}`,
    options: labels.map((label, optionIndex) => ({
      id: `${questionId}-${optionIds[optionIndex]}`,
      label,
    })),
  };
};

const baseExamSubjects: ExamSubject[] = [
  {
    id: 'physics',
    title: 'পদার্থবিজ্ঞান',
    iconLabel: 'ক',
    durationMinutes: 30,
    topics: [
      { id: 'first-measurement', title: 'ভৌতজগত ও পরিমাপ' },
      { id: 'work-power-energy', title: 'কাজ, ক্ষমতা ও শক্তি' },
      { id: 'circular-motion', title: 'বৃত্তীয় গতি' },
      { id: 'material-structure', title: 'পদার্থের গাঠনিক ধর্ম' },
    ],
    questions: [
      mcq('physics', 1, 'work-power-energy', 'কাজের একক কোনটি?', ['নিউটন', 'জুল', 'ওয়াট', 'প্যাসকেল'], 1),
      mcq('physics', 2, 'first-measurement', 'দৈর্ঘ্যের SI একক কোনটি?', ['মিটার', 'কেজি', 'সেকেন্ড', 'অ্যাম্পিয়ার'], 0),
      mcq('physics', 3, 'circular-motion', 'কেন্দ্রমুখী বলের দিক কোন দিকে?', ['স্পর্শকের দিকে', 'কেন্দ্রের দিকে', 'বাইরের দিকে', 'উপরের দিকে'], 1),
      mcq('physics', 4, 'material-structure', 'কোনটির তাপন ক্ষমতা বেশি?', ['পিট', 'লিগনাইট', 'অ্যানথ্রাসাইট', 'কাঠ'], 2),
      mcq('physics', 5, 'work-power-energy', 'ক্ষমতার একক কোনটি?', ['জুল', 'ওয়াট', 'নিউটন', 'ভোল্ট'], 1),
    ],
  },
  {
    id: 'chemistry',
    title: 'রসায়ন',
    iconLabel: 'A',
    durationMinutes: 20,
    topics: [
      { id: 'atom', title: 'পরমাণু' },
      { id: 'bonding', title: 'রাসায়নিক বন্ধন' },
      { id: 'solution', title: 'দ্রবণ' },
    ],
    questions: [
      mcq('chemistry', 1, 'atom', 'পরমাণুর কেন্দ্রে কী থাকে?', ['ইলেকট্রন', 'নিউক্লিয়াস', 'আয়ন', 'অণু'], 1),
      mcq('chemistry', 2, 'solution', 'pH মান ৭ হলে দ্রবণটি কেমন?', ['অম্লীয়', 'নিরপেক্ষ', 'ক্ষারীয়', 'লবণাক্ত'], 1),
      mcq('chemistry', 3, 'bonding', 'NaCl কোন ধরনের বন্ধনে গঠিত?', ['আয়নীয়', 'সমযোজী', 'ধাতব', 'হাইড্রোজেন'], 0),
      mcq('chemistry', 4, 'atom', 'ইলেকট্রনের আধান কী?', ['ধনাত্মক', 'ঋণাত্মক', 'নিরপেক্ষ', 'পরিবর্তনশীল'], 1),
    ],
  },
  {
    id: 'higher-math',
    title: 'উচ্চতর গণিত',
    iconLabel: 'গ',
    durationMinutes: 25,
    topics: [
      { id: 'algebra', title: 'বীজগণিত' },
      { id: 'trigonometry', title: 'ত্রিকোণমিতি' },
      { id: 'calculus', title: 'ক্যালকুলাস' },
    ],
    questions: [
      mcq('math', 1, 'algebra', 'x + 2 = 5 হলে x এর মান কত?', ['২', '৩', '৪', '৫'], 1),
      mcq('math', 2, 'trigonometry', 'sin 90° এর মান কত?', ['০', '১', '২', '-১'], 1),
      mcq('math', 3, 'calculus', 'x² এর অন্তরজ কত?', ['x', '2x', 'x³', '2'], 1),
      mcq('math', 4, 'algebra', '২ এর বর্গ কত?', ['২', '৩', '৪', '৮'], 2),
    ],
  },
  {
    id: 'biology',
    title: 'জীববিজ্ঞান',
    iconLabel: 'জ',
    durationMinutes: 25,
    topics: [
      { id: 'cell', title: 'কোষ' },
      { id: 'genetics', title: 'জিনতত্ত্ব' },
      { id: 'plants', title: 'উদ্ভিদবিদ্যা' },
    ],
    questions: [
      mcq('biology', 1, 'cell', 'কোষের শক্তিঘর কোনটি?', ['নিউক্লিয়াস', 'মাইটোকন্ড্রিয়া', 'রাইবোসোম', 'গলজি বডি'], 1),
      mcq('biology', 2, 'genetics', 'বংশগতির একক কী?', ['কোষ', 'জিন', 'অঙ্গ', 'টিস্যু'], 1),
      mcq('biology', 3, 'plants', 'উদ্ভিদের খাদ্য তৈরির প্রক্রিয়া কোনটি?', ['শ্বসন', 'সালোকসংশ্লেষণ', 'পরিবহন', 'প্রস্বেদন'], 1),
      mcq('biology', 4, 'cell', 'কোষের নিয়ন্ত্রণ কেন্দ্র কোনটি?', ['নিউক্লিয়াস', 'ক্লোরোপ্লাস্ট', 'ভ্যাকুওল', 'সাইটোপ্লাজম'], 0),
    ],
  },
  {
    id: 'bangla',
    title: 'বাংলা',
    iconLabel: 'আ',
    durationMinutes: 20,
    topics: [
      { id: 'grammar', title: 'ব্যাকরণ' },
      { id: 'literature', title: 'সাহিত্য' },
      { id: 'composition', title: 'রচনা' },
    ],
    questions: [
      mcq('bangla', 1, 'grammar', 'বিশেষ্য পদ কোনটি?', ['দৌড়ানো', 'নীল', 'পাহাড়', 'ধীরে'], 2),
      mcq('bangla', 2, 'literature', 'কবিতার পঙ্‌ক্তি সাধারণত কী দিয়ে গঠিত?', ['চরণ', 'অনুচ্ছেদ', 'সারণি', 'সূত্র'], 0),
      mcq('bangla', 3, 'composition', 'অনুচ্ছেদের মূল ভাব কোথায় থাকে?', ['শিরোনামে', 'মূল বাক্যে', 'শেষ চিহ্নে', 'ফুটনোটে'], 1),
    ],
  },
  {
    id: 'english',
    title: 'English',
    iconLabel: 'E',
    durationMinutes: 20,
    topics: [
      { id: 'grammar-en', title: 'Grammar' },
      { id: 'vocabulary', title: 'Vocabulary' },
      { id: 'reading', title: 'Reading' },
    ],
    questions: [
      mcq('english', 1, 'grammar-en', 'Choose the correct article: I saw ___ owl.', ['a', 'an', 'the', 'no article'], 1),
      mcq('english', 2, 'vocabulary', 'Which word means “quick”?', ['slow', 'rapid', 'late', 'weak'], 1),
      mcq('english', 3, 'reading', 'The main idea of a paragraph is its ___ message.', ['central', 'hidden', 'last', 'random'], 0),
    ],
  },
  {
    id: 'ict',
    title: 'ICT',
    iconLabel: 'I',
    durationMinutes: 20,
    topics: [
      { id: 'computer-basics', title: 'Computer Basics' },
      { id: 'networking', title: 'Networking' },
      { id: 'programming', title: 'Programming' },
    ],
    questions: [
      mcq('ict', 1, 'computer-basics', 'CPU stands for what?', ['Central Processing Unit', 'Control Power Unit', 'Computer Primary Unit', 'Central Print Unit'], 0),
      mcq('ict', 2, 'networking', 'Which device connects networks?', ['Printer', 'Router', 'Monitor', 'Keyboard'], 1),
      mcq('ict', 3, 'programming', 'A variable is used to store what?', ['Color only', 'Data', 'Sound only', 'Errors only'], 1),
    ],
  },
  {
    id: 'general-knowledge',
    title: 'সাধারণ জ্ঞান',
    iconLabel: 'স',
    durationMinutes: 15,
    topics: [
      { id: 'bangladesh', title: 'বাংলাদেশ' },
      { id: 'world', title: 'বিশ্ব' },
      { id: 'science-gk', title: 'বিজ্ঞান' },
    ],
    questions: [
      mcq('gk', 1, 'bangladesh', 'বাংলাদেশের রাজধানী কোথায়?', ['চট্টগ্রাম', 'ঢাকা', 'সিলেট', 'রাজশাহী'], 1),
      mcq('gk', 2, 'world', 'জাতিসংঘের সদর দপ্তর কোথায়?', ['ঢাকা', 'লন্ডন', 'নিউ ইয়র্ক', 'টোকিও'], 2),
      mcq('gk', 3, 'science-gk', 'পানির রাসায়নিক সংকেত কী?', ['CO₂', 'O₂', 'H₂O', 'NaCl'], 2),
    ],
  },
];

const makeSupplementalQuestion = (
  subject: ExamSubject,
  index: number,
  topic: ExamSubject['topics'][number]
): ExamQuestion => {
  return mcq(
    subject.id,
    index,
    topic.id,
    `${topic.title} - অনুশীলনী প্রশ্ন ${index}`,
    ['প্রথম উত্তর', 'দ্বিতীয় উত্তর', 'তৃতীয় উত্তর', 'চতুর্থ উত্তর'],
    (index - 1) % 4
  );
};

const withMinimumQuestionsPerTopic = (subject: ExamSubject, minimum = 12): ExamSubject => {
  const questions = [...subject.questions];
  let nextIndex = questions.length + 1;

  subject.topics.forEach((topic) => {
    const topicQuestionCount = questions.filter((question) =>
      question.topicSelectionIds?.includes(topic.id)
    ).length;

    for (let count = topicQuestionCount; count < minimum; count += 1) {
      questions.push(makeSupplementalQuestion(subject, nextIndex, topic));
      nextIndex += 1;
    }
  });

  return { ...subject, questions };
};

export const examSubjects: ExamSubject[] = baseExamSubjects.map((subject) =>
  withMinimumQuestionsPerTopic(subject)
);

export const examListCards: ExamListCard[] = [
  { id: 'list-1', subjectId: 'physics', title: 'পদার্থবিজ্ঞান', iconBg: '#FFEDD5', iconFg: '#EA580C', tilePreset: 'bengali-ka', emojiFile: 'fi_16917496.png' },
  { id: 'list-2', subjectId: 'chemistry', title: 'রসায়ন', iconBg: '#DCFCE7', iconFg: '#166534', tilePreset: 'latin-a', emojiFile: 'fi_16917496 (1).png' },
  { id: 'list-3', subjectId: 'higher-math', title: 'উচ্চতর গণিত', iconBg: '#FCE7F3', iconFg: '#BE123C', tilePreset: 'calculator', emojiFile: 'fi_16917496 (2).png' },
  { id: 'list-4', subjectId: 'biology', title: 'জীববিজ্ঞান', iconBg: '#DBEAFE', iconFg: '#1D4ED8', tilePreset: 'geometry', emojiFile: 'fi_16917496 (3).png' },
  { id: 'list-5', subjectId: 'bangla', title: 'বাংলা', iconBg: '#F3E8FF', iconFg: '#7C3AED', tilePreset: 'atom', emojiFile: 'fi_16917383.png' },
  { id: 'list-6', subjectId: 'english', title: 'English', iconBg: '#FFEDD5', iconFg: '#EA580C', tilePreset: 'flask', emojiFile: 'test-tube-01.png' },
  { id: 'list-7', subjectId: 'ict', title: 'ICT', iconBg: '#D1FAE5', iconFg: '#059669', tilePreset: 'dna', emojiFile: 'fi_620401.png' },
  { id: 'list-8', subjectId: 'general-knowledge', title: 'সাধারণ জ্ঞান', iconBg: '#FEE4E4', iconFg: '#DC2626', tilePreset: 'chip', emojiFile: 'Vector (1).png' },
];

//