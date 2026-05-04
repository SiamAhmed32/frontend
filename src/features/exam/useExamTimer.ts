'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { submitExam } from '@/features/exam/examSlice';
import { useAppDispatch } from '@/store/hooks';

export function useExamTimer({
  durationMinutes,
  startedAt,
  subjectId,
  onExpired,
}: {
  durationMinutes: number;
  startedAt: string | null;
  subjectId: string;
  onExpired: () => void;
}) {
  const dispatch = useAppDispatch();
  const [tick, setTick] = useState(0);
  const didSubmit = useRef(false);
  const durationSeconds = durationMinutes * 60;

  const remainingSeconds = useMemo(() => {
    if (!startedAt) return durationSeconds;
    const elapsed = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000));
    return Math.max(durationSeconds - elapsed, 0);
  }, [durationSeconds, startedAt, tick]);

  useEffect(() => {
    if (!startedAt) return;
    if (remainingSeconds > 0) return;
    if (didSubmit.current) return;
    didSubmit.current = true;
    dispatch(submitExam(subjectId));
    onExpired();
  }, [dispatch, onExpired, remainingSeconds, startedAt, subjectId]);

  useEffect(() => {
    if (!startedAt) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  return { remainingSeconds };
}

