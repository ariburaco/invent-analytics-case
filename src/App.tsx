import { Routes, Route } from 'react-router-dom'
import { Box, Container, ThemeProvider, CssBaseline } from '@mui/material'
import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import { createAppTheme } from './theme'

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = useMemo(() => createAppTheme(mode), [mode])

  const toggleTheme = () => setMode(mode === 'light' ? 'dark' : 'light')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
        <Container component="main" sx={{ mt: 8, mb: 4, flex: 1 }}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
