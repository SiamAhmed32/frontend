import { PanjeriBrand } from '@/components/molecules/PanjeriBrand';

export function RegisterHeader() {
  return (
    <header className="flex w-full flex-col items-center gap-[11.25px]">
      <PanjeriBrand className="flex h-[45px] w-[150.47px] items-center justify-center gap-[11.25px]" />
      <h1 className="w-full text-center font-['Inter'] text-[20px] font-semibold leading-[38px] tracking-[0] text-[#101828]">
        Create new Account
      </h1>
    </header>
  );
}
