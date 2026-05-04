import type { StandardId } from '@/features/exam/standards';
import { standardOptions } from '@/features/exam/standards';
import { StandardRadioCard } from '@/components/molecules/StandardRadioCard';

export function StandardSelectionGrid({
  value,
  onChange,
}: {
  value: StandardId;
  onChange: (next: StandardId) => void;
}) {
  return (
    <section className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      {standardOptions.map((option) => (
        <StandardRadioCard
          key={option.id}
          label={option.label}
          checked={value === option.id}
          onSelect={() => onChange(option.id)}
        />
      ))}
    </section>
  );
}

