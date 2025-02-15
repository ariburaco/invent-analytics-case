import { describe, it, expect, vi, Mocked } from 'vitest';
import axios from 'axios';
import { searchMovies, getMovieById, OmdbError } from '../api';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('API Services', () => {
  describe('searchMovies', () => {
    it('successfully searches movies', async () => {
      const mockResponse = {
        data: {
          Search: [
            {
              Title: 'Test Movie',
              Year: '2024',
              imdbID: 'tt1234567',
              Type: 'movie',
              Poster: 'https://example.com/poster.jpg',
            },
          ],
          totalResults: '1',
          Response: 'True',
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await searchMovies('test');
      expect(result.Search).toHaveLength(1);
      expect(result.Search[0].Title).toBe('Test Movie');
    });

    it('throws OmdbError when API returns error', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          Response: 'False',
          Error: 'Movie not found!',
        },
      });

      await expect(searchMovies('nonexistent')).rejects.toThrow(OmdbError);
    });
  });

  describe('getMovieById', () => {
    it('successfully fetches movie details', async () => {
      const mockResponse = {
        data: {
          Title: 'Test Movie',
          Year: '2024',
          imdbID: 'tt1234567',
          Plot: 'Test plot',
          Response: 'True',
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getMovieById('tt1234567');
      expect(result.Title).toBe('Test Movie');
    });

    it('throws OmdbError when movie is not found', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          Response: 'False',
          Error: 'Movie not found!',
        },
      });

      await expect(getMovieById('invalid')).rejects.toThrow(OmdbError);
    });
  });
});
