'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { RegisterHeader } from '@/components/organisms/RegisterHeader';
import { AuthPageShell } from '@/components/templates/AuthPageShell';
import { registerUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser({ name, contact }));
    router.push('/dashboard');
  };

  return (
    <AuthPageShell variant="register">
      <RegisterHeader />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label htmlFor="contact">Email or phone</label>
        <input
          id="contact"
          name="contact"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </AuthPageShell>
  );
}
