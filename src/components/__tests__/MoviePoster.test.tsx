import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoviePoster from '../MoviePoster';

describe('MoviePoster', () => {
  it('renders movie poster image when valid URL is provided', () => {
    const props = {
      posterUrl: 'https://example.com/poster.jpg',
      title: 'Test Movie',
      height: 300,
    };

    render(<MoviePoster {...props} />);

    const img = screen.getByAltText(props.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', props.posterUrl);
  });

  it('renders fallback icon when poster URL is N/A', () => {
    const props = {
      posterUrl: 'N/A',
      title: 'Test Movie',
      height: 300,
    };

    render(<MoviePoster {...props} />);

    const fallbackContainer = screen.getByTestId('movie-poster-fallback');
    expect(fallbackContainer).toBeInTheDocument();
  });
});
