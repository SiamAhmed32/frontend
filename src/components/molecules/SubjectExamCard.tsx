'use client';

import Image from 'next/image';
import Link from 'next/link';
import { dashboardExamEmojiUrl } from '@/lib/dashboardExamAssets';
import { cn } from '@/lib/utils';

interface SubjectExamCardProps {
  href: string;
  title: string;
  iconSrc?: string | null;
  className?: string;
  onSelect?: () => void;
}

export function SubjectExamCard({
  href,
  title,
  iconSrc,
  className,
  onSelect,
}: SubjectExamCardProps) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className={cn(
        'flex min-h-[114px] w-full flex-col items-center justify-center gap-3 rounded-[20px] border border-white bg-white px-4 py-5 text-center shadow-[0_18px_34px_rgba(16,24,40,0.04)] backdrop-blur-[10px] transition hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(16,24,40,0.08)]',
        'lg:h-[114px] lg:min-h-0',
        className
      )}
    >
      {iconSrc ? (
        <Image
          src={dashboardExamEmojiUrl(iconSrc)}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          aria-hidden
        />
      ) : null}
      <span className="font-display-bn text-[16px] font-semibold leading-[1.4] tracking-[0] text-[#101828]">
        {title}
      </span>
    </Link>
  );
}
