import { useQuery } from '@tanstack/react-query';
import { getMovieById, searchMovies } from '../services/api';

export const useSearchMovies = (
  search: string,
  type: string,
  year: string,
  page: number
) => {
  return useQuery({
    queryKey: ['movies', search, type, year, page],
    queryFn: () => searchMovies(search, type, year, page),
    enabled: false, // Don't auto-fetch
    staleTime: Infinity, // Prevent auto-refetching
    retry: false, // Don't retry on error for search queries
    // Only allow refetch if we have a search term
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useMovieDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });
};
