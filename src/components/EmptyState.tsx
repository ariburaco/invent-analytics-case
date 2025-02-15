import { Box, Typography, SvgIcon } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import MovieIcon from '@mui/icons-material/Movie'

interface EmptyStateProps {
  type: 'initial' | 'no-results'
  searchTerm?: string
}

const EmptyState = ({ type, searchTerm }: EmptyStateProps) => {
  const isInitial = type === 'initial'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
      }}
    >
      <SvgIcon
        component={isInitial ? MovieIcon : SearchOffIcon}
        sx={{
          fontSize: 64,
          mb: 2,
          color: 'text.secondary',
        }}
      />
      <Typography variant="h5" color="text.primary" gutterBottom>
        {isInitial
          ? 'Start Your Movie Search'
          : `No results found for "${searchTerm}"`}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {isInitial
          ? 'Enter a movie title in the search box above to begin exploring'
          : 'Try adjusting your search terms or filters'}
      </Typography>
    </Box>
  )
}

export default EmptyState 