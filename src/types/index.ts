export enum TreasureStatus {
  HIDDEN = 'hidden',
  FOUND = 'found',
}

export enum ClueType {
  TEXT = 'text',
  IMAGE = 'image',
  RIDDLE = 'riddle',
  COORDINATES = 'coordinates',
}

export interface Clue {
  id: string;
  treasureId: string;
  type: ClueType;
  content: string;
  order: number;
}

export interface Treasure {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  status: TreasureStatus;
  createdAt: string;
  clues: Clue[];
  image?: string;
  participants: string[]; // Array of user emails who joined
  createdBy?: string; // Email of the user who created this treasure
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'creator' | 'admin';
  foundTreasures: string[];
  joinedHunts: string[]; // Array of treasure IDs user has joined
}