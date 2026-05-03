import Image from 'next/image';

interface PanjeriBrandProps {
  className?: string;
}

export function PanjeriBrand({ className }: PanjeriBrandProps) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt=""
        width={36.56}
        height={36.56}
        aria-hidden="true"
        className="shrink-0"
      />
      <span className="font-['Baloo_Da_2'] text-[33.75px] font-bold leading-none tracking-[0] text-[#1F1F1F]">
        পাঞ্জেরী
      </span>
    </div>
  );
}
