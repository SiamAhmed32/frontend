'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { AuthFooterLink } from '@/components/molecules/AuthFooterLink';
import { AuthHeader } from '@/components/organisms/AuthHeader';
import { LoginForm } from '@/components/organisms/LoginForm';
import { SocialLoginSection } from '@/components/organisms/SocialLoginSection';
import { AuthPageShell } from '@/components/templates/AuthPageShell';
import { loginUser } from '@/features/auth/authSlice';
import { selectAuthError, selectIsAuthenticated } from '@/features/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function LoginPage() {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const authError = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(contact));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(searchParams.get('next') ?? '/dashboard');
    }
  }, [isAuthenticated, router, searchParams]);

  return (
    <AuthPageShell>
      <AuthHeader
        title="Log in to your account"
        subtitle="Welcome back! Please enter your details."
      />
      <LoginForm
        contact={contact}
        password={password}
        error={authError}
        onContactChange={setContact}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
      <SocialLoginSection />
      <AuthFooterLink href="/register" />
    </AuthPageShell>
  );
}
