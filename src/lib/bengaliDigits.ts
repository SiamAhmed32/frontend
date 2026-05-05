const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBengaliDigits = (value: number | string) =>
  value.toString().replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] ?? digit);

export const formatBengaliCountdown = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (safeSeconds % 60).toString().padStart(2, '0');
  return toBengaliDigits(`${minutes}:${remainingSeconds}`);
};
