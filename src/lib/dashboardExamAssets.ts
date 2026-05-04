/** Raster tiles for `/dashboard` ও `/exams` subject grid (`public/dashboardsExams/`). */
export const DASHBOARD_EXAM_IMAGE_BASE_PATH = '/dashboardsExams';

export function dashboardExamEmojiUrl(fileName: string): string {
  return encodeURI(`${DASHBOARD_EXAM_IMAGE_BASE_PATH}/${fileName}`);
}
