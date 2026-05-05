export type StandardId = 'engineering' | 'main-book' | 'varsity' | 'medical';

export const standardOptions: Array<{ id: StandardId; label: string }> = [
  { id: 'engineering', label: 'ইঞ্জিনিয়ারিং' },
  { id: 'main-book', label: 'মেইন বই' },
  { id: 'varsity', label: 'ভার্সিটি' },
  { id: 'medical', label: 'মেডিকেল' },
];
