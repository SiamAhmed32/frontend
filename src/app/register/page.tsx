'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { RegisterForm, RegisterFormValues } from '@/components/organisms/RegisterForm';
import { RegisterHeader } from '@/components/organisms/RegisterHeader';
import { AuthPageShell } from '@/components/templates/AuthPageShell';
import { registerUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

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
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (field: keyof RegisterFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    dispatch(registerUser({ name: values.name, contact: values.phone }));
    router.push('/dashboard');
  };

  return (
    <AuthPageShell variant="register">
      <RegisterHeader />
      <RegisterForm
        error={error}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthPageShell>
  );
}
