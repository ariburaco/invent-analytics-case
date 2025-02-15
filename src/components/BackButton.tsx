import { IconButton, Tooltip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Tooltip title="Go back">
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ 
          position: 'absolute',
          left: { xs: 16, md: 24 },
          top: { xs: 84, md: 100 },
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            bgcolor: 'background.paper',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  )
}

export default BackButton 