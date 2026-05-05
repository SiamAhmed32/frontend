'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { FixedBottomActionBar } from '@/components/organisms/FixedBottomActionBar';
import { ExamStepHeader } from '@/components/organisms/ExamStepHeader';
import { QuestionTypeSelector } from '@/components/organisms/QuestionTypeSelector';
import { selectSubject, setQuestionType } from '@/features/exam/examSlice';
import { selectExamSetup, selectSubjectById } from '@/features/exam/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toBengaliDigits } from '@/lib/bengaliDigits';

const RULES = [
  'প্রতিটি MCQ প্রশ্নের জন্য চারটি করে অপশন থাকবে। সঠিক উত্তরটি বাছাই করতে হবে। একই প্রশ্নের একাধিক উত্তর থাকলে কোনো প্রশ্নের সঠিক উত্তর না থাকলে সবচেয়ে কাছাকাছি উত্তরটি বাছাই করতে হবে।',
  'প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর পাওয়া যাবে।',
  'প্রতিটি ভুল উত্তরের জন্য ২৫% নম্বর কাটা যাবে। নেগেটিভ মার্কিং অন থাকবে।',
  'সময় শেষ হয়ে গেলে অটো সাবমিট হয়ে যাবে।',
  'ইন্টারনেট জনিত সমস্যা অথবা অন্য কোনো কারণে যদি, এক্সাম থেকে বের হয়ে যাও, তাহলে নির্দিষ্ট টাইম শেষে অটো সাবমিট হয়ে যাবে।',
  'নির্দিষ্ট সময়ের ভেতরে দেওয়া শুভমান প্রথমবারের কুইজটির মার্কস লিডারবোর্ডে আসবে।',
  'টাইম শেষেও প্র্যাকটিস এক্সাম দেওয়া যাবে, তবে সেগুলোর মার্কস লিডারবোর্ডে আসবে না।',
];

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
      <div className="relative mx-auto w-full max-w-[891px]">
        <ExamStepHeader
          sectionLabel="মক টেস্ট"
          subjectTitle={subjectTitle}
          title="নিশ্চিত কর"
          stepLabel="৩/৩ স্টেপ"
          activeStepCount={3}
        />

        <section className="mt-4 rounded-[20px] border border-white bg-[rgba(255,255,255,0.29)] p-5 shadow-[0_2px_20.6px_rgba(24,34,41,0.04)] backdrop-blur-[20px]">
          <div className="grid gap-5 lg:grid-cols-[1fr_282px]">
            <QuestionTypeSelector
              value={setup.questionType}
              onChange={(value) => dispatch(setQuestionType(value))}
            />

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
