import type { ExamSubject } from './examTypes';

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
        text: 'একটি রেফ্রিজারেটরের কার্যকারিতা সহগ 4.61। 250 J অপসারণ করলে কাজের পরিমাণ কত?',
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
        text: 'তাপীয় সাম্যতায় থাকা বস্তুগুলোর মধ্যে কোনটির আদান-প্রদান ঘটে না?',
        correctOptionId: 'physics-2-b',
        options: [
          { id: 'physics-2-a', label: 'তাপ' },
          { id: 'physics-2-b', label: 'বিকিরণ' },
          { id: 'physics-2-c', label: 'তাপমাত্রা' },
          { id: 'physics-2-d', label: 'চাপ' },
        ],
      },
      {
        id: 'physics-3',
        text: 'কোনটির তাপণ ক্ষমতা সবচেয়ে বেশি?',
        correctOptionId: 'physics-3-b',
        options: [
          { id: 'physics-3-a', label: 'ফিট' },
          { id: 'physics-3-b', label: 'অ্যানথ্রাসাইট' },
          { id: 'physics-3-c', label: 'লিগনাইট' },
          { id: 'physics-3-d', label: 'বিটুমিনাস' },
        ],
      },
      {
        id: 'physics-4',
        text: 'একটি কার্নো ইঞ্জিন 1200K ও 600K তাপমাত্রায় কাজ করে। T এর মান কত?',
        correctOptionId: 'physics-4-c',
        options: [
          { id: 'physics-4-a', label: '80 K' },
          { id: 'physics-4-b', label: '70 K' },
          { id: 'physics-4-c', label: '50 K' },
          { id: 'physics-4-d', label: '60 K' },
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
];
