import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Map, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Tableau de Bord' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Utilisateurs' },
    { to: '/admin/hunts', icon: <Map size={20} />, label: 'Chasses' },
  ];

  return (
    <div className="min-h-screen bg-gaming-dark-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gaming-dark-900 min-h-screen p-4 border-r border-gaming-dark-700">
          <div className="mb-8">
            <h1 className="text-xl font-display text-white">
              Administration Chasse au Trésor
            </h1>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-purple text-white shadow-lg shadow-gaming-purple-500/25 border border-gaming-purple-600'
                      : 'text-gray-300 hover:bg-gaming-dark-800 hover:text-gaming-purple-300'
                  }`
                }
                end
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            
            <NavLink
              to="/"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors
                       text-gray-300 hover:bg-gaming-dark-800 hover:text-gaming-purple-300 mt-8"
            >
              <LogOut size={20} />
              <span>Quitter l'Administration</span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;