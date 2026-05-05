'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface ComingSoonContentProps {
  featureLabel: string;
}

export function ComingSoonContent({ featureLabel }: ComingSoonContentProps) {
  return (
    <main className="min-h-screen w-full overflow-y-auto px-5 pb-12 pt-14 sm:px-8 lg:px-10 xl:px-[54px]">
      <div className="mx-auto flex min-h-[min(520px,70vh)] w-full max-w-[640px] flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[linear-gradient(95.7deg,rgba(53,57,221,0.12)_13.77%,rgba(144,17,199,0.12)_56.93%)] text-[#7311A0]">
          <Sparkles className="size-8" strokeWidth={1.75} aria-hidden />
        </div>

        <h1 className="mt-8 w-full text-center font-display-bn text-2xl font-bold leading-tight text-[#101828] sm:text-[26px]">
          {featureLabel}
        </h1>
        <div className="mt-3 flex w-full justify-center">
          <p className="max-w-full text-center font-display-bn text-lg font-semibold leading-normal text-[#344054]">
            শীঘ্রই আসছে
          </p>
        </div>
        <p className="mt-1 w-full text-center text-sm leading-normal text-[#667085]">
          Coming soon — this section is not available yet.
        </p>

        <Link
          href="/dashboard"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-[10px] bg-[#7311A0] px-8 font-display-bn text-[16px] font-bold leading-6 text-white transition hover:bg-[#681091] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7311A0] focus-visible:ring-offset-2"
        >
          ড্যাশবোর্ডে ফিরে যাও
        </Link>
      </div>
    </main>
  );
}
