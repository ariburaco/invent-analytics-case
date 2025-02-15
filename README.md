# Movie Explorer

A modern React application for searching and exploring movies using the OMDB API. Built with React, TypeScript, Material-UI, and React Query.

## Features

- 🎬 Search movies, TV series, and episodes
- 🎯 Filter by type and year
- 🎨 Light/Dark theme support
- 📱 Responsive design
- 🔍 Detailed movie information
- 🔗 IMDb integration
- 🚀 Fast and efficient with debounced search
- 📊 Pagination support

## Tech Stack

- React 19
- TypeScript
- Material-UI (MUI)
- React Query
- React Router
- Axios
- Vite

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

3. Start the development server:

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
└── theme.ts       # MUI theme configuration
```

## Features in Detail

### Search Functionality

- Real-time search with debouncing
- Filter by type (movie, series, episode)
- Year filter
- Pagination for results

### Movie Details

- Comprehensive movie information
- Ratings from multiple sources
- Cast and crew details
- Direct links to IMDb

### UI/UX

- Responsive design for all screen sizes
- Dark/Light theme toggle
- Loading states and error handling
- Clean and modern interface

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
