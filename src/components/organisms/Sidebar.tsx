import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  Clock, 
  History, 
  LogOut 
} from 'lucide-react';
import { SidebarItem } from '../molecules/SidebarItem';

export const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">P</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">পাঞ্জেরী</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <SidebarItem href="/dashboard" icon={LayoutDashboard} label="ড্যাশবোর্ড" />
        <SidebarItem href="/exams" icon={BookOpen} label="মক টেস্ট" />
        <SidebarItem href="/reviews" icon={History} label="পর্যালোচনা" />
        <SidebarItem href="/practice" icon={Clock} label="দ্রুত অনুশীলন" />
        <SidebarItem href="/doubts" icon={HelpCircle} label="সন্দেহ" />
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[#7C3AED]" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">Muhidul Hasan</span>
            <span className="text-xs text-gray-500">Student</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
