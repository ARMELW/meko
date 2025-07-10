import { useQuery } from '@tanstack/react-query';
import { gameSearchService } from '../api/game-search-service';
import { gameSearchKeys } from '../config';
import { Game } from '../types';
import { useMemo } from 'react';

export const useGameSuggestions = (childId: string, search: string, enabled: boolean = true) => {
  const query = useQuery<Game[]>({
    queryKey: [...gameSearchKeys.all, 'suggestions', childId, search],
    queryFn: async () => {
      if (!search.trim() || search.length < 2) return [];
      
      const response = await gameSearchService.search(childId, {
        search: search.trim(),
        page: 1,
        limit: 5 // Limiter à 5 suggestions pour une interface propre
      });
      
      return response.games;
    },
    enabled: enabled && !!childId && search.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false
  });

  // Filtrer et optimiser les suggestions
  const suggestions = useMemo(() => {
    if (!query.data) return [];
    
    return query.data
      .filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [query.data, search]);

  return {
    suggestions,
    isLoading: query.isLoading,
    error: query.error,
    hasResults: suggestions.length > 0
  };
};
