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
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
        isActive 
          ? 'bg-[#F3E8FF] text-[#7C3AED] font-semibold' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      <Icon className={cn(
        'w-5 h-5 transition-colors',
        isActive ? 'text-[#7C3AED]' : 'text-gray-400 group-hover:text-gray-600'
      )} />
      <span className="text-sm">{label}</span>
    </Link>
  );
};
