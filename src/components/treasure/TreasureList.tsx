import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTreasure } from '../../context/TreasureContext';
import { useAuth } from '../../context/AuthContext';
import { Search, Filter, MapPin, Plus, Trash2, Edit } from 'lucide-react';
import { Treasure, TreasureStatus } from '../../types';
import Button from '../common/Button';

const TreasureList: React.FC = () => {
  const { treasures, deleteTreasure, loading } = useTreasure();
  const { user } = useAuth();
  const [filteredTreasures, setFilteredTreasures] = useState<Treasure[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<TreasureStatus | 'all'>('all');

  const canCreateTreasures = user?.role === 'creator' || user?.role === 'admin';
  const canEditAll = user?.role === 'admin';

  useEffect(() => {
    let results = treasures;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        treasure => 
          treasure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          treasure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          treasure.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filter !== 'all') {
      results = results.filter(treasure => treasure.status === filter);
    }

    setFilteredTreasures(results);
  }, [treasures, searchTerm, filter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as TreasureStatus | 'all');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce trésor ?')) {
      deleteTreasure(id);
    }
  };

  const canEditTreasure = (treasure: Treasure) => {
    return canEditAll || (treasure.createdBy === user?.email);
  };

  const canDeleteTreasure = (treasure: Treasure) => {
    return canEditAll || (treasure.createdBy === user?.email);
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return difficulty;
    }
  };

  const getStatusLabel = (status: TreasureStatus) => {
    return status === TreasureStatus.FOUND ? 'Trouvé' : 'Caché';
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gaming-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gaming-purple-400 font-medium">Chargement des trésors...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display text-white mb-2">Carte aux Trésors</h1>
          <p className="text-gray-400 max-w-2xl">
            Explorez et gérez vos chasses au trésor. 
            {canCreateTreasures 
              ? ' Créez de nouvelles chasses ou découvrez des trésors cachés qui attendent d\'être trouvés.'
              : ' Découvrez des trésors cachés qui attendent d\'être trouvés et rejoignez des aventures passionnantes.'
            }
          </p>
        </div>
        {canCreateTreasures && (
          <Link 
            to="/treasures/new"
            className="mt-4 md:mt-0 inline-flex items-center bg-gradient-purple text-white 
                      font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-gaming-purple-500/25 
                      transition-all transform hover:scale-105 self-start md:self-center border border-gaming-purple-600"
          >
            <Plus size={18} className="mr-2" />
            Ajouter un Nouveau Trésor
          </Link>
        )}
      </div>
      
      {/* Search and filter */}
      <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-4 mb-6 flex flex-col md:flex-row gap-4 border border-gaming-dark-600">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Rechercher des trésors..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full bg-gaming-dark-700 border border-gaming-dark-600 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-gaming-purple-500 focus:border-gaming-purple-500 
                      text-white placeholder-gray-500"
          />
        </div>
        
        <div className="flex items-center w-full md:w-auto">
          <div className="relative flex items-center w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-500" />
            </div>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="pl-10 pr-4 py-2 bg-gaming-dark-700 border border-gaming-dark-600 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-gaming-purple-500 focus:border-gaming-purple-500 
                        appearance-none text-white w-full md:w-auto"
            >
              <option value="all">Tous les Trésors</option>
              <option value={TreasureStatus.HIDDEN}>Cachés</option>
              <option value={TreasureStatus.FOUND}>Trouvés</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Treasure Cards */}
      {filteredTreasures.length === 0 ? (
        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-8 text-center border border-gaming-dark-600">
          <MapPin className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h2 className="text-xl font-medium text-gray-300 mb-2">Aucun trésor trouvé</h2>
          <p className="text-gray-500 mb-6">
            {searchTerm || filter !== 'all' 
              ? "Essayez d'ajuster votre recherche ou vos filtres."
              : canCreateTreasures 
                ? "Commencez par ajouter votre premier trésor à la chasse !"
                : "Aucun trésor n'est disponible pour le moment. Revenez plus tard pour de nouvelles aventures !"}
          </p>
          {canCreateTreasures && (
            <Link
              to="/treasures/new"
              className="inline-flex items-center bg-gradient-purple text-white font-medium 
                        py-2 px-4 rounded-lg shadow-lg hover:shadow-gaming-purple-500/25 transition-all 
                        border border-gaming-purple-600"
            >
              <Plus size={18} className="mr-2" />
              Ajouter un Nouveau Trésor
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreasures.map((treasure) => (
            <div 
              key={treasure.id} 
              className="group bg-gaming-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                        transition-all border border-gaming-dark-600 hover:border-gaming-purple-600 relative
                        hover:shadow-gaming-purple-500/10"
            >
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10
                            ${treasure.status === TreasureStatus.FOUND 
                              ? 'bg-green-900/80 text-green-300 border border-green-700' 
                              : 'bg-yellow-900/80 text-yellow-300 border border-yellow-700'}`}>
                {getStatusLabel(treasure.status)}
              </div>

              {/* Creator Badge */}
              {treasure.createdBy && (
                <div className="absolute top-4 left-4 px-2 py-1 bg-gaming-purple-900/80 text-gaming-purple-300 rounded-full text-xs font-medium z-10 border border-gaming-purple-700">
                  par {treasure.createdBy.split('@')[0]}
                </div>
              )}

              <Link to={`/treasures/${treasure.id}`}>
                <div className="h-48 relative overflow-hidden">
                  {treasure.image ? (
                    <img 
                      src={treasure.image} 
                      alt={treasure.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gaming-dark-700 to-gaming-dark-600 flex items-center justify-center">
                      <MapPin className="text-gray-500 h-16 w-16" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-gaming-purple-300 transition-colors">
                    {treasure.name}
                  </h2>
                  
                  <p className="text-gray-400 mb-3 line-clamp-2">
                    {treasure.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{treasure.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                                  ${treasure.difficulty === 'easy' 
                                    ? 'bg-green-900/50 text-green-300 border-green-700' 
                                    : treasure.difficulty === 'medium'
                                      ? 'bg-yellow-900/50 text-yellow-300 border-yellow-700'
                                      : 'bg-red-900/50 text-red-300 border-red-700'}`}>
                      {getDifficultyLabel(treasure.difficulty)}
                    </span>
                    
                    <div className="flex space-x-2">
                      {canEditTreasure(treasure) && (
                        <Link 
                          to={`/treasures/${treasure.id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-gaming-purple-400 hover:text-gaming-purple-300 hover:bg-gaming-dark-700 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                      )}
                      {canDeleteTreasure(treasure) && (
                        <button 
                          onClick={(e) => handleDelete(treasure.id, e)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gaming-dark-700 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreasureList;