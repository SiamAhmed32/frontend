import { ExamConfirmContent } from '@/components/templates/ExamConfirmContent';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function ExamConfirmPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ExamConfirmContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
