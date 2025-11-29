
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';
import { ConsultantsDashboard } from './components/ConsultantsDashboard';
import { MarketAnalysis } from './components/MarketAnalysis';
import { PerformanceData } from './components/PerformanceData';
import { CollaborationTools } from './components/CollaborationTools';
import { ReportsSection } from './components/ReportsSection';

const ConsultantsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'market', label: 'Analyse Marché', icon: 'ri-bar-chart-line', count: null },
    { id: 'performance', label: 'Données Performance', icon: 'ri-line-chart-line', count: null },
    { id: 'collaboration', label: 'Outils Collaboration', icon: 'ri-team-line', count: 7 },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: 4 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ConsultantsDashboard />;
      case 'market':
        return <MarketAnalysis />;
      case 'performance':
        return <PerformanceData />;
      case 'collaboration':
        return <CollaborationTools />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <ConsultantsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Consultant</h1>
              <p className="text-gray-600 mt-1">Expertise et conseil en stratégie commerciale</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="info">Expert Certifié</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-lightbulb-line mr-2"></i>
                Nouvelle Mission
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
              position="consultants-dashboard-header"
              format="banner"
              section="consultants-dashboard"
              userContext={{ userType: 'consultant', section: 'dashboard' }}
              priority="high"
              targetCategories={['consulting-tools', 'analytics', 'strategy']}
              className="mb-4"
            />
          )}
          {activeTab === 'market' && (
            <AdBanner
              position="consultants-market-header"
              format="banner"
              section="consultants-market"
              userContext={{ userType: 'consultant', section: 'market' }}
              priority="high"
              targetCategories={['market-analysis', 'business-intelligence', 'competitive-intelligence']}
              className="mb-4"
            />
          )}
          {activeTab === 'performance' && (
            <AdBanner
              position="consultants-performance-header"
              format="banner"
              section="consultants-performance"
              userContext={{ userType: 'consultant', section: 'performance' }}
              priority="high"
              targetCategories={['performance-analytics', 'kpi-tracking', 'data-analysis']}
              className="mb-4"
            />
          )}
          {activeTab === 'collaboration' && (
            <AdBanner
              position="consultants-collaboration-header"
              format="banner"
              section="consultants-collaboration"
              userContext={{ userType: 'consultant', section: 'collaboration' }}
              priority="medium"
              targetCategories={['collaboration', 'communication', 'project-management']}
              className="mb-4"
            />
          )}
          {activeTab === 'reports' && (
            <AdBanner
              position="consultants-reports-header"
              format="banner"
              section="consultants-reports"
              userContext={{ userType: 'consultant', section: 'reports' }}
              priority="high"
              targetCategories={['reporting', 'ai', 'automation']}
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
              position="consultants-sidebar"
              format="banner"
              section={`consultants-${activeTab}`}
              userContext={{ userType: 'consultant', section: activeTab }}
              priority="medium"
              targetCategories={['premium-tools', 'ai', 'advanced-analytics']}
            />
            
            <AdBanner
              position="consultants-sidebar-secondary"
              format="animated"
              section={`consultants-${activeTab}`}
              userContext={{ userType: 'consultant', section: activeTab }}
              priority="low"
              targetCategories={['training', 'certification', 'expert-tools']}
            />
          </div>
        </div>

        {/* Bannière publicitaire en bas de page */}
        <div className="mt-8">
          <AdBanner
            position="consultants-footer"
            format="banner"
            section={`consultants-${activeTab}`}
            userContext={{ userType: 'consultant', section: activeTab }}
            priority="medium"
            targetCategories={['enterprise-solutions', 'integration', 'consulting-services']}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultantsPage;
