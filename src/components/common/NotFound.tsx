import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Compass className="text-primary-700 h-24 w-24 mb-6 animate-pulse" />
      
      <h1 className="text-4xl md:text-5xl font-display text-primary-900 mb-4">
        Perdu en Mer !
      </h1>
      
      <p className="text-lg md:text-xl text-secondary-600 max-w-md mb-8">
        Cette carte au trésor ne mène nulle part. Les coordonnées que vous cherchez semblent manquer de nos cartes.
      </p>
      
      <Link 
        to="/" 
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg
                 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
      >
        <MapPin size={20} />
        <span>Retour à la Carte Principale</span>
      </Link>
    </div>
  );
};

export default NotFound;