import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovieHooks';
import { useMovieSearchParams } from '../hooks/useSearchParams';
import ImdbLink from '../components/ImdbLink';
import EmptyState from '../components/EmptyState';
import { OmdbError } from '../services/api';
import MoviePoster from '../components/MoviePoster';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PageHead from '../components/PageHead';

const INITIAL_PARAMS = {
  initialSearch: '',
  initialType: 'movie',
  initialYear: '',
  initialPage: 1,
} as const;

const MovieList = () => {
  const navigate = useNavigate();
  const {
    search,
    type,
    year,
    page,
    updateSearch,
    updateType,
    updateYear,
    updatePage,
  } = useMovieSearchParams({ initialParams: INITIAL_PARAMS });

  const currentSearch = search ?? INITIAL_PARAMS.initialSearch;
  const currentType = type ?? INITIAL_PARAMS.initialType;
  const currentYear = year ?? INITIAL_PARAMS.initialYear;
  const currentPage = page ?? INITIAL_PARAMS.initialPage;

  const { data, isLoading, error, isFetching } = useSearchMovies(
    currentSearch,
    currentType,
    currentYear,
    currentPage
  );

  const totalPages = data ? Math.ceil(Number(data.totalResults) / 10) : 0;
  const hasNoResults = !isLoading && data?.Search?.length === 0;
  const isInitialState = !currentSearch && !isLoading && !error;

  const totalResults = data?.totalResults ? Number(data.totalResults) : 0;
  const searchMetadata = search
    ? `Search results for "${search}"${
        year ? ` (${year})` : ''
      } - ${totalResults} movies found`
    : 'Search movies, TV shows, and episodes from OMDB database';

  // Clear individual field
  const handleClearSearch = () => updateSearch('');
  const handleClearYear = () => updateYear('');

  return (
    <Box sx={{ pt: 2 }}>
      <PageHead
        title={search ? `Search: ${search}` : 'Movie Explorer'}
        description={searchMetadata}
        keywords={
          [
            'movie search',
            'OMDB',
            'movies',
            'TV shows',
            'film database',
            search ?? '',
            year ?? '',
          ].filter(Boolean) as string[]
        }
      />
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Search Movies"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Enter a movie title..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: search ? (
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
              value={type}
              label="Type"
              onChange={(e) => updateType(e.target.value)}
            >
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="series">TV Series</MenuItem>
              <MenuItem value="episode">Episode</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Year"
            value={year}
            onChange={(e) => updateYear(e.target.value)}
            placeholder="e.g., 2024"
            InputProps={{
              endAdornment: year ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearYear} edge="end" size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Grid>
      </Grid>

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
        <EmptyState type="no-results" searchTerm={currentSearch} />
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
                page={currentPage}
                onChange={(_, value) => updatePage(value)}
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
