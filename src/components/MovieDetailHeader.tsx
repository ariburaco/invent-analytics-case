import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Breadcrumbs,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import ImdbLink from './ImdbLink';

interface MovieDetailHeaderProps {
  title: string;
  imdbId?: string;
}

const MovieDetailHeader = ({ title, imdbId }: MovieDetailHeaderProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        my: 3,
      }}
    >
      <Tooltip title="Go back">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            color: theme.palette.text.secondary,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Movies
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography color="text.primary">{title}</Typography>
          {imdbId && <ImdbLink imdbId={imdbId} />}
        </Box>
      </Breadcrumbs>
    </Box>
  );
};

export default MovieDetailHeader;
