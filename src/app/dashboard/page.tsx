'use client';

import Link from 'next/link';
import { logoutUser } from '@/features/auth/authSlice';
import { selectCurrentUser } from '@/features/auth/selectors';
import { AuthGuard } from '@/components/templates/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function DashboardPage() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <AuthGuard>
      <DashboardLayout>
        <h1>ড্যাশবোর্ড</h1>
        <p>Welcome, {user?.name}</p>
        <Link href="/exams">পরীক্ষা দাও</Link>
        <button type="button" onClick={() => dispatch(logoutUser())}>
          Logout
        </button>
      </DashboardLayout>
    </AuthGuard>
  );
}
