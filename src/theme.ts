import { createTheme, ThemeOptions } from '@mui/material'

// Get the saved theme from localStorage or default to 'light'
export const getStoredTheme = (): 'light' | 'dark' => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
  return storedTheme || 'light'
}

// Save theme to localStorage
export const saveTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme)
}

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#4ECDC4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: mode === 'light' ? '#f8f9fa' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

export const createAppTheme = (mode: 'light' | 'dark') => 
  createTheme(getThemeOptions(mode))

export default createAppTheme(getStoredTheme()) 