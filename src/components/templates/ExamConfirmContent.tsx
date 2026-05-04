'use client';

import { ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { selectSubject, setQuestionType } from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const RULES = [
  'প্রতিটি MCQ প্রশ্নের জন্য চারটি করে অপশন থাকবে। সঠিক উত্তরটি বাছাই করতে হবে। একই প্রশ্নের একাধিক উত্তর থাকলে কোনো প্রশ্নের সঠিক উত্তর না থাকলে সবচেয়ে কাছাকাছি উত্তরটি বাছাই করতে হবে।',
  'প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর পাওয়া যাবে।',
  'প্রতিটি ভুল উত্তরের জন্য ২৫% নম্বর কাটা যাবে। নেগেটিভ মার্কিং অন থাকবে।',
  'সময় শেষ হয়ে গেলে অটো সাবমিট হয়ে যাবে।',
  'ইন্টারনেট জনিত সমস্যা অথবা অন্য কোনো কারণে যদি, এক্সাম থেকে বের হয়ে যাও, তাহলে নির্দিষ্ট টাইম শেষে অটো সাবমিট হয়ে যাবে।',
  'নির্দিষ্ট সময়ের ভেতরে দেওয়া শুভমান প্রথমবারের কুইজটির মার্কস লিডারবোর্ডে আসবে।',
  'টাইম শেষেও প্র্যাকটিস এক্সাম দেওয়া যাবে, তবে সেগুলোর মার্কস লিডারবোর্ডে আসবে না।',
];

const toBengaliDigits = (value: number) =>
  value.toString().replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[Number(digit)] ?? digit);

function StepProgress() {
  return (
    <div className="mt-[13px] grid h-[5px] grid-cols-3 gap-5">
      <span className="h-[5px] rounded-[200px] bg-[#7F56D9]" />
      <span className="h-[5px] rounded-[200px] bg-[#7F56D9]" />
      <span className="h-[5px] rounded-[200px] bg-[#7F56D9]" />
    </div>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-14 flex-1 items-center justify-center rounded-2xl font-["Inter",sans-serif] text-[16px] font-semibold leading-6 outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2',
        active ? 'bg-[#7F56D9] text-white' : 'bg-transparent text-[#98A2B3]'
      )}
    >
      {children}
    </button>
  );
}

export function ExamConfirmContent() {
  const params = useParams<{ id?: string }>();
  const subjectId = typeof params.id === 'string' ? params.id : 'physics';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setup = useAppSelector(selectExamSetup);
  const subject = useAppSelector((state) => selectSubjectById(state, subjectId));

  useEffect(() => {
    if (setup.subjectId !== subjectId) {
      dispatch(selectSubject(subjectId));
    }
  }, [dispatch, setup.subjectId, subjectId]);

  const subjectTitle = subject?.title ?? 'পদার্থবিজ্ঞান';

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-[128px] pt-8 sm:px-8 lg:px-12 lg:pt-[55px]">
      <div className="relative mx-auto w-full max-w-[891px] lg:mx-0">
        <div className="flex min-h-[22px] flex-wrap items-center gap-2.5">
          <span className="font-display-bn text-[20px] font-bold leading-none text-[#1C1C1C]">
            মক টেস্ট
          </span>
          <ChevronRight className="size-5 text-[#242424]" />
          <span className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
            {subjectTitle}
          </span>
        </div>

        <section className="mt-4">
          <div className="flex min-h-[25px] items-center justify-between gap-4">
            <h1 className="font-display-bn text-[18px] font-semibold leading-[140%] text-[#101828]">
              নিশ্চিত কর
            </h1>
            <span className="shrink-0 font-display-bn text-[16px] font-semibold leading-[140%] text-[#1C1C1C]">
              ৩/৩ স্টেপ
            </span>
          </div>
          <StepProgress />
        </section>

        <section className="mt-4 rounded-[20px] border border-white bg-[rgba(255,255,255,0.29)] p-5 shadow-[0_2px_20.6px_rgba(24,34,41,0.04)] backdrop-blur-[20px]">
          <div className="grid gap-5 lg:grid-cols-[1fr_282px]">
            <div>
              <h2 className="font-display-bn text-[16px] font-bold leading-[140%] text-[#101828]">
                প্রশ্ন ধরন
              </h2>
              <div className="mt-4 flex rounded-[20px] border border-white bg-white p-1 shadow-[0_2px_20.6px_rgba(24,34,41,0.04)]">
                <ChoiceButton
                  active={setup.questionType === 'mcq'}
                  onClick={() => dispatch(setQuestionType('mcq'))}
                >
                  MCQ
                </ChoiceButton>
                <ChoiceButton
                  active={setup.questionType === 'written'}
                  onClick={() => dispatch(setQuestionType('written'))}
                >
                  WRITTEN
                </ChoiceButton>
              </div>
            </div>

            <div>
              <h2 className="font-display-bn text-[16px] font-bold leading-[140%] text-[#101828]">
                মোট সময়
              </h2>
              <div className="mt-4 rounded-[20px] border border-[#D0D5DD] bg-white px-6 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                <p className="font-display-bn text-[16px] font-semibold leading-[140%] text-[#98A2B3]">
                  {toBengaliDigits(setup.durationMinutes)} মিনিট
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-3 pl-6 font-display-bn text-[14px] font-normal leading-[140%] text-[#475467]">
            {RULES.map((rule) => (
              <li key={rule} className="list-disc">
                {rule}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FixedBottomActionBar
        className="lg:left-[283px]"
        right={
          <Button
            type="button"
            size="full"
            onClick={() => router.push(`/exams/${subjectId}`)}
            className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#7311A0] px-5 py-4 font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#681091] sm:w-[251px]"
          >
            পরীক্ষা শুরু কর
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        }
      />
    </main>
  );
}
