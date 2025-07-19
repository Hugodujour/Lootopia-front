import { render, screen } from '@testing-library/react'
import TreasureList from '../components/treasure/TreasureList'

const mockTreasures = [
  { id: '1', name: 'Ruby Gem', description: 'A shiny ruby', latitude: 0, longitude: 0 },
  { id: '2', name: 'Golden Coin', description: 'An old coin', latitude: 0, longitude: 0 },
]

describe('TreasureList', () => {
  it('affiche une liste de trésors', () => {
    render(<TreasureList treasures={mockTreasures} onSelect={() => {}} />)
    expect(screen.getByText('Ruby Gem')).toBeInTheDocument()
    expect(screen.getByText('Golden Coin')).toBeInTheDocument()
  })
})
