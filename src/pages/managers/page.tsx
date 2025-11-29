
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';
import { ManagerDashboard } from './components/ManagerDashboard';
import { TeamManagement } from './components/TeamManagement';
import { PerformanceTracking } from './components/PerformanceTracking';
import { TaskPlanning } from './components/TaskPlanning';
import { ReportsSection } from './components/ReportsSection';

const ManagersPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'team', label: 'Gestion Équipe', icon: 'ri-team-line', count: 15 },
    { id: 'performance', label: 'Suivi Performance', icon: 'ri-line-chart-line', count: null },
    { id: 'planning', label: 'Planification', icon: 'ri-calendar-line', count: 8 },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: 5 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ManagerDashboard />;
      case 'team':
        return <TeamManagement />;
      case 'performance':
        return <PerformanceTracking />;
      case 'planning':
        return <TaskPlanning />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <ManagerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Manager</h1>
              <p className="text-gray-600 mt-1">Pilotez votre équipe et optimisez les performances</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success">15 Commerciaux Actifs</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-add-line mr-2"></i>
                Nouveau Commercial
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
                {tab.count && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Bannières publicitaires contextuelles pour chaque onglet */}
        <div className="mb-6">
          {activeTab === 'dashboard' && (
            <AdBanner
              position="managers-dashboard-header"
              format="banner"
              section="managers-dashboard"
              userContext={{ userType: 'manager', section: 'dashboard' }}
              priority="high"
              targetCategories={['management-tools', 'analytics', 'team-performance']}
              className="mb-4"
            />
          )}
          {activeTab === 'team' && (
            <AdBanner
              position="managers-team-header"
              format="banner"
              section="managers-team"
              userContext={{ userType: 'manager', section: 'team' }}
              priority="high"
              targetCategories={['team-management', 'hr-tools', 'collaboration']}
              className="mb-4"
            />
          )}
          {activeTab === 'performance' && (
            <AdBanner
              position="managers-performance-header"
              format="banner"
              section="managers-performance"
              userContext={{ userType: 'manager', section: 'performance' }}
              priority="high"
              targetCategories={['performance-analytics', 'kpi-tracking', 'business-intelligence']}
              className="mb-4"
            />
          )}
          {activeTab === 'planning' && (
            <AdBanner
              position="managers-planning-header"
              format="banner"
              section="managers-planning"
              userContext={{ userType: 'manager', section: 'planning' }}
              priority="medium"
              targetCategories={['project-management', 'scheduling', 'productivity']}
              className="mb-4"
            />
          )}
          {activeTab === 'reports' && (
            <AdBanner
              position="managers-reports-header"
              format="banner"
              section="managers-reports"
              userContext={{ userType: 'manager', section: 'reports' }}
              priority="high"
              targetCategories={['reporting', 'analytics', 'business-intelligence']}
              className="mb-4"
            />
          )}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>

          {/* Sidebar avec bannières publicitaires */}
          <div className="lg:col-span-1 space-y-6">
            <AdBanner
              position="managers-sidebar"
              format="banner"
              section={`managers-${activeTab}`}
              userContext={{ userType: 'manager', section: activeTab }}
              priority="medium"
              targetCategories={['premium-tools', 'automation', 'advanced-analytics']}
            />
            
            <AdBanner
              position="managers-sidebar-secondary"
              format="animated"
              section={`managers-${activeTab}`}
              userContext={{ userType: 'manager', section: activeTab }}
              priority="low"
              targetCategories={['training', 'consulting', 'enterprise-solutions']}
            />
          </div>
        </div>

        {/* Bannière publicitaire en bas de page */}
        <div className="mt-8">
          <AdBanner
            position="managers-footer"
            format="banner"
            section={`managers-${activeTab}`}
            userContext={{ userType: 'manager', section: activeTab }}
            priority="medium"
            targetCategories={['enterprise-solutions', 'integration', 'support']}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagersPage;
