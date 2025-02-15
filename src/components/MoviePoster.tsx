import { Box } from '@mui/material'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'

interface MoviePosterProps {
  posterUrl: string
  title: string
  height?: number | string
}

const MoviePoster = ({ posterUrl, title, height = 200 }: MoviePosterProps) => {
  const isValidPoster = posterUrl && posterUrl !== 'N/A'

  if (!isValidPoster) {
    return (
      <Box
        sx={{
          height,
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-testid="movie-poster-fallback"
      >
        <LocalMoviesIcon
          sx={{
            fontSize: 64,
            color: 'grey.400',
          }}
        />
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={posterUrl}
      alt={title}
      sx={{
        height,
        width: '100%',
        objectFit: 'cover',
      }}
      data-testid="movie-poster-image"
    />
  )
}

export default MoviePoster 