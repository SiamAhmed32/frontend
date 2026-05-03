import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Clock, 
  History, 
} from 'lucide-react';
import { SidebarItem } from '../molecules/SidebarItem';

export const Sidebar = () => {
  return (
    <aside>
      <div>
        <div>
          <span>P</span>
        </div>
        <h1>পাঞ্জেরী</h1>
      </div>

      <nav>
        <SidebarItem href="/dashboard" icon={LayoutDashboard} label="ড্যাশবোর্ড" />
        <SidebarItem href="/exams" icon={BookOpen} label="মক টেস্ট" />
        <SidebarItem href="/reviews" icon={History} label="পর্যালোচনা" />
        <SidebarItem href="/practice" icon={Clock} label="দ্রুত অনুশীলন" />
        <SidebarItem href="/doubts" icon={HelpCircle} label="সন্দেহ" />
      </nav>

      <div>
        <div>
          <div />
          <div>
            <span>Student Name</span>
            <span>Student</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
