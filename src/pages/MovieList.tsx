import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ImdbLink from '../components/ImdbLink';
import MoviePoster from '../components/MoviePoster';
import PageHead from '../components/PageHead';
import { useSearchMovies } from '../hooks/useMovieHooks';
import { OmdbError } from '../services/api';

const INITIAL_PARAMS = {
  initialSearch: '',
  initialType: 'movie',
  initialYear: '',
  initialPage: 1,
} as const;

const SEARCH_TYPES = [
  { value: 'movie', label: 'Movies' },
  { value: 'series', label: 'TV Series' },
  { value: 'episode', label: 'Episodes' },
] as const;

const MovieList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useQueryState('s');
  const [type, setType] = useQueryState('type');
  const [year, setYear] = useQueryState('y');
  const [page, setPage] = useQueryState('page');

  // Initialize form state with URL params
  const [searchForm, setSearchForm] = useState({
    searchText: search ?? '',
    searchType: type ?? INITIAL_PARAMS.initialType,
    searchYear: year ?? '',
  });

  const { data, isLoading, error, isFetching, refetch } = useSearchMovies(
    search ?? '',
    type ?? INITIAL_PARAMS.initialType,
    year ?? '',
    Number(page) || INITIAL_PARAMS.initialPage
  );

  useEffect(() => {
    if (search && search.trim() !== '') {
      refetch();
    }
  }, [search, type, year, page]);

  const handlePageChange = async (
    _: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    await setPage(newPage.toString());
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!searchForm.searchText.trim()) {
      return;
    }

    await setSearch(searchForm.searchText.trim());
    await setType(searchForm.searchType);
    if (searchForm.searchYear) {
      await setYear(searchForm.searchYear);
    } else {
      await setYear(null);
    }
    await setPage('1');

    await refetch();
  };

  const handleClearSearch = async () => {
    setSearchForm((prev) => ({ ...prev, searchText: '' }));
    await setSearch(null);
  };

  const handleClearYear = async () => {
    setSearchForm((prev) => ({ ...prev, searchYear: '' }));
    await setYear(null);
  };

  const totalPages = data ? Math.ceil(Number(data.totalResults) / 10) : 0;
  const hasNoResults = !isLoading && data?.Search?.length === 0;
  const isInitialState = !search || search.trim() === '';

  const totalResults = data?.totalResults ? Number(data.totalResults) : 0;
  const searchMetadata = search
    ? `Search results for "${search}"${
        year ? ` (${year})` : ''
      } - ${totalResults} movies found`
    : 'Search movies, TV shows, and episodes from OMDB database';

  return (
    <Box sx={{ pt: 2 }}>
      <PageHead
        title={
          searchForm.searchText
            ? `Search: ${searchForm.searchText}`
            : 'Movie Explorer'
        }
        description={searchMetadata}
        keywords={
          [
            'movie search',
            'OMDB',
            'movies',
            'TV shows',
            'film database',
            searchForm.searchText ?? '',
            searchForm.searchYear ?? '',
          ].filter(Boolean) as string[]
        }
      />

      <form onSubmit={handleSearch}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Movies"
              value={searchForm.searchText}
              onChange={(e) => {
                setSearchForm((prev) => ({
                  ...prev,
                  searchText: e.target.value,
                }));
              }}
              placeholder={
                searchForm.searchType === 'episode'
                  ? 'Enter episode title...'
                  : 'Enter title...'
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchForm.searchText ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearSearch}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={searchForm.searchType}
                label="Type"
                onChange={(e) => {
                  const newType = e.target.value;
                  setSearchForm((prev) => ({
                    ...prev,
                    searchType: newType,
                    searchText:
                      newType === 'episode' || prev.searchType === 'episode'
                        ? ''
                        : prev.searchText,
                  }));
                }}
              >
                {SEARCH_TYPES.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Year"
              value={searchForm.searchYear}
              onChange={(e) => {
                setSearchForm((prev) => ({
                  ...prev,
                  searchYear: e.target.value,
                }));
              }}
              placeholder={
                searchForm.searchType === 'episode'
                  ? 'Episode air year'
                  : 'Release year'
              }
              InputProps={{
                endAdornment: searchForm.searchYear ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearYear}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              startIcon={<SearchIcon />}
              sx={{
                width: '100%',
                borderRadius: '25px',
                padding: '12px 30px',
                background: 'linear-gradient(45deg, #4ECDC4 30%, #21cbf3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                '&:hover': {
                  background:
                    'linear-gradient(45deg, #4ECDC4 60%, #21cbf3 90%)',
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {error ? (
        <Alert severity="error">
          {error instanceof OmdbError
            ? error.message
            : 'An unexpected error occurred while loading movies'}
        </Alert>
      ) : null}

      {isLoading || isFetching ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : isInitialState ? (
        <EmptyState type="initial" />
      ) : hasNoResults ? (
        <EmptyState type="no-results" searchTerm={search ?? ''} />
      ) : (
        <>
          <Grid container spacing={3}>
            {data?.Search?.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                >
                  <MoviePoster
                    posterUrl={movie.Poster}
                    title={movie.Title}
                    height={300}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" noWrap>
                      {movie.Title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {movie.Year}
                    </Typography>
                    <Box
                      sx={{
                        mt: 'auto',
                        pt: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        ID: {movie.imdbID}
                      </Typography>
                      <ImdbLink imdbId={movie.imdbID} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={Number(page) || INITIAL_PARAMS.initialPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default MovieList;
