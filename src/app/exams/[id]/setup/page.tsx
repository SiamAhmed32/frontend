import ExamSetupContent from '@/components/templates/ExamSetupContent';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function ExamSetupPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ExamSetupContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
