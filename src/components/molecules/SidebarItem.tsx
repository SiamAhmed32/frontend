'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  iconSrc?: string;
  icon?: ReactNode;
  label: string;
  isActive?: (pathname: string) => boolean;
  onNavigate?: () => void;
}

export function SidebarItem({
  href,
  iconSrc,
  icon,
  label,
  isActive: isActiveFn,
  onNavigate,
}: SidebarItemProps) {
  const pathname = usePathname();
  const active = isActiveFn ? isActiveFn(pathname) : pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'flex h-[45px] w-full items-center rounded-xl px-4 py-2 font-display-bn text-sm font-normal leading-tight tracking-[0] transition-[background-color,color,filter] duration-150',
        active
          ? 'bg-[linear-gradient(95.7deg,rgba(53,57,221,0.05)_13.77%,rgba(144,17,199,0.05)_56.93%)] text-[#1C1C1C]'
          : 'text-[#1C1C1C]'
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 shrink-0 object-contain"
            aria-hidden
          />
        ) : (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[#575757]">
            {icon}
          </span>
        )}
        <span className="truncate">{label}</span>
      </span>
    </Link>
  );
}
