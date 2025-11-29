
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { LoadingButton } from '../../components/base/LoadingButton';
import { EndCustomerDashboard } from './components/EndCustomerDashboard';
import { CommercialsSection } from './components/CommercialsSection';
import { ProductsCatalog } from './components/ProductsCatalog';
import { SupportCenter } from './components/SupportCenter';
import { HistorySection } from './components/HistorySection';

const EndCustomersPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: 0 },
    { id: 'commercials', label: 'Nos Commerciaux', icon: 'ri-team-line', count: 4 },
    { id: 'products', label: 'Produits & Services', icon: 'ri-shopping-bag-line', count: 6 },
    { id: 'support', label: 'Assistance', icon: 'ri-customer-service-line', count: 1 },
    { id: 'history', label: 'Historique', icon: 'ri-history-line', count: 8 },
  ];

  const renderTabContent = () => {
    try {
      switch (activeTab) {
        case 'dashboard':
          return <EndCustomerDashboard onTabChange={setActiveTab} />;
        case 'commercials':
          return <CommercialsSection />;
        case 'products':
          return <ProductsCatalog />;
        case 'support':
          return <SupportCenter />;
        case 'history':
          return <HistorySection />;
        default:
          return <EndCustomerDashboard onTabChange={setActiveTab} />;
      }
    } catch (error) {
      console.error('Error rendering tab content:', error);
      return <EndCustomerDashboard onTabChange={setActiveTab} />;
    }
  };

  const handleTabChange = (tabId: string) => {
    try {
      setActiveTab(tabId);
    } catch (error) {
      console.error('Error changing tab:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* En-tête */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Clients Finaux</h1>
              <p className="text-gray-600">Accédez à nos solutions et services professionnels</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success">Compte Actif</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-settings-line mr-2"></i>
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EndCustomersPage;
