import { FormEvent } from 'react';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { AuthTextField } from '@/components/molecules/AuthTextField';
import { FormField } from '@/components/molecules/FormField';
import { batchOptions, groupOptions, levelOptions, versionOptions } from '@/components/organisms/registerOptions';

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

export function RegisterForm({ error, values, onChange, onSubmit }: RegisterFormProps) {
  return (
    <form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-5">
        <AuthTextField id="name" name="name" label="Name" autoComplete="name" value={values.name} placeholder="Enter your name" onChange={(value) => onChange('name', value)} />
        <AuthTextField id="phone" name="phone" label="Phone" type="tel" autoComplete="tel" value={values.phone} placeholder="+880" onChange={(value) => onChange('phone', value)} />
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
        <AuthTextField id="password" name="password" label="Password" type="password" autoComplete="new-password" value={values.password} placeholder="Password" onChange={(value) => onChange('password', value)} />
        <AuthTextField id="confirm-password" name="confirmPassword" label="Confirm Password" type="password" autoComplete="new-password" value={values.confirmPassword} placeholder="Confirm Password" onChange={(value) => onChange('confirmPassword', value)} />
      </div>
      {error && <p className="text-[14px] leading-5 tracking-[0] text-[#BA6262]">{error}</p>}
      <Button size="full" type="submit">
        Register
      </Button>
    </form>
  );
}
