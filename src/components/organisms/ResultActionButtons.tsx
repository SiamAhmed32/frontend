import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

export function ResultActionButtons({
  onGoDashboard,
  onRetake,
}: {
  onGoDashboard: () => void;
  onRetake: () => void;
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button
        type="button"
        size="full"
        className="h-11 rounded-[10px] bg-[#7311A0] font-display-bn text-[16px] font-bold leading-6 text-white hover:bg-[#681091] sm:w-[220px]"
        onClick={onGoDashboard}
      >
        ড্যাশবোর্ডে যাও
      </Button>

      <Button
        type="button"
        size="full"
        className="h-11 rounded-[10px] border border-[#D0D5DD] bg-white font-display-bn text-[16px] font-bold leading-6 text-[#101828] hover:bg-[#F9FAFB] sm:w-[220px]"
        onClick={onRetake}
      >
        <RotateCcw className="size-4" />
        আবার দাও
      </Button>
    </div>
  );
}

