import { fetchApi } from '@/services/api/http';

export interface ProgressSummary {
  gamesCompleted: number;
  gamesInProgress: number;
  progressPercent: number;
  totalTimeSpent: number;
  statusPie: Record<string, number>;
}

export interface ProgressSummaryResponse {
  success: boolean;
  data: ProgressSummary;
  error?: string;
}

export async function fetchProgressSummary(childId: string): Promise<ProgressSummaryResponse> {
  return fetchApi<ProgressSummaryResponse>(`api/v1/children/${childId}/progress/summary`, { method: 'GET', credentials: 'include' });
}
