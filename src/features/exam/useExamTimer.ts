'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { submitExam } from '@/features/exam/examSlice';
import { useAppDispatch } from '@/store/hooks';

interface UseExamTimerArgs {
  durationMinutes: number;
  startedAt: string | null;
  subjectId: string;
  onExpired: () => void;
}

const getRemainingSeconds = (durationSeconds: number, startedAt: string | null, now: number) => {
  if (!startedAt || now === 0) return durationSeconds;
  const startedAtMs = new Date(startedAt).getTime();
  const elapsed = Math.max(0, Math.floor((now - startedAtMs) / 1000));
  return Math.max(durationSeconds - elapsed, 0);
};

export function useExamTimer({ durationMinutes, startedAt, subjectId, onExpired }: UseExamTimerArgs) {
  const dispatch = useAppDispatch();
  const [now, setNow] = useState(0);
  const didSubmit = useRef(false);
  const durationSeconds = durationMinutes * 60;

  useEffect(() => {
    didSubmit.current = false;
  }, [startedAt, subjectId]);

  useEffect(() => {
    if (!startedAt) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  const remainingSeconds = useMemo(
    () => getRemainingSeconds(durationSeconds, startedAt, now),
    [durationSeconds, now, startedAt]
  );

  useEffect(() => {
    if (!startedAt || remainingSeconds > 0 || didSubmit.current) return;
    didSubmit.current = true;
    dispatch(submitExam(subjectId));
    onExpired();
  }, [dispatch, onExpired, remainingSeconds, startedAt, subjectId]);

  return { remainingSeconds };
}
