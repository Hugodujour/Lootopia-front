import { render, screen, waitFor } from '@testing-library/react'
import { TreasureProvider, useTreasure } from '../context/TreasureContext'
import React from 'react'

// Mock enfant
function ConsumerComponent() {
  const { treasures, setTreasures } = useTreasure()
  React.useEffect(() => {
    setTreasures([{ id: '1', name: 'Test Treasure', description: 'desc', latitude: 0, longitude: 0 }])
  }, [])
  return <div>{treasures.length > 0 ? treasures[0].name : 'None'}</div>
}

describe('TreasureContext', () => {
  it('met à jour les trésors', async () => {
    render(
      <TreasureProvider>
        <ConsumerComponent />
      </TreasureProvider>
    )
    await waitFor(() => expect(screen.getByText('Test Treasure')).toBeInTheDocument())
  })
})
