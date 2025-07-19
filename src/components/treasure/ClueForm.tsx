import React, { useState } from 'react';
import { useTreasure } from '../../context/TreasureContext';
import { Clue, ClueType } from '../../types';
import Button from '../common/Button';
import { Save, X } from 'lucide-react';

interface ClueFormProps {
  treasureId: string;
  clue?: Clue;
  onComplete: () => void;
}

const ClueForm: React.FC<ClueFormProps> = ({ treasureId, clue, onComplete }) => {
  const { addClue, updateClue } = useTreasure();
  const [formData, setFormData] = useState<{
    type: ClueType;
    content: string;
    order: number;
  }>({
    type: clue?.type || ClueType.TEXT,
    content: clue?.content || '',
    order: clue?.order || 1,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'order') {
      const orderValue = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(orderValue) ? 1 : Math.max(1, orderValue),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.content.trim()) {
      setError('Le contenu de l\'indice est requis');
      return;
    }

    try {
      if (clue) {
        updateClue(treasureId, clue.id, formData);
      } else {
        addClue(treasureId, formData);
      }
      onComplete();
    } catch (err) {
      setError('Échec de la sauvegarde de l\'indice');
      console.error(err);
    }
  };

  const getClueTypeLabel = (type: ClueType) => {
    switch (type) {
      case ClueType.TEXT: return 'Texte';
      case ClueType.RIDDLE: return 'Énigme';
      case ClueType.IMAGE: return 'URL d\'Image';
      case ClueType.COORDINATES: return 'Coordonnées';
      default: return type;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <label htmlFor="type" className="block text-sm font-medium text-secondary-700 mb-1">
            Type d'Indice
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                    focus:ring-primary-500 focus:border-primary-500"
          >
            <option value={ClueType.TEXT}>Texte</option>
            <option value={ClueType.RIDDLE}>Énigme</option>
            <option value={ClueType.IMAGE}>URL d'Image</option>
            <option value={ClueType.COORDINATES}>Coordonnées</option>
          </select>
        </div>
        
        <div className="md:col-span-1">
          <label htmlFor="order" className="block text-sm font-medium text-secondary-700 mb-1">
            Ordre de l'Indice
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            min="1"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                    focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-secondary-700 mb-1">
          {formData.type === ClueType.IMAGE ? 'URL de l\'Image' : 'Contenu de l\'Indice'}
        </label>
        {formData.type === ClueType.TEXT || 
         formData.type === ClueType.RIDDLE || 
         formData.type === ClueType.COORDINATES ? (
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                    focus:ring-primary-500 focus:border-primary-500"
            placeholder={
              formData.type === ClueType.TEXT 
                ? "Entrez l'indice textuel..." 
                : formData.type === ClueType.RIDDLE
                  ? "Entrez l'énigme..."
                  : "Entrez les coordonnées (ex: 48.8566, 2.3522)"
            }
          ></textarea>
        ) : (
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                    focus:ring-primary-500 focus:border-primary-500"
            placeholder="Entrez l'URL de l'image"
          />
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          icon={<X size={18} />}
          onClick={onComplete}
        >
          Annuler
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          icon={<Save size={18} />}
        >
          {clue ? 'Mettre à Jour l\'Indice' : 'Ajouter l\'Indice'}
        </Button>
      </div>
    </form>
  );
};

export default ClueForm;