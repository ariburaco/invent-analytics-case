import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import MovieDetailHeader from '../MovieDetailHeader'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('MovieDetailHeader', () => {
  const defaultProps = {
    title: 'Test Movie',
    imdbId: 'tt1234567'
  }

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter })
  }

  it('renders title and IMDb link', () => {
    renderWithRouter(<MovieDetailHeader {...defaultProps} />)
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByText('IMDb')).toBeInTheDocument()
  })

  it('navigates back when back button is clicked', async () => {
    renderWithRouter(<MovieDetailHeader {...defaultProps} />)
    
    const backButton = screen.getByRole('button', { name: /go back/i })
    await userEvent.click(backButton)
    
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('renders breadcrumb navigation', () => {
    renderWithRouter(<MovieDetailHeader {...defaultProps} />)
    
    expect(screen.getByText('Movies')).toBeInTheDocument()
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
  })
}) 