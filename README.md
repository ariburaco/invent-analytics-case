# Movie Explorer

A modern React application for searching and exploring movies using the OMDB API. Built with React, TypeScript, Material-UI, and React Query.

## Features

- 🎬 Search movies, TV series, and episodes
- 🎯 Filter by type and year
- 🎨 Light/Dark theme with system preference sync and persistence
- 📱 Responsive design with mobile-optimized UI
- 🔍 Detailed movie information
- 🔗 IMDb integration
- 🎯 URL state management with nuqs
- 📊 Pagination support
- 🚫 404 page handling

## Tech Stack

- React 19
- TypeScript
- Material-UI (MUI)
- React Query
- React Router v7
- Nuqs (URL state management)
- Axios
- Vite
- Vitest & Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ariburaco/invent-analytics-case
cd invent-analytics-case
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Update the `VITE_AI_API_URL` if needed

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── theme.ts       # MUI theme configuration with persistence
```

## Features in Detail

### Search Functionality

- Advanced search with URL state management
- Filter by type (movie, series, episode)
- Year filter with clear functionality
- Optimized search with controlled refetching
- Persistent search parameters in URL

### Movie Details

- Comprehensive movie information
- Ratings from multiple sources
- Cast and crew details
- Direct links to IMDb

### UI/UX

- Responsive design with mobile-optimized interface
- System-synced Dark/Light theme with persistence
- Loading states and error handling
- Clean and modern interface with gradient buttons
- Hidden scrollbars for cleaner appearance
- Improved suggested questions UI for mobile

### AI Movie Chat

- 🤖 Interactive AI-powered movie discussions
- 💡 Predefined smart prompts for quick insights
- 📝 Markdown-formatted responses for better readability
- 🎯 Context-aware responses based on movie details
- 💬 Real-time streaming responses
- 📱 Mobile-optimized chat interface
- 🎨 Elegant UI with gradient buttons and animations
- ⚡ Error handling and loading states
- 🔄 Automatic scrolling to latest messages

## Testing

The project includes a comprehensive test suite using:

- Vitest
- Testing Library (React, Jest DOM, User Event)
- Coverage reporting with v8

Run tests with:

```bash
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing movie data
- [Material-UI](https://mui.com/) for the component library
- [React Query](https://tanstack.com/query/latest) for data fetching
- [Nuqs](https://nuqs.47ng.com/) for URL state management
