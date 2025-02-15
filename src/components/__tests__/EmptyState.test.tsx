import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from '../EmptyState'

describe('EmptyState', () => {
  it('renders initial state correctly', () => {
    render(<EmptyState type="initial" />)
    
    expect(screen.getByText('Start Your Movie Search')).toBeInTheDocument()
    expect(screen.getByText('Enter a movie title in the search box above to begin exploring')).toBeInTheDocument()
  })

  it('renders no-results state with search term', () => {
    const searchTerm = 'nonexistent movie'
    render(<EmptyState type="no-results" searchTerm={searchTerm} />)
    
    expect(screen.getByText(`No results found for "${searchTerm}"`)).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search terms or filters')).toBeInTheDocument()
  })
}) 