import { useChat } from '@ai-sdk/react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Tooltip,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ReactMarkdown from 'react-markdown';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MovieDetails } from '../types/movie';

interface ChatWithMovieProps {
  movie: MovieDetails;
}

const AI_API_URL = import.meta.env.VITE_AI_API_URL!;

const PREDEFINED_PROMPTS = [
  'What makes this movie special?',
  'Explain the main themes',
  'Compare this to similar movies',
  'Analyze the ending',
  'Discuss the cinematography',
] as const;

const MarkdownMessage = ({ content }: { content: string }) => (
  <ReactMarkdown
    components={{
      p: ({ children }) => (
        <Typography variant="body1" gutterBottom>
          {children}
        </Typography>
      ),
      h1: ({ children }) => (
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
      ),
      h2: ({ children }) => (
        <Typography variant="h6" gutterBottom>
          {children}
        </Typography>
      ),
      ul: ({ children }) => (
        <Box component="ul" sx={{ mt: 1, mb: 2 }}>
          {children}
        </Box>
      ),
      li: ({ children }) => (
        <Typography component="li" variant="body1">
          {children}
        </Typography>
      ),
      code: ({ children }) => (
        <Box
          component="code"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            padding: '2px 4px',
            borderRadius: 1,
            fontFamily: 'monospace',
          }}
        >
          {children}
        </Box>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export const ChatWithMovie = ({ movie }: ChatWithMovieProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, status, append } =
    useChat({
      api: `${AI_API_URL}/api/chat`,
      streamProtocol: 'text',
      onError: (error) => {
        console.error('Chat error:', error);
        setError('Failed to send message. Please try again.');
        setTimeout(() => setError(null), 5000);
      },
      initialMessages: [
        {
          id: 'system-message',
          role: 'system',
          content: `You are a friendly movie expert discussing the movie: ${movie.Title} (${movie.Year}). 
          Use the following movie details in your responses:
          Plot: ${movie.Plot}
          Director: ${movie.Director}
          Actors: ${movie.Actors}
          Genre: ${movie.Genre}
          Ratings: IMDb ${movie.imdbRating}/10
          
          Please format your responses using markdown when appropriate.
          Use bullet points for lists and emphasis for important points.`,
        },
      ],
    });

  const isLoading = status === 'streaming';

  const handlePromptClick = (prompt: string) => {
    append({
      role: 'user',
      content: prompt,
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages, status]);

  return (
    <Paper
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 1200,
        mx: 'auto',
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chat about {movie.Title}
      </Typography>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      </Collapse>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Suggested questions:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            maxHeight: isMobile ? '120px' : 'auto',
            overflowY: isMobile ? 'auto' : 'visible',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.background.paper,
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.divider,
              borderRadius: '4px',
              '&:hover': {
                background: theme.palette.action.hover,
              },
            },
            pb: isMobile ? 1 : 0,
          }}
        >
          {PREDEFINED_PROMPTS.map((prompt) => (
            <Chip
              key={prompt}
              label={prompt}
              onClick={() => handlePromptClick(prompt)}
              icon={<AutoAwesomeIcon />}
              variant="outlined"
              sx={{
                cursor: 'pointer',
                maxWidth: isMobile ? '90%' : 'none',
                height: 'auto',
                '& .MuiChip-label': {
                  whiteSpace: 'normal',
                  padding: '8px 12px',
                  lineHeight: 1.2,
                },
                '& .MuiChip-icon': {
                  marginLeft: '8px',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          p: 2,
          backgroundColor: theme.palette.background.default,
          borderRadius: 1,
        }}
      >
        {messages.map(
          (message, idx) =>
            message.role !== 'system' && (
              <Box
                key={idx}
                sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: {
                      xs: '95%',
                      sm: '80%'
                    },
                    backgroundColor:
                      message.role === 'user'
                        ? theme.palette.primary.main
                        : theme.palette.background.paper,
                    color:
                      message.role === 'user'
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                    mx: { xs: 1, sm: 0 },
                    wordBreak: 'break-word',
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto'
                    }
                  }}
                >
                  {message.role === 'user' ? (
                    <Typography 
                      variant="body1"
                      sx={{
                        fontSize: {
                          xs: '0.9rem',
                          sm: '1rem'
                        }
                      }}
                    >
                      {message.content}
                    </Typography>
                  ) : (
                    <MarkdownMessage content={message.content} />
                  )}
                </Paper>
              </Box>
            )
        )}
        <div ref={messagesEndRef} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something about the movie..."
            disabled={isLoading}
            error={!!error}
            sx={{ backgroundColor: theme.palette.background.paper }}
            InputProps={{
              sx: { borderColor: error ? 'error.main' : 'inherit' },
            }}
          />
          <Tooltip
            title={isLoading ? 'Generating response...' : 'Send message'}
          >
            <IconButton
              type="submit"
              color="primary"
              disabled={isLoading || !input.trim()}
              sx={{
                width: 56,
                height: 56,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  backgroundColor: theme.palette.action.disabledBackground,
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </form>
    </Paper>
  );
};
