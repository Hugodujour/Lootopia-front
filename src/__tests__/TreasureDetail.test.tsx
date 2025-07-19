import { render, screen } from '@testing-library/react'
import TreasureDetail from '../components/treasure/TreasureDetail'

const mockTreasure = {
  id: '1',
  name: 'Ruby Gem',
  description: 'A shiny ruby',
  latitude: 0,
  longitude: 0
}

describe('TreasureDetail', () => {
  it('affiche les détails d’un trésor', () => {
    render(<TreasureDetail treasure={mockTreasure} />)
    expect(screen.getByText('Ruby Gem')).toBeInTheDocument()
    expect(screen.getByText('A shiny ruby')).toBeInTheDocument()
  })
})
