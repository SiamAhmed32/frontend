import { SocialIcon } from '@/components/atoms/SocialIcon';

export function SocialLoginSection() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex h-5 w-full items-center gap-2">
        <div className="h-px flex-1 bg-white/40" />
        <span className="font-['Inter'] text-[16px] font-normal leading-[20px] tracking-[0] text-[#344054]">
          OR
        </span>
        <div className="h-px flex-1 bg-white/40" />
      </div>
      <div className="flex w-full flex-col gap-3">
        <button
          className="flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-2.5 font-['Inter'] text-[16px] font-semibold leading-[24px] tracking-[0] text-[#344054]"
          type="button"
        >
          <SocialIcon platform="google" />
          Continue with Google
        </button>
        <button
          className="flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-2.5 font-['Inter'] text-[16px] font-semibold leading-[24px] tracking-[0] text-[#344054]"
          type="button"
        >
          <SocialIcon platform="facebook" />
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
