import Image from 'next/image';
import { Clock3 } from 'lucide-react';

export function ExamProgressBar({
  progress,
  showClockAsset,
  onClockError,
}: {
  progress: number;
  showClockAsset: boolean;
  onClockError: () => void;
}) {
  const clamped = Math.max(0, Math.min(progress, 100));

  return (
    <div className="relative mt-6 h-[5px] w-full rounded-[200px] bg-[#D0D5DD]">
      <div
        className="h-[5px] rounded-[200px] bg-[#7F56D9] transition-[width]"
        style={{ width: `${clamped}%` }}
      />
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7F56D9] p-1 shadow-[0_2px_10px_rgba(127,86,217,0.35)]"
        style={{ left: `${clamped}%` }}
      >
        {showClockAsset ? (
          <Image
            src="/Clock Alarm.png"
            alt=""
            width={16}
            height={16}
            className="size-4 object-contain"
            aria-hidden
            onError={onClockError}
          />
        ) : (
          <Clock3 className="size-4 text-white" strokeWidth={2.4} />
        )}
      </div>
    </div>
  );
}

