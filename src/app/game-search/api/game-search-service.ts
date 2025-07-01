import { fetchApi } from '@/services/api/http';
import { GameSearchParams, GameSearchResponse } from '../types';

export const gameSearchService = {
    search: async (childId: string, params: GameSearchParams): Promise<GameSearchResponse> => {
        const query = new URLSearchParams({
            ...(params.search ? { search: params.search } : {}),
            page: String(params.page ?? 1),
            limit: String(params.limit ?? 20)
        }).toString();
        const url = `api/v1/children/${childId}/games/search?${query}`;
        const result = await fetchApi<GameSearchResponse>(url, {});
        return result;
    }
};
