import { cn } from '@/lib/utils';

export function StandardRadioCard({
  checked,
  label,
  onSelect,
}: {
  checked: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={checked}
      className="flex min-h-16 w-full items-center justify-between rounded-2xl border border-white bg-white px-4 py-5 text-left shadow-[0_2px_20.6px_rgba(24,34,41,0.04)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
    >
      <span className="min-w-0 truncate font-display-bn text-[16px] font-medium leading-[140%] text-[#101828]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'relative ml-4 flex size-5 shrink-0 items-center justify-center rounded-full border',
          checked ? 'border-[#7F56D9]' : 'border-[#D0D5DD] bg-white'
        )}
      >
        {checked ? <span className="size-2 rounded-full bg-[#7F56D9]" /> : null}
      </span>
    </button>
  );
}

