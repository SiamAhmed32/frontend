import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PanjeriBrandProps {
  className?: string;
  variant?: 'auth' | 'sidebar';
}

export function PanjeriBrand({ className, variant = 'auth' }: PanjeriBrandProps) {
  if (variant === 'sidebar') {
    return (
      <div className={cn('flex h-6 items-center gap-1.5', className)}>
        <Image
          src="/logo.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain"
          aria-hidden
        />
        <span className="font-display-bn text-[18px] font-bold leading-none tracking-[0] text-[#1F1F1F]">
          পাঞ্জেরী
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      <Image src="/logo.png" alt="" width={37} height={37} aria-hidden className="shrink-0" />
      <span className="font-display-bn text-[33.75px] font-bold leading-none tracking-[0] text-[#1F1F1F]">
        পাঞ্জেরী
      </span>
    </div>
  );
}
