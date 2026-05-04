'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { AuthFooterLink } from '@/components/molecules/AuthFooterLink';
import { RegisterForm, RegisterFormValues } from '@/components/organisms/RegisterForm';
import { RegisterHeader } from '@/components/organisms/RegisterHeader';
import { AuthPageShell } from '@/components/templates/AuthPageShell';
import { clearAuthError, registerUser } from '@/features/auth/authSlice';
import { selectAuthError } from '@/features/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { store } from '@/store/store';

const initialValues: RegisterFormValues = {
  name: '',
  phone: '+880',
  level: 'HSC',
  batch: '2025',
  group: 'Science',
  version: 'English',
  password: '',
  confirmPassword: '',
};

export default function RegisterPage() {
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authError = useAppSelector(selectAuthError);

  const handleChange = (field: keyof RegisterFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setLocalError(null);
    dispatch(clearAuthError());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    dispatch(clearAuthError());
    dispatch(
      registerUser({
        name: values.name,
        phone: values.phone,
        level: values.level,
        batch: values.batch,
        group: values.group,
        version: values.version,
        password: values.password,
      })
    );
    const registrationError = store.getState().auth.error;
    if (!registrationError) {
      router.push('/dashboard');
    }
  };

  const displayError = localError ?? authError;

  return (
    <AuthPageShell variant="register">
      <RegisterHeader />
      <RegisterForm
        error={displayError}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <AuthFooterLink href="/login" prompt="Already have an account?" linkLabel="Log in" />
    </AuthPageShell>
  );
}
