import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ImdbLink from '../ImdbLink';

describe('ImdbLink', () => {
  const imdbId = 'tt1234567';

  it('renders IMDb link with correct URL', () => {
    render(<ImdbLink imdbId={imdbId} />);

    const link = screen.getByTestId('imdb-link');
    expect(link).toHaveAttribute(
      'href',
      `https://www.imdb.com/title/${imdbId}`
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays tooltip on hover', async () => {
    render(<ImdbLink imdbId={imdbId} />);

    const link = screen.getByTestId('imdb-link');
    await userEvent.hover(link);

    // Wait for the tooltip to be visible
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    expect(screen.getByRole('tooltip')).toHaveTextContent('View on IMDb');
  });
});
