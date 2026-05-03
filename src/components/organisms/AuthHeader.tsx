import { PanjeriBrand } from '@/components/molecules/PanjeriBrand';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <header className="flex w-full flex-col items-center gap-6">
      <PanjeriBrand className="flex items-center justify-center gap-2" />
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <h1 className="w-full font-['Inter'] text-[30px] font-semibold leading-[38px] tracking-[0] text-[#101828]">
          {title}
        </h1>
        {subtitle && (
          <p className="w-full font-['Inter'] text-[16px] font-normal leading-[24px] tracking-[0] text-[#475467]">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
