import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  onSectionChange?: (section: string) => void;
}

export default function Sidebar({ onSectionChange }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Tableau de Bord', path: '/dashboard' },
    { icon: 'ri-user-line', label: 'Mon Profil', path: '/profile' },
    { icon: 'ri-file-list-3-line', label: 'Appels d\'Offres', path: '/call-for-tenders' },
    {
      id: 'commercial',
      label: 'Interface Commerciale',
      icon: 'ri-dashboard-line',
      path: '/commercial',
      active: location.pathname === '/commercial' || location.pathname === '/dashboard'
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: 'ri-user-star-line',
      path: '/leads',
      active: location.pathname === '/leads'
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
      icon: 'ri-flow-chart',
      path: '/pipeline',
      active: location.pathname === '/pipeline'
    },
    {
      id: 'activities',
      label: 'Activités',
      icon: 'ri-calendar-event-line',
      path: '/activities',
      active: location.pathname === '/activities'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'ri-bar-chart-line',
      path: '/analytics',
      active: location.pathname === '/analytics'
    },
    {
      id: 'commissions',
      label: 'Commissions',
      icon: 'ri-wallet-line',
      path: '/commissions',
      active: location.pathname === '/commissions'
    }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700 flex-shrink-0">
        <h1 className="text-xl font-bold">Komercia</h1>
        <p className="text-sm text-gray-400">CRM Commercial</p>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 overflow-y-auto px-3">
        <div className="space-y-1">
          <SidebarLink 
            href="/" 
            icon="ri-home-line" 
            label="Accueil" 
            isActive={location.pathname === '/'}
          />
          <SidebarLink 
            href="/commercial" 
            icon="ri-dashboard-line" 
            label="Tableau de Bord" 
            isActive={location.pathname === '/commercial' || location.pathname === '/dashboard'}
          />
          <SidebarLink 
            href="/leads" 
            icon="ri-user-star-line" 
            label="Leads" 
            isActive={location.pathname === '/leads'}
          />
          <SidebarLink 
            href="/pipeline" 
            icon="ri-flow-chart" 
            label="Pipeline" 
            isActive={location.pathname === '/pipeline'}
          />
          <SidebarLink 
            href="/activities" 
            icon="ri-calendar-check-line" 
            label="Activités" 
            isActive={location.pathname === '/activities'}
          />
          <SidebarLink 
            href="/analytics" 
            icon="ri-bar-chart-line" 
            label="Analytics" 
            isActive={location.pathname === '/analytics'}
          />
          <SidebarLink 
            href="/commissions" 
            icon="ri-money-euro-circle-line" 
            label="Commissions" 
            isActive={location.pathname === '/commissions'}
          />
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Gestion
          </h3>
          <div className="mt-2 space-y-1">
            <SidebarLink 
              href="/managers" 
              icon="ri-team-line" 
              label="Managers" 
              isActive={location.pathname === '/managers'}
            />
            <SidebarLink 
              href="/merchants" 
              icon="ri-store-line" 
              label="Marchands" 
              isActive={location.pathname === '/merchants'}
            />
            <SidebarLink 
              href="/enterprise" 
              icon="ri-building-line" 
              label="Entreprises" 
              isActive={location.pathname === '/enterprise'}
            />
            <SidebarLink 
              href="/startups" 
              icon="ri-rocket-line" 
              label="Startups" 
              isActive={location.pathname === '/startups'}
            />
            <SidebarLink 
              href="/events" 
              icon="ri-calendar-event-line" 
              label="Événements" 
              isActive={location.pathname === '/events'}
            />
            <SidebarLink 
              href="/consultants" 
              icon="ri-user-settings-line" 
              label="Consultants" 
              isActive={location.pathname === '/consultants'}
            />
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-gray-700 flex-shrink-0">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <i className="ri-user-line text-sm"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Commercial Pro</p>
            <p className="text-xs text-gray-400">En ligne</p>
          </div>
        </div>
      </div>
    </div>
  );
}
