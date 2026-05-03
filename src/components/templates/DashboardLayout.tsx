import React from 'react';
import { Sidebar } from '../organisms/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main>
        <div>
          {children}
        </div>
      </main>
    </div>
  );
};
