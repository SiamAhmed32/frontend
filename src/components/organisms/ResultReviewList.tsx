import type { ExamQuestion } from '@/features/exam/examTypes';
import { ReviewedOption } from '@/components/molecules/ReviewedOption';
import { toBengaliDigits } from '@/lib/bengaliDigits';

export function ResultReviewList({
  questions,
  answers,
}: {
  questions: ExamQuestion[];
  answers: Record<string, string>;
}) {
  return (
    <div className="mt-6">
      <h2 className="font-display-bn text-[18px] font-bold leading-[150%] text-[#1C1C1C]">
        সঠিক/ভুল উত্তর দেখে নাও
      </h2>

      <div className="mt-4 space-y-8">
        {questions.map((question, index) => {
          const selectedOptionId = answers[question.id];

          return (
            <article key={question.id}>
              <p className="font-display-bn text-[16px] font-semibold leading-[160%] text-[#1C1C1C]">
                {toBengaliDigits(index + 1)}. {question.text}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <ReviewedOption
                    key={option.id}
                    label={option.label}
                    isCorrect={option.id === question.correctOptionId}
                    isWrongSelection={selectedOptionId === option.id && option.id !== question.correctOptionId}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

