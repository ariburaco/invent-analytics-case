import axios from 'axios';
import { SearchResponse, MovieDetails } from '../types/movie';

const API_KEY = 'fef088d5'; // Replace with your actual API key
const BASE_URL = 'http://www.omdbapi.com';

// Custom error class for OMDB API errors
export class OmdbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OmdbError';
  }
}

// Type guard for OMDB error response
interface OmdbErrorResponse {
  Response: 'False';
  Error: string;
}

const isOmdbError = (data: any): data is OmdbErrorResponse => {
  return data.Response === 'False' && typeof data.Error === 'string';
};

export const searchMovies = async (
  search: string,
  type: string = 'movie',
  year: string = '',
  page: number = 1
): Promise<SearchResponse> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: search,
      type,
      y: year,
      page,
    },
  });

  if (isOmdbError(response.data)) {
    throw new OmdbError(response.data.Error);
  }

  return response.data;
};

export const getMovieById = async (id: string): Promise<MovieDetails> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: 'full',
    },
  });

  if (isOmdbError(response.data)) {
    throw new OmdbError(response.data.Error);
  }

  return response.data;
};
