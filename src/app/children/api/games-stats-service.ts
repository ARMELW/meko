import { fetchApi } from '@/services/api/http';

export interface GamesStats {
  total: number;
  byStatus: Record<string, number>;
}

export interface GamesStatsResponse {
  success: boolean;
  data: GamesStats;
  error?: string;
}

export async function fetchGamesStats(childId: string): Promise<GamesStatsResponse> {
  return fetchApi<GamesStatsResponse>(`api/v1/children/${childId}/games/stats`, { method: 'GET', credentials: 'include' });
}
