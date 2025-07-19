import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Mail, Lock, AlertCircle, Info } from 'lucide-react';
import Button from '../common/Button';

const SignInPage: React.FC = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already signed in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-gaming flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gaming-dark-800 rounded-xl shadow-2xl p-8 border border-gaming-dark-600">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple rounded-full mb-4 shadow-lg shadow-gaming-purple-500/25">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display text-white">Bon Retour !</h1>
            <p className="text-gray-400 mt-2">Connectez-vous pour continuer votre chasse au trésor</p>
          </div>

          {/* Demo Account Info */}
          <div className="mb-6 p-4 bg-gaming-purple-900/20 border border-gaming-purple-700/50 rounded-lg">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-gaming-purple-400 mr-2 mt-0.5" />
              <div className="text-sm">
                <p className="text-gaming-purple-300 font-medium mb-2">Comptes de Démonstration :</p>
                <div className="space-y-1 text-gaming-purple-200">
                  <p><strong>Utilisateur :</strong> user@example.com</p>
                  <p><strong>Créateur :</strong> creator@example.com</p>
                  <p><strong>Admin :</strong> admin@example.com</p>
                  <p className="text-xs mt-2 text-gray-400">Mot de passe : n'importe lequel</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Adresse Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gaming-dark-700 border border-gaming-dark-600 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-gaming-purple-500 focus:border-gaming-purple-500 
                          text-white placeholder-gray-500"
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Mot de Passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gaming-dark-700 border border-gaming-dark-600 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-gaming-purple-500 focus:border-gaming-purple-500 
                          text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Vous n'avez pas de compte ?{' '}
            <button className="text-gaming-purple-400 hover:text-gaming-purple-300 font-medium transition-colors">
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;