'use client';

import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { ExamListContent } from '@/components/templates/ExamListContent';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ExamListContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
