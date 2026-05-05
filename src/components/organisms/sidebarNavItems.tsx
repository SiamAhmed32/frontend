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

export const NAV_ITEMS: NavItemConfig[] = [
  { href: '/dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="size-4" />, isActive: (pathname) => pathname === '/dashboard' },
  { href: '/coming-soon/preparation', label: 'প্রস্তুতি নাও', icon: <NotebookTabs className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/preparation' },
  { href: '/dashboard', label: 'পরীক্ষা দাও', icon: <Send className="size-4" />, isActive: (pathname) => pathname.startsWith('/exams') },
  { href: '/coming-soon/question-bank', label: 'প্রশ্ন ব্যাংক', icon: <FileQuestion className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/question-bank' },
  { href: '/coming-soon/ai-doubt', label: 'AI ডাউট সলভ', icon: <Bot className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/ai-doubt' },
  { href: '/coming-soon/routine', label: 'রুটিন', icon: <CalendarDays className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/routine' },
  { href: '/coming-soon/review', label: 'রিভিউ', icon: <NotebookTabs className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/review' },
  { href: '/coming-soon/library', label: 'ই-লাইব্রেরী', icon: <LibraryBig className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/library' },
  { href: '/coming-soon/notice', label: 'নোটিশ বোর্ড', icon: <Bell className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/notice' },
  { href: '/coming-soon/doubts', label: 'সন্দেহ', icon: <Trash2 className="size-4" />, isActive: (pathname) => pathname === '/coming-soon/doubts' },
];
