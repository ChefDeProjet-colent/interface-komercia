import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarLink({ href, icon, label, isActive, onClick }: SidebarLinkProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
        isActive
          ? 'bg-gray-700 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <i className={`${icon} mr-3 text-lg w-5 h-5 flex items-center justify-center`}></i>
      {label}
    </button>
  );
}

interface SidebarProps {
  userRole?: string;
  onSectionChange?: (section: string) => void;
}

export default function Sidebar({ userRole }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Menu items pour Commercial
  const commercialMenuItems = [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/commercial' },
    { icon: 'ri-user-add-line', label: 'Leads', path: '/leads' },
    { icon: 'ri-git-branch-line', label: 'Pipeline', path: '/pipeline' },
    { icon: 'ri-calendar-check-line', label: 'Activités', path: '/activities' },
    { icon: 'ri-bar-chart-line', label: 'Analytics', path: '/analytics' },
    { icon: 'ri-money-dollar-circle-line', label: 'Commissions', path: '/commissions' },
    { icon: 'ri-user-line', label: 'Mon Profil', path: '/commercial/profile' },
    { icon: 'ri-file-list-3-line', label: 'Appels d\'Offres', path: '/commercial/call-for-tenders' },
    { icon: 'ri-calendar-event-line', label: 'Entretiens', path: '/commercial/entretiens' },
  ];

  // Déterminer les liens du menu en fonction du rôle et de la route actuelle
  const getMenuItems = () => {
    // Si on est sur une route entreprise
    if (location.pathname.startsWith('/enterprise')) {
      return [
        { path: '/enterprise', icon: 'ri-dashboard-line', label: 'Tableau de bord' },
        { path: '/enterprise/profile', icon: 'ri-building-line', label: 'Profil Entreprise' },
        { path: '/enterprise/call-for-tenders', icon: 'ri-megaphone-line', label: 'Appels d\'Offres' },
        { path: '/enterprise/candidatures', icon: 'ri-user-search-line', label: 'Candidatures' },
        { path: '/enterprise/entretiens', icon: 'ri-calendar-check-line', label: 'Entretiens' },
        { path: '/enterprise/products', icon: 'ri-shopping-bag-line', label: 'Produits & Services' },
      ];
    }
    
    // Si on est sur une route commercial
    if (location.pathname.startsWith('/commercial')) {
      return [
        { path: '/commercial', icon: 'ri-dashboard-line', label: 'Tableau de bord' },
        { path: '/leads', icon: 'ri-user-star-line', label: 'Leads' },
        { path: '/pipeline', icon: 'ri-flow-chart', label: 'Pipeline' },
        { path: '/activities', icon: 'ri-calendar-check-line', label: 'Activités' },
        { path: '/analytics', icon: 'ri-line-chart-line', label: 'Analytics' },
        { path: '/commissions', icon: 'ri-money-euro-circle-line', label: 'Commissions' },
        { path: '/commercial/profile', icon: 'ri-user-line', label: 'Mon Profil' },
        { path: '/commercial/call-for-tenders', icon: 'ri-file-list-3-line', label: 'Appels d\'Offres' },
      ];
    }

    // Par défaut, afficher les liens commerciaux
    return [
      { path: '/commercial', icon: 'ri-dashboard-line', label: 'Tableau de bord' },
      { path: '/leads', icon: 'ri-user-star-line', label: 'Leads' },
      { path: '/pipeline', icon: 'ri-flow-chart', label: 'Pipeline' },
      { path: '/activities', icon: 'ri-calendar-check-line', label: 'Activités' },
      { path: '/analytics', icon: 'ri-line-chart-line', label: 'Analytics' },
      { path: '/commissions', icon: 'ri-money-euro-circle-line', label: 'Commissions' },
      { path: '/commercial/profile', icon: 'ri-user-line', label: 'Mon Profil' },
      { path: '/commercial/call-for-tenders', icon: 'ri-file-list-3-line', label: 'Appels d\'Offres' },
    ];
  };

  const menuItems = getMenuItems();

  // Déterminer le label du rôle
  const getRoleLabel = () => {
    if (location.pathname.startsWith('/enterprise')) {
      return 'Entreprise';
    }
    if (location.pathname.startsWith('/commercial')) {
      return 'Commercial';
    }
    return userRole || 'Utilisateur';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-teal-500 text-white rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors shadow-lg"
      >
        <i className={`${isOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo - Fixed at top */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-xl text-white"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Komercia</h1>
              <p className="text-xs text-gray-600 capitalize">{getRoleLabel()}</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile - Fixed at bottom */}
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
          <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <i className="ri-logout-box-line"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </>
  );
}
