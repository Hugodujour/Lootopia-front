import React from 'react';
import { Github, Map, Compass } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gaming-dark-900 text-gray-300 border-t border-gaming-dark-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="text-gaming-purple-400 h-6 w-6" />
              <span className="font-display text-xl tracking-wider text-white">
                Chasse au Trésor
              </span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Créez et découvrez d'incroyables chasses au trésor partout dans le monde. L'aventure vous attend !
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-gaming-purple-400 text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gaming-purple-300 transition-colors">Accueil</a></li>
              <li><a href="/treasures" className="hover:text-gaming-purple-300 transition-colors">Trésors</a></li>
              <li><a href="/treasures/new" className="hover:text-gaming-purple-300 transition-colors">Créer Nouveau</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-gaming-purple-400 text-lg mb-4">Connexion</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="hover:text-gaming-purple-300 transition-colors p-2 border border-gaming-dark-600 rounded-lg 
                          hover:border-gaming-purple-600 hover:bg-gaming-dark-800"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-gaming-purple-300 transition-colors p-2 border border-gaming-dark-600 rounded-lg 
                          hover:border-gaming-purple-600 hover:bg-gaming-dark-800"
                aria-label="Carte"
              >
                <Map size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gaming-dark-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Aventure Chasse au Trésor. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;