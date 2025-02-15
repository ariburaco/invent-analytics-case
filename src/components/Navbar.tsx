import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Tooltip,
  useTheme,
  useScrollTrigger,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ toggleTheme, isDarkMode }: NavbarProps) => {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      sx={{
        backgroundColor: trigger
          ? theme.palette.background.default
          : alpha(theme.palette.primary.main, 0.95),
        backdropFilter: 'blur(8px)',
        transition: theme.transitions.create([
          'background-color',
          'box-shadow',
        ]),
        color: trigger ? theme.palette.text.primary : '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MovieFilterIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: trigger ? theme.palette.primary.main : '#fff',
            }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            MOVIE EXPLORER
          </Typography>

          {/* Mobile Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MovieFilterIcon
              sx={{
                mr: 1,
                color: trigger ? theme.palette.primary.main : '#fff',
              }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MOVIES
            </Typography>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: trigger ? 'inherit' : '#fff',
                }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="View source code">
              <IconButton
                component="a"
                href="https://github.com/ariburaco/invent-analytics-case"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: trigger ? 'inherit' : '#fff',
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
