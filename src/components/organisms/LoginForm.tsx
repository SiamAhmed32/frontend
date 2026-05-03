import { FormEvent } from 'react';

interface LoginFormProps {
  contact: string;
  password: string;
  error?: string | null;
  onContactChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  contact,
  password,
  error,
  onContactChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-1.5">
        <input
          className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 text-[16px] leading-[24px] tracking-[0] text-[#101828] placeholder:text-[#667085] shadow-[0_1px_2px_0_rgba(16,24,40,0.05),inset_0_-2px_0_0_rgba(16,24,40,0.05),inset_0_0_0_1px_rgba(16,24,40,0.18)] outline-none"
          name="contact"
          placeholder="Enter your phone number"
          value={contact}
          onChange={(event) => onContactChange(event.target.value)}
          required
        />
        <input
          className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-[14px] py-2.5 text-[16px] leading-[24px] tracking-[0] text-[#101828] placeholder:text-[#667085] shadow-[0_1px_2px_0_rgba(16,24,40,0.05),inset_0_-2px_0_0_rgba(16,24,40,0.05),inset_0_0_0_1px_rgba(16,24,40,0.18)] outline-none"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          required
        />
      </div>
      {error && <p className="text-[14px] leading-5 text-[#BA6262]">{error}</p>}
      <button
        className="h-11 w-full rounded-lg border-2 border-white/10 bg-[#7F56D9] px-4 py-2.5 text-[16px] font-semibold leading-[24px] tracking-[0] text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05),inset_0_-2px_0_0_rgba(16,24,40,0.05),inset_0_0_0_1px_rgba(16,24,40,0.18)]"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
