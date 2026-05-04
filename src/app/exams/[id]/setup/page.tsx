import { ExamTopicSelectContent } from '@/components/templates/ExamTopicSelectContent';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';

export default function ExamSetupPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ExamTopicSelectContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
