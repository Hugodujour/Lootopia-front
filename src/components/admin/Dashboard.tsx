import React from 'react';
import { useTreasure } from '../../context/TreasureContext';
import { TreasureStatus } from '../../types';
import { Map, Users, Trophy, Target } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Dashboard: React.FC = () => {
  const { treasures } = useTreasure();

  const stats = {
    totalHunts: treasures.length,
    activeHunts: treasures.filter(t => t.status === TreasureStatus.HIDDEN).length,
    completedHunts: treasures.filter(t => t.status === TreasureStatus.FOUND).length,
    totalUsers: 156, // Mock data
  };

  const difficultyData = [
    { name: 'Facile', value: treasures.filter(t => t.difficulty === 'easy').length },
    { name: 'Moyen', value: treasures.filter(t => t.difficulty === 'medium').length },
    { name: 'Difficile', value: treasures.filter(t => t.difficulty === 'hard').length },
  ];

  const monthlyData = [
    { name: 'Jan', hunts: 4 },
    { name: 'Fév', hunts: 6 },
    { name: 'Mar', hunts: 8 },
    { name: 'Avr', hunts: 12 },
    { name: 'Mai', hunts: 9 },
    { name: 'Jun', hunts: 15 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display text-white mb-6">Vue d'Ensemble du Tableau de Bord</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-6 border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total des Chasses</p>
              <p className="text-2xl font-semibold text-white">{stats.totalHunts}</p>
            </div>
            <div className="bg-gaming-purple-900/50 p-3 rounded-lg border border-gaming-purple-700">
              <Map className="h-6 w-6 text-gaming-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-6 border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Chasses Actives</p>
              <p className="text-2xl font-semibold text-white">{stats.activeHunts}</p>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg border border-green-700">
              <Target className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-6 border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Chasses Terminées</p>
              <p className="text-2xl font-semibold text-white">{stats.completedHunts}</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg border border-yellow-700">
              <Trophy className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-6 border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total des Utilisateurs</p>
              <p className="text-2xl font-semibold text-white">{stats.totalUsers}</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg border border-purple-700">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-6 border border-gaming-dark-600">
          <h2 className="text-lg font-semibold text-white mb-4">Chasses Mensuelles</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="hunts" fill="#A855F7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gaming-dark-800 rounded-xl shadow-lg p-6 border border-gaming-dark-600">
          <h2 className="text-lg font-semibold text-white mb-4">Répartition de la Difficulté des Chasses</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;