import { ChoiceButton } from '@/components/molecules/ChoiceButton';

export function QuestionTypeSelector({
  value,
  onChange,
}: {
  value: 'mcq' | 'written';
  onChange: (next: 'mcq' | 'written') => void;
}) {
  return (
    <div>
      <h2 className="font-display-bn text-[16px] font-bold leading-[140%] text-[#101828]">প্রশ্ন ধরন</h2>
      <div className="mt-4 flex rounded-[20px] border border-white bg-white p-1 shadow-[0_2px_20.6px_rgba(24,34,41,0.04)]">
        <ChoiceButton active={value === 'mcq'} onClick={() => onChange('mcq')}>
          MCQ
        </ChoiceButton>
        <ChoiceButton active={value === 'written'} onClick={() => onChange('written')}>
          WRITTEN
        </ChoiceButton>
      </div>
    </div>
  );
}

