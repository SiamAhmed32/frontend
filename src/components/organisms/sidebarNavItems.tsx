'use client';

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

export interface NavItemConfig {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: (pathname: string) => boolean;
}

/** Canonical links use hyphens; underscore URLs redirect in `next.config.ts`. */
function isComingSoonActive(slug: string, pathname: string): boolean {
  return pathname === `/coming-soon/${slug}` || pathname === `/coming_soon/${slug}`;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { href: '/dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="size-4" />, isActive: (pathname) => pathname === '/dashboard' },
  {
    href: '/coming-soon/preparation',
    label: 'প্রস্তুতি নাও',
    icon: <NotebookTabs className="size-4" />,
    isActive: (pathname) => isComingSoonActive('preparation', pathname),
  },
  { href: '/dashboard', label: 'পরীক্ষা দাও', icon: <Send className="size-4" />, isActive: (pathname) => pathname.startsWith('/exams') },
  {
    href: '/coming-soon/question-bank',
    label: 'প্রশ্ন ব্যাংক',
    icon: <FileQuestion className="size-4" />,
    isActive: (pathname) => isComingSoonActive('question-bank', pathname),
  },
  {
    href: '/coming-soon/ai-doubt',
    label: 'AI ডাউট সলভ',
    icon: <Bot className="size-4" />,
    isActive: (pathname) => isComingSoonActive('ai-doubt', pathname),
  },
  {
    href: '/coming-soon/routine',
    label: 'রুটিন',
    icon: <CalendarDays className="size-4" />,
    isActive: (pathname) => isComingSoonActive('routine', pathname),
  },
  {
    href: '/coming-soon/review',
    label: 'রিভিউ',
    icon: <NotebookTabs className="size-4" />,
    isActive: (pathname) => isComingSoonActive('review', pathname),
  },
  {
    href: '/coming-soon/library',
    label: 'ই-লাইব্রেরী',
    icon: <LibraryBig className="size-4" />,
    isActive: (pathname) => isComingSoonActive('library', pathname),
  },
  {
    href: '/coming-soon/notice',
    label: 'নোটিশ বোর্ড',
    icon: <Bell className="size-4" />,
    isActive: (pathname) => isComingSoonActive('notice', pathname),
  },
  {
    href: '/coming-soon/doubts',
    label: 'সন্দেহ',
    icon: <Trash2 className="size-4" />,
    isActive: (pathname) => isComingSoonActive('doubts', pathname),
  },
];
