'use client';

import Image from 'next/image';
import {
  Bell,
  Bot,
  CalendarDays,
  FileQuestion,
  LayoutDashboard,
  LibraryBig,
  NotebookTabs,
  Send,
  Trash2,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { PanjeriBrand } from '@/components/molecules/PanjeriBrand';
import { SidebarItem } from '@/components/molecules/SidebarItem';
import { selectCurrentUser } from '@/features/auth/selectors';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';

interface NavItemConfig {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    href: '/dashboard',
    label: 'ড্যাশবোর্ড',
    icon: <LayoutDashboard className="size-4" />,
    isActive: (pathname) => pathname === '/dashboard',
  },
  {
    href: '/dashboard',
    label: 'প্রস্তুতি নাও',
    icon: <NotebookTabs className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'পরীক্ষা দাও',
    icon: <Send className="size-4" />,
    isActive: (pathname) => pathname.startsWith('/exams'),
  },
  {
    href: '/dashboard',
    label: 'প্রশ্ন ব্যাংক',
    icon: <FileQuestion className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'AI ডাউট সলভ',
    icon: <Bot className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'রুটিন',
    icon: <CalendarDays className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'রিভিউ',
    icon: <NotebookTabs className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'ই-লাইব্রেরী',
    icon: <LibraryBig className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'নোটিশ বোর্ড',
    icon: <Bell className="size-4" />,
    isActive: () => false,
  },
  {
    href: '/dashboard',
    label: 'সন্দেহ',
    icon: <Trash2 className="size-4" />,
    isActive: () => false,
  },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const user = useAppSelector(selectCurrentUser);

  return (
    <aside
      className={cn(
        'flex h-full min-h-screen w-[283px] flex-col justify-between border-r border-white/70 bg-[#F6F6F6] px-2 pb-2 pt-5 shadow-[0_2px_20.6px_0_rgba(24,34,41,0.04)]',
        className
      )}
    >
      <div className="flex w-full flex-col">
        <PanjeriBrand variant="sidebar" className="px-6 pb-4" />

        <nav className="flex w-full flex-col gap-3 px-3 py-4" aria-label="প্রধান মেনু">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={`${item.href}-${item.label}`}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={item.isActive}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </div>

      <div className="flex h-20 w-full items-center gap-3 border-t border-white px-6 py-5">
        <Image
          src="/Avatar.png"
          alt=""
          width={30}
          height={30}
          className="h-[30px] w-[30px] shrink-0 rounded-full object-cover"
          aria-hidden
        />
        <div className="min-w-0">
          <p
            className="truncate font-['Inter',sans-serif] text-sm font-medium leading-5 tracking-[0] text-[#344054]"
            title={user?.name ?? 'Muhidul Hasan'}
          >
            {user?.name ?? 'Muhidul Hasan'}
          </p>
          <p className="font-['Inter',sans-serif] text-sm font-normal leading-5 tracking-[0] text-[#475467]">
            Student
          </p>
        </div>
      </div>
    </aside>
  );
}
