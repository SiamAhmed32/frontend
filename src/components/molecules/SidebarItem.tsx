'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3',
        isActive && 'font-semibold'
      )}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
};
