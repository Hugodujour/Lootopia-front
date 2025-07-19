import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Map, Compass, Menu, X, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-gaming-purple-400 font-medium' : 'text-gray-300 hover:text-gaming-purple-300';
  };

  const canCreateTreasures = user?.role === 'creator' || user?.role === 'admin';
  const canAccessAdmin = user?.role === 'admin';

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'creator': return 'Créateur';
      case 'user': return 'Utilisateur';
      default: return role;
    }
  };

  return (
    <nav className="bg-gaming-dark-900 border-b border-gaming-dark-700 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Compass className="text-gaming-purple-400 h-8 w-8 group-hover:text-gaming-purple-300 transition-colors" />
            <span className="text-white font-display text-xl tracking-wider group-hover:text-gaming-purple-300 transition-colors">
              Lootopia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition-colors ${isActive('/')}`}>
              Accueil
            </Link>
            {canAccessAdmin && (
              <Link to="/admin" className={`transition-colors ${isActive('/admin')}`}>
                Administration
              </Link>
            )}
            <div className="flex items-center space-x-6">
              {canCreateTreasures && (
                <Link 
                  to="/treasures/new" 
                  className="bg-gradient-purple text-white px-4 py-2 rounded-lg font-medium 
                            hover:shadow-lg hover:shadow-gaming-purple-500/25 transition-all 
                            transform hover:scale-105 flex items-center space-x-2 border border-gaming-purple-600"
                >
                  <Plus size={18} />
                  <span>Ajouter un Trésor</span>
                </Link>
              )}
              <div className="flex items-center space-x-2 text-gray-300">
                <span className="text-sm">
                  {user?.name} 
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-red-900/50 text-red-300 border border-red-700' 
                      : user?.role === 'creator'
                        ? 'bg-gaming-purple-900/50 text-gaming-purple-300 border border-gaming-purple-700'
                        : 'bg-green-900/50 text-green-300 border border-green-700'
                  }`}>
                    {getRoleLabel(user?.role || '')}
                  </span>
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-gaming-purple-300 transition-colors flex items-center space-x-1 
                          hover:bg-gaming-dark-800 px-2 py-1 rounded-md"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-gaming-purple-300 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-reveal border-t border-gaming-dark-700">
            <div className="flex flex-col space-y-4 pb-4">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/')} block px-2 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/treasures" 
                className={`transition-colors ${isActive('/treasures')} block px-2 py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Trésors
              </Link>
              {canAccessAdmin && (
                <Link 
                  to="/admin" 
                  className={`transition-colors ${isActive('/admin')} block px-2 py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administration
                </Link>
              )}
              {canCreateTreasures && (
                <Link 
                  to="/treasures/new" 
                  className="bg-gradient-purple text-white px-4 py-2 rounded-lg font-medium
                            hover:shadow-lg hover:shadow-gaming-purple-500/25 transition-all 
                            flex items-center space-x-2 border border-gaming-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus size={18} />
                  <span>Ajouter un Trésor</span>
                </Link>
              )}
              <div className="px-2 py-2 text-gray-300">
                <span className="text-sm">
                  {user?.name} 
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-red-900/50 text-red-300 border border-red-700' 
                      : user?.role === 'creator'
                        ? 'bg-gaming-purple-900/50 text-gaming-purple-300 border border-gaming-purple-700'
                        : 'bg-green-900/50 text-green-300 border border-green-700'
                  }`}>
                    {getRoleLabel(user?.role || '')}
                  </span>
                </span>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-gaming-purple-300 transition-colors flex items-center space-x-2 px-2 py-2
                          hover:bg-gaming-dark-800 rounded-md"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;