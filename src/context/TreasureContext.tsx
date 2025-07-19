import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Treasure, Clue } from '../types';
import { mockTreasures } from '../utils/mockData';
import { useAuth } from './AuthContext';

interface TreasureContextType {
  treasures: Treasure[];
  loading: boolean;
  addTreasure: (treasure: Omit<Treasure, 'id' | 'createdAt'>) => void;
  updateTreasure: (id: string, treasure: Partial<Treasure>) => void;
  deleteTreasure: (id: string) => void;
  getTreasure: (id: string) => Treasure | undefined;
  addClue: (treasureId: string, clue: Omit<Clue, 'id' | 'treasureId'>) => void;
  updateClue: (treasureId: string, clueId: string, clue: Partial<Clue>) => void;
  deleteClue: (treasureId: string, clueId: string) => void;
  joinTreasureHunt: (treasureId: string) => boolean;
  leaveTreasureHunt: (treasureId: string) => void;
  isUserJoined: (treasureId: string) => boolean;
}

const TreasureContext = createContext<TreasureContextType | undefined>(undefined);

export const useTreasure = () => {
  const context = useContext(TreasureContext);
  if (!context) {
    throw new Error('useTreasure must be used within a TreasureProvider');
  }
  return context;
};

interface TreasureProviderProps {
  children: ReactNode;
}

export const TreasureProvider: React.FC<TreasureProviderProps> = ({ children }) => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Initialize with mock data
  useEffect(() => {
    const loadTreasures = async () => {
      try {
        setTreasures(mockTreasures);
        setLoading(false);
      } catch (error) {
        console.error('Error loading treasures:', error);
        setLoading(false);
      }
    };

    loadTreasures();
  }, []);

  const addTreasure = (newTreasure: Omit<Treasure, 'id' | 'createdAt'>) => {
    const treasure: Treasure = {
      ...newTreasure,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      clues: newTreasure.clues || [],
      participants: [],
      createdBy: user?.email
    };

    setTreasures((prevTreasures) => [...prevTreasures, treasure]);
  };

  const updateTreasure = (id: string, updatedTreasure: Partial<Treasure>) => {
    setTreasures((prevTreasures) =>
      prevTreasures.map((treasure) =>
        treasure.id === id ? { ...treasure, ...updatedTreasure } : treasure
      )
    );
  };

  const deleteTreasure = (id: string) => {
    setTreasures((prevTreasures) => prevTreasures.filter((treasure) => treasure.id !== id));
  };

  const getTreasure = (id: string) => {
    return treasures.find((treasure) => treasure.id === id);
  };

  const addClue = (treasureId: string, clue: Omit<Clue, 'id' | 'treasureId'>) => {
    const newClue: Clue = {
      ...clue,
      id: uuidv4(),
      treasureId
    };

    setTreasures((prevTreasures) =>
      prevTreasures.map((treasure) => {
        if (treasure.id === treasureId) {
          return {
            ...treasure,
            clues: [...treasure.clues, newClue]
          };
        }
        return treasure;
      })
    );
  };

  const updateClue = (treasureId: string, clueId: string, updatedClue: Partial<Clue>) => {
    setTreasures((prevTreasures) =>
      prevTreasures.map((treasure) => {
        if (treasure.id === treasureId) {
          return {
            ...treasure,
            clues: treasure.clues.map((clue) =>
              clue.id === clueId ? { ...clue, ...updatedClue } : clue
            )
          };
        }
        return treasure;
      })
    );
  };

  const deleteClue = (treasureId: string, clueId: string) => {
    setTreasures((prevTreasures) =>
      prevTreasures.map((treasure) => {
        if (treasure.id === treasureId) {
          return {
            ...treasure,
            clues: treasure.clues.filter((clue) => clue.id !== clueId)
          };
        }
        return treasure;
      })
    );
  };

  const joinTreasureHunt = (treasureId: string): boolean => {
    if (!user) return false;

    const treasure = getTreasure(treasureId);
    if (!treasure) return false;

    // Check if user is already joined
    if (treasure.participants.includes(user.email)) return false;

    // Add user to participants
    setTreasures((prevTreasures) =>
      prevTreasures.map((t) =>
        t.id === treasureId
          ? { ...t, participants: [...t.participants, user.email] }
          : t
      )
    );

    return true;
  };

  const leaveTreasureHunt = (treasureId: string) => {
    if (!user) return;

    // Remove user from participants
    setTreasures((prevTreasures) =>
      prevTreasures.map((treasure) =>
        treasure.id === treasureId
          ? { ...treasure, participants: treasure.participants.filter(p => p !== user.email) }
          : treasure
      )
    );
  };

  const isUserJoined = (treasureId: string): boolean => {
    if (!user) return false;
    const treasure = getTreasure(treasureId);
    return treasure ? treasure.participants.includes(user.email) : false;
  };

  return (
    <TreasureContext.Provider
      value={{
        treasures,
        loading,
        addTreasure,
        updateTreasure,
        deleteTreasure,
        getTreasure,
        addClue,
        updateClue,
        deleteClue,
        joinTreasureHunt,
        leaveTreasureHunt,
        isUserJoined
      }}
    >
      {children}
    </TreasureContext.Provider>
  );
};