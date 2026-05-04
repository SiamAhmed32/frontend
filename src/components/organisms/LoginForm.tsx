import { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';

interface LoginFormProps {
  phone: string;
  password: string;
  error?: string | null;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  phone,
  password,
  error,
  onPhoneChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-5">
        <FormField className="h-[70px]" htmlFor="login-phone" label="Phone">
          <Input
            id="login-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            variant="auth"
            value={phone}
            placeholder="Enter your phone number"
            onChange={(event) => onPhoneChange(event.target.value)}
            required
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="login-password" label="Password">
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="auth"
            value={password}
            placeholder="Enter your password"
            onChange={(event) => onPasswordChange(event.target.value)}
            required
          />
        </FormField>
      </div>
      {error && <p className="text-[14px] leading-5 text-[#BA6262]">{error}</p>}
      <Button size="full" type="submit">
        Login
      </Button>
    </form>
  );
}
