const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBengaliDigits = (value: number) =>
  value.toString().replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] ?? digit);

