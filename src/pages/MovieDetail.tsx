import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  Fade,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import MovieDetailHeader from '../components/MovieDetailHeader';
import MoviePoster from '../components/MoviePoster';
import PageHead from '../components/PageHead';
import { useMovieDetails } from '../hooks/useMovieHooks';
import { OmdbError } from '../services/api';
import { ChatWithMovie } from '../components/ChatWithMovie';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useState } from 'react';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useMovieDetails(id);
  const [showChat, setShowChat] = useState(false);

  return (
    <Box>
      <PageHead
        title={movie ? movie.Title : 'Loading Movie...'}
        description={
          movie
            ? `${movie.Title} (${movie.Year}) - ${movie.Plot}`
            : 'Loading movie details...'
        }
        keywords={
          movie
            ? [
                movie.Title,
                movie.Year,
                movie.Director,
                movie.Actors,
                ...movie.Genre.split(', '),
                'movie details',
                'OMDB',
              ]
            : ['movie details', 'OMDB']
        }
        type="article"
        image={movie?.Poster !== 'N/A' ? movie?.Poster : undefined}
      />

      <MovieDetailHeader
        title={movie?.Title ?? 'Loading...'}
        imdbId={movie?.imdbID}
      />

      {error ? (
        <Alert severity="error">
          {error instanceof OmdbError
            ? error.message
            : 'An unexpected error occurred while loading movie details'}
        </Alert>
      ) : null}

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      ) : movie ? (
        <>
          <Card sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <MoviePoster
                  posterUrl={movie.Poster}
                  title={movie.Title}
                  height="100%" // Full height in detail view
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {movie.Title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {movie.Year} • {movie.Runtime} • {movie.Rated}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                    {movie.Genre.split(', ').map((genre) => (
                      <Chip
                        key={genre}
                        label={genre}
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Typography variant="body1" paragraph>
                    {movie.Plot}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    <strong>Director:</strong> {movie.Director}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Writers:</strong> {movie.Writer}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Actors:</strong> {movie.Actors}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Ratings
                    </Typography>
                    <Typography>
                      <strong>IMDb:</strong> {movie.imdbRating}/10
                    </Typography>
                    {movie.Ratings.map((rating) => (
                      <Typography key={rating.Source}>
                        <strong>{rating.Source}:</strong> {rating.Value}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowChat(!showChat)}
              startIcon={<SmartToyIcon />}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                borderRadius: '25px',
                color: 'white',
                padding: '12px 30px',
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #FF6B6B 60%, #4ECDC4 90%)',
                },
              }}
            >
              {showChat ? 'Hide AI Chat' : 'Chat with AI about this Movie'}
            </Button>
          </Box>

          <Fade in={showChat} timeout={900}>
            <div>
              <ChatWithMovie movie={movie} />
            </div>
          </Fade>
        </>
      ) : null}
    </Box>
  );
};

export default MovieDetail;
