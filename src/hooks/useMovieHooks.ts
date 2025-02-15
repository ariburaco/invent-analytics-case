import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getMovieById, searchMovies } from '../services/api';

const SEARCH_DEBOUNCE_MS = 300;

export const useSearchMovies = (
  search: string,
  type: string,
  year: string,
  page: number
) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedType, setDebouncedType] = useState(type);
  const [debouncedYear, setDebouncedYear] = useState(year);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedType(type);
      setDebouncedYear(year);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [search, type, year]);

  return useQuery({
    queryKey: ['movies', debouncedSearch, debouncedType, debouncedYear, page],
    queryFn: () =>
      searchMovies(debouncedSearch, debouncedType, debouncedYear, page),
    enabled: debouncedSearch.length >= 2,
  });
};

export const useMovieDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });
};
