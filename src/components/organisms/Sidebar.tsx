'use client';

import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PanjeriBrand } from '@/components/molecules/PanjeriBrand';
import { SidebarItem } from '@/components/molecules/SidebarItem';
import { NAV_ITEMS } from '@/components/organisms/sidebarNavItems';
import { logoutUser } from '@/features/auth/authSlice';
import { selectCurrentUser } from '@/features/auth/selectors';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  return (
    <aside
      className={cn(
        'flex h-screen min-h-0 w-[283px] flex-col border-r border-white/70 bg-[#F6F6F6] px-2 pb-2 pt-5 shadow-[0_2px_20.6px_0_rgba(24,34,41,0.04)]',
        className
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <PanjeriBrand variant="sidebar" className="px-6 pb-4" />

        <nav className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4" aria-label="প্রধান মেনু">
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

      <div className="w-full shrink-0 border-t border-white px-6 py-3">
        <div className="flex items-center gap-3">
          <Image src="/Avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover" aria-hidden />
          <div className="min-w-0">
            <p className="truncate font-['Inter',sans-serif] text-sm font-medium leading-5 tracking-[0] text-[#344054]" title={user?.name ?? 'Muhidul Hasan'}>
              {user?.name ?? 'Muhidul Hasan'}
            </p>
            <p className="font-['Inter',sans-serif] text-sm font-normal leading-5 tracking-[0] text-[#475467]">Student</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 font-['Inter',sans-serif] text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
          onClick={() => {
            dispatch(logoutUser());
            onNavigate?.();
            router.replace('/login');
          }}
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
