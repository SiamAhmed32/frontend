/**
 * Sidebar items that are not built yet route to /coming-soon/[slug].
 * Slugs map to displayed Bengali titles.
 */
export const COMING_SOON_LABELS: Record<string, string> = {
  preparation: 'প্রস্তুতি নাও',
  'question-bank': 'প্রশ্ন ব্যাংক',
  'ai-doubt': 'AI ডাউট সলভ',
  routine: 'রুটিন',
  review: 'রিভিউ',
  library: 'ই-লাইব্রেরী',
  notice: 'নোটিশ বোর্ড',
  doubts: 'সন্দেহ',
};

export function getComingSoonLabel(slug: string): string | null {
  return COMING_SOON_LABELS[slug] ?? null;
}
