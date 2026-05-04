import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { ExamSessionContent } from '@/components/templates/ExamSessionContent';

export default function ExamSessionPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ExamSessionContent />
      </DashboardLayout>
    </AuthGuard>
  );
}

