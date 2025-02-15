import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PageHead from '../components/PageHead'
import MovieIcon from '@mui/icons-material/Movie'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <PageHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />

      <MovieIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.7 }} />
      
      <Typography variant="h3" component="h1">
        404
      </Typography>
      
      <Typography variant="h5" component="h2" color="text.secondary">
        Page Not Found
      </Typography>
      
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
        sx={{
          borderRadius: '25px',
          padding: '12px 30px',
          textTransform: 'none',
        }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default NotFound 