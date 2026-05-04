import Image from 'next/image';

export function ExamListHeader() {
  return (
    <header className="flex w-full items-start justify-between gap-8">
      <div className="min-w-0">
        <h1 className="font-display-bn text-[20px] font-bold leading-[1.4] tracking-[0] text-[#101828]">
          পরীক্ষা দাও
        </h1>
        <p className="mt-4 font-display-bn text-[20px] font-semibold leading-[1.4] tracking-[0] text-[#101828]">
          কি বিষয়ে পরীক্ষা দিতে চাও ?
        </p>
      </div>
      <button
        type="button"
        className="mt-0 flex h-6 w-6 shrink-0 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#6941C6] focus-visible:ring-offset-2"
        aria-label="নোটিফিকেশন"
      >
        <Image
          src="/mockeTest/notificationIcon.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          aria-hidden
        />
      </button>
    </header>
  );
}
