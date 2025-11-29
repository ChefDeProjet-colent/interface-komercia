
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';
import { FinancialDashboard } from './components/FinancialDashboard';
import { UserDataAccess } from './components/UserDataAccess';
import { ServicePromotion } from './components/ServicePromotion';
import { SalesCollaboration } from './components/SalesCollaboration';
import { ReportsSection } from './components/ReportsSection';

const FinancialInstitutionsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'data-access', label: 'Accès Données', icon: 'ri-database-line', count: null },
    { id: 'services', label: 'Promotion Services', icon: 'ri-service-line', count: 8 },
    { id: 'collaboration', label: 'Collaboration Ventes', icon: 'ri-team-line', count: 15 },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: 6 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <FinancialDashboard />;
      case 'data-access':
        return <UserDataAccess />;
      case 'services':
        return <ServicePromotion />;
      case 'collaboration':
        return <SalesCollaboration />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <FinancialDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Institutions Financières</h1>
              <p className="text-gray-600 mt-1">Solutions commerciales pour le secteur financier</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="info">Secteur Réglementé</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-bank-line mr-2"></i>
                Nouveau Service
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
              position="financial-dashboard-header"
              format="banner"
              section="financial-dashboard"
              userContext={{ userType: 'financial-institution', section: 'dashboard' }}
              priority="high"
              targetCategories={['fintech', 'banking-solutions', 'financial-technology']}
              className="mb-4"
            />
          )}
          {activeTab === 'data-access' && (
            <AdBanner
              position="financial-data-header"
              format="banner"
              section="financial-data"
              userContext={{ userType: 'financial-institution', section: 'data-access' }}
              priority="high"
              targetCategories={['data-security', 'compliance', 'financial-data']}
              className="mb-4"
            />
          )}
          {activeTab === 'services' && (
            <AdBanner
              position="financial-services-header"
              format="banner"
              section="financial-services"
              userContext={{ userType: 'financial-institution', section: 'services' }}
              priority="medium"
              targetCategories={['financial-marketing', 'product-promotion', 'banking-services']}
              className="mb-4"
            />
          )}
          {activeTab === 'collaboration' && (
            <AdBanner
              position="financial-collaboration-header"
              format="banner"
              section="financial-collaboration"
              userContext={{ userType: 'financial-institution', section: 'collaboration' }}
              priority="medium"
              targetCategories={['sales-collaboration', 'team-management', 'financial-sales']}
              className="mb-4"
            />
          )}
          {activeTab === 'reports' && (
            <AdBanner
              position="financial-reports-header"
              format="banner"
              section="financial-reports"
              userContext={{ userType: 'financial-institution', section: 'reports' }}
              priority="high"
              targetCategories={['financial-reporting', 'compliance-reports', 'regulatory-analytics']}
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
              position="financial-sidebar"
              format="banner"
              section={`financial-${activeTab}`}
              userContext={{ userType: 'financial-institution', section: activeTab }}
              priority="medium"
              targetCategories={['enterprise-banking', 'risk-management', 'financial-ai']}
            />
            
            <AdBanner
              position="financial-sidebar-secondary"
              format="animated"
              section={`financial-${activeTab}`}
              userContext={{ userType: 'financial-institution', section: activeTab }}
              priority="low"
              targetCategories={['regulatory-compliance', 'financial-consulting', 'banking-innovation']}
            />
          </div>
        </div>

        {/* Bannière publicitaire en bas de page */}
        <div className="mt-8">
          <AdBanner
            position="financial-footer"
            format="banner"
            section={`financial-${activeTab}`}
            userContext={{ userType: 'financial-institution', section: activeTab }}
            priority="medium"
            targetCategories={['financial-integration', 'banking-support', 'enterprise-solutions']}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialInstitutionsPage;
