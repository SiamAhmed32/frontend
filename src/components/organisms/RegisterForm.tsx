import { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { FormField } from '@/components/molecules/FormField';

export interface RegisterFormValues {
  name: string;
  phone: string;
  level: string;
  batch: string;
  group: string;
  version: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  error?: string | null;
  values: RegisterFormValues;
  onChange: (field: keyof RegisterFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const levelOptions = [
  { label: 'HSC', value: 'HSC' },
  { label: 'SSC', value: 'SSC' },
];

const batchOptions = [
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026' },
];

const groupOptions = [
  { label: 'Science', value: 'Science' },
  { label: 'Commerce', value: 'Commerce' },
  { label: 'Arts', value: 'Arts' },
];

const versionOptions = [
  { label: 'English', value: 'English' },
  { label: 'Bangla', value: 'Bangla' },
];

export function RegisterForm({ error, values, onChange, onSubmit }: RegisterFormProps) {
  return (
    <form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-5">
        <FormField className="h-[70px]" htmlFor="name" label="Name">
          <Input
            id="name"
            name="name"
            variant="auth"
            value={values.name}
            placeholder="Type Your Name"
            onChange={(event) => onChange('name', event.target.value)}
            required
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="phone" label="Phone">
          <Input
            id="phone"
            name="phone"
            variant="auth"
            value={values.phone}
            onChange={(event) => onChange('phone', event.target.value)}
            required
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="level" label="Level">
          <Select
            id="level"
            name="level"
            options={levelOptions}
            value={values.level}
            onChange={(event) => onChange('level', event.target.value)}
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="batch" label="Batch">
          <Select
            id="batch"
            name="batch"
            options={batchOptions}
            value={values.batch}
            onChange={(event) => onChange('batch', event.target.value)}
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="group" label="Group">
          <Select
            id="group"
            name="group"
            options={groupOptions}
            value={values.group}
            onChange={(event) => onChange('group', event.target.value)}
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="version" label="Version">
          <Select
            id="version"
            name="version"
            options={versionOptions}
            value={values.version}
            onChange={(event) => onChange('version', event.target.value)}
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="password" label="Password">
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            variant="auth"
            value={values.password}
            onChange={(event) => onChange('password', event.target.value)}
            required
          />
        </FormField>
        <FormField className="h-[70px]" htmlFor="confirm-password" label="Confirm Password">
          <Input
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            variant="auth"
            value={values.confirmPassword}
            onChange={(event) => onChange('confirmPassword', event.target.value)}
            required
          />
        </FormField>
      </div>
      {error && <p className="text-[14px] leading-5 tracking-[0] text-[#BA6262]">{error}</p>}
      <Button size="full" type="submit">
        Register
      </Button>
    </form>
  );
}
