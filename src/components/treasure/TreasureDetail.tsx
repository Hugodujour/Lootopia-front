import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTreasure } from '../../context/TreasureContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Map, Compass, ArrowLeft, Edit, Trash2, MapPin, 
  CheckCircle, Clock, AlertTriangle, Users, UserPlus, UserMinus,
  Target
} from 'lucide-react';
import Button from '../common/Button';
import { TreasureStatus } from '../../types';
import ClueList from './ClueList';

const TreasureDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getTreasure, 
    updateTreasure, 
    deleteTreasure, 
    joinTreasureHunt, 
    leaveTreasureHunt, 
    isUserJoined
  } = useTreasure();
  
  const treasure = id ? getTreasure(id) : undefined;
  const hasJoined = id ? isUserJoined(id) : false;

  const canEditTreasure = user?.role === 'admin' || (treasure?.createdBy === user?.email);
  const canDeleteTreasure = user?.role === 'admin' || (treasure?.createdBy === user?.email);
  const canViewClues = hasJoined || canEditTreasure;

  if (!treasure) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display text-primary-900 mb-4">Trésor Introuvable</h2>
          <p className="text-secondary-600 mb-6">
            Le trésor que vous cherchez a peut-être été déplacé ou n'existe pas.
          </p>
          <Link
            to="/treasures"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white 
                     py-2 px-4 rounded-md shadow transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour à Tous les Trésors
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce trésor ?')) {
      deleteTreasure(treasure.id);
      navigate('/treasures');
    }
  };

  const handleStatusToggle = () => {
    const newStatus = treasure.status === TreasureStatus.HIDDEN 
      ? TreasureStatus.FOUND 
      : TreasureStatus.HIDDEN;
      
    updateTreasure(treasure.id, { status: newStatus });
  };

  const handleJoinHunt = () => {
    const success = joinTreasureHunt(treasure.id);
    if (!success) {
      alert('Impossible de rejoindre cette chasse au trésor. Vous participez peut-être déjà.');
    }
  };

  const handleLeaveHunt = () => {
    if (window.confirm('Êtes-vous sûr de vouloir quitter cette chasse au trésor ?')) {
      leaveTreasureHunt(treasure.id);
    }
  };
  
  const formattedDate = new Date(treasure.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return difficulty;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
        {/* Treasure Image Header */}
        <div className="h-64 md:h-80 relative">
          {treasure.image ? (
            <img 
              src={treasure.image} 
              alt={treasure.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <Map className="text-primary-400 h-24 w-24" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 md:p-8 w-full">
              <h1 className="text-3xl md:text-4xl font-display text-white mb-2 drop-shadow-lg">
                {treasure.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 text-white/90 mb-2">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{treasure.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{treasure.participants.length} participants</span>
                </div>

                {treasure.createdBy && (
                  <div className="flex items-center">
                    <span className="text-sm">Créé par {treasure.createdBy.split('@')[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Bar */}
        <div className="bg-primary-50 p-4 flex flex-wrap items-center justify-between gap-4 border-b border-primary-100">
          <div className="flex items-center flex-wrap gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${treasure.status === TreasureStatus.FOUND 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'}`}
            >
              {treasure.status === TreasureStatus.FOUND 
                ? <><CheckCircle size={16} className="mr-1.5" /> Trouvé</>
                : <><Compass size={16} className="mr-1.5" /> Caché</>
              }
            </span>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${treasure.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-800' 
                            : treasure.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'}`}
            >
              {getDifficultyLabel(treasure.difficulty)}
            </span>

            {hasJoined && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Target size={16} className="mr-1.5" />
                Rejoint
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {!hasJoined && treasure.status === TreasureStatus.HIDDEN && (
              <Button
                variant="primary"
                icon={<UserPlus size={18} />}
                onClick={handleJoinHunt}
              >
                Rejoindre la Chasse
              </Button>
            )}

            {hasJoined && (
              <Button
                variant="secondary"
                icon={<UserMinus size={18} />}
                onClick={handleLeaveHunt}
              >
                Quitter la Chasse
              </Button>
            )}

            {canEditTreasure && (
              <>
                <Button
                  variant={treasure.status === TreasureStatus.HIDDEN ? 'success' : 'secondary'}
                  icon={treasure.status === TreasureStatus.HIDDEN ? <CheckCircle size={18} /> : <Compass size={18} />}
                  onClick={handleStatusToggle}
                >
                  {treasure.status === TreasureStatus.HIDDEN ? 'Marquer comme Trouvé' : 'Marquer comme Caché'}
                </Button>
                
                <Link to={`/treasures/${treasure.id}/edit`}>
                  <Button
                    variant="outline"
                    icon={<Edit size={18} />}
                  >
                    Modifier
                  </Button>
                </Link>
              </>
            )}

            {canDeleteTreasure && (
              <Button
                variant="danger"
                icon={<Trash2 size={18} />}
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            )}
          </div>
        </div>
        
        {/* Treasure Details */}
        <div className="p-6">
          <h2 className="text-xl font-display text-primary-900 mb-3">Description</h2>
          <p className="text-secondary-700 mb-6 leading-relaxed">{treasure.description}</p>
          
          {treasure.coordinates && (
            <div className="mb-6">
              <h2 className="text-xl font-display text-primary-900 mb-3">Localisation</h2>
              <div className="bg-secondary-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <MapPin size={20} className="text-primary-600 mr-2" />
                  <span className="text-secondary-800 font-mono">
                    {treasure.coordinates.latitude.toFixed(6)}, {treasure.coordinates.longitude.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Participants Section */}
          {treasure.participants.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-display text-primary-900 mb-3">Participants</h2>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users size={20} className="text-primary-600 mr-2" />
                  <span className="text-secondary-800 font-medium">
                    {treasure.participants.length} {treasure.participants.length === 1 ? 'participant' : 'participants'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {treasure.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {participant.split('@')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Clues - only show if user has joined or can edit */}
          {canViewClues && (
            <ClueList treasureId={treasure.id} clues={treasure.clues} />
          )}

          {/* Message for non-participants */}
          {!canViewClues && treasure.status === TreasureStatus.HIDDEN && (
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <Target className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Rejoignez la Chasse !</h3>
              <p className="text-yellow-700 mb-4">
                Rejoignez cette chasse au trésor pour voir les indices et commencer votre aventure.
              </p>
              <Button
                variant="primary"
                icon={<UserPlus size={18} />}
                onClick={handleJoinHunt}
              >
                Rejoindre la Chasse
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreasureDetail;