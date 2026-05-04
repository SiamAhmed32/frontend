import type { ExamQuestion } from '@/features/exam/examTypes';
import { ExamOptionButton } from '@/components/molecules/ExamOptionButton';
import { toBengaliDigits } from '@/lib/bengaliDigits';

export function ExamQuestionList({
  questions,
  answers,
  onSelect,
}: {
  questions: ExamQuestion[];
  answers: Record<string, string>;
  onSelect: (questionId: string, optionId: string) => void;
}) {
  return (
    <section className="mt-6 space-y-7">
      {questions.map((question, idx) => (
        <article key={question.id}>
          <p className="font-display-bn text-[16px] font-semibold leading-[160%] text-[#101828]">
            {toBengaliDigits(idx + 1)}. {question.text}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
            {question.options.map((opt) => (
              <ExamOptionButton
                key={opt.id}
                label={opt.label}
                active={answers[question.id] === opt.id}
                onSelect={() => onSelect(question.id, opt.id)}
              />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

