import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { ExamResultContent } from '@/components/templates/ExamResultContent';

export default function ExamResultPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ExamResultContent />
      </DashboardLayout>
    </AuthGuard>
  );
}

