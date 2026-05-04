'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { AuthFooterLink } from '@/components/molecules/AuthFooterLink';
import { AuthHeader } from '@/components/organisms/AuthHeader';
import { LoginForm } from '@/components/organisms/LoginForm';
import { SocialLoginSection } from '@/components/organisms/SocialLoginSection';
import { AuthPageShell } from '@/components/templates/AuthPageShell';
import { clearAuthError, loginUser } from '@/features/auth/authSlice';
import { selectAuthError, selectIsAuthenticated } from '@/features/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authError = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearAuthError());
    dispatch(loginUser({ phone, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <AuthPageShell>
      <AuthHeader
        title="Log in to your account"
        subtitle="Welcome back! Please enter your details."
      />
      <LoginForm
        phone={phone}
        password={password}
        error={authError}
        onPhoneChange={(value) => {
          setPhone(value);
          dispatch(clearAuthError());
        }}
        onPasswordChange={(value) => {
          setPassword(value);
          dispatch(clearAuthError());
        }}
        onSubmit={handleSubmit}
      />
      <SocialLoginSection />
      <AuthFooterLink href="/register" />
    </AuthPageShell>
  );
}
