import type { ExamListCard, ExamSubject } from './examTypes';

export const examSubjects: ExamSubject[] = [
  {
    id: 'physics',
    title: 'পদার্থবিজ্ঞান',
    iconLabel: 'ক',
    durationMinutes: 30,
    topics: [
      { id: 'measurement', title: 'ভৌতজগত ও পরিমাপ' },
      { id: 'vector', title: 'ভেক্টর' },
      { id: 'motion', title: 'গতি বিদ্যা' },
      { id: 'newtonian', title: 'নিউটনিয়ান বলবিদ্যা' },
    ],
    questions: [
      {
        id: 'physics-1',
        text: 'একটি রেফ্রিজারেটরের কার্যকারিতা সহগ 4.61 ঠান্ডা প্রকোষ্ঠে 250 J অপসারণ করলে প্রতিবেশে কৃত কাজের পরিমাণ কত?',
        correctOptionId: 'physics-1-b',
        options: [
          { id: 'physics-1-a', label: '46 J' },
          { id: 'physics-1-b', label: '44 J' },
          { id: 'physics-1-c', label: '77 J' },
          { id: 'physics-1-d', label: '78 J' },
        ],
      },
      {
        id: 'physics-2',
        text: 'তাপীয় সাম্যতায় থাকা বস্তুগুলোর মধ্যে নিচের কোনটির আদান-প্রদান ঘটে না?',
        correctOptionId: 'physics-2-b',
        options: [
          { id: 'physics-2-a', label: 'তাপ' },
          { id: 'physics-2-b', label: 'বিকিরণ' },
          { id: 'physics-2-c', label: 'তাপমাত্রা' },
          { id: 'physics-2-d', label: 'চাপ' },
        ],
      },
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
    ],
    questions: [
      {
        id: 'chemistry-1',
        text: 'pH মান 7 হলে দ্রবণটি কেমন?',
        correctOptionId: 'chemistry-1-b',
        options: [
          { id: 'chemistry-1-a', label: 'অম্লীয়' },
          { id: 'chemistry-1-b', label: 'নিরপেক্ষ' },
          { id: 'chemistry-1-c', label: 'ক্ষারীয়' },
          { id: 'chemistry-1-d', label: 'লবণাক্ত' },
        ],
      },
    ],
  },
  {
    id: 'higher-math',
    title: 'উচ্চতর গণিত',
    iconLabel: 'গ',
    durationMinutes: 25,
    topics: [{ id: 'algebra', title: 'বীজগণিত' }],
    questions: [
      {
        id: 'math-1',
        text: '২ এর বর্গমূল কত?',
        correctOptionId: 'math-1-b',
        options: [
          { id: 'math-1-a', label: '3' },
          { id: 'math-1-b', label: '√2' },
          { id: 'math-1-c', label: '4' },
          { id: 'math-1-d', label: '1' },
        ],
      },
    ],
  },
  {
    id: 'biology',
    title: 'জীববিজ্ঞান',
    iconLabel: 'জ',
    durationMinutes: 25,
    topics: [{ id: 'cell', title: 'কোষ' }],
    questions: [
      {
        id: 'bio-1',
        text: 'কোষের শক্তি কারখানা কোনটি?',
        correctOptionId: 'bio-1-b',
        options: [
          { id: 'bio-1-a', label: 'নিউক্লিয়াস' },
          { id: 'bio-1-b', label: 'মাইটোকন্ড্রিয়া' },
          { id: 'bio-1-c', label: 'রাইবোসোম' },
          { id: 'bio-1-d', label: 'গলজি বডি' },
        ],
      },
    ],
  },
];

export const examListCards: ExamListCard[] = [
  {
    id: 'list-1',
    subjectId: 'physics',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#FFEDD5',
    iconFg: '#EA580C',
    tilePreset: 'bengali-ka',
    emojiFile: 'fi_16917496.png',
  },
  {
    id: 'list-2',
    subjectId: 'chemistry',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#DCFCE7',
    iconFg: '#166534',
    tilePreset: 'latin-a',
    emojiFile: 'fi_16917496 (1).png',
  },
  {
    id: 'list-3',
    subjectId: 'higher-math',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#FCE7F3',
    iconFg: '#BE123C',
    tilePreset: 'calculator',
    emojiFile: 'fi_16917496 (2).png',
  },
  {
    id: 'list-4',
    subjectId: 'biology',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#DBEAFE',
    iconFg: '#1D4ED8',
    tilePreset: 'geometry',
    emojiFile: 'fi_16917496 (3).png',
  },
  {
    id: 'list-5',
    subjectId: 'physics',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#F3E8FF',
    iconFg: '#7C3AED',
    tilePreset: 'atom',
    emojiFile: 'fi_16917383.png',
  },
  {
    id: 'list-6',
    subjectId: 'chemistry',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#FFEDD5',
    iconFg: '#EA580C',
    tilePreset: 'flask',
    emojiFile: 'test-tube-01.png',
  },
  {
    id: 'list-7',
    subjectId: 'higher-math',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#D1FAE5',
    iconFg: '#059669',
    tilePreset: 'dna',
    emojiFile: 'fi_620401.png',
  },
  {
    id: 'list-8',
    subjectId: 'biology',
    title: 'পদার্থবিজ্ঞান',
    iconBg: '#FEE4E4',
    iconFg: '#DC2626',
    tilePreset: 'chip',
    emojiFile: 'Vector (1).png',
  },
];
