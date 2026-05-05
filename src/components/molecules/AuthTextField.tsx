import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';

interface AuthTextFieldProps {
  autoComplete?: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export function AuthTextField({
  autoComplete,
  id,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: AuthTextFieldProps) {
  return (
    <FormField className="h-[70px]" htmlFor={id} label={label}>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        variant="auth"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </FormField>
  );
}
