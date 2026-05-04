'use client';

import React, { useState } from 'react';
import { MenuIcon } from '@/components/atoms/MenuIcon';
import { Sidebar } from '@/components/organisms/Sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(45deg,rgba(166,192,254,0.5)_0%,rgba(255,234,246,0.5)_100%)] lg:pl-[283px]">
      <button
        type="button"
        className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAECF0] bg-white text-[#344054] shadow-sm lg:hidden"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-expanded={sidebarOpen}
        aria-label={sidebarOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
      >
        <MenuIcon className="h-5 w-5" open={sidebarOpen} />
      </button>

      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
          aria-label="মেনু বন্ধ করুন"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar
        onNavigate={() => setSidebarOpen(false)}
        className={cn(
          'fixed inset-y-0 left-0 z-[60] w-[min(283px,86vw)] transition-transform duration-200 ease-out lg:w-[283px] lg:translate-x-0 lg:shadow-none',
          sidebarOpen
            ? 'translate-x-0 shadow-xl'
            : '-translate-x-full'
        )}
      />

      <div className="flex min-h-screen min-w-0 flex-col pt-14 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
