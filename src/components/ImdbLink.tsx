import { Link, Box, Tooltip } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'

interface ImdbLinkProps {
  imdbId: string
  sx?: object
}

const ImdbLink = ({ imdbId, sx = {} }: ImdbLinkProps) => {
  return (
    <Tooltip title="View on IMDb">
      <Box 
        component={Link} 
        href={`https://www.imdb.com/title/${imdbId}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: '#f3ce13', // IMDb yellow
          textDecoration: 'none',
          '&:hover': {
            color: '#dcb90f',
          },
          ...sx
        }}
        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the link
      >
        <MovieIcon sx={{ mr: 0.5 }} />
        IMDb
      </Box>
    </Tooltip>
  )
}

export default ImdbLink 