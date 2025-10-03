import { useQuery } from '@tanstack/react-query';
import { searchMovies, getPopularMovies, MovieResponse } from '../lib/tmdb';

export const useMovies = (query: string, page: number, filters: { year: string; rating: string; language: string }) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ['movies', query, page, filters],
    queryFn: async () => {
      const response = query ? 
        await searchMovies(query, page, filters) : 
        await getPopularMovies(page, filters);

      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    placeholderData: (previousData) => previousData,
  });
}; 