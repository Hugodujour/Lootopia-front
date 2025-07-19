import { v4 as uuidv4 } from 'uuid';
import { Treasure, TreasureStatus, Clue, ClueType } from '../types';

// Sample treasure hunt data
export const generateMockTreasures = (): Treasure[] => {
  return [
    {
      id: uuidv4(),
      name: "Le Médaillon d'Or Perdu",
      description: "Un précieux médaillon de l'ancienne civilisation de l'Atlantide.",
      location: "Forêt Mystique",
      coordinates: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
      difficulty: "medium",
      status: TreasureStatus.HIDDEN,
      createdAt: new Date(2023, 5, 12).toISOString(),
      participants: ["jean@exemple.com", "marie@exemple.com"],
      createdBy: "creator@example.com",
      clues: [
        {
          id: uuidv4(),
          treasureId: "1",
          type: ClueType.TEXT,
          content: "Cherchez là où le soleil ne projette aucune ombre à midi.",
          order: 1,
        },
        {
          id: uuidv4(),
          treasureId: "1",
          type: ClueType.RIDDLE,
          content: "Je suis grand quand je suis jeune, et petit quand je suis vieux. Que suis-je ?",
          order: 2,
        }
      ],
      image: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: uuidv4(),
      name: "La Boussole Cachée du Capitaine",
      description: "La boussole légendaire qui ne pointe jamais vers le nord, mais toujours vers ce que vous désirez le plus.",
      location: "Crique de l'Île aux Crânes",
      difficulty: "hard",
      status: TreasureStatus.HIDDEN,
      createdAt: new Date(2023, 2, 24).toISOString(),
      participants: ["pierre@exemple.com"],
      createdBy: "admin@example.com",
      clues: [
        {
          id: uuidv4(),
          treasureId: "2",
          type: ClueType.TEXT,
          content: "Là où les vagues s'écrasent contre le rocher en forme de crâne.",
          order: 1,
        }
      ],
      image: "https://images.pexels.com/photos/1302304/pexels-photo-1302304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      id: uuidv4(),
      name: "Le Rubis des Souhaits Interdits",
      description: "Un rubis rouge sang qui exaucerait un seul souhait, mais à un prix terrible.",
      location: "Ruines du Désert",
      coordinates: {
        latitude: 43.6047,
        longitude: 1.4442,
      },
      difficulty: "easy",
      status: TreasureStatus.FOUND,
      createdAt: new Date(2023, 9, 31).toISOString(),
      participants: ["alice@exemple.com", "charlie@exemple.com", "diane@exemple.com"],
      createdBy: "creator2@example.com",
      clues: [
        {
          id: uuidv4(),
          treasureId: "3",
          type: ClueType.TEXT,
          content: "Sous la statue à la couronne brisée.",
          order: 1,
        },
        {
          id: uuidv4(),
          treasureId: "3",
          type: ClueType.COORDINATES,
          content: "43.6047, 1.4442",
          order: 2,
        }
      ],
      image: "https://images.pexels.com/photos/998521/pexels-photo-998521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    }
  ];
};

export const mockTreasures: Treasure[] = generateMockTreasures();