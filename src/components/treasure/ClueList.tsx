import React, { useState } from 'react';
import { Lightbulb, Plus, Edit, Trash2 } from 'lucide-react';
import { Clue, ClueType } from '../../types';
import { useTreasure } from '../../context/TreasureContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import ClueForm from './ClueForm';

interface ClueListProps {
  treasureId: string;
  clues: Clue[];
}

const ClueList: React.FC<ClueListProps> = ({ treasureId, clues }) => {
  const { deleteClue, getTreasure } = useTreasure();
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClueId, setEditingClueId] = useState<string | null>(null);
  
  const treasure = getTreasure(treasureId);
  const canEditClues = user?.role === 'admin' || (treasure?.createdBy === user?.email);
  
  const handleDelete = (clueId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet indice ?')) {
      deleteClue(treasureId, clueId);
    }
  };

  const getClueTypeIcon = (type: ClueType) => {
    switch (type) {
      case ClueType.RIDDLE:
        return <span className="text-purple-600 font-semibold">Énigme</span>;
      case ClueType.IMAGE:
        return <span className="text-blue-600 font-semibold">Image</span>;
      case ClueType.COORDINATES:
        return <span className="text-red-600 font-semibold">Coordonnées</span>;
      default:
        return <span className="text-green-600 font-semibold">Texte</span>;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display text-primary-900">Indices</h2>
        
        {canEditClues && (
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={18} />}
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingClueId(null);
            }}
          >
            {showAddForm ? 'Annuler' : 'Ajouter un Indice'}
          </Button>
        )}
      </div>

      {showAddForm && canEditClues && (
        <div className="bg-primary-50 p-4 rounded-lg mb-6 animate-reveal">
          <ClueForm 
            treasureId={treasureId} 
            onComplete={() => setShowAddForm(false)}
          />
        </div>
      )}

      {clues.length === 0 && !showAddForm ? (
        <div className="bg-white border border-dashed border-secondary-300 rounded-lg p-6 text-center">
          <Lightbulb className="h-10 w-10 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-600 mb-2">Aucun Indice Encore</h3>
          <p className="text-secondary-500 mb-4">
            {canEditClues 
              ? 'Ajoutez quelques indices pour aider les chercheurs à trouver ce trésor.'
              : 'Le créateur n\'a pas encore ajouté d\'indices.'
            }
          </p>
          {canEditClues && (
            <Button
              variant="outline"
              size="sm"
              icon={<Plus size={16} />}
              onClick={() => setShowAddForm(true)}
            >
              Ajouter Votre Premier Indice
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {clues
            .sort((a, b) => a.order - b.order)
            .map((clue) => (
              <div key={clue.id}>
                {editingClueId === clue.id ? (
                  <div className="bg-primary-50 p-4 rounded-lg mb-4 animate-reveal">
                    <ClueForm 
                      treasureId={treasureId}
                      clue={clue}
                      onComplete={() => setEditingClueId(null)}
                    />
                  </div>
                ) : (
                  <div className="bg-white border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2 text-sm text-secondary-600 mb-2">
                        {getClueTypeIcon(clue.type)}
                        <span className="text-secondary-500">• Indice #{clue.order}</span>
                      </div>
                      
                      {canEditClues && (
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingClueId(clue.id)}
                            className="p-1.5 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-full transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(clue.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-1 text-secondary-800">
                      {clue.type === ClueType.IMAGE ? (
                        <img
                          src={clue.content}
                          alt="Indice"
                          className="max-h-60 rounded-md mx-auto object-contain"
                        />
                      ) : (
                        <p className="whitespace-pre-line">{clue.content}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ClueList;