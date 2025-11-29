
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';
import { EventsDashboard } from './components/EventsDashboard';
import { EventPlanning } from './components/EventPlanning';
import { RegistrationManagement } from './components/RegistrationManagement';
import { EventPromotions } from './components/EventPromotions';
import { EventStatistics } from './components/EventStatistics';
import { CollaborationTools } from './components/CollaborationTools';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'planning', label: 'Événements', icon: 'ri-calendar-event-line', count: 24 },
    { id: 'registration', label: 'Inscriptions', icon: 'ri-user-add-line', count: 1247 },
    { id: 'statistics', label: 'Statistiques', icon: 'ri-bar-chart-line', count: null },
    { id: 'promotions', label: 'Promotions', icon: 'ri-megaphone-line', count: 5 },
    { id: 'collaboration', label: 'Collaboration', icon: 'ri-team-line', count: 12 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <EventsDashboard />;
      case 'planning':
        return <EventPlanning />;
      case 'registration':
        return <RegistrationManagement />;
      case 'promotions':
        return <EventPromotions />;
      case 'statistics':
        return <EventStatistics />;
      case 'collaboration':
        return <CollaborationTools />;
      default:
        return <EventsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                <i className="ri-calendar-event-line text-purple-600 mr-3"></i>
                Organisateurs d'Événements et Réseaux Professionnels
              </h1>
              <p className="text-gray-600 mt-1">
                Planifiez, promouvez et gérez efficacement vos événements professionnels
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success" className="bg-green-100 text-green-800">
                <i className="ri-calendar-check-line mr-1"></i>
                24 Événements Planifiés
              </Badge>
              <Badge variant="info" className="bg-blue-100 text-blue-800">
                <i className="ri-group-line mr-1"></i>
                1247 Participants Inscrits
              </Badge>
              <Button variant="primary" size="sm">
                <i className="ri-add-line mr-2"></i>
                Nouvel Événement
              </Button>
            </div>
          </div>
        </div>

        {/* Bannière publicitaire principale */}
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <i className="ri-tools-line mr-2"></i>
                  Solutions Complètes de Gestion d'Événements
                </h3>
                <p className="text-indigo-100 mb-4">
                  Outils de billetterie, marketing digital, solutions de promotion et services de location d'espaces pour maximiser le succès de vos événements
                </p>
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap">
                  <i className="ri-external-link-line mr-2"></i>
                  Découvrir nos Solutions
                </button>
              </div>
              <div className="hidden lg:block">
                <i className="ri-calendar-event-line text-6xl text-indigo-200"></i>
              </div>
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
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
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
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    <i className="ri-dashboard-line mr-2"></i>
                    Tableau de Bord Avancé pour Organisateurs
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Suivez vos KPI, gérez vos notifications et optimisez vos performances événementielles
                  </p>
                </div>
                <button className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
                  Découvrir
                </button>
              </div>
            </div>
          )}
          {activeTab === 'planning' && (
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    <i className="ri-calendar-event-line mr-2"></i>
                    Outils de Planification et Gestion d'Événements
                  </h4>
                  <p className="text-green-100 text-sm">
                    Créez, planifiez et gérez vos événements avec nos outils de gestion de venue et de scheduling
                  </p>
                </div>
                <button className="bg-white text-green-600 px-4 py-2 rounded text-sm font-medium hover:bg-green-50 transition-colors whitespace-nowrap">
                  En savoir plus
                </button>
              </div>
            </div>
          )}
          {activeTab === 'registration' && (
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    <i className="ri-user-settings-line mr-2"></i>
                    Solutions de Billetterie et Gestion des Inscriptions
                  </h4>
                  <p className="text-orange-100 text-sm">
                    Automatisez vos inscriptions, gérez les participants et optimisez votre suivi avec nos outils avancés
                  </p>
                </div>
                <button className="bg-white text-orange-600 px-4 py-2 rounded text-sm font-medium hover:bg-orange-50 transition-colors whitespace-nowrap">
                  Découvrir
                </button>
              </div>
            </div>
          )}
          {activeTab === 'promotions' && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    <i className="ri-megaphone-line mr-2"></i>
                    Services de Marketing Digital et Promotion d'Événements
                  </h4>
                  <p className="text-purple-100 text-sm">
                    Maximisez votre audience avec nos outils de campagnes publicitaires et de gestion de réseaux sociaux
                  </p>
                </div>
                <button className="bg-white text-purple-600 px-4 py-2 rounded text-sm font-medium hover:bg-purple-50 transition-colors whitespace-nowrap">
                  Découvrir
                </button>
              </div>
            </div>
          )}
          {activeTab === 'statistics' && (
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    <i className="ri-bar-chart-line mr-2"></i>
                    Outils d'Analyse de Données et Services de Conseil
                  </h4>
                  <p className="text-teal-100 text-sm">
                    Analysez l'impact de vos événements avec nos solutions de business intelligence et reporting avancé
                  </p>
                </div>
                <button className="bg-white text-teal-600 px-4 py-2 rounded text-sm font-medium hover:bg-teal-50 transition-colors whitespace-nowrap">
                  En savoir plus
                </button>
              </div>
            </div>
          )}
          {activeTab === 'collaboration' && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">
                    <i className="ri-team-line mr-2"></i>
                    Outils de Collaboration et Coordination d'Équipe
                  </h4>
                  <p className="text-indigo-100 text-sm">
                    Facilitez la communication et la coordination avec nos solutions de collaboration et de networking
                  </p>
                </div>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded text-sm font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap">
                  Découvrir
                </button>
              </div>
            </div>
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
            {/* Bannière principale sidebar */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">
                <i className="ri-vip-crown-line mr-2"></i>
                Solutions Premium
              </h4>
              <p className="text-yellow-100 text-sm mb-3">
                Accédez à nos outils avancés et services d'entreprise pour événements de grande envergure
              </p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded text-sm font-medium hover:bg-orange-50 transition-colors w-full whitespace-nowrap">
                Upgrade Premium
              </button>
            </div>
            
            {/* Bannière secondaire */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">
                <i className="ri-customer-service-line mr-2"></i>
                Support & Formation
              </h4>
              <p className="text-pink-100 text-sm mb-3">
                Bénéficiez de notre accompagnement personnalisé et formations spécialisées
              </p>
              <button className="bg-white text-pink-600 px-4 py-2 rounded text-sm font-medium hover:bg-pink-50 transition-colors w-full whitespace-nowrap">
                Nous Contacter
              </button>
            </div>

            {/* Bannière tertiaire */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">
                <i className="ri-links-line mr-2"></i>
                Intégrations
              </h4>
              <p className="text-cyan-100 text-sm mb-3">
                Connectez vos outils favoris avec nos API et intégrations tierces
              </p>
              <button className="bg-white text-cyan-600 px-4 py-2 rounded text-sm font-medium hover:bg-cyan-50 transition-colors w-full whitespace-nowrap">
                Voir Intégrations
              </button>
            </div>
          </div>
        </div>

        {/* Bannière publicitaire en bas de page */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <i className="ri-building-line mr-2"></i>
                  Solutions Entreprise pour Événements de Grande Envergure
                </h3>
                <p className="text-gray-300 mb-4">
                  Découvrez nos solutions d'intégration, support dédié et services d'entreprise pour vos événements professionnels de grande ampleur
                </p>
                <div className="flex items-center space-x-4">
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                    <i className="ri-phone-line mr-2"></i>
                    Nous Contacter
                  </button>
                  <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    Documentation
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <i className="ri-building-line text-6xl text-gray-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
