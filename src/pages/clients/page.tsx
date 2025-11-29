
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';
import { ClientDashboard } from './components/ClientDashboard';
import { CommercialProfileForm } from './components/CommercialProfileForm';
import { ProductsServicesSection } from './components/ProductsServicesSection';
import { SalesTeamSection } from './components/SalesTeamSection';
import { SupportSection } from './components/SupportSection';

const ClientsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'profile', label: 'Profil Commercial', icon: 'ri-user-line', count: null },
    { id: 'products', label: 'Produits & Services', icon: 'ri-product-hunt-line', count: 12 },
    { id: 'team', label: 'Équipe Commerciale', icon: 'ri-team-line', count: 8 },
    { id: 'support', label: 'Support', icon: 'ri-customer-service-line', count: 3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ClientDashboard />;
      case 'profile':
        return <CommercialProfileForm />;
      case 'products':
        return <ProductsServicesSection />;
      case 'team':
        return <SalesTeamSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Client Entreprise</h1>
              <p className="text-gray-600 mt-1">Gérez votre profil commercial et vos services B2B</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success">Compte Entreprise</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-settings-line mr-2"></i>
                Paramètres
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
              position="clients-dashboard-header"
              format="banner"
              section="clients-dashboard"
              userContext={{ userType: 'client', section: 'dashboard' }}
              priority="high"
              targetCategories={['crm', 'analytics', 'business-tools']}
              className="mb-4"
            />
          )}
          {activeTab === 'profile' && (
            <AdBanner
              position="clients-profile-header"
              format="banner"
              section="clients-profile"
              userContext={{ userType: 'client', section: 'profile' }}
              priority="medium"
              targetCategories={['profile-management', 'business-optimization', 'consulting']}
              className="mb-4"
            />
          )}
          {activeTab === 'products' && (
            <AdBanner
              position="clients-products-header"
              format="banner"
              section="clients-products"
              userContext={{ userType: 'client', section: 'products' }}
              priority="high"
              targetCategories={['product-management', 'catalog', 'e-commerce']}
              className="mb-4"
            />
          )}
          {activeTab === 'team' && (
            <AdBanner
              position="clients-team-header"
              format="banner"
              section="clients-team"
              userContext={{ userType: 'client', section: 'team' }}
              priority="medium"
              targetCategories={['team-management', 'collaboration', 'hr-tools']}
              className="mb-4"
            />
          )}
          {activeTab === 'support' && (
            <AdBanner
              position="clients-support-header"
              format="banner"
              section="clients-support"
              userContext={{ userType: 'client', section: 'support' }}
              priority="high"
              targetCategories={['customer-support', 'premium-services', 'training']}
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
              position="clients-sidebar"
              format="banner"
              section={`clients-${activeTab}`}
              userContext={{ userType: 'client', section: activeTab }}
              priority="medium"
              targetCategories={['premium-services', 'automation', 'analytics']}
            />
            
            <AdBanner
              position="clients-sidebar-secondary"
              format="animated"
              section={`clients-${activeTab}`}
              userContext={{ userType: 'client', section: activeTab }}
              priority="low"
              targetCategories={['special-offers', 'training', 'consulting']}
            />
          </div>
        </div>

        {/* Bannière publicitaire en bas de page */}
        <div className="mt-8">
          <AdBanner
            position="clients-footer"
            format="banner"
            section={`clients-${activeTab}`}
            userContext={{ userType: 'client', section: activeTab }}
            priority="medium"
            targetCategories={['enterprise-solutions', 'integration', 'support']}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
