import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import NotFound from './pages/NotFound';
import { createAppTheme, getStoredTheme, saveTheme } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(getStoredTheme());
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    saveTheme(newMode);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'dark' : 'light';
      setMode(newMode);
      saveTheme(newMode);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar toggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
        <Container component="main" sx={{ mt: 8, mb: 4, flex: 1 }}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
