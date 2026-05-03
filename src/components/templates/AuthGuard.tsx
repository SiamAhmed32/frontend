'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { selectIsAuthenticated } from '@/features/auth/selectors';
import { useAppSelector } from '@/store/hooks';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
