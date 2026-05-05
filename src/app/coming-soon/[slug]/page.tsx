import { notFound } from 'next/navigation';
import { ComingSoonContent } from '@/components/templates/ComingSoonContent';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { getComingSoonLabel } from '@/lib/comingSoonRoutes';

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = getComingSoonLabel(slug);
  if (!label) {
    notFound();
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <ComingSoonContent featureLabel={label} />
      </DashboardLayout>
    </AuthGuard>
  );
}
