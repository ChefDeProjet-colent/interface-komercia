import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  userRole?: string;
}

export default function Sidebar({ userRole = 'commercial' }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fonction pour déterminer si un lien est actif
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Logique de déconnexion
    console.log('Déconnexion');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: 'ri-dashboard-line', label: 'Tableau de Bord' },
    { path: '/profile', icon: 'ri-user-line', label: 'Mon Profil' },
    { path: '/call-for-tenders', icon: 'ri-file-list-3-line', label: "Appels d'Offres" },
    { path: '/commercial', icon: 'ri-dashboard-line', label: 'Interface Commerciale' },
    { path: '/leads', icon: 'ri-user-star-line', label: 'Leads' },
    { path: '/pipeline', icon: 'ri-flow-chart', label: 'Pipeline' },
    { path: '/activities', icon: 'ri-calendar-event-line', label: 'Activités' },
    { path: '/analytics', icon: 'ri-bar-chart-line', label: 'Analytics' },
    { path: '/commissions', icon: 'ri-wallet-line', label: 'Commissions' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile & Desktop sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-xl text-white"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Komercia</h1>
              <p className="text-sm text-gray-600 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false); // fermer sidebar mobile après clic
                }}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-teal-50 text-teal-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <i className={`${item.icon} mr-3 text-lg`}></i>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-600 truncate">john@example.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <i className="ri-logout-box-line"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-white shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className={`${sidebarOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
      </button>
    </>
  );
}