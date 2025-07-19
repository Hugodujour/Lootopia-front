import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTreasure } from '../../context/TreasureContext';
import { Treasure, TreasureStatus } from '../../types';
import { Save, ArrowLeft, Map } from 'lucide-react';
import Button from '../common/Button';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationPicker = ({ onLocationSelect, initialPosition }: { 
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}) => {
  const [position, setPosition] = useState<[number, number] | null>(initialPosition || null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
};

const TreasureForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addTreasure, updateTreasure, getTreasure } = useTreasure();
  const [error, setError] = useState<string | null>(null);

  const isEditMode = Boolean(id);
  const existingTreasure = id ? getTreasure(id) : undefined;

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    location: string;
    difficulty: 'easy' | 'medium' | 'hard';
    status: TreasureStatus;
    image?: string;
    latitude?: string;
    longitude?: string;
  }>({
    name: '',
    description: '',
    location: '',
    difficulty: 'medium',
    status: TreasureStatus.HIDDEN,
    image: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (isEditMode && existingTreasure) {
      setFormData({
        name: existingTreasure.name,
        description: existingTreasure.description,
        location: existingTreasure.location,
        difficulty: existingTreasure.difficulty,
        status: existingTreasure.status,
        image: existingTreasure.image || '',
        latitude: existingTreasure.coordinates?.latitude.toString() || '',
        longitude: existingTreasure.coordinates?.longitude.toString() || '',
      });
    }
  }, [isEditMode, existingTreasure]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Le nom du trésor est requis');
      return;
    }

    if (!formData.location.trim()) {
      setError('La localisation est requise');
      return;
    }

    try {
      const treasureData: Omit<Treasure, 'id' | 'createdAt'> | Partial<Treasure> = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        difficulty: formData.difficulty,
        status: formData.status,
        clues: existingTreasure?.clues || [],
      };

      if (formData.image && formData.image.trim()) {
        treasureData.image = formData.image;
      }

      if (formData.latitude && formData.longitude) {
        const lat = parseFloat(formData.latitude);
        const lng = parseFloat(formData.longitude);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          treasureData.coordinates = {
            latitude: lat,
            longitude: lng,
          };
        }
      }

      if (isEditMode && id) {
        updateTreasure(id, treasureData);
      } else {
        addTreasure(treasureData as Omit<Treasure, 'id' | 'createdAt'>);
      }

      navigate('/treasures');
    } catch (err) {
      setError('Échec de la sauvegarde du trésor');
      console.error(err);
    }
  };

  const initialPosition: [number, number] = formData.latitude && formData.longitude
    ? [parseFloat(formData.latitude), parseFloat(formData.longitude)]
    : [48.8566, 2.3522]; // Default to Paris

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link 
          to="/treasures" 
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Retour aux Trésors</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-700 to-primary-900 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-display">
            {isEditMode ? 'Modifier le Trésor' : 'Créer un Nouveau Trésor'}
          </h1>
          <p className="text-primary-100 mt-2">
            {isEditMode 
              ? 'Mettez à jour les détails de cette chasse au trésor'
              : 'Remplissez les détails pour créer un nouveau trésor que d\'autres pourront trouver'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                Nom du Trésor *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                        focus:ring-primary-500 focus:border-primary-500"
                placeholder="Le Médaillon d'Or Perdu"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-secondary-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                        focus:ring-primary-500 focus:border-primary-500"
                placeholder="Décrivez ce trésor et son histoire..."
              ></textarea>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-secondary-700 mb-1">
                Nom de la Localisation *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                        focus:ring-primary-500 focus:border-primary-500"
                placeholder="Forêt Mystique"
                required
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-secondary-700 mb-1">
                Difficulté
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                        focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="easy">Facile</option>
                <option value="medium">Moyen</option>
                <option value="hard">Difficile</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-secondary-700 mb-1">
                URL de l'Image
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                        focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://exemple.com/image.jpg"
              />
              <p className="mt-1 text-sm text-secondary-500">
                Entrez une URL pour une image du trésor ou de son emplacement
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Localisation sur la Carte
              </label>
              <p className="text-sm text-secondary-500 mb-2">
                Cliquez sur la carte pour définir l'emplacement du trésor
              </p>
              <div className="h-[400px] rounded-lg overflow-hidden border border-secondary-300">
                <MapContainer
                  center={initialPosition}
                  zoom={13}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    initialPosition={formData.latitude && formData.longitude ? [
                      parseFloat(formData.latitude),
                      parseFloat(formData.longitude)
                    ] : undefined}
                  />
                </MapContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-secondary-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                            focus:ring-primary-500 focus:border-primary-500"
                    placeholder="48.8566"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-secondary-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                            focus:ring-primary-500 focus:border-primary-500"
                    placeholder="2.3522"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-secondary-700 mb-1">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2
                        focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={TreasureStatus.HIDDEN}>Caché</option>
                <option value={TreasureStatus.FOUND}>Trouvé</option>
              </select>
            </div>
          </div>

          <div className="border-t border-secondary-200 pt-6 flex justify-end space-x-3">
            <Link to="/treasures">
              <Button
                type="button"
                variant="outline"
              >
                Annuler
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              icon={<Save size={18} />}
            >
              {isEditMode ? 'Mettre à Jour le Trésor' : 'Créer le Trésor'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreasureForm;